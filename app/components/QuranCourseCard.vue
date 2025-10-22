<template>
	<div class="edu-course course-style-3 course-style-21 group">
		<div class="inner">
			<!-- Thumbnail Section -->
			<div class="thumbnail">
				<NuxtLink :to="`/course-details/${course.id}`" class="thumbnail-link">
					<img :src="course.image" :alt="$t(course.titleKey)" loading="lazy" class="course-image" />
					<div class="image-overlay"></div>
				</NuxtLink>
			</div>

			<!-- Content Card (Overlapping Design) -->
			<div class="content">
				<!-- Floating Course Level Badge -->
				<span class="course-level">
					<img src="/img/islamic-shapes/decorative/quran-icon.png" alt="Quran Icon" />
				</span>

				<!-- Course Title -->
				<h5 class="title">
					<NuxtLink :to="`/course-details/${course.id}`">
						{{ $t(course.titleKey) }}
					</NuxtLink>
				</h5>

				<!-- Rating Section -->
				<div class="course-rating">
					<div class="rating">
						<i v-for="star in 5" :key="star" class="icon-23"></i>
					</div>
					<span class="rating-count">{{ course.rating }}</span>
				</div>

				<!-- Expandable Content Wrapper (Hidden by Default) -->
				<div class="content-wrap">
					<!-- Price -->
					<div class="course-price">{{ course.price }}</div>

					<!-- Description -->
					<p>{{ $t(course.descriptionKey) }}</p>

					<!-- Action Button -->
					<div class="read-more-btn">
						<NuxtLink :to="`/course-details/${course.id}`" class="edu-btn btn-medium">
							{{ $t("courseArea.enrollNow") }}
							<i class="icon-4"></i>
						</NuxtLink>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

// Course data interface with price
export interface QuranCourseData {
	id: number;
	titleKey: string;
	descriptionKey: string;
	categoryKey: string;
	modeKey: string;
	rating: string;
	price: string;
	image: string;
	categories?: string[];
}

// Props
interface Props {
	course: QuranCourseData;
}

defineProps<Props>();

// i18n
const { t: $t } = useI18n();
</script>

<style lang="scss" scoped>
// Main Course Card Wrapper
.course-style-21 {
	box-shadow: none;

	&::before {
		display: none;
	}

	.inner {
		height: 500px;
		position: relative;

		@media (max-width: 767px) {
			height: 100%;
		}
	}

	// Thumbnail Section
	.thumbnail {
		position: relative;
		overflow: hidden;

		.thumbnail-link {
			display: block;
			border-radius: 5px;
			position: relative;
			overflow: hidden;

			&::after {
				content: "";
				position: absolute;
				inset: 0;
				border-radius: 5px;
			}
		}

		.course-image {
			width: 100%;
			height: auto;
			display: block;
			border-radius: 5px;
			transition: transform 0.4s ease;
		}

		.image-overlay {
			position: absolute;
			inset: 0;
			background-color: rgba(0, 0, 0, 0);
			border-radius: 5px;
			transition: background-color 0.3s ease;
			pointer-events: none;
		}
	}

	// Content Card (Absolutely Positioned)
	.content {
		width: 310px;
		background-color: var(--color-white);
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		padding: 55px 20px 30px 30px;
		border-radius: 5px;
		margin: 0 auto;
		box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.1);
		transition: all 0.3s ease;

		@media (max-width: 767px) {
			width: 100%;
			padding: 55px 20px 55px 30px;
		}

		[dir="rtl"] & {
			padding: 55px 30px 30px 20px;

			@media (max-width: 767px) {
				padding: 55px 30px 55px 20px;
			}
		}

		// Floating Course Level Badge
		.course-level {
			width: 80px;
			height: 80px;
			background: linear-gradient(39.07deg, #1ab69d 14.65%, #31b978 85.16%);
			border-radius: 50%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			position: absolute;
			top: -40px;
			left: 30px;
			z-index: 1;
			padding: 12px;

			[dir="rtl"] & {
				left: auto;
				right: 30px;
			}

			img {
				width: 100%;
				height: 100%;
				object-fit: contain;
				filter: brightness(0) invert(1);
			}
		}

		// Title
		.title {
			font-size: 18px;
			font-weight: 600;
			line-height: 1.4;
			margin-bottom: 16px;
			color: var(--color-heading);

			@media (max-width: 1023px) {
				font-size: 17px;
				margin-bottom: 14px;
			}

			@media (max-width: 767px) {
				font-size: 16px;
				margin-bottom: 12px;
			}

			@media (max-width: 479px) {
				font-size: 15px;
				margin-bottom: 10px;
			}

			a {
				color: var(--color-heading);
				text-decoration: none;
				transition: color 0.3s ease;
				overflow: hidden;
				text-overflow: ellipsis;

				&:hover {
					color: var(--color-primary);
				}
			}
		}

		// Rating Section
		.course-rating {
			display: flex;
			align-items: center;
			gap: 8px;
			margin-top: -7px;
			margin-bottom: 0;

			.rating {
				display: flex;
				gap: 2px;
				color: #f8b81f;

				i {
					font-size: 14px;
				}
			}

			.rating-count {
				font-size: 14px;
				font-weight: 500;
				color: var(--color-heading);
			}
		}

		// Expandable Content Wrapper
		.content-wrap {
			transition: all 0.5s ease;
			opacity: 0;
			visibility: hidden;
			max-height: 0;
			overflow: hidden;

			.course-price {
				font-size: 18px;
				font-weight: 700;
				color: var(--color-secondary);
				margin-top: 5px;
				margin-bottom: -120px;
				visibility: hidden;
				opacity: 0;
				transition: all 0.5s ease;
			}

			p {
				font-size: 14px;
				line-height: 1.8;
				color: #666;
				margin-bottom: 0;
				visibility: hidden;
				opacity: 0;
				transition: all 0.5s ease;
				margin-bottom: 8px;
			}

			.read-more-btn {
				visibility: hidden;
				opacity: 0;
				transition: all 0.5s ease;

				.edu-btn {
					display: inline-flex;
					align-items: center;
					gap: 8px;
					height: 50px;
					line-height: 52px;
					padding: 0 30px;
					background-color: var(--color-secondary);
					color: var(--color-white);
					font-size: 14px;
					font-weight: 500;
					border-radius: 5px;
					text-decoration: none;
					transition: all 0.3s ease;

					&:hover {
						background-color: #d43d52;
						transform: translateY(-2px);
						box-shadow: 0 4px 12px rgba(238, 74, 98, 0.3);
					}

					i {
						font-size: 12px;
					}
				}
			}
		}
	}

	// Hover Effects
	&:hover {
		.thumbnail {
			margin-bottom: 0;

			.thumbnail-link {
				&::after {
					visibility: visible;
					opacity: 1;
				}
			}

			.course-image {
				transform: scale(1.1);
			}

			.image-overlay {
				background-color: rgba(0, 0, 0, 0.3);
			}
		}

		.content {
			.content-wrap {
				opacity: 1;
				visibility: visible;
				max-height: 300px;

				.course-price {
					margin-bottom: 10px;
					visibility: visible;
					opacity: 1;
				}

				p {
					visibility: visible;
					opacity: 1;
				}

				.read-more-btn {
					visibility: visible;
					opacity: 1;
				}
			}
		}
	}
}

// Base course styles
.edu-course {
	background-color: transparent;
	position: relative;
	z-index: 1;
	display: flex;
	flex-direction: column;
	height: 100%;
}

.thumbnail::after {
	content: "";
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	width: 100%;
	height: 100%;
	background: linear-gradient(39.07deg, rgba(26, 182, 157, 0.7) 14.65%, rgba(49, 185, 120, 0.7) 85.16%);
	border-radius: 5px;
	opacity: 0;
	visibility: hidden;
	transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
	pointer-events: none;
}

.edu-course:hover .thumbnail::after {
	opacity: 0.2;
	visibility: visible;
}
</style>
