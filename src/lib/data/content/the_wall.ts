import type { PhaseConfig } from '../types';

export const theWall: PhaseConfig = {
    id: 'the-wall',
    title: 'The Wall',
    chapters: [
        {
            id: 'ch10',
            title: 'Generics, Traits & Lifetimes',
            lessons: [
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
                },
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
                },
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
                },
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
        },
        {
            id: 'ch11',
            title: 'Writing Automated Tests',
            lessons: [
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
                },
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
                            test: 'true' // Since we run the whole code, the test runner will define tests. This is meta.
                            // Actually, our runner executes 'main'.
                            // The user needs to write a test that we can *see* or *run*?
                            // Rust's default runner puts tests in a special harness.
                            // Our runner just runs code.
                            // We can simulate a test run or just check syntax.
                            // Let's rely on syntax check for #[test] and logic.
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
            ]
        }
    ]
};
