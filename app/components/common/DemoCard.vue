<template>
	<div class="demo-card">
		<div class="demo-card-header">
			<h3 class="demo-card-title">{{ title }}</h3>
			<button v-if="showCode && code" @click="copyCode" class="copy-button" :title="copied ? 'Copied!' : 'Copy code'">
				<span v-if="!copied">📋</span>
				<span v-else>✓</span>
			</button>
		</div>
		<div class="demo-card-preview">
			<slot></slot>
		</div>
		<div v-if="showCode && code" class="demo-card-code">
			<pre><code>{{ code }}</code></pre>
		</div>
	</div>
</template>

<script setup lang="ts">
export interface DemoCardProps {
	/** Card title */
	title: string;
	/** Whether to show code snippet */
	showCode?: boolean;
	/** Code snippet to display */
	code?: string;
}

const props = defineProps<DemoCardProps>();

const copied = ref(false);

const copyCode = async () => {
	if (!props.code) return;

	try {
		await navigator.clipboard.writeText(props.code);
		copied.value = true;
		setTimeout(() => {
			copied.value = false;
		}, 2000);
	} catch (err) {
		console.error("Failed to copy code:", err);
	}
};
</script>

<style lang="scss" scoped>
.demo-card {
	background: white;
	border-radius: 10px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
	overflow: hidden;
	transition: 0.3s;

	&:hover {
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
		transform: translateY(-2px);
	}
}

.demo-card-header {
	padding: 16px;
	background: var(--bg-color, #EAF0F2);
	border-bottom: 1px solid var(--color-border, #e5e5e5);
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.demo-card-title {
	font-size: 16px;
	font-weight: 600;
	color: var(--color-heading, #181818);
	margin: 0;
}

.copy-button {
	background: var(--color-primary, #1ab69d);
	color: white;
	border: none;
	padding: 6px 12px;
	border-radius: 4px;
	cursor: pointer;
	font-size: 14px;
	transition: 0.3s;
	display: flex;
	align-items: center;
	gap: 4px;

	&:hover {
		background: #139a83;
	}

	span {
		font-size: 16px;
	}
}

.demo-card-preview {
	padding: 32px 16px;
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 120px;
	background: white;
}

.demo-card-code {
	padding: 16px;
	background: var(--color-heading, #181818);
	border-top: 1px solid var(--color-border, #e5e5e5);

	pre {
		margin: 0;
		overflow-x: auto;

		code {
			color: #fff;
			font-size: 13px;
			line-height: 1.6;
			font-family: "Monaco", "Courier New", monospace;
		}
	}
}

/* Dark Mode */
.dark-mode {
	.demo-card {
		background: var(--dark-color-bg-body, #111822);
		border: 1px solid var(--dark-color-border, #282f3a);
	}

	.demo-card-header {
		background: rgba(40, 47, 58, 0.5);
		border-bottom-color: var(--dark-color-border, #282f3a);
	}

	.demo-card-title {
		color: var(--dark-color-heading, #ffffff);
	}

	.demo-card-preview {
		background: var(--dark-color-bg-body, #111822);
	}

	.demo-card-code {
		background: var(--dark-bg-color, #020b17);
		border-top-color: var(--dark-color-border, #282f3a);
	}
}
</style>
