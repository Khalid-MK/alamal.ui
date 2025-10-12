<script setup>
const props = defineProps({
	courseItems: {
		type: Object,
		default: () => ({}),
	},
	courseReviewsImageOne: {
		type: String,
		default: "",
	},
	courseReviewsImageTwo: {
		type: String,
		default: "",
	},
	courseReviewsImageThree: {
		type: String,
		default: "",
	},
	showComments: {
		type: Boolean,
		default: false,
	},
});

const emit = defineEmits(["toggle-comments"]);
</script>

<template>
	<div>
		<div class="student-feedback pt-45">
			<h3>Student Feedback</h3>
			<div class="row">
				<div class="col-xl-3">
					<div class="reating-point mb-30">
						<div class="rating-point-wrapper text-center">
							<h2>{{ props.courseItems.feedbackScore || "4.7" }}</h2>
							<div class="rating-star">
								<i class="fa-solid fa-star"></i>
								<i class="fa-solid fa-star"></i>
								<i class="fa-solid fa-star"></i>
								<i class="fa-solid fa-star"></i>
								<i class="fa-solid fa-star"></i>
							</div>
							<span>{{ props.courseItems.feedbackCount || "5785 Rating" }}</span>
						</div>
					</div>
				</div>
				<div class="col-xl-9">
					<div class="student-reating-bar">
						<div class="reating-bar-wrapper">
							<div class="rating-row mb-10">
								<div class="rating-star">
									<i class="fa-solid fa-star"></i>
									<i class="fa-solid fa-star"></i>
									<i class="fa-solid fa-star"></i>
									<i class="fa-solid fa-star"></i>
									<i class="fa-solid fa-star"></i>
								</div>
								<div class="progress">
									<div class="progress-bar wow fadeInLeft" role="progressbar" style="width: 98%;" aria-valuenow="25"
										aria-valuemin="0" aria-valuemax="100" data-wow-duration="1s" data-wow-delay="0.5s"></div>
								</div>
								<div class="progress-tittle">
									<span>98%</span>
								</div>
							</div>
							<div class="rating-row mb-10">
								<div class="rating-star">
									<i class="fa-solid fa-star"></i>
									<i class="fa-solid fa-star"></i>
									<i class="fa-solid fa-star"></i>
									<i class="fa-solid fa-star"></i>
									<i class="fal fa-star"></i>
								</div>
								<div class="progress">
									<div class="progress-bar wow fadeInLeft" role="progressbar" style="width: 78%;" aria-valuenow="25"
										aria-valuemin="0" aria-valuemax="100" data-wow-duration="1s" data-wow-delay="0.5s"></div>
								</div>
								<div class="progress-tittle">
									<span>78%</span>
								</div>
							</div>
							<div class="rating-row mb-10">
								<div class="rating-star">
									<i class="fa-solid fa-star"></i>
									<i class="fa-solid fa-star"></i>
									<i class="fa-solid fa-star"></i>
									<i class="fal fa-star"></i>
									<i class="fal fa-star"></i>
								</div>
								<div class="progress">
									<div class="progress-bar wow fadeInLeft" role="progressbar" style="width: 55%;" aria-valuenow="25"
										aria-valuemin="0" aria-valuemax="100" data-wow-duration="1s" data-wow-delay="0.5s"></div>
								</div>
								<div class="progress-tittle">
									<span>55%</span>
								</div>
							</div>
							<div class="rating-row mb-10">
								<div class="rating-star">
									<i class="fa-solid fa-star"></i>
									<i class="fa-solid fa-star"></i>
									<i class="fal fa-star"></i>
									<i class="fal fa-star"></i>
									<i class="fal fa-star"></i>
								</div>
								<div class="progress">
									<div class="progress-bar wow fadeInLeft" role="progressbar" style="width: 60%;" aria-valuenow="25"
										aria-valuemin="0" aria-valuemax="100" data-wow-duration="1s" data-wow-delay="0.5s"></div>
								</div>
								<div class="progress-tittle">
									<span>60%</span>
								</div>
							</div>
							<div class="rating-row mb-10">
								<div class="rating-star">
									<i class="fa-solid fa-star"></i>
									<i class="fa-solid fa-star"></i>
									<i class="fal fa-star"></i>
									<i class="fal fa-star"></i>
									<i class="fal fa-star"></i>
								</div>
								<div class="progress">
									<div class="progress-bar wow fadeInLeft" role="progressbar" style="width: 10%;" aria-valuenow="25"
										aria-valuemin="0" aria-valuemax="100" data-wow-duration="1s" data-wow-delay="0.5s"></div>
								</div>
								<div class="progress-tittle">
									<span>10%</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="course-detalis-reviews pt-15">
			<div class="course-detalis-reviews-tittle">
				<h3>Reviews</h3>
			</div>
			<div class="course-review-item mb-30">
				<div class="course-reviews-img">
					<a href="#"><img :src="props.courseReviewsImageOne" alt="image not found"></a>
				</div>
				<div class="course-review-list">
					<h5><a href="#">Sotapdi Kunda</a></h5>
					<div class="course-start-icon">
						<i class="fa-solid fa-star"></i>
						<i class="fa-solid fa-star"></i>
						<i class="fa-solid fa-star"></i>
						<i class="fa-solid fa-star"></i>
						<i class="fa-solid fa-star"></i>
						<span>55 min ago</span>
					</div>
					<p>Very clean and organized with easy to follow tutorials, Exercises, and solutions. This course does start
						from the
						beginning with very little knowledge and gives a great overview of common tools used for data science and
						progresses
						into more complex concepts and ideas.</p>
				</div>
			</div>
			<div class="course-review-item mb-30">
				<div class="course-reviews-img">
					<a href="#"><img :src="props.courseReviewsImageTwo" alt="image not found"></a>
				</div>
				<div class="course-review-list">
					<h5><a href="#">Samantha</a></h5>
					<div class="course-start-icon">
						<i class="fa-solid fa-star"></i>
						<i class="fa-solid fa-star"></i>
						<i class="fa-solid fa-star"></i>
						<i class="fa-solid fa-star"></i>
						<i class="fa-solid fa-star"></i>
						<span>45 min ago</span>
					</div>
					<p>The course is good at explaining very basic intuition of the concepts. It will get you scratching the
						surface so to say.
						where this course is unique is the implementation methods are so well defined Thank you to the team !.</p>
				</div>
			</div>
			<div class="course-review-item mb-30">
				<div class="course-reviews-img">
					<a href="#"><img :src="props.courseReviewsImageThree" alt="image not found"></a>
				</div>
				<div class="course-review-list">
					<h5><a href="#">Michell Mariya</a></h5>
					<div class="course-start-icon">
						<i class="fa-solid fa-star"></i>
						<i class="fa-solid fa-star"></i>
						<i class="fa-solid fa-star"></i>
						<i class="fa-solid fa-star"></i>
						<i class="fa-solid fa-star"></i>
						<span>30 min ago</span>
					</div>
					<p>This course is amazing..! I started this course as a beginner and learnt a lot. Instructors are great.
						Query handling can
						be improved.Overall very happy with the course.</p>
				</div>
			</div>
		</div>
		<div class="course-review-btn">
			<a id="show-review-box" class="edu-btn" href="javascript:void(0)" @click="emit('toggle-comments')">Write a
				Review</a>
			<div id="review-box" :class="['review-comment mt-45', { 'd-block': props.showComments }]">
				<div class="comment-title mb-20">
					<p>Your email address will not be published. Required fields are marked *</p>
				</div>
				<div class="comment-rating mb-20">
					<span>Overall ratings</span>
					<ul>
						<li><a href="#"><i class="fa-solid fa-star"></i></a></li>
						<li><a href="#"><i class="fa-solid fa-star"></i></a></li>
						<li><a href="#"><i class="fa-solid fa-star"></i></a></li>
						<li><a href="#"><i class="fa-solid fa-star"></i></a></li>
						<li><a href="#"><i class="fal fa-star"></i></a></li>
					</ul>
				</div>
				<div class="comment-input-box mb-15">
					<form action="#">
						<div class="row">
							<div class="col-xxl-12">
								<textarea class="comment-input comment-textarea mb-20" placeholder="Your review"></textarea>
							</div>
							<div class="col-xxl-6">
								<div class="comment-input mb-20">
									<input type="text" placeholder="Your Name">
								</div>
							</div>
							<div class="col-xxl-6">
								<div class="comment-input mb-20">
									<input type="email" placeholder="Your Email">
								</div>
							</div>
							<div class="col-xxl-12">
								<div class="comment-submit">
									<button type="submit" class="edu-btn">Submit</button>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>
