<template>
	<div :dir="direction" class="slider-six">
		<div
			class="slider-six__mosque"
			style="
				background-image: url('/img/bg/mosque-1.png');
			"
		></div>
		<div
			class="slider-six__bg"
			style="
				background-image: url('/img/bg/9.jpg');
			"
		></div>

		<!-- Islamic Floating Shapes -->
		<!-- Islamic Lamp (Top Left) -->
		<div
			class="slider-six_islamic-lamp"
			style="background-image: url('/img/islamic-shapes/banner/lamp-shape.png');"
		></div>

		<!-- Crescent Moon (Spinning) -->
		<div
			class="slider-six_moon"
			style="background-image: url('/img/islamic-shapes/banner/moon-shape.png');"
		></div>

		<!-- Quran Calligraphy (Floating) -->
		<div
			class="slider-six_quran"
			style="background-image: url('/img/islamic-shapes/decorative/vector-9.png');"
		></div>

		<!-- Islamic Art Pattern -->
		<div
			class="slider-six_art"
			style="background-image: url('/img/islamic-shapes/banner/art-shape-1.png');"
		></div>

		<!-- Quran Learning Symbol -->
		<div
			class="slider-six_learning"
			style="background-image: url('/img/islamic-shapes/decorative/vector-8.png');"
		></div>
		<div
			class="slider-six_shadow"
			style="
				background-image: url('https://themazine.com/newwp/alquran/wp-content/uploads/2025/07/banner-shadow-1.png');
			"
		></div>
		<div
			class="slider-six_shadow-two"
			style="
				background-image: url('https://themazine.com/newwp/alquran/wp-content/uploads/2025/07/banner-shadow-2.png');
			"
		></div>
		<div
			class="slider-six_shadow-three"
			style="
				background-image: url('https://themazine.com/newwp/alquran/wp-content/uploads/2025/07/banner-shadow-3.png');
			"
		></div>
		<swiper-container ref="containerRef" class="swiperContainer" :init="false">
			<swiper-slide
				class="slide-content"
				v-for="(slide, idx) in slides"
				:key="idx"
			>
				<div class="max-w-7xl mx-auto content-wrapper">
					<div class="text-content">
						<h1 class="slider-six_title">
							{{ slide.title }}
						</h1>

						<div class="slider-six_text">
							<span class="text-icon">
								<img
									decoding="async"
									src="https://themazine.com/newwp/alquran/wp-content/uploads/2025/07/slider-img.png"
									alt="Alquran"
								/>
							</span>
							<p>{{ slide.desc }}</p>
						</div>

					<div class="slider-six_button">
						<div class="curved-button-wrapper">
							<svg class="curved-text" viewBox="0 0 200 200">
								<defs>
									<path
										id="circlePath"
										d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
									/>
								</defs>
								<text class="curved-text-path">
									<textPath href="#circlePath" startOffset="50%" text-anchor="middle">
										{{ $t("CheckOutMore") }}
									</textPath>
								</text>
							</svg>
							<IconButton variant="round" icon="icon-4" :aria-label="$t('CheckOutMore')" />
						</div>
					</div>
					</div>

					<div class="slider-six_images-column">
						<div class="slider-six_images-outer">
							<div class="image">
								<img decoding="async" :src="slide.imgSrc" alt="Alquran" />
							</div>
						</div>
						<div class="slider-six_courses">
							<div class="slider-six_courses-inner">
								<span>
									<img
										decoding="async"
										src="https://themazine.com/newwp/alquran/wp-content/uploads/2025/07/book.svg"
										alt="Alquran"
									/>
								</span>
								<div class="alquran-counter">10k+</div>
								<i class="alquran-desc">Online Courses</i>
							</div>
						</div>
					</div>
				</div>
			</swiper-slide>
		</swiper-container>
		<AudioPlayer />
	</div>
</template>

<script setup lang="ts">
import slidesData from "~/constant/SliderData";
import AudioPlayer from "../AudioPlayer.vue";
import IconButton from "~/components/common/IconButton.vue";

// Get locale
const { locale, localeProperties } = useI18n();

// Direction
const direction = computed(() => localeProperties.value.dir);

const slides = computed(() => slidesData.messages[locale.value].slides);
const containerRef = ref(null);
const swiper = useSwiper(containerRef, {
	effect: "slide",
	loop: true,
	autoplay: {
		delay: 10000,
	},
});

onMounted(() => {
	console.log(swiper.instance);
});
</script>

<style lang="scss" scoped>
[dir="rtl"] .slider-six_title,
[dir="rtl"] .slider-six_text {
	text-align: right;
}

.slider-six {
	position: relative;
	z-index: 11;
	overflow: visible;
	margin: 40px;
	border-radius: 40px;

	@media (max-width: 890px) {
		margin: 20px;
		margin-bottom: 60px;
	}

	@media (max-width: 430px) {
		margin: 0;
		border-radius: 0;
	}

	// Background layers slider-six__bg
	&__bg {
		position: absolute;
		inset: 0;
		background-size: cover;
		background-position: center;
		z-index: 1;
		border-radius: inherit;
	}

	&__mosque {
		position: absolute;
		inset: 0;
		background-repeat: repeat-x;
		background-size: contain;
		background-position: bottom;
		opacity: 0.3;
		z-index: 2;
		animation: move-mosque 70s linear infinite;
		border-radius: inherit;
	}

	// Shadow layers
	.slider-six_shadow {
		position: absolute;
		inset: 0;
		background-size: cover;
		background-position: left;
		z-index: 2;
	}

	.slider-six_shadow-two {
		position: absolute;
		inset: 0;
		background-size: cover;
		background-position: left;
	}

	.slider-six_shadow-three {
		position: absolute;
		inset: 0;
		background-position: right;
		background-repeat: no-repeat;
	}

	// Islamic Floating Shapes - Desktop first
	// Islamic Lamp (Top Left)
	.slider-six_islamic-lamp {
		position: absolute;
		left: -60px;
		top: -40px;
		width: 140px;
		height: 140px;
		z-index: 1;
		background-repeat: no-repeat;
		background-size: contain;
		animation: pulse 3s ease-in-out infinite;

		@media (max-width: 1023px) {
			left: 20px;
			top: 20px;
			width: 100px;
			height: 100px;
		}

		@media (max-width: 767px) {
			left: 10px;
			top: 30px;
			width: 70px;
			height: 70px;
		}
	}

	// Crescent Moon (Spinning)
	.slider-six_moon {
		position: absolute;
		left: 50px;
		top: 60px;
		width: 90px;
		height: 90px;
		z-index: 1;
		background-repeat: no-repeat;
		background-size: contain;
		animation: spin 30s linear infinite;

		[dir="rtl"] & {
			left: auto;
			right: 50px;
		}

		@media (max-width: 1023px) {
			left: 40px;
			top: 70px;
			width: 70px;
			height: 70px;

			[dir="rtl"] & {
				left: auto;
				right: 40px;
			}
		}

		@media (max-width: 767px) {
			left: 20px;
			top: 60px;
			width: 50px;
			height: 50px;

			[dir="rtl"] & {
				left: auto;
				right: 20px;
			}
		}
	}

	// Quran Calligraphy (Floating)
	.slider-six_quran {
		position: absolute;
		z-index: 1;
		right: 8%;
		top: 15%;
		width: 110px;
		height: 110px;
		background-repeat: no-repeat;
		background-size: contain;
		animation: moveUpDown 4s infinite;

		[dir="rtl"] & {
			right: auto;
			left: 8%;
		}

		@media (max-width: 1023px) {
			right: 60px;
			top: 70px;
			width: 85px;
			height: 85px;

			[dir="rtl"] & {
				right: auto;
				left: 60px;
			}
		}

		@media (max-width: 767px) {
			right: 30px;
			top: 50px;
			width: 60px;
			height: 60px;

			[dir="rtl"] & {
				right: auto;
				left: 30px;
			}
		}
	}

	// Islamic Art Pattern
	.slider-six_art {
		position: absolute;
		z-index: 1;
		right: 15%;
		bottom: 20%;
		width: 100px;
		height: 100px;
		background-repeat: no-repeat;
		background-size: contain;
		animation: floatRotate 6s ease-in-out infinite;

		[dir="rtl"] & {
			right: auto;
			left: 15%;
		}

		@media (max-width: 1023px) {
			right: 10%;
			bottom: 25%;
			width: 75px;
			height: 75px;

			[dir="rtl"] & {
				right: auto;
				left: 10%;
			}
		}

		@media (max-width: 767px) {
			display: none;
		}
	}

	// Quran Learning Symbol
	.slider-six_learning {
		position: absolute;
		z-index: 1;
		left: 10%;
		bottom: 15%;
		width: 95px;
		height: 95px;
		background-repeat: no-repeat;
		background-size: contain;
		animation: bounce 3s ease-in-out infinite;

		[dir="rtl"] & {
			left: auto;
			right: 10%;
		}

		@media (max-width: 1023px) {
			left: 5%;
			bottom: 20%;
			width: 70px;
			height: 70px;

			[dir="rtl"] & {
				left: auto;
				right: 5%;
			}
		}

		@media (max-width: 767px) {
			display: none;
		}
	}

	// Swiper container - Desktop first
	.swiperContainer {
		position: relative;
		z-index: 11;
		padding: 80px 60px;

		@media (max-width: 1279px) {
			padding: 60px 50px;
		}

		@media (max-width: 1023px) {
			padding: 50px 40px;
		}

		@media (max-width: 767px) {
			padding: 40px 30px;
		}

		@media (max-width: 639px) {
			padding: 30px 20px;
		}
	}

	// Slide content
	.slide-content {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.content-wrapper {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		gap: 80px;
		padding: 0 5px;
		width: 100%;

		@media (max-width: 1279px) {
			gap: 60px;
		}

		@media (max-width: 1023px) {
			flex-direction: column;
			gap: 40px;
		}
	}

	.text-content {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		text-align: left;
		gap: 64px;
		flex: 1;

		@media (max-width: 1023px) {
			align-items: center;
			text-align: center;
			gap: 25px;
		}
	}

	.slider-six_title {
		font-size: 64px;
		font-weight: bold;
		color: #1a1a1a;
		line-height: 1.2;
		margin: 0;

		@media (max-width: 1441px) {
			font-size: 60px;
		}

		@media (max-width: 1279px) {
			font-size: 54px;
		}

		@media (max-width: 1023px) {
			font-size: 48px;
		}

		@media (max-width: 767px) {
			font-size: 42px;
		}

		@media (max-width: 639px) {
			font-size: 36px;
		}

		@media (max-width: 479px) {
			font-size: 28px;
		}
	}

	.slider-six_text {
		display: flex;
		align-items: flex-start;
		gap: 15px;
		max-width: 600px;
		line-height: 30px;
		font-weight: 400;
		color: #585956;
		font-size: 25px;

		@media (max-width: 1023px) {
			font-size: 16px;
			line-height: 1.9;
		}

		@media (max-width: 767px) {
			font-size: 15px;
			line-height: 1.8;
		}

		@media (max-width: 639px) {
			font-size: 14px;
			line-height: 1.7;
		}

		.text-icon {
			flex-shrink: 0;
			display: flex;
			align-items: center;
			margin-top: 4px;

			img {
				width: 100px;

				@media (max-width: 767px) {
					width: 70px;
				}

				@media (max-width: 650px) {
					width: 50px;
				}
			}
		}

		p {
			margin: 0;
			flex: 1;
		}
	}

	.slider-six_button {
		display: flex;
		align-items: center;
		justify-content: center;

		.curved-button-wrapper {
			position: relative;
			width: 160px;
			height: 160px;
			display: flex;
			align-items: center;
			justify-content: center;

			@media (min-width: 1441px) {
				width: 200px;
				height: 200px;
			}

			@media (max-width: 767px) {
				width: 140px;
				height: 140px;
			}

			.curved-text {
				position: absolute;
				width: 100%;
				height: 100%;
				top: 0;
				left: 0;
				pointer-events: none;
				animation: rotate 20s linear infinite;

				.curved-text-path {
					fill: #1a1a1a;
					font-size: 14px;
					font-weight: 600;
					letter-spacing: 2px;
					text-transform: uppercase;

					@media (min-width: 1441px) {
						font-size: 16px;
						letter-spacing: 3px;
					}

					@media (max-width: 767px) {
						font-size: 12px;
						letter-spacing: 1.5px;
					}
				}
			}

			:deep(.btn-icon-round) {
				box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
				height: 70px;
				width: 70px;
				position: relative;
				z-index: 2;

				@media (min-width: 1441px) {
					height: 90px;
					width: 90px;
				}

				@media (max-width: 767px) {
					height: 60px;
					width: 60px;
				}

				i {
					font-size: 18px;

					@media (min-width: 1441px) {
						font-size: 22px;
					}

					@media (max-width: 767px) {
						font-size: 16px;
					}
				}
			}
		}
	}

	@keyframes rotate {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	// Images column - Desktop first
	.slider-six_images-column {
		flex: 1;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		width: 100%;

		@media (max-width: 1023px) {
			justify-content: center;
			max-width: 400px;
		}
	}

	.slider-six_images-outer {
		position: relative;
		width: 100%;
		max-width: 600px;

		@media (max-width: 1279px) {
			max-width: 380px;
		}

		@media (max-width: 1023px) {
			max-width: 360px;
		}

		@media (max-width: 639px) {
			max-width: 320px;
		}

		@media (max-width: 479px) {
			max-width: 280px;
		}

		.image {
			width: 100%;

			img {
				width: 100%;
				height: auto;
				display: block;
				filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.2));
			}
		}
	}

    .slider-six_courses {
        position: absolute;
        right: 350px;
        top: 100px;
        border-radius: 100px;
        padding: 18px 28px 18px 18px;
        background-color: white;
        -webkit-animation: icon-bounce 0.8s ease-out infinite;
        animation: icon-bounce 0.8s ease-out infinite;

        .slider-six_courses-inner {
            position: relative;
            font-size: 28px;
            min-height: 80px;
            padding-left: 95px;
            font-weight: 500;
            color: black;

            span {
                position: absolute;
                left: 0px;
                top: 0px;
                width: 80px;
                height: 80px;
                line-height: 80px;
                text-align: center;
                border-radius: 80px;
                background-color: #c5e96b;
                display: flex;
                padding: 16px;
            }

            img {
                border: none;
                border-radius: 0;
                box-shadow: none;
                height: auto;
                max-width: 100%;
            }

            i {
                position: relative;
                display: block;
                color: #999999;
                font-size: 22px;
                font-weight: 400;
                font-style: normal;
            }
        }
    }
}

@keyframes icon-bounce {
    0%, 100%, 20%, 50%, 80% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
    }
    40% {
        -webkit-transform: translateY(-10px);
        transform: translateY(-10px);
    }
    60% {
        -webkit-transform: translateY(-5px);
        transform: translateY(-5px);
    }
}

// Animations
@keyframes moveUpDown {
	0%,
	100% {
		transform: translateY(0);
	}

	50% {
		transform: translateY(-20px);
	}
}

@keyframes spin {
	100% {
		transform: rotate(360deg);
	}
}

@keyframes move-mosque {
	0% {
		background-position: 0 bottom;
	}

	100% {
		background-position: -2000px bottom;
	}
}

// Islamic Shapes Animations
@keyframes pulse {
	0%, 100% {
		transform: scale(1);
		opacity: 0.9;
	}
	50% {
		transform: scale(1.05);
		opacity: 1;
	}
}

@keyframes floatRotate {
	0%, 100% {
		transform: translateY(0) rotate(0deg);
	}
	33% {
		transform: translateY(-10px) rotate(5deg);
	}
	66% {
		transform: translateY(5px) rotate(-5deg);
	}
}

@keyframes bounce {
	0%, 100% {
		transform: translateY(0);
	}
	50% {
		transform: translateY(-15px);
	}
}
</style>
