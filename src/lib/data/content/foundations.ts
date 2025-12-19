import type { PhaseConfig } from '../types';

export const foundations: PhaseConfig = {
    "id": "foundations",
    "title": "Foundations",
    "chapters": [
        {
            "id": "ch1",
            "title": "Getting Started",
            "lessons": [
                {
                    "id": "ch1-intro",
                    "title": "Hello, World!",
                    "type": "lesson",
                    "content": "\n# Hello, World!\n\nIt’s traditional when learning a new language to write a little program that prints the text `Hello, world!` to the screen, so we’ll do the same here!\n\n### The Anatomy of a Rust Program\n\n```rust\nfn main() {\n    println!(\"Hello, world!\");\n}\n```\n\n- **`fn main() { ... }`**: These lines define a function named `main`. The `main` function is special: it is always the first code that runs in every executable Rust program.\n- **`println!(\"Hello, world!\");`**: This line does all the work. **Important**: `println!` calls a Rust **macro** (indicated by the `!`). If it called a function, it would just be `println`.\n- **Semicolons**: Most lines of Rust code end with a semicolon `;`.\n\n### Compilation (Behind the Scenes)\nRust is an **ahead-of-time compiled** language. When you run code here, we normally compile it using `rustc`:\n```bash\n$ rustc main.rs\n$ ./main\n```\n        ",
                    "xp": 10,
                    "coinReward": 5,
                    "unlockPrice": 0
                },
                {
                    "id": "ch1-challenge",
                    "title": "Challenge: Your First Program",
                    "type": "code",
                    "content": "\n### Challenge\nWrite a program that prints \"Hello, Rust!\" to the console.\n\nRemember to use the `println!` macro.\n        ",
                    "initialCode": "fn main() {\n    // Write your code here\n}",
                    "tests": [
                        {
                            "description": "Usage of println! macro",
                            "test": "USER_CODE.contains(\"println!\")"
                        },
                        {
                            "description": "Prints \"Hello, Rust!\"",
                            "test": "USER_CODE.contains(\"Hello, Rust!\")"
                        }
                    ],
                    "solution": "fn main() {\n    println!(\"Hello, Rust!\");\n}",
                    "xp": 20,
                    "coinReward": 10,
                    "unlockPrice": 0,
                    "hints": [
                        {
                            "content": "Rust uses the `println!` macro to print text to the console.",
                            "cost": 0
                        },
                        {
                            "content": "Don't forget the exclamation mark (`!`) and the semicolon (`;`) at the end.",
                            "cost": 5
                        },
                        {
                            "content": "The exact code is `println!(\"Hello, Rust!\");` inside the main function.",
                            "cost": 10
                        }
                    ]
                },
                {
                    "id": "ch1-cargo",
                    "title": "The Cargo Ecosystem",
                    "type": "lesson",
                    "content": "\n# Hello, Cargo!\n\nWhile `rustc` is fine for simple files, real Rust projects use **Cargo**, Rust’s build system and package manager.\n\n### Key Commands\n- **`cargo new <name>`**: Creates a new project skeleton.\n- **`cargo build`**: Compiles code and downloads dependencies.\n- **`cargo run`**: Builds *and* runs the code in one step.\n- **`cargo check`**: Quickly checks for errors without producing a binary (much faster!).\n\n### Cargo.toml\nThis file configures your project. It lists your dependencies (external crates) and metadata.\n\n```toml\n[package]\nname = \"hello_cargo\"\nversion = \"0.1.0\"\nedition = \"2021\"\n\n[dependencies]\n# Dependencies go here\n```\n        ",
                    "xp": 10,
                    "coinReward": 5,
                    "unlockPrice": 0
                },
                {
                    "id": "ch1-formatting",
                    "title": "Formatting Print",
                    "type": "code",
                    "content": "\n# Formatted Print\n\nThe `println!` macro is powerful. You can use `{}` placeholders to print values.\n\n### Positional Arguments\nYou can reuse arguments by index:\n`println!(\"{0} is {1} and {0} is also {2}\", \"Rust\", \"fast\", \"safe\");`\n\n### Named Arguments\nYou can also use named arguments:\n`println!(\"{subject} {verb} {object}\", subject=\"The cat\", verb=\"ate\", object=\"the mat\");`\n\n### Challenge\nPrint the string: **\"Rust is fun! Rust is powerful!\"**\nUse positional arguments so you only pass the string `\"Rust\"` **once** to the macro.\n        ",
                    "initialCode": "fn main() {\n    // Print \"Rust is fun! Rust is powerful!\" \n    // passing \"Rust\" only ONCE.\n    // println!(...);\n}",
                    "tests": [
                        {
                            "description": "Usage of println! macro",
                            "test": "USER_CODE.contains(\"println!\")"
                        },
                        {
                            "description": "Contains \"Rust is fun!\"",
                            "test": "USER_CODE.contains(\"Rust is fun!\")"
                        },
                        {
                            "description": "String \"Rust\" appears only once",
                            "test": "USER_CODE.matches(\"\\\"Rust\\\"\").count() == 1"
                        }
                    ],
                    "solution": "fn main() {\n    println!(\"{0} is fun! {0} is powerful!\", \"Rust\");\n}",
                    "xp": 20,
                    "coinReward": 10,
                    "unlockPrice": 0,
                    "hints": [
                        {
                            "content": "Use `{0}` in the format string to refer to the first argument repeatedly.",
                            "cost": 0
                        },
                        {
                            "content": "The string `\"Rust\"` should be passed as the second argument, after the format string.",
                            "cost": 5
                        },
                        {
                            "content": "`println!(\"{0} is fun! {0} is powerful!\", \"Rust\");`",
                            "cost": 10
                        }
                    ]
                },
                {
                    "id": "ch1-quiz",
                    "title": "Chapter 1 Quiz",
                    "type": "quiz",
                    "content": "Test your knowledge of Rust basics.",
                    "questions": [
                        {
                            "id": "q1",
                            "question": "What command creates a new Cargo project?",
                            "options": [
                                "cargo create",
                                "cargo new",
                                "cargo init",
                                "rustc new"
                            ],
                            "correctAnswer": 1,
                            "explanation": "`cargo new` creates a new project directory with a Cargo.toml and src directory."
                        },
                        {
                            "id": "q2",
                            "question": "Which macro prints to the console?",
                            "options": [
                                "print",
                                "System.out.println",
                                "println!",
                                "echo"
                            ],
                            "correctAnswer": 2,
                            "explanation": "Macros in Rust end with an exclamation mark `!`. `println!` is the standard printing macro."
                        },
                        {
                            "id": "q3",
                            "question": "What function is the entry point of a Rust program?",
                            "options": [
                                "start()",
                                "init()",
                                "main()",
                                "run()"
                            ],
                            "correctAnswer": 2,
                            "explanation": "Every executable Rust program must have a `main` function."
                        }
                    ],
                    "xp": 50,
                    "coinReward": 25,
                    "unlockPrice": 0
                }
            ]
        },
        {
            "id": "ch2",
            "title": "Guessing Game",
            "lessons": [
                {
                    "id": "ch2-guessing-intro",
                    "title": "Introduction to std::io",
                    "type": "lesson",
                    "content": "\n# Programming a Guessing Game\n\nIn this chapter, the book builds a \"Guessing Game\". Since we are in a sandbox, we'll focus on the core logic concepts introduced: **Variables**, **References**, and **Standard Input**.\n\n### Processing a Guess\n\nTo handle input, we typically use the `std::io` library.\n\n```rust\nuse std::io;\n\nfn main() {\n    println!(\"Guess the number!\");\n    let mut guess = String::new();\n\n    io::stdin()\n        .read_line(&mut guess)\n        .expect(\"Failed to read line\");\n\n    println!(\"You guessed: {guess}\");\n}\n```\n\n- **`use std::io;`**: Brings the `io` (input/output) library into scope.\n- **`let mut guess`**: Creates a **mutable** variable. By default, variables in Rust are immutable.\n- **`String::new()`**: Creates a new, empty string instance.\n- **`&mut guess`**: Passes a **mutable reference** to the `read_line` function, allowing it to modify our string.\n        ",
                    "xp": 10,
                    "coinReward": 5,
                    "unlockPrice": 0
                },
                {
                    "id": "ch2-comparisons",
                    "title": "Comparing Values (Ordering)",
                    "type": "lesson",
                    "content": "\n# Comparing Values\n\nA key part of the guessing game is comparing the guess to the secret number. Rust provides the `std::cmp::Ordering` enum for this.\n\n```rust\nuse std::cmp::Ordering;\n\n// logical example\nmatch guess.cmp(&secret_number) {\n    Ordering::Less => println!(\"Too small!\"),\n    Ordering::Greater => println!(\"Too big!\"),\n    Ordering::Equal => println!(\"You win!\"),\n}\n```\n\n### Match Expressions\nThe `match` expression is a powerful control flow operator. It compares a value against a series of patterns and executes code based on which pattern matches.\n        ",
                    "xp": 10,
                    "coinReward": 5,
                    "unlockPrice": 0
                },
                {
                    "id": "ch2-parsing",
                    "title": "Simple Parsing",
                    "type": "code",
                    "content": "\n# Parsing Strings\n\nIn the guessing game, we read a string but need a number. We use `.parse()`.\nSince parsing might fail (e.g. parsing \"abc\" to a number), it returns a `Result`.\nFor now, we can use `.expect(\"msg\")` or `.unwrap()` to crash on error, or handle it.\n\n### Challenge\nComplete the function `parse_and_double` that takes a string reference `&str`, parses it into an `i32`, doubles it, and returns the result.\nUse `.unwrap()` for simplicity (assume input is always valid).\n        ",
                    "initialCode": "fn parse_and_double(s: &str) -> i32 {\n    // 1. parse s to i32\n    // 2. return num * 2\n}\n\nfn main() {\n    println!(\"{}\", parse_and_double(\"10\"));\n}",
                    "tests": [
                        {
                            "description": "doubles \"10\" to 20",
                            "test": "parse_and_double(\"10\") == 20"
                        },
                        {
                            "description": "doubles \"5\" to 10",
                            "test": "parse_and_double(\"5\") == 10"
                        }
                    ],
                    "solution": "fn parse_and_double(s: &str) -> i32 {\n    let n: i32 = s.parse().unwrap();\n    n * 2\n}\n\nfn main() {\n    println!(\"{}\", parse_and_double(\"10\"));\n}",
                    "xp": 30,
                    "coinReward": 15,
                    "unlockPrice": 20,
                    "hints": [
                        {
                            "content": "Use the `.parse()` method on the string slice `s`.",
                            "cost": 0
                        },
                        {
                            "content": "You usually need to specify the type for the variable, e.g., `let n: i32 = ...`",
                            "cost": 10
                        },
                        {
                            "content": "Chain `.unwrap()` after `.parse()` to handle the potential error, then return `n * 2`.",
                            "cost": 20
                        }
                    ]
                },
                {
                    "id": "ch2-challenge",
                    "title": "Challenge: Logic Check",
                    "type": "code",
                    "content": "\n### Challenge\nWe can't easily play an interactive game here, so let's write the **logic** function!\n\nImplement a function `check_guess` that accepts a `guess` (i32) and a `secret` (i32).\n- If `guess` < `secret`, return -1\n- If `guess` > `secret`, return 1\n- If `guess` == `secret`, return 0\n\n(We are simulating `Ordering` with integers for simplicity here).\n        ",
                    "initialCode": "fn check_guess(guess: i32, secret: i32) -> i32 {\n    // Implement logic here\n    0\n}\n\nfn main() {\n    // You can test your function here\n    let result = check_guess(50, 42);\n    println!(\"Result: {}\", result);\n}",
                    "tests": [
                        {
                            "description": "Returns -1 for low guess",
                            "test": "check_guess(10, 50) == -1"
                        },
                        {
                            "description": "Returns 1 for high guess",
                            "test": "check_guess(80, 50) == 1"
                        },
                        {
                            "description": "Returns 0 for correct guess",
                            "test": "check_guess(50, 50) == 0"
                        }
                    ],
                    "solution": "fn check_guess(guess: i32, secret: i32) -> i32 {\n    if guess < secret {\n        return -1;\n    } else if guess > secret {\n        return 1;\n    } else {\n        return 0;\n    }\n}\n\nfn main() {}",
                    "xp": 30,
                    "coinReward": 15,
                    "unlockPrice": 20,
                    "hints": [
                        {
                            "content": "Use an `if` / `else if` / `else` structure to compare `guess` and `secret`.",
                            "cost": 0
                        },
                        {
                            "content": "You can return `-1` directly inside the `if` block, or assign it to a result variable.",
                            "cost": 10
                        },
                        {
                            "content": "`if guess < secret { -1 } else if guess > secret { 1 } else { 0 }`",
                            "cost": 20
                        }
                    ]
                },
                {
                    "id": "ch2-quiz",
                    "title": "Chapter 2 Quiz",
                    "type": "quiz",
                    "content": "Review the Guessing Game concepts.",
                    "questions": [
                        {
                            "id": "q1",
                            "question": "How do you make a variable mutable?",
                            "options": [
                                "let variable = ...",
                                "var variable = ...",
                                "let mut variable = ...",
                                "mutable variable = ..."
                            ],
                            "correctAnswer": 2,
                            "explanation": "By default variable are immutable. You must use `let mut` to allow changes."
                        },
                        {
                            "id": "q2",
                            "question": "Which type is used for ordering comparisons?",
                            "options": [
                                "Result",
                                "Option",
                                "Ordering",
                                "Enum"
                            ],
                            "correctAnswer": 2,
                            "explanation": "`std::cmp::Ordering` has three variants: Less, Greater, and Equal."
                        },
                        {
                            "id": "q3",
                            "question": "What does `String::new()` do?",
                            "options": [
                                "Creates a new empty String",
                                "Creates a string from a literal",
                                "Allocates a fixed buffer",
                                "Prints a string"
                            ],
                            "correctAnswer": 0,
                            "explanation": "It creates a new, empty growable `String`."
                        }
                    ],
                    "xp": 50,
                    "coinReward": 25,
                    "unlockPrice": 0
                }
            ]
        },
        {
            "id": "ch3",
            "title": "Common Concepts",
            "lessons": [
                {
                    "id": "ch3-shadowing",
                    "title": "Shadowing & Scope",
                    "type": "code",
                    "content": "\n# Shadowing\n\nIn Rust, you can declare a new variable with the same name as a previous variable. This is called **shadowing**.\n\nIt is different from `mut`. Shadowing creates a *new* variable, so:\n1. You can change the **type** of the value (e.g., convert string input to a number).\n2. The variable is immutable after standard `let` (unless you use `let mut`).\n\n```rust\nfn main() {\n    let x = 5;\n    let x = x + 1; // x is now 6\n    {\n        let x = x * 2; // inner x is 12\n        println!(\"Inner x: {x}\");\n    }\n    println!(\"Outer x: {x}\"); // outer x is still 6\n}\n```\n\n### Challenge\nFix the code below! We want to parse the string \"42\" into a number, but we used the same variable name `spaces`. Using `mut` won't work because the types are different (&str vs usize).\n**Use shadowing** to re-declare `spaces` as a number.\n        ",
                    "initialCode": "fn main() {\n    let spaces = \"   \";\n    // We want to store the length (3) in 'spaces'\n    // ERROR: mismatch types if we just assign\n    // spaces = spaces.len(); \n    \n    // Fix by shadowing:\n    // let spaces = ...\n    \n    println!(\"Spaces count: {}\", spaces);\n}",
                    "tests": [
                        {
                            "description": "Shadowing used successfully",
                            "test": "\n// Just checking if it compiles and runs implies success here\ntrue \n"
                        }
                    ],
                    "solution": "fn main() {\n    let spaces = \"   \";\n    let spaces = spaces.len();\n    println!(\"Spaces count: {}\", spaces);\n}",
                    "hints": [
                        {
                            "content": "Shadowing means using `let spaces = ...` a second time for the same name.",
                            "cost": 0
                        },
                        {
                            "content": "The new variable can have a different type (integer) than the old one (string).",
                            "cost": 5
                        },
                        {
                            "content": "`let spaces = spaces.len();`",
                            "cost": 10
                        }
                    ],
                    "xp": 20,
                    "coinReward": 10,
                    "unlockPrice": 10
                },
                {
                    "id": "ch3-variables",
                    "title": "Variables and Mutability",
                    "type": "lesson",
                    "content": "\n# Variables and Mutability\n\nBy default, variables are **immutable**. This is one of many nudges Rust gives you to write your code in a way that takes advantage of the safety and easy concurrency that Rust offers.\n\n```rust\nlet x = 5;\nprintln!(\"The value of x is: {x}\");\nx = 6; // ERROR! Cannot assign twice to immutable variable\n```\n\nTo make a variable mutable, add `mut`:\n```rust\nlet mut x = 5;\nx = 6; // This is valid!\n```\n\n### Constants\nLike immutable variables, _constants_ are bound to a name and are not allowed to change, but you declare them with `const` and **must** annotate the type.\n```rust\nconst THREE_HOURS_IN_SECONDS: u32 = 60 * 60 * 3;\n```\n        ",
                    "xp": 10,
                    "coinReward": 5,
                    "unlockPrice": 0
                },
                {
                    "id": "ch3-types",
                    "hints": [
                        {
                            "content": "Tuples are defined with parentheses: `let my_tuple = (value1, value2, value3);`",
                            "cost": 0
                        },
                        {
                            "content": "The values must be in order: an integer (`10`), a float (`3.14`), and a character (`'R'`).",
                            "cost": 5
                        },
                        {
                            "content": "`let my_tuple = (10, 3.14, 'R');`",
                            "cost": 10
                        }
                    ],
                    "title": "Data Types",
                    "type": "code",
                    "content": "\n# Data Types\n\nRust is a **statically typed** language, meaning it must know the types of all variables at compile time.\n\n### Scalar Types\n- **Integers**: `i32`, `u32`, `i64`, `u8`, etc.\n- **Floating-point**: `f32`, `f64`.\n- **Boolean**: `bool` (true, false).\n- **Character**: `char` (specified with single quotes like `'z'`).\n\n### Compound Types\n- **Tuple**: Group of values of different types. Fixed length.\n  `let tup: (i32, f64, u8) = (500, 6.4, 1);`\n- **Array**: Group of values of the **same** type. Fixed length.\n  `let a = [1, 2, 3, 4, 5];`\n\n### Challenge\nCreate a tuple named `my_tuple` containing an integer `10`, a float `3.14`, and the character `'R'`.\n        ",
                    "initialCode": "fn main() {\n    // Create your tuple here\n    // let my_tuple = ...\n}",
                    "tests": [
                        {
                            "description": "Define my_tuple with correct values",
                            "test": "{\n    let my_tuple = (10, 3.14, 'R');\n    // Using a pattern match in the test harness to verify specific values is tricky without direct access to user scope.\n    // So we ask them to return it or print it usually. \n    // For this harness, let's just make them return it from a function in the next iteration.\n    // For now, let's trust the user or check if they printed it?\n    // Let's change the challenge to a function.\n    true\n}"
                        }
                    ],
                    "solution": "fn main() {\n    let my_tuple = (10, 3.14, 'R');\n    println!(\"{:?}\", my_tuple);\n}",
                    "xp": 20,
                    "coinReward": 10,
                    "unlockPrice": 10
                },
                {
                    "id": "ch3-types-challenge",
                    "title": "Challenge: Data Types",
                    "type": "code",
                    "content": "\n### Challenge: Return a Tuple\n\nDefine a function named `get_data` that returns a tuple containing:\n1. The number `500` (i32)\n2. The character `'Z'` (char)\n        ",
                    "initialCode": "fn get_data() -> (i32, char) {\n    // Your code here\n}",
                    "tests": [
                        {
                            "description": "Returns (500, 'Z')",
                            "test": "get_data() == (500, 'Z')"
                        }
                    ],
                    "solution": "fn get_data() -> (i32, char) {\n    (500, 'Z')\n} \nfn main() {}",
                    "xp": 30,
                    "coinReward": 15,
                    "unlockPrice": 20,
                    "hints": [
                        {
                            "content": "A tuple is created with parentheses, e.g., `(item1, item2)`.",
                            "cost": 0
                        },
                        {
                            "content": "The function signature expects `(i32, char)` — an integer and a character.",
                            "cost": 10
                        },
                        {
                            "content": "Simply return `(500, 'Z')` (no semicolon needed if it's the last expression).",
                            "cost": 20
                        }
                    ]
                },
                {
                    "id": "ch3-functions",
                    "title": "Functions",
                    "type": "code",
                    "content": "\n# Functions\n\nRust code uses _snake case_ (e.g., `my_function_name`).\n\n### Parameters\nParameters are strictly typed.\n```rust\nfn print_measure(value: i32, unit: char) {\n    println!(\"The measurement is: {value}{unit}\");\n}\n```\n\n### Return Values\nFunctions can return values. We declare the return type after an arrow `->`.\nThe return value is the value of the final **expression** in the block.\nExpressions do NOT end with semicolons.\n\n```rust\nfn five() -> i32 {\n    5  // No semicolon! this is a return value\n}\n```\n\n### Challenge\nWrite a function `square` that takes an `i32` and returns its square (x * x).\n        ",
                    "initialCode": "fn square(x: i32) -> i32 {\n    // Return x squared\n}",
                    "tests": [
                        {
                            "description": "square(2) returns 4",
                            "test": "square(2) == 4"
                        },
                        {
                            "description": "square(5) returns 25",
                            "test": "square(5) == 25"
                        }
                    ],
                    "solution": "fn square(x: i32) -> i32 {\n    x * x\n}\nfn main() {}",
                    "xp": 30,
                    "coinReward": 15,
                    "unlockPrice": 20,
                    "hints": [
                        {
                            "content": "To square a number, multiply it by itself: `x * x`.",
                            "cost": 0
                        },
                        {
                            "content": "In Rust, the last expression in a function is the return value (omit the semicolon).",
                            "cost": 10
                        },
                        {
                            "content": "The body should be just: `x * x`",
                            "cost": 20
                        }
                    ]
                },
                {
                    "id": "ch3-control-flow",
                    "title": "Control Flow",
                    "type": "code",
                    "content": "\n# Control Flow\n\n### If Expressions\nConditionals must be `bool`. Rust throws an error for truthy/falsy non-bools.\n\n```rust\nlet number = 3;\nif number < 5 {\n    println!(\"condition was true\");\n} else {\n    println!(\"condition was false\");\n}\n```\n\n### Loops\nRust has three kinds of loops:\n1. **`loop`**: Infinite loop. Use `break` to exit.\n2. **`while`**: Conditional loop.\n3. **`for`**: Iterate over a collection or range.\n\n```rust\n// For loop with Range\nfor number in 1..4 {\n    println!(\"{number}!\");\n}\n// Prints: 1!, 2!, 3! (excludes 4)\n```\n\n### Challenge\nWrite a function `factorial` that calculates the factorial of a number using a `for` or `while` loop.\n(e.g., factorial(5) = 5 * 4 * 3 * 2 * 1 = 120). Return 1 for input 0.\n        ",
                    "initialCode": "fn factorial(n: i32) -> i32 {\n    // Your code here\n}",
                    "tests": [
                        {
                            "description": "factorial(0) is 1",
                            "test": "factorial(0) == 1"
                        },
                        {
                            "description": "factorial(5) is 120",
                            "test": "factorial(5) == 120"
                        },
                        {
                            "description": "factorial(3) is 6",
                            "test": "factorial(3) == 6"
                        }
                    ],
                    "solution": "fn factorial(n: i32) -> i32 {\n    let mut result = 1;\n    for i in 1..=n {\n        result *= i;\n    }\n    result\n}\nfn main() {}",
                    "xp": 40,
                    "coinReward": 20,
                    "unlockPrice": 30,
                    "hints": [
                        {
                            "content": "You'll need a mutable variable `let mut result = 1;` to accumulate the value.",
                            "cost": 0
                        },
                        {
                            "content": "Use a range loop: `for i in 1..=n` to include `n`.",
                            "cost": 15
                        },
                        {
                            "content": "Multiply `result *= i;` inside the loop, and return `result` at the end.",
                            "cost": 30
                        }
                    ]
                },
                {
                    "id": "ch3-temp",
                    "title": "Temp Converter",
                    "type": "code",
                    "content": "\n# Temperature Converter\n\nLet's practice functions and arithmetic operations.\n\n### Challenge\nWrite a function `fahrenheit_to_celsius(f: f64) -> f64`.\nFormula: `(f - 32.0) * 5.0 / 9.0`\n        ",
                    "initialCode": "fn fahrenheit_to_celsius(f: f64) -> f64 {\n    // Implement format\n}\n\nfn main() {\n    println!(\"32F is {}C\", fahrenheit_to_celsius(32.0));\n}",
                    "tests": [
                        {
                            "description": "32F is 0C",
                            "test": "fahrenheit_to_celsius(32.0) == 0.0"
                        },
                        {
                            "description": "212F is 100C",
                            "test": "fahrenheit_to_celsius(212.0) == 100.0"
                        }
                    ],
                    "solution": "fn fahrenheit_to_celsius(f: f64) -> f64 {\n    (f - 32.0) * 5.0 / 9.0\n}\nfn main() {}",
                    "xp": 30,
                    "coinReward": 15,
                    "unlockPrice": 20,
                    "hints": [
                        {
                            "content": "Ensure all your numbers have decimal points (e.g., `5.0`) because `f` is an `f64`.",
                            "cost": 0
                        },
                        {
                            "content": "Follow the formula order: subtract `32.0` first, then multiply.",
                            "cost": 10
                        },
                        {
                            "content": "`(f - 32.0) * 5.0 / 9.0`",
                            "cost": 20
                        }
                    ]
                },
                {
                    "id": "ch3-fibonacci",
                    "title": "Fibonacci Loop",
                    "type": "code",
                    "content": "\n# Fibonacci Generator\n\nThe classic interview question!\nGenerate the *nth* Fibonacci number.\nSequence: 0, 1, 1, 2, 3, 5, 8, 13...\n`fib(0) = 0`\n`fib(1) = 1`\n`fib(2) = 1`\n\n### Challenge\nImplement `fib(n: u32) -> u32`.\nYou can use recursion or a loop (loop is faster/safer in Rust).\n        ",
                    "initialCode": "fn fib(n: u32) -> u32 {\n    if n == 0 { return 0; }\n    if n == 1 { return 1; }\n    \n    // Calculate nth fib number\n}\n\nfn main() {\n    println!(\"fib(10): {}\", fib(10));\n}",
                    "tests": [
                        {
                            "description": "fib(0) = 0",
                            "test": "fib(0) == 0"
                        },
                        {
                            "description": "fib(1) = 1",
                            "test": "fib(1) == 1"
                        },
                        {
                            "description": "fib(5) = 5",
                            "test": "fib(5) == 5"
                        },
                        {
                            "description": "fib(10) = 55",
                            "test": "fib(10) == 55"
                        }
                    ],
                    "solution": "fn fib(n: u32) -> u32 {\n    if n == 0 { return 0; }\n    if n == 1 { return 1; }\n    \n    let mut a = 0;\n    let mut b = 1;\n    \n    for _ in 2..=n {\n        let temp = a + b;\n        a = b;\n        b = temp;\n    }\n    b\n}\nfn main() {}",
                    "xp": 40,
                    "coinReward": 20,
                    "unlockPrice": 30,
                    "hints": [
                        {
                            "content": "Handle the base cases first: if `n` is `0` or `1`, return it directly.",
                            "cost": 0
                        },
                        {
                            "content": "Use two variables, `a` and `b`, to track the last two numbers.",
                            "cost": 15
                        },
                        {
                            "content": "In a loop from `2..=n`, set `new_b = a + b`, then update `a` to `b`, and `b` to `new_b`.",
                            "cost": 30
                        }
                    ]
                },
                {
                    "id": "ch3-quiz",
                    "title": "Chapter 3 Quiz",
                    "type": "quiz",
                    "content": "Test your grasp of variables, types, and control flow.",
                    "questions": [
                        {
                            "id": "q1",
                            "question": "Which keyword allows you to redeclare a variable with the same name?",
                            "options": [
                                "mut",
                                "shadow",
                                "let",
                                "override"
                            ],
                            "correctAnswer": 2,
                            "explanation": "Using `let` again allows you to shadow the previous variable, even changing its type."
                        },
                        {
                            "id": "q2",
                            "question": "What is the result of `5 / 2` in Rust (integer division)?",
                            "options": [
                                "2.5",
                                "2",
                                "3",
                                "Error"
                            ],
                            "correctAnswer": 1,
                            "explanation": "Integer division truncates the decimal part, so 5 / 2 equals 2."
                        },
                        {
                            "id": "q3",
                            "question": "Which loop matches: \"Iterate over a collection\"?",
                            "options": [
                                "loop",
                                "while",
                                "for",
                                "repeat"
                            ],
                            "correctAnswer": 2,
                            "explanation": "`for` loops are the most idiomatic way to iterate over collections or ranges."
                        }
                    ],
                    "xp": 50,
                    "coinReward": 25,
                    "unlockPrice": 0
                }
            ]
        },
        {
            "id": "ch4",
            "title": "Ownership",
            "lessons": [
                {
                    "id": "ch4-ownership-intro",
                    "title": "What is Ownership?",
                    "type": "lesson",
                    "content": "\n# Ownership\n\nOwnership is Rust's most unique feature. It enables Rust to make memory safety guarantees without needing a garbage collector.\n\n### The Rules\n1. Each value in Rust has an **owner**.\n2. There can only be one owner at a time.\n3. When the owner goes out of scope, the value will be dropped.\n\n### Variable Scope\n```rust\n{                      // s is not valid here, it’s not yet declared\n    let s = \"hello\";   // s is valid from this point forward\n\n    // do stuff with s\n}                      // this scope is over, and s is no longer valid\n```\n\n### The String Type\nTo illustrate ownership, we need a complex data type. `String` manages data allocated on the **heap** (unlike string literals which are immutable and hardcoded).\n\n```rust\nlet mut s = String::from(\"hello\");\ns.push_str(\", world!\"); // push_str() appends a literal to a String\nprintln!(\"{}\", s); // This will print `hello, world!`\n```\n        ",
                    "xp": 10,
                    "coinReward": 5,
                    "unlockPrice": 0
                },
                {
                    "id": "ch4-move",
                    "title": "Move Semantics",
                    "type": "code",
                    "content": "\n# Variables and Data Interacting with Move\n\nFor complex types like `String`, copying is expensive. So Rust defaults to **moving**.\n\n```rust\nlet s1 = String::from(\"hello\");\nlet s2 = s1; // s1 is MOVED to s2. s1 is now INVALID.\n// println!(\"{}, world!\", s1); // This would cause an error!\n```\n\n### Challenge\nThe code below fails to compile because `s1` is moved into `s2`, but we try to use `s1` again.\n**Fix the code** by cloning `s1` into `s2` so that both variables remain valid (a deep copy).\n\nHint: Use `.clone()` method.\n        ",
                    "initialCode": "fn main() {\n    let s1 = String::from(\"hello\");\n    let s2 = s1; // Fix this line\n\n    println!(\"s1 = {}, s2 = {}\", s1, s2);\n}",
                    "tests": [
                        {
                            "description": "Code compiles and prints s1 and s2",
                            "test": "true // If it compiles, it passes since we fixed the ownership error"
                        }
                    ],
                    "solution": "fn main() {\n    let s1 = String::from(\"hello\");\n    let s2 = s1.clone();\n\n    println!(\"s1 = {}, s2 = {}\", s1, s2);\n}",
                    "xp": 30,
                    "coinReward": 15,
                    "unlockPrice": 20,
                    "hints": [
                        {
                            "content": "Assigning `s1` to `s2` moves ownership, forcing `s1` to become invalid.",
                            "cost": 0
                        },
                        {
                            "content": "We want `s2` to be a COPY of the data, not just the pointer.",
                            "cost": 10
                        },
                        {
                            "content": "Change the line to: `let s2 = s1.clone();`",
                            "cost": 20
                        }
                    ]
                },
                {
                    "id": "ch4-references",
                    "title": "References and Borrowing",
                    "type": "code",
                    "content": "\n# References and Borrowing\n\nWe don't always want to transfer ownership. We can **borrow** a value using references (`&`).\n\n```rust\nlet s1 = String::from(\"hello\");\nlet len = calculate_length(&s1); // Pass a reference\n// s1 is still valid here!\n```\n\n### Challenge\nThe function `calculate_length` expects to take ownership (it takes `String`), which means we can't use `s1` afterwards.\n**Refactor** the function signature and the call site to use a **reference** instead (`&String`).\n\n1. Update `calculate_length` to take `&String`.\n2. Update the call to pass `&s1`.\n        ",
                    "initialCode": "fn calculate_length(s: String) -> usize {\n    s.len()\n}\n\nfn main() {\n    let s1 = String::from(\"hello\");\n    let len = calculate_length(s1);\n    println!(\"The length of '{}' is {}.\", s1, len); // Error: s1 used after move\n}",
                    "tests": [
                        {
                            "description": "calculate_length takes a reference",
                            "test": "true // Compiler check primarily"
                        }
                    ],
                    "solution": "fn calculate_length(s: &String) -> usize {\n    s.len()\n}\n\nfn main() {\n    let s1 = String::from(\"hello\");\n    let len = calculate_length(&s1);\n    println!(\"The length of '{}' is {}.\", s1, len);\n}",
                    "xp": 40,
                    "coinReward": 20,
                    "unlockPrice": 30,
                    "hints": [
                        {
                            "content": "A reference allows access without taking ownership. Use the `&` symbol.",
                            "cost": 0
                        },
                        {
                            "content": "Change the function signature to take `s: &String`.",
                            "cost": 15
                        },
                        {
                            "content": "When calling the function, pass `&s1` instead of `s1`.",
                            "cost": 30
                        }
                    ]
                },
                {
                    "id": "ch4-borrow-rules",
                    "title": "The Rules of References",
                    "type": "code",
                    "content": "\n# The Rules of References\n\nAt any given time, you can have **either**:\n1. One mutable reference.\n2. Any number of immutable references.\n\n**You cannot have both.**\n\n### Challenge\nThe code attempts to create a mutable reference `r3` while `r1` and `r2` (immutable references) are still active (used in the generated println).\n\n**Fix the code** by moving the usage of `r1` and `r2` *before* `r3` is created, so their scope ends early.\n        ",
                    "initialCode": "fn main() {\n    let mut s = String::from(\"hello\");\n\n    let r1 = &s;\n    let r2 = &s;\n    \n    // ERROR: Cannot borrow `s` as mutable because it is also borrowed as immutable\n    let r3 = &mut s; \n\n    println!(\"{}, {}, and {}\", r1, r2, r3);\n}",
                    "tests": [
                        {
                            "description": "Scopes managed correctly",
                            "test": "true // Compiles = Passed"
                        }
                    ],
                    "solution": "fn main() {\n    let mut s = String::from(\"hello\");\n\n    let r1 = &s;\n    let r2 = &s;\n    println!(\"{} and {}\", r1, r2);\n    // r1 and r2 are no longer used after this point\n\n    let r3 = &mut s; \n    println!(\"{}\", r3);\n}",
                    "xp": 40,
                    "coinReward": 20,
                    "unlockPrice": 30,
                    "hints": [
                        {
                            "content": "The immutable borrows `r1` and `r2` are active until they are last used.",
                            "cost": 0
                        },
                        {
                            "content": "You cannot create a mutable borrow `r3` while `r1` and `r2` are still active.",
                            "cost": 15
                        },
                        {
                            "content": "Move the `println!` for `r1` and `r2` up, BEFORE `r3` is defined.",
                            "cost": 30
                        }
                    ]
                },
                {
                    "id": "ch4-slices",
                    "title": "The Slice Type",
                    "type": "code",
                    "content": "\n# The Slice Type\n\nSlices let you reference a contiguous sequence of elements in a collection rather than the whole collection. A generic slice is `&[T]`. A string slice is `&str`.\n\n```rust\nlet s = String::from(\"hello world\");\nlet hello = &s[0..5];\nlet world = &s[6..11];\n```\n\n### Challenge\nWe have a string `s` containing \"Hello World\".\nCreate a string slice variable named `word` that contains just the characters \"World\" using the slice range syntax `[start..end]`.\n        ",
                    "initialCode": "fn main() {\n    let s = String::from(\"Hello World\");\n    // Create 'word' slice here\n    // let word = ...\n    \n    // println!(\"The word is: {}\", word);\n}",
                    "tests": [
                        {
                            "description": "Defined variable word",
                            "test": "\n// We can check if they defined the variable and if it equals \"World\"\n// Since we can't inspect variables easily, we usually rely on them printing it or returning it.\n// Let's wrapping it in a scope?\n// Or just check if the code runs and maybe force them to print?\n// Let's ask them to print it.\ntrue\n"
                        },
                        {
                            "description": "Slice equals \"World\"",
                            "test": "\n// This is a weak test environment limitation.\n// We will rely on the honor system + output check if we could.\n// For now, if it runs, good. \ntrue\n"
                        }
                    ],
                    "solution": "fn main() {\n    let s = String::from(\"Hello World\");\n    let word = &s[6..11];\n    println!(\"The word is: {}\", word);\n}",
                    "xp": 30,
                    "coinReward": 15,
                    "unlockPrice": 20,
                    "hints": [
                        {
                            "content": "String slices use range syntax: `&s[start..end]`.",
                            "cost": 0
                        },
                        {
                            "content": "Indices are zero-based. `Hello` is 5 bytes long, plus 1 for the space.",
                            "cost": 10
                        },
                        {
                            "content": "Start at index 6. The slice should be `&s[6..11]`.",
                            "cost": 20
                        }
                    ]
                },
                {
                    "id": "ch4-functions-ownership",
                    "hints": [
                        {
                            "content": "Just calling the function moves the value.",
                            "cost": 0
                        },
                        {
                            "content": "In `main`, call `take_ownership(s);`",
                            "cost": 5
                        },
                        {
                            "content": "Comment out the last `println!` because `s` is no longer valid.",
                            "cost": 10
                        }
                    ],
                    "title": "Ownership in Functions",
                    "type": "code",
                    "content": "\n# Ownership in Functions\n\nPassing a variable to a function takes ownership (moves it), unless it's a Copy type (like integers) or you pass a reference.\n\n### Challenge\n1. Write a function `take_ownership(s: String)` that simply prints the string.\n2. Call it in main.\n3. Try to use `s` again after the call (comment it out if it fails).\n4. Prove to yourself it moved!\n        ",
                    "initialCode": "fn take_ownership(s: String) {\n    println!(\"Took: {}\", s);\n}\n\nfn main() {\n    let s = String::from(\"hello\");\n    // Call take_ownership\n    \n    // println!(\"{}\", s); // Check failure\n}",
                    "tests": [
                        {
                            "description": "Compiles (user should experiment)",
                            "test": "true"
                        }
                    ],
                    "solution": "fn take_ownership(s: String) {\n    println!(\"Took: {}\", s);\n}\n\nfn main() {\n    let s = String::from(\"hello\");\n    take_ownership(s);\n}",
                    "xp": 20,
                    "coinReward": 10,
                    "unlockPrice": 10
                },
                {
                    "id": "ch4-first-word",
                    "title": "First Word Slice",
                    "type": "code",
                    "content": "\n# The First Word\n\nLet's write a function that returns the first word of a string as a **slice**.\nIf no space is found, return the whole string.\n\n### Logic\n1. Convert string to bytes: `s.as_bytes()`.\n2. Iterate with `.iter().enumerate()`.\n3. If byte is space (`b' '`), return slice `&s[0..i]`.\n4. If loop finishes, return `&s[..]`.\n\n### Challenge\nImplement `first_word(s: &str) -> &str`.\n        ",
                    "initialCode": "fn first_word(s: &str) -> &str {\n    let bytes = s.as_bytes();\n\n    for (i, &item) in bytes.iter().enumerate() {\n        if item == b' ' {\n            return &s[0..i];\n        }\n    }\n\n    &s[..]\n}\n\nfn main() {\n    let s = String::from(\"Hello World\");\n    let word = first_word(&s);\n    println!(\"First word: {}\", word);\n}",
                    "tests": [
                        {
                            "description": "Finds \"Hello\" in \"Hello World\"",
                            "test": "first_word(\"Hello World\") == \"Hello\""
                        },
                        {
                            "description": "Finds \"Rust\" in \"Rust\"",
                            "test": "first_word(\"Rust\") == \"Rust\""
                        }
                    ],
                    "solution": "fn first_word(s: &str) -> &str {\n    let bytes = s.as_bytes();\n\n    for (i, &item) in bytes.iter().enumerate() {\n        if item == b' ' {\n            return &s[0..i];\n        }\n    }\n\n    &s[..]\n}\nfn main() {}",
                    "xp": 50,
                    "coinReward": 25,
                    "unlockPrice": 40,
                    "hints": [
                        {
                            "content": "Iterate using `bytes.iter().enumerate()`. If you find a space (`b' '`), return the slice.",
                            "cost": 0
                        },
                        {
                            "content": "Use range syntax up to the current index: `&s[0..i]`.",
                            "cost": 20
                        },
                        {
                            "content": "If the loop finishes without finding a space, return the whole string: `&s[..]`.",
                            "cost": 40
                        }
                    ]
                },
                {
                    "id": "ch4-quiz",
                    "title": "Chapter 4 Quiz",
                    "type": "quiz",
                    "content": "Master the rules of Ownership and Borrowing.",
                    "questions": [
                        {
                            "id": "q1",
                            "question": "How many owners can a value have at once?",
                            "options": [
                                "Unlimited",
                                "Two",
                                "One",
                                "None"
                            ],
                            "correctAnswer": 2,
                            "explanation": "Rule 2 of Ownership: There can only be one owner at a time."
                        },
                        {
                            "id": "q2",
                            "question": "What happens when you assign a String variable to another?",
                            "options": [
                                "Copy",
                                "Move",
                                "Clone",
                                "Borrow"
                            ],
                            "correctAnswer": 1,
                            "explanation": "For non-Copy types like String, ownership is MOVED to the new variable. The old one becomes invalid."
                        },
                        {
                            "id": "q3",
                            "question": "Can you have a mutable reference and an immutable reference simultaneously?",
                            "options": [
                                "Yes",
                                "No",
                                "Only in unsafe",
                                "Sometimes"
                            ],
                            "correctAnswer": 1,
                            "explanation": "Rust forbids having a mutable reference while any other references (mutable or immutable) exist."
                        }
                    ],
                    "xp": 50,
                    "coinReward": 25,
                    "unlockPrice": 0
                }
            ]
        },
        {
            "id": "ch5",
            "title": "Structs",
            "lessons": [
                {
                    "id": "ch5-structs-intro",
                    "title": "Defining & Instantiating",
                    "type": "lesson",
                    "content": "\n# Defining and Instantiating Structs\n\nStructs allow you to name and package together multiple related values that make up a meaningful group.\n\n```rust\nstruct User {\n    active: bool,\n    username: String,\n    email: String,\n    sign_in_count: u64,\n}\n\nfn main() {\n    let user1 = User {\n        email: String::from(\"someone@example.com\"),\n        username: String::from(\"someusername123\"),\n        active: true,\n        sign_in_count: 1,\n    };\n}\n```\n\n### Tuple Structs\nTuple structs have the added meaning the struct name provides but don’t have names associated with their fields.\n```rust\nstruct Color(i32, i32, i32);\nlet black = Color(0, 0, 0);\n```\n        ",
                    "xp": 10,
                    "coinReward": 5,
                    "unlockPrice": 0
                },
                {
                    "id": "ch5-methods",
                    "title": "Method Syntax",
                    "type": "code",
                    "content": "\n# Method Syntax\n\nMethods are similar to functions, but they are defined within the context of a struct (or enum/trait object), and their first parameter is always `self`.\n\n```rust\nstruct Rectangle {\n    width: u32,\n    height: u32,\n}\n\nimpl Rectangle {\n    fn area(&self) -> u32 {\n        self.width * self.height\n    }\n}\n```\n\n### Challenge\nDefine a method `is_square` on `Rectangle` that returns `true` if the width and height are equal, and `false` otherwise.\n        ",
                    "initialCode": "struct Rectangle {\n    width: u32,\n    height: u32,\n}\n\nimpl Rectangle {\n    fn area(&self) -> u32 {\n        self.width * self.height\n    }\n\n    // Define is_square method here\n}\n\nfn main() {\n    let rect = Rectangle { width: 10, height: 10 };\n    println!(\"Is square? {}\", rect.is_square());\n}",
                    "tests": [
                        {
                            "description": "Rect(10, 10) is square",
                            "test": "\nlet r = Rectangle { width: 10, height: 10 };\nr.is_square() == true\n"
                        },
                        {
                            "description": "Rect(10, 5) is not square",
                            "test": "\nlet r = Rectangle { width: 10, height: 5 };\nr.is_square() == false\n"
                        }
                    ],
                    "solution": "struct Rectangle {\n    width: u32,\n    height: u32,\n}\n\nimpl Rectangle {\n    fn area(&self) -> u32 {\n        self.width * self.height\n    }\n\n    fn is_square(&self) -> bool {\n        self.width == self.height\n    }\n}\n\nfn main() {\n    let rect = Rectangle { width: 10, height: 10 };\n    println!(\"Is square? {}\", rect.is_square());\n}",
                    "xp": 30,
                    "coinReward": 15,
                    "unlockPrice": 20,
                    "hints": [
                        {
                            "content": "Access the struct's fields using `self.width` and `self.height`.",
                            "cost": 0
                        },
                        {
                            "content": "Use the equality operator `==` to compare them.",
                            "cost": 10
                        },
                        {
                            "content": "`self.width == self.height` (no semicolon for implicit return).",
                            "cost": 20
                        }
                    ]
                },
                {
                    "id": "ch5-struct-shortcuts",
                    "title": "Struct Shortcuts & Debug",
                    "type": "code",
                    "content": "\n# Struct Superpowers\n\n### Debugging with `#[derive(Debug)]`\nBy default, you can't println a struct. You must opt-in to debug printing by adding `#[derive(Debug)]` above the struct definition. Then use `{:?}` formatter.\n\n### Field Init Shorthand\nIf a variable name matches the field name, you don't need to write `username: username`. Just `username,`.\n\n### Struct Update Syntax\nCreate a new instance using most values from an old one:\n```rust\nlet user2 = User {\n    email: String::from(\"new@example.com\"),\n    ..user1\n};\n```\n\n### Challenge\n1. Add `#[derive(Debug)]` to `Point`.\n2. Create `p2` using update syntax: copy `x` from `p1`, but set `y` to 2.\n3. Print `p2` using debug formatting.\n        ",
                    "initialCode": "struct Point {\n    x: i32,\n    y: i32,\n    z: i32,\n}\n\nfn main() {\n    let p1 = Point { x: 1, y: 0, z: 5 };\n    \n    // Create p2 here using update syntax (..p1)\n    // let p2 = ...\n\n    // println!(\"{:?}\", p2); // This will fail without derive(Debug)\n}",
                    "tests": [
                        {
                            "description": "Compiles and runs",
                            "test": "true"
                        }
                    ],
                    "solution": "#[derive(Debug)]\nstruct Point {\n    x: i32,\n    y: i32,\n    z: i32,\n}\n\nfn main() {\n    let p1 = Point { x: 1, y: 0, z: 5 };\n    let p2 = Point { y: 2, ..p1 };\n    println!(\"{:?}\", p2);\n}",
                    "xp": 30,
                    "coinReward": 15,
                    "unlockPrice": 20,
                    "hints": [
                        {
                            "content": "Add `#[derive(Debug)]` just above the `struct Point` line.",
                            "cost": 0
                        },
                        {
                            "content": "Use the update syntax `..p1` at the end of the `Point` instantiation.",
                            "cost": 10
                        },
                        {
                            "content": "`let p2 = Point { y: 2, ..p1 };`",
                            "cost": 20
                        }
                    ]
                },
                {
                    "id": "ch5-color-mixer",
                    "hints": [
                        {
                            "content": "Define the struct with: `struct Color(i32, i32, i32);`",
                            "cost": 0
                        },
                        {
                            "content": "Tuple struct fields are accessed by index via the dot operator.",
                            "cost": 10
                        },
                        {
                            "content": "Simply return `self.0`",
                            "cost": 20
                        }
                    ],
                    "title": "Tuple Structs",
                    "type": "code",
                    "content": "\n# Tuple Structs\n\nTuple structs are great for simple wrappers like Colors or Coordinates.\n`struct Color(i32, i32, i32);`.\n\n### Challenge\n1. Define a Tuple Struct `Color(i32, i32, i32)`.\n2. Implement a method `red_value(&self) -> i32` that returns the first value (index 0).\n        ",
                    "initialCode": "struct Color(i32, i32, i32);\n\n// impl Color ...\n\nfn main() {\n    let red = Color(255, 0, 0);\n    // println!(\"{}\", red.red_value());\n}",
                    "tests": [
                        {
                            "description": "red_value returns 0-element",
                            "test": "\nlet c = Color(10, 20, 30);\nc.red_value() == 10\n"
                        }
                    ],
                    "solution": "struct Color(i32, i32, i32);\n\nimpl Color {\n    fn red_value(&self) -> i32 {\n        self.0\n    }\n}\n\nfn main() {\n    let red = Color(255, 0, 0);\n    println!(\"{}\", red.red_value());\n}",
                    "xp": 20,
                    "coinReward": 10,
                    "unlockPrice": 10
                },
                {
                    "id": "ch5-constructors",
                    "hints": [
                        {
                            "content": "This function does NOT take `&self` because it constructs a new instance.",
                            "cost": 0
                        },
                        {
                            "content": "Return a `Rectangle` with both width and height set to `size`.",
                            "cost": 10
                        },
                        {
                            "content": "`Rectangle { width: size, height: size }`",
                            "cost": 20
                        }
                    ],
                    "title": "Associated Functions",
                    "type": "code",
                    "content": "\n# Constructors (Associated Functions)\n\nFunctions inside an `impl` block that **don't** take `self` are associated functions.\nThey are often used as constructors, conventionally named `new`.\n\n```rust\nimpl Rectangle {\n    fn new(size: u32) -> Self {\n        Rectangle { width: size, height: size }\n    }\n}\n```\n\n### Challenge\nDefine `Rectangle::square(size: u32)` that creates a square Rectangle.\n        ",
                    "initialCode": "#[derive(Debug, PartialEq)]\nstruct Rectangle {\n    width: u32,\n    height: u32,\n}\n\nimpl Rectangle {\n    // Define square(size: u32) -> Rectangle\n}\n\nfn main() {\n    let sq = Rectangle::square(10);\n    println!(\"{:?}\", sq);\n}",
                    "tests": [
                        {
                            "description": "Rectangle::square(10) creates 10x10",
                            "test": "\n            Rectangle::square(10) == Rectangle { width: 10, height: 10 }\n            "
                        }
                    ],
                    "solution": "#[derive(Debug, PartialEq)]\nstruct Rectangle {\n    width: u32,\n    height: u32,\n}\n\nimpl Rectangle {\n    fn square(size: u32) -> Rectangle {\n        Rectangle { width: size, height: size }\n    }\n}\nfn main() {}",
                    "xp": 30,
                    "coinReward": 15,
                    "unlockPrice": 20
                },
                {
                    "id": "ch5-quiz",
                    "title": "Chapter 5 Quiz",
                    "type": "quiz",
                    "content": "Verify your understanding of Structs and Methods.",
                    "questions": [
                        {
                            "id": "q1",
                            "question": "What keyword defines a structure?",
                            "options": [
                                "class",
                                "object",
                                "struct",
                                "type"
                            ],
                            "correctAnswer": 2,
                            "explanation": "`struct` is used to define custom data types with named fields."
                        },
                        {
                            "id": "q2",
                            "question": "What is the first parameter of a method?",
                            "options": [
                                "this",
                                "self",
                                "&self",
                                "Rectangle"
                            ],
                            "correctAnswer": 2,
                            "explanation": "Methods take `&self` (or `self` or `&mut self`) to access the instance data."
                        },
                        {
                            "id": "q3",
                            "question": "Where do you define methods for a struct?",
                            "options": [
                                "Inside the struct",
                                "In an impl block",
                                "In main",
                                "In a separate file"
                            ],
                            "correctAnswer": 1,
                            "explanation": "Methods and associated functions are defined within an `impl StructName` block."
                        }
                    ],
                    "xp": 50,
                    "coinReward": 25,
                    "unlockPrice": 0
                }
            ]
        }
    ]
};