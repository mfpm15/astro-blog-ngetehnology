<script lang="ts">
import { onMount } from "svelte";
import I18nKey from "../i18n/i18nKey";
import { i18n } from "../i18n/translation";
import { navigateToPage } from "../utils/navigation-utils";

let tocItems: Array<{ id: string; text: string; level: number }> = [];
let postItems: Array<{
	title: string;
	url: string;
	category?: string;
	pinned?: boolean;
}> = [];
let activeId = "";
let observer: IntersectionObserver;
let isHomePage = false;
let swupReady = false;

const togglePanel = () => {
	const panel = document.getElementById("mobile-toc-panel");
	panel?.classList.toggle("float-panel-closed");
};

const setPanelVisibility = (show: boolean): void => {
	const panel = document.getElementById("mobile-toc-panel");
	if (!panel) return;

	if (show) {
		panel.classList.remove("float-panel-closed");
	} else {
		panel.classList.add("float-panel-closed");
	}
};

const generateTOC = () => {
	const contentRoot =
		document.querySelector(".custom-md") ||
		document.querySelector(".markdown-content") ||
		document.querySelector(".prose");
	const headings = contentRoot
		? contentRoot.querySelectorAll("h1, h2, h3, h4, h5, h6")
		: document.querySelectorAll("h1, h2, h3, h4, h5, h6");
	const items: Array<{ id: string; text: string; level: number }> = [];

	headings.forEach((heading) => {
		if (heading.id) {
			const level = Number.parseInt(heading.tagName.charAt(1));
			const text = (heading.textContent || '').replace(/#+\s*$/, '');
			items.push({ id: heading.id, text, level });
		}
	});

	tocItems = items;
};

const generatePostList = () => {
	const postCards = document.querySelectorAll(".card-base");
	const items: Array<{
		title: string;
		url: string;
		category?: string;
		pinned?: boolean;
	}> = [];

	postCards.forEach((card) => {
		const titleLink = card.querySelector('a[href*="/posts/"].transition.group');
		const categoryLink = card.querySelector('a[href*="/categories/"].link-lg');
		const pinnedIcon = titleLink?.querySelector('svg[data-icon="mdi:pin"]');

		if (titleLink) {
			const href = titleLink.getAttribute("href");
			const title = titleLink.textContent?.replace(/\s+/g, " ").trim() || "";
			const category = categoryLink?.textContent?.trim() || "";
			const pinned = !!pinnedIcon;

			if (href && title) {
				items.push({ title, url: href, category, pinned });
			}
		}
	});

	postItems = items;
};

const checkIsHomePage = () => {
	isHomePage =
		window.location.pathname === "/" || window.location.pathname === "";
};

const scrollToHeading = (id: string) => {
	const element = document.getElementById(id);
	if (!element) return;

	setPanelVisibility(false);
	element.scrollIntoView({ behavior: "smooth", block: "start" });
	history.replaceState(null, "", `#${encodeURIComponent(id)}`);
};

const navigateToPost = (url: string) => {
	setPanelVisibility(false);

	navigateToPage(url);
};

const updateActiveHeading = () => {
	const contentRoot =
		document.querySelector(".custom-md") ||
		document.querySelector(".markdown-content") ||
		document.querySelector(".prose");
	const headings = contentRoot
		? contentRoot.querySelectorAll("h1, h2, h3, h4, h5, h6")
		: document.querySelectorAll("h1, h2, h3, h4, h5, h6");
	const scrollTop = window.scrollY;
	const offset = 100;

	let currentActiveId = "";
	headings.forEach((heading) => {
		if (heading.id) {
			const elementTop = (heading as HTMLElement).offsetTop - offset;
			if (scrollTop >= elementTop) {
				currentActiveId = heading.id;
			}
		}
	});

	activeId = currentActiveId;
};

const setupIntersectionObserver = () => {
	const contentRoot =
		document.querySelector(".custom-md") ||
		document.querySelector(".markdown-content") ||
		document.querySelector(".prose");
	const headings = contentRoot
		? contentRoot.querySelectorAll("h1, h2, h3, h4, h5, h6")
		: document.querySelectorAll("h1, h2, h3, h4, h5, h6");

	if (observer) {
		observer.disconnect();
	}

	observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					activeId = entry.target.id;
				}
			});
		},
		{
			rootMargin: "-80px 0px -80% 0px",
			threshold: 0,
		},
	);

	headings.forEach((heading) => {
		if (heading.id) {
			observer.observe(heading);
		}
	});
};

const checkSwupAvailability = () => {
	if (typeof window !== "undefined") {
		swupReady = !!(window as any).swup;

		if (!swupReady) {
			const checkSwup = () => {
				if ((window as any).swup) {
					swupReady = true;
					document.removeEventListener("swup:enable", checkSwup);
				}
			};

			document.addEventListener("swup:enable", checkSwup);

			setTimeout(() => {
				if ((window as any).swup) {
					swupReady = true;
					document.removeEventListener("swup:enable", checkSwup);
				}
			}, 1000);
		}
	}
};

const init = () => {
	checkIsHomePage();
	checkSwupAvailability();
	if (isHomePage) {
		generatePostList();
	} else {
		generateTOC();
		setupIntersectionObserver();
		updateActiveHeading();
	}
};

onMount(() => {
	// Delay init so the DOM content is ready.
	setTimeout(init, 100);

	window.addEventListener("scroll", updateActiveHeading);

	return () => {
		if (observer) {
			observer.disconnect();
		}
		window.removeEventListener("scroll", updateActiveHeading);
	};
});

// Export init so the shell can re-run it after route changes.
if (typeof window !== "undefined") {
	(window as any).mobileTOCInit = init;
}
</script>

<!-- TOC toggle button for mobile -->
<button 
	on:click={togglePanel} 
	aria-label="Table of Contents" 
	id="mobile-toc-switch"
	class="btn-plain scale-animation rounded-lg h-11 w-11 active:scale-90 lg:!hidden"
>
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="text-[1.25rem]" aria-hidden="true">
		<path fill="currentColor" d="M9 19v-2h12v2zm0-6v-2h12v2zm0-6V5h12v2zM5 20q-.825 0-1.412-.587T3 18t.588-1.412T5 16t1.413.588T7 18t-.587 1.413T5 20m0-6q-.825 0-1.412-.587T3 12t.588-1.412T5 10t1.413.588T7 12t-.587 1.413T5 14m0-6q-.825 0-1.412-.587T3 6t.588-1.412T5 4t1.413.588T7 6t-.587 1.413T5 8" />
	</svg>
</button>

<!-- Mobile TOC Panel -->
<div 
	id="mobile-toc-panel" 
	class="float-panel float-panel-closed mobile-toc-panel absolute md:w-[20rem] w-[calc(100vw-2rem)]
		top-20 left-4 md:left-[unset] right-4 shadow-2xl rounded-2xl p-4"
>
	<div class="flex items-center justify-between mb-4">
		<h3 class="text-lg font-bold text-[var(--primary)]">{isHomePage ? i18n(I18nKey.postList) : i18n(I18nKey.tableOfContents)}</h3>
		<button 
			on:click={togglePanel}
			aria-label="Close TOC"
			class="btn-plain rounded-lg h-8 w-8 active:scale-90"
		>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="text-[1rem]" aria-hidden="true">
				<path fill="currentColor" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z" />
			</svg>
		</button>
	</div>

	{#if isHomePage}
		{#if postItems.length === 0}
			<div class="text-center py-8 text-black/50 dark:text-white/50">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="text-2xl mb-2" aria-hidden="true">
					<path fill="currentColor" d="M7 17h7v-2H7zm0-4h10v-2H7zm0-4h10V7H7zM5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm0-2h14V5H5zM5 5v14z" />
				</svg>
				<p>No articles yet</p>
			</div>
		{:else}
			<div class="post-content">
				{#each postItems as post}
					<button
						on:click={() => navigateToPost(post.url)}
						class="post-item"
					>
						<div class="post-title">
							{#if post.pinned}
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="pinned-icon" aria-hidden="true">
									<path fill="currentColor" d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2z" />
								</svg>
							{/if}
							{post.title}
						</div>
						{#if post.category}
							<div class="post-category">{post.category}</div>
						{/if}
					</button>
				{/each}
			</div>
		{/if}
	{:else}
		{#if tocItems.length === 0}
			<div class="text-center py-8 text-black/50 dark:text-white/50">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="text-2xl mb-2" aria-hidden="true">
					<path fill="currentColor" d="M7 17h7v-2H7zm0-4h10v-2H7zm0-4h10V7H7zM5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm0-2h14V5H5zM5 5v14z" />
				</svg>
				<p>This page has no table of contents yet</p>
			</div>
		{:else}
			<div class="toc-content">
				{#each tocItems as item}
					<button
						on:click={() => scrollToHeading(item.id)}
						class="toc-item level-{item.level} {activeId === item.id ? 'active' : ''}"
						class:active={activeId === item.id}
					>
						<span class="toc-text">{item.text}</span>
					</button>
				{/each}
			</div>
		{/if}
	{/if}
</div>

<style>
	.mobile-toc-panel {
		max-height: calc(100vh - 120px);
		overflow-y: auto;
		background: var(--card-bg);
		border: 1px solid var(--line-color);
		backdrop-filter: blur(10px);
	}

	.toc-content {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.post-content {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.toc-item {
		display: block;
		width: 100%;
		text-align: left;
		padding: 8px 12px;
		border-radius: 8px;
		transition: all 0.2s ease;
		border: none;
		background: transparent;
		cursor: pointer;
		color: rgba(0, 0, 0, 0.75);
		font-size: 0.9rem;
		line-height: 1.4;
	}

	:global(.dark) .toc-item {
		color: rgba(255, 255, 255, 0.75);
	}

	.toc-item:hover {
		background: var(--btn-plain-bg-hover);
		color: var(--primary);
	}

	.toc-item.active {
		background: var(--btn-plain-bg-active);
		color: var(--primary);
		font-weight: 600;
		border-left: 3px solid var(--primary);
		padding-left: 9px;
	}

	/* Indent headings by level */
	.toc-item.level-1 {
		padding-left: 12px;
		font-weight: 600;
		font-size: 1rem;
	}

	.toc-item.level-2 {
		padding-left: 20px;
	}

	.toc-item.level-3 {
		padding-left: 28px;
		font-size: 0.85rem;
	}

	.toc-item.level-4 {
		padding-left: 36px;
		font-size: 0.8rem;
	}

	.toc-item.level-5,
	.toc-item.level-6 {
		padding-left: 44px;
		font-size: 0.75rem;
		color: rgba(0, 0, 0, 0.5);
	}

	:global(.dark) .toc-item.level-5,
	:global(.dark) .toc-item.level-6 {
		color: rgba(255, 255, 255, 0.5);
	}

	.toc-item.level-1.active {
		padding-left: 9px;
	}

	.toc-item.level-2.active {
		padding-left: 17px;
	}

	.toc-item.level-3.active {
		padding-left: 25px;
	}

	.toc-item.level-4.active {
		padding-left: 33px;
	}

	.toc-item.level-5.active,
	.toc-item.level-6.active {
		padding-left: 41px;
	}

	.toc-text {
		display: block;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.post-item {
		display: block;
		width: 100%;
		text-align: left;
		padding: 12px;
		border-radius: 8px;
		transition: all 0.2s ease;
		border: none;
		background: transparent;
		cursor: pointer;
		border: 1px solid var(--line-color);
	}

	.post-item:hover {
		background: var(--btn-plain-bg-hover);
		border-color: var(--primary);
		transform: translateY(-1px);
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.post-title {
		font-size: 0.9rem;
		font-weight: 600;
		color: rgba(0, 0, 0, 0.75);
		margin-bottom: 4px;
		line-height: 1.4;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	:global(.dark) .post-title {
		color: rgba(255, 255, 255, 0.75);
	}

	.post-category {
		font-size: 0.75rem;
		color: rgba(0, 0, 0, 0.5);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	:global(.dark) .post-category {
		color: rgba(255, 255, 255, 0.5);
	}

	:global(.pinned-icon) {
		display: inline;
		color: var(--primary);
		font-size: 1.25rem;
		margin-right: 0.5rem;
		transform: translateY(-0.125rem);
		vertical-align: middle;
	}

	.post-item:hover .post-title {
		color: var(--primary);
	}

	.post-item:hover .post-category {
		color: rgba(0, 0, 0, 0.75);
	}

	:global(.dark) .post-item:hover .post-category {
		color: rgba(255, 255, 255, 0.75);
	}

	/* Scrollbar styling */
	.mobile-toc-panel::-webkit-scrollbar {
		width: 4px;
	}

	.mobile-toc-panel::-webkit-scrollbar-track {
		background: transparent;
	}

	.mobile-toc-panel::-webkit-scrollbar-thumb {
		background: var(--line-color);
		border-radius: 2px;
	}

	.mobile-toc-panel::-webkit-scrollbar-thumb:hover {
		background: var(--text-color-25);
	}
</style>
