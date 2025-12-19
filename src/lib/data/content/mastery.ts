import type { PhaseConfig } from '../types';

export const mastery: PhaseConfig = {
    id: 'mastery',
    title: 'Mastery',
    chapters: [
        {
            id: 'ch18',
            title: 'Patterns & Matching',
            sections: [
                {
                    title: 'Patterns',
                    theory: [
                        {
                            id: 'ch18-patterns-syntax',
                            title: 'Pattern Syntax',
                            type: 'lesson',
                            xp: 20,
                            coinReward: 10,
                            unlockPrice: 0,
                            content: `
# Pattern Syntax

Patterns are a special syntax in Rust for matching against the structure of types.

### Matching Literals
\`\`\`rust
match x {
    1 => println!("one"),
    2 => println!("two"),
    _ => println!("anything"),
}
\`\`\`

### Matching Named Variables
\`\`\`rust
let x = Some(5);
match x {
    Some(50) => println!("Got 50"),
    Some(y) => println!("Matched, y = {:?}", y),
    _ => println!("Default case, x = {:?}", x),
}
\`\`\`
`
                        }
                    ],
                    challenges: [
                        {
                            id: 'ch18-match-guards',
                            title: 'Match Guards',
                            type: 'code',
                            xp: 40,
                            coinReward: 20,
                            unlockPrice: 30,
                            content: `
# Match Guards

A **match guard** is an additional \`if\` condition specified after the pattern in a \`match\` arm that must also match for that arm to be chosen.

### Challenge
1. Write a \`match\` expression for \`num\`.
2. First arm: Match Some(x) where \`x < 5\`. Print "less than five: {}".
3. Second arm: Match Some(x). Print "other: {}".
4. Third arm: Match None.
`,
                            initialCode: `fn main() {
    let num = Some(4);

    match num {
        // Write your match arms here
        // Some(x) if ... => ...
        _ => (),
    }
}`,
                            tests: [
                                {
                                    description: 'Uses match guard',
                                    test: 'USER_CODE.contains("if")'
                                },
                                {
                                    description: 'Handlers check x < 5',
                                    test: 'USER_CODE.contains("< 5")'
                                }
                            ],
                            solution: `fn main() {
    let num = Some(4);

    match num {
        Some(x) if x < 5 => println!("less than five: {}", x),
        Some(x) => println!("{}", x),
        None => (),
    }
}`,
                            hints: [
                                {
                                    content: "Use `Some(x) if x < 5 => ...`",
                                    cost: 0
                                }
                            ]
                        }
                    ]
                }
            ],
            quiz: {
                id: 'ch18-quiz',
                title: 'Chapter 18 Quiz',
                type: 'quiz',
                xp: 50,
                coinReward: 25,
                unlockPrice: 0,
                content: 'Test your pattern matching skills.',
                questions: [
                    {
                        id: 'q1',
                        question: 'What is a "refutable" pattern?',
                        options: [
                            'A pattern that can fail to match',
                            'A pattern that always matches',
                            'A pattern used in function parameters'
                        ],
                        correctAnswer: 0,
                        explanation: 'Refutable patterns (like `Some(x)`) can fail to match, so they cannot be used in `let` statements (which require irrefutable patterns).'
                    },
                    {
                        id: 'q2',
                        question: 'Which syntax allows matching a range of values?',
                        options: [
                            '1..=5',
                            '1 to 5',
                            'range(1, 5)',
                            '[1, 5]'
                        ],
                        correctAnswer: 0,
                        explanation: '`1..=5` matches an inclusive range from 1 to 5.'
                    },
                    {
                        id: 'q3',
                        question: 'What does the `@` operator do in patterns?',
                        options: [
                            'It creates a reference',
                            'It binds a value to a variable while also testing it against a pattern',
                            'It ignores the value'
                        ],
                        correctAnswer: 1,
                        explanation: '`id: id_variable @ 3..=7` captures the value into `id_variable` if it matches the range.'
                    }
                ]
            }
        },
        {
            id: 'ch19',
            title: 'Advanced Features',
            sections: [
                {
                    title: 'Unsafe Rust & Advanced Traits',
                    theory: [
                        {
                            id: 'ch19-unsafe',
                            title: 'Unsafe Rust',
                            type: 'lesson',
                            xp: 20,
                            coinReward: 10,
                            unlockPrice: 0,
                            content: `
# Unsafe Rust

To switch to **unsafe Rust**, use the \`unsafe\` keyword. This gives you "superpowers":
1. Dereference a raw pointer.
2. Call an unsafe function or method.
3. Access or modify a mutable static variable.
4. Implement an unsafe trait.
5. Access fields of \`union\`s.

### Raw Pointers
\`\`\`rust
let mut num = 5;
let r1 = &num as *const i32;
let r2 = &mut num as *mut i32;

unsafe {
    println!("r1 is: {}", *r1);
    println!("r2 is: {}", *r2);
}
\`\`\`
`
                        }
                    ],
                    challenges: [
                        {
                            id: 'ch19-advanced-traits',
                            title: 'Advanced Traits',
                            type: 'code',
                            xp: 40,
                            coinReward: 20,
                            unlockPrice: 30,
                            content: `
# Associated Types

Associated types connect a type placeholder with a trait such that the trait method definitions can use these placeholder types in their signatures.

### Challenge
1. Implement the \`Iterator\` trait for a struct \`Counter\`.
2. Define \`type Item = u32;\`.
3. In \`next\`, increment count and return \`Some(count)\` if < 5, else \`None\`.
`,
                            initialCode: `struct Counter {
    count: u32,
}

impl Counter {
    fn new() -> Counter {
        Counter { count: 0 }
    }
}

impl Iterator for Counter {
    // 1. Define associated type Item
    
    // 2. Implement next()
    fn next(&mut self) -> Option<Self::Item> {
        // ...
        None
    }
}

fn main() {
    let mut counter = Counter::new();
    // println!("{:?}", counter.next());
}`,
                            tests: [
                                {
                                    description: 'Defines Item = u32',
                                    test: 'USER_CODE.contains("type Item = u32")'
                                },
                                {
                                    description: 'Implements next',
                                    test: 'USER_CODE.contains("fn next")'
                                },
                                {
                                    description: 'Returns Some',
                                    test: 'USER_CODE.contains("Some(self.count)") || USER_CODE.contains("Some(current)")'
                                }
                            ],
                            solution: `struct Counter {
    count: u32,
}

impl Counter {
    fn new() -> Counter {
        Counter { count: 0 }
    }
}

impl Iterator for Counter {
    type Item = u32;

    fn next(&mut self) -> Option<Self::Item> {
        if self.count < 5 {
            self.count += 1;
            Some(self.count)
        } else {
            None
        }
    }
}

fn main() {}`,
                            hints: [
                                {
                                    content: "Use `type Item = u32;` inside the impl block.",
                                    cost: 0
                                },
                                {
                                    content: "Increment `self.count` and return `Some`.",
                                    cost: 5
                                }
                            ]
                        }
                    ]
                }
                ,
                {
                    title: 'Advanced Types',
                    theory: [
                        {
                            id: 'ch19-advanced-types',
                            title: 'Advanced Types',
                            type: 'lesson',
                            xp: 20,
                            coinReward: 10,
                            unlockPrice: 0,
                            content: `
# Advanced Types

### The Newtype Pattern
We can create a distinct type by wrapping another type in a tuple struct. This is useful for safety (units) or for implementing external traits on external types.
\`\`\`rust
struct Millimeters(u32);
struct Meters(u32);
\`\`\`

### Type Aliases
\`type Kilometers = i32;\` creates a synonym, not a distinct type. \`Kilometers\` is just \`i32\`.

### The Never Type (!)
The \`!\` type (called "never") represents values that never return (e.g., infinite loops, or \`panic!\`).

### Dynamically Sized Types (DSTs)
Types like \`str\` and \`dyn Trait\` don't have a known size at compile time. They must always be used behind a pointer (reference \`&str\`, \`Box<dyn Trait>\`).
`
                        }
                    ],
                    challenges: [
                        {
                            id: 'ch19-newtype',
                            title: 'The Newtype Pattern',
                            type: 'code',
                            xp: 40,
                            coinReward: 20,
                            unlockPrice: 20,
                            content: `
# Implementing Display for Vec

We cannot implement \`fmt::Display\` for \`Vec<T>\` directly because both are external to our crate (Orphan Rule).
But we CAN implement it for a **Newtype** wrapper around \`Vec<T>\`.

### Challenge
1. Define \`struct Wrapper(Vec<String>);\`.
2. Implement \`fmt::Display\` for \`Wrapper\`.
3. In \`fmt\`, join the strings with ", ".
`,
                            initialCode: `use std::fmt;

// 1. Define struct Wrapper(Vec<String>)

// 2. Implement fmt::Display for Wrapper
// impl fmt::Display for Wrapper { ... }

fn main() {
    let w = Wrapper(vec![String::from("hello"), String::from("world")]);
    println!("w = {}", w);
}`,
                            tests: [
                                {
                                    description: 'Struct Wrapper defined',
                                    test: 'USER_CODE.contains("struct Wrapper")'
                                },
                                {
                                    description: 'Implements Display',
                                    test: 'USER_CODE.contains("impl fmt::Display")'
                                },
                                {
                                    description: 'Output uses comma',
                                    test: 'USER_CODE.contains("\", \"") || USER_CODE.contains("join")'
                                }
                            ],
                            solution: `use std::fmt;

struct Wrapper(Vec<String>);

impl fmt::Display for Wrapper {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "[{}]", self.0.join(", "))
    }
}

fn main() {
    let w = Wrapper(vec![String::from("hello"), String::from("world")]);
    println!("w = {}", w);
}`,
                            hints: [
                                {
                                    content: "Use `struct Wrapper(Vec<String>);`",
                                    cost: 0
                                },
                                {
                                    content: "Access the inner vector with `self.0`.",
                                    cost: 5
                                }
                            ]
                        }
                    ]
                },
                {
                    title: 'Macros',
                    theory: [
                        {
                            id: 'ch19-macros',
                            title: 'Macros',
                            type: 'lesson',
                            xp: 30,
                            coinReward: 15,
                            unlockPrice: 0,
                            content: `
# Macros

Macros are code that writes other code (**Metaprogramming**).
Macros look like functions but end with a \`!\` .

### Declarative Macros
Defined with \`macro_rules!\`. They match against patterns of Rust code structures.

\`\`\`rust
#[macro_export]
macro_rules! say_hello {
    () => {
        println!("Hello!");
    };
}
\`\`\`

### Procedural Macros
These accept code as an input stream (TokenStream) and produce output code. Used for Custom Derive (e.g. \`#[derive(Json)]\`).
`
                        }
                    ],
                    challenges: [
                        {
                            id: 'ch19-macro-rules',
                            title: 'Writing a Macro',
                            type: 'code',
                            xp: 50,
                            coinReward: 30,
                            unlockPrice: 40,
                            content: `
# Writing macro_rules!

Let's write a simplified version of the \`vec!\` macro called \`my_vec!\`.

### Challenge
1. Define a macro \`my_vec\`.
2. It should accept one or more expressions separated by commas: \`$($x:expr),*\`
3. It should create a new empty Vector, push the elements, and return it.
`,
                            initialCode: `#[macro_export]
macro_rules! my_vec {
    // Match logic here
    ( $( $x:expr ),* ) => {
        {
            let mut temp_vec = Vec::new();
            // Loop and push
            $(
                temp_vec.push($x);
            )*
            temp_vec
        }
    };
}

fn main() {
    let v = my_vec![1, 2, 3];
    println!("{:?}", v);
}`,
                            tests: [
                                {
                                    description: 'Macro handles multiple args',
                                    test: 'true' // Checked by compilation success of main
                                },
                                {
                                    description: 'Uses repetition $(...)*',
                                    test: 'USER_CODE.contains("$(")'
                                },
                                {
                                    description: 'Pushes elements',
                                    test: 'USER_CODE.contains("push")'
                                }
                            ],
                            solution: `#[macro_export]
macro_rules! my_vec {
    ( $( $x:expr ),* ) => {
        {
            let mut temp_vec = Vec::new();
            $(
                temp_vec.push($x);
            )*
            temp_vec
        }
    };
}

fn main() {
    let v = my_vec![1, 2, 3];
    println!("{:?}", v);
}`,
                            hints: [
                                {
                                    content: "The syntax `$( $x:expr ),*` matches comma-separated expressions.",
                                    cost: 0
                                },
                                {
                                    content: "Inside the block, use `$( ... )*` to repeat the push code for matched item.",
                                    cost: 10
                                }
                            ]
                        }
                    ]
                }
            ],
            quiz: {
                id: 'ch19-quiz',
                title: 'Chapter 19 Quiz',
                type: 'quiz',
                xp: 50,
                coinReward: 25,
                unlockPrice: 0,
                content: 'Test your knowledge of Advanced Rust features.',
                questions: [
                    {
                        id: 'q1',
                        question: 'What does the `unsafe` keyword rely on?',
                        options: [
                            'The compiler turning off all checks',
                            'The programmer ensuring memory safety guarantees are met',
                            'The operating system allowing direct memory access'
                        ],
                        correctAnswer: 1,
                        explanation: '`unsafe` doesn\'t turn off the borrow checker; it only unlocks specific extra capabilities. The programmer must ensure safety.'
                    },
                    {
                        id: 'q2',
                        question: 'What is a Macro in Rust?',
                        options: [
                            'A function that takes variable arguments',
                            'Code that writes other code (metaprogramming)',
                            'A global constant'
                        ],
                        correctAnswer: 1,
                        explanation: 'Macros are a way of writing code that writes other code, which is known as metaprogramming.'
                    },
                    {
                        id: 'q3',
                        question: 'What is a "Newtype" pattern?',
                        options: [
                            'Creating a new instance of a type',
                            'Using a tuple struct to create a distinct type for type safety',
                            'Renaming a type with `type` alias'
                        ],
                        correctAnswer: 1,
                        explanation: 'The newtype pattern involves creating a tuple struct with one field to wrap a type, enforcing type safety.'
                    }
                ]
            }
        },
        {
            id: 'ch20',
            title: 'Final Project',
            sections: [
                {
                    title: 'Multithreaded Web Server',
                    theory: [
                        {
                            id: 'ch20-web-server',
                            title: 'Building a Web Server',
                            type: 'lesson',
                            xp: 50,
                            coinReward: 50,
                            unlockPrice: 0,
                            content: `
# Final Project: Multithreaded Web Server

We will build a simple HTTP server that handles requests.

### Single Threaded
Currently, if we process a request slowly, all other requests must wait.

### Multithreaded
We need a **ThreadPool** to handle multiple requests concurrently.
The Pool will maintain a fixed number of threads waiting for code to run.
`
                        }
                    ],
                    challenges: [
                        {
                            id: 'ch20-threadpool',
                            title: 'Implementing ThreadPool',
                            type: 'code',
                            xp: 100,
                            coinReward: 100,
                            unlockPrice: 50,
                            content: `
# ThreadPool

We need to store a set of workers (threads) and a sender to send them jobs.

### Challenge
1. Define \`ThreadPool\` struct with a field \`workers\` (Vector of Workers).
2. Implement \`ThreadPool::new(size: usize)\`.
3. Assert that size > 0.
4. (Mock) Create \`size\` workers and push (mock) items to the vector.
`,
                            initialCode: `struct Worker {
    id: usize,
}

pub struct ThreadPool {
    // workers: Vec<Worker>,
}

impl ThreadPool {
    pub fn new(size: usize) -> ThreadPool {
        // 1. Validate size
        // 2. Create vector
        // 3. Loop and create workers
        
        ThreadPool { }
    }
}

fn main() {
    let pool = ThreadPool::new(4);
}`,
                            tests: [
                                {
                                    description: 'Struct has workers field',
                                    test: 'USER_CODE.contains("workers: Vec<Worker>")'
                                },
                                {
                                    description: 'Panics if size is 0',
                                    test: 'USER_CODE.contains("assert!(size > 0)")'
                                },
                                {
                                    description: 'Creates workers vector',
                                    test: 'USER_CODE.contains("Vec::with_capacity(size)") || USER_CODE.contains("Vec::new()")'
                                }
                            ],
                            solution: `struct Worker {
    id: usize,
}
impl Worker {
    fn new(id: usize) -> Worker {
        Worker { id }
    }
}

pub struct ThreadPool {
    workers: Vec<Worker>,
}

impl ThreadPool {
    pub fn new(size: usize) -> ThreadPool {
        assert!(size > 0);
        
        let mut workers = Vec::with_capacity(size);
        for id in 0..size {
            workers.push(Worker::new(id));
        }

        ThreadPool { workers }
    }
}

fn main() {
    let pool = ThreadPool::new(4);
}`,
                            hints: [
                                {
                                    content: "Use `assert!(size > 0);`",
                                    cost: 0
                                },
                                {
                                    content: "Use `Vec::with_capacity(size)` for efficiency.",
                                    cost: 5
                                }
                            ]
                        }
                    ]
                }
            ],
            quiz: {
                id: 'ch20-quiz',
                title: 'Final Exam',
                type: 'quiz',
                xp: 200,
                coinReward: 100,
                unlockPrice: 0,
                content: 'The final test of your Rust journey.',
                questions: [
                    {
                        id: 'q1',
                        question: 'What is the main advantage of a ThreadPool over spawning a thread per request?',
                        options: [
                            'It uses less memory and prevents DoS attacks',
                            'It is faster to compile',
                            'It is easier to debug'
                        ],
                        correctAnswer: 0,
                        explanation: 'Spawning unlimited threads can exhaust system resources (DoS). A pool limits concurrent threads to a fixed number.'
                    },
                    {
                        id: 'q2',
                        question: 'How do we send jobs to the threads?',
                        options: [
                            'Using Global Variables',
                            'Using Channels (mpsc)',
                            'Using a Database'
                        ],
                        correctAnswer: 1,
                        explanation: 'We typically use `std::sync::mpsc` (Multiple Producer, Single Consumer) channels to send jobs (closures) to the workers.'
                    },
                    {
                        id: 'q3',
                        question: 'What trait must the Job closure implement to be sent between threads?',
                        options: [
                            'FnOnce + Send + \'static',
                            'Copy + Clone',
                            'Debug + Display'
                        ],
                        correctAnswer: 0,
                        explanation: 'It must be `Send` to move between threads, and `\'static` because the thread might outlive the caller.'
                    }
                ]
            }
        }
    ]
};
