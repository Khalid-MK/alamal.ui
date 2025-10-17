<template>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <!-- Current Events Section -->
            <div>
                <!-- Title with underline -->
                <div class="mb-8">
                    <h1 class="text-3xl md:text-4xl font-bold text-gray-900 inline-block relative">
                        Current
                        <span class="down-mark-line">
                            Events
                        </span>
                    </h1>
                </div>

                <!-- Events List -->
                <div class="space-y-4">
                    <div v-for="(event, index) in arrayData" :key="index"
                        class="flex flex-col sm:flex-row gap-4 items-start">
                        <!-- Date Box -->
                        <div class="flex-shrink-0">
                            <div class="bg-yellow-500 text-white rounded-lg overflow-hidden shadow-md w-20 text-center">
                                <div class="py-3 px-4">
                                    <div class="text-3xl font-bold leading-none">
                                        {{ getDay(event.date) }}
                                    </div>
                                </div>
                                <div class="bg-white text-gray-700 py-2 px-2 text-sm font-medium">
                                    {{ getMonthYear(event.date) }}
                                </div>
                            </div>
                        </div>

                        <!-- Event Info Card -->
                        <div
                            class="flex-grow flex items-start bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
                            <div class="flex-grow">
                                <h3 class="text-lg font-semibold text-gray-900 mb-3">
                                    {{ event.title }}
                                </h3>
                                <div class="flex flex-col sm:flex-row gap-3 text-sm text-gray-600">
                                    <div class="flex items-center gap-2">
                                        <v-icon size="16" color="#666">mdi-clock-outline</v-icon>
                                        <span>{{ getHour(event) }}</span>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <v-icon size="16" color="#666">mdi-map-marker</v-icon>
                                        <span>{{ event.location }}</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Arrow Icon -->
                            <div class="flex-shrink-0 ml-4">
                                <button
                                    class="w-10 h-10 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-colors duration-200">
                                    <v-icon size="20" color="#999">mdi-arrow-right</v-icon>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Student's Feedback Section -->
            <div>
                <!-- Title -->
                <div class="mb-8">
                    <h1 class="text-3xl md:text-4xl font-bold text-gray-900">
                        Student's Feedback
                    </h1>
                </div>

                <!-- Feedback Card -->
                <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
                    <!-- Decorative Pattern -->
                    <div class="absolute top-0 right-0 w-32 h-32 opacity-5">
                        <svg viewBox="0 0 100 100" class="w-full h-full">
                            <pattern id="diagonal-lines" x="0" y="0" width="10" height="10"
                                patternUnits="userSpaceOnUse">
                                <line x1="0" y1="0" x2="10" y2="10" stroke="#000" stroke-width="1" />
                            </pattern>
                            <rect width="100" height="100" fill="url(#diagonal-lines)" />
                        </svg>
                    </div>

                    <!-- Header with Avatar and Quote Icons -->
                    <div class="flex items-start justify-between mb-4 relative z-10">
                        <div class="flex items-center gap-3">
                            <div class="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                                <img v-if="feedback.avatar" :src="feedback.avatar" :alt="feedback.name"
                                    class="w-full h-full object-cover" />
                                <div v-else
                                    class="w-full h-full flex items-center justify-center text-gray-500 font-semibold">
                                    {{ feedback.name.charAt(0) }}
                                </div>
                            </div>
                            <div>
                                <h3 class="font-semibold text-gray-900">{{ feedback.name }}</h3>
                                <p class="text-sm text-gray-500">{{ feedback.role }}</p>
                            </div>
                        </div>

                        <!-- Quote Icons -->
                        <div class="flex gap-2">
                            <div class="w-8 h-8 rounded bg-gray-50 flex items-center justify-center">
                                <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                                </svg>
                            </div>
                            <div class="w-8 h-8 rounded bg-gray-50 flex items-center justify-center">
                                <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18 7h-3l-2 4v6h6v-6h-3zm-8 0H7L5 11v6h6v-6h-3z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <!-- Feedback Title -->
                    <h4 class="text-lg font-semibold text-blue-600 mb-3">
                        {{ feedback.title }}
                    </h4>

                    <!-- Feedback Content -->
                    <p class="text-gray-600 text-sm leading-relaxed mb-4">
                        {{ feedback.content }}
                    </p>

                    <!-- Star Rating -->
                    <div class="flex gap-1">
                        <svg v-for="star in 5" :key="star" class="w-5 h-5 text-yellow-400" fill="currentColor"
                            viewBox="0 0 20 20">
                            <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface EventData {
    title: string;
    date: string;
    location: string;
}

interface FeedbackData {
    name: string;
    role: string;
    avatar?: string;
    title: string;
    content: string;
    rating: number;
}

const arrayData: EventData[] = [
    {
        location: "Zeoyan Stadium, London",
        date: "Thu Jan 29 2023 12:30:00",
        title: "Education Autumn Tour",
    },
    {
        location: "Zeoyan Stadium, London",
        date: "Fri May 20 2023 10:30:00",
        title: "Education Summer Tour",
    },
    {
        location: "Zeoyan Stadium, London",
        date: "Sat Jul 25 2023 09:30:00",
        title: "Education Spring Tour",
    },
];

const feedback: FeedbackData = {
    name: "Richard Joseph",
    role: "Student",
    avatar: "", // Add avatar URL here if needed
    title: "Helpful Instructors !",
    content: "There are so many websites out there that have not considered the overall usability of their visually impaired users. When it comes to designing better links.",
    rating: 5
};

function getDay(dateString: string): string {
    const day = dateString.split(" ")[2];
    return day || "";
}

function getMonthYear(dateString: string): string {
    const parts = dateString.split(" ");
    const month = parts[1] || "";
    const year = parts[3]?.slice(2) || "";
    return `${month} ${year}`;
}

function getHour(event: EventData): string {
    const timePart = event.date.split(" ")[4];
    if (!timePart) return "";

    const [hour, minutes] = timePart.split(":");
    const hourNum = parseInt(hour ?? "0");
    const period = hourNum >= 12 ? "PM" : "AM";
    const hour12 = hourNum % 12 || 12;

    return `${hour12}:${minutes} ${period}`;
}
</script>

<style lang="scss" scoped>
.down-mark-line {
    position: relative;
    z-index: 2;
    display: inline-block;
}

.down-mark-line::before {
    position: absolute;
    content: "";
    left: 0;
    bottom: -5px;
    width: 100%;
    z-index: -1;
    height: 100%;
    background: url(/img/icon/down-mark-line.png);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: bottom;
    animation: section-animation 3s infinite;
}

@keyframes section-animation {
    0% {
        width: 0;
    }

    15% {
        width: 100%;
    }

    85% {
        opacity: 1;
    }

    90% {
        width: 100%;
        opacity: 0;
    }

    to {
        width: 0;
        opacity: 0;
    }
}
</style>