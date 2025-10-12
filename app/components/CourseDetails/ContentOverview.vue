<script setup>
const props = defineProps({
	overviewParagraphs: {
		type: Array,
		default: () => [],
	},
	learningItems: {
		type: Array,
		default: () => [],
	},
});
</script>

<template>
	<div>
		<div class="course-description pt-45 pb-30">
			<div class="course-Description">
				<h4>Course Description</h4>
			</div>
			<p v-for="(paragraph, index) in props.overviewParagraphs" :key="`overview-${index}`">
				{{ paragraph }}
			</p>
		</div>
		<div class="course-learn-wrapper">
			<div class="course-learn">
				<h4 class="course-learn-heading">What You'll Learn?</h4>
				<ul class="course-learn-list">
					<li v-for="(item, index) in props.learningItems" :key="`learn-${index}`">
						<span class="course-learn-check"><i class="fa-solid fa-check"></i></span>
						<span class="course-learn-text">{{ item }}</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.course-learn-wrapper {
	margin-top: 36px;
	padding: 28px;
}

.course-learn-heading {
	margin-bottom: 18px;
	color: #0c1427;
}

.course-learn-list {
	margin: 0;
	padding: 0;
	list-style: none;
	display: grid;
	gap: 14px;
}

.course-learn-list li {
	display: flex;
	align-items: flex-start;
	gap: 12px;
}

.course-learn-check {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	margin-top: 2px;
	width: 20px;
	height: 20px;
	border-radius: 50%;
	background-color: #2467ec;
	color: #fff;
	font-size: 10px;
	flex-shrink: 0;
}

.course-learn-text {
	color: #2d2d2d;
	line-height: 1.6;
}
</style>
