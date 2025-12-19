import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { mkdtempSync, rmSync, writeFileSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export const POST: RequestHandler = async ({ request }) => {
    let { code, tests = [] } = await request.json();

    if (!code) {
        return json({ success: false, logs: ["No code provided"], tests: [] });
    }

    // Create a temporary directory for execution
    const tempDir = mkdtempSync(join(tmpdir(), 'rust-runner-'));
    const sourcePath = join(tempDir, 'main.rs');
    const binaryPath = join(tempDir, 'main');

    // Construct the Rust file
    const safeUserCode = code.replace(/####/g, "____");
    let finalCode = `const USER_CODE: &str = r####"${safeUserCode}"####;\n\n` + code;

    // Test Harness Generation
    if (tests && tests.length > 0) {
        let userMainPresent = false;

        // We must perform the replacement on the raw 'code' first, 
        // because if we do it on 'finalCode', the regex might match 'fn main' inside the USER_CODE string literal!
        if (/fn\s+main\s*\(/.test(code)) {
            userMainPresent = true;
            code = code.replace(/fn\s+main\s*\(/, 'fn _internal_main(');
        }

        // Reconstruct finalCode with the modified user code
        finalCode = `const USER_CODE: &str = r####"${safeUserCode}"####;\n\n` + code;

        let testRunnerCode = `
fn main() {
    ${userMainPresent ? '_internal_main();' : ''}
    let mut all_passed = true;
`;
        tests.forEach((t: any, index: number) => {
            const safeDesc = t.description.replace(/"/g, '\\"');
            testRunnerCode += `
    // Test ${index + 1}: ${safeDesc}
    {
        let result = ${t.test};
        if result {
            println!("TEST_PASS|{}", "${safeDesc}");
        } else {
            println!("TEST_FAIL|{}", "${safeDesc}");
            all_passed = false;
        }
    }
`;
        });

        testRunnerCode += `
    if !all_passed {
        std::process::exit(1);
    }
}
`;
        finalCode += "\n" + testRunnerCode;
    }

    try {
        writeFileSync(sourcePath, finalCode);

        // 1. Compile
        try {
            await execAsync(`rustc "${sourcePath}" -o "${binaryPath}" -C opt-level=0`, { cwd: tempDir });
        } catch (e: any) {
            return json({
                success: false,
                logs: [e.stderr || e.message],
                tests: tests.map((t: any) => ({ description: t.description, passed: false, error: "Compilation failed" }))
            });
        }

        // 2. Run
        try {
            const { stdout, stderr } = await execAsync(`"${binaryPath}"`, {
                cwd: tempDir,
                timeout: 2000 // 2s timeout
            });

            // Parse Output
            const outputLines = stdout.split('\n');
            const logs: string[] = [];
            const testResults: any[] = [];

            outputLines.forEach(line => {
                if (line.startsWith('TEST_PASS|')) {
                    testResults.push({ description: line.split('|')[1], passed: true });
                } else if (line.startsWith('TEST_FAIL|')) {
                    testResults.push({ description: line.split('|')[1], passed: false });
                } else if (line.trim() !== '') {
                    logs.push(line);
                }
            });

            if (stderr) {
                logs.push(stderr);
            }

            const allTestsPassed = testResults.every((t: any) => t.passed);
            const correctTestCount = testResults.length === tests.length;

            return json({
                success: allTestsPassed && correctTestCount,
                logs,
                tests: testResults
            });
        } catch (e: any) {
            // Handle Runtime Errors or Timeout
            if (e.killed) {
                return json({
                    success: false,
                    logs: ["Execution Timed Out"],
                    tests: tests.map((t: any) => ({ description: t.description, passed: false, error: "Timeout" }))
                });
            }

            return json({
                success: false,
                logs: [e.stderr || e.message],
                tests: tests.map((t: any) => ({ description: t.description, passed: false, error: "Runtime Error" }))
            });
        }

    } catch (error: any) {
        return json({
            success: false,
            logs: [error.message],
            tests: tests.map((t: any) => ({ description: t.description, passed: false, error: "System error" }))
        });
    } finally {
        try {
            rmSync(tempDir, { recursive: true, force: true });
        } catch (e) {
            console.error("Failed to cleanup temp dir", e);
        }
    }
};
