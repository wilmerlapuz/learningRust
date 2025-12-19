<script lang="ts">
    import {
        Play,
        CheckCircle2,
        HelpCircle,
        Terminal,
        Check,
        XCircle,
        ArrowRight,
        Cpu,
        Lock,
        Coins,
    } from "lucide-svelte";
    import Editor from "$lib/components/Editor.svelte";
    import Quiz from "./Quiz.svelte";
    import { runCode, type ExecutionResult } from "$lib/sandbox/runner";
    import { cn } from "$lib/utils";
    import { progress } from "$lib/progress.svelte";
    import { sounds } from "$lib/sounds";
    import { goto } from "$app/navigation";
    import { curriculum } from "$lib/data/curriculum";
    import type { PageProps } from "./$types";
    import confetti from "canvas-confetti";
    import { marked } from "$lib/markdown";
    import { Effects, Layout, Typography, UI } from "$lib/theme";

    let { data }: PageProps = $props();

    const lesson = $derived(data.lesson);

    // Quiz Locking Logic
    const chapterLessons = $derived(
        curriculum.filter(
            (l) => l.chapter === lesson.chapter && l.id !== lesson.id,
        ),
    );
    const isChapterComplete = $derived(
        chapterLessons.every((l) => progress.completed.includes(l.id)),
    );
    const isQuizLocked = $derived(lesson.type === "quiz" && !isChapterComplete);

    const isLocked = $derived(
        !progress.isUnlocked(lesson.id, lesson.unlockPrice) || isQuizLocked,
    );

    let isRunning = $state(false);
    let result = $state<ExecutionResult | null>(null);
    let userCode = $state("");
    let lastReward = $state<{ type: "first" | "replay"; coins: number } | null>(
        null,
    );
    let activeHintIndex = $state(0);

    $effect(() => {
        // Reset state entirely when navigating to a new lesson
        if (lesson.type === "code") {
            userCode = lesson.initialCode ?? "";
        }
        result = null;
        isRunning = false;
        lastReward = null;
        activeHintIndex = 0; // Reset active hint tab
    });

    function triggerConfetti() {
        const end = Date.now() + 1000;
        const colors = ["#facc15", "#fbbf24", "#f59e0b", "#ffffff"];

        (function frame() {
            confetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: colors,
            });
            confetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: colors,
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        })();
    }

    function handleUnlock() {
        if (progress.unlockLesson(lesson.id, lesson.unlockPrice)) {
            sounds.playSuccess(); // Reuse success sound for unlock
        } else {
            sounds.playError();
        }
    }

    async function handleRun(): Promise<void> {
        if (lesson.type !== "code" || !lesson.tests) return;

        isRunning = true;

        try {
            const executionResult = await runCode(userCode, [...lesson.tests]);
            result = executionResult;

            if (executionResult.success) {
                sounds.playSuccess();
                triggerConfetti();
                lastReward = progress.save(
                    lesson.id,
                    lesson.xp,
                    lesson.coinReward,
                );
            } else {
                sounds.playError();
            }
        } catch (err: unknown) {
            console.error("Test Execution Failed:", err);
        } finally {
            isRunning = false;
        }
    }

    function handleMarkRead(): void {
        sounds.playFeedback();
        progress.save(lesson.id, lesson.xp, lesson.coinReward);
        handleNext();
    }

    function handleNext(): void {
        const index = curriculum.findIndex((l) => l.id === lesson.id);
        if (index !== -1 && index < curriculum.length - 1) {
            const nextLesson = curriculum[index + 1];
            goto(`/learn/${nextLesson.id}`);
        }
    }

    function buyHint(index: number, cost: number) {
        if (progress.purchaseHint(lesson.id, index, cost)) {
            sounds.playFeedback();
        } else {
            sounds.playError();
        }
    }
</script>

{#snippet markdownContent(content: string, type: "prose" | "compact")}
    <div
        class={type === "prose"
            ? `prose prose-invert prose-lg max-w-none ${Typography.Prose.Headings} ${Typography.Prose.H1} ${Typography.Prose.Paragraphs} ${Typography.Prose.Strong} ${Typography.Prose.Links} ${Typography.Prose.Lists}`
            : `${Typography.Compact.Headings} ${Typography.Compact.H1} ${Typography.Compact.Paragraphs} ${Typography.Compact.Strong} ${Typography.Compact.Links} ${Typography.Compact.Lists}`}
    >
        {@html marked.parse(content)}
    </div>
{/snippet}

{#if isLocked}
    <!-- Locked State Overlay -->
    <div
        class="h-full w-full flex flex-col items-center justify-center bg-slate-950 p-8"
    >
        <div class="max-w-md w-full text-center space-y-6">
            <div
                class="h-20 w-20 bg-zinc-900 rounded-full flex items-center justify-center mx-auto border border-zinc-800"
            >
                <Lock class="h-10 w-10 text-zinc-600" />
            </div>

            {#if isQuizLocked}
                <div class="space-y-2">
                    <h1 class="text-2xl font-bold text-white">
                        Chapter Incomplete
                    </h1>
                    <p class="text-zinc-400">
                        Complete all other lessons in <strong
                            >{lesson.chapter}</strong
                        > to unlock this quiz.
                    </p>
                </div>
                <!-- Show remaining lessons count optionally -->
                <div
                    class="p-6 bg-zinc-900/50 rounded-xl border border-white/5"
                >
                    <div
                        class="flex items-center justify-center gap-2 text-zinc-500 text-sm"
                    >
                        <span>Finish the chapter to verify your mastery!</span>
                    </div>
                </div>
            {:else}
                <div class="space-y-2">
                    <h1 class="text-2xl font-bold text-white">Lesson Locked</h1>
                    <p class="text-zinc-400">
                        You need to unlock current lesson to proceed.
                    </p>
                </div>
                <div
                    class="p-6 bg-zinc-900/50 rounded-xl border border-white/5"
                >
                    <div class="flex items-center justify-between mb-4">
                        <span class="text-zinc-400">Unlock Cost</span>
                        <div
                            class="flex items-center gap-2 text-yellow-400 font-bold"
                        >
                            <Coins class="h-4 w-4" />
                            <span>{lesson.unlockPrice}</span>
                        </div>
                    </div>
                    <button
                        onclick={handleUnlock}
                        disabled={progress.coins < lesson.unlockPrice}
                        class="w-full py-3 bg-linear-to-b from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 disabled:from-zinc-800 disabled:to-zinc-800 disabled:bg-zinc-800 disabled:text-zinc-500 text-slate-950 font-bold rounded-lg transition-all shadow-[0_2px_10px_rgba(234,179,8,0.2),inset_0_1px_0_rgba(255,255,255,0.3)] border-t border-white/20 active:scale-[0.98]"
                    >
                        {progress.coins < lesson.unlockPrice
                            ? "Insufficient Coins"
                            : "Unlock Lesson"}
                    </button>
                </div>
            {/if}
        </div>
    </div>
{:else if lesson.type === "lesson"}
    <!-- Reading Mode (Centered, No Editor) -->
    <div
        class="h-full w-full flex justify-center overflow-y-auto overflow-x-hidden bg-slate-950 relative"
    >
        <!-- Background Gradient Blobs -->
        <div class={Effects.Blobs.Orange}></div>
        <div class={Effects.Blobs.Indigo}></div>

        <div class="w-full max-w-3xl px-8 py-20 relative z-10">
            {@render markdownContent(lesson.content, "prose")}

            <div class="mt-8 flex justify-end">
                <button onclick={handleMarkRead} class={UI.Buttons.Primary}>
                    <span>Continue</span>
                    <ArrowRight class="h-4 w-4" />
                </button>
            </div>
        </div>
    </div>
{:else if lesson.type === "quiz"}
    <Quiz {lesson} />
{:else}
    <!-- Challenge IDE Mode (Split Layout) -->
    <div class="h-full flex flex-col md:flex-row bg-slate-950 overflow-hidden">
        <!-- Instructions Panel -->
        <div
            class={Layout.Challenge.Panel +
                " w-full md:w-[500px] lg:w-[650px] shrink-0"}
        >
            <div class={Layout.Challenge.Header}>
                <span class={Layout.Challenge.Label}>Instructions</span>
            </div>
            <div class={Layout.Challenge.Content}>
                <!-- Background Gradient Blob for Panel -->
                <div
                    class="absolute top-0 right-0 w-[300px] h-[300px] bg-orange-500/5 rounded-full blur-[80px] pointer-events-none translate-x-1/2 -translate-y-1/2"
                ></div>

                {@render markdownContent(lesson.content, "compact")}

                <!-- Hints System -->
                {#if lesson.hints && lesson.hints.length > 0}
                    <div class="space-y-4">
                        <!-- Hints Header (Tabs) -->
                        <div class="flex items-center justify-between">
                            <h3
                                class="text-xs font-bold text-zinc-500 uppercase tracking-widest"
                            >
                                Hints
                            </h3>
                            <div class="flex gap-1">
                                {#each lesson.hints as hint, i}
                                    {@const isPurchased =
                                        hint.cost === 0 ||
                                        progress.hasPurchasedHint(lesson.id, i)}
                                    <button
                                        onclick={() => (activeHintIndex = i)}
                                        class={cn(
                                            "h-6 w-6 flex items-center justify-center rounded text-xs font-bold transition-all",
                                            activeHintIndex === i
                                                ? "bg-zinc-700 text-white"
                                                : "bg-zinc-900 text-zinc-600 hover:bg-zinc-800",
                                            !isPurchased &&
                                                activeHintIndex !== i &&
                                                "opacity-50",
                                        )}
                                    >
                                        {#if !isPurchased && activeHintIndex !== i}
                                            <Lock class="h-3 w-3" />
                                        {:else}
                                            {i + 1}
                                        {/if}
                                    </button>
                                {/each}
                            </div>
                        </div>

                        <!-- Active Hint Content -->
                        {#if lesson.hints[activeHintIndex]}
                            {@const hint = lesson.hints[activeHintIndex]}
                            {@const isPurchased =
                                hint.cost === 0 ||
                                progress.hasPurchasedHint(
                                    lesson.id,
                                    activeHintIndex,
                                )}

                            <div
                                class="p-4 bg-zinc-900/50 rounded-lg border border-white/5 relative overflow-hidden group"
                            >
                                {#if isPurchased}
                                    <div class="flex items-start gap-3">
                                        <div class="shrink-0 mt-0.5">
                                            <HelpCircle
                                                class="h-4 w-4 text-emerald-500"
                                            />
                                        </div>
                                        <div
                                            class="text-sm text-zinc-300 leading-relaxed font-light animate-in fade-in slide-in-from-right-1"
                                        >
                                            {@render markdownContent(
                                                hint.content,
                                                "compact",
                                            )}
                                        </div>
                                    </div>
                                    {#if hint.cost === 0}
                                        <div
                                            class="absolute top-2 right-2 text-[10px] font-bold text-emerald-500/50 px-1.5 py-0.5 bg-emerald-500/10 rounded uppercase tracking-wider"
                                        >
                                            Free
                                        </div>
                                    {/if}
                                {:else}
                                    <div class="text-center space-y-3 py-2">
                                        <div
                                            class="h-10 w-10 bg-zinc-800 rounded-full flex items-center justify-center mx-auto"
                                        >
                                            <Lock
                                                class="h-5 w-5 text-zinc-600"
                                            />
                                        </div>
                                        <div class="space-y-1">
                                            <p
                                                class="text-sm font-medium text-white"
                                            >
                                                Hint Locked
                                            </p>
                                            <p class="text-xs text-zinc-500">
                                                Reveal this hint for {hint.cost}
                                                coins
                                            </p>
                                        </div>
                                        <button
                                            onclick={() =>
                                                buyHint(
                                                    activeHintIndex,
                                                    hint.cost,
                                                )}
                                            disabled={progress.coins <
                                                hint.cost}
                                            class="px-4 py-1.5 bg-linear-to-b from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 disabled:from-zinc-800 disabled:to-zinc-800 disabled:bg-zinc-800 disabled:text-zinc-500 text-slate-950 text-xs font-bold rounded-lg transition-all shadow-[0_1px_4px_rgba(234,179,8,0.2),inset_0_1px_0_rgba(255,255,255,0.3)] border-t border-white/20 active:scale-[0.98]"
                                        >
                                            Unlock ({hint.cost})
                                        </button>
                                    </div>
                                {/if}
                            </div>
                        {/if}
                    </div>
                {/if}
            </div>
        </div>

        <!-- Usage Workspace -->
        <div class="flex-1 flex flex-col min-w-0 bg-slate-950">
            <!-- Editor Section -->
            <div class="flex-3 flex flex-col min-h-0 border-b border-white/5">
                <div
                    class="h-12 flex items-center justify-between px-4 bg-slate-950 border-b border-white/5 shrink-0"
                >
                    <div class="flex items-center gap-3">
                        <div
                            class="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 rounded text-xs font-medium text-zinc-300 border border-white/5"
                        >
                            <Terminal class="h-3.5 w-3.5 text-zinc-500" />
                            <span>main.rs</span>
                        </div>
                    </div>
                    <div class="flex items-center gap-4">
                        <div class="flex items-center gap-2">
                            <div
                                class="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse"
                            ></div>
                            <span
                                class="text-[10px] uppercase tracking-wider text-zinc-500 font-bold"
                                >Ready</span
                            >
                        </div>
                    </div>
                </div>
                <!-- Monaco Editor -->
                <div class="flex-1 relative bg-slate-950">
                    {#key lesson.id}
                        <Editor bind:value={userCode} onRun={handleRun} />
                    {/key}
                </div>
            </div>

            <!-- Output Section -->
            <div class={Layout.Console.Container}>
                <div class={Layout.Console.Header}>
                    <div class="flex items-center gap-2">
                        <Cpu class="h-3.5 w-3.5 text-zinc-500" />
                        <span
                            class="text-[10px] font-bold text-zinc-500 uppercase tracking-widest"
                            >Console Output</span
                        >
                    </div>
                    {#if result}
                        <div
                            class={result.success
                                ? Layout.Console.StatusPass
                                : Layout.Console.StatusFail}
                        >
                            {result.success ? "Passed" : "Failed"}
                        </div>
                    {/if}
                </div>

                <div class={Layout.Console.Output}>
                    {#if !result && !isRunning}
                        <div class={Layout.Console.EmptyState}>
                            <Terminal class="h-8 w-8 mb-3 opacity-20" />
                            <p class="text-xs font-medium opacity-50">
                                Output will appear here
                            </p>
                        </div>
                    {:else if isRunning}
                        <div
                            class="h-full flex flex-col items-center justify-center space-y-3"
                        >
                            <div
                                class="h-5 w-5 border-2 border-zinc-700 border-t-white rounded-full animate-spin"
                            ></div>
                            <span
                                class="text-xs text-zinc-500 font-medium animate-pulse"
                                >Running tests...</span
                            >
                        </div>
                    {:else if result}
                        {#if result.success}
                            <div class={Layout.Console.Success.Card}>
                                <div class={Layout.Console.Success.IconWrapper}>
                                    <Check
                                        class={Layout.Console.Success.Icon}
                                    />
                                </div>
                                <h2 class={Layout.Console.Success.Title}>
                                    Challenge Completed!
                                </h2>
                                <p class={Layout.Console.Success.Subtitle}>
                                    {#if lastReward}
                                        {#if lastReward.type === "first"}
                                            You've earned <span
                                                class={Layout.Console.Success
                                                    .Xp}
                                                >+{lastReward.coins} Coins</span
                                            >
                                        {:else}
                                            Replay Bonus <span
                                                class={Layout.Console.Success
                                                    .Xp}
                                                >+{lastReward.coins} Coins</span
                                            >
                                        {/if}
                                    {/if}
                                </p>
                                <div class={Layout.Console.Success.Actions}>
                                    <button
                                        onclick={() => (result = null)}
                                        class={UI.Buttons.Secondary}
                                    >
                                        Review Code
                                    </button>
                                    <button
                                        onclick={handleNext}
                                        class={UI.Buttons.Primary}
                                    >
                                        Next Lesson
                                    </button>
                                </div>
                            </div>
                        {/if}

                        <div class="space-y-4">
                            <div class="space-y-1">
                                {#each result.tests as test}
                                    <div class="flex items-start gap-3 py-1">
                                        {#if test.passed}
                                            <CheckCircle2
                                                class="h-4 w-4 text-emerald-500 mt-0.5 shrink-0"
                                            />
                                            <span class="text-zinc-300"
                                                >{test.description}</span
                                            >
                                        {:else}
                                            <XCircle
                                                class="h-4 w-4 text-red-500 mt-0.5 shrink-0"
                                            />
                                            <div class="flex flex-col">
                                                <span class="text-zinc-300"
                                                    >{test.description}</span
                                                >
                                                {#if test.error}
                                                    <span
                                                        class="text-xs text-red-400 mt-1 font-mono bg-red-950/20 px-2 py-1 rounded inline-block border border-red-500/10"
                                                    >
                                                        {test.error}
                                                    </span>
                                                {/if}
                                            </div>
                                        {/if}
                                    </div>
                                {/each}
                            </div>

                            {#if result.logs.length > 0}
                                <div class="pt-4 border-t border-white/5 mt-4">
                                    <div
                                        class="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2"
                                    >
                                        Logs
                                    </div>
                                    <div
                                        class="space-y-1 text-zinc-400 font-mono text-xs"
                                    >
                                        {#each result.logs as log}
                                            <div
                                                class="border-l-2 border-zinc-800 pl-3 py-0.5"
                                            >
                                                {log}
                                            </div>
                                        {/each}
                                    </div>
                                </div>
                            {/if}
                        </div>
                    {/if}
                </div>

                <div
                    class="h-14 border-t border-white/5 bg-slate-950 px-4 flex items-center justify-between shrink-0"
                >
                    <div class="flex items-center gap-4 text-xs text-zinc-500">
                        <div class="flex items-center gap-1.5 opacity-60">
                            <kbd
                                class="px-1.5 py-0.5 bg-zinc-900 border border-zinc-800 rounded font-sans text-[10px]"
                                >Ctrl</kbd
                            >
                            <span>+</span>
                            <kbd
                                class="px-1.5 py-0.5 bg-zinc-900 border border-zinc-800 rounded font-sans text-[10px]"
                                >Enter</kbd
                            >
                            <span class="ml-1">to Run</span>
                        </div>
                    </div>

                    <div class="flex gap-3">
                        <button
                            onclick={handleRun}
                            disabled={isRunning}
                            class={UI.Buttons.Primary}
                        >
                            {#if isRunning}
                                <div
                                    class="h-3 w-3 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin"
                                ></div>
                            {:else}
                                <Play class="h-3 w-3 fill-current" />
                            {/if}
                            <span>Run Code</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
{/if}
