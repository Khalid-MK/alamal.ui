<template>
    <div class="campus-wrapper">
        <!-- Parallax Shapes Background -->
        <ul class="shape-group-bg">
            <li class="shape-1 scene" :style="getParallaxStyle(1.5)">
                <img src="/img/about/shape-37.png" alt="Shape">
            </li>
            <li class="shape-2 scene" :style="getParallaxStyle(-1.8)">
                <img src="/img/about/shape-04.png" alt="Shape">
            </li>
            <li class="shape-3 scene" :style="getParallaxStyle(-1.2)">
                <img src="/img/about/shape-37.png" alt="Shape">
            </li>
            <li class="shape-4 scene" :style="getParallaxStyle(2)">
                <img src="/img/about/shape-04.png" alt="Shape">
            </li>
        </ul>

        <div class="campus-container" @mousemove="handleMouseMove">
            <!-- Image Section -->
            <div class="image-section">
                <div class="decorative-dots dots-left"></div>
                <img src="/img/courses/tag/course-02.png" alt="Students" class="campus-image" />
                <button class="cta-button">Book Trial Session</button>
                <div class="decorative-dots dots-right"></div>
            </div>

            <!-- Content Section -->
            <div class="content-section">
                <div class="decorative-dots dots-top"></div>

                <p class="section-label">STEPS</p>
                <h2 class="section-title">
                    <span class="highlighted">3 Simple</span> Steps To Start
                </h2>

                <!-- Steps Cards -->
                <div class="steps-list">
                    <div v-for="(step, index) in StepsArray" :key="index" class="step-card">
                        <div class="icon-wrapper" :style="{ backgroundColor: step.bgColor }">
                            <v-icon :color="step.color" size="32">{{ step.icon }}</v-icon>
                        </div>
                        <div class="step-content">
                            <h3 class="step-title">{{ step.title }}</h3>
                            <p class="step-description">{{ step.description }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const StepsArray = [
    {
        title: "Fill The Trial Form",
        description: "Complete the simple registration form with your basic information and preferences.",
        icon: "mdi-file-document-edit",
        color: "#FF6B6B",
        bgColor: "#FFE8E8"
    },
    {
        title: "Book Your Free Trial",
        description: "Select a convenient time slot and schedule your complimentary trial session.",
        icon: "mdi-calendar-check",
        color: "#4A90E2",
        bgColor: "#E8F5FF"
    },
    {
        title: "Choose Study Plan",
        description: "Pick the perfect study plan that aligns with your goals and learning style.",
        icon: "mdi-clipboard-text",
        color: "#F5A623",
        bgColor: "#FFF4E8"
    }
];

// Parallax effect state
const mouseX = ref(0);
const mouseY = ref(0);

const handleMouseMove = (event: MouseEvent) => {
    const target = event.currentTarget as HTMLElement;
    if (!target) return;
    const rect = target.getBoundingClientRect();
    mouseX.value = (event.clientX - rect.left - rect.width / 2) / rect.width;
    mouseY.value = (event.clientY - rect.top - rect.height / 2) / rect.height;
};

const getParallaxStyle = (depth: number) => {
    const moveX = mouseX.value * depth * 20;
    const moveY = mouseY.value * depth * 20;
    return {
        transform: `translate(${moveX}px, ${moveY}px)`,
        transition: 'transform 0.3s ease-out'
    };
};
</script>

<style lang="scss" scoped>
.campus-wrapper {
    position: relative;
   
}

.shape-group-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;

    li {
        margin: 0;
        position: absolute;
        list-style: none;

        img {
            width: 100%;
            height: auto;
            opacity: 0.4;
            display: block;
        }

        &.shape-1 {
            top: 10%;
            left: 5%;
            width: 100px;
        }

        &.shape-2 {
            bottom: 15%;
            left: 40%;
            width: 120px;
        }

        &.shape-3 {
            top: 15%;
            right: 8%;
            width: 90px;
        }

        &.shape-4 {
            bottom: 20%;
            right: 5%;
            width: 110px;
        }
    }
}

// Hide shapes on small screens
@media only screen and (max-width: 1199px) {
    .shape-group-bg {
        display: none;
    }
}

.campus-container {
    display: flex;
    gap: 4rem;
    padding: 3rem;
    max-width: 1200px;
    margin: 0 auto;
    align-items: center;
    position: relative;
    z-index: 1;

    @media (max-width: 968px) {
        flex-direction: column;
        gap: 2rem;
        padding: 2rem 1rem;
    }
}

.image-section {
    position: relative;
    flex: 1;
    left: 3%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;

    .campus-image {
        width: 146%;
        max-width: 690px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);

        @media (max-width:1025px) {
            width: 130%;
        }
    }

    @media (max-width:768px) {
        position: static;
    }

    .cta-button {
        background: white;
        width: 250px;
        color: #FF4757;
        padding: 14px 20px;
        border: 2px solid #FF4757;
        border-radius: 6px;
        font-weight: 600;
        font-size: 15px;
        text-align: center;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(255, 71, 87, 0.2);

        &:hover {
            background: #FF4757;
            color: white;
            box-shadow: 0 6px 20px rgba(255, 71, 87, 0.3);
        }
    }
}

.content-section {
    flex: 1;
    position: relative;
    background: white;
    padding: 2rem;
    top: 11%;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);

    .section-label {
        color: #999;
        font-weight: 600;
        font-size: 13px;
        letter-spacing: 1.5px;
        margin-bottom: 0.5rem;
    }

    .section-title {
        font-size: 2rem;
        font-weight: 700;
        color: #2C3E50;
        margin-bottom: 2rem;
        line-height: 1.3;

        .highlighted {
            position: relative;
            display: inline-block;

            &::after {
                content: '';
                position: absolute;
                bottom: 4px;
                left: 0;
                right: 0;
                height: 10px;
                background: linear-gradient(to right, #7FE7CC, #6EDFC7);
                z-index: -1;
                border-radius: 4px;
            }
        }
    }

    @media (max-width:768px) {
        position: static;
    }
}

.steps-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.step-card {
    display: flex;
    gap: 1.25rem;
    align-items: flex-start;
    transition: transform 0.2s ease;

    &:hover {
        transform: translateX(5px);
    }

    .icon-wrapper {
        min-width: 56px;
        width: 56px;
        height: 56px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.3s ease;

        &:hover {
            transform: scale(1.1);
        }
    }

    .step-content {
        flex: 1;

        .step-title {
            font-size: 1.1rem;
            font-weight: 600;
            color: #2C3E50;
            margin-bottom: 0.4rem;
        }

        .step-description {
            font-size: 0.9rem;
            color: #6C757D;
            line-height: 1.6;
        }
    }
}

.decorative-dots {
    position: absolute;
    width: 100px;
    height: 100px;
    background-image: radial-gradient(circle, #E0E0E0 2px, transparent 2px);
    background-size: 12px 12px;
    opacity: 0.5;
    pointer-events: none;

    &.dots-left {
        top: 10%;
        left: -30px;
    }

    &.dots-right {
        bottom: 10%;
        right: -30px;

        @media (max-width:560px) {
            display: none;
        }
    }

    &.dots-top {
        top: -40px;
        right: 20px;
    }
}

@media (max-width: 968px) {
    .content-section {
        padding: 1.5rem;

        .section-title {
            font-size: 1.6rem;
        }
    }

    .step-card .icon-wrapper {
        min-width: 48px;
        width: 48px;
        height: 48px;
    }
}
</style>