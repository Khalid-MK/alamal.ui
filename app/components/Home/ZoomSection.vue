<template>
  <section class="teacher-area relative pt-12">
    <div class="mx-auto w-full max-w-6xl px-4">
      <div
        class="teacher-area-container flex items-center gap-28 justify-center"
      >
        <div class="teacher-img relative">
          <img
            class="teacher-main-img"
            src="/img/teacher/teacher.png"
            alt="image not found"
          />
          <img
            class="teacher-shape"
            src="/img/teacher/teacher-shape-01.png"
            alt="image not found"
          />
          <img
            class="teacher-shape-02"
            src="/img/teacher/teacher.png"
            alt="image not found"
          />
          <img
            class="teacher-shape-03"
            src="/img/teacher/teacher-shape-03.png"
            alt="image not found"
          />
          <img
            class="teacher-shape-04"
            src="/img/teacher/teacher-shape-04.png"
            alt="image not found"
          />
        </div>

        <div class="teacher-content mr-20">
          <div class="section-title mb-5">
            <h2>
              {{ $t("ZoomSection.BecomeInstructorAndTeachOnline") }}
              <span class="shape-line"><i class="icon-19"></i></span>
            </h2>
          </div>
          <p>{{ $t("ZoomSection.HelpingEmployees") }}</p>
          <NuxtLink to="/instructor" class="edu-btn btn-transparent mt-20">{{
            $t("ZoomSection.JoinUsNow")
          }}</NuxtLink>
        </div>
      </div>
    </div>
  </section>
  <!-- Zoom Section -->
  <section class="zoom-area pt-20 pb-20">
    <div class="mx-auto w-full max-w-6xl px-4">
      <div class="zoom-area-container items-center gap-10 flex justify-center">
        <div class="order-1 lg:order-2">
          <div class="zoom-thumb relative">
            <img
              class="zoom-shape-01"
              src="/img/teacher/zoom-shape-1.png"
              alt="image not found"
            />
            <img
              class="zoom-shape-02"
              src="/img/teacher/zoom-shape-2.png"
              alt="image not found"
            />
            <img
              class="zoom-thumb-main-img"
              src="/img/teacher/Zoom.png"
              alt="image not found"
            />
          </div>
        </div>
        <div class="order-2 lg:order-1">
          <div class="zoom-class-wrapper mb-20">
            <div class="section-title">
              <h2>
                {{ $t("ZoomSection.LiveClassZoom") }}
                <span class="text-primary">Zoom</span>
                <span class="shape-line"><i class="icon-19"></i></span>
              </h2>
            </div>
            <div class="zoon-class-text">
              <p>
                {{ $t("ZoomSection.HelpingEmployees") }}
              </p>
            </div>
            <NuxtLink to="/zoom-class" class="edu-btn btn-transparent mt-25">{{
              $t("ZoomSection.TryFreeNow")
            }}</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "teacher",
};
</script>
<style lang="scss" scoped>
$xxxl: "only screen and (min-width: 1600px) and (max-width: 1800px)";
$xxl: "only screen and (min-width: 1400px) and (max-width: 1599px)";
$xl: "only screen and (min-width: 1200px) and (max-width: 1399px)";
$lg: "only screen and (min-width: 992px) and (max-width: 1199px)";
$md: "only screen and (min-width: 768px) and (max-width: 991px)";
$sm: "only screen and (min-width: 576px) and (max-width: 767px)";
$xs: "(max-width: 575px)";

/* ----------------------- */

.teacher-content {
  max-width: 400px;

  .section-title {
    h2 {
      position: relative;
      line-height: 1.3;
      font-size: 30px;
      font-weight: 700;

      @media #{$lg} {
        font-size: 30px;
      }

      @media #{$md} {
        font-size: 30px;
      }

      @media #{$sm} {
        font-size: 28px;
      }

      @media #{$xs} {
        font-size: 26px;
      }

      span.shape-line {
        position: absolute;
        font-size: 14px;
        color: var(--color-primary);
        left: 75px;
        bottom: -15px;
      }

      /* a {
            color: var(--color-primary);
        } */
    }
  }
}

.teacher-area {
  overflow-x: clip;

  .teacher-area-container {
    @media (max-width: 991px) {
      flex-direction: column;
    }
  }
}

.zoom-area {
  .zoom-area-container {
    @media (max-width: 991px) {
      flex-direction: column;
    }
  }
}

.teacher-img {
  margin-bottom: 45px;
}

@media only screen and (min-width: 768px) and (max-width: 991px),
  only screen and (min-width: 576px) and (max-width: 767px),
  (max-width: 575px) {
  .teacher-img {
    margin-bottom: 95px;
  }
}

.teacher-main-img {
  padding-left: 60px;
  max-width: 100%;
}

.teacher-shape {
  position: absolute;
  top: 10px;
  left: 0;
  z-index: -10;
}

.teacher-shape-02 {
  width: 200px;
  position: absolute;
  left: 0;
  bottom: -45px;
}

.teacher-shape-03 {
  position: absolute;
  top: -113px;
  left: -126px;
  z-index: -1;
}

.teacher-shape-04 {
  position: absolute;
  top: 100px;
  left: -140px;
  z-index: -1;
}

/*  */
.edu-btn {
  display: inline-block;
  height: 55px;
  line-height: 53px;
  text-align: center;
  width: fit-content;
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  background-color: var(--color-primary);
  padding: 0 40px;
  border-radius: 4px;
  transition: all 0.3s ease-out 0s;
  border: 1px solid transparent;
}

.edu-btn:hover {
  background-color: var(--color-secondary);
  color: #141517;
}

.edu-btn:focus {
  color: #ffffff;
  border: 1px solid transparent;
}

/* Zoom */
.zoom-class-wrapper {
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 40px;

  @media #{$md,$sm,$xs} {
    margin-bottom: 60px;
    margin-top: -40px;
  }

  .section-title {
    h2 {
      position: relative;
      line-height: 1.3;
      font-size: 30px;
      font-weight: 700;

      @media #{$lg} {
        font-size: 30px;
      }

      @media #{$md} {
        font-size: 30px;
      }

      @media #{$sm} {
        font-size: 28px;
      }

      @media #{$xs} {
        font-size: 26px;
      }

      span.shape-line {
        position: absolute;
        font-size: 14px;
        color: var(--color-primary);
        bottom: -16px;
        left: 0px;

        [dir="rtl"] & {
          right: 0px;
          left: unset;
        }
      }
    }
  }
}

.zoom-thumb {
  margin-left: 50px;
}

@media only screen and (min-width: 768px) and (max-width: 991px),
  only screen and (min-width: 576px) and (max-width: 767px),
  (max-width: 575px) {
  .zoom-thumb {
    margin-left: 0;
  }
}

.zoom-shape-02 {
  position: absolute;
  top: 0;
  left: 0;
  box-shadow: 0px 20px 80px rgba(28, 51, 84, 0.2);
}

@media only screen and (min-width: 992px) and (max-width: 1199px) {
  .zoom-shape-02 {
    right: 11%;
  }
}

.zoom-shape-01 {
  position: absolute;
  top: -60px;
  left: -7%;
  z-index: -1;
  animation: hero-thumb-sm-animation 4s linear infinite alternate;
}

@media (max-width: 575px) {
  .zoom-shape-01 {
    display: none;
  }
}

@media only screen and (min-width: 768px) and (max-width: 991px),
  only screen and (min-width: 576px) and (max-width: 767px),
  (max-width: 575px) {
  .zoom-class-wrapper {
    margin-bottom: 60px;
    margin-top: -40px;
  }
}

.zoom-thumb-main-img {
  max-width: 100%;
}
</style>
