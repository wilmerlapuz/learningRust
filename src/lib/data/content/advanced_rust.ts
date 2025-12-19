import type { PhaseConfig } from '../types';

export const advancedRust: PhaseConfig = {
    id: 'advanced-rust',
    title: 'Advanced Rust',
    chapters: [
        {
            id: 'ch15',
            title: 'Smart Pointers',
            sections: [
                {
                    title: 'Box & Traits',
                    theory: [
                        {
                            id: 'ch15-box',
                            title: 'Using Box<T>',
                            type: 'lesson',
                            xp: 10,
                            coinReward: 5,
                            unlockPrice: 0,
                            content: `
# Smart Pointers: Box<T>

Pointer is a general concept for a variable that contains an address in memory.
**Smart Pointers** are data structures that act like a pointer but also have metadata and capabilities (like Drop).

### Box<T>
The most straightforward smart pointer is a \`Box<T>\`. It allows you to store data on the **heap** rather than the stack.
Stack remains the pointer to the heap data.

\`\`\`rust
let b = Box::new(5);
println!("b = {}", b);
\`\`\`

### Recursive Types
Boxes are essential for recursive types (like Linked Lists or Cons Lists), because they have a known size (the pointer size), whereas a recursive struct has infinite size.
`
                        }
                    ],
                    challenges: [
                        {
                            id: 'ch15-deref',
                            title: 'The Deref Trait',
                            type: 'code',
                            xp: 30,
                            coinReward: 15,
                            unlockPrice: 20,
                            content: `
# The Deref Trait

Implementing \`Deref\` allows you to customize the behavior of the *dereference operator* (\`*\`).
This allows smart pointers to be treated like regular references.

### Challenge
1. We have a struct \`MyBox<T>\`.
2. Implement \`Deref\` for \`MyBox\` so we can use \`*y\` to access the inner value.
3. The \`deref\` method must return \`&Self::Target\`.
`,
                            initialCode: `use std::ops::Deref;

struct MyBox<T>(T);

impl<T> MyBox<T> {
    fn new(x: T) -> MyBox<T> {
        MyBox(x)
    }
}

// Implement Deref for MyBox
// impl<T> Deref for MyBox<T> { ... }

fn main() {
    let x = 5;
    let y = MyBox::new(x);

    assert_eq!(5, x);
    // This line fails without Deref impl:
    assert_eq!(5, *y);
}`,
                            tests: [
                                {
                                    description: 'Implements Deref',
                                    test: 'USER_CODE.contains("impl<T> Deref for MyBox<T>")'
                                },
                                {
                                    description: '*y works (code compiles)',
                                    test: 'true'
                                }
                            ],
                            solution: `use std::ops::Deref;

struct MyBox<T>(T);

impl<T> MyBox<T> {
    fn new(x: T) -> MyBox<T> {
        MyBox(x)
    }
}

impl<T> Deref for MyBox<T> {
    type Target = T;

    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

fn main() {
    let x = 5;
    let y = MyBox::new(x);
    assert_eq!(5, *y);
}`,
                            hints: [
                                {
                                    content: "Implement `Deref` with `type Target = T;`.",
                                    cost: 0
                                },
                                {
                                    content: "The `deref` method returns `&T` (reference to inner value).",
                                    cost: 5
                                },
                                {
                                    content: "Return `&self.0`.",
                                    cost: 10
                                }
                            ]
                        },
                        {
                            id: 'ch15-drop',
                            title: 'The Drop Trait',
                            type: 'code',
                            xp: 30,
                            coinReward: 15,
                            unlockPrice: 20,
                            content: `
# The Drop Trait

The \`Drop\` trait lets you customize what happens when a value goes out of scope.
This is crucial for smart pointers to clean up resources (memory, files, sockets).

### Challenge
1. Implement \`Drop\` for \`CustomSmartPointer\`.
2. Print "Dropping CustomSmartPointer!" inside the \`drop\` function.
`,
                            initialCode: `struct CustomSmartPointer {
    data: String,
}

// Implement Drop here
// impl Drop for CustomSmartPointer { ... }

fn main() {
    let c = CustomSmartPointer {
        data: String::from("my stuff"),
    };
    println!("CustomSmartPointer created.");
    // c goes out of scope here, calling drop automatically
}`,
                            tests: [
                                {
                                    description: 'Implements Drop',
                                    test: 'USER_CODE.contains("impl Drop for CustomSmartPointer")'
                                },
                                {
                                    description: 'Prints "Dropping"',
                                    test: 'USER_CODE.contains("println!") && USER_CODE.contains("Dropping")'
                                }
                            ],
                            solution: `struct CustomSmartPointer {
    data: String,
}

impl Drop for CustomSmartPointer {
    fn drop(&mut self) {
        println!("Dropping CustomSmartPointer with data \`{}\`!", self.data);
    }
}

fn main() {
    let c = CustomSmartPointer {
        data: String::from("my stuff"),
    };
    println!("CustomSmartPointer created.");
}`,
                            hints: [
                                {
                                    content: "Use `impl Drop for CustomSmartPointer`.",
                                    cost: 0
                                },
                                {
                                    content: "The method signature is `fn drop(&mut self)`.",
                                    cost: 5
                                }
                            ]
                        }
                    ]
                },
                {
                    title: 'Reference Counting',
                    theory: [
                        {
                            id: 'ch15-rc',
                            title: 'Rc<T> Reference Counting',
                            type: 'lesson',
                            xp: 10,
                            coinReward: 5,
                            unlockPrice: 0,
                            content: `
# Rc<T>: Reference Counted

Sometimes a single value might have multiple owners. For example, in graph data structures, multiple edges might point to the same node.
\`Box<T>\` doesn't allow this (single owner rule).

\`Rc<T>\` enables multiple ownership by keeping a reference count.
- \`Rc::clone(&a)\`: Increments the count (cheap, no deep copy).
- When the last \`Rc\` is dropped, the data is cleaned up.

**Note**: \`Rc<T>\` is only for single-threaded scenarios.
`
                        }
                    ],
                    challenges: [
                        {
                            id: 'ch15-refcell',
                            title: 'Interior Mutability',
                            type: 'code',
                            xp: 40,
                            coinReward: 20,
                            unlockPrice: 30,
                            content: `
# RefCell<T> and Interior Mutability

**Interior Mutability** is a design pattern that allows you to mutate data even when there are immutable references to that data.
The borrowing rules are checked at **runtime** instead of compile time.

### Challenge
We have a mock object that implements a Listener trait. It needs to modify its own internal state (\`sent_messages\`) inside \`on_event\`.
However, \`on_event\` takes \`&self\` (immutable).
1. Wrap \`sent_messages\` in a \`RefCell\`.
2. Use \`.borrow_mut()\` to push data inside \`on_event\`.
`,
                            initialCode: `use std::cell::RefCell;

struct MockMessenger {
    // Wrap this vector in RefCell so we can mutate it!
    sent_messages: Vec<String>,
}

impl MockMessenger {
    fn new() -> MockMessenger {
        MockMessenger {
            sent_messages: vec![],
        }
    }

    fn send(&self, msg: String) {
        // self.sent_messages.push(msg); // ERROR: self is immutable
        // Use borrow_mut() here
    }
}

fn main() {
    let mock = MockMessenger::new();
    mock.send(String::from("Hello"));
    // println!("Messages: {:?}", mock.sent_messages.borrow());
}`,
                            tests: [
                                {
                                    description: 'Uses RefCell<Vec<String>>',
                                    test: 'USER_CODE.contains("RefCell<Vec<String>>")'
                                },
                                {
                                    description: 'Uses borrow_mut()',
                                    test: 'USER_CODE.contains("borrow_mut()")'
                                }
                            ],
                            solution: `use std::cell::RefCell;

struct MockMessenger {
    sent_messages: RefCell<Vec<String>>,
}

impl MockMessenger {
    fn new() -> MockMessenger {
        MockMessenger {
            sent_messages: RefCell::new(vec![]),
        }
    }

    fn send(&self, msg: String) {
        self.sent_messages.borrow_mut().push(msg);
    }
}

fn main() {
    let mock = MockMessenger::new();
    mock.send(String::from("Hello"));
    println!("Messages: {:?}", mock.sent_messages.borrow());
}`,
                            hints: [
                                {
                                    content: "Change type to `sent_messages: RefCell<Vec<String>>`.",
                                    cost: 0
                                },
                                {
                                    content: "In `new`, initialize with `RefCell::new(vec![])`.",
                                    cost: 5
                                },
                                {
                                    content: "In `send`, call `self.sent_messages.borrow_mut().push(msg)`.",
                                    cost: 10
                                }
                            ]
                        }
                    ]
                }
            ],
            quiz: {
                id: 'ch15-quiz',
                title: 'Chapter 15 Quiz',
                type: 'quiz',
                xp: 50,
                coinReward: 25,
                unlockPrice: 0,
                content: 'Test your knowledge of Smart Pointers.',
                questions: [
                    {
                        id: 'q1',
                        question: 'Where does Box<T> store its data?',
                        options: [
                            'On the stack',
                            'On the heap',
                            'In static memory',
                            'In a register'
                        ],
                        correctAnswer: 1,
                        explanation: 'Box<T> allocates memory on the heap and stores the pointer on the stack.'
                    },
                    {
                        id: 'q2',
                        question: 'When should you use Rc<T>?',
                        options: [
                            'For mutable global state',
                            'When a value needs multiple owners (single-threaded)',
                            'When passing data between threads',
                        ],
                        correctAnswer: 1,
                        explanation: 'Rc<T> allows multiple owners by reference counting but is not thread-safe.'
                    },
                    {
                        id: 'q3',
                        question: 'What does RefCell<T> enable?',
                        options: [
                            'Zero-cost abstractions',
                            'Compile-time borrow checking',
                            'Interior mutability (mutating data through an immutable reference)',
                        ],
                        correctAnswer: 2,
                        explanation: 'RefCell enforces borrowing rules at runtime, allowing mutation even having immutable references.'
                    }
                ]
            }
        },
        {
            id: 'ch16',
            title: 'Fearless Concurrency',
            sections: [
                {
                    title: 'Threads & Channels',
                    theory: [
                        {
                            id: 'ch16-threads',
                            title: 'Threads',
                            type: 'lesson',
                            xp: 10,
                            coinReward: 5,
                            unlockPrice: 0,
                            content: `
# Fearless Concurrency: Threads

Rust ensures that your concurrent code is as safe as single-threaded code. This is called **Fearless Concurrency**.

### \`spawn\`
In most modern OSs, an executed program’s code is run in a **process**, and the OS manages multiple processes simultaneously. Within a program, you can also have independent parts that run simultaneously using **threads**.

\`\`\`rust
use std::thread;
use std::time::Duration;

fn main() {
    thread::spawn(|| {
        for i in 1..10 {
            println!("hi number {} from the spawned thread!", i);
            thread::sleep(Duration::from_millis(1));
        }
    });

    for i in 1..5 {
        println!("hi number {} from the main thread!", i);
        thread::sleep(Duration::from_millis(1));
    }
}
\`\`\`

Note: The spawned thread might not finish if the main thread ends! Use \`join()\` to wait for it.
`
                        },
                        {
                            id: 'ch16-sync-send',
                            title: 'Sync and Send Traits',
                            type: 'lesson',
                            xp: 10,
                            coinReward: 5,
                            unlockPrice: 0,
                            content: `
# Sync and Send Traits

Rust’s type system has two traits for concurrency:
1. **Send**: Allows ownership to be transferred between threads. Almost all Rust types are \`Send\` (except things like \`Rc<T>\`).
2. **Sync**: Allows multiple threads to have access to the data through references (\`&T\`). A type \`T\` is \`Sync\` if \`&T\` is \`Send\`.

These traits are **auto traits**, meaning they are automatically implemented for your types if all their members also implement them.
`
                        }
                    ],
                    challenges: [
                        {
                            id: 'ch16-mpsc',
                            title: 'Message Passing',
                            type: 'code',
                            xp: 30,
                            coinReward: 15,
                            unlockPrice: 20,
                            content: `
# Message Passing: Channels

Rust uses **channels** for communication between threads. The standard library provides \`mpsc\` (multiple producer, single consumer).

### Challenge
1. Create a channel using \`mpsc::channel()\`.
2. Spawn a thread that sends the string "hi" through the channel.
3. In the main thread, receive and print the message.
`,
                            initialCode: `use std::sync::mpsc;
use std::thread;

fn main() {
    // 1. Create a channel
    // let (tx, rx) = ...;

    thread::spawn(move || {
        let val = String::from("hi");
        // 2. Send val through the channel
    });

    // 3. Receive the value in the main thread
    // let received = ...;
    // println!("Got: {}", received);
}`,
                            tests: [
                                {
                                    description: 'Uses mpsc::channel',
                                    test: 'USER_CODE.contains("mpsc::channel()")'
                                },
                                {
                                    description: 'Sends and receives "hi"',
                                    test: 'true'
                                }
                            ],
                            solution: `use std::sync::mpsc;
use std::thread;

fn main() {
    let (tx, rx) = mpsc::channel();

    thread::spawn(move || {
        let val = String::from("hi");
        tx.send(val).unwrap();
    });

    let received = rx.recv().unwrap();
    println!("Got: {}", received);
}`,
                            hints: [
                                {
                                    content: "Use `mpsc::channel()` to get `(tx, rx)`.",
                                    cost: 0
                                },
                                {
                                    content: "Call `tx.send(val).unwrap()` inside the thread.",
                                    cost: 5
                                },
                                {
                                    content: "Call `rx.recv().unwrap()` in the main thread.",
                                    cost: 10
                                }
                            ]
                        },
                        {
                            id: 'ch16-shared-state',
                            title: 'Shared-State Concurrency',
                            type: 'code',
                            xp: 40,
                            coinReward: 20,
                            unlockPrice: 30,
                            content: `
# Shared-State Concurrency: Mutex and Arc

**Mutex** stands for "mutual exclusion". Only one thread can access the data at a time.
**Arc** (Atomic Reference Counted) is a thread-safe \`Rc<T>\`.

### Challenge
We want to increment a counter 10 times across 10 threads.
1. Wrap the counter in an \`Arc<Mutex<i32>>\`.
2. Pass a clone of the \`Arc\` to each thread.
3. Lock the mutex inside each thread to increment the value.
`,
                            initialCode: `use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];

    for _ in 0..10 {
        let counter = Arc::clone(&counter);
        let handle = thread::spawn(move || {
            // Lock and increment here
            // let mut num = ...;
            // *num += 1;
        });
        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }

    println!("Result: {}", *counter.lock().unwrap());
}`,
                            tests: [
                                {
                                    description: 'Uses Arc and Mutex',
                                    test: 'USER_CODE.contains("Arc<Mutex") || USER_CODE.contains("Arc::new(Mutex::new")'
                                },
                                {
                                    description: 'Result is 10',
                                    test: 'true'
                                }
                            ],
                            solution: `use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];

    for _ in 0..10 {
        let counter = Arc::clone(&counter);
        let handle = thread::spawn(move || {
            let mut num = counter.lock().unwrap();
            *num += 1;
        });
        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }

    println!("Result: {}", *counter.lock().unwrap());
}`,
                            hints: [
                                {
                                    content: "Use `counter.lock().unwrap()` to get a guard.",
                                    cost: 0
                                },
                                {
                                    content: "The guard implements `DerefMut`, so you can use `*num += 1`.",
                                    cost: 5
                                }
                            ]
                        }
                    ]
                }
            ],
            quiz: {
                id: 'ch16-quiz',
                title: 'Chapter 16 Quiz',
                type: 'quiz',
                xp: 50,
                coinReward: 25,
                unlockPrice: 0,
                content: 'Concurrency features check.',
                questions: [
                    {
                        id: 'q1',
                        question: 'Why do we need to lock a Mutex?',
                        options: [
                            'To delete the data',
                            'To ensure exclusive access to the data',
                            'To make it faster',
                        ],
                        correctAnswer: 1,
                        explanation: 'A Mutex ensures that only one thread can access the data at any given time to prevent races.'
                    },
                    {
                        id: 'q2',
                        question: 'What is the difference between Rc and Arc?',
                        options: [
                            'Arc is atomic and thread-safe, Rc is not',
                            'Rc is thread-safe, Arc is not',
                            'They are the same',
                        ],
                        correctAnswer: 0,
                        explanation: 'Arc stands for Atomic Reference Counting, using atomic operations safe for threads.'
                    },
                    {
                        id: 'q3',
                        question: 'What does the Send trait mean?',
                        options: [
                            'The type can be cloned',
                            'Ownership of the type can be transferred to another thread',
                            'The type implements copy'
                        ],
                        correctAnswer: 1,
                        explanation: 'Send indicates that ownership of values of that type can be transferred between threads.'
                    }
                ]
            }
        },
        {
            id: 'ch17',
            title: 'Object-Oriented Features',
            sections: [
                {
                    title: 'OOP & Trait Objects',
                    theory: [
                        {
                            id: 'ch17-oop-characteristics',
                            title: 'Characteristics of OOP',
                            type: 'lesson',
                            xp: 10,
                            coinReward: 5,
                            unlockPrice: 0,
                            content: `
# Object-Oriented Programming Features

Many people define OOP in different ways. Rust is influenced by many programming paradigms, including OOP.

### Encapsulation
Encapsulation means that the implementation details of an object aren't accessible to code using that object. In Rust, we use the \`pub\` keyword to decide which modules, types, functions, and fields are public, and everything else is private by default.

### Inheritance
Inheritance is a program’s ability to inherit from another object’s definition. Rust doesn't have inheritance but uses **Traits** and **Trait Objects** to achieve similar goals (like polymorphism).
`
                        },
                        {
                            id: 'ch17-state-pattern',
                            title: 'The State Pattern',
                            type: 'lesson',
                            xp: 10,
                            coinReward: 5,
                            unlockPrice: 0,
                            content: `
# The State Pattern

The **state pattern** is an OOP design pattern. The crucial part is that a value has some internal state, and its behavior changes based on that state.

In Rust, we can implement the state pattern using traits and structs for each state. However, sometimes it is more "idiomatic" to use types to encode states into the type system (e.g., using different structs for \`DraftPost\` and \`PublishedPost\`), which allows the compiler to prevent invalid state transitions at compile time.
`
                        }
                    ],
                    challenges: [
                        {
                            id: 'ch17-trait-objects',
                            title: 'Trait Objects for Heterogeneous Values',
                            type: 'code',
                            xp: 40,
                            coinReward: 20,
                            unlockPrice: 30,
                            content: `
# Trait Objects

In Chapter 10, we mentioned that you can’t use a trait by itself as a parameter or return type. However, you can use **Trait Objects**.
A trait object points to both an instance of a type implementing our specified trait and a table used to look up trait methods on that type at runtime.

### Challenge
We have a \`Draw\` trait. We want to create a \`Screen\` that holds a list of items that all implement \`Draw\`.
1. Use \`Box<dyn Draw>\` to store the components.
2. Implement the \`run\` method on \`Screen\` to call \`draw()\` on each component.
`,
                            initialCode: `trait Draw {
    fn draw(&self);
}

struct Screen {
    // 1. Hold a list of trait objects
    // components: Vec<...>,
}

impl Screen {
    fn run(&self) {
        // 2. Call draw() on each component
    }
}

struct Button {
    width: u32,
    height: u32,
    label: String,
}

impl Draw for Button {
    fn draw(&self) {
        println!("Drawing a button: {}", self.label);
    }
}

struct SelectBox {
    width: u32,
    height: u32,
    options: Vec<String>,
}

impl Draw for SelectBox {
    fn draw(&self) {
        println!("Drawing a select box with {} options", self.options.len());
    }
}

fn main() {
    let screen = Screen {
        components: vec![
            Box::new(SelectBox {
                width: 75,
                height: 10,
                options: vec![
                    String::from("Yes"),
                    String::from("Maybe"),
                    String::from("No"),
                ],
            }),
            Box::new(Button {
                width: 50,
                height: 10,
                label: String::from("OK"),
            }),
        ],
    };

    screen.run();
}`,
                            tests: [
                                {
                                    description: 'Uses Box<dyn Draw>',
                                    test: 'USER_CODE.contains("Box<dyn Draw>")'
                                },
                                {
                                    description: 'Correctly calls draw()',
                                    test: 'true'
                                }
                            ],
                            solution: `trait Draw {
    fn draw(&self);
}

struct Screen {
    components: Vec<Box<dyn Draw>>,
}

impl Screen {
    fn run(&self) {
        for component in self.components.iter() {
            component.draw();
        }
    }
}

struct Button {
    width: u32,
    height: u32,
    label: String,
}

impl Draw for Button {
    fn draw(&self) {
        println!("Drawing a button: {}", self.label);
    }
}

struct SelectBox {
    width: u32,
    height: u32,
    options: Vec<String>,
}

impl Draw for SelectBox {
    fn draw(&self) {
        println!("Drawing a select box with {} options", self.options.len());
    }
}

fn main() {
    let screen = Screen {
        components: vec![
            Box::new(SelectBox {
                width: 75,
                height: 10,
                options: vec![
                    String::from("Yes"),
                    String::from("Maybe"),
                    String::from("No"),
                ],
            }),
            Box::new(Button {
                width: 50,
                height: 10,
                label: String::from("OK"),
            }),
        ],
    };

    screen.run();
}`,
                            hints: [
                                {
                                    content: "Use `Vec<Box<dyn Draw>>` to store heterogeneous types.",
                                    cost: 0
                                },
                                {
                                    content: "Iterate through components and call `.draw()`.",
                                    cost: 5
                                }
                            ]
                        }
                    ]
                }
            ],
            quiz: {
                id: 'ch17-quiz',
                title: 'Chapter 17 Quiz',
                type: 'quiz',
                xp: 50,
                coinReward: 25,
                unlockPrice: 0,
                content: 'OOP features in Rust.',
                questions: [
                    {
                        id: 'q1',
                        question: 'Does Rust support implementation inheritance (e.g., class Dog extends Animal)?',
                        options: [
                            'Yes',
                            'No',
                            'Only with unsafe code'
                        ],
                        correctAnswer: 1,
                        explanation: 'Rust uses traits for behavior sharing but does not support "extends" style inheritance.'
                    },
                    {
                        id: 'q2',
                        question: 'What is dynamic dispatch?',
                        options: [
                            'Deciding which method to call at compile time',
                            'Deciding which method to call at runtime via a vtable',
                            'Sending a message to another thread'
                        ],
                        correctAnswer: 1,
                        explanation: 'Trait objects use dynamic dispatch, looking up the method to call at runtime.'
                    },
                    {
                        id: 'q3',
                        question: 'How do you enforce encapsulation in Rust?',
                        options: [
                            'Using protected keywords',
                            'Using modules and the `pub` keyword',
                            'Everything is public by default'
                        ],
                        correctAnswer: 1,
                        explanation: 'The module system is Rust\'s primary tool for privacy and encapsulation.'
                    }
                ]
            }
        }
    ]
};
