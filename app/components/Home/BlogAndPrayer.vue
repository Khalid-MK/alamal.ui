<script setup lang="ts">
// Define the data for the component
const upcomingEvents = [
    {
        title: 'Quran, Hadith Daily Life',
        date: 'Dec 27, 2025',
        time: '9:30 am to 1:15 pm',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do...',
        imageUrl: '/img/Blogs/islamic-meeting-event.webp'
    },
    {
        title: 'Modern Islam Lifestyle',
        date: 'Dec 27, 2025',
        time: '10:30 am to 2:15 pm',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do...',
        imageUrl: '/img/Blogs/islamic-meeting-event.webp'
    }
];

const prayerTimes = [
    { salat: 'Fajr', start: '3:48 AM', iqamah: '4:03 AM', isAccent: true },
    { salat: 'Zuhr', start: '11:53 AM', iqamah: '12:08 PM', isAccent: false },
    { salat: 'Asr', start: '3:13 PM', iqamah: '3:28 PM', isAccent: false },
    { salat: 'Magrib', start: 'Magrib', iqamah: '6:17 PM', isAccent: true },
    { salat: 'Isha', start: '7:56 PM', iqamah: '8:11 PM', isAccent: true },
    { salat: 'Jummah', start: '1:30 PM', iqamah: '2:00 PM', isAccent: false }
];

// Helper function to handle image loading errors
const handleImageError = (event: Event) => {
    const imgElement = event.target as HTMLImageElement;
    imgElement.onerror = null; // Prevent infinite loop
    imgElement.src = 'https://placehold.co/300x150/CCCCCC/000000?text=Placeholder';
};
</script>

<template>
    <div class="p-4 sm:p-8  min-h-screen">
        <div class="max-w-7xl mx-auto bg-white p-6 sm:p-10">

            <!-- Main Layout: Stacks vertically on small screens, side-by-side on large screens -->
            <div class="flex flex-col lg:flex-row lg:space-x-12 space-y-12 lg:space-y-0">

                <!-- SECTION 1: UPCOMING EVENTS -->
                <div class="flex-1">
                    <h2 class="text-3xl font-extrabold mb-8 text-center sm:text-left text-primary">
                        Blogs
                    </h2>
                    <div class="w-24 h-1 bg-secondary mx-auto sm:mx-0 -mt-6 mb-8"></div>

                    <!-- Event Cards Container: Stacks vertically on mobile, side-by-side on large screens -->
                    <div class="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
                        <div v-for="event in upcomingEvents" :key="event.title"
                            class="group w-full md:w-1/2 bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden border border-gray-100">
                            <!-- Image Container: Added to handle the hover effect (overlay, rotation, zoom) -->
                            <div class="relative overflow-hidden">
                                <!-- Image with Transition and Hover Effects (Zoom and Rotate 3deg) -->
                                <img :src="event.imageUrl" alt="Event Image"
                                    class="w-full h-40 object-cover transition-transform duration-500 ease-out group-hover:scale-110 group-hover:rotate-3"
                                    @error="handleImageError" />
                                <!-- Black Overlay with Transition (Opacity changes on hover) -->
                                <div
                                    class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                </div>
                            </div>

                            <div class="p-6">
                                <h3 class="text-xl font-bold text-primary mb-3">{{ event.title }}</h3>
                                <div class="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                                    <span class="flex items-center">
                                        <!-- Date Icon (Calendar) -->
                                        <svg class="w-4 h-4 mr-1 text-secondary" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z">
                                            </path>
                                        </svg>
                                        {{ event.date }}
                                    </span>
                                    <span class="flex items-center">
                                        <!-- Time Icon (Clock) -->
                                        <svg class="w-4 h-4 mr-1 text-secondary" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                        {{ event.time }}
                                    </span>
                                </div>
                                <p class="text-gray-700 text-sm leading-relaxed">
                                    {{ event.description }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- SECTION 2: PRAYER TIMES -->
                <div class="lg:w-96">
                    <h2 class="text-3xl font-extrabold mb-8 text-center lg:text-left text-primary">
                        <span class="text-secondary">Prayer</span> Times
                    </h2>
                    <div class="w-24 h-1 bg-primary mx-auto lg:mx-0 -mt-6 mb-8"></div>

                    <!-- Prayer Times Table -->
                    <div class="overflow-x-auto">
                        <table class="w-full text-left table-fixed border-collapse">
                            <thead>
                                <tr class="text-primary font-semibold text-base border-b-2 border-primary/20">
                                    <th class="w-1/3 py-3 px-2">Salat</th>
                                    <th class="w-1/3 py-3 px-2">Start</th>
                                    <th class="w-1/3 py-3 px-2">Iqamah</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="prayer in prayerTimes" :key="prayer.salat"
                                    class="text-gray-800 border-b border-gray-100 last:border-b-0">
                                    <td
                                        :class="['py-3 px-2 font-medium', prayer.isAccent ? 'text-secondary' : 'text-primary']">
                                        {{ prayer.salat }}
                                    </td>
                                    <td class="py-3 px-2 text-primary font-medium">{{ prayer.start }}</td>
                                    <td class="py-3 px-2 text-primary font-medium">{{ prayer.iqamah }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- Location and Date Footer -->
                    <div class="mt-8 pt-4 text-center border-t border-gray-200">
                        <p class="text-sm text-primary font-semibold mb-1">
                            Location: London, UK
                        </p>
                        <p class="text-sm text-gray-600">
                            Saturday, 20th September, 2025
                        </p>
                        <p class="text-xs text-gray-500">
                            (26th Rabi'-Al-Awwal, 1447)
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

/* Custom styling for the table columns to ensure fixed width layout */
.table-fixed {
    table-layout: fixed;
}
</style>
