<template>
	<component
		:is="componentTag"
		:to="to"
		:href="href"
		:type="computedType"
		:disabled="disabled || loading"
		:class="buttonClasses"
		:aria-label="ariaLabel"
		:aria-busy="loading"
		@click="handleClick"
	>
		<!-- Loading Spinner -->
		<span v-if="loading" class="edu-btn-spinner">
			<svg
				class="animate-spin"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
			>
				<circle
					class="opacity-25"
					cx="12"
					cy="12"
					r="10"
					stroke="currentColor"
					stroke-width="4"
				></circle>
				<path
					class="opacity-75"
					fill="currentColor"
					d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
				></path>
			</svg>
		</span>

		<!-- Icon Left -->
		<i
			v-if="icon && (iconPosition === 'left' || leftIcon) && !loading"
			:class="icon"
			class="edu-btn-icon edu-btn-icon-left"
		></i>

		<!-- Slot Content -->
		<span class="edu-btn-content">
			<slot></slot>
		</span>

		<!-- Icon Right -->
		<i
			v-if="icon && iconPosition === 'right' && !leftIcon && !loading"
			:class="icon"
			class="edu-btn-icon edu-btn-icon-right"
		></i>
	</component>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from "vue-router";

export interface EduButtonProps {
	/** Button visual variant */
	variant?:
		| "primary"
		| "secondary"
		| "secondary1"
		| "border"
		| "curved"
		| "borderCurved"
		| "gradient"
		| "round"
		| "transparent";
	/** Button size */
	size?: "small" | "medium" | "large" | "default";
	/** Icon class name (e.g., 'icon-4') */
	icon?: string;
	/** Icon position */
	iconPosition?: "left" | "right";
	/** Shorthand for left icon */
	leftIcon?: boolean;
	/** Route location for NuxtLink */
	to?: RouteLocationRaw;
	/** External URL */
	href?: string;
	/** Button type (when rendered as button element) */
	type?: "button" | "submit" | "reset";
	/** Disabled state */
	disabled?: boolean;
	/** Loading state */
	loading?: boolean;
	/** Full width button */
	block?: boolean;
	/** Curved variant style */
	curved?: boolean | "medium";
	/** Fully rounded pill shape */
	rounded?: boolean;
	/** Rectangular shape with no border radius */
	rectangular?: boolean;
	/** Accessibility label */
	ariaLabel?: string;
}

const props = withDefaults(defineProps<EduButtonProps>(), {
	variant: "primary",
	size: "default",
	iconPosition: "right",
	leftIcon: false,
	type: "button",
	disabled: false,
	loading: false,
	block: false,
	curved: false,
	rounded: false,
	rectangular: false,
});

const emit = defineEmits<{
	click: [event: MouseEvent];
}>();

// Determine which component to render
const componentTag = computed(() => {
	if (props.to) return resolveComponent("NuxtLink");
	if (props.href) return "a";
	return "button";
});

// Compute the type attribute (only for button elements)
const computedType = computed(() => {
	if (props.to || props.href) return undefined;
	return props.type;
});

// Build CSS classes
const buttonClasses = computed(() => {
	const classes = ["edu-btn"];

	// Variant classes
	if (props.variant === "secondary") classes.push("btn-secondary");
	if (props.variant === "secondary1") classes.push("btn-secondary1");
	if (props.variant === "border") classes.push("btn-border");
	if (props.variant === "curved") classes.push("btn-curved");
	if (props.variant === "borderCurved") classes.push("btn-border-curved");
	if (props.variant === "gradient") classes.push("btn-gradient");
	if (props.variant === "round") classes.push("btn-round");
	if (props.variant === "transparent") classes.push("btn-transparent");

	// Size classes
	if (props.size === "small") classes.push("btn-small");
	if (props.size === "medium") classes.push("btn-medium");
	if (props.size === "large") classes.push("btn-large");

	// Icon position
	if (props.leftIcon) classes.push("left-icon");

	// Special modifiers
	if (props.block) classes.push("btn-block");
	if (props.rounded) classes.push("btn-rounded");
	if (props.rectangular) classes.push("btn-rectangular");
	if (props.curved === "medium") classes.push("curved-medium");
	if (props.disabled) classes.push("btn-disabled");
	if (props.loading) classes.push("btn-loading");

	return classes;
});

// Handle click events
const handleClick = (event: MouseEvent) => {
	if (!props.disabled && !props.loading) {
		emit("click", event);
	}
};
</script>

<style lang="scss" scoped>
/* Base Button Styles */
.edu-btn {
	/* Layout & Display */
	text-align: center;
	border-radius: 5px;
	display: inline-block;
	position: relative;
	overflow: hidden;
	z-index: 1;
	cursor: pointer;

	/* Dimensions */
	height: 60px;
	line-height: 62px;
	padding: 0 30px;

	/* Typography */
	font-size: 15px;
	font-weight: 500;
	font-family: var(--font-secondary, "Spartan", sans-serif);
	text-decoration: none;

	/* Colors */
	color: var(--edu-btn-color, var(--color-white, #ffffff));
	background: var(--color-primary, #1ab69d);

	/* Interaction */
	border: 0 none;
	transition: 0.4s;

	/* Flexbox for content alignment */
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: 6px;

	/* Hover Animation - Gradient Slide Effect */
	&::after {
		content: "";
		height: 100%;
		width: 0;
		background: linear-gradient(
			-90deg,
			var(--color-primary, #1ab69d) 0%,
			#139a83 100%
		);
		border-radius: 5px;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: -1;
		transition: 0.4s;
	}

	&:hover:not(.btn-disabled):not(.btn-loading) {
		&::after {
			left: 0;
			width: 100%;
		}
	}

	/* Focus state for accessibility */
	&:focus-visible {
		outline: 2px solid var(--color-primary, #1ab69d);
		outline-offset: 2px;
	}

	/* Responsive - Mobile */
	@media only screen and (max-width: 767px) {
		padding: 0 20px;
		font-size: 14px;
		height: 50px;
		line-height: 52px;

		.edu-btn-icon {
			font-size: 9px;
		}
	}
}

/* ===========================
   Size Variations
   =========================== */
.edu-btn.btn-large {
	padding: 0 40px;

	.edu-btn-icon-right {
		padding-left: 10px;
	}
}

.edu-btn.btn-medium {
	height: 50px;
	line-height: 51px;
	padding: 0 25px;
}

.edu-btn.btn-small {
	height: 40px;
	line-height: 40px;
	padding: 0 20px;
	font-size: 14px;
}

/* ===========================
   Style Variants
   =========================== */

/* Secondary Button */
.edu-btn.btn-secondary {
	background: var(--color-secondary, #ee4a62);
	color: var(--color-white, #ffffff);

	&::after {
		background: linear-gradient(
			-90deg,
			var(--color-primary, #1ab69d) 0%,
			#139a83 100%
		);
	}

	&:hover {
		color: var(--color-white, #ffffff);
	}
}

/* Secondary Variant 1 */
.edu-btn.btn-secondary1 {
	background: var(--color-secondary, #ee4a62);
	color: var(--color-white, #ffffff);

	&::after {
		background: var(--color-white, #ffffff);
	}

	&:hover {
		color: var(--color-heading, #181818);
	}
}

/* Border Button */
.edu-btn.btn-border {
	background-color: transparent;
	border: 1px solid var(--color-border, #e5e5e5);
	color: var(--color-heading, #181818);
	padding: 0 25px;

	&::after {
		display: none;
	}

	&:hover {
		background-color: var(--color-primary, #1ab69d);
		border-color: var(--color-primary, #1ab69d);
		color: var(--color-white, #ffffff);
	}
}

/* Border Curved Button */
.edu-btn.btn-border-curved {
	border-radius: 30px 5px;
	background-color: transparent;
	border: 1px solid var(--color-border, #e5e5e5);
	color: var(--color-white, #ffffff);
	padding: 0 25px;

	&::after {
		display: none;
	}

	&:hover {
		border-radius: 5px 30px;
		border-color: var(--color-primary, #1ab69d);
		color: var(--color-primary, #1ab69d);
	}
}

/* Curved Button */
.edu-btn.btn-curved {
	border-radius: 30px 5px;

	&::after {
		border-radius: 30px 5px;
	}

	&:hover {
		border-radius: 5px 30px;

		&::after {
			border-radius: 5px 30px;
		}
	}
}

/* Curved Medium */
.edu-btn.curved-medium {
	border-radius: 20px 5px;
	padding: 0 40px;

	&::after {
		border-radius: 20px 5px;
	}

	&:hover {
		border-radius: 5px 25px;

		&::after {
			border-radius: 5px 25px;
		}
	}
}

/* Round Button */
.edu-btn.btn-round {
	background-color: var(--color-white, #ffffff);
	color: var(--color-heading, #181818) !important;
	border-radius: 30px;

	&::after {
		border-radius: 30px;
	}

	&:hover {
		color: var(--color-white, #ffffff) !important;
	}
}

/* Gradient Button */
.edu-btn.btn-gradient {
	background: linear-gradient(
		-90deg,
		#31b978 0%,
		var(--color-primary, #1ab69d) 100%
	) !important;

	&::after {
		background: linear-gradient(
			-90deg,
			var(--color-primary, #1ab69d) 0%,
			#31b978 100%
		) !important;
	}
}

/* Transparent Button */
.edu-btn.btn-transparent {
	font-weight: 600;
	font-size: 18px;
	line-height: 28px;
	color: var(--color-textSecondary, #ff5b5c);
	background: transparent;
	padding: 0;
	height: auto;

	/* Animated Underline */
	&::after {
		position: absolute;
		content: "";
		left: auto;
		right: 0;
		bottom: 0;
		width: 0;
		height: 2px;
		background: var(--color-primary, #1ab69d);
		transition: 0.3s;
		border-radius: 0;
	}

	&:hover {
		color: var(--color-primary, #1ab69d);

		&::after {
			width: 100%;
			left: 0;
			right: auto;
		}
	}
}

/* ===========================
   Icon Positioning
   =========================== */
.edu-btn-icon {
	position: relative;
	font-size: 11px;
}

.edu-btn-icon-right {
	padding-left: 6px;
}

.edu-btn-icon-left {
	padding-right: 6px;
	padding-left: 0;
}

.edu-btn.left-icon {
	.edu-btn-icon {
		padding-left: 0;
		padding-right: 10px;
	}
}

/* ===========================
   Special States
   =========================== */

/* Block (Full Width) */
.edu-btn.btn-block {
	width: 100%;
	display: flex;
}

/* Fully Rounded */
.edu-btn.btn-rounded {
	border-radius: 50px;

	&::after {
		border-radius: 50px;
	}
}

/* Rectangular (No Border Radius) */
.edu-btn.btn-rectangular {
	border-radius: 0;

	&::after {
		border-radius: 0;
	}
}

/* Disabled State */
.edu-btn.btn-disabled {
	opacity: 0.6;
	cursor: not-allowed;
}

/* Loading State */
.edu-btn.btn-loading {
	cursor: wait;
	position: relative;
}

.edu-btn-spinner {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 16px;
	height: 16px;

	svg {
		width: 100%;
		height: 100%;
	}
}

@keyframes spin {
	to {
		transform: rotate(360deg);
	}
}

.animate-spin {
	animation: spin 1s linear infinite;
}

/* ===========================
   Dark Mode Support
   =========================== */
.dark-mode {
	.edu-btn.btn-border {
		color: var(--color-white, #ffffff);
	}

	.edu-btn:hover {
		color: var(--color-white, #ffffff);
	}

	.edu-btn.btn-transparent {
		color: var(--color-white, #ffffff);

		&:hover {
			color: var(--color-primary, #1ab69d);
		}
	}
}

.edu-btn-content {
	white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* ===========================
   RTL Support
   =========================== */
[dir="rtl"] {
	.edu-btn-icon-right {
		padding-left: 0;
		padding-right: 6px;
	}

	.edu-btn-icon-left {
		padding-right: 0;
		padding-left: 6px;
	}

	.edu-btn.left-icon .edu-btn-icon {
		padding-right: 0;
		padding-left: 10px;
	}

	.edu-btn.btn-large .edu-btn-icon-right {
		padding-left: 0;
		padding-right: 10px;
	}

	.edu-btn.btn-transparent::after {
		left: 0;
		right: auto;
	}

	.edu-btn.btn-transparent:hover::after {
		right: 0;
		left: auto;
	}
}
</style>
