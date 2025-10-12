const video = document.getElementById('video');
const playBtn = document.getElementById('play');
const pauseBtn = document.getElementById('pause');
const fullscreenBtn = document.getElementById('fullscreen');
const volumeSlider = document.getElementById('volume');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');

// Apna M3U8 URL yaha dale
const m3u8Url = 'http://217.20.112.199/sethd/index.m3u8';

// Load M3U8
if(Hls.isSupported()) {
  const hls = new Hls();
  hls.loadSource(m3u8Url);
  hls.attachMedia(video);
  hls.on(Hls.Events.MANIFEST_PARSED, () => {
    console.log('Stream Loaded');
  });
} else if (video.canPlayType('application/vnd.apple.mpegurl')) {
  video.src = m3u8Url;
} else {
  alert('Your browser does not support M3U8 playback');
}

// Play / Pause
playBtn.addEventListener('click', () => video.play());
pauseBtn.addEventListener('click', () => video.pause());

// Volume control
volumeSlider.addEventListener('input', (e) => {
  video.volume = e.target.value;
});

// Fullscreen
fullscreenBtn.addEventListener('click', () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    video.parentElement.requestFullscreen();
  }
});

// Progress bar update
video.addEventListener('timeupdate', () => {
  if(video.duration){
    const percent = (video.currentTime / video.duration) * 100;
    progress.style.width = percent + '%';
  }
});

// Click to seek
progressContainer.addEventListener('click', (e) => {
  if(video.duration){
    const rect = progressContainer.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    video.currentTime = pos * video.duration;
  }
});
