<template>
    <!-- Enhanced Audio Player -->
    <div class="player-container">
        <h3 class="player-title">{{ $t("ListenHolyQuran") }}</h3>

        <div class="quran-player">

            <div class="player-info">
                <span class="surah-name">SURAH AL-FATIHA</span>
            </div>
            <!-- Progress Bar -->
            <div class="progress-container">
                <div class="progress-bar" ref="progressBar" @click="handleProgressClick">
                    <div class="progress-fill" :style="{ width: progressPercent + '%' }">
                        <div class="progress-thumb"></div>
                    </div>
                </div>
                <div class="time-display">
                    <span>{{ formatTime(currentTime) }}</span>
                    <span>{{ formatTime(duration) }}</span>
                </div>
            </div>

            <!-- Controls -->
            <div class="player-controls">
                <!-- Volume Control -->
                <div class="volume-control">
                    <button @click="toggleMute" class="control-btn">
                        <svg v-if="isMuted || volume === 0" width="20" height="20" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2">
                            <path d="M11 5L6 9H2v6h4l5 4V5z" />
                            <line x1="23" y1="9" x2="17" y2="15" />
                            <line x1="17" y1="9" x2="23" y2="15" />
                        </svg>
                        <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2">
                            <path d="M11 5L6 9H2v6h4l5 4V5z" />
                            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                        </svg>
                    </button>
                    <input type="range" min="0" max="1" step="0.01" :value="isMuted ? 0 : volume"
                        @input="handleVolumeChange" class="volume-slider" />
                </div>

                <!-- Playback Controls -->
                <div class="playback-controls">
                    <button @click="skipTime(-10)" class="control-btn">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2">
                            <polygon points="19 20 9 12 19 4 19 20" />
                            <line x1="5" y1="19" x2="5" y2="5" />
                        </svg>
                    </button>

                    <button @click="togglePlay" class="play-btn">
                        <svg v-if="isPlaying" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                            <rect x="6" y="4" width="4" height="16" />
                            <rect x="14" y="4" width="4" height="16" />
                        </svg>
                        <svg v-else width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                    </button>

                    <button @click="skipTime(10)" class="control-btn">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2">
                            <polygon points="5 4 15 12 5 20 5 4" />
                            <line x1="19" y1="5" x2="19" y2="19" />
                        </svg>
                    </button>
                </div>

                <!-- Speed, Download, Share -->
                <div class="right-controls">
                    <div class="speed-control">
                        <button @click="showSpeedMenu = !showSpeedMenu" class="speed-btn">
                            {{ playbackRate }}x
                        </button>

                        <div v-if="showSpeedMenu" class="speed-menu">
                            <button v-for="speed in [0.5, 0.75, 1, 1.25, 1.5, 2]" :key="speed"
                                @click="changeSpeed(speed)" :class="{ active: playbackRate === speed }">
                                {{ speed }}x
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Hidden Audio Element -->
            <audio ref="audioPlayer" @timeupdate="updateTime" @loadedmetadata="updateDuration" @ended="handleEnded">
                <source src="/audio/videoplayback.m4a" type="audio/mpeg" />
            </audio>
        </div>
    </div>
</template>
<script setup lang="ts">
// Audio Player State
const audioPlayer = ref<HTMLAudioElement | null>(null);
const progressBar = ref<HTMLDivElement | null>(null);
const isPlaying = ref(false);
const currentTime = ref(0);
const duration = ref(0);
const volume = ref(1);
const isMuted = ref(false);
const playbackRate = ref(1);
const showSpeedMenu = ref(false);

const progressPercent = computed(() => {
    return duration.value ? (currentTime.value / duration.value) * 100 : 0;
});

// Audio Functions
const togglePlay = () => {
    const audio = audioPlayer.value;
    if (!audio) return;
    if (isPlaying.value) {
        audio.pause();
    } else {
        audio.play();
    }
    isPlaying.value = !isPlaying.value;
};

const updateTime = () => {
    const audio = audioPlayer.value;
    if (audio) currentTime.value = audio.currentTime;
};

const updateDuration = () => {
    const audio = audioPlayer.value
    if (audio)
        duration.value = audio.duration;
};

const handleEnded = () => {
    isPlaying.value = false;
};

const handleProgressClick = (e: MouseEvent) => {
    const bar = progressBar.value;
    const audio = audioPlayer.value;
    if (!bar || !audio || !duration.value) return;

    const rect = bar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration.value;

    audio.currentTime = newTime;
    currentTime.value = newTime;
};

const handleVolumeChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const newVolume = parseFloat(target.value);

    const audio = audioPlayer.value;
    if (!audio) return;

    volume.value = newVolume;
    audio.volume = newVolume;
    isMuted.value = newVolume === 0;
};

const toggleMute = () => {
    const audio = audioPlayer.value;
    if (!audio) return;
    if (isMuted.value) {
        audio.volume = volume.value;
        isMuted.value = false;
    } else {
        audio.volume = 0;
        isMuted.value = true;
    }
};

const skipTime = (seconds: number) => {
    const audio = audioPlayer.value;
    if (!audio) return;
    const newTime = Math.max(0, Math.min(duration.value, currentTime.value + seconds));
    audio.currentTime = newTime;
    currentTime.value = newTime;
};

const changeSpeed = (speed: number) => {
    const audio = audioPlayer.value;
    if (!audio) return;
    playbackRate.value = speed;
    audio.playbackRate = speed;
    showSpeedMenu.value = false;
};

const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};
</script>
<style lang="scss" scoped>
.player-container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-top: -120px;
    z-index: 1000;
    position: relative;

    @media (max-width: 768px) {
        margin-top: -80px;
    }

    .player-title {
        font-weight: bold;
        padding: 1.3rem 5.2rem;
        background-color: #fff;
        border-radius: 10px 10px 0 0;
        font-size: 1.25rem;

        @media (max-width: 768px) {
            padding: 1rem 3rem;
            font-size: 1rem;
        }
    }

    .quran-player {
        background-color: #000;
        border-radius: 50px;
        padding: 1rem 1rem;
        color: #fff;
        display: flex;
        /* flex-wrap: wrap; */
        align-items: center;
        width: 90%;
        /* max-width: 900px; */
        gap: 1rem;

        @media (max-width: 768px) {
            padding: .6rem .6rem;
            border-radius: 20px;
            flex-direction: column;
            gap: 1rem;
        }
    }



    .player-info {
        min-width: 10%;

        .surah-name {
            color: #C5E96B;
            font-size: 0.875rem;
            font-weight: 600;
            letter-spacing: 1px;
        }
    }

    .progress-container {
        /* display: flex;
        gap: 10px; */
        width: 100%;
    }

    .progress-bar {
        position: relative;
        height: 8px;
        background-color: rgba(255, 255, 255, 0.2);
        border-radius: 10px;
        cursor: pointer;
        margin-bottom: 0.5rem;

        &:hover .progress-thumb {
            opacity: 1;
        }
    }

    .progress-fill {
        position: absolute;
        height: 100%;
        background: linear-gradient(90deg, #C5E96B, #a8d155);
        border-radius: 10px;
        transition: width 0.1s;
    }

    .progress-thumb {
        position: absolute;
        right: -6px;
        top: 50%;
        transform: translateY(-50%);
        width: 16px;
        height: 16px;
        background-color: #fff;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        opacity: 0;
        transition: opacity 0.2s;
    }

    .time-display {
        display: flex;
        justify-content: space-between;
        font-size: 0.75rem;
        color: rgba(255, 255, 255, 0.6);
    }

    .player-controls {
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 100%;
        gap: .3rem;

        /* flex-direction: column; */
        @media (max-width: 768px) {
            gap: 1.5rem;
        }
    }

    .volume-control {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        /* flex: 1; */

        @media (max-width: 768px) {
            width: 100%;
            justify-content: center;
        }
    }

    .control-btn {
        background: none;
        border: none;
        color: #fff;
        cursor: pointer;
        padding: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: color 0.3s;

        &:hover {
            color: #C5E96B;
        }
    }

    .volume-slider {
        width: 100%;
        min-width: 45px;
        max-width: 200px;
        height: 4px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 10px;
        outline: none;
        cursor: pointer;
        appearance: none;

        &::-webkit-slider-thumb {
            appearance: none;
            width: 12px;
            height: 12px;
            background: #fff;
            border-radius: 50%;
            cursor: pointer;
        }

        &::-moz-range-thumb {
            width: 12px;
            height: 12px;
            background: #fff;
            border-radius: 50%;
            cursor: pointer;
            border: none;
        }
    }

    .playback-controls {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .play-btn {
        background: linear-gradient(135deg, #C5E96B, #a8d155);
        border: none;
        border-radius: 50%;
        width: 60px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: transform 0.2s, box-shadow 0.2s;
        box-shadow: 0 4px 15px rgba(197, 233, 107, 0.4);
        color: #000;

        &:hover {
            transform: scale(1.05);
            box-shadow: 0 6px 20px rgba(197, 233, 107, 0.6);
        }

        &:active {
            transform: scale(0.95);
        }

        @media (max-width: 768px) {
            width: 50px;
            height: 50px;
        }
    }

    .right-controls {
        display: flex;
        align-items: center;
        gap: 1rem;
        /* flex: 1;
        justify-content: flex-end; */

        @media (max-width: 768px) {
            /* width: 100%; */
            justify-content: center;
        }

        @media (max-width:544px) {
            display: none;

        }
    }

    .speed-control {
        position: relative;
    }

    .speed-btn {
        background: none;
        border: 1px solid rgba(255, 255, 255, 0.3);
        color: #fff;
        padding: 0.4rem 0.8rem;
        border-radius: 8px;
        cursor: pointer;
        font-size: 0.875rem;
        font-weight: 600;
        transition: all 0.3s;

        &:hover {
            border-color: #C5E96B;
            color: #C5E96B;
        }
    }

    .speed-menu {
        position: absolute;
        bottom: calc(100% + 10px);
        right: 0;
        background-color: rgba(30, 30, 30, 0.98);
        border-radius: 8px;
        padding: 0.5rem 0;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
        min-width: 80px;
        z-index: 100;

        button {
            width: 100%;
            padding: 0.5rem 1rem;
            background: none;
            border: none;
            color: #fff;
            cursor: pointer;
            font-size: 0.875rem;
            text-align: left;
            transition: all 0.2s;

            &:hover {
                background-color: rgba(255, 255, 255, 0.1);
            }

            &.active {
                color: #C5E96B;
            }
        }
    }
}
</style>