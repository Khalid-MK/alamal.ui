<template>
    <ul>
        <li class="menu-item-has-children">
            <a href="javascript:void(0)">{{ "Test Courses" }}</a>
            <ul class="sub-menu">
                <template v-for="section in courses" :key="section.id">
                    <li v-if="section.departments" class="menu-item-has-children">
                        <a href="javascript:void(0)">{{ section[locale] }}</a>
                        <ul class="sub-menu">
                            <template v-for="dept in section.departments" :key="dept.id">
                                <li v-if="dept.courses" class="menu-item-has-children">
                                    <a href="javascript:void(0)">{{ dept[locale] }}</a>
                                    <ul class="sub-menu">
                                        <li v-for="course in dept.courses" :key="course.id">
                                            <NuxtLink :to="'/shop?course=' + slugify(course[locale])">{{ course[locale]
                                            }}
                                            </NuxtLink>
                                        </li>
                                    </ul>
                                </li>
                            </template>
                        </ul>
                    </li>
                </template>
            </ul>
        </li>
    </ul>
</template>
<script setup lang="ts">
import { computed } from "vue";
import courses from "@/constant/courses.json";

const { locale } = useI18n();
const router = useRouter();

function slugify(text: string) {
  return text
    .toString()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}
</script>
<style lang="css" scoped>
ul li:hover.menu-item-has-children::after {
    color: #2467EC;
}

ul li.menu-item-has-children {
    position: relative;
}

ul li.menu-item-has-children:after {
    position: absolute;
    content: "\f107";
    font-size: 12px;
    color: #212237;
    top: 50%;
    transform: translateY(-50%);
    right: -14px;
    font-family: "Font Awesome 5 Pro";
    transition: all 0.3s ease-out 0s;
}

ul li ul li.menu-item-has-children::after {
    right: 14px;
}

.mm-menu ul li.has-droupdown ul.sub-menu {
  padding-left: 0;
  list-style: none;
}

.mm-menu ul li.has-droupdown ul.sub-menu li {
  padding-left: 15px;
}

</style>