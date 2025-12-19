# Rust Mastery

**The Definitive Interactive Platform for Learning Rust.**

Designed to take you from "Hello World" to "Multithreaded Web Server" through a strictly structured, gamified, and hands-on curriculum based on *The Rust Programming Language*.

![Platform Preview](static/preview.png)
*(Note: Add a screenshot of the app here if available)*

## ✨ Features

- **Complete Curriculum**: Covers all 20 Chapters of the Rust Book.
  - **Phases 1-7**: From Foundations to Advanced Features (Unsafe, Macros).
  - **Theory & Practice**: Markdown-based lessons paired with interactive code challenges.
  - **Quizzes**: Knowledge checks required to unlock new chapters.

- **Advanced Code Runner**:
  - **Monaco Editor**: Full IDE experience with custom Rust autocomplete and syntax highlighting.
  - **Server-Side Execution**: Runs actual `rustc` commands via a secure backend API.
  - **Test Harness**: Supports writing unit tests for user code verification.

- **Gamification**:
  - **XP & Levels**: Earn experience for every lesson and challenge.
  - **Economy**: Earn Coins to purchase **tiered hints** when stuck.
  - **Persistence**: Progress is saved locally via `localStorage` (Privacy-first).

- **Modern Tech Stack**:
  - **Framework**: SvelteKit (Svelte 5 Runes) + TailwindCSS.
  - **Runtime**: Bun (Fast tests and package management).
  - **Architecture**: Strictly typed content schema data.

## 🚀 Getting Started

### Prerequisites
1. **Bun**: Install [Bun](https://bun.sh/).
2. **Rust**: Ensure `rustc` is installed on your machine (`curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`).

### Installation

```bash
# Install dependencies
bun install

# Start development server
bun run dev
```

The application will run at `http://localhost:5173`.

### Type Checking

We enforce strict types across the entire curriculum data structure.

```bash
bun run check
```

## 🛠️ Project Structure

- **`src/lib/data/content/`**: The "Source of Truth". Contains all chapters and lessons (Foundations, Harmony, The Wall, etc.).
- **`src/lib/sandbox/`**: Logic for the Client-side runner interface.
- **`src/routes/api/run/`**: Backend server endpoint that spawns `rustc` processes.
- **`src/lib/progress.svelte.ts`**: Global state management using Svelte 5 Runes.

## 🤝 Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m 'Add amazing feature'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

## 📝 License

Distributed under the MIT License.
