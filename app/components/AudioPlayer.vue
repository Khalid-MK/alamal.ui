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
                <div class="progress-wrapper">
                    <div class="progress-bar" ref="progressBar" @click="handleProgressClick">
                        <div class="progress-fill" :style="{ width: progressPercent + '%' }">
                            <div class="progress-thumb"></div>
                        </div>
                    </div>
                    <div class="time-display">
                        <span>{{ formatTime(currentTime) }}</span>
                    </div>
                </div>
            </div>

            <!-- Controls -->
            <div class="player-controls">
                <!-- Volume Control -->
                <div class="volume-control">
                    <button @click="toggleMute" class="control-btn">
                        <svg v-if="isMuted || volume === 0" width="18" height="18" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2">
                            <path d="M11 5L6 9H2v6h4l5 4V5z" />
                            <line x1="23" y1="9" x2="17" y2="15" />
                            <line x1="17" y1="9" x2="23" y2="15" />
                        </svg>
                        <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
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
                    <button @click="skipTime(-10)" class="control-btn skip-btn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2">
                            <polygon points="19 20 9 12 19 4 19 20" />
                            <line x1="5" y1="19" x2="5" y2="5" />
                        </svg>
                    </button>

                    <button @click="togglePlay" class="play-btn">
                        <svg v-if="isPlaying" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <rect x="6" y="4" width="4" height="16" />
                            <rect x="14" y="4" width="4" height="16" />
                        </svg>
                        <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                    </button>

                    <button @click="skipTime(10)" class="control-btn skip-btn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2">
                            <polygon points="5 4 15 12 5 20 5 4" />
                            <line x1="19" y1="5" x2="19" y2="19" />
                        </svg>
                    </button>
                </div>

                <!-- Speed Control -->
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
                <source src="/audio/videoplayback.m4a" type="audio/mp4" />
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

// watchEffect(() => {
//     console.log('Progress:', progressPercent.value, 'Current:', currentTime.value, 'Duration:', duration.value)
// })

</script>

<style lang="scss" scoped>
.player-container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 90%;
    /* margin-top: -157px; */
    z-index: 1000;
    /* margin-bottom: 100px; */
    /* position: relative; */
    left: 0%;
    width: 100%;

    @media (max-width: 768px) {
        top: 91%;
    }

    @media (max-width: 348px) {
        top: 89%;
    }

    .player-title {
        font-weight: bold;
        padding: 1rem 6rem;
        background-color: #fff;
        border-radius: 30px 30px 0 0;
        font-size: 1.125rem;

        @media (max-width: 1024px) {
            padding: 1rem 4rem;
            font-size: 1rem;
        }

        @media (max-width: 768px) {
            padding: 0.875rem 3rem;
            font-size: 0.95rem;
        }

        @media (max-width: 480px) {
            padding: 0.75rem 2rem;
            font-size: 0.875rem;
        }
    }

    .quran-player {
        background-color: #000;
        border-radius: 50px;
        padding: 1rem 1.5rem;
        color: #fff;
        display: flex;
        align-items: center;
        width: 95%;
        max-width: 1300px;
        height: 67px;
        gap: 1.5rem;

        @media (max-width: 1024px) {
            height: auto;
            padding: 1rem;
            gap: 1rem;
        }

        @media (max-width: 768px) {
            padding: 0.75rem;
            border-radius: 25px;
            flex-direction: column;
            gap: 1rem;
            height: auto;
        }

        @media (max-width: 480px) {
            padding: 0.6rem;
            border-radius: 20px;
        }
    }

    .player-info {
        flex-shrink: 0;
        min-width: 120px;

        @media (max-width: 768px) {
            width: 100%;
            text-align: center;
        }

        .surah-name {
            color: var(--color-primary);
            font-size: 0.75rem;
            font-weight: 600;
            letter-spacing: 1px;

            @media (max-width: 768px) {
                font-size: 0.7rem;
            }
        }
    }

    .progress-container {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        flex: 1;
        min-width: 100px;

        @media (max-width: 768px) {
            width: 100%;
        }
    }

    .progress-wrapper {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        flex: 1;
    }

    .progress-bar {
        direction: ltr !important;
        position: relative;
        height: 6px;
        flex: 1;
        background-color: rgba(255, 255, 255, 0.2);
        border-radius: 10px;
        cursor: pointer;

        &:hover .progress-thumb {
            opacity: 1;
        }

        @media (max-width: 768px) {
            height: 5px;
        }
    }

    .progress-fill {
        position: absolute;
        height: 100%;
        background: var(--color-primary);
        border-radius: 10px;
        transition: width 0.1s;
    }

    .progress-thumb {
        position: absolute;
        right: -6px;
        top: 50%;
        transform: translateY(-50%);
        width: 14px;
        height: 14px;
        background-color: #fff;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        opacity: 0;
        transition: opacity 0.2s;

        @media (max-width: 768px) {
            width: 12px;
            height: 12px;
        }
    }

    .time-display {
        display: flex;
        font-size: 0.75rem;
        color: rgba(255, 255, 255, 0.8);
        font-weight: 500;
        min-width: 45px;
        justify-content: flex-end;

        @media (max-width: 768px) {
            font-size: 0.7rem;
            min-width: 40px;
        }
    }

    .player-controls {
        display: flex;
        align-items: center;
        gap: 1rem;
        flex-shrink: 0;

        @media (max-width: 1024px) {
            gap: 0.75rem;
        }

        @media (max-width: 768px) {
            width: 100%;
            justify-content: space-between;
            gap: 1rem;
        }

        @media (max-width: 480px) {
            flex-wrap: wrap;
            justify-content: center;
        }
    }

    .volume-control {
        display: flex;
        align-items: center;
        gap: 0.5rem;

        @media (max-width: 768px) {
            flex: 1;
        }

        @media (max-width: 480px) {
            width: 100%;
            order: 3;
        }
    }

    .control-btn {
        background: none;
        border: none;
        color: #fff;
        cursor: pointer;
        padding: 0.35rem;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s;
        border-radius: 50%;

        &:hover {
            color: var(--color-primary);
            background-color: rgba(197, 233, 107, 0.1);
        }

        &:active {
            transform: scale(0.9);
        }

        @media (max-width: 768px) {
            padding: 0.4rem;

            svg {
                width: 20px;
                height: 20px;
            }
        }
    }

    .skip-btn {
        @media (max-width: 768px) {
            svg {
                width: 18px;
                height: 18px;
            }
        }
    }

    .volume-slider {
        direction: ltr !important;
        width: 80px;
        height: 4px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 10px;
        outline: none;
        cursor: pointer;
        appearance: none;
        position: relative;


        /* ✅ Chrome / Edge / Safari */
        &::-webkit-slider-runnable-track {
            height: 4px;
            background: linear-gradient(to right,
                    var(--color-primary) 0%,
                    var(--color-primary) calc(var(--val, 50%) * 1%),
                    rgba(255, 255, 255, 0.2) calc(var(--val, 50%) * 1%),
                    rgba(255, 255, 255, 0.2) 100%);
            border-radius: 10px;
        }

        /* ✅ Firefox */
        &::-moz-range-track {
            height: 4px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 10px;
        }

        &::-moz-range-progress {
            height: 4px;
            background: var(--color-primary);
            border-radius: 10px;
        }

        &::-webkit-slider-thumb {
            appearance: none;
            width: 12px;
            height: 12px;
            background: #fff;
            border-radius: 50%;
            cursor: pointer;
            transition: all 0.2s;
            position: relative;
            z-index: 2;

            &:hover {
                transform: scale(1.2);
            }
        }

        @media (max-width: 1024px) {
            width: 70px;
        }

        @media (max-width: 768px) {
            flex: 1;
            min-width: 60px;
        }

        &::-webkit-slider-thumb {
            appearance: none;
            width: 12px;
            height: 12px;
            background: #fff;
            border-radius: 50%;
            cursor: pointer;
            transition: all 0.2s;

            &:hover {
                transform: scale(1.2);
            }
        }

        &::-moz-range-thumb {
            width: 12px;
            height: 12px;
            background: #fff;
            border-radius: 50%;
            cursor: pointer;
            border: none;
            transition: all 0.2s;

            &:hover {
                transform: scale(1.2);
            }
        }
    }

    .playback-controls {
        display: flex;
        align-items: center;
        gap: 0.75rem;

        @media (max-width: 768px) {
            gap: 0.5rem;
        }
    }

    .play-btn {
        background: var(--color-primary);
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s;
        box-shadow: 0 4px 15px rgba(197, 233, 107, 0.3);
        color: #000;

        &:hover {
            transform: scale(1.08);
            box-shadow: 0 6px 20px #0f6658;
        }

        &:active {
            transform: scale(0.95);
        }

        @media (max-width: 1024px) {
            width: 48px;
            height: 48px;

            svg {
                width: 22px;
                height: 22px;
            }
        }

        @media (max-width: 768px) {
            width: 46px;
            height: 46px;

            svg {
                width: 20px;
                height: 20px;
            }
        }
    }

    .right-controls {
        display: flex;
        align-items: center;
        gap: 0.75rem;

        @media (max-width: 768px) {
            flex: 1;
            justify-content: flex-end;
        }

        @media (max-width: 480px) {
            order: 2;
        }
    }

    .speed-control {
        position: relative;
    }

    .speed-btn {
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: #fff;
        padding: 0.35rem 0.7rem;
        border-radius: 8px;
        cursor: pointer;
        font-size: 0.8rem;
        font-weight: 600;
        transition: all 0.3s;
        min-width: 50px;

        &:hover {
            border-color: var(--color-primary);
            color: var(--color-primary);
            background: rgba(197, 233, 107, 0.1);
        }

        @media (max-width: 768px) {
            padding: 0.4rem 0.6rem;
            font-size: 0.75rem;
            min-width: 45px;
        }
    }

    .speed-menu {
        position: absolute;
        bottom: calc(100% + 10px);
        right: 0;
        background-color: rgba(20, 20, 20, 0.98);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        padding: 0.5rem 0;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
        min-width: 80px;
        z-index: 100;

        button {
            width: 100%;
            padding: 0.5rem 1rem;
            background: none;
            border: none;
            color: #fff;
            cursor: pointer;
            font-size: 0.85rem;
            text-align: left;
            transition: all 0.2s;

            &:hover {
                background-color: rgba(255, 255, 255, 0.1);
                color: var(--color-primary);
            }

            &.active {
                color: var(--color-primary);
                background-color: rgba(197, 233, 107, 0.1);
            }
        }
    }
}
</style>