<template>
	<div class="edu-course course-style-3 group">
		<div class="course-inner">
			<!-- Bottom Shadow Effect -->
			<div class="course-shadow"></div>

			<!-- Thumbnail -->
			<div class="thumbnail">
				<NuxtLink :to="`/course-details/${course.id}`">
					<img :src="course.image" :alt="$t(course.titleKey)" loading="lazy" class="course-image" />
					<div class="image-overlay"></div>
				</NuxtLink>
				<div class="time-top">
					<span class="duration">
						<i class="icon-61"></i>
						{{ $t(course.modeKey) }}
					</span>
				</div>
			</div>

			<!-- Content -->
			<div class="content">
				<span class="course-level">{{ $t(course.categoryKey) }}</span>
				<h5 class="course-title">
					<NuxtLink :to="`/course-details/${course.id}`">
						{{ $t(course.titleKey) }}
					</NuxtLink>
				</h5>
				<p class="course-description">
					{{ $t(course.descriptionKey) }}
				</p>

				<!-- Rating -->
				<div class="course-rating">
					<div class="rating">
						<i v-for="star in 5" :key="star" class="icon-23"></i>
					</div>
					<span class="rating-count">{{ course.rating }}</span>
				</div>

				<!-- Learn More Button (Hidden by default, shown on hover) -->
				<div class="read-more-btn">
					<NuxtLink :to="`/course-details/${course.id}`" class="edu-btn btn-small btn-secondary">
						{{ $t("courseArea.learnMore") }}
						<i class="icon-4"></i>
					</NuxtLink>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

// Course data interface
export interface CourseData {
	id: number;
	titleKey: string;
	descriptionKey: string;
	categoryKey: string;
	modeKey: string;
	rating: string;
	image: string;
	categories?: string[];
}

// Props
interface Props {
	course: CourseData;
}

defineProps<Props>();

// i18n
const { t: $t } = useI18n();
</script>

<style lang="scss" scoped>
// Course Card - Style 3
.course-style-3 {
	background-color: transparent;
	padding-bottom: 5px;
	position: relative;
	z-index: 1;
	display: flex;
	flex-direction: column;
	height: 100%;

	.course-inner {
		position: relative;
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	// Bottom shadow effect
	.course-shadow {
		content: "";
		height: 10px;
		width: 100%;
		background-color: var(--color-white);
		border-radius: 0 0 4px 4px;
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: -1;
		transition: background-color 0.3s ease;
	}

	.thumbnail {
		position: relative;
		overflow: hidden;
		border-radius: 10px 10px 0 0;
		transition: margin-bottom 0.3s ease;
		aspect-ratio: 16 / 10;

		.course-image {
			width: 100%;
			height: 100%;
			object-fit: cover;
			display: block;
			border-radius: 10px 10px 0 0;
			transition: transform 0.4s ease;
		}

		.image-overlay {
			position: absolute;
			inset: 0;
			background-color: rgba(0, 0, 0, 0.2);
			border-radius: 10px 10px 0 0;
			transition: background-color 0.3s ease;
		}

		.time-top {
			position: absolute;
			top: 10px;
			left: 10px;
			z-index: 2;

			[dir="rtl"] & {
				left: auto;
				right: 10px;
			}

			.duration {
				display: inline-flex;
				align-items: center;
				gap: 6px;
				padding: 4px 8px;
				background-color: #f8b81f;
				color: var(--color-white);
				font-size: 12px;
				font-weight: 500;
				border-radius: 3px;

				i {
					font-size: 14px;
				}
			}
		}
	}

	.content {
		padding: 30px;
		background-color: var(--color-white);
		border-radius: 0 0 4px 4px;
		position: relative;
		transition: all 0.3s ease;
		display: flex;
		flex-direction: column;
		flex-grow: 1;

		.course-level {
			display: inline-block;
			padding: 4px 12px;
			color: var(--color-secondary);
			background-color: rgba(238, 74, 98, 0.15);
			font-size: 12px;
			font-weight: 500;
			border-radius: 3px;
			margin-bottom: 17px;
			width: fit-content;

			@media (max-width: 767px) {
				font-size: 11px;
				padding: 3px 10px;
				margin-bottom: 14px;
			}
		}

		.course-title {
			font-size: 20px;
			font-weight: 700;
			margin-bottom: 14px;
			line-height: 1.4;

			@media (max-width: 1023px) {
				font-size: 18px;
				margin-bottom: 12px;
			}

			@media (max-width: 767px) {
				font-size: 16px;
				margin-bottom: 10px;
			}

			@media (max-width: 479px) {
				font-size: 15px;
				margin-bottom: 8px;
			}

			a {
				color: var(--color-heading);
				transition: color 0.3s ease;
				text-decoration: none;

				&:hover {
					color: var(--color-primary);
				}
			}
		}

		.course-description {
			font-size: 14px;
			line-height: 1.8;
			color: #666;
			margin-bottom: 20px;
			flex-grow: 1;

			@media (max-width: 767px) {
				font-size: 13px;
				line-height: 1.7;
				margin-bottom: 16px;
			}

			@media (max-width: 479px) {
				font-size: 12px;
				line-height: 1.6;
				margin-bottom: 14px;
			}
		}

		.course-rating {
			display: flex;
			align-items: center;
			gap: 12px;
			margin-bottom: 0;

			@media (max-width: 479px) {
				gap: 8px;
			}

			.rating {
				display: flex;
				color: #f8b81f;

				i {
					font-size: 14px;

					@media (max-width: 767px) {
						font-size: 13px;
					}

					@media (max-width: 479px) {
						font-size: 12px;
					}
				}
			}

			.rating-count {
				font-size: 14px;
				font-weight: 500;
				color: var(--color-heading);

				@media (max-width: 767px) {
					font-size: 13px;
				}

				@media (max-width: 479px) {
					font-size: 12px;
				}
			}
		}

		// Hidden button by default
		.read-more-btn {
			visibility: hidden;
			opacity: 0;
			margin-bottom: -50px;
			transition: all 0.3s ease;

			.edu-btn {
				display: inline-flex;
				align-items: center;
				gap: 8px;
				padding: 12px 24px;
				background-color: var(--color-secondary);
				color: var(--color-white);
				font-size: 14px;
				font-weight: 500;
				border-radius: 4px;
				text-decoration: none;
				transition: background-color 0.3s ease;

				&:hover {
					background-color: #d43d52;
				}

				i {
					font-size: 12px;
				}
			}
		}
	}

	// Hover Effects
	&:hover {
		.course-shadow {
			background-color: rgba(255, 91, 92, 0.3);
		}

		.thumbnail {
			margin-bottom: -75px;

			.course-image {
				transform: scale(1.1);
			}

			.image-overlay {
				background-color: rgba(0, 0, 0, 0.5);
			}
		}

		.content {
			.read-more-btn {
				margin-top: 24px;
				margin-bottom: 0;
				visibility: visible;
				opacity: 1;
			}
		}
	}
}
</style>
