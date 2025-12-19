import { describe, it, expect } from 'bun:test';
import { POST } from './+server'; // bun handles the import if mapped correctly, or we might need adjustment
// If direct import fails due to .svelte-kit magic, we might need to rely on integration, but let's try.
// Since +server.ts is just TS, it should be importable.

// Mock Request
class MockRequest {
    body: any;
    constructor(body: any) {
        this.body = body;
    }
    async json() {
        return this.body;
    }
}

describe('Rust Runner API', () => {
    it('should run a simple Rust hello world with no tests', async () => {
        const code = `
            fn main() {
                println!("Hello from Test");
            }
        `;
        const req = new MockRequest({ code, tests: [] });

        // @ts-ignore
        const response = await POST({ request: req });
        const data = await response.json();

        expect(data.success).toBe(true);
        expect(data.logs).toContain('Hello from Test');
    });

    it('should pass a valid test case', async () => {
        const code = `
            fn add(a: i32, b: i32) -> i32 {
                a + b
            }
        `;
        // The runner generates a main() that uses this function
        const tests = [
            { description: '1 + 1 = 2', test: 'add(1, 1) == 2' }
        ];

        const req = new MockRequest({ code, tests });
        // @ts-ignore
        const response = await POST({ request: req });
        const data = await response.json();

        expect(data.success).toBe(true);
        expect(data.tests[0].passed).toBe(true);
        expect(data.tests[0].description).toBe('1 + 1 = 2');
    });

    it('should fail an invalid test case', async () => {
        const code = `
            fn add(a: i32, b: i32) -> i32 {
                a + b + 1 // Bug
            }
        `;
        const tests = [
            { description: '1 + 1 = 2', test: 'add(1, 1) == 2' }
        ];

        const req = new MockRequest({ code, tests });
        // @ts-ignore
        const response = await POST({ request: req });
        const data = await response.json();

        expect(data.success).toBe(false);
        expect(data.tests[0].passed).toBe(false);
    });

    it('should handle compilation errors', async () => {
        const code = `
            fn main() {
                let x = ; // Syntax error
            }
        `;
        const req = new MockRequest({ code, tests: [] });
        // @ts-ignore
        const response = await POST({ request: req });
        const data = await response.json();

        expect(data.success).toBe(false);
        expect(data.logs.some((l: string) => l.includes('error'))).toBe(true);
    });
});
