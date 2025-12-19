export interface TestResult {
    description: string;
    passed: boolean;
    error?: string;
}

export interface ExecutionResult {
    logs: string[];
    tests: TestResult[];
    success: boolean;
}

/**
 * Safely executes user-provided code using the server-side Rust runner.
 */
export async function runCode(
    code: string,
    tests: { description: string; test: string }[]
): Promise<ExecutionResult> {
    try {
        const response = await fetch('/api/run', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ code, tests })
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.statusText}`);
        }

        const result: ExecutionResult = await response.json();
        return result;

    } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        return {
            logs: [`❌ System Error: ${errorMessage}`],
            tests: tests.map(t => ({ description: t.description, passed: false, error: "System error" })),
            success: false
        };
    }
}
