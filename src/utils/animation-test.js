// Animation test utilities used during development (Yukina-style slide effects).

export function testSlideAnimation() {
	console.log("Testing slide animation effects...");

	// Inspect main animation targets
	const mainElements = document.querySelectorAll(".transition-main");
	const animationElements = document.querySelectorAll(".onload-animation");

	console.log(`Found ${mainElements.length} main transition elements`);
	console.log(`Found ${animationElements.length} onload animation elements`);

	// Dump computed CSS values for debugging
	mainElements.forEach((el, index) => {
		const styles = window.getComputedStyle(el);
		console.log(`Element ${index}:`, {
			transition: styles.transition,
			transform: styles.transform,
			opacity: styles.opacity,
		});
	});

	return {
		mainElements: mainElements.length,
		animationElements: animationElements.length,
		status: "Animation test completed",
	};
}

// Simulate page transition animation states
export function simulatePageTransition() {
	const body = document.body;
	const html = document.documentElement;

	// Enter leaving state
	html.classList.add("is-animating", "is-leaving");

	setTimeout(() => {
		// Swap into entering state
		html.classList.remove("is-leaving");

		setTimeout(() => {
			// Finish
			html.classList.remove("is-animating");
			console.log("Page transition simulation completed");
		}, 300);
	}, 300);
}

// Expose helpers in the browser console (dev-only)
if (typeof window !== "undefined") {
	window.testSlideAnimation = testSlideAnimation;
	window.simulatePageTransition = simulatePageTransition;
}
