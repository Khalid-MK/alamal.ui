<template>
	<div class="relative z-10 bg-[#f5f9fa] py-24 md:py-18" :dir="direction">
		<div class="container mx-auto px-4">
			<div class="text-center">
				<h1
					class="text-5xl md:text-4xl sm:text-3xl font-bold text-heading mb-3"
				>
					{{ title }}
				</h1>
				<ul
					class="flex items-center justify-center flex-wrap font-secondary text-base font-medium"
				>
					<li v-for="(item, index) in breadcrumbItems" :key="index">
						<template v-if="index > 0">
							<span class="text-heading mx-2.5"
								><i class="icon-angle-right"></i
							></span>
						</template>
						<NuxtLink
							v-if="item.path"
							:to="item.path"
							class="text-heading hover:text-primary transition-colors"
						>
							{{ item.label }}
						</NuxtLink>
						<span
							v-else
							class="text-heading"
							:class="{ 'font-semibold': index === breadcrumbItems.length - 1 }"
						>
							{{ item.label }}
						</span>
					</li>
				</ul>
			</div>
		</div>

    <ul class="shape-group outer-shapes">
			<li class="shape-5">
				<img class="spin-10-reverse" src="/img/islamic-shapes/decorative/shape-18.png" alt="Islamic Decoration" />
			</li>
			<li class="shape-6">
				<span></span>
			</li>
			<li class="shape-7">
				<img src="/img/islamic-shapes/banner/lamp-shape.png" alt="Islamic Decoration" />
			</li>
		</ul>

		<!-- Islamic Animated Shapes -->
		<ul class="shape-group hidden lg:block">
			<li class="shape-1 scene" ref="scene1">
				<img
					data-depth="1"
					src="/img/islamic-shapes/banner/bismillah-2.png"
					alt="Islamic Decoration"
				/>
			</li>

			<li class="shape-3 scene" ref="scene3">
				<img
					data-depth="-2"
					src="/img/islamic-shapes/decorative/shape-52.png"
					alt="Islamic Ornament"
				/>
			</li>

			<li class="shape-4 scene spin-10">
				<img
					data-depth="-1.5"
					src="/img/islamic-shapes/decorative/shape-74.png"
					alt="Islamic Design"
				/>
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import Parallax from "parallax-js";

const { localeProperties } = useI18n();
const direction = computed(() => localeProperties.value.dir);

// Refs for parallax scenes
const scene1 = ref<HTMLElement | null>(null);
const scene2 = ref<HTMLElement | null>(null);
const scene3 = ref<HTMLElement | null>(null);
const scene4 = ref<HTMLElement | null>(null);

let parallaxInstances: Parallax[] = [];

interface BreadcrumbItem {
	label: string;
	path?: string;
}

interface Props {
	title: string;
	breadcrumbItems: BreadcrumbItem[];
	showShapes?: boolean;
}

withDefaults(defineProps<Props>(), {
	showShapes: true,
});

onMounted(() => {
	// Initialize Parallax.js for mouse movement effects
	const initParallax = (element: HTMLElement | null) => {
		if (element) {
			const instance = new Parallax(element, {
				relativeInput: false,
				hoverOnly: false,
			});
			parallaxInstances.push(instance);
		}
	};

	// Initialize parallax for each scene
	initParallax(scene1.value);
	initParallax(scene2.value);
	initParallax(scene3.value);
	initParallax(scene4.value);
});

onBeforeUnmount(() => {
	// Cleanup parallax instances
	parallaxInstances.forEach((instance) => {
		if (instance && typeof instance.destroy === "function") {
			instance.destroy();
		}
	});
	parallaxInstances = [];
});
</script>

<style scoped>
.shape-group {
	list-style: none;
	padding: 0;
	margin: 0;

	li {
		position: absolute;
		z-index: -1;

		img {
			position: initial;
			transition: transform 0.1s ease-out;
		}

		&.shape-1 {
			top: 120px;
			right: 20%;
		}

		&.shape-2 {
			bottom: -65px;
			left: -155px;

			[dir="rtl"] & {
				left: auto;
				right: -155px;
			}
		}

		&.shape-3 {
			top: 50%;
			left: 20%;
			transform: translateY(-50%);
		}

		&.shape-4 {
			bottom: 10%;
			left: -80px;

			[dir="rtl"] & {
				left: auto;
				right: -80px;
			}
		}
	}
}

.outer-shapes {
  list-style: none;
  padding: 0;
  margin: 0;
  display: none;

  @media (min-width: 768px) {
    display: block;
  }

  li {
    position: absolute;
    z-index: 1;

    img {
      max-width: 50px;

      @media (min-width: 1024px) {
        max-width: 70px;
      }
    }

    &.shape-5 {
      top: 10px;

      @media (min-width: 1024px) {
        top: 15px;
      }

      @media (min-width: 1200px) {
        top: 20px;
      }

      [dir="ltr"] & {
        left: 20px;

        @media (min-width: 1024px) {
          left: 50px;
        }

        @media (min-width: 1200px) {
          left: 110px;
        }
      }

      [dir="rtl"] & {
        right: 20px;

        @media (min-width: 1024px) {
          right: 50px;
        }

        @media (min-width: 1200px) {
          right: 110px;
        }
      }
    }

    &.shape-7 {
      top: 14px;

      @media (min-width: 1024px) {
        top: 19px;
      }

      @media (min-width: 1200px) {
        top: 24px;
      }

      [dir="ltr"] & {
        right: 20px;

        @media (min-width: 1024px) {
          right: 60px;
        }

        @media (min-width: 1200px) {
          right: 120px;
        }
      }

      [dir="rtl"] & {
        left: 20px;

        @media (min-width: 1024px) {
          left: 60px;
        }

        @media (min-width: 1200px) {
          left: 120px;
        }
      }
    }

    &.shape-6 {
      top: -250px;

      @media (min-width: 1200px) {
        top: -350px;
      }

      [dir="ltr"] & {
        left: 40px;

        @media (min-width: 1200px) {
          left: 80px;
        }
      }

      [dir="rtl"] & {
        right: 40px;

        @media (min-width: 1200px) {
          right: 80px;
        }
      }

      span {
        display: block;
        height: 300px;
        width: 300px;
        border: 1px solid var(--color-border);
        border-radius: 50%;

        @media (min-width: 1024px) {
          height: 400px;
          width: 400px;
        }

        @media (min-width: 1200px) {
          height: 470px;
          width: 470px;
        }
      }
    }
  }
}
</style>
