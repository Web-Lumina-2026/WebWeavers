/* Music page interactions */
(() => {
  const audio = document.getElementById('mainCharacterAudio');
  const button = document.getElementById('playToggle');
  const visualizer = document.getElementById('visualizer');
  const progress = document.getElementById('audioProgress');
  const currentTime = document.getElementById('currentTime');
  const duration = document.getElementById('duration');
  const status = document.getElementById('playerStatus');

  if (!audio || !button || !visualizer || !progress || !currentTime || !duration || !status) return;

  const formatTime = seconds => {
    if (!Number.isFinite(seconds)) return '--:--';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const updatePlaybackState = () => {
    const isPlaying = !audio.paused && !audio.ended;
    visualizer.classList.toggle('paused', !isPlaying);
    button.textContent = isPlaying ? 'Ⅱ' : '▶';
    button.setAttribute('aria-label', isPlaying ? 'Pause Desi Girl' : 'Play Desi Girl');
  };

  button.addEventListener('click', async () => {
    status.textContent = '';
    if (audio.paused) {
      try {
        await audio.play();
      } catch (error) {
        status.textContent = 'Could not play the track. Check that the audio file is available and try again.';
        console.error('Audio playback failed:', error);
      }
    } else {
      audio.pause();
    }
    updatePlaybackState();
  });

  audio.addEventListener('loadedmetadata', () => {
    duration.textContent = formatTime(audio.duration);
    progress.max = String(audio.duration);
    progress.value = '0';
  });

  audio.addEventListener('timeupdate', () => {
    currentTime.textContent = formatTime(audio.currentTime);
    if (!progress.matches(':active')) progress.value = String(audio.currentTime);
  });

  audio.addEventListener('play', updatePlaybackState);
  audio.addEventListener('pause', updatePlaybackState);
  audio.addEventListener('ended', () => {
    updatePlaybackState();
    progress.value = String(audio.duration || 0);
  });
  audio.addEventListener('error', () => {
    status.textContent = 'The audio file could not be loaded.';
  });

  progress.addEventListener('input', () => {
    if (Number.isFinite(audio.duration)) {
      audio.currentTime = Number(progress.value);
    }
  });

  updatePlaybackState();
})();