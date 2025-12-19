import type { PhaseConfig } from '../types';

export const theWall: PhaseConfig = {
    id: 'the-wall',
    title: 'The Wall',
    chapters: [
        {
            id: 'ch10',
            title: 'Generics, Traits & Lifetimes',
            sections: [
                {
                    title: 'Generics & Traits',
                    theory: [
                        {
                            id: 'ch10-generics',
                            title: 'Generic Data Types',
                            type: 'lesson',
                            xp: 10,
                            coinReward: 5,
                            unlockPrice: 0,
                            content: `
# Generics

Generics allow us to write code that works on multiple types.

### In Functions
\`\`\`rust
fn largest<T: PartialOrd>(list: &[T]) -> &T {
    // ... finds largest
}
\`\`\`

### In Structs
\`\`\`rust
struct Point<T> {
    x: T,
    y: T,
}
\`\`\`
`
                        }
                    ],
                    challenges: [
                        {
                            id: 'ch10-traits',
                            title: 'Traits: Shared Behavior',
                            type: 'code',
                            xp: 30,
                            coinReward: 15,
                            unlockPrice: 20,
                            content: `
# Traits

A **Trait** tells the Rust compiler about functionality a particular type has and can share with other types. It is similar to interfaces in other languages.

### Defining a Trait
\`\`\`rust
pub trait Summary {
    fn summarize(&self) -> String;
}
\`\`\`

### Implementing a Trait
\`\`\`rust
impl Summary for NewsArticle {
    fn summarize(&self) -> String {
        format!("{}, by {}", self.headline, self.author)
    }
}
\`\`\`

### Challenge
1. Define a trait \`Speak\` with a method \`say_hello(&self) -> String\`.
2. Implement it for struct \`Dog\` (returns "Woof!") and \`Cat\` (returns "Meow!").
`,
                            initialCode: `// 1. Define trait Speak

struct Dog;
struct Cat;

// 2. Implement Speak for Dog and Cat

fn main() {
    let d = Dog;
    let c = Cat;
    // println!("{}", d.say_hello());
    // println!("{}", c.say_hello());
}`,
                            tests: [
                                {
                                    description: 'Dog says Woof!',
                                    test: 'Dog.say_hello() == "Woof!"'
                                },
                                {
                                    description: 'Cat says Meow!',
                                    test: 'Cat.say_hello() == "Meow!"'
                                }
                            ],
                            solution: `trait Speak {
    fn say_hello(&self) -> String;
}

struct Dog;
impl Speak for Dog {
    fn say_hello(&self) -> String {
        String::from("Woof!")
    }
}

struct Cat;
impl Speak for Cat {
    fn say_hello(&self) -> String {
        String::from("Meow!")
    }
}

fn main() {}`,
                            hints: [
                                {
                                    content: "Use `trait Speak { fn say_hello(&self) -> String; }`.",
                                    cost: 0
                                },
                                {
                                    content: "Use `impl Speak for Dog { ... }`.",
                                    cost: 5
                                }
                            ]
                        },
                        {
                            id: 'ch10-trait-bounds',
                            title: 'Trait Bounds',
                            type: 'code',
                            xp: 40,
                            coinReward: 20,
                            unlockPrice: 25,
                            content: `
# Trait Bounds

We can constrain generics so they MUST implement generic traits.

### impl Trait Syntax
\`\`\`rust
fn notify(item: &impl Summary) { ... }
\`\`\`

### Trait Bound Syntax
For more complex cases, we use:
\`\`\`rust
fn notify<T: Summary>(item: &T) { ... }
\`\`\`

### Challenge
1. Define a function \`print_summary\` that takes a generic \`T\`.
2. Constrain \`T\` to implement the \`Summary\` trait.
3. Call \`.summarize()\` inside the function.
`,
                            initialCode: `pub trait Summary {
    fn summarize(&self) -> String;
}

struct NewsArticle {
    headline: String,
}

impl Summary for NewsArticle {
    fn summarize(&self) -> String {
        self.headline.clone()
    }
}

// DEFINE FUNCTION HERE:
// fn print_summary...

fn main() {
    let article = NewsArticle { headline: String::from("Rust 1.0 Released") };
    // print_summary(&article);
}`,
                            tests: [
                                {
                                    description: 'Function expects Summary',
                                    test: 'USER_CODE.contains("T: Summary") || USER_CODE.contains("impl Summary")'
                                },
                                {
                                    description: 'Calls summarize',
                                    test: 'USER_CODE.contains(".summarize()")'
                                }
                            ],
                            solution: `pub trait Summary {
    fn summarize(&self) -> String;
}

struct NewsArticle {
    headline: String,
}

impl Summary for NewsArticle {
    fn summarize(&self) -> String {
        self.headline.clone()
    }
}

fn print_summary<T: Summary>(item: &T) {
    println!("{}", item.summarize());
}

fn main() {}`,
                            hints: [
                                {
                                    content: "Use `fn print_summary<T: Summary>(item: &T) {`.",
                                    cost: 0
                                },
                                {
                                    content: "Inside, call `item.summarize()`.",
                                    cost: 5
                                }
                            ]
                        }
                    ]
                },
                {
                    title: 'Lifetimes',
                    theory: [
                        {
                            id: 'ch10-lifetimes',
                            title: 'Lifetimes Syntax',
                            type: 'lesson',
                            xp: 10,
                            coinReward: 5,
                            unlockPrice: 0,
                            content: `
# Lifetimes

Every reference in Rust has a **lifetime**, which is the scope for which that reference is valid.
Most of the time, lifetimes are implicit and inferred (Lifetime Elision).
Sometimes, we must annotate them explicitly.

### Syntax
Lifetimes start with an apostrophe: \`'a\`.
\`\`\`rust
&i32        // a reference
&'a i32     // a reference with an explicit lifetime 'a
&'a mut i32 // a mutable reference with an explicit lifetime 'a
\`\`\`

### In Functions
\`\`\`rust
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}
\`\`\`
This tells Rust: "The returned reference will live as long as the *shortest* of x and y."
`
                        }
                    ],
                    challenges: [
                        {
                            id: 'ch10-lifetimes-challenge',
                            title: 'Lifetime Annotations',
                            type: 'code',
                            xp: 40,
                            coinReward: 20,
                            unlockPrice: 30,
                            content: `
# Annotating Lifetimes

The code below fails to compile because Rust doesn't know if the return value refers to \`x\` or \`y\`.

### Challenge
Add lifetime annotations \`'a\` to the function signature so it compiles.
`,
                            initialCode: `// Fix this function signature
fn longest(x: &str, y: &str) -> &str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}

fn main() {
    let s1 = String::from("long");
    let s2 = String::from("longer");
    println!("The longest is {}", longest(&s1, &s2));
}`,
                            tests: [
                                {
                                    description: 'Compiles and works',
                                    test: 'longest("a", "bb") == "bb"'
                                },
                                {
                                    description: 'Has lifetime syntax',
                                    test: 'USER_CODE.contains("\'a")'
                                }
                            ],
                            solution: `fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}
fn main() {}`,
                            hints: [
                                {
                                    content: "Declare the lifetime: `fn longest<'a>(...)`.",
                                    cost: 0
                                },
                                {
                                    content: "Annotate parameters: `x: &'a str`.",
                                    cost: 5
                                },
                                {
                                    content: "Annotate return type: `-> &'a str`.",
                                    cost: 5
                                }
                            ]
                        }
                    ]
                }
            ],
            quiz: {
                id: 'ch10-quiz',
                title: 'Chapter 10 Quiz',
                type: 'quiz',
                xp: 50,
                coinReward: 25,
                unlockPrice: 0,
                content: 'Check your understanding of Generics, Traits, and Lifetimes.',
                questions: [
                    {
                        id: 'q1',
                        question: 'Does using Generics slow down the runtime performance?',
                        options: [
                            'Yes, slightly',
                            'No, Rust performs Monomorphization',
                            'Yes, significantly in loops',
                        ],
                        correctAnswer: 1,
                        explanation: 'Rust compiles generic code into specific code for each concrete type used (Monomorphization), so there is zero runtime cost.'
                    },
                    {
                        id: 'q2',
                        question: 'What is a Trait similar to in other languages?',
                        options: [
                            'A database',
                            'An Interface',
                            'A Class',
                            'A Variable'
                        ],
                        correctAnswer: 1,
                        explanation: 'Traits define shared behavior, similar to Interfaces in Java/C# or Typeclasses in Haskell.'
                    },
                    {
                        id: 'q3',
                        question: 'Why do we need lifetime annotations?',
                        options: [
                            'To tell the garbage collector what to keep',
                            'To optimize memory usage',
                            'To help the borrower checker ensure references are valid',
                        ],
                        correctAnswer: 2,
                        explanation: 'Annotations help the compiler understand relationships between references to prevent dangling pointers.'
                    }
                ]
            }
        },
        {
            id: 'ch11',
            title: 'Writing Automated Tests',
            sections: [
                {
                    title: 'Test Basics',
                    theory: [
                        {
                            id: 'ch11-tests',
                            title: 'The #[test] Attribute',
                            type: 'lesson',
                            xp: 10,
                            coinReward: 5,
                            unlockPrice: 0,
                            content: `
# Writing Tests

Programming is not just about writing code, it's about verifying it works.
Rust has first-class support for testing.

### Test Functions
Add \`#[test]\` to a function to make it a test runner.
\`\`\`rust
#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        let result = 2 + 2;
        assert_eq!(result, 4);
    }
}
\`\`\`

### Assertions
- \`assert!(expression)\`: Panics if expression is false.
- \`assert_eq!(left, right)\`: Panics if left != right.
- \`assert_ne!(left, right)\`: Panics if left == right.
`
                        }
                    ],
                    challenges: [
                        {
                            id: 'ch11-check-rectangle',
                            title: 'Testing Logic',
                            type: 'code',
                            xp: 30,
                            coinReward: 15,
                            unlockPrice: 20,
                            content: `
# Checking Logic

We have a \`Rectangle\` struct and a \`can_hold\` method.
Write a test to verify it works.

### Challenge
1. Create a function \`test_larger_can_hold_smaller\`.
2. Annotate it with \`#[test]\`.
3. Create two rectangles (one larger, one smaller).
4. Assert that \`larger.can_hold(&smaller)\` is true.
`,
                            initialCode: `#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }
}

// Write your test here
// fn test_larger_can_hold_smaller() { ... }

fn main() {}`,
                            tests: [
                                {
                                    description: 'Test exists and passes',
                                    test: 'true'
                                },
                                {
                                    description: 'Includes #[test]',
                                    test: 'USER_CODE.contains("#[test]")'
                                },
                                {
                                    description: 'Includes assert!',
                                    test: 'USER_CODE.contains("assert")'
                                }
                            ],
                            solution: `#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }
}

#[test]
fn test_larger_can_hold_smaller() {
    let larger = Rectangle { width: 8, height: 7 };
    let smaller = Rectangle { width: 5, height: 1 };
    assert!(larger.can_hold(&smaller));
}
fn main() {}`,
                            hints: [
                                {
                                    content: "Put `#[test]` above your function.",
                                    cost: 0
                                },
                                {
                                    content: "Use `assert!(larger.can_hold(&smaller));`",
                                    cost: 5
                                }
                            ]
                        },
                        {
                            id: 'ch11-custom-msgs',
                            title: 'Custom Failure Messages',
                            type: 'code',
                            xp: 30,
                            coinReward: 15,
                            unlockPrice: 20,
                            content: `
# Custom Failure Messages

You can add a custom message to \`assert!\`, \`assert_eq!\`, and \`assert_ne!\` as optional arguments. These messages are formatted like \`println!\`.

### Challenge
1. Write a test function named \`greeting_contains_name\`.
2. Call \`greeting("Carol")\`.
3. Assert that the result contains "Carol".
4. Add a custom error message: \`"Greeting did not contain name, value was \`{}\`"\`.
`,
                            initialCode: `pub fn greeting(name: &str) -> String {
    format!("Hello!") // Bug: doesn't include name
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn greeting_contains_name() {
        // ...
    }
}

fn main() {}`,
                            tests: [
                                {
                                    description: 'Test fails with custom message',
                                    test: 'USER_CODE.contains("Greeting did not contain name")'
                                },
                                {
                                    description: 'Uses assert! macro',
                                    test: 'USER_CODE.contains("assert!")'
                                }
                            ],
                            solution: `pub fn greeting(name: &str) -> String {
    format!("Hello!")
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn greeting_contains_name() {
        let result = greeting("Carol");
        assert!(
            result.contains("Carol"),
            "Greeting did not contain name, value was \`{}\`",
            result
        );
    }
}
fn main() {}`,
                            hints: [
                                {
                                    content: "Use `assert!(condition, \"Message {}\", val);`",
                                    cost: 0
                                },
                                {
                                    content: "Condition is `result.contains(\"Carol\")`.",
                                    cost: 5
                                }
                            ]
                        }
                    ]
                },
                {
                    title: 'Integration Tests',
                    theory: [
                        {
                            id: 'ch11-integration',
                            title: 'Integration Tests',
                            type: 'lesson',
                            xp: 10,
                            coinReward: 5,
                            unlockPrice: 0,
                            content: `
# Integration Tests

Unit tests live in the same file as the code (conventionally).
**Integration tests** live in a separate \`tests\` directory at the root of your crate.

### Purpose
Integration tests treat your library as an external user would (using the \`pub\` API only).

### File Structure
\`\`\`text
my_project/
├── Cargo.toml
├── src/
│   └── lib.rs
└── tests/
    └── integration_test.rs
\`\`\`

### Example (\`tests/integration_test.rs\`)
\`\`\`rust
use my_project; // Import the crate

#[test]
fn it_adds_two() {
    assert_eq!(4, my_project::add_two(2));
}
\`\`\`
`
                        }
                    ],
                    challenges: []
                }
            ],
            quiz: {
                id: 'ch11-quiz',
                title: 'Chapter 11 Quiz',
                type: 'quiz',
                xp: 50,
                coinReward: 25,
                unlockPrice: 0,
                content: 'Verify your testing knowledge.',
                questions: [
                    {
                        id: 'q1',
                        question: 'Which attribute marks a function as a test?',
                        options: [
                            '#[test]',
                            '#[check]',
                            '#[run]',
                            '#[assert]'
                        ],
                        correctAnswer: 0,
                        explanation: '`#[test]` tells the compiler to compile and run this function as a test.'
                    },
                    {
                        id: 'q2',
                        question: 'Where should integration tests be located?',
                        options: [
                            'src/tests.rs',
                            'tests/ directory',
                            'integration/',
                            'bin/'
                        ],
                        correctAnswer: 1,
                        explanation: 'Integration tests go in the `tests` directory next to `src`.'
                    },
                    {
                        id: 'q3',
                        question: 'What happens when an assertion fails?',
                        options: [
                            'The thread panics and the test fails',
                            'It returns false',
                            'It logs a warning'
                        ],
                        correctAnswer: 0,
                        explanation: 'Assertions like `assert_eq!` cause a panic on failure, which the test runner catches as a failure.'
                    }
                ]
            }
        }
    ]
};
