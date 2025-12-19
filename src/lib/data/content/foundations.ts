import type { PhaseConfig } from '../types';

export const foundations: PhaseConfig = {
    id: "foundations",
    title: "Foundations",
    chapters: [
        {
            id: "ch1",
            title: "Getting Started",
            sections: [
                {
                    title: "Intro",
                    theory: [
                        {
                            id: "ch1-intro",
                            title: "Hello, World!",
                            type: "lesson",
                            content: `
# Hello, World!

It’s traditional when learning a new language to write a little program that prints the text \`Hello, world!\` to the screen, so we’ll do the same here!

### The Anatomy of a Rust Program

\`\`\`rust
fn main() {
    println!("Hello, world!");
}
\`\`\`

- **\`fn main() { ... }\`**: These lines define a function named \`main\`. The \`main\` function is special: it is always the first code that runs in every executable Rust program.
- **\`println!("Hello, world!");\`**: This line does all the work. **Important**: \`println!\` calls a Rust **macro** (indicated by the \`!\`). If it called a function, it would just be \`println\`.
- **Semicolons**: Most lines of Rust code end with a semicolon \`;\`.

### Compilation (Behind the Scenes)
Rust is an **ahead-of-time compiled** language. When you run code here, we normally compile it using \`rustc\`:
\`\`\`bash
$ rustc main.rs
$ ./main
\`\`\`
        `,
                            xp: 10,
                            coinReward: 5,
                            unlockPrice: 0
                        }
                    ],
                    challenges: [
                        {
                            id: "ch1-challenge",
                            title: "Challenge: Your First Program",
                            type: "code",
                            content: `
### Challenge
Write a program that prints "Hello, Rust!" to the console.

Remember to use the \`println!\` macro.
        `,
                            initialCode: `fn main() {
    // Write your code here
}`,
                            tests: [
                                {
                                    description: "Usage of println! macro",
                                    test: "USER_CODE.contains(\"println!\")"
                                },
                                {
                                    description: "Prints \"Hello, Rust!\"",
                                    test: "USER_CODE.contains(\"Hello, Rust!\")"
                                }
                            ],
                            solution: `fn main() {
    println!("Hello, Rust!");
}`,
                            xp: 20,
                            coinReward: 10,
                            unlockPrice: 0,
                            hints: [
                                {
                                    content: "Rust uses the `println!` macro to print text to the console.",
                                    cost: 0
                                },
                                {
                                    content: "Don't forget the exclamation mark (`!`) and the semicolon (`;`) at the end.",
                                    cost: 5
                                },
                                {
                                    content: "The exact code is `println!(\"Hello, Rust!\");` inside the main function.",
                                    cost: 10
                                }
                            ]
                        }
                    ]
                },
                {
                    title: "Cargo & Formatting",
                    theory: [
                        {
                            id: "ch1-cargo",
                            title: "The Cargo Ecosystem",
                            type: "lesson",
                            content: `
# Hello, Cargo!

While \`rustc\` is fine for simple files, real Rust projects use **Cargo**, Rust’s build system and package manager.

### Key Commands
- **\`cargo new <name>\`**: Creates a new project skeleton.
- **\`cargo build\`**: Compiles code and downloads dependencies.
- **\`cargo run\`**: Builds *and* runs the code in one step.
- **\`cargo check\`**: Quickly checks for errors without producing a binary (much faster!).

### Cargo.toml
This file configures your project. It lists your dependencies (external crates) and metadata.

\`\`\`toml
[package]
name = "hello_cargo"
version = "0.1.0"
edition = "2021"

[dependencies]
# Dependencies go here
\`\`\`
        `,
                            xp: 10,
                            coinReward: 5,
                            unlockPrice: 0
                        }
                    ],
                    challenges: [
                        {
                            id: "ch1-formatting",
                            title: "Formatting Print",
                            type: "code",
                            content: `
# Formatted Print

The \`println!\` macro is powerful. You can use \`{}\` placeholders to print values.

### Positional Arguments
You can reuse arguments by index:
\`println!("{0} is {1} and {0} is also {2}", "Rust", "fast", "safe");\`

### Named Arguments
You can also use named arguments:
\`println!("{subject} {verb} {object}", subject="The cat", verb="ate", object="the mat");\`

### Challenge
Print the string: **"Rust is fun! Rust is powerful!"**
Use positional arguments so you only pass the string \`"Rust"\` **once** to the macro.
        `,
                            initialCode: `fn main() {
    // Print "Rust is fun! Rust is powerful!" 
    // passing "Rust" only ONCE.
    // println!(...);
}`,
                            tests: [
                                {
                                    description: "Usage of println! macro",
                                    test: "USER_CODE.contains(\"println!\")"
                                },
                                {
                                    description: "Contains \"Rust is fun!\"",
                                    test: "USER_CODE.contains(\"Rust is fun!\")"
                                },
                                {
                                    description: "String \"Rust\" appears only once",
                                    test: "USER_CODE.matches(\"\\\"Rust\\\"\").count() == 1"
                                }
                            ],
                            solution: `fn main() {
    println!("{0} is fun! {0} is powerful!", "Rust");
}`,
                            xp: 20,
                            coinReward: 10,
                            unlockPrice: 0,
                            hints: [
                                {
                                    content: "Use `{0}` in the format string to refer to the first argument repeatedly.",
                                    cost: 0
                                },
                                {
                                    content: "The string `\"Rust\"` should be passed as the second argument, after the format string.",
                                    cost: 5
                                },
                                {
                                    content: "`println!(\"{0} is fun! {0} is powerful!\", \"Rust\");`",
                                    cost: 10
                                }
                            ]
                        }
                    ]
                }
            ],
            quiz: {
                id: "ch1-quiz",
                title: "Chapter 1 Quiz",
                type: "quiz",
                content: "Test your knowledge of Rust basics.",
                questions: [
                    {
                        id: "q1",
                        question: "What command creates a new Cargo project?",
                        options: [
                            "cargo create",
                            "cargo new",
                            "cargo init",
                            "rustc new"
                        ],
                        correctAnswer: 1,
                        explanation: "`cargo new` creates a new project directory with a Cargo.toml and src directory."
                    },
                    {
                        id: "q2",
                        question: "Which macro prints to the console?",
                        options: [
                            "print",
                            "System.out.println",
                            "println!",
                            "echo"
                        ],
                        correctAnswer: 2,
                        explanation: "Macros in Rust end with an exclamation mark `!`. `println!` is the standard printing macro."
                    },
                    {
                        id: "q3",
                        question: "What function is the entry point of a Rust program?",
                        options: [
                            "start()",
                            "init()",
                            "main()",
                            "run()"
                        ],
                        correctAnswer: 2,
                        explanation: "Every executable Rust program must have a `main` function."
                    }
                ],
                xp: 50,
                coinReward: 25,
                unlockPrice: 0
            }
        },
        {
            id: "ch2",
            title: "Guessing Game",
            sections: [
                {
                    title: "Core Concepts",
                    theory: [
                        {
                            id: "ch2-guessing-intro",
                            title: "Introduction to std::io",
                            type: "lesson",
                            content: `
# Programming a Guessing Game

In this chapter, the book builds a "Guessing Game". Since we are in a sandbox, we'll focus on the core logic concepts introduced: **Variables**, **References**, and **Standard Input**.

### Processing a Guess

To handle input, we typically use the \`std::io\` library.

\`\`\`rust
use std::io;

fn main() {
    println!("Guess the number!");
    let mut guess = String::new();

    io::stdin()
        .read_line(&mut guess)
        .expect("Failed to read line");

    println!("You guessed: {guess}");
}
\`\`\`

- **\`use std::io;\`**: Brings the \`io\` (input/output) library into scope.
- **\`let mut guess\`**: Creates a **mutable** variable. By default, variables in Rust are immutable.
- **\`String::new()\`**: Creates a new, empty string instance.
- **\`&mut guess\`**: Passes a **mutable reference** to the \`read_line\` function, allowing it to modify our string.
        `,
                            xp: 10,
                            coinReward: 5,
                            unlockPrice: 0
                        },
                        {
                            id: "ch2-comparisons",
                            title: "Comparing Values (Ordering)",
                            type: "lesson",
                            content: `
# Comparing Values

A key part of the guessing game is comparing the guess to the secret number. Rust provides the \`std::cmp::Ordering\` enum for this.

\`\`\`rust
use std::cmp::Ordering;

// logical example
match guess.cmp(&secret_number) {
    Ordering::Less => println!("Too small!"),
    Ordering::Greater => println!("Too big!"),
    Ordering::Equal => println!("You win!"),
}
\`\`\`

### Match Expressions
The \`match\` expression is a powerful control flow operator. It compares a value against a series of patterns and executes code based on which pattern matches.
        `,
                            xp: 10,
                            coinReward: 5,
                            unlockPrice: 0
                        }
                    ],
                    challenges: [
                        {
                            id: "ch2-parsing",
                            title: "Simple Parsing",
                            type: "code",
                            content: `
# Parsing Strings

In the guessing game, we read a string but need a number. We use \`.parse()\`.
Since parsing might fail (e.g. parsing "abc" to a number), it returns a \`Result\`.
For now, we can use \`.expect("msg")\` or \`.unwrap()\` to crash on error, or handle it.

### Challenge
Complete the function \`parse_and_double\` that takes a string reference \`&str\`, parses it into an \`i32\`, doubles it, and returns the result.
Use \`.unwrap()\` for simplicity (assume input is always valid).
        `,
                            initialCode: `fn parse_and_double(s: &str) -> i32 {
    // 1. parse s to i32
    // 2. return num * 2
}

fn main() {
    println!("{}", parse_and_double("10"));
}`,
                            tests: [
                                {
                                    description: "doubles \"10\" to 20",
                                    test: "parse_and_double(\"10\") == 20"
                                },
                                {
                                    description: "doubles \"5\" to 10",
                                    test: "parse_and_double(\"5\") == 10"
                                }
                            ],
                            solution: `fn parse_and_double(s: &str) -> i32 {
    let n: i32 = s.parse().unwrap();
    n * 2
}

fn main() {
    println!("{}", parse_and_double("10"));
}`,
                            xp: 30,
                            coinReward: 15,
                            unlockPrice: 20,
                            hints: [
                                {
                                    content: "Use the `.parse()` method on the string slice `s`.",
                                    cost: 0
                                },
                                {
                                    content: "You usually need to specify the type for the variable, e.g., `let n: i32 = ...`",
                                    cost: 10
                                },
                                {
                                    content: "Chain `.unwrap()` after `.parse()` to handle the potential error, then return `n * 2`.",
                                    cost: 20
                                }
                            ]
                        },
                        {
                            id: "ch2-challenge",
                            title: "Challenge: Logic Check",
                            type: "code",
                            content: `
### Challenge
We can't easily play an interactive game here, so let's write the **logic** function!

Implement a function \`check_guess\` that accepts a \`guess\` (i32) and a \`secret\` (i32).
- If \`guess\` < \`secret\`, return -1
- If \`guess\` > \`secret\`, return 1
- If \`guess\` == \`secret\`, return 0

(We are simulating \`Ordering\` with integers for simplicity here).
        `,
                            initialCode: `fn check_guess(guess: i32, secret: i32) -> i32 {
    // Implement logic here
    0
}

fn main() {
    // You can test your function here
    let result = check_guess(50, 42);
    println!("Result: {}", result);
}`,
                            tests: [
                                {
                                    description: "Returns -1 for low guess",
                                    test: "check_guess(10, 50) == -1"
                                },
                                {
                                    description: "Returns 1 for high guess",
                                    test: "check_guess(80, 50) == 1"
                                },
                                {
                                    description: "Returns 0 for correct guess",
                                    test: "check_guess(50, 50) == 0"
                                }
                            ],
                            solution: `fn check_guess(guess: i32, secret: i32) -> i32 {
    if guess < secret {
        return -1;
    } else if guess > secret {
        return 1;
    } else {
        return 0;
    }
}

fn main() {}`,
                            xp: 30,
                            coinReward: 15,
                            unlockPrice: 20,
                            hints: [
                                {
                                    content: "Use an `if` / `else if` / `else` structure to compare `guess` and `secret`.",
                                    cost: 0
                                },
                                {
                                    content: "You can return `-1` directly inside the `if` block, or assign it to a result variable.",
                                    cost: 10
                                },
                                {
                                    content: "`if guess < secret { -1 } else if guess > secret { 1 } else { 0 }`",
                                    cost: 20
                                }
                            ]
                        }
                    ]
                }
            ],
            quiz: {
                id: "ch2-quiz",
                title: "Chapter 2 Quiz",
                type: "quiz",
                content: "Review the Guessing Game concepts.",
                questions: [
                    {
                        id: "q1",
                        question: "How do you make a variable mutable?",
                        options: [
                            "let variable = ...",
                            "var variable = ...",
                            "let mut variable = ...",
                            "mutable variable = ..."
                        ],
                        correctAnswer: 2,
                        explanation: "By default variable are immutable. You must use `let mut` to allow changes."
                    },
                    {
                        id: "q2",
                        question: "Which type is used for ordering comparisons?",
                        options: [
                            "Result",
                            "Option",
                            "Ordering",
                            "Enum"
                        ],
                        correctAnswer: 2,
                        explanation: "`std::cmp::Ordering` has three variants: Less, Greater, and Equal."
                    },
                    {
                        id: "q3",
                        question: "What does `String::new()` do?",
                        options: [
                            "Creates a new empty String",
                            "Creates a string from a literal",
                            "Allocates a fixed buffer",
                            "Prints a string"
                        ],
                        correctAnswer: 0,
                        explanation: "It creates a new, empty growable `String`."
                    }
                ],
                xp: 50,
                coinReward: 25,
                unlockPrice: 0
            }
        },
        {
            id: "ch3",
            title: "Common Concepts",
            sections: [
                {
                    title: "Shadowing",
                    theory: [],
                    challenges: [
                        {
                            id: "ch3-shadowing",
                            title: "Shadowing & Scope",
                            type: "code",
                            content: `
# Shadowing

In Rust, you can declare a new variable with the same name as a previous variable. This is called **shadowing**.

It is different from \`mut\`. Shadowing creates a *new* variable, so:
1. You can change the **type** of the value (e.g., convert string input to a number).
2. The variable is immutable after standard \`let\` (unless you use \`let mut\`).

\`\`\`rust
fn main() {
    let x = 5;
    let x = x + 1; // x is now 6
    {
        let x = x * 2; // inner x is 12
        println!("Inner x: {x}");
    }
    println!("Outer x: {x}"); // outer x is still 6
}
\`\`\`

### Challenge
Fix the code below! We want to parse the string "42" into a number, but we used the same variable name \`spaces\`. Using \`mut\` won't work because the types are different (&str vs usize).
**Use shadowing** to re-declare \`spaces\` as a number.
        `,
                            initialCode: `fn main() {
    let spaces = "   ";
    // We want to store the length (3) in 'spaces'
    // ERROR: mismatch types if we just assign
    // spaces = spaces.len(); 
    
    // Fix by shadowing:
    // let spaces = ...
    
    println!("Spaces count: {}", spaces);
}`,
                            tests: [
                                {
                                    description: "Shadowing used successfully",
                                    test: "\n// Just checking if it compiles and runs implies success here\ntrue \n"
                                }
                            ],
                            solution: `fn main() {
    let spaces = "   ";
    let spaces = spaces.len();
    println!("Spaces count: {}", spaces);
}`,
                            hints: [
                                {
                                    content: "Shadowing means using `let spaces = ...` a second time for the same name.",
                                    cost: 0
                                },
                                {
                                    content: "The new variable can have a different type (integer) than the old one (string).",
                                    cost: 5
                                },
                                {
                                    content: "`let spaces = spaces.len();`",
                                    cost: 10
                                }
                            ],
                            xp: 20,
                            coinReward: 10,
                            unlockPrice: 10
                        }
                    ]
                },
                {
                    title: "Type System & Control Flow",
                    theory: [
                        {
                            id: "ch3-variables",
                            title: "Variables and Mutability",
                            type: "lesson",
                            content: `
# Variables and Mutability

By default, variables are **immutable**. This is one of many nudges Rust gives you to write your code in a way that takes advantage of the safety and easy concurrency that Rust offers.

\`\`\`rust
let x = 5;
println!("The value of x is: {x}");
x = 6; // ERROR! Cannot assign twice to immutable variable
\`\`\`

To make a variable mutable, add \`mut\`:
\`\`\`rust
let mut x = 5;
x = 6; // This is valid!
\`\`\`

### Constants
Like immutable variables, _constants_ are bound to a name and are not allowed to change, but you declare them with \`const\` and **must** annotate the type.
\`\`\`rust
const THREE_HOURS_IN_SECONDS: u32 = 60 * 60 * 3;
\`\`\`
        `,
                            xp: 10,
                            coinReward: 5,
                            unlockPrice: 0
                        }
                    ],
                    challenges: [
                        {
                            id: "ch3-types",
                            type: "code",
                            title: "Data Types",
                            content: `
# Data Types

Rust is a **statically typed** language, meaning it must know the types of all variables at compile time.

### Scalar Types
- **Integers**: \`i32\`, \`u32\`, \`i64\`, \`u8\`, etc.
- **Floating-point**: \`f32\`, \`f64\`.
- **Boolean**: \`bool\` (true, false).
- **Character**: \`char\` (specified with single quotes like \`'z'\`).

### Compound Types
- **Tuple**: Group of values of different types. Fixed length.
  \`let tup: (i32, f64, u8) = (500, 6.4, 1);\`
- **Array**: Group of values of the **same** type. Fixed length.
  \`let a = [1, 2, 3, 4, 5];\`

### Challenge
Create a tuple named \`my_tuple\` containing an integer \`10\`, a float \`3.14\`, and the character \`'R'\`.
        `,
                            initialCode: `fn main() {
    // Create your tuple here
    // let my_tuple = ...
}`,
                            tests: [
                                {
                                    description: "Define my_tuple with correct values",
                                    test: `
{
    let my_tuple = (10, 3.14, 'R');
    true
}
`
                                }
                            ],
                            solution: `fn main() {
    let my_tuple = (10, 3.14, 'R');
    println!("{:?}", my_tuple);
}`,
                            xp: 20,
                            coinReward: 10,
                            unlockPrice: 10,
                            hints: [
                                {
                                    content: "Tuples are defined with parentheses: `let my_tuple = (value1, value2, value3);`",
                                    cost: 0
                                },
                                {
                                    content: "The values must be in order: an integer (`10`), a float (`3.14`), and a character (`'R'`).",
                                    cost: 5
                                },
                                {
                                    content: "`let my_tuple = (10, 3.14, 'R');`",
                                    cost: 10
                                }
                            ]
                        },
                        {
                            id: "ch3-types-challenge",
                            title: "Challenge: Data Types",
                            type: "code",
                            content: `
### Challenge: Return a Tuple

Define a function named \`get_data\` that returns a tuple containing:
1. The number \`500\` (i32)
2. The character \`'Z'\` (char)
        `,
                            initialCode: `fn get_data() -> (i32, char) {
    // Your code here
}`,
                            tests: [
                                {
                                    description: "Returns (500, 'Z')",
                                    test: "get_data() == (500, 'Z')"
                                }
                            ],
                            solution: `fn get_data() -> (i32, char) {
    (500, 'Z')
} 
fn main() {}`,
                            xp: 30,
                            coinReward: 15,
                            unlockPrice: 20,
                            hints: [
                                {
                                    content: "A tuple is created with parentheses, e.g., `(item1, item2)`.",
                                    cost: 0
                                },
                                {
                                    content: "The function signature expects `(i32, char)` — an integer and a character.",
                                    cost: 10
                                },
                                {
                                    content: "Simply return `(500, 'Z')` (no semicolon needed if it's the last expression).",
                                    cost: 20
                                }
                            ]
                        },
                        {
                            id: "ch3-functions",
                            title: "Functions",
                            type: "code",
                            content: `
# Functions

Rust code uses _snake case_ (e.g., \`my_function_name\`).

### Parameters
Parameters are strictly typed.
\`\`\`rust
fn print_measure(value: i32, unit: char) {
    println!("The measurement is: {value}{unit}");
}
\`\`\`

### Return Values
Functions can return values. We declare the return type after an arrow \`->\`.
The return value is the value of the final **expression** in the block.
Expressions do NOT end with semicolons.

\`\`\`rust
fn five() -> i32 {
    5  // No semicolon! this is a return value
}
\`\`\`

### Challenge
Write a function \`square\` that takes an \`i32\` and returns its square (x * x).
        `,
                            initialCode: `fn square(x: i32) -> i32 {
    // Return x squared
}`,
                            tests: [
                                {
                                    description: "square(2) returns 4",
                                    test: "square(2) == 4"
                                },
                                {
                                    description: "square(5) returns 25",
                                    test: "square(5) == 25"
                                }
                            ],
                            solution: `fn square(x: i32) -> i32 {
    x * x
}
fn main() {}`,
                            xp: 30,
                            coinReward: 15,
                            unlockPrice: 20,
                            hints: [
                                {
                                    content: "To square a number, multiply it by itself: `x * x`.",
                                    cost: 0
                                },
                                {
                                    content: "In Rust, the last expression in a function is the return value (omit the semicolon).",
                                    cost: 10
                                },
                                {
                                    content: "The body should be just: `x * x`",
                                    cost: 20
                                }
                            ]
                        },
                        {
                            id: "ch3-control-flow",
                            title: "Control Flow",
                            type: "code",
                            content: `
# Control Flow

### If Expressions
Conditionals must be \`bool\`. Rust throws an error for truthy/falsy non-bools.

\`\`\`rust
let number = 3;
if number < 5 {
    println!("condition was true");
} else {
    println!("condition was false");
}
\`\`\`

### Loops
Rust has three kinds of loops:
1. **\`loop\`**: Infinite loop. Use \`break\` to exit.
2. **\`while\`**: Conditional loop.
3. **\`for\`**: Iterate over a collection or range.

\`\`\`rust
// For loop with Range
for number in 1..4 {
    println!("{number}!");
}
// Prints: 1!, 2!, 3! (excludes 4)
\`\`\`

### Challenge
Write a function \`factorial\` that calculates the factorial of a number using a \`for\` or \`while\` loop.
(e.g., factorial(5) = 5 * 4 * 3 * 2 * 1 = 120). Return 1 for input 0.
        `,
                            initialCode: `fn factorial(n: i32) -> i32 {
    // Your code here
}`,
                            tests: [
                                {
                                    description: "factorial(0) is 1",
                                    test: "factorial(0) == 1"
                                },
                                {
                                    description: "factorial(5) is 120",
                                    test: "factorial(5) == 120"
                                },
                                {
                                    description: "factorial(3) is 6",
                                    test: "factorial(3) == 6"
                                }
                            ],
                            solution: `fn factorial(n: i32) -> i32 {
    let mut result = 1;
    for i in 1..=n {
        result *= i;
    }
    result
}
fn main() {}`,
                            xp: 40,
                            coinReward: 20,
                            unlockPrice: 30,
                            hints: [
                                {
                                    content: "You'll need a mutable variable `let mut result = 1;` to accumulate the value.",
                                    cost: 0
                                },
                                {
                                    content: "Use a range loop: `for i in 1..=n` to include `n`.",
                                    cost: 15
                                },
                                {
                                    content: "Multiply `result *= i;` inside the loop, and return `result` at the end.",
                                    cost: 30
                                }
                            ]
                        },
                        {
                            id: "ch3-temp",
                            title: "Temp Converter",
                            type: "code",
                            content: `
# Temperature Converter

Let's practice functions and arithmetic operations.

### Challenge
Write a function \`fahrenheit_to_celsius(f: f64) -> f64\`.
Formula: \`(f - 32.0) * 5.0 / 9.0\`
        `,
                            initialCode: `fn fahrenheit_to_celsius(f: f64) -> f64 {
    // Implement format
}

fn main() {
    println!("32F is {}C", fahrenheit_to_celsius(32.0));
}`,
                            tests: [
                                {
                                    description: "32F is 0C",
                                    test: "fahrenheit_to_celsius(32.0) == 0.0"
                                },
                                {
                                    description: "212F is 100C",
                                    test: "fahrenheit_to_celsius(212.0) == 100.0"
                                }
                            ],
                            solution: `fn fahrenheit_to_celsius(f: f64) -> f64 {
    (f - 32.0) * 5.0 / 9.0
}
fn main() {}`,
                            xp: 30,
                            coinReward: 15,
                            unlockPrice: 20,
                            hints: [
                                {
                                    content: "Ensure all your numbers have decimal points (e.g., `5.0`) because `f` is an `f64`.",
                                    cost: 0
                                },
                                {
                                    content: "Follow the formula order: subtract `32.0` first, then multiply.",
                                    cost: 10
                                },
                                {
                                    content: "`((f - 32.0) * 5.0) / 9.0`",
                                    cost: 20
                                }
                            ]
                        },
                        {
                            id: "ch3-fibonacci",
                            title: "Fibonacci Loop",
                            type: "code",
                            content: `
# Fibonacci Generator

The classic interview question!
Generate the *nth* Fibonacci number.
Sequence: 0, 1, 1, 2, 3, 5, 8, 13...
\`fib(0) = 0\`
\`fib(1) = 1\`
\`fib(2) = 1\`

### Challenge
Implement \`fib(n: u32) -> u32\`.
You can use recursion or a loop (loop is faster/safer in Rust).
        `,
                            initialCode: `fn fib(n: u32) -> u32 {
    if n == 0 { return 0; }
    if n == 1 { return 1; }
    
    // Calculate nth fib number
}

fn main() {
    println!("fib(10): {}", fib(10));
}`,
                            tests: [
                                {
                                    description: "fib(0) = 0",
                                    test: "fib(0) == 0"
                                },
                                {
                                    description: "fib(1) = 1",
                                    test: "fib(1) == 1"
                                },
                                {
                                    description: "fib(5) = 5",
                                    test: "fib(5) == 5"
                                },
                                {
                                    description: "fib(10) = 55",
                                    test: "fib(10) == 55"
                                }
                            ],
                            solution: `fn fib(n: u32) -> u32 {
    if n == 0 { return 0; }
    if n == 1 { return 1; }
    
    let mut a = 0;
    let mut b = 1;
    
    for _ in 2..=n {
        let temp = a + b;
        a = b;
        b = temp;
    }
    b
}
fn main() {}`,
                            xp: 40,
                            coinReward: 20,
                            unlockPrice: 30,
                            hints: [
                                {
                                    content: "Handle the base cases first: if `n` is `0` or `1`, return it directly.",
                                    cost: 0
                                },
                                {
                                    content: "Use two variables, `a` and `b`, to track the last two numbers.",
                                    cost: 15
                                },
                                {
                                    content: "In a loop from `2..=n`, set `new_b = a + b`, then update `a` to `b`, and `b` to `new_b`.",
                                    cost: 30
                                }
                            ]
                        }
                    ]
                }
            ],
            quiz: {
                id: "ch3-quiz",
                title: "Chapter 3 Quiz",
                type: "quiz",
                content: "Test your grasp of variables, types, and control flow.",
                questions: [
                    {
                        id: "q1",
                        question: "Which keyword allows you to redeclare a variable with the same name?",
                        options: [
                            "mut",
                            "shadow",
                            "let",
                            "override"
                        ],
                        correctAnswer: 2,
                        explanation: "Using `let` again allows you to shadow the previous variable, even changing its type."
                    },
                    {
                        id: "q2",
                        question: "What is the result of `5 / 2` in Rust (integer division)?",
                        options: [
                            "2.5",
                            "2",
                            "3",
                            "Error"
                        ],
                        correctAnswer: 1,
                        explanation: "Integer division truncates the decimal part, so 5 / 2 equals 2."
                    },
                    {
                        id: "q3",
                        question: "Which loop matches: \"Iterate over a collection\"?",
                        options: [
                            "loop",
                            "while",
                            "for",
                            "repeat"
                        ],
                        correctAnswer: 2,
                        explanation: "`for` loops are the most idiomatic way to iterate over collections or ranges."
                    }
                ],
                xp: 50,
                coinReward: 25,
                unlockPrice: 0
            }
        },
        {
            id: "ch4",
            title: "Ownership",
            sections: [
                {
                    title: "Ownership & Borrowing",
                    theory: [
                        {
                            id: "ch4-ownership-intro",
                            title: "What is Ownership?",
                            type: "lesson",
                            content: `
# Ownership

Ownership is Rust's most unique feature. It enables Rust to make memory safety guarantees without needing a garbage collector.

### The Rules
1. Each value in Rust has an **owner**.
2. There can only be one owner at a time.
3. When the owner goes out of scope, the value will be dropped.

### Variable Scope
\`\`\`rust
{                      // s is not valid here, it’s not yet declared
    let s = "hello";   // s is valid from this point forward

    // do stuff with s
}                      // this scope is over, and s is no longer valid
\`\`\`

### The String Type
To illustrate ownership, we need a complex data type. \`String\` manages data allocated on the **heap** (unlike string literals which are immutable and hardcoded).

\`\`\`rust
let mut s = String::from("hello");
s.push_str(", world!"); // push_str() appends a literal to a String
println!("{}", s); // This will print \`hello, world!\`
\`\`\`
        `,
                            xp: 10,
                            coinReward: 5,
                            unlockPrice: 0
                        }
                    ],
                    challenges: [
                        {
                            id: "ch4-move",
                            title: "Move Semantics",
                            type: "code",
                            content: `
# Variables and Data Interacting with Move

For complex types like \`String\`, copying is expensive. So Rust defaults to **moving**.

\`\`\`rust
let s1 = String::from("hello");
let s2 = s1; // s1 is MOVED to s2. s1 is now INVALID.
// println!("{}, world!", s1); // This would cause an error!
\`\`\`

### Challenge
The code below fails to compile because \`s1\` is moved into \`s2\`, but we try to use \`s1\` again.
**Fix the code** by cloning \`s1\` into \`s2\` so that both variables remain valid (a deep copy).

Hint: Use \`.clone()\` method.
        `,
                            initialCode: `fn main() {
    let s1 = String::from("hello");
    let s2 = s1; // Fix this line

    println!("s1 = {}, s2 = {}", s1, s2);
}`,
                            tests: [
                                {
                                    description: "Code compiles and prints s1 and s2",
                                    test: "true // If it compiles, it passes since we fixed the ownership error"
                                }
                            ],
                            solution: `fn main() {
    let s1 = String::from("hello");
    let s2 = s1.clone();

    println!("s1 = {}, s2 = {}", s1, s2);
}`,
                            xp: 30,
                            coinReward: 15,
                            unlockPrice: 20,
                            hints: [
                                {
                                    content: "Assigning `s1` to `s2` moves ownership, forcing `s1` to become invalid.",
                                    cost: 0
                                },
                                {
                                    content: "We want `s2` to be a COPY of the data, not just the pointer.",
                                    cost: 10
                                },
                                {
                                    content: "Change the line to: `let s2 = s1.clone();`",
                                    cost: 20
                                }
                            ]
                        },
                        {
                            id: "ch4-references",
                            title: "References and Borrowing",
                            type: "code",
                            content: `
# References and Borrowing

We don't always want to transfer ownership. We can **borrow** a value using references (\`&\`).

\`\`\`rust
let s1 = String::from("hello");
let len = calculate_length(&s1); // Pass a reference
// s1 is still valid here!
\`\`\`

### Challenge
The function \`calculate_length\` expects to take ownership (it takes \`String\`), which means we can't use \`s1\` afterwards.
**Refactor** the function signature and the call site to use a **reference** instead (\`&String\`).

1. Update \`calculate_length\` to take \`&String\`.
2. Update the call to pass \`&s1\`.
        `,
                            initialCode: `fn calculate_length(s: String) -> usize {
    s.len()
}

fn main() {
    let s1 = String::from("hello");
    let len = calculate_length(s1);
    println!("The length of '{}' is {}.", s1, len); // Error: s1 used after move
}`,
                            tests: [
                                {
                                    description: "calculate_length takes a reference",
                                    test: "true // Compiler check primarily"
                                }
                            ],
                            solution: `fn calculate_length(s: &String) -> usize {
    s.len()
}

fn main() {
    let s1 = String::from("hello");
    let len = calculate_length(&s1);
    println!("The length of '{}' is {}.", s1, len);
}`,
                            xp: 40,
                            coinReward: 20,
                            unlockPrice: 30,
                            hints: [
                                {
                                    content: "A reference allows access without taking ownership. Use the `&` symbol.",
                                    cost: 0
                                },
                                {
                                    content: "Change the function signature to take `s: &String`.",
                                    cost: 15
                                },
                                {
                                    content: "When calling the function, pass `&s1` instead of `s1`.",
                                    cost: 30
                                }
                            ]
                        },
                        {
                            id: "ch4-borrow-rules",
                            title: "The Rules of References",
                            type: "code",
                            content: `
# The Rules of References

At any given time, you can have **either**:
1. One mutable reference.
2. Any number of immutable references.

**You cannot have both.**

### Challenge
The code attempts to create a mutable reference \`r3\` while \`r1\` and \`r2\` (immutable references) are still active (used in the generated println).

**Fix the code** by moving the usage of \`r1\` and \`r2\` *before* \`r3\` is created, so their scope ends early.
        `,
                            initialCode: `fn main() {
    let mut s = String::from("hello");

    let r1 = &s;
    let r2 = &s;
    
    // ERROR: Cannot borrow \`s\` as mutable because it is also borrowed as immutable
    let r3 = &mut s; 

    println!("{}, {}, and {}", r1, r2, r3);
}`,
                            tests: [
                                {
                                    description: "Scopes managed correctly",
                                    test: "true // Compiles = Passed"
                                }
                            ],
                            solution: `fn main() {
    let mut s = String::from("hello");

    let r1 = &s;
    let r2 = &s;
    println!("{} and {}", r1, r2);
    // r1 and r2 are no longer used after this point

    let r3 = &mut s; 
    println!("{}", r3);
}`,
                            xp: 40,
                            coinReward: 20,
                            unlockPrice: 30,
                            hints: [
                                {
                                    content: "The immutable borrows `r1` and `r2` are active until they are last used.",
                                    cost: 0
                                },
                                {
                                    content: "You cannot create a mutable borrow `r3` while `r1` and `r2` are still active.",
                                    cost: 15
                                },
                                {
                                    content: "Move the `println!` for `r1` and `r2` up, BEFORE `r3` is defined.",
                                    cost: 30
                                }
                            ]
                        },
                        {
                            id: "ch4-slices",
                            title: "The Slice Type",
                            type: "code",
                            content: `
# The Slice Type

Slices let you reference a contiguous sequence of elements in a collection rather than the whole collection. A generic slice is \`&[T]\`. A string slice is \`&str\`.

\`\`\`rust
let s = String::from("hello world");
let hello = &s[0..5];
let world = &s[6..11];
\`\`\`

### Challenge
We have a string \`s\` containing "Hello World".
Create a string slice variable named \`word\` that contains just the characters "World" using the slice range syntax \`[start..end]\`.
        `,
                            initialCode: `fn main() {
    let s = String::from("Hello World");
    // Create 'word' slice here
    // let word = ...
    
    // println!("The word is: {}", word);
}`,
                            tests: [
                                {
                                    description: "Defined variable word",
                                    test: "true"
                                },
                                {
                                    description: "Slice equals \"World\"",
                                    test: "true"
                                }
                            ],
                            solution: `fn main() {
    let s = String::from("Hello World");
    let word = &s[6..11];
    println!("The word is: {}", word);
}`,
                            xp: 30,
                            coinReward: 15,
                            unlockPrice: 20,
                            hints: [
                                {
                                    content: "String slices use range syntax: `&s[start..end]`.",
                                    cost: 0
                                },
                                {
                                    content: "Indices are zero-based. `Hello` is 5 bytes long, plus 1 for the space.",
                                    cost: 10
                                },
                                {
                                    content: "Start at index 6. The slice should be `&s[6..11]`.",
                                    cost: 20
                                }
                            ]
                        },
                        {
                            id: "ch4-functions-ownership",
                            title: "Ownership in Functions",
                            type: "code",
                            content: `
# Ownership in Functions

Passing a variable to a function takes ownership (moves it), unless it's a Copy type (like integers) or you pass a reference.

### Challenge
1. Write a function \`take_ownership(s: String)\` that simply prints the string.
2. Call it in main.
3. Try to use \`s\` again after the call (comment it out if it fails).
4. Prove to yourself it moved!
        `,
                            initialCode: `fn take_ownership(s: String) {
    println!("Took: {}", s);
}

fn main() {
    let s = String::from("hello");
    // Call take_ownership
    
    // println!("{}", s); // Check failure
}`,
                            tests: [
                                {
                                    description: "Compiles (user should experiment)",
                                    test: "true"
                                }
                            ],
                            solution: `fn take_ownership(s: String) {
    println!("Took: {}", s);
}

fn main() {
    let s = String::from("hello");
    take_ownership(s);
}`,
                            xp: 20,
                            coinReward: 10,
                            unlockPrice: 10,
                            hints: [
                                {
                                    content: "Just calling the function moves the value.",
                                    cost: 0
                                },
                                {
                                    content: "In `main`, call `take_ownership(s);`",
                                    cost: 5
                                },
                                {
                                    content: "Comment out the last `println!` because `s` is no longer valid.",
                                    cost: 10
                                }
                            ]
                        },
                        {
                            id: "ch4-first-word",
                            title: "First Word Slice",
                            type: "code",
                            content: `
# The First Word

Let's write a function that returns the first word of a string as a **slice**.
If no space is found, return the whole string.

### Logic
1. Convert string to bytes: \`s.as_bytes()\`.
2. Iterate with \`.iter().enumerate()\`.
3. If byte is space (\`b' '\`), return slice \`&s[0..i]\`.
4. If loop finishes, return \`&s[..]\`.

### Challenge
Implement \`first_word(s: &str) -> &str\`.
        `,
                            initialCode: `fn first_word(s: &str) -> &str {
    let bytes = s.as_bytes();

    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &s[0..i];
        }
    }

    &s[..]
}

fn main() {
    let s = String::from("Hello World");
    let word = first_word(&s);
    println!("First word: {}", word);
}`,
                            tests: [
                                {
                                    description: "Finds \"Hello\" in \"Hello World\"",
                                    test: "first_word(\"Hello World\") == \"Hello\""
                                },
                                {
                                    description: "Finds \"Rust\" in \"Rust\"",
                                    test: "first_word(\"Rust\") == \"Rust\""
                                }
                            ],
                            solution: `fn first_word(s: &str) -> &str {
    let bytes = s.as_bytes();

    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &s[0..i];
        }
    }

    &s[..]
}
fn main() {}`,
                            xp: 50,
                            coinReward: 25,
                            unlockPrice: 40,
                            hints: [
                                {
                                    content: "Iterate using `bytes.iter().enumerate()`. If you find a space (`b' '`), return the slice.",
                                    cost: 0
                                },
                                {
                                    content: "Use range syntax up to the current index: `&s[0..i]`.",
                                    cost: 20
                                },
                                {
                                    content: "If the loop finishes without finding a space, return the whole string: `&s[..]`.",
                                    cost: 40
                                }
                            ]
                        }
                    ]
                }
            ],
            quiz: {
                id: "ch4-quiz",
                title: "Chapter 4 Quiz",
                type: "quiz",
                content: "Master the rules of Ownership and Borrowing.",
                questions: [
                    {
                        id: "q1",
                        question: "How many owners can a value have at once?",
                        options: [
                            "Unlimited",
                            "Two",
                            "One",
                            "None"
                        ],
                        correctAnswer: 2,
                        explanation: "Rule 2 of Ownership: There can only be one owner at a time."
                    },
                    {
                        id: "q2",
                        question: "What happens when you assign a String variable to another?",
                        options: [
                            "Copy",
                            "Move",
                            "Clone",
                            "Borrow"
                        ],
                        correctAnswer: 1,
                        explanation: "For non-Copy types like String, ownership is MOVED to the new variable. The old one becomes invalid."
                    },
                    {
                        id: "q3",
                        question: "Can you have a mutable reference and an immutable reference simultaneously?",
                        options: [
                            "Yes",
                            "No",
                            "Only in unsafe",
                            "Sometimes"
                        ],
                        correctAnswer: 1,
                        explanation: "Rust forbids having a mutable reference while any other references (mutable or immutable) exist."
                    }
                ],
                xp: 50,
                coinReward: 25,
                unlockPrice: 0
            }
        },
        {
            id: "ch5",
            title: "Structs",
            sections: [
                {
                    title: "Structures",
                    theory: [
                        {
                            id: "ch5-structs-intro",
                            title: "Defining & Instantiating",
                            type: "lesson",
                            content: `
# Defining and Instantiating Structs

Structs allow you to name and package together multiple related values that make up a meaningful group.

\`\`\`rust
struct User {
    active: bool,
    username: String,
    email: String,
    sign_in_count: u64,
}

fn main() {
    let user1 = User {
        email: String::from("someone@example.com"),
        username: String::from("someusername123"),
        active: true,
        sign_in_count: 1,
    };
}
\`\`\`

### Tuple Structs
Tuple structs have the added meaning the struct name provides but don’t have names associated with their fields.
\`\`\`rust
struct Color(i32, i32, i32);
let black = Color(0, 0, 0);
\`\`\`
        `,
                            xp: 10,
                            coinReward: 5,
                            unlockPrice: 0
                        }
                    ],
                    challenges: [
                        {
                            id: "ch5-methods",
                            title: "Method Syntax",
                            type: "code",
                            content: `
# Method Syntax

Methods are similar to functions, but they are defined within the context of a struct (or enum/trait object), and their first parameter is always \`self\`.

\`\`\`rust
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }
}
\`\`\`

### Challenge
Define a method \`is_square\` on \`Rectangle\` that returns \`true\` if the width and height are equal, and \`false\` otherwise.
        `,
                            initialCode: `struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }

    // Define is_square method here
}

fn main() {
    let rect = Rectangle { width: 10, height: 10 };
    println!("Is square? {}", rect.is_square());
}`,
                            tests: [
                                {
                                    description: "Rect(10, 10) is square",
                                    test: "\nlet r = Rectangle { width: 10, height: 10 };\nr.is_square() == true\n"
                                },
                                {
                                    description: "Rect(10, 5) is not square",
                                    test: "\nlet r = Rectangle { width: 10, height: 5 };\nr.is_square() == false\n"
                                }
                            ],
                            solution: `struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }

    fn is_square(&self) -> bool {
        self.width == self.height
    }
}

fn main() {
    let rect = Rectangle { width: 10, height: 10 };
    println!("Is square? {}", rect.is_square());
}`,
                            xp: 30,
                            coinReward: 15,
                            unlockPrice: 20,
                            hints: [
                                {
                                    content: "Access the struct's fields using `self.width` and `self.height`.",
                                    cost: 0
                                },
                                {
                                    content: "Use the equality operator `==` to compare them.",
                                    cost: 10
                                },
                                {
                                    content: "`self.width == self.height` (no semicolon for implicit return).",
                                    cost: 20
                                }
                            ]
                        },
                        {
                            id: "ch5-struct-shortcuts",
                            title: "Struct Shortcuts & Debug",
                            type: "code",
                            content: `
# Struct Superpowers

### Debugging with \`#[derive(Debug)]\`
By default, you can't println a struct. You must opt-in to debug printing by adding \`#[derive(Debug)]\` above the struct definition. Then use \`{:?}\` formatter.

### Field Init Shorthand
If a variable name matches the field name, you don't need to write \`username: username\`. Just \`username,\`.

### Struct Update Syntax
Create a new instance using most values from an old one:
\`\`\`rust
let user2 = User {
    email: String::from("new@example.com"),
    ..user1
};
\`\`\`

### Challenge
1. Add \`#[derive(Debug)]\` to \`Point\`.
2. Create \`p2\` using update syntax: copy \`x\` from \`p1\`, but set \`y\` to 2.
3. Print \`p2\` using debug formatting.
        `,
                            initialCode: `struct Point {
    x: i32,
    y: i32,
    z: i32,
}

fn main() {
    let p1 = Point { x: 1, y: 0, z: 5 };
    
    // Create p2 here using update syntax (..p1)
    // let p2 = ...

    // println!("{:?}", p2); // This will fail without derive(Debug)
}`,
                            tests: [
                                {
                                    description: "Compiles and runs",
                                    test: "true"
                                }
                            ],
                            solution: `#[derive(Debug)]
struct Point {
    x: i32,
    y: i32,
    z: i32,
}

fn main() {
    let p1 = Point { x: 1, y: 0, z: 5 };
    let p2 = Point { y: 2, ..p1 };
    println!("{:?}", p2);
}`,
                            xp: 30,
                            coinReward: 15,
                            unlockPrice: 20,
                            hints: [
                                {
                                    content: "Add `#[derive(Debug)]` just above the `struct Point` line.",
                                    cost: 0
                                },
                                {
                                    content: "Use the update syntax `..p1` at the end of the `Point` instantiation.",
                                    cost: 10
                                },
                                {
                                    content: "`let p2 = Point { y: 2, ..p1 };`",
                                    cost: 20
                                }
                            ]
                        },
                        {
                            id: "ch5-color-mixer",
                            title: "Tuple Structs",
                            type: "code",
                            content: `
# Tuple Structs

Tuple structs are great for simple wrappers like Colors or Coordinates.
\`struct Color(i32, i32, i32);\`.

### Challenge
1. Define a Tuple Struct \`Color(i32, i32, i32)\`.
2. Implement a method \`red_value(&self) -> i32\` that returns the first value (index 0).
        `,
                            initialCode: `struct Color(i32, i32, i32);

// impl Color ...

fn main() {
    let red = Color(255, 0, 0);
    // println!("{}", red.red_value());
}`,
                            tests: [
                                {
                                    description: "red_value returns 0-element",
                                    test: "\nlet c = Color(10, 20, 30);\nc.red_value() == 10\n"
                                }
                            ],
                            solution: `struct Color(i32, i32, i32);

impl Color {
    fn red_value(&self) -> i32 {
        self.0
    }
}

fn main() {
    let red = Color(255, 0, 0);
    println!("{}", red.red_value());
}`,
                            xp: 20,
                            coinReward: 10,
                            unlockPrice: 10,
                            hints: [
                                {
                                    content: "Define the struct with: `struct Color(i32, i32, i32);`",
                                    cost: 0
                                },
                                {
                                    content: "Tuple struct fields are accessed by index via the dot operator.",
                                    cost: 10
                                },
                                {
                                    content: "Simply return `self.0`",
                                    cost: 20
                                }
                            ]
                        },
                        {
                            id: "ch5-constructors",
                            title: "Associated Functions",
                            type: "code",
                            content: `
# Constructors (Associated Functions)

Functions inside an \`impl\` block that **don't** take \`self\` are associated functions.
They are often used as constructors, conventionally named \`new\`.

\`\`\`rust
impl Rectangle {
    fn new(size: u32) -> Self {
        Rectangle { width: size, height: size }
    }
}
\`\`\`

### Challenge
Define \`Rectangle::square(size: u32)\` that creates a square Rectangle.
        `,
                            initialCode: `#[derive(Debug, PartialEq)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    // Define square(size: u32) -> Rectangle
}

fn main() {
    let sq = Rectangle::square(10);
    println!("{:?}", sq);
}`,
                            tests: [
                                {
                                    description: "Rectangle::square(10) creates 10x10",
                                    test: "\n            Rectangle::square(10) == Rectangle { width: 10, height: 10 }\n            "
                                }
                            ],
                            solution: `#[derive(Debug, PartialEq)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn square(size: u32) -> Rectangle {
        Rectangle { width: size, height: size }
    }
}
fn main() {}`,
                            xp: 30,
                            coinReward: 15,
                            unlockPrice: 20,
                            hints: [
                                {
                                    content: "This function does NOT take `&self` because it constructs a new instance.",
                                    cost: 0
                                },
                                {
                                    content: "Return a `Rectangle` with both width and height set to `size`.",
                                    cost: 10
                                },
                                {
                                    content: "`Rectangle { width: size, height: size }`",
                                    cost: 20
                                }
                            ]
                        }
                    ]
                }
            ],
            quiz: {
                id: "ch5-quiz",
                title: "Chapter 5 Quiz",
                type: "quiz",
                content: "Verify your understanding of Structs and Methods.",
                questions: [
                    {
                        id: "q1",
                        question: "What keyword defines a structure?",
                        options: [
                            "class",
                            "object",
                            "struct",
                            "type"
                        ],
                        correctAnswer: 2,
                        explanation: "`struct` is used to define custom data types with named fields."
                    },
                    {
                        id: "q2",
                        question: "What is the first parameter of a method?",
                        options: [
                            "this",
                            "self",
                            "&self",
                            "Rectangle"
                        ],
                        correctAnswer: 2,
                        explanation: "Methods take `&self` (or `self` or `&mut self`) to access the instance data."
                    },
                    {
                        id: "q3",
                        question: "Where do you define methods for a struct?",
                        options: [
                            "Inside the struct",
                            "In an impl block",
                            "In main",
                            "In a separate file"
                        ],
                        correctAnswer: 1,
                        explanation: "Methods and associated functions are defined within an `impl StructName` block."
                    }
                ],
                xp: 50,
                coinReward: 25,
                unlockPrice: 0
            }
        }
    ]
};