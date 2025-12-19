<script lang="ts">
    import { ArrowRight, Terminal } from "lucide-svelte";
    import { goto } from "$app/navigation";
    import { Typography, Effects } from "$lib/theme";
</script>

<div
    class="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-8 relative overflow-hidden"
>
    <!-- Background Gradient Blob -->
    <div class={Effects.Blobs.Landing}></div>

    <div class="relative z-10 flex flex-col items-center text-center max-w-3xl">
        <div
            class="flex items-center justify-center w-20 h-20 bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-white/5 shadow-2xl mb-8 group hover:border-orange-500/30 transition-colors"
        >
            <Terminal
                class="w-8 h-8 text-orange-400/80 group-hover:text-orange-400 group-hover:scale-110 transition-all duration-300"
            />
        </div>

        <h1 class={Typography.Landing.Title}>
            Master <span
                class="text-transparent bg-clip-text bg-linear-to-r from-orange-300 to-red-400"
                >Rust</span
            >
        </h1>

        <p class={Typography.Landing.Subtitle}>
            The interactive course for developers who want to learn systems
            programming properly. Build reliability, performance, and safety
            into your DNA.
        </p>

        <div class="flex flex-col sm:flex-row gap-4">
            <a
                href="/learn/ch1-intro"
                class="flex items-center gap-2 px-8 py-4 bg-orange-500 hover:bg-orange-400 text-slate-950 rounded-xl font-bold text-lg transition-all hover:scale-105 active:scale-95 shadow-lg shadow-orange-500/20"
            >
                Start Learning
                <ArrowRight class="w-5 h-5" />
            </a>
            <a
                href="https://www.rust-lang.org/"
                target="_blank"
                rel="noreferrer"
                class="flex items-center gap-2 px-8 py-4 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 rounded-xl font-bold text-lg transition-all hover:bg-slate-800"
            >
                About Rust
            </a>
        </div>
    </div>

    <div class="absolute bottom-8 left-0 w-full text-center">
        <p
            class="text-2xl text-slate-300 font-bold opacity-0 animate-pulse delay-1000"
        ></p>
    </div>
</div>
