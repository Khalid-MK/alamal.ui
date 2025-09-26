<template>
    <h1>
        {{ params.id }}
    </h1>
    <div class="hero-area course-item-height"
        :style="{ backgroundImage: `url(/img/courses/banner.png)`, backgroundSize: 'cover' }">
        <div class="container">
            <div class="content-wrapper">
                <div class="hero-content">
                    <div class="hero-course-1-text">
                        <h2>{{ $t("CourseDetails") }}</h2>
                    </div>
                    <div class="course-title-breadcrumb">
                        <nav>
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item">
                                    <NuxtLink to="/">{{ $t("Home") }}</NuxtLink>
                                </li>
                                <li class="breadcrumb-item"><span>{{ $t("Courses") }}</span></li>
                                <li class="breadcrumb-item active" aria-current="page">{{ title }}</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.hero-area.course-item-height {
    position: relative;
    min-height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 116px;
    z-index: 2;

    &::before {
        position: absolute;
        content: "";
        height: 100%;
        width: 100%;
        background: #333;
        opacity: 0.7;
        z-index: -1;
        top: 0;
        left: 0;
    }
}

.container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 15px;
}

.content-wrapper {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
}

.hero-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    max-width: 100%;
}

.hero-course-1-text {
    margin-bottom: 20px;

    h2 {
        font-size: 60px;
        font-weight: 700;
        color: #fff;
        margin-bottom: 15px;
        line-height: 1.2;

        @media (max-width: 991px) {
            font-size: 54px;
        }

        @media (max-width: 767px) {
            font-size: 35px;
        }
    }
}

// Breadcrumb styles
.course-title-breadcrumb {
    display: flex;
    width: 100%;

    nav {
        width: 100%;
    }
}

.breadcrumb {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    margin: 0;
    padding: 0;
    background: transparent;
}

.breadcrumb-item {
    display: flex;
    align-items: center;

    a {
        color: #fff;
        text-decoration: none;
        transition: color 0.3s ease;

        &:hover {
            color: #fff;
            opacity: 0.8;
        }
    }

    span {
        color: #fff;
    }

    &.active {
        color: #fff;
    }

    & + .breadcrumb-item::before {
        display: inline-flex;
        padding-right: 0.5rem;
        padding-left: 0.5rem;
        content: "\f105";
        font-family: "Font Awesome 5 Pro";
        color: #fff;
        align-items: center;
    }
}

[dir="rtl"] .breadcrumb-item + .breadcrumb-item::before {
    padding-right: 0;
    padding-left: 0.5rem;
    content: "\f105";
    transform: rotate(180deg);
    font-family: "Font Awesome 5 Pro";
    color: #fff;
}

.course-title-breadcrumb.breadcrumb-top {
    margin-top: -90px;
}

.breadcrumb-item.white-color {
    a {
        color: #333;
    }

    &::before {
        color: #333;
    }
}

.banner-title-wrapper {
    max-width: 650px;
    margin-right: auto;
    margin-left: auto;
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

// Responsive flexbox adjustments
@media (max-width: 767px) {
    .content-wrapper {
        padding: 20px 0;
    }

    .hero-content {
        align-items: center;
        text-align: center;
    }

    .course-title-breadcrumb {
        justify-content: center;

        .breadcrumb {
            justify-content: center;
        }
    }
}

@media (max-width: 991px) {
    .hero-content {
        align-items: flex-start;
        text-align: left;
    }
}
</style>

<script setup lang="ts">
// Define props
defineProps<{
    title: string
}>()

const { params } = useRoute()
console.log("route", params.id)
</script>