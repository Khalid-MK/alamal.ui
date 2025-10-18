import sal from "sal.js";
import "sal.js/dist/sal.css";

export default defineNuxtPlugin(() => {
	// Initialize SAL.js globally once for all scroll animations
	// Using threshold of 0.01 (1%) for better initial viewport detection
	// once: true ensures animations trigger only once per element
	sal({
		threshold: 0.01,
		once: true,
	});
});
