export interface Test {
    description: string;
    test: string;
    passed?: boolean;
    error?: string;
}

export type LessonType = 'lesson' | 'code' | 'quiz';

// Strictly typed Chapter IDs for the "Bible"
export type ChapterID =
    | 'ch1' | 'ch2' | 'ch3' | 'ch4' | 'ch5'
    | 'ch6' | 'ch7' | 'ch8' | 'ch9' | 'ch10'
    | 'ch11' | 'ch12' | 'ch13' | 'ch14' | 'ch15'
    | 'ch16' | 'ch17' | 'ch18' | 'ch19' | 'ch20';

export type ChapterTitle =
    | "Chapter 1: Getting Started"
    | "Chapter 2: Guessing Game"
    | "Chapter 3: Common Concepts"
    | "Chapter 4: Ownership"
    | "Chapter 5: Structs"
    | "Chapter 6: Enums & Pattern Matching"
    | "Chapter 7: Modules & Packages"
    | "Chapter 8: Common Collections"
    | "Chapter 9: Error Handling"
    | "Chapter 10: Generics, Traits & Lifetimes"
    | "Chapter 11: Writing Automated Tests"
    | "Chapter 12: I/O Project: Minigrep"
    | "Chapter 13: Iterators & Closures"
    | "Chapter 14: Cargo & Crates.io"
    | "Chapter 15: Smart Pointers"
    | "Chapter 16: Concurrency"
    | "Chapter 17: OOP Features"
    | "Chapter 18: Patterns & Matching"
    | "Chapter 19: Advanced Features"
    | "Chapter 20: Final Project";

export type LessonID = `${ChapterID}-${string}`;

export type PhaseTitle =
    | "Foundations"
    | "Idiomatic Rust"
    | "The Wall"
    | "Building Applications"
    | "Advanced Rust"
    | "Professionalism"
    | "Deep Dive"
    | "Mastery";

// Base interface for the final flattened lesson
export interface BaseLesson {
    id: LessonID;
    phase: PhaseTitle;
    chapter: ChapterTitle;
    title: string;
    content: string;
    coinReward: number;
    unlockPrice: number;
}

// -------------------------------------------------------------
// STRICT SOURCE OF TRUTH TYPES
// -------------------------------------------------------------

export interface Hint {
    content: string;
    cost: number;
}

export interface TheoryConfig {
    id: string;
    title: string;
    type: 'lesson';
    content: string;
    xp: number;
    coinReward: number;
    unlockPrice: number;
}

export interface ChallengeConfig {
    id: string;
    title: string;
    type: 'code';
    content: string;
    xp: number;
    coinReward: number;
    unlockPrice: number;
    initialCode: string;
    tests: Test[];
    solution: string;
    hints: Hint[];
}

export interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
}

export interface QuizConfig {
    id: string;
    title: string;
    type: 'quiz';
    content: string;
    xp: number;
    coinReward: number;
    unlockPrice: number;
    questions: QuizQuestion[];
}

export type LessonConfig = TheoryLesson | CodeChallenge | QuizLesson; // For legacy/mixed usage if needed, but we prefer strict configs below

// A Chapter Section groups Theory (Reading) and Challenges (Doing)
export interface ChapterSection {
    title?: string; // Optional section title
    theory: TheoryConfig[]; // List of reading materials
    challenges: ChallengeConfig[]; // List of exercises
}

export interface ChapterConfig {
    id: ChapterID;
    title: string;
    sections: ChapterSection[];
    quiz: QuizConfig; // Mandatory Quiz per Chapter
}

export interface PhaseConfig {
    id: string;
    title: PhaseTitle;
    chapters: ChapterConfig[];
}

// -------------------------------------------------------------
// Final Consumed Types (Flat Structure)
// -------------------------------------------------------------

export interface TheoryLesson extends BaseLesson {
    type: 'lesson';
    xp: number;
}

export interface CodeChallenge extends BaseLesson {
    type: 'code';
    xp: number;
    initialCode: string;
    tests: Test[];
    solution: string;
    hints: Hint[];
}

export interface QuizLesson extends BaseLesson {
    type: 'quiz';
    questions: QuizQuestion[];
    xp: number;
}

export type Lesson = TheoryLesson | CodeChallenge | QuizLesson;
