<template>
    <div class="edu-about-area about-style-3">
        <div class="container">
            <div class="row g-5 align-items-center">
                <div class="col-lg-6" data-sal-delay="50" data-sal="slide-up" data-sal-duration="800">
                    <div class="about-content">
                        <div class="section-title section-left">
                            <span class="pre-title">About Us</span>
                            <h2 class="title">We Provide Best <span class="color-primary">Education</span> Services For
                                You</h2>
                            <span class="shape-line"><i class="icon-19"></i></span>
                        </div>
                        <ul class="nav nav-tabs" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#about-edu"
                                    type="button" role="tab" aria-selected="true">About EduBlink</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" data-bs-toggle="tab" data-bs-target="#about-mission"
                                    type="button" role="tab" aria-selected="false">Our Mission</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" data-bs-toggle="tab" data-bs-target="#about-vision"
                                    type="button" role="tab" aria-selected="false">Our Vision</button>
                            </li>
                        </ul>
                        <div class="tab-content">
                            <div class="tab-pane fade show active" id="about-edu" role="tabpanel">
                                <p>Magna aliquaenim minim veniam quis nostrud exercitation ullamco laborisLorem ipsum
                                    dolor sit amet consectetur adipisicing elit sed do eius tempor incididunt labore.
                                </p>
                                <ul class="features-list">
                                    <li>Education award achived</li>
                                    <li>Available online courses</li>
                                </ul>
                            </div>
                            <div class="tab-pane fade" id="about-mission" role="tabpanel">
                                <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                    culpa.</p>
                                <ul class="features-list">
                                    <li>Industry Expert Instructor</li>
                                    <li>Up-to-Date Course Content</li>
                                </ul>
                            </div>
                            <div class="tab-pane fade" id="about-vision" role="tabpanel">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                    exer.</p>
                                <ul class="features-list">
                                    <li>Online Remote Learning</li>
                                    <li>Lifetime Access For Learning</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="about-image-gallery">
                        <img class="main-img-1" data-sal-delay="100" data-sal="slide-up" data-sal-duration="800"
                            src="/img/about/about-04.webp" alt="About Image">
                        <img class="main-img-2" data-sal-delay="100" data-sal="slide-left" data-sal-duration="800"
                            src="/img/about/about-05.webp" alt="About Image">
                        <ul class="shape-group">
                            <li class="shape-1 scene" data-sal-delay="500" data-sal="fade" data-sal-duration="200">
                                <img data-depth="2" src="/img/about/shape-13.png" alt="Shape">
                            </li>
                            <li class="shape-2 scene" data-sal-delay="500" data-sal="fade" data-sal-duration="200">
                                <img data-depth="-2" src="/img/about/shape-39.png" alt="Shape">
                            </li>
                            <li class="shape-3 scene" data-sal-delay="500" data-sal="fade" data-sal-duration="200">
                                <img data-depth="2" src="/img/about/shape-07.png" alt="Shape">
                            </li>
                            <li class="shape-4" data-sal-delay="500" data-sal="fade" data-sal-duration="200">
                                <span></span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <ul class="shape-group">
            <li class="shape-5">
                <img class="rotateit" src="/img/about/shape-13.png" alt="Shape">
            </li>
            <li class="shape-6">
                <span></span>
            </li>
        </ul>
    </div>
</template>
<style lang="scss" scoped>
@import "@/assets/css/tailwind.scss";
@import "@/assets/css/helpers";

.shape-group {
  @extend %liststyle;
}
.about-style-3 {
    padding: 90px 0 120px;
    position: relative;

    @media #{$md-layout} {
        padding: 90px 0 100px;
    }

    @media #{$sm-layout} {
        padding: 80px 0;
    }

    .about-content {
        padding-right: 30px;
        padding-left: 0;

        @media #{$large-mobile} {
            padding-right: 0;
        }

        .section-title {
            margin-bottom: 34px;
        }

        .nav-tabs {
            border-bottom: none;
            margin: -8px -16px;
            padding-bottom: 20px;

            .nav-item {
                margin: 8px 16px;
                position: relative;

                &:after {
                    content: "";
                    height: 14px;
                    width: 2px;
                    background-color: #e5e5e5;
                    position: absolute;
                    top: 2px;
                    right: -18px;
                }

                &:last-child {
                    &:after {
                        display: none;
                    }
                }
            }

            .nav-link {
                color: var(--color-heading);
                font-size: 17px;
                font-weight: var(--p-semi-bold);
                font-family: var(--font-secondary);
                background-color: transparent;
                border: none;
                padding: 0;
                position: relative;
                padding-bottom: 1px;

                &:after {
                    content: "";
                    height: 2px;
                    width: 0;
                    background-color: var(--color-secondary);
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    opacity: 0;
                    transition: var(--transition);
                }

                &:hover,
                &.active {
                    color: var(--color-secondary);

                    &:after {
                        width: 100%;
                        opacity: 1;
                    }
                }
            }
        }

        .tab-content {
            p {
                margin-bottom: 20px;
            }

            .features-list {
                li {
                    &:before {
                        color: var(--color-secondary);
                    }
                }
            }
        }
    }

    .about-image-gallery {
        padding: 80px 0 65px 30px;

        @media #{$md-layout} {
            text-align: left;
            padding: 20px 0 65px;
        }

        @media #{$sm-layout} {
            padding: 20px 0 65px;
        }

        @media #{$small-mobile} {
            padding: 0;
        }

        .main-img-2 {
            position: absolute;
            bottom: 0;
            right: 0;

            @media #{$md-layout} {
                right: 115px;
            }

            @media #{$small-mobile} {
                display: none;
            }
        }

        .shape-group {
            @extend %liststyle;

            li {
                position: absolute;
                z-index: -1;

                img {
                    position: initial;
                }

                &.shape-1 {
                    left: inherit;
                    right: 95px;
                    top: -15px;
                }

                &.shape-2 {
                    left: inherit;
                    bottom: inherit;
                    right: 39px;
                    top: 13px;
                    z-index: -2;
                }

                &.shape-3 {
                    top: inherit;
                    right: inherit;
                    left: -2px;
                    bottom: 33px;
                }

                &.shape-4 {
                    right: 40px;
                    bottom: -25px;
                    z-index: -1;

                    span {
                        display: block;
                        height: 320px;
                        width: 320px;
                        border: 1px solid var(--color-border);
                        border-radius: 50%;
                    }
                }
            }
        }
    }

    .shape-group {
        @extend %liststyle;

        @media #{$sm-layout} {
            display: none;
        }

        li {
            position: absolute;
            z-index: -1;

            img {
                position: initial;
            }

            &.shape-5 {
                left: 110px;
                top: 20px;

                @media #{$lg-layout-1} {
                    left: 0;
                    top: 0;
                }

                @media #{$custom-lg-device-eight} {
                    left: -90px;
                }
            }

            &.shape-6 {
                top: -350px;
                left: 80px;
                z-index: -1;

                span {
                    display: block;
                    height: 470px;
                    width: 470px;
                    border: 1px solid var(--color-border);
                    border-radius: 50%;
                }

                @media #{$lg-layout-1} {
                    left: 0;
                }

                @media #{$custom-lg-device-eight} {
                    left: -90px;
                }
            }
        }
    }
}

.edu-about-area {
    .about-content {
        .features-list {
            li {
                padding-left: 0;
                padding-right: 35px;

                &::before {
                    left: inherit;
                    right: 0;
                }
            }
        }
    }

    .award-status {
        right: inherit;
        left: 70px;

        .inner {
            .icon {
                margin-right: 0;
            }

            .content {
                text-align: right;
                margin-right: 15px;
            }
        }
    }

    &.about-style-1 {

        .about-image-gallery {
            .video-box {
                right: inherit;
                left: 50px;
            }

            .shape-group {
                li {
                    &.shape-1 {
                        left: inherit;
                        right: -100px;
                    }

                    &.shape-2 {
                        left: inherit;
                        right: -50px;
                    }

                    &.shape-3 {
                        right: inherit;
                        left: 120px;
                    }
                }
            }
        }

        .shape-group {
            li {
                right: inherit;
                left: -210px;
            }
        }
    }

    &.about-style-2 {
        .about-image-gallery {
            padding: 80px 70px 60px 0;

            .author-box {
                right: inherit;
                left: 0px;
            }

            .shape-group {
                li {
                    &.shape-1 {
                        left: inherit;
                        right: -80px;
                    }

                    &.shape-2 {
                        left: inherit;
                        right: -55px;
                    }

                    &.shape-3 {
                        right: inherit;
                        left: -5px;
                    }
                }
            }
        }

        .about-content {
            padding-left: inherit;
            padding-right: 80px;

            @media #{$md-layout-1} {
                padding-right: 0;
            }
        }

        .shape-group {
            li {
                right: inherit;
                left: -210px;
            }
        }

        .award-status {
            left: inherit;
            right: -20px;

            @media #{$custom-lg-device-eight} {
                right: 20px;
            }

            @media #{$md-layout-1} {
                right: 20px;
            }
        }
    }

    &.about-style-3 {
        .about-content {
            .nav-tabs {
                .nav-item {
                    &::after {
                        top: 6px;
                        right: inherit;
                        left: -18px;
                    }
                }
            }
        }

        .about-image-gallery {
            padding: 80px 30px 65px 0;
            text-align: right;

            .main-img-2 {
                right: inherit;
                left: 0;

                @media #{$md-layout} {
                    left: 115px;
                }
            }

            .shape-group {
                li {
                    &.shape-1 {
                        right: inherit;
                        left: 95px;
                    }

                    &.shape-2 {
                        right: inherit;
                        left: 39px;
                    }

                    &.shape-3 {
                        right: -3px;
                        left: inherit;
                    }

                    &.shape-4 {
                        right: inherit;
                        left: 40px;
                    }
                }
            }
        }

        .shape-group {
            li {
                &.shape-1 {
                    left: inherit;
                    right: 110px;
                }

                &.shape-2 {
                    left: inherit;
                    right: 80px;
                }
            }
        }
    }

    &.about-style-4 {
        .about-image-gallery {
            margin-right: inherit;
            margin-left: 30px;

            .main-img-2 {
                right: inherit;
                left: 0;
            }

            .shape-group {
                .shape-1 {
                    right: inherit;
                    left: 85px;
                }

                .shape-2 {
                    right: inherit;
                    left: 31px;
                }

                .shape-3 {
                    left: inherit;
                    right: -32px;
                }

                .shape-4 {
                    right: inherit;
                    left: 70px;
                }
            }
        }
    }

    &.about-style-5 {
        .about-image-gallery {
            .shape-group {
                li {
                    &.shape-1 {
                        right: inherit;
                        left: -10px;
                    }

                    &.shape-2 {
                        left: inherit;
                        right: -80px;
                    }
                }
            }
        }

        .shape-group {
            li {
                &.shape-1 {
                    right: inherit;
                    left: 180px;
                }
            }
        }

        .about-content {
            padding-left: inherit;
            padding-right: 30px;
        }
    }

    &.about-style-6 {
        .about-image-gallery {
            .main-img-2 {
                text-align: left;
            }

            .shape-group {
                .shape-1 {
                    right: inherit;
                    left: 34px;
                }

                .shape-2 {
                    left: inherit;
                    right: -15px;
                }

                .shape-3 {
                    left: inherit;
                    right: 20px;
                }
            }
        }
    }

    &.about-style-7 {
        .about-image-gallery {
            text-align: left;
            padding: 80px 0 0 50px;

            .main-img-2 {
                left: -22px;
                right: inherit;
            }

            .shape-group {
                li {
                    &.shape-1 {
                        left: inherit;
                        right: 40px;
                    }

                    &.shape-2 {
                        left: inherit;
                        right: 40px;
                    }

                    &.shape-3 {
                        right: inherit;
                        left: -10px;
                    }

                    &.shape-4 {
                        left: inherit;
                        right: 10px;
                    }
                }
            }
        }

        >.shape-group {
            >li {
                left: inherit;
                right: 125px;
            }
        }
    }

    &.about-style-8 {
        &::after {
            left: inherit;
            right: -70px;
        }

        .about-content {
            padding-right: inherit;
            padding-left: 40px;

            .about-mission {
                .single-item {
                    padding-right: inherit;
                    padding-left: 40px;
                }
            }
        }

        .about-image-gallery {
            .shape-group {
                li {
                    &.shape-1 {
                        left: inherit;
                        right: -90px;
                    }

                    &.shape-2 {
                        left: inherit;
                        right: 25px;
                    }

                    &.shape-3 {
                        right: inherit;
                        left: -70px;
                    }

                    &.shape-4 {
                        right: inherit;
                        left: -165px;
                    }
                }
            }
        }
    }
}
</style>