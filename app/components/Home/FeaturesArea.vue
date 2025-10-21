<template>
  <section :dir="direction" class="features-area-3">
    <div class="container">
      <div class="features-grid-wrap">
        <div v-for="item in features" :key="item.id" :class="[
          'features-box',
          'features-style-3',
          item.colorClass,
          'edublink-svg-animate',
        ]" ref="cards">
          <div class="icon">
            <img class="svgInject" :src="item.icon" :alt="item.title + ' icon'" loading="lazy" />
          </div>
          <div class="content">
            <h4 class="title">{{ item.title }}</h4>
            <p>{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import featuresData from "@/constant/FeatureArea.json"

const { locale, localeProperties } = useI18n()
const direction = computed(() => localeProperties.value.dir)
const features = computed(() => featuresData[locale.value])

</script>
<style lang="scss" scoped>
@import "@/assets/css/tailwind.scss";
@import "@/assets/css/helpers";

/*-------------------
  Features Styles
---------------------*/
.features-area-1 {
  .features-box {
    svg {
      max-width: 37px;
    }

    &:hover {
      .icon {
        svg {
          path {
            stroke: var(--color-white);
          }
        }
      }
    }
  }
}

.features-box {
  padding: 50px 30px;
  border-radius: 4px;
  box-shadow: var(--shadow-darker);
  background-color: var(--color-white);
  transition: var(--transition);

  .icon {
    height: 80px;
    width: 80px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    margin: 0 auto 28px;
    transition: var(--transition);
  }

  .content {
    font-family: var(--font-secondary);

    .title {
      margin-bottom: 15px;
      transition: var(--transition);
      font-size: var(--h4);
      font-weight: var(--p-semi-bold);

      span {
        display: block;
      }
    }

    p {
      color: var(--color-heading);
      margin-bottom: 0;
      transition: var(--transition);
    }
  }

  &.color-primary-style {
    .icon {
      background-color: rgba(26, 182, 157, 0.1);
      color: var(--color-primary);

      &:after {
        background-color: var(--color-primary);
      }
    }

    &:hover {
      .icon {
        background-color: rgba(26, 182, 157, 1);
        color: var(--color-white);
      }
    }
  }

  &.color-secondary-style {
    .icon {
      background-color: rgba(238, 74, 98, 0.1);
      color: var(--color-secondary);

      &:after {
        background-color: var(--color-secondary);
      }
    }

    &:hover {
      .icon {
        background-color: rgba(238, 74, 98, 1);
        color: var(--color-white);
      }
    }
  }

  &.color-extra02-style {
    .icon {
      background-color: rgba(142, 86, 255, 0.1);
      color: var(--color-extra02);

      &:after {
        background-color: var(--color-extra02);
      }
    }

    &:hover {
      .icon {
        background-color: rgba(142, 86, 255, 1);
        color: var(--color-white);
      }
    }
  }

  &.features-style-3 {
    background-color: transparent;
    box-shadow: none;
    display: flex;
    align-items: flex-start;
    padding: 50px 25px 42px;
    gap: 20px;

    // Tablet
    @media #{$md-layout} {
      padding: 40px 30px;
      gap: 15px;
    }

    // Mobile
    @media #{$sm-layout} {
      padding: 30px 20px;
      gap: 15px;
    }

    // Extra small mobile
    @media #{$large-mobile} {
      padding: 25px 15px;
      gap: 15px;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .edublink-svg-animate {
      svg {
        path {
          stroke: #ffffff !important;
          max-width: 38px;
        }
      }
    }

    &:first-child {
      padding-left: 50px;

      @media #{$md-layout} {
        padding-left: 30px;
      }

      @media #{$sm-layout} {
        padding-left: 20px;
      }

      @media #{$large-mobile} {
        padding-left: 15px;
      }
    }

    .icon {
      margin-top: 2px;
      height: auto;
      width: auto;
      min-width: 50px;
      background-color: transparent;
      font-size: 40px;
      margin-bottom: 0;
      flex-shrink: 0;

      @media #{$large-mobile} {
        margin-top: 0;
        font-size: 36px;
        min-width: 45px;
      }

      img {
        max-width: 100%;
        height: auto;
      }
    }

    .content {
      flex: 1;

      .title {
        font-size: clamp(1.125rem, 2vw, var(--h4));
        line-height: 1.3;

        @media #{$large-mobile} {
          margin-bottom: 10px;
        }
      }

      p {
        color: var(--color-body);
        font-size: clamp(0.875rem, 1.5vw, 1rem);
        line-height: 1.6;
      }
    }

    &:hover {
      .icon {
        background-color: transparent;
        color: inherit;
      }

      &.color-primary-style {
        background-color: rgba(26, 182, 157, 0.07);

        &:hover {
          .icon {
            color: var(--color-primary);
          }
        }
      }

      &.color-secondary-style {
        &:hover {
          background-color: rgba(238, 74, 98, 0.07);

          .icon {
            color: var(--color-secondary);
          }
        }
      }

      &.color-extra02-style {
        &:hover {
          background-color: rgba(142, 86, 255, 0.07);

          .icon {
            color: var(--color-extra02);
          }
        }
      }
    }
  }
}

.features-grid-wrap {
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  @media #{$md-layout} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media #{$sm-layout} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media #{$large-mobile} {
    grid-template-columns: repeat(1, 1fr);
  }
}

.features-area-3 {
  padding: 0 15px;

  @media only screen and (min-width: 768px) {
    padding: 0 30px;
  }

  .features-grid-wrap {
    grid-template-columns: repeat(3, 1fr);
    background-color: var(--color-white);
    box-shadow: 0px 20px 40px 0px rgba(42, 11, 88, 0.1);
    border-radius: 5px;
    margin-top: -120px;
    z-index: 2;
    bottom: 0px;
    position: relative;

    // Tablet breakpoint
    @media only screen and (max-width: 991px) {
      grid-template-columns: repeat(2, 1fr);
      margin-top: -80px;
    }

    // Mobile breakpoint
    @media only screen and (max-width: 767px) {
      grid-template-columns: repeat(1, 1fr);
      margin-top: -60px;
      margin-left: 15px;
      margin-right: 15px;
    }

    // Extra small mobile
    @media only screen and (max-width: 480px) {
      margin-top: -40px;
      border-radius: 4px;
    }
  }
}

.container {
  margin: 0 auto;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;

  @media only screen and (min-width: 576px) {
    max-width: 540px;
  }

  @media only screen and (min-width: 768px) {
    max-width: 720px;
  }

  @media only screen and (min-width: 992px) {
    max-width: 960px;
  }

  @media only screen and (min-width: 1200px) {
    max-width: 1185px;
  }
}
</style>