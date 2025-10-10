<template>
    <div class="campus-container">
        <!-- Image Section -->
        <div class="image-section">
            <div class="decorative-dots dots-left"></div>
            <img src="/img/courses/tag/course-02.png" alt="Students" class="campus-image" />
            <div class="cta-button">Book Trial Session</div>
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
</template>

<script lang="ts" setup>
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
</script>

<style lang="scss" scoped>
.campus-container {
    display: flex;
    gap: 4rem;
    padding: 3rem;
    max-width: 1200px;
    margin: 0 auto;
    align-items: center;
    /* background: #FAFAFA; */

    @media (max-width: 968px) {
        flex-direction: column;
        gap: 2rem;
        padding: 2rem 1rem;
    }
}

.image-section {
    position: relative;
    flex: 1;

    .campus-image {
        width: 100%;
        max-width: 500px;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
    }

    .cta-button {
        position: absolute;
        bottom: -20px;
        left: 50%;
        transform: translateX(-50%);
        background: white;
        color: #FF4757;
        padding: 14px 32px;
        border: 2px solid #FF4757;
        border-radius: 6px;
        font-weight: 600;
        font-size: 15px;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(255, 71, 87, 0.2);

        &:hover {
            background: #FF4757;
            color: white;
            transform: translateX(-50%) translateY(-2px);
            box-shadow: 0 6px 20px rgba(255, 71, 87, 0.3);
        }
    }
}

.content-section {
    flex: 1;
    position: relative;
    background: white;
    padding: 2.5rem;
    border-radius: 16px;
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