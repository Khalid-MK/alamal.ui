<script setup>
const props = defineProps({
	courseVideoImage: {
		type: String,
		default: "",
	},
});

const emit = defineEmits(["open-video"]);

const handleOpenVideo = () => {
	emit("open-video");
};
</script>

<template>
	<div class="course-video-widget">
		<div class="course-widget-wrapper mb-30">
			<!-- Video Thumbnail -->
			<div class="course-video-thumb w-img">
				<img :src="props.courseVideoImage" alt="Course Video">
				<div class="sidber-video-btn">
					<button class="popup-video" type="button" @click="handleOpenVideo">
						<i class="fa-solid fa-play"></i>
					</button>
				</div>
			</div>

			<!-- Course Includes Section -->
			<div class="course-includes-section">
				<h3 class="course-includes-title">Course Includes:</h3>

				<!-- Price -->
				<div class="course-info-item">
					<div class="course-info-icon">
						<i class="flaticon-trolley-cart"></i>
					</div>
					<div class="course-info-content">
						<span class="info-label">Price:</span>
						<span class="info-value price-value">$70.00</span>
					</div>
				</div>

				<!-- Instructor -->
				<div class="course-info-item">
					<div class="course-info-icon">
						<i class="flaticon-user-1"></i>
					</div>
					<div class="course-info-content">
						<span class="info-label">Instructor:</span>
						<span class="info-value">Edward Norton</span>
					</div>
				</div>

				<!-- Duration -->
				<div class="course-info-item">
					<div class="course-info-icon">
						<i class="flaticon-clock"></i>
					</div>
					<div class="course-info-content">
						<span class="info-label">Duration:</span>
						<span class="info-value">3 weeks</span>
					</div>
				</div>

				<!-- Lessons -->
				<div class="course-info-item">
					<div class="course-info-icon">
						<i class="flaticon-book"></i>
					</div>
					<div class="course-info-content">
						<span class="info-label">Lessons:</span>
						<span class="info-value">8</span>
					</div>
				</div>

				<!-- Enrolled -->
				<div class="course-info-item">
					<div class="course-info-icon">
						<i class="flaticon-people"></i>
					</div>
					<div class="course-info-content">
						<span class="info-label">Enrolled:</span>
						<span class="info-value">65 students</span>
					</div>
				</div>

				<!-- Language -->
				<div class="course-info-item">
					<div class="course-info-icon">
						<i class="flaticon-global"></i>
					</div>
					<div class="course-info-content">
						<span class="info-label">Language:</span>
						<span class="info-value">English</span>
					</div>
				</div>

				<!-- Certificate -->
				<div class="course-info-item">
					<div class="course-info-icon">
						<i class="flaticon-certificate"></i>
					</div>
					<div class="course-info-content">
						<span class="info-label">Certificate:</span>
						<span class="info-value">Yes</span>
					</div>
				</div>
			</div>

			<!-- Start Now Button -->
			<div class="course-action-button">
				<NuxtLink class="start-now-btn" to="/enroll">
					Start Now <i class="fa-solid fa-arrow-right"></i>
				</NuxtLink>
			</div>

			<!-- Share On Section -->
			<div class="course-share-section">
				<h4 class="share-title">Share On:</h4>
				<div class="social-share-buttons">
					<a href="#" class="social-btn facebook" aria-label="Share on Facebook">
						<i class="fab fa-facebook-f"></i>
					</a>
					<a href="#" class="social-btn twitter" aria-label="Share on Twitter">
						<i class="fab fa-twitter"></i>
					</a>
					<a href="#" class="social-btn linkedin" aria-label="Share on LinkedIn">
						<i class="fab fa-linkedin-in"></i>
					</a>
					<a href="#" class="social-btn youtube" aria-label="Share on YouTube">
						<i class="fab fa-youtube"></i>
					</a>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.course-includes-section {
	padding: 25px 0 30px 0;
}

.course-includes-title {
	font-size: 18px;
	font-weight: 600;
	margin-bottom: 20px;
	color: #1a1a1a;
}

.course-info-item {
	display: flex;
	align-items: center;
	padding: 12px 0;
	border-bottom: 1px solid #e8e8e8;
}

.course-info-item:last-child {
	border-bottom: none;
}

.course-info-icon {
	width: 24px;
	margin-right: 12px;
	display: flex;
	align-items: center;
	justify-content: center;

	i {
		font-size: 18px;
		line-height: 1;
		color: #1a1a1a;
	}
}

.course-info-content {
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex: 1;
}

.info-label {
	font-size: 14px;
	color: #1a1a1a;
	font-weight: 400;
}

.info-value {
	font-size: 14px;
	color: #666;
	font-weight: 400;
}

.price-value {
	color: #ff4d6d;
	font-weight: 900;
	font-size: 20px;
}

.course-action-button {
	padding: 25px 0 20px;
}

.start-now-btn {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	padding: 14px 30px;
	background-color: #2467ec;
	color: white;
	font-size: 16px;
	font-weight: 600;
	border-radius: 5px;
	text-decoration: none;
	transition: all 0.3s ease;

	i {
		margin-left: 8px;
		font-size: 14px;
	}

	&:hover {
		background-color: #1b4fba;
		color: white;
		transform: translateY(-2px);
		box-shadow: 0 5px 15px rgba(36, 103, 236, 0.3);
	}
}

.course-share-section {
	padding: 20px 0 0;
	border-top: 1px solid #e8e8e8;
}

.share-title {
	font-size: 16px;
	font-weight: 600;
	margin-bottom: 15px;
	color: #1a1a1a;
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
		color: #666;
		transform: translateY(-2px);
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	&.facebook:hover {
		background-color: #3b5998;
		color: white;
	}

	&.twitter:hover {
		background-color: #1da1f2;
		color: white;
	}

	&.linkedin:hover {
		background-color: #0077b5;
		color: white;
	}

	&.youtube:hover {
		background-color: #ff0000;
		color: white;
	}
}
</style>
