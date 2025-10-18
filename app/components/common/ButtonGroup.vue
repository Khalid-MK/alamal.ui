<template>
	<div :class="groupClasses">
		<slot></slot>
	</div>
</template>

<script setup lang="ts">
export interface ButtonGroupProps {
	/** Layout direction */
	direction?: "horizontal" | "vertical";
	/** Alignment of buttons */
	align?: "start" | "center" | "end" | "stretch";
	/** Justify content */
	justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
	/** Gap size between buttons */
	gap?: "small" | "medium" | "large" | "none";
	/** Make buttons full width */
	block?: boolean;
	/** Wrap buttons on smaller screens */
	wrap?: boolean;
}

const props = withDefaults(defineProps<ButtonGroupProps>(), {
	direction: "horizontal",
	align: "center",
	justify: "start",
	gap: "medium",
	block: false,
	wrap: false,
});

// Build CSS classes
const groupClasses = computed(() => {
	const classes = ["button-group"];

	// Direction
	if (props.direction === "vertical") classes.push("button-group-vertical");

	// Alignment
	if (props.align === "start") classes.push("align-start");
	if (props.align === "center") classes.push("align-center");
	if (props.align === "end") classes.push("align-end");
	if (props.align === "stretch") classes.push("align-stretch");

	// Justify
	if (props.justify === "start") classes.push("justify-start");
	if (props.justify === "center") classes.push("justify-center");
	if (props.justify === "end") classes.push("justify-end");
	if (props.justify === "between") classes.push("justify-between");
	if (props.justify === "around") classes.push("justify-around");
	if (props.justify === "evenly") classes.push("justify-evenly");

	// Gap
	if (props.gap === "small") classes.push("gap-small");
	if (props.gap === "medium") classes.push("gap-medium");
	if (props.gap === "large") classes.push("gap-large");
	if (props.gap === "none") classes.push("gap-none");

	// Block
	if (props.block) classes.push("button-group-block");

	// Wrap
	if (props.wrap) classes.push("button-group-wrap");

	return classes;
});
</script>

<style lang="scss" scoped>
/* ===========================
   Base Button Group
   =========================== */
.button-group {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
}

/* ===========================
   Direction
   =========================== */
.button-group-vertical {
	flex-direction: column;
}

/* ===========================
   Alignment
   =========================== */
.button-group.align-start {
	align-items: flex-start;
}

.button-group.align-center {
	align-items: center;
}

.button-group.align-end {
	align-items: flex-end;
}

.button-group.align-stretch {
	align-items: stretch;

	:deep(.edu-btn),
	:deep(.btn-icon-round),
	:deep(.btn-icon-squre),
	:deep(.wishlist-btn) {
		width: 100%;
	}
}

/* ===========================
   Justify Content
   =========================== */
.button-group.justify-start {
	justify-content: flex-start;
}

.button-group.justify-center {
	justify-content: center;
}

.button-group.justify-end {
	justify-content: flex-end;
}

.button-group.justify-between {
	justify-content: space-between;
}

.button-group.justify-around {
	justify-content: space-around;
}

.button-group.justify-evenly {
	justify-content: space-evenly;
}

/* ===========================
   Gap Sizes
   =========================== */
.button-group.gap-none {
	gap: 0;
}

.button-group.gap-small {
	gap: 8px;
}

.button-group.gap-medium {
	gap: 16px;
}

.button-group.gap-large {
	gap: 24px;
}

/* ===========================
   Block (Full Width)
   =========================== */
.button-group-block {
	width: 100%;

	:deep(.edu-btn),
	:deep(.btn-icon-round),
	:deep(.btn-icon-squre),
	:deep(.wishlist-btn) {
		flex: 1;
	}
}

/* ===========================
   Wrap
   =========================== */
.button-group-wrap {
	flex-wrap: wrap;
}

/* ===========================
   Responsive Design
   =========================== */
@media only screen and (max-width: 767px) {
	.button-group {
		/* Auto-wrap on mobile unless explicitly disabled */
		flex-wrap: wrap;
	}

	.button-group.gap-medium {
		gap: 12px;
	}

	.button-group.gap-large {
		gap: 16px;
	}
}

/* ===========================
   Dark Mode Support
   =========================== */
.dark-mode {
	.button-group {
		/* Inherit dark mode styles from button components */
	}
}
</style>
