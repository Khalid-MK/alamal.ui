<script>
import courseItemsMixin from "~~/mixins/courseItemsMixin";
import CourseDetailsContent from "~/components/CourseDetails/Content.vue";
import CourseDetailsHero from "~/components/CourseDetails/Hero.vue";
import CourseDetailsSidebar from "~/components/CourseDetails/Sidebar.vue";
import CourseDetailsVideoModal from "~/components/CourseDetails/VideoModal.vue";

export default {
    name: "app",
    components: {
        CourseDetailsContent,
        CourseDetailsHero,
        CourseDetailsSidebar,
        CourseDetailsVideoModal,
    },
    mixins: [courseItemsMixin],
    data() {
        return {
            showComments: false,

            id: this.$route.params.id,
            courseItems: {},
            courseInstructorsImage: '/img/course/course-instructors.png',
            courseReviewsImageOne: '/img/course/course-reviews-1.png',
            courseReviewsImageTwo: '/img/course/course-reviews-2.png',
            courseReviewsImageThree: '/img/course/course-reviews-3.png',
            courseVideoImage: '/img/course/course-video.png',
            courseVideoUrl: 'https://www.youtube.com/embed/wNwrSz3HYqE',
            isVideoModalOpen: false,
        }
    },
    methods: {
        handleComments() {
            return this.showComments = !this.showComments
        },
        getcourseItems(courseItemsId) {
            this.courseItems = this.courseItemss.find((item) => item.id == courseItemsId);
        },
        openVideoModal() {
            this.isVideoModalOpen = true
        },
        closeVideoModal() {
            this.isVideoModalOpen = false
        }
    },
    created() {
        this.getcourseItems(this.id);
    },
};
</script>

<template>
    <div>
        <CourseDetailsHero :course-title="courseItems.title" />
        <section class="course-detalis-area pb-90">
            <div class="container">
                <div class="row">
                    <div class="col-xxl-8 col-xl-8">
                        <CourseDetailsContent :course-items="courseItems"
                            :course-instructors-image="courseInstructorsImage"
                            :course-reviews-image-one="courseReviewsImageOne"
                            :course-reviews-image-two="courseReviewsImageTwo"
                            :course-reviews-image-three="courseReviewsImageThree" :show-comments="showComments"
                            @toggle-comments="handleComments" />
                    </div>
                    <div class="col-xxl-4 col-xl-4 col-lg-8 col-md-8">
                        <CourseDetailsSidebar :course-video-image="courseVideoImage" @open-video="openVideoModal" />
                    </div>
                </div>
            </div>
        </section>
        <CourseDetailsVideoModal :is-open="isVideoModalOpen" :video-url="courseVideoUrl" @close="closeVideoModal" />
    </div>
</template>