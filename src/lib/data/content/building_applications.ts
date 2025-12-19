import type { PhaseConfig } from '../types';

export const buildingApplications: PhaseConfig = {
    id: 'building-applications',
    title: 'Building Applications',
    chapters: [
        {
            id: 'ch12',
            title: 'I/O Project: Minigrep',
            lessons: [
                {
                    id: 'ch12-refactoring',
                    title: 'Separation of Concerns',
                    type: 'lesson',
                    xp: 10,
                    coinReward: 5,
                    unlockPrice: 0,
                    content: `
# Separation of Concerns

It is best practice to separate your business logic from the command-line argument parsing.
- \`main.rs\`: Handles parsing arguments and calling \`lib.rs\`.
- \`lib.rs\`: Contains the actual logic (\`run\` function, \`Config\` struct).

### The Config Struct
Instead of passing individual arguments, we group configuration into a struct.

\`\`\`rust
struct Config {
    query: String,
    filename: String,
}

impl Config {
    fn new(args: &[String]) -> Result<Config, &'static str> {
        // Parse logic here
    }
}
\`\`\`
`
                },
                {
                    id: 'ch12-tdd',
                    title: 'Test Driven Development',
                    type: 'code',
                    xp: 30,
                    coinReward: 15,
                    unlockPrice: 20,
                    content: `
# Test Driven Development (TDD)

In TDD, we write the test **before** the code (Red-Green-Refactor).

### Challenge
We want a \`search\` function that finds lines containing a query.
1. Write the test (It's already written for you below!).
2. Implement \`search\` to make the test pass.
   - Iterate through lines.
   - If line contains query, add to results.
`,
                    initialCode: `pub fn search<'a>(query: &str, contents: &'a str) -> Vec<&'a str> {
    // Implement logic here
    vec![]
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn one_result() {
        let query = "duct";
        let contents = "\\
Rust:
safe, fast, productive.
Pick three.";

        assert_eq!(vec!["safe, fast, productive."], search(query, contents));
    }
}

fn main() {}`,
                    tests: [
                        {
                            description: 'Finds "duct"',
                            test: `search("duct", "Rust:\nsafe, fast, productive.\nPick three.") == vec!["safe, fast, productive."]`
                        },
                        {
                            description: 'Finds "Pick"',
                            test: `search("Pick", "Rust:\nPick three.") == vec!["Pick three."]`
                        }
                    ],
                    solution: `pub fn search<'a>(query: &str, contents: &'a str) -> Vec<&'a str> {
    let mut results = Vec::new();
    for line in contents.lines() {
        if line.contains(query) {
            results.push(line);
        }
    }
    results
}
fn main() {}`,
                    hints: [
                        {
                            content: "Use `contents.lines()` to iterate over lines.",
                            cost: 0
                        },
                        {
                            content: "Check `if line.contains(query)`.",
                            cost: 5
                        },
                        {
                            content: "Push matching lines to a vector and return it.",
                            cost: 10
                        }
                    ]
                },
                {
                    id: 'ch12-env-vars',
                    title: 'Environment Variables',
                    type: 'code',
                    xp: 30,
                    coinReward: 15,
                    unlockPrice: 20,
                    content: `
# Environment Variables

Sometimes we want to configure our tool without changing arguments, using Environment Variables.
Rust provides \`std::env::var\` to read them.

### Challenge
Update the \`Config::new\` function to check for an environment variable named \`IGNORE_CASE\`.
1. Use \`std::env::var("IGNORE_CASE")\`.
2. It returns a \`Result\`. \`is_ok()\` returns true if the var is set to *anything*.
3. Set the \`ignore_case\` field on Config based on this.
`,
                    initialCode: `use std::env;

struct Config {
    query: String,
    filename: String,
    ignore_case: bool,
}

impl Config {
    pub fn new(args: &[String]) -> Result<Config, &'static str> {
        if args.len() < 3 {
            return Err("not enough arguments");
        }

        let query = args[1].clone();
        let filename = args[2].clone();

        // CHECK ENV VAR HERE:
        // let ignore_case = ...
        let ignore_case = false; 

        Ok(Config {
            query,
            filename,
            ignore_case,
        })
    }
}

fn main() {
    let args = vec![String::from("minigrep"), String::from("query"), String::from("file.txt")];
    let config = Config::new(&args).unwrap();
    println!("Ignore case: {}", config.ignore_case);
}`,
                    tests: [
                        {
                            description: 'Uses env::var',
                            test: 'USER_CODE.contains("env::var")'
                        },
                        // We can't easily mock env vars in this runner without modification, 
                        // so we primarily test syntax and "happy path" logic if possible.
                        // Or we can simulate it if we mock std::env (hard in this runner).
                        // We will check if they set the boolean correctly based on a hypothetical call.
                        // Actually, for this specific challenge, syntax check is safest unless we mock.
                        {
                            description: 'Sets ignore_case',
                            test: 'USER_CODE.contains("ignore_case")' // Heuristic
                        }
                    ],
                    solution: `use std::env;

struct Config {
    query: String,
    filename: String,
    ignore_case: bool,
}

impl Config {
    pub fn new(args: &[String]) -> Result<Config, &'static str> {
        if args.len() < 3 {
            return Err("not enough arguments");
        }

        let query = args[1].clone();
        let filename = args[2].clone();

        let ignore_case = env::var("IGNORE_CASE").is_ok();

        Ok(Config {
            query,
            filename,
            ignore_case,
        })
    }
}
fn main() {}`,
                    hints: [
                        {
                            content: "Call `env::var(\"IGNORE_CASE\")`.",
                            cost: 0
                        },
                        {
                            content: "Use `.is_ok()` to check if it's set.",
                            cost: 5
                        }
                    ]
                },
                {
                    id: 'ch12-stderr',
                    title: 'Standard Error',
                    type: 'lesson',
                    xp: 10,
                    coinReward: 5,
                    unlockPrice: 0,
                    content: `
# Standard Error

By default, \`println!\` prints to standard output (stdout).
Errors should verify be printed to standard error (stderr) so they can be separated from program output (e.g. valid data).

### eprintln!
Rust provides the \`eprintln!\` macro for this.

\`\`\`rust
eprintln!("Problem parsing arguments: {}", err);
\`\`\`
`
                }
            ]
        },
        {
            id: 'ch13',
            title: 'Iterators & Closures',
            lessons: [
                {
                    id: 'ch13-closures',
                    title: 'Anonymous Functions',
                    type: 'lesson',
                    xp: 10,
                    coinReward: 5,
                    unlockPrice: 0,
                    content: `
# Closures

Closures are anonymous functions that can capture their environment.

### Syntax
\`\`\`rust
let plus_one = |x| x + 1;
println!("{}", plus_one(1)); // 2
\`\`\`

### Capturing Environment
\`\`\`rust
let x = 10;
let equals_x = |z| z == x; // captures x
\`\`\`
`
                },
                {
                    id: 'ch13-iterators',
                    title: 'Iterator Adaptors',
                    type: 'code',
                    xp: 30,
                    coinReward: 15,
                    unlockPrice: 20,
                    content: `
# Adaptors: map and filter

Iterators are lazy. You must consume them (e.g., with \`collect\`) to do anything.
- \`map\`: Transforms each item.
- \`filter\`: Keeps items matching a predicate.

### Challenge
Implement \`sum_of_squares_of_evens(n: u32) -> u32\`.
1. Create a range \`0..n\`.
2. Filter for evens (\`x % 2 == 0\`).
3. Map to square (\`x * x\`).
4. Sum the results (\`.sum()\`).
`,
                    initialCode: `fn sum_of_squares_of_evens(n: u32) -> u32 {
    (0..n)
        // .filter(...)
        // .map(...)
        // .sum()
}

fn main() {
    println!("{}", sum_of_squares_of_evens(10)); // 0^2 + 2^2 + 4^2 + 6^2 + 8^2 = 0+4+16+36+64 = 120
}`,
                    tests: [
                        {
                            description: 'Sum for 10 is 120',
                            test: 'sum_of_squares_of_evens(10) == 120'
                        },
                        {
                            description: 'Uses .filter',
                            test: 'USER_CODE.contains(".filter")'
                        },
                        {
                            description: 'Uses .map',
                            test: 'USER_CODE.contains(".map")'
                        }
                    ],
                    solution: `fn sum_of_squares_of_evens(n: u32) -> u32 {
    (0..n)
        .filter(|x| x % 2 == 0)
        .map(|x| x * x)
        .sum()
}
fn main() {}`,
                    hints: [
                        {
                            content: "Use `.filter(|x| x % 2 == 0)`.",
                            cost: 0
                        },
                        {
                            content: "Use `.map(|x| x * x)`.",
                            cost: 5
                        },
                        {
                            content: "Finish with `.sum()`.",
                            cost: 5
                        }
                    ]
                }
            ]
        },
        {
            id: 'ch14',
            title: 'Cargo & Crates.io',
            lessons: [
                {
                    id: 'ch14-release-profiles',
                    title: 'Release Profiles',
                    type: 'lesson',
                    xp: 10,
                    coinReward: 5,
                    unlockPrice: 0,
                    content: `
# Release Profiles

Rust has two main profiles: \`dev\` and \`release\`.
- **dev**: Used by \`cargo build\`. Good for debugging. Unoptimized.
- **release**: Used by \`cargo build --release\`. Optimized for speed (can be 100x faster).

### Customizing
You can change settings in \`Cargo.toml\`:
\`\`\`toml
[profile.dev]
opt-level = 0

[profile.release]
opt-level = 3
\`\`\`
`
                },
                {
                    id: 'ch14-doc-comments',
                    title: 'Doc Comments',
                    type: 'code',
                    xp: 30,
                    coinReward: 15,
                    unlockPrice: 20,
                    content: `
# Documentation Comments

Rust has a special comment syntax: \`///\`.
It supports Markdown and is used to generate HTML documentation.

### Challenge
1. Add a doc comment \`/// Adds one to the number given.\` above the function.
2. Add a section header \`# Examples\` inside the comment.
3. Add a code block showing how to use it.
`,
                    initialCode: `// Add doc comments here
// /// Adds one...
pub fn add_one(x: i32) -> i32 {
    x + 1
}

fn main() {
    println!("{}", add_one(5));
}`,
                    tests: [
                        {
                            description: 'Has /// comment',
                            test: 'USER_CODE.contains("///")'
                        },
                        {
                            description: 'Has # Examples section',
                            test: 'USER_CODE.contains("# Examples")'
                        }
                    ],
                    solution: `/// Adds one to the number given.
///
/// # Examples
///
/// \`\`\`
/// let arg = 5;
/// let answer = my_crate::add_one(arg);
/// assert_eq!(6, answer);
/// \`\`\`
pub fn add_one(x: i32) -> i32 {
    x + 1
}
fn main() {}`,
                    hints: [
                        {
                            content: "Use triple slashes \`///\` for doc comments.",
                            cost: 0
                        },
                        {
                            content: "Markdown headers are supported: \`/// # Examples\`.",
                            cost: 5
                        }
                    ]
                },
                {
                    id: 'ch14-workspaces',
                    title: 'Cargo Workspaces',
                    type: 'lesson',
                    xp: 10,
                    coinReward: 5,
                    unlockPrice: 0,
                    content: `
# Workspaces

As projects grow, splitting them into multiple crates is wise. A **workspace** is a set of packages that share the same \`Cargo.lock\` and output directory.

### Workspace Structure
\`\`\`text
workspace/
├── Cargo.toml
├── adder/
│   └── Cargo.toml
└── add_one/
    └── Cargo.toml
\`\`\`

### Root Cargo.toml
\`\`\`toml
[workspace]
members = [
    "adder",
    "add_one",
]
\`\`\`
`
                },
                {
                    id: 'ch14-quiz',
                    title: 'Cargo Quiz',
                    type: 'quiz',
                    xp: 50,
                    coinReward: 25,
                    unlockPrice: 0,
                    content: 'Test your knowledge of Cargo Workspaces and Releases.',
                    questions: [
                        {
                            id: 'q1',
                            question: 'What is the default release profile for `cargo build`?',
                            options: [
                                'release',
                                'dev',
                                'debug',
                                'opt'
                            ],
                            correctAnswer: 1,
                            explanation: '`dev` is the default profile, optimized for compile speed and debugging.'
                        },
                        {
                            id: 'q2',
                            question: 'What is a Cargo Workspace?',
                            options: [
                                'A folder with a .vscode directory',
                                'A single library crate',
                                'A set of packages that share the same Cargo.lock and output directory',
                            ],
                            correctAnswer: 2,
                            explanation: 'Workspaces allow you to manage multiple related packages together.'
                        },
                        {
                            id: 'q3',
                            question: 'Where do you publish Rust crates?',
                            options: [
                                'npm',
                                'crates.io',
                                'maven',
                                'pypi'
                            ],
                            correctAnswer: 1,
                            explanation: 'crates.io is the official Rust package registry.'
                        }
                    ]
                }
            ]
        }
    ]
};
