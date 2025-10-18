<template>
	<component
		:is="componentTag"
		:to="to"
		:href="href"
		:type="computedType"
		:disabled="disabled"
		:class="buttonClasses"
		:aria-label="ariaLabel || 'Icon button'"
		@click="handleClick"
	>
		<i v-if="icon" :class="icon"></i>
		<slot></slot>
	</component>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from "vue-router";

export interface IconButtonProps {
	/** Button shape variant */
	variant?: "round" | "square" | "wishlist";
	/** Icon class name (e.g., 'icon-4', 'icon-22') */
	icon?: string;
	/** Route location for NuxtLink */
	to?: RouteLocationRaw;
	/** External URL */
	href?: string;
	/** Button type (when rendered as button element) */
	type?: "button" | "submit" | "reset";
	/** Disabled state */
	disabled?: boolean;
	/** Wishlist outline variant */
	outline?: boolean;
	/** Accessibility label (required for icon-only buttons) */
	ariaLabel?: string;
}

const props = withDefaults(defineProps<IconButtonProps>(), {
	variant: "round",
	type: "button",
	disabled: false,
	outline: false,
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
	const classes = [];

	// Variant classes
	if (props.variant === "round") classes.push("btn-icon-round");
	if (props.variant === "square") classes.push("btn-icon-squre");
	if (props.variant === "wishlist") {
		classes.push("wishlist-btn");
		if (props.outline) classes.push("btn-outline-dark");
	}

	// Disabled state
	if (props.disabled) classes.push("btn-disabled");

	return classes;
});

// Handle click events
const handleClick = (event: MouseEvent) => {
	if (!props.disabled) {
		emit("click", event);
	}
};
</script>

<style lang="scss" scoped>
/* ===========================
   Round Icon Button
   =========================== */
.btn-icon-round {
	text-align: center;
	height: 60px;
	width: 60px;
	line-height: 60px;
	background-color: var(--color-primary, #1ab69d);
	border-radius: 50%;
	color: var(--color-white, #ffffff);
	font-size: 12px;
	border: 0 none;
	cursor: pointer;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	transition: 0.3s;
	text-decoration: none;

	i {
		font-size: 12px;
		color: inherit;
	}

	&:hover:not(.btn-disabled) {
		color: var(--color-white, #ffffff);
		background-color: var(--color-secondary, #ee4a62);
	}

	/* Focus state for accessibility */
	&:focus-visible {
		outline: 2px solid var(--color-primary, #1ab69d);
		outline-offset: 2px;
	}
}

/* ===========================
   Square Icon Button
   =========================== */
.btn-icon-squre {
	text-align: center;
	height: 60px;
	width: 60px;
	line-height: 60px;
	background: linear-gradient(
		-90deg,
		#31b978 0%,
		var(--color-primary, #1ab69d) 100%
	);
	border-top-left-radius: 30px;
	border-top-right-radius: 30px;
	border-bottom-right-radius: 25px;
	border-bottom-left-radius: 5px;
	color: var(--color-white, #ffffff);
	font-size: 12px;
	border: 0 none;
	cursor: pointer;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	transition: var(--transition, 0.3s);
	text-decoration: none;

	i {
		font-size: 12px;
		color: inherit;
	}

	&:hover:not(.btn-disabled) {
		color: var(--color-white, #ffffff);
		background: var(--color-primary, #1ab69d);
	}

	/* Focus state for accessibility */
	&:focus-visible {
		outline: 2px solid var(--color-primary, #1ab69d);
		outline-offset: 2px;
	}
}

/* ===========================
   Wishlist Button
   =========================== */
.wishlist-btn {
	background: rgba(255, 255, 255, 0.15);
	width: 40px;
	height: 40px;
	line-height: 45px;
	text-align: center;
	border-radius: 50%;
	border: 0 none;
	cursor: pointer;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	transition: var(--transition, 0.3s);

	i {
		color: var(--color-white, #ffffff);
		font-size: 19px;
		transition: var(--transition, 0.3s);
	}

	&:hover:not(.btn-disabled) {
		background-color: var(--color-secondary, #ee4a62);
	}

	/* Focus state for accessibility */
	&:focus-visible {
		outline: 2px solid var(--color-white, #ffffff);
		outline-offset: 2px;
	}

	/* Dark Outline Variant */
	&.btn-outline-dark {
		height: 50px;
		width: 50px;
		line-height: 55px;
		border: 1px solid var(--color-border, #e5e5e5);
		background: transparent;
		color: var(--color-heading, #181818);
		pointer-events: all;

		i {
			color: var(--color-heading, #181818);
		}

		&:hover:not(.btn-disabled) {
			border-color: var(--color-secondary, #ee4a62);
			background-color: var(--color-secondary, #ee4a62);

			i {
				color: var(--color-white, #ffffff);
			}
		}
	}
}

/* ===========================
   Disabled State
   =========================== */
.btn-disabled {
	opacity: 0.6;
	cursor: not-allowed;
}

/* ===========================
   Dark Mode Support
   =========================== */
.dark-mode {
	.btn-icon-round {
		background-color: var(--color-primary, #1ab69d);

		&:hover {
			background-color: var(--color-secondary, #ee4a62);
		}
	}

	.wishlist-btn.btn-outline-dark {
		border-color: var(--dark-color-border, #282f3a);

		i {
			color: var(--dark-color-heading, #ffffff);
		}

		&:hover {
			border-color: var(--color-secondary, #ee4a62);
			background-color: var(--color-secondary, #ee4a62);

			i {
				color: var(--color-white, #ffffff);
			}
		}
	}
}

/* ===========================
   Responsive Design
   =========================== */
@media only screen and (max-width: 767px) {
	.btn-icon-round,
	.btn-icon-squre {
		height: 50px;
		width: 50px;
		line-height: 50px;
		font-size: 10px;

		i {
			font-size: 10px;
		}
	}

	.wishlist-btn {
		width: 36px;
		height: 36px;
		line-height: 40px;

		i {
			font-size: 16px;
		}

		&.btn-outline-dark {
			height: 45px;
			width: 45px;
			line-height: 50px;
		}
	}
}
</style>
