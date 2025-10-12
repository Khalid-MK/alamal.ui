<script setup>
import { computed } from "vue";

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

const defaultSocialLinks = [
	{
		id: "facebook",
		url: "#",
		iconClass: "fab fa-facebook-f",
		label: "Facebook",
		platformClass: "facebook",
	},
	{
		id: "twitter",
		url: "#",
		iconClass: "fab fa-twitter",
		label: "Twitter",
		platformClass: "twitter",
	},
	{
		id: "linkedin",
		url: "#",
		iconClass: "fab fa-linkedin-in",
		label: "LinkedIn",
		platformClass: "linkedin",
	},
	{
		id: "youtube",
		url: "#",
		iconClass: "fab fa-youtube",
		label: "YouTube",
		platformClass: "youtube",
	},
];

const socialLinks = computed(() => {
	const socials = Array.isArray(props.courseItems?.instructorSocials)
		? props.courseItems.instructorSocials
			.map((item, index) => {
				if (!item) {
					return null;
				}

				if (typeof item === "string") {
					return {
						id: `custom-${index}`,
						url: "#",
						iconClass: item,
						label: "Social link",
						platformClass: "custom",
					};
				}

				if (typeof item === "object") {
					const iconClass = item.iconClass || item.icon || "";
					if (!iconClass) {
						return null;
					}

					return {
						id: item.id || item.platform || `custom-${index}`,
						url: item.url || item.href || "#",
						iconClass,
						label: item.label || item.platform || "Social link",
						platformClass: item.platformClass || item.platform || "custom",
					};
				}

				return null;
			})
			.filter(Boolean)
		: [];

	return socials.length ? socials : defaultSocialLinks;
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
				<span class="instructors-subtitle">{{ props.courseItems.instructorTitle || "Data Scientist, BDevs Ltd."
				}}</span>
				<div class="instructors-footer">
					<div class="instructors-meta">
						<i class="fa-solid fa-desktop"></i>
						<span>{{ props.courseItems.instructorCourses || "3 Courses" }}</span>
					</div>
					<div class="instructors-meta">
						<i class="fa-solid fa-people-group"></i>
						<span>{{ props.courseItems.instructorStudents || "78,742 Students" }}</span>
					</div>
				</div>
				<div class="instructors-social" v-if="socialLinks.length">
					<div class="social-share-buttons">
						<a v-for="link in socialLinks" :key="link.id" :href="link.url" class="social-btn"
							:class="link.platformClass" target="_blank" rel="noopener noreferrer" :aria-label="`Visit ${link.label}`">
							<i :class="link.iconClass"></i>
						</a>
					</div>
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

<style scoped lang="scss">
.course-instructors {
	padding: 32px 36px;
	background-color: #ffffff;
	border: 1px solid #e6ecf5;
	border-radius: 10px;
}

.instructors-subtitle {
	display: block;
	font-size: 14px;
	color: #475467;
	margin-bottom: 10px;
}

.instructors-heading {
	display: flex;
	align-items: flex-start;
	gap: 24px;
	margin-bottom: 20px;
	flex-wrap: wrap;
}

.instructors-img {
	width: 124px;
	flex-shrink: 0;
	border-radius: 4px;
	overflow: hidden;
	box-shadow: 0 8px 24px rgba(19, 33, 68, 0.08);

	img {
		display: block;
		width: 100%;
		height: auto;
		object-fit: cover;
	}
}

.instructors-body {
	flex: 1;
}

.instructors-footer {
	display: flex;
	flex-wrap: wrap;
	gap: 12px 28px;
	margin-top: 12px;
}

.instructors-meta {
	display: flex;
	align-items: center;
	gap: 8px;
	color: #475467;

	i {
		color: #2467ec;
	}
}

.instructors-social {
	margin-top: 18px;
}

.social-share-buttons {
	display: flex;
	gap: 10px;
}

.social-btn {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 40px;
	height: 40px;
	border-radius: 5px;
	background-color: #f5f5f5;
	color: #666;
	text-decoration: none;
	transition: all 0.3s ease;
	font-size: 16px;

	&:hover {
		color: #ffffff;
		transform: translateY(-2px);
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
	}

	&.facebook:hover {
		background-color: #3b5998;
		border-color: #3b5998;
	}

	&.twitter:hover {
		background-color: #1da1f2;
		border-color: #1da1f2;
	}

	&.linkedin:hover {
		background-color: #0077b5;
		border-color: #0077b5;
	}

	&.youtube:hover {
		background-color: #ff0000;
		border-color: #ff0000;
	}
}

.intructors-content {
	margin-top: 18px;
	color: #4a4f5c;
	line-height: 1.7;
}

@media (max-width: 575px) {
	.course-instructors {
		padding: 28px 24px;
	}

	.instructors-heading {
		gap: 18px;
	}

	.instructors-img {
		width: 108px;
	}
}
</style>
