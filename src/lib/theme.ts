export const Typography = {
    Display: "font-display italic font-normal tracking-tighter leading-none",
    Prose: {
        Headings: "prose-headings:font-display prose-headings:font-normal prose-headings:tracking-tighter prose-headings:text-white",
        H1: "prose-h1:text-5xl prose-h1:mb-8 prose-h1:leading-none",
        Paragraphs: "prose-p:text-slate-400 prose-p:leading-8 prose-p:font-light",
        Strong: "prose-strong:text-orange-200 prose-strong:font-medium",
        Links: "prose-a:text-orange-400 prose-a:no-underline hover:prose-a:text-orange-300 hover:prose-a:underline",
        Lists: "prose-li:text-slate-400 prose-li:marker:text-slate-600",
    },
    Landing: {
        Title: "font-display italic text-7xl md:text-9xl font-normal text-white tracking-tighter mb-8 leading-none",
        Subtitle: "text-lg md:text-xl text-slate-400 mb-10 max-w-2xl leading-relaxed font-light",
    },
    Compact: {
        Headings: "prose-headings:font-display prose-headings:font-normal prose-headings:tracking-tight prose-headings:text-white",
        H1: "prose-h1:text-3xl prose-h1:mb-6 prose-h1:leading-none",
        Paragraphs: "prose-p:text-zinc-400 prose-p:leading-7 prose-p:font-light prose-p:text-sm",
        Strong: "prose-strong:text-zinc-200 prose-strong:font-medium",
        Links: "prose-a:text-orange-400 prose-a:no-underline hover:prose-a:text-orange-300 hover:prose-a:underline",
        Lists: "prose-li:text-zinc-400 prose-li:marker:text-zinc-600 prose-li:text-sm",
    }
} as const;

export const CodeTheme = {
    Container: "code-block-container my-6 rounded-lg overflow-hidden bg-[#131316] shadow-2xl border border-white/10 ring-1 ring-black/50",
    Header: {
        Container: "flex items-center justify-between px-3 py-2 bg-[#131316] border-b border-white/5",
        Dots: {
            Wrapper: "flex gap-1.5",
            Red: "w-2.5 h-2.5 rounded-full bg-[#3f3f46] hover:bg-[#ff5f56] transition-colors",
            Yellow: "w-2.5 h-2.5 rounded-full bg-[#3f3f46] hover:bg-[#ffbd2e] transition-colors",
            Green: "w-2.5 h-2.5 rounded-full bg-[#3f3f46] hover:bg-[#27c93f] transition-colors",
        },
        LanguageLabel: "text-[10px] uppercase tracking-widest text-zinc-400 font-medium font-sans opacity-80"
    },
    Content: {
        Wrapper: "px-4 py-2 overflow-x-auto bg-[#131316]",
        Pre: "m-0 p-0 bg-transparent",
        CodeBlock: "font-mono text-[13px] leading-relaxed bg-transparent p-0 block text-zinc-200",
    },
    Inline: {
        Chip: "font-mono text-[12px] leading-none bg-zinc-800 px-1.5 py-1 rounded text-zinc-200 border border-white/10 inline-block align-baseline shadow-sm mx-0.5 -translate-y-[1px]",
        Simple: "font-mono text-[12px] leading-none bg-zinc-800 px-1.5 py-1 rounded text-zinc-200 border border-white/10 shadow-sm"
    }
} as const;

export const UI = {
    Buttons: {
        Primary: "group relative flex items-center justify-center gap-2 px-6 py-2.5 bg-[#FF4F00] hover:bg-[#FF5F1A] text-white rounded-lg font-medium text-[13px] tracking-wide transition-all shadow-[0_0_0_1px_rgba(0,0,0,0.4),0_2px_8px_rgba(255,79,0,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] active:scale-[0.98] active:translate-y-[1px]",
        Secondary: "group flex items-center justify-center gap-2 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 rounded-lg text-xs font-medium transition-all border border-white/5 hover:border-white/10 shadow-[0_1px_4px_rgba(0,0,0,0.2)] active:scale-[0.98]"
    },
    Badge: {
        Gold: "bg-linear-to-b from-yellow-400/10 to-yellow-500/10 text-yellow-500 border border-yellow-500/20 shadow-[0_0_10px_rgba(234,179,8,0.1)] px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
        Green: "bg-linear-to-b from-emerald-500/10 to-emerald-600/10 text-emerald-500 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)] px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
        Red: "bg-linear-to-b from-red-500/10 to-red-600/10 text-red-400 border border-red-500/20 shadow-[0_0_10px_rgba(248,113,113,0.1)] px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider"
    },
} as const;

export const Layout = {
    Challenge: {
        Panel: "bg-[#09090b]/80 backdrop-blur-xl border-r border-white/5 flex flex-col supports-[backdrop-filter]:bg-[#09090b]/60",
        Header: "h-12 border-b border-white/5 flex items-center px-6 bg-transparent shrink-0",
        Label: "text-[11px] uppercase tracking-[0.2em] text-zinc-500 font-bold",
        Content: "flex-1 overflow-y-auto p-8 prose prose-invert prose-sm max-w-none scrollbar-hide relative",
        Hint: {
            Container: "mt-8 p-4 rounded-lg border border-white/5 bg-zinc-900/50 flex items-start gap-4",
            Icon: "h-4 w-4 text-zinc-400 shrink-0 mt-0.5",
            Title: "text-[10px] font-bold text-zinc-300 mb-1 uppercase tracking-widest opacity-80",
            Text: "text-sm text-zinc-400 leading-relaxed font-light"
        }
    },
    Console: {
        Container: "flex-2 flex flex-col min-h-0 bg-[#09090b] relative border-t border-white/5",
        Header: "h-10 flex items-center justify-between px-4 bg-[#09090b] border-b border-white/5 shrink-0",
        Output: "flex-1 overflow-y-auto p-4 font-mono text-sm bg-[#09090b] text-zinc-300",
        EmptyState: "h-full flex flex-col items-center justify-center text-zinc-600",
        StatusPass: "bg-linear-to-b from-emerald-500/10 to-emerald-600/10 text-emerald-500 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)] px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
        StatusFail: "bg-linear-to-b from-red-500/10 to-red-600/10 text-red-400 border border-red-500/20 shadow-[0_0_10px_rgba(248,113,113,0.1)] px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
        Success: {
            Card: "mb-6 rounded-lg bg-emerald-500/5 border border-emerald-500/10 p-6 flex flex-col items-center text-center",
            IconWrapper: "h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center mb-3 border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.1)]",
            Icon: "h-6 w-6 text-emerald-400",
            Title: "text-lg font-bold text-white mb-1 tracking-tight",
            Subtitle: "text-zinc-400 text-sm mb-6",
            Xp: "text-emerald-400 font-bold",
            Actions: "flex gap-3"
        }
    },
    Sidebar: {
        Container: "flex flex-col border-r border-white/5 bg-[#09090b] transition-all duration-300 ease-in-out shrink-0",
        Header: "h-14 flex items-center px-4 border-b border-white/5 shrink-0 gap-2 bg-[#09090b]",
        Search: {
            Container: "relative flex-1 group",
            Input: "w-full bg-[#131316] text-xs text-zinc-200 pl-9 pr-3 py-2 rounded-md border border-white/5 focus:border-zinc-700 focus:bg-zinc-900 outline-none transition-all placeholder:text-zinc-600",
            Icon: "absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500 group-focus-within:text-zinc-300 transition-colors"
        },
        Phase: {
            Container: "px-4 pt-6 pb-2 first:pt-4",
            Title: "text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] opacity-80"
        },
        Section: {
            Title: "w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors group select-none",
            TitleText: "text-sm font-medium text-zinc-200",
            Index: "text-zinc-500 mr-2 font-mono text-xs",
            Icon: "h-4 w-4 text-zinc-600 group-hover:text-zinc-400 transition-colors"
        },
        Link: {
            Base: "flex items-center justify-between px-4 py-2 pl-8 border-l-2 border-transparent transition-all group",
            Active: "bg-white/5 border-zinc-500",
            Inactive: "hover:bg-white/5 hover:border-zinc-800",
            Text: "text-xs font-medium truncate",
            TextActive: "text-zinc-100",
            TextInactive: "text-zinc-400 group-hover:text-zinc-300",
            IconActive: "text-zinc-100",
            IconInactive: "text-zinc-600 group-hover:text-zinc-500"
        },
        Footer: "p-3 border-t border-white/5 bg-[#09090b] shrink-0"
    }
} as const;

export const Effects = {
    Blobs: {
        Wrapper: "fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden",
        Orange: "absolute top-0 left-0 w-[800px] h-[800px] bg-orange-500/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 opacity-60",
        Indigo: "absolute bottom-0 right-0 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2 opacity-60",
        Landing: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/5 rounded-full blur-[120px] opacity-60"
    }
} as const;
