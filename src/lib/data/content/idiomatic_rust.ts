import type { PhaseConfig } from '../types';

export const idiomaticRust: PhaseConfig = {
    id: 'idiomatic-rust',
    title: 'Idiomatic Rust',
    chapters: [
        {
            id: 'ch6',
            title: 'Enums & Pattern Matching',
            lessons: [
                {
                    id: 'ch6-enums-intro',
                    title: 'Defining Enums',
                    type: 'lesson',
                    xp: 10,
                    coinReward: 5,
                    unlockPrice: 0,
                    content: `
# Enums

Enums (enumerations) allow you to define a type by enumerating its possible variants.

### Basic Enums
Use enums when a value can be one of a few sets of variants.

\`\`\`rust
enum IpAddrKind {
    V4,
    V6,
}
\`\`\`

### Enums with Data
Rust enums are powerful: they can attach data directly to each variant!

\`\`\`rust
enum IpAddr {
    V4(u8, u8, u8, u8),
    V6(String),
}

let home = IpAddr::V4(127, 0, 0, 1);
let loopback = IpAddr::V6(String::from("::1"));
\`\`\`

This is distinct from other languages where enums are just fancy integers. In Rust, they are algebraic data types.
`
                },
                {
                    id: 'ch6-option',
                    title: 'The Option Enum',
                    type: 'code',
                    xp: 20,
                    coinReward: 10,
                    unlockPrice: 10,
                    content: `
# The Option Enum

Rust does not have **null**. Instead, it uses the \`Option<T>\` enum to encode the concept of a value being present or absent.

\`\`\`rust
enum Option<T> {
    None,
    Some(T),
}
\`\`\`

This forces you to handle the case where the value might be missing, preventing Null Pointer Exceptions.

### Challenge
We have a function \`divide\` that returns \`Option<i32>\`.
If \`denominator\` is 0, return \`None\`.
Otherwise, return \`Some(numerator / denominator)\`.
`,
                    initialCode: `fn divide(numerator: i32, denominator: i32) -> Option<i32> {
    // Return None if denominator is 0
    // Otherwise return Some(result)
}`,
                    tests: [
                        {
                            description: 'divide(10, 2) returns Some(5)',
                            test: 'divide(10, 2) == Some(5)'
                        },
                        {
                            description: 'divide(10, 0) returns None',
                            test: 'divide(10, 0) == None'
                        }
                    ],
                    solution: `fn divide(numerator: i32, denominator: i32) -> Option<i32> {
    if denominator == 0 {
        None
    } else {
        Some(numerator / denominator)
    }
}
fn main() {}`,
                    hints: [
                        {
                            content: "Check if `denominator == 0` using an `if` statement.",
                            cost: 0
                        },
                        {
                            content: "Return the variant `None` specifically when dividing by zero.",
                            cost: 5
                        },
                        {
                            content: "Wrap the valid division result in `Some(...)`, e.g., `Some(numerator / denominator)`.",
                            cost: 10
                        }
                    ]
                },
                {
                    id: 'ch6-match',
                    title: 'The Match Control Flow',
                    type: 'code',
                    xp: 30,
                    coinReward: 15,
                    unlockPrice: 20,
                    content: `
# The match Control Flow

The \`match\` operator allows you to compare a value against a series of patterns and then execute code based on which pattern matches. Patterns can look like literal values, variable names, wildcards, and many other things.

### Exhaustiveness
Matches in Rust are **exhaustive**. You **must** handle every legitimate case.

\`\`\`rust
let x = 1;
match x {
    1 => println!("one"),
    2 => println!("two"),
    _ => println!("something else"),
}
\`\`\`

### Challenge
Write a function \`value_in_cents\` that matches a \`Coin\` enum and returns its value in cents.
- Penny = 1
- Nickel = 5
- Dime = 10
- Quarter = 25
`,
                    initialCode: `enum Coin {
    Penny,
    Nickel,
    Dime,
    Quarter,
}

fn value_in_cents(coin: Coin) -> u8 {
    // Match on coin
}

fn main() {
    println!("{}", value_in_cents(Coin::Penny));
}`,
                    tests: [
                        {
                            description: 'Penny is 1',
                            test: 'value_in_cents(Coin::Penny) == 1'
                        },
                        {
                            description: 'Quarter is 25',
                            test: 'value_in_cents(Coin::Quarter) == 25'
                        }
                    ],
                    solution: `enum Coin {
    Penny,
    Nickel,
    Dime,
    Quarter,
}

fn value_in_cents(coin: Coin) -> u8 {
    match coin {
        Coin::Penny => 1,
        Coin::Nickel => 5,
        Coin::Dime => 10,
        Coin::Quarter => 25,
    }
}
fn main() {}`,
                    hints: [
                        {
                            content: "Start with `match coin { ... }` inside the function.",
                            cost: 0
                        },
                        {
                            content: "List each pattern: `Coin::Penny => 1,`",
                            cost: 5
                        },
                        {
                            content: "Ensure all variants (Penny, Nickel, Dime, Quarter) are handled. No wildcard `_` needed here.",
                            cost: 10
                        }
                    ]
                },
                {
                    id: 'ch6-patterns',
                    title: 'Binding with Patterns',
                    type: 'code',
                    xp: 40,
                    coinReward: 20,
                    unlockPrice: 30,
                    content: `
# Patterns that Bind to Values

Match arms can bind to the parts of the values that match the pattern. This is how we can extract values out of enum variants.

\`\`\`rust
enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
}

match msg {
    Message::Quit => println!("Quit"),
    Message::Move { x, y } => println!("Move to {}, {}", x, y),
    Message::Write(text) => println!("Text: {}", text),
}
\`\`\`

### Challenge
The \`Option<T>\` enum is everywhere.
Write a function \`plus_one(x: Option<i32>)\` that returns:
- \`None\` if basic input is None.
- \`Some(i + 1)\` if basic input is \`Some(i)\`. (You extracted \`i\`!).
`,
                    initialCode: `fn plus_one(x: Option<i32>) -> Option<i32> {
    // Match on x
}

fn main() {
    let five = Some(5);
    let six = plus_one(five);
    let none = plus_one(None);
    println!("{:?}", six);
}`,
                    tests: [
                        {
                            description: 'plus_one(Some(5)) is Some(6)',
                            test: 'plus_one(Some(5)) == Some(6)'
                        },
                        {
                            description: 'plus_one(None) is None',
                            test: 'plus_one(None) == None'
                        }
                    ],
                    solution: `fn plus_one(x: Option<i32>) -> Option<i32> {
    match x {
        None => None,
        Some(i) => Some(i + 1),
    }
}
fn main() {}`,
                    hints: [
                        {
                            content: "Match on \`x\`. You need to handle \`Option::None\` and \`Option::Some(i)\`.",
                            cost: 0
                        },
                        {
                            content: "For the \`Some(i)\` arm, \`i\` is the value inside. Return \`Some(i + 1)\`.",
                            cost: 10
                        },
                        {
                            content: "Don't forget the \`None => None\` arm. Matches must be exhaustive!",
                            cost: 20
                        }
                    ]
                },
                {
                    id: 'ch6-if-let',
                    title: 'Concise Control Flow with if let',
                    type: 'code',
                    xp: 20,
                    coinReward: 10,
                    unlockPrice: 10,
                    content: `
# if let

The \`if let\` syntax lets you combine \`if\` and \`let\` into a less verbose way to handle values that match one pattern while ignoring the rest.

\`\`\`rust
let config_max = Some(3u8);
if let Some(max) = config_max {
    println!("The maximum is configured to be {}", max);
}
\`\`\`

It is essentially a \`match\` that only runs logic for ONE variant and ignores \`_\`.

### Challenge
Rewrite the following \`match\` using \`if let\`.
We only care if \`coin\` is a \`Coin::Quarter(state)\`. If it is, print "State quarter from {state}!".
Ignore all other coins.
`,
                    initialCode: `#[derive(Debug)]
enum UsState { Alabama, Alaska, /* ... */ }

enum Coin {
    Penny,
    Quarter(UsState),
}

fn main() {
    let coin = Coin::Quarter(UsState::Alaska);
    
    // REPLACE THIS MATCH WITH IF LET
    match coin {
        Coin::Quarter(ref state) => println!("State quarter from {:?}!", state),
        _ => (),
    }
}`,
                    tests: [
                        {
                            description: 'Used if let syntax',
                            test: 'USER_CODE.contains("if let")'
                        },
                        {
                            description: 'Matches Quarter variant',
                            test: 'USER_CODE.contains("Coin::Quarter")'
                        }
                    ],
                    solution: `#[derive(Debug)]
enum UsState { Alabama, Alaska }

enum Coin {
    Penny,
    Quarter(UsState),
}

fn main() {
    let coin = Coin::Quarter(UsState::Alaska);
    
    if let Coin::Quarter(ref state) = coin {
        println!("State quarter from {:?}!", state);
    }
}`,
                    hints: [
                        {
                            content: "Syntax is `if let Pattern = Value { ... }`.",
                            cost: 0
                        },
                        {
                            content: "Pattern is `Coin::Quarter(ref state)`.",
                            cost: 5
                        },
                        {
                            content: "Statement should look like: `if let Coin::Quarter(ref state) = coin { ... }`.",
                            cost: 10
                        }
                    ]
                },
                {
                    id: 'ch6-quiz',
                    title: 'Chapter 6 Quiz',
                    type: 'quiz',
                    xp: 50,
                    coinReward: 25,
                    unlockPrice: 0,
                    content: 'Check your understanding of Enums and Pattern Matching.',
                    questions: [
                        {
                            id: 'q1',
                            question: 'Can Rust enums contain data?',
                            options: [
                                'No, they are just integers',
                                'Yes, each variant can hold different types and amounts of data',
                                'Only string data',
                            ],
                            correctAnswer: 1,
                            explanation: 'Rust enums are algebraic data types, meaning variants can hold varied data types (tuples, structs, etc.).'
                        },
                        {
                            id: 'q2',
                            question: 'What is the purpose of Option<T>?',
                            options: [
                                'To allow optional arguments in functions',
                                'To handle the absence of a value (replacing null)',
                                'To choose between two types',
                            ],
                            correctAnswer: 1,
                            explanation: '`Option<T>` forces you to explicitly handle the case where a value might be missing (`None`).'
                        },
                        {
                            id: 'q3',
                            question: 'What happens if a match expression does not cover all possible values?',
                            options: [
                                'It compiles but crashes at runtime',
                                'It does nothing',
                                'It fails to compile',
                            ],
                            correctAnswer: 2,
                            explanation: 'Matches in Rust must be exhaustive. The compiler ensures every possible variant is handled.'
                        }
                    ]
                }
            ]
        },
        {
            id: 'ch7',
            title: 'Modules & Packages',
            lessons: [
                {
                    id: 'ch7-modules-intro',
                    title: 'Modules & Scope',
                    type: 'lesson',
                    xp: 10,
                    coinReward: 5,
                    unlockPrice: 0,
                    content: `
# Modules and Scope

As programs grow, we organize code into **modules**.
Modules allow you to control the **privacy** of items. By default, everything in Rust is **private**.

### Defining Modules
You can define a module using the \`mod\` keyword.

\`\`\`rust
mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}
    }
}
\`\`\`

### Visibility (pub)
Use the \`pub\` keyword to make items public (accessible from outside the module).
- \`mod\` is private by default (only visible to parent).
- fields in structs are private by default.
`
                },
                {
                    id: 'ch7-visibility',
                    title: 'Testing Visibility',
                    type: 'code',
                    xp: 30,
                    coinReward: 15,
                    unlockPrice: 20,
                    content: `
# Using 'pub'

By default, everything in a module is private to its parent. To access it, you must mark it as \`pub\`.

### Challenge
The code below fails to compile because \`inner_mod\` and its function \`secret_function\` are private.
1. Make \`inner_mod\` public.
2. Make \`secret_function\` public.
`,
                    initialCode: `mod outer_mod {
    mod inner_mod {
        fn secret_function() -> String {
            String::from("secret")
        }
    }
}

fn main() {
    // This fails because items are private!
    // We need to fix the definition above.
    // let s = outer_mod::inner_mod::secret_function();
    // println!("{}", s);
}`,
                    tests: [
                        {
                            description: 'Function call works (compiles)',
                            test: 'true'
                        }
                    ],
                    solution: `mod outer_mod {
    pub mod inner_mod {
        pub fn secret_function() -> String {
            String::from("secret")
        }
    }
}

fn main() {
    let s = outer_mod::inner_mod::secret_function();
    println!("{}", s);
}`,
                    hints: [
                        {
                            content: "Add `pub` before `mod inner_mod`.",
                            cost: 0
                        },
                        {
                            content: "Add `pub` before `fn secret_function`.",
                            cost: 5
                        },
                        {
                            content: "Uncomment the code in `main` to verify it works.",
                            cost: 10
                        }
                    ]
                },
                {
                    id: 'ch7-super',
                    title: 'Relative Paths & Super',
                    type: 'code',
                    xp: 30,
                    coinReward: 15,
                    unlockPrice: 20,
                    content: `
# The 'super' Keyword

You can use relative paths to access items.
- \`self\`: Current module.
- \`super\`: Parent module (like \`..\` in filesystems).

### Challenge
We have a module \`back_of_house\`. It wants to call a function \`fix_incorrect_order\` which calls \`deliver_order\` defined in the parent scope.
Use \`super\` to call \`deliver_order\` from inside \`fix_incorrect_order\`.
`,
                    initialCode: `fn deliver_order() {
    println!("Order delivered!");
}

mod back_of_house {
    fn fix_incorrect_order() {
        println!("Fixing order...");
        // Call deliver_order() from the parent scope using 'super'
        // super::...
    }

    // A public helper to let us verify
    pub fn cook() {
        fix_incorrect_order();
    }
}

fn main() {
    back_of_house::cook();
}`,
                    tests: [
                        {
                            description: 'Compiles and runs',
                            test: 'true'
                        }
                    ],
                    solution: `fn deliver_order() {
    println!("Order delivered!");
}

mod back_of_house {
    fn fix_incorrect_order() {
        println!("Fixing order...");
        super::deliver_order();
    }

    pub fn cook() {
        fix_incorrect_order();
    }
}

fn main() {
    back_of_house::cook();
}`,
                    hints: [
                        {
                            content: "Use `super::` to access the parent module's items.",
                            cost: 0
                        },
                        {
                            content: "The function calls `super::deliver_order()`.",
                            cost: 10
                        }
                    ]
                },
                {
                    id: 'ch7-quiz',
                    title: 'Chapter 7 Quiz',
                    type: 'quiz',
                    xp: 50,
                    coinReward: 25,
                    unlockPrice: 0,
                    content: 'Check your understanding of Modules and Visibility.',
                    questions: [
                        {
                            id: 'q1',
                            question: 'What is the default visibility of an item in Rust?',
                            options: [
                                'Public',
                                'Private',
                                'Protected',
                            ],
                            correctAnswer: 1,
                            explanation: 'Everything in Rust is private by default.'
                        },
                        {
                            id: 'q2',
                            question: 'Which keyword creates a module?',
                            options: [
                                'module',
                                'package',
                                'mod',
                                'namespace'
                            ],
                            correctAnswer: 2,
                            explanation: 'The `mod` keyword defines a new module.'
                        },
                        {
                            id: 'q3',
                            question: 'How do you access the parent module?',
                            options: [
                                'parent::',
                                'super::',
                                'root::',
                                'crate::'
                            ],
                            correctAnswer: 1,
                            explanation: '`super` refers to the parent module, similar to `..` in file systems.'
                        }
                    ]
                }
            ]
        },
        {
            id: 'ch8',
            title: 'Common Collections',
            lessons: [
                {
                    id: 'ch8-vectors',
                    title: 'Storing Lists with Vectors',
                    type: 'lesson',
                    xp: 10,
                    coinReward: 5,
                    unlockPrice: 0,
                    content: `
# Vectors

A \`Vec<T>\` (Vector) is a resizable array. It stores values of the same type in a contiguous block of memory.

### Creating Vectors
\`\`\`rust
let v: Vec<i32> = Vec::new();
let v = vec![1, 2, 3]; // vec! macro is common
\`\`\`

### Updating Vectors
You must make the vector \`mut\` to add to it.
\`\`\`rust
let mut v = Vec::new();
v.push(5);
v.push(6);
\`\`\`

### Reading Elements
You can read via indexing \`&v[2]\` or \`.get(2)\`.
- \`&v[2]\`: Panics if out of bounds.
- \`.get(2)\`: Returns \`Option<&T>\` (None if out of bounds).
`
                },
                {
                    id: 'ch8-vectors-challenge',
                    title: 'Vector Challenge',
                    type: 'code',
                    xp: 30,
                    coinReward: 15,
                    unlockPrice: 20,
                    content: `
# Vector Challenge

We need a function that filters a vector, keeping only even numbers.

### Challenge
Implement \`filter_evens(input: Vec<i32>) -> Vec<i32>\`.
1. Create a new mutable vector.
2. Iterate through \`input\`.
3. If number is even (\`n % 2 == 0\`), push it to the new vector.
4. Return the new vector.
`,
                    initialCode: `fn filter_evens(input: Vec<i32>) -> Vec<i32> {
    // Implement logic
}

fn main() {
    let numbers = vec![1, 2, 3, 4, 5, 6];
    let evens = filter_evens(numbers);
    println!("Evens: {:?}", evens);
}`,
                    tests: [
                        {
                            description: 'Filters [1, 2, 3, 4] -> [2, 4]',
                            test: 'filter_evens(vec![1, 2, 3, 4]) == vec![2, 4]'
                        },
                        {
                            description: 'Filters [1, 3, 5] -> []',
                            test: 'filter_evens(vec![1, 3, 5]) == vec![]'
                        }
                    ],
                    solution: `fn filter_evens(input: Vec<i32>) -> Vec<i32> {
    let mut result = Vec::new();
    for num in input {
        if num % 2 == 0 {
            result.push(num);
        }
    }
    result
}
fn main() {}`,
                    hints: [
                        {
                            content: "Use `let mut result = Vec::new();` to store the evens.",
                            cost: 0
                        },
                        {
                            content: "Iterate: `for num in input { ... }`",
                            cost: 5
                        },
                        {
                            content: "Use `result.push(num)` if `num % 2 == 0`.",
                            cost: 10
                        }
                    ]
                },
                {
                    id: 'ch8-strings',
                    title: 'UTF-8 Text with Strings',
                    type: 'lesson',
                    xp: 10,
                    coinReward: 5,
                    unlockPrice: 0,
                    content: `
# Strings

Rust has two main string types:
1. \`&str\` (String Slice): A reference to UTF-8 data (usually borrowed).
2. \`String\`: A growable, heap-allocated, owned UTF-8 string.

### Concatenation
\`\`\`rust
let s1 = String::from("Hello, ");
let s2 = String::from("world!");
let s3 = s1 + &s2; // s1 has been moved here and can no longer be used
\`\`\`
The \`+\` operator uses the \`add\` method, which takes ownership of \`self\` (s1) and appends a reference (s2).

### Formatting
For complex strings, use \`format!\`:
\`\`\`rust
let s = format!("{}-{}-{}", s1, s2, s3);
\`\`\`
`
                },
                {
                    id: 'ch8-strings-challenge',
                    title: 'String Ownership',
                    type: 'code',
                    xp: 30,
                    coinReward: 15,
                    unlockPrice: 20,
                    content: `
# Ownership with Strings

When you use \`+\`, the first string is **moved**.

### Challenge
We have a function \`combine_names(first: &str, last: &str) -> String\` that should return "Last, First".
Use \`format!\` macro to create the new string effectively without worrying about moves.
`,
                    initialCode: `fn combine_names(first: &str, last: &str) -> String {
    // Return "Last, First"
    // Hint: format!(...)
}

fn main() {
    println!("{}", combine_names("James", "Bond"));
}`,
                    tests: [
                        {
                            description: 'Bond, James',
                            test: 'combine_names("James", "Bond") == "Bond, James"'
                        }
                    ],
                    solution: `fn combine_names(first: &str, last: &str) -> String {
    format!("{}, {}", last, first)
}
fn main() {}`,
                    hints: [
                        {
                            content: "The `format!` macro works like `println!` but returns a String.",
                            cost: 0
                        },
                        {
                            content: "`format!(\"{}, {}\", last, first)`",
                            cost: 10
                        }
                    ]
                },
                {
                    id: 'ch8-hashmaps',
                    title: 'Hash Maps',
                    type: 'code',
                    xp: 40,
                    coinReward: 20,
                    unlockPrice: 30,
                    content: `
# Hash Maps

\`HashMap<K, V>\` stores a mapping of keys to values.

\`\`\`rust
use std::collections::HashMap;

let mut scores = HashMap::new();
scores.insert(String::from("Blue"), 10);
scores.insert(String::from("Yellow"), 50);
\`\`\`

### Challenge
Implement \`count_words(text: &str) -> HashMap<String, i32>\`.
1. Split text by whitespace (\`.split_whitespace()\`).
2. Iterate through words.
3. Update the count in the map.
   - Hint: \`*map.entry(word.to_string()).or_insert(0) += 1;\`
`,
                    initialCode: `use std::collections::HashMap;

fn count_words(text: &str) -> HashMap<String, i32> {
    let mut map = HashMap::new();
    
    // Iterate over text.split_whitespace()
    // Update map
    
    map
}

fn main() {
    let counts = count_words("hello world hello");
    println!("{:?}", counts);
}`,
                    tests: [
                        {
                            description: 'Counts "hello": 2, "world": 1',
                            test: `
                            {
                                let map = count_words("hello world hello");
                                map.get("hello") == Some(&2) && map.get("world") == Some(&1)
                            }
                            `
                        }
                    ],
                    solution: `use std::collections::HashMap;

fn count_words(text: &str) -> HashMap<String, i32> {
    let mut map = HashMap::new();
    for word in text.split_whitespace() {
        let count = map.entry(word.to_string()).or_insert(0);
        *count += 1;
    }
    map
}
fn main() {}`,
                    hints: [
                        {
                            content: "Use `text.split_whitespace()` to get an iterator over words.",
                            cost: 0
                        },
                        {
                            content: "To update a count: `let count = map.entry(key).or_insert(0);`",
                            cost: 15
                        },
                        {
                            content: "Then increment the mutable reference: `*count += 1;`",
                            cost: 25
                        }
                    ]
                },
                {
                    id: 'ch8-quiz',
                    title: 'Chapter 8 Quiz',
                    type: 'quiz',
                    xp: 50,
                    coinReward: 25,
                    unlockPrice: 0,
                    content: 'Check your detailed knowledge of collections.',
                    questions: [
                        {
                            id: 'q1',
                            question: 'Which vector method returns an Option?',
                            options: [
                                'v[index]',
                                'v.get(index)',
                                'v.at(index)',
                                'v.fetch(index)'
                            ],
                            correctAnswer: 1,
                            explanation: '`get` returns `Option<&T>`, allowing safe handling of out-of-bounds access.'
                        },
                        {
                            id: 'q2',
                            question: 'Why does `s1 + &s2` invalidate `s1`?',
                            options: [
                                'It does not invalidate s1',
                                'The `add` method takes ownership of `self` (s1)',
                                's1 is borrowed mutably',
                            ],
                            correctAnswer: 1,
                            explanation: 'The function signature for `add` is `fn add(self, s: &str) -> String`, so it moves `self`.'
                        },
                        {
                            id: 'q3',
                            question: 'What is the Entry API in HashMap used for?',
                            options: [
                                'To iterating over entries',
                                'To insert a value only if the key is missing',
                                'To delete entries',
                            ],
                            correctAnswer: 1,
                            explanation: '`entry(key).or_insert(val)` allows in-place mutation based on presence.'
                        }
                    ]
                }
            ]
        },
        {
            id: 'ch9',
            title: 'Error Handling',
            lessons: [
                {
                    id: 'ch9-panic',
                    title: 'Recoverable vs Unrecoverable',
                    type: 'lesson',
                    xp: 10,
                    coinReward: 5,
                    unlockPrice: 0,
                    content: `
# Error Handling

Rust groups errors into two categories:
1.  **Recoverable Errors** (\`Result<T, E>\`): Files not found, etc.
2.  **Unrecoverable Errors** (\`panic!\`): Index out of bounds, bugs.

### The panic! Macro
When a panic occurs, the program stops immediately.
\`\`\`rust
fn main() {
    panic!("crash and burn");
}
\`\`\`

### Result Enum
\`\`\`rust
enum Result<T, E> {
    Ok(T),
    Err(E),
}
\`\`\`
`
                },
                {
                    id: 'ch9-result',
                    title: 'The ? Operator',
                    type: 'code',
                    xp: 30,
                    coinReward: 15,
                    unlockPrice: 20,
                    content: `
# The ? Operator

Propagating errors manually with \`match\` is verbose. The \`?\` operator simplifies this.
If a value is \`Result::Ok\`, \`?\` unwraps it.
If a value is \`Result::Err\`, \`?\` returns the error from the **current function** immediately.

### Challenge
We have a function \`get_username\` that returns a \`Result<String, String>\`.
Rewrite the verbose match inside implementation to use \`?\`.
Note: The function signatures return \`Result\`, so propagation is allowed.
`,
                    initialCode: `fn make_request() -> Result<String, String> {
    Ok(String::from("  alice  "))
}

fn get_username() -> Result<String, String> {
    // REFACTOR THIS:
    let result = make_request();
    let name = match result {
        Ok(n) => n,
        Err(e) => return Err(e),
    };
    
    Ok(name.trim().to_string())
}

fn main() {
    match get_username() {
        Ok(name) => println!("Username: {}", name),
        Err(e) => println!("Error: {}", e),
    }
}`,
                    tests: [
                        {
                            description: 'Returns correct name',
                            test: 'get_username() == Ok(String::from("alice"))'
                        },
                        {
                            description: 'Uses ? operator',
                            test: 'USER_CODE.contains("?")'
                        }
                    ],
                    solution: `fn make_request() -> Result<String, String> {
    Ok(String::from("  alice  "))
}

fn get_username() -> Result<String, String> {
    let name = make_request()?;
    Ok(name.trim().to_string())
}

fn main() {
    let _ = get_username();
}`,
                    hints: [
                        {
                            content: "Replace the entire match block with a single character.",
                            cost: 0
                        },
                        {
                            content: "`let name = make_request()?;`",
                            cost: 10
                        }
                    ]
                },
                {
                    id: 'ch9-quiz',
                    title: 'Chapter 9 Quiz',
                    type: 'quiz',
                    xp: 50,
                    coinReward: 25,
                    unlockPrice: 0,
                    content: 'Check your error handling knowledge.',
                    questions: [
                        {
                            id: 'q1',
                            question: 'What does the `?` operator do on an Err value?',
                            options: [
                                'Panics the program',
                                'Returns the error from the current function',
                                'Logs the error and continues',
                            ],
                            correctAnswer: 1,
                            explanation: 'It returns the error early, propagating it to the caller.'
                        },
                        {
                            id: 'q2',
                            question: 'Which type represents a recoverable error?',
                            options: [
                                'Option<T>',
                                'Panic',
                                'Result<T, E>',
                            ],
                            correctAnswer: 2,
                            explanation: 'Result<T, E> is for operations that can fail but can be handled.'
                        },
                        {
                            id: 'q3',
                            question: 'Can you use `?` in a function returning `void` (unit)?',
                            options: [
                                'Yes, always',
                                'No, the function must return Result (or Option)',
                                'Only in main()',
                            ],
                            correctAnswer: 1,
                            explanation: 'You can only propagate errors if the function signature allows returning them.'
                        }
                    ]
                }
            ]
        }
    ]
};
