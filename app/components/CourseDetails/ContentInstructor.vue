<script setup>
const props = defineProps({
	courseItems: {
		type: Object,
		default: () => ({}),
	},
	courseInstructorsImage: {
		type: String,
		default: "",
	},
	defaultInstructorBio: {
		type: String,
		default: "",
	},
});
</script>

<template>
	<div class="course-instructors">
		<h3>Instructor</h3>
		<div class="instructors-heading">
			<div class="instructors-img w-img">
				<NuxtLink to="/instructor"><img :src="props.courseInstructorsImage" alt="image not found"></NuxtLink>
			</div>
			<div class="instructors-body">
				<h5>
					<NuxtLink to="/instructor">{{ props.courseItems.instructor || "David Allberto" }}</NuxtLink>
				</h5>
				<span>{{ props.courseItems.instructorTitle || "Data Scientist, BDevs Ltd." }}</span>
				<div class="intructors-review">
					<i class="fas fa-star"></i>
					<span>{{ props.courseItems.instructorRating || "4.7 (54 reviews)" }}</span>
				</div>
				<div class="instructors-footer">
					<i class="fas fa-desktop"></i>
					<span>{{ props.courseItems.instructorCourses || "3 Courses" }}</span>
					<i class="far fa-user-friends"></i>
					<span>{{ props.courseItems.instructorStudents || "78,742 Students" }}</span>
				</div>
			</div>
		</div>
		<div class="intructors-content">
			<p>
				{{
					props.courseItems.instructorBio || props.defaultInstructorBio
				}}
			</p>
		</div>
	</div>
</template>
