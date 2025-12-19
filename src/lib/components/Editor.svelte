<script lang="ts">
    import { onMount, onDestroy, createEventDispatcher } from "svelte";
    import type * as Monaco from "monaco-editor";

    /**
     * Component Properties
     */
    interface Props {
        value: string;
        language?: string;
        onRun?: () => void;
    }

    let { value = $bindable(), language = "rust", onRun }: Props = $props();

    let editorContainer: HTMLElement;
    let monacoEditor: Monaco.editor.IStandaloneCodeEditor | undefined;

    onMount(async () => {
        // Import monaco only on the client-side to prevent SSR issues
        const monaco = await import("monaco-editor");

        // Define the custom "Rust Mastery" theme
        monaco.editor.defineTheme("rust-mastery", {
            base: "vs-dark",
            inherit: true,
            rules: [
                { token: "comment", foreground: "9ca3af" }, // gray-400
                { token: "keyword", foreground: "f97316" }, // orange-500
                { token: "string", foreground: "a3e635" }, // lime-400
                { token: "number", foreground: "c084fc" }, // purple-400
                { token: "type", foreground: "fbbf24" }, // amber-400
            ],
            colors: {
                "editor.background": "#09090b", // zinc-950
                "editor.lineHighlightBackground": "#27272a33", // zinc-800 with alpha
                "editorCursor.foreground": "#f97316", // orange-500
                "editor.selectionBackground": "#52525b55", // zinc-600 with alpha
                "editorLineNumber.foreground": "#71717a", // zinc-500
            },
        });

        // Enhance Rust support with autocomplete
        monaco.languages.registerCompletionItemProvider("rust", {
            provideCompletionItems: (model, position) => {
                const word = model.getWordUntilPosition(position);
                const range = {
                    startLineNumber: position.lineNumber,
                    endLineNumber: position.lineNumber,
                    startColumn: word.startColumn,
                    endColumn: word.endColumn,
                };

                const suggestions = [
                    // Keywords
                    "fn",
                    "let",
                    "mut",
                    "if",
                    "else",
                    "match",
                    "struct",
                    "enum",
                    "impl",
                    "use",
                    "mod",
                    "pub",
                    "crate",
                    "return",
                    "for",
                    "while",
                    "loop",
                    "break",
                    "continue",
                    "unsafe",
                    "trait",
                    "where",
                    "type",
                    "const",
                    "static",
                    "ref",
                    "self",
                    "fn",
                    "let",
                    "mut",
                    "if",
                    "else",
                    "match",
                    "struct",
                    "enum",
                    "impl",
                    "use",
                    "mod",
                    "pub",
                    "crate",
                    "return",
                    "for",
                    "while",
                    "loop",
                    "break",
                    "continue",
                    "unsafe",
                    "trait",
                    "where",
                    "type",
                    "const",
                    "static",
                    "ref",
                    "self",
                    "super",
                    "extern",
                    "async",
                    "await",
                    "move",
                    "box",
                    // Std Types
                    "String",
                    "Vec",
                    "Option",
                    "Result",
                    "i32",
                    "u32",
                    "i64",
                    "u64",
                    "f32",
                    "f64",
                    "bool",
                    "char",
                    "usize",
                    "isize",
                    "str",
                    "Some",
                    "None",
                    "Ok",
                    "Err",
                    "Box",
                    "HashMap",
                    // Macros
                    "println!",
                    "format!",
                    "vec!",
                    "panic!",
                    "assert!",
                    "assert_eq!",
                    "todo!",
                    // Common Methods
                    "unwrap",
                    "expect",
                    "iter",
                    "collect",
                    "map",
                    "filter",
                    "push",
                    "len",
                    "clone",
                    "to_string",
                    "as_str",
                    "chars",
                    "split",
                    "trim",
                ].map((label) => ({
                    label,
                    kind: monaco.languages.CompletionItemKind.Keyword,
                    insertText: label,
                    range: range,
                }));
                return { suggestions };
            },
        });

        monacoEditor = monaco.editor.create(editorContainer, {
            value,
            language,
            theme: "rust-mastery",
            automaticLayout: true,
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            lineNumbers: "on",
            roundedSelection: true,
            scrollBeyondLastLine: false,
            readOnly: false,
            padding: { top: 16, bottom: 16 },
            tabSize: 4,
            bracketPairColorization: { enabled: true },
            cursorBlinking: "smooth",
            cursorSmoothCaretAnimation: "on",
            smoothScrolling: true,
            contextmenu: true,
        });

        // Add CTRL+ENTER command to run code
        monacoEditor.addCommand(
            monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
            () => {
                onRun?.();
            },
        );

        // Synchronize editor content with the reactive 'value' prop
        monacoEditor.onDidChangeModelContent(() => {
            if (monacoEditor) {
                value = monacoEditor.getValue();
            }
        });

        // Two-way binding: update editor if 'value' prop changes programmatically
        $effect(() => {
            if (monacoEditor && value !== monacoEditor.getValue()) {
                monacoEditor.setValue(value);
            }
        });
    });

    onDestroy(() => {
        monacoEditor?.dispose();
    });
</script>

<div bind:this={editorContainer} class="h-full w-full"></div>
