<script lang="ts">
	import "../app.css";
	import { cn } from "$lib/utils";
	import {
		Menu,
		X,
		ChevronRight,
		ChevronDown,
		Search,
		FileText,
		Code2,
		Circle,
		CheckCircle2,
		Layout,
		BookOpen,
		Lock,
		Coins,
	} from "lucide-svelte";
	import { progress } from "$lib/progress.svelte";
	import type { LayoutProps } from "./$types";

	import { Layout as LayoutTheme } from "$lib/theme";

	let { children, data }: LayoutProps = $props();

	let isSidebarOpen = $state(true);
	let searchQuery = $state("");
	let expandedChapters = $state<Record<string, boolean>>({});

	// Initialize all chapters as expanded
	$effect(() => {
		Object.values(data.phases).forEach((chapters) => {
			Object.keys(chapters).forEach((chapter) => {
				if (expandedChapters[chapter] === undefined) {
					expandedChapters[chapter] = true;
				}
			});
		});
	});

	function toggleChapter(chapter: string) {
		expandedChapters[chapter] = !expandedChapters[chapter];
	}

	const filteredPhases = $derived(
		Object.entries(data.phases)
			.map(([phaseName, chapters]) => {
				const filteredPhaseChapters = Object.entries(chapters)
					.map(([chapterName, lessons]) => ({
						name: chapterName,
						lessons: lessons.filter((l) =>
							l.title
								.toLowerCase()
								.includes(searchQuery.toLowerCase()),
						),
					}))
					.filter((c) => c.lessons.length > 0);

				return {
					name: phaseName,
					chapters: filteredPhaseChapters,
				};
			})
			.filter((p) => p.chapters.length > 0),
	);
</script>

<div
	class="flex h-screen w-full overflow-hidden bg-slate-950 text-zinc-100 font-sans"
>
	<!-- Sidebar -->
	<aside
		class={cn(
			LayoutTheme.Sidebar.Container,
			isSidebarOpen ? "w-[300px]" : "w-0 border-none overflow-hidden",
		)}
	>
		<!-- Search Header -->
		<div class={LayoutTheme.Sidebar.Header}>
			<div class={LayoutTheme.Sidebar.Search.Container}>
				<Search class={LayoutTheme.Sidebar.Search.Icon} />
				<input
					type="text"
					bind:value={searchQuery}
					placeholder="Search lessons..."
					class={LayoutTheme.Sidebar.Search.Input}
				/>
			</div>
			<button
				class="p-1.5 text-zinc-500 hover:text-zinc-300 transition-colors"
			>
				<BookOpen class="h-4 w-4" />
			</button>
		</div>

		<!-- Navigation -->
		<nav class="flex-1 overflow-y-auto scrollbar-hide px-0 pb-8">
			{#each filteredPhases as phase (phase.name)}
				<div class={LayoutTheme.Sidebar.Phase.Container}>
					<div class={LayoutTheme.Sidebar.Phase.Title}>
						{phase.name}
					</div>
				</div>

				<div class="space-y-0.5">
					{#each phase.chapters as chapter (chapter.name)}
						<div class="mb-0.5">
							<!-- Chapter Header -->
							<button
								onclick={() => toggleChapter(chapter.name)}
								class={LayoutTheme.Sidebar.Section.Title}
							>
								<span
									class={LayoutTheme.Sidebar.Section
										.TitleText}
								>
									{chapter.name}
								</span>
								<div class="flex items-center gap-2">
									{#if chapter.lessons.length > 0 && chapter.lessons.every( (l) => progress.completed.includes(l.id), )}
										<CheckCircle2
											class="h-3.5 w-3.5 text-emerald-500"
										/>
									{/if}
									{#if expandedChapters[chapter.name]}
										<ChevronDown
											class={LayoutTheme.Sidebar.Section
												.Icon}
										/>
									{:else}
										<ChevronRight
											class={LayoutTheme.Sidebar.Section
												.Icon}
										/>
									{/if}
								</div>
							</button>

							<!-- Lessons List -->
							{#if expandedChapters[chapter.name]}
								<div class="flex flex-col">
									{#each chapter.lessons as item}
										<a
											href="/learn/{item.id}"
											class={cn(
												LayoutTheme.Sidebar.Link.Base,
												data.url.includes(item.id)
													? LayoutTheme.Sidebar.Link
															.Active
													: LayoutTheme.Sidebar.Link
															.Inactive,
												item.unlockPrice > 0 &&
													!progress.isUnlocked(
														item.id,
														item.unlockPrice,
													)
													? "opacity-75"
													: "",
											)}
										>
											<div
												class="flex items-center gap-3 min-w-0"
											>
												{#if item.unlockPrice > 0 && !progress.isUnlocked(item.id, item.unlockPrice)}
													<div
														class="h-3.5 w-3.5 shrink-0 flex items-center justify-center"
													>
														<Lock
															class="h-3 w-3 text-zinc-600"
														/>
													</div>
												{:else if item.type === "code"}
													<Code2
														class={cn(
															"h-3.5 w-3.5 shrink-0",
															data.url.includes(
																item.id,
															)
																? LayoutTheme
																		.Sidebar
																		.Link
																		.IconActive
																: LayoutTheme
																		.Sidebar
																		.Link
																		.IconInactive,
														)}
													/>
												{:else}
													<FileText
														class={cn(
															"h-3.5 w-3.5 shrink-0 opacity-60",
															data.url.includes(
																item.id,
															)
																? LayoutTheme
																		.Sidebar
																		.Link
																		.IconActive
																: LayoutTheme
																		.Sidebar
																		.Link
																		.IconInactive,
														)}
													/>
												{/if}
												<span
													class={cn(
														LayoutTheme.Sidebar.Link
															.Text,
														data.url.includes(
															item.id,
														)
															? LayoutTheme
																	.Sidebar
																	.Link
																	.TextActive
															: LayoutTheme
																	.Sidebar
																	.Link
																	.TextInactive,
													)}>{item.title}</span
												>
											</div>

											<!-- Status Indicator -->
											<div class="shrink-0 ml-3">
												{#if progress.completed.includes(item.id)}
													<CheckCircle2
														class="h-3.5 w-3.5 text-emerald-500"
													/>
												{:else}
													<div
														class="h-3.5 w-3.5 rounded-full border border-zinc-800 group-hover:border-zinc-600 transition-colors"
													></div>
												{/if}
											</div>
										</a>
									{/each}
								</div>
							{/if}
						</div>
					{/each}
				</div>
			{/each}
		</nav>

		<!-- Minimalist Footer -->
		<div class={LayoutTheme.Sidebar.Footer}>
			<div class="flex items-center justify-between gap-3 px-2">
				<div
					class="flex items-center gap-2 px-2 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20"
				>
					<Coins class="h-3.5 w-3.5 text-yellow-500" />
					<span class="text-xs font-bold text-yellow-500"
						>{progress.coins} Coins</span
					>
				</div>
				<span class="text-[10px] font-mono text-zinc-600">v1.0.4</span>
			</div>
		</div>
	</aside>

	<!-- Sidebar Toggle for closed state -->
	{#if !isSidebarOpen}
		<div class="absolute left-0 top-3 z-50">
			<button
				onclick={() => (isSidebarOpen = true)}
				class="p-2 bg-slate-950 border border-white/5 rounded-r-lg text-zinc-400 hover:text-white shadow-lg transition-colors"
			>
				<Menu class="h-4 w-4" />
			</button>
		</div>
	{/if}

	<!-- Main Content Area -->
	<main class="flex-1 flex flex-col min-w-0 bg-slate-950">
		{@render children()}
	</main>
</div>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
	}
	:global(.scrollbar-hide::-webkit-scrollbar) {
		display: none;
	}
	:global(.scrollbar-hide) {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
</style>
