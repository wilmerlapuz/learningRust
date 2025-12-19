<script lang="ts">
    import type { QuizLesson } from "$lib/data/types";
    import { UI, Effects } from "$lib/theme";
    import { Check, X, ArrowRight, RefreshCw, Trophy } from "lucide-svelte";
    import { progress } from "$lib/progress.svelte";
    import { goto } from "$app/navigation";

    let { lesson } = $props<{ lesson: QuizLesson }>();

    let currentQuestionIndex = $state(0);
    let selectedOption = $state<number | null>(null);
    let isAnswered = $state(false);
    let score = $state(0);
    let showResult = $state(false);

    // Derived state for current question
    let currentQuestion = $derived(lesson.questions[currentQuestionIndex]);
    let isCorrect = $derived(selectedOption === currentQuestion.correctAnswer);

    function handleSelect(index: number) {
        if (isAnswered) return;
        selectedOption = index;
        isAnswered = true;

        if (index === currentQuestion.correctAnswer) {
            score++;
        }
    }

    function handleNext() {
        if (currentQuestionIndex < lesson.questions.length - 1) {
            currentQuestionIndex++;
            selectedOption = null;
            isAnswered = false;
        } else {
            showResult = true;
            if (score === lesson.questions.length) {
                // Perfect score!
                progress.save(lesson.id, lesson.xp, lesson.coinReward || 0);
            }
        }
    }

    function handleRetry() {
        currentQuestionIndex = 0;
        selectedOption = null;
        isAnswered = false;
        score = 0;
        showResult = false;
    }

    function getOptionClass(index: number) {
        const base =
            "w-full p-4 rounded-lg border text-left transition-all duration-200 flex items-center justify-between group relative overflow-hidden";

        if (!isAnswered) {
            return `${base} border-white/5 bg-zinc-900/50 hover:bg-zinc-800 hover:border-zinc-700 text-zinc-300`;
        }

        if (index === currentQuestion.correctAnswer) {
            return `${base} border-emerald-500/50 bg-emerald-500/10 text-emerald-400 font-medium`;
        }

        if (
            index === selectedOption &&
            index !== currentQuestion.correctAnswer
        ) {
            return `${base} border-red-500/50 bg-red-500/10 text-red-400`;
        }

        return `${base} border-white/5 bg-zinc-900/30 text-zinc-600 opacity-50`;
    }
</script>

<div
    class="h-full w-full flex justify-center overflow-y-auto overflow-x-hidden bg-slate-950 relative"
>
    <!-- Background Gradient Blobs -->
    <div class={Effects.Blobs.Orange}></div>
    <div class={Effects.Blobs.Indigo}></div>

    <div
        class="w-full max-w-2xl px-8 pt-20 pb-40 relative z-10 flex flex-col justify-center min-h-screen"
    >
        {#if !showResult}
            <!-- Header -->
            <div class="mb-12 text-center">
                <span
                    class="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2 block"
                >
                    Quiz &mdash; Question {currentQuestionIndex + 1} of {lesson
                        .questions.length}
                </span>
                <h2 class="text-3xl font-display text-white tracking-tight">
                    {currentQuestion.question}
                </h2>
            </div>

            <!-- Options -->
            <div class="space-y-4">
                {#each currentQuestion.options as option, index}
                    <button
                        class={getOptionClass(index)}
                        onclick={() => handleSelect(index)}
                        disabled={isAnswered}
                    >
                        <span class="relative z-10">{option}</span>

                        {#if isAnswered}
                            {#if index === currentQuestion.correctAnswer}
                                <Check class="w-5 h-5 text-emerald-400" />
                            {:else if index === selectedOption}
                                <X class="w-5 h-5 text-red-400" />
                            {/if}
                        {/if}
                    </button>
                {/each}
            </div>

            <!-- Explanation & Next Button -->
            <!-- Use invisible spacer to prevent layout shift if explanation is hidden -->
            <div class="mt-8 min-h-[100px] flex flex-col items-center">
                {#if isAnswered}
                    <div
                        class="w-full bg-zinc-900/50 border border-white/5 p-4 rounded-lg mb-6 animate-in fade-in slide-in-from-bottom-2 duration-300"
                    >
                        <div class="flex items-start gap-3">
                            <div
                                class={`mt-0.5 p-1 rounded-full ${isCorrect ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}
                            >
                                {#if isCorrect}
                                    <Check class="w-3 h-3" />
                                {:else}
                                    <X class="w-3 h-3" />
                                {/if}
                            </div>
                            <div>
                                <h4
                                    class={`text-sm font-bold mb-1 ${isCorrect ? "text-emerald-400" : "text-red-400"}`}
                                >
                                    {isCorrect ? "Correct!" : "Incorrect"}
                                </h4>
                                <p
                                    class="text-sm text-zinc-400 leading-relaxed font-light"
                                >
                                    {currentQuestion.explanation}
                                </p>
                            </div>
                        </div>
                    </div>

                    <button onclick={handleNext} class={UI.Buttons.Primary}>
                        <span
                            >{currentQuestionIndex ===
                            lesson.questions.length - 1
                                ? "Finish Quiz"
                                : "Next Question"}</span
                        >
                        <ArrowRight class="h-4 w-4" />
                    </button>
                {/if}
            </div>
        {:else}
            <!-- Result Screen -->
            <div class="text-center animate-in zoom-in-95 duration-500">
                <div
                    class="inline-flex items-center justify-center w-24 h-24 rounded-full bg-zinc-900 border border-white/10 mb-8 relative"
                >
                    {#if score === lesson.questions.length}
                        <Trophy class="w-10 h-10 text-emerald-400" />
                        <div
                            class="absolute inset-0 bg-emerald-500/10 rounded-full blur-xl"
                        ></div>
                    {:else}
                        <span class="text-4xl font-display text-zinc-200"
                            >{score}/{lesson.questions.length}</span
                        >
                    {/if}
                </div>

                <h2 class="text-4xl font-display text-white mb-4">
                    {score === lesson.questions.length
                        ? "Mastery Achieved!"
                        : "Quiz Complete"}
                </h2>

                <p class="text-zinc-400 mb-12 max-w-md mx-auto leading-relaxed">
                    {#if score === lesson.questions.length}
                        Perfect score! You've earned <span
                            class="text-amber-400 font-bold"
                            >{lesson.coinReward} Coins</span
                        >
                        and
                        <span class="text-violet-400 font-bold"
                            >{lesson.xp} XP</span
                        >.
                    {:else}
                        You got {score} out of {lesson.questions.length} correct.
                        Review the chapter and try again to earn full rewards.
                    {/if}
                </p>

                <div class="flex justify-center gap-4">
                    <button
                        onclick={handleRetry}
                        class={`${UI.Buttons.Secondary} flex items-center gap-2`}
                    >
                        <RefreshCw class="w-4 h-4" />
                        <span>Try Again</span>
                    </button>

                    {#if score === lesson.questions.length}
                        <button
                            onclick={() => goto("/")}
                            class={UI.Buttons.Primary}
                        >
                            <span>Back to Menu</span>
                            <ArrowRight class="h-4 w-4" />
                        </button>
                    {/if}
                </div>
            </div>
        {/if}
    </div>
</div>
