<template>
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Title with underline -->
        <div class="mb-8">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 inline-block relative">
                Current
                <span class="down-mark-line">
                    Events
                    <!-- <span class="absolute bottom-1 left-0 right-0 h-3 bg-yellow-400 -z-10"></span> -->
                </span>
            </h1>
        </div>

        <!-- Events List -->
        <div class="space-y-4">
            <div v-for="(event, index) in arrayData" :key="index"
                class="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
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
                        <h3 class="text-xl font-semibold text-gray-900 mb-3">
                            {{ event.title }}
                        </h3>
                        <div class="flex flex-col sm:flex-row gap-3 text-sm text-gray-600">
                            <div class="flex items-center gap-2">
                                <v-icon size="18" color="#666">mdi-clock-outline</v-icon>
                                <span>{{ getHour(event) }}</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <v-icon size="18" color="#666">mdi-map-marker</v-icon>
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
</template>

<script setup lang="ts">
interface EventData {
    title: string;
    date: string;
    location: string;
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