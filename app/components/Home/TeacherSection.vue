<template>
    <div class="teachers-container">
        <div class="background-overlay"></div>

        <div class="content-wrapper">
            <!-- Header Section -->

            <div class="header-section">
                <div class="title-section">

                    <div class="badge">
                        <img class="star-icon" src="../../assets/icons/star.svg" />
                        <span class="badge-text">{{ $t("OurScholars") }}</span>
                    </div>
                    <h2 class="main-title">
                        {{ $t("AllOurTeachersAreGraduates") }}<br />{{ $t("FromCollegeOfArabic") }}
                    </h2>
                </div>

                <!-- More Scholars Button (Top Right) -->

                <button class="more-scholars-btn">{{ $t("MoreScholars") }}</button>
            </div>

            <!-- Teachers Grid -->
            <div class="teachers-grid">
                <div v-for="teacher in data" :key="teacher.id" class="teacher-card">
                    <div class="teacher-image-wrapper">
                        <div class="teacher-image">
                            <img :src="teacher.img" alt="img" />
                            <!-- <div class="placeholder-avatar">
                                <span class="avatar-initial">{{ teacher.name.charAt(0) }}</span>
                            </div> -->
                        </div>
                    </div>

                    <div class="teacher-info">
                        <h3 class="teacher-name">{{ teacher.name }}</h3>
                        <p class="teacher-title">{{ teacher.specialization.join(' & ') }}</p>

                        <div class="social-links">
                            <a :href="teacher.links.face" target="_blank" class="social-icon facebook">
                                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                                    <path
                                        d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z" />
                                </svg>
                            </a>
                            <a :href="teacher.links.inst" target="_blank" class="social-icon instagram">
                                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                                    <path
                                        d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3Z" />
                                </svg>
                            </a>
                            <a :href="teacher.links.twiter" target="_blank" class="social-icon twitter">
                                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                                    <path
                                        d="M22.46 6c-.85.38-1.78.64-2.75.76a4.8 4.8 0 0 0 2.1-2.66c-.92.55-1.95.95-3.03 1.16a4.76 4.76 0 0 0-8.11 4.34A13.5 13.5 0 0 1 3.39 4.62a4.76 4.76 0 0 0 1.47 6.35 4.73 4.73 0 0 1-2.15-.59v.06a4.76 4.76 0 0 0 3.82 4.66 4.76 4.76 0 0 1-2.15.08 4.76 4.76 0 0 0 4.44 3.3A9.55 9.55 0 0 1 2 19.54a13.5 13.5 0 0 0 7.29 2.14c8.75 0 13.54-7.25 13.54-13.54 0-.21 0-.42-.01-.62.93-.67 1.74-1.51 2.38-2.46Z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Decorative Elements -->
        <div class="decorative-circle circle-1"></div>
        <div class="decorative-circle circle-2"></div>
    </div>
</template>

<script setup lang="ts">
import dataAr from "@/constant/TeacherSection/ar.json";
import dataEn from "@/constant/TeacherSection/en.json";
import dataRu from "@/constant/TeacherSection/ru.json";

const { locale, localeProperties } = useI18n()
// Direction
const direction = computed(() => localeProperties.value.dir)

const data = computed(() => {
    switch (locale.value) {
        case "ar":
            return dataAr;
        case "ru":
            return dataRu;
        default:
            return dataEn;
    }
})
</script>

<style lang="scss" scoped>
.teachers-container {
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 1800px;
    height: 100%;
    margin: 60px auto;
    padding: 90px 40px;
    border-radius: 40px;
    background: linear-gradient(135deg, #1ab69d 0%, #16a085 10%);
    overflow: hidden;

    @media (max-width: 768px) {
        width: 95%;
        padding: 40px 20px;
        border-radius: 24px;
        margin: 30px auto;
    }
}

.background-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('/img/teacher-section/10.jpg') center/cover;
    opacity: 0.2;
    z-index: 0;
}

.content-wrapper {
    position: relative;
    z-index: 2;
    width: 100%;
}

.header-section {
    display: flex;
    gap: 30px;
    justify-content: space-around;
    margin-bottom: 60px;
    padding: 10px;

    .title-section {
        display: flex;
        flex-direction: column;
    }

    @media (max-width: 768px) {
        margin-bottom: 40px;
    }

    @media (max-width: 575px) {
        flex-direction: column;
    }

}

.badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    height: fit-content;
    width: fit-content;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    padding: 10px 20px;
    border-radius: 30px;
    margin-bottom: 20px;
    border: 1px solid rgba(255, 255, 255, 0.3);

    .star-icon {
        font-size: 18px;
    }

    .badge-text {
        color: white;
        font-weight: 600;
        font-size: 14px;
    }
}

.main-title {
    font-size: 2.8rem;
    font-weight: 700;
    color: white;
    line-height: 1.3;
    margin: 0;

    @media (max-width: 1024px) {
        font-size: 2.2rem;
    }

    @media (max-width: 768px) {
        font-size: 1.6rem;

        br {
            display: none;
        }
    }
}

.more-scholars-btn {
    position: relative;
    align-self: center;
    background-color: #ffffff;
    padding: 14px 26px;
    border: 2px solid #0F0E0B;
    border-radius: 50px;
    font-family: "Lexend", sans-serif;
    font-size: 16px;
    font-weight: 600;
    width: fit-content;
    height: fit-content;
    overflow: hidden;
    cursor: pointer;
    color: #0F0E0B;
    z-index: 1;
    transition: color 0.4s ease;

    &::before {
        content: "";
        position: absolute;
        top: -200%;
        left: 50%;
        width: 200%;
        height: 200%;
        transform: translateX(-50%);
        border-radius: 50%;
        background-color: #A2B2AD;
        transition: all 0.6s ease;
        z-index: -1;
    }

    &:hover {
        color: #ffffff;

    }

    &:hover::before {
        top: -10%;

    }
}


.teachers-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 30px;


    @media (max-width: 1200px) {
        gap: 25px;
    }

    @media (max-width: 768px) {
        gap: 20px;
    }
}

.teacher-card {
    position: relative;
    display: flex;
    flex-direction: column;
    /* flex: 1 1 calc(25% - 23px); */
    min-width: 250px;
    /* max-width: calc(25% - 23px); */
    border-radius: 24px;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    /* @media (max-width: 1200px) {
        flex: 1 1 calc(50% - 13px);
        max-width: calc(50% - 13px);
    }

    @media (max-width: 768px) {
        flex: 1 1 100%;
        max-width: 100%;
        min-width: 100%;
    } */

    &:hover {
        transform: translateY(-8px);
        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
    }
}

.teacher-image-wrapper {
    position: relative;
    width: 100%;
    padding-top: 100%;
    overflow: hidden;
    flex-shrink: 0;
}

.teacher-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 24px 24px 0 0;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

.placeholder-avatar {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;

    .avatar-initial {
        font-size: 4rem;
        font-weight: 700;
        color: white;

        @media (max-width: 768px) {
            font-size: 3rem;
        }
    }
}

.teacher-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 30px 20px;
    text-align: center;
    background: white;
    flex-grow: 1;

    @media (max-width: 768px) {
        padding: 24px 16px;
    }
}

.teacher-name {
    font-size: 1.3rem;
    font-weight: 700;
    color: #2C3E50;
    margin: 0 0 8px 0;

    @media (max-width: 768px) {
        font-size: 1.1rem;
    }
}

.teacher-title {
    font-size: 0.95rem;
    color: #6C757D;
    margin: 0 0 20px 0;
}

.social-links {
    display: flex;
    gap: 10px;
    justify-content: center;
}

.social-icon {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    text-decoration: none;
    transition: all 0.3s ease;

    &.facebook {
        background: #1877F2;
    }

    &.instagram {
        background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
    }

    &.twitter {
        background: #1DA1F2;
    }

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }
}

.decorative-circle {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    pointer-events: none;

    &.circle-1 {
        width: 300px;
        height: 300px;
        top: -100px;
        right: -100px;
        border: 2px solid rgba(255, 255, 255, 0.2);

        @media (max-width: 768px) {
            width: 200px;
            height: 200px;
            top: -80px;
            right: -80px;
        }
    }

    &.circle-2 {
        width: 200px;
        height: 200px;
        bottom: -80px;
        left: -80px;
        border: 2px solid rgba(255, 255, 255, 0.2);

        @media (max-width: 768px) {
            width: 150px;
            height: 150px;
            bottom: -60px;
            left: -60px;
        }
    }
}
</style>