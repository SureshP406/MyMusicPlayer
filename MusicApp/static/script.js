document.addEventListener('DOMContentLoaded', function () {
  const audio = document.getElementById('fc-media');
  const lyricsContainer = document.getElementById('song-lyrics');
  let currentLyricIndex = 0;

  // Retrieve the lyrics data as a JSON string
  const lyricsData = JSON.parse(lyricsContainer.getAttribute('data-lyrics'));

  audio.addEventListener('timeupdate', function () {
    const currentTime = audio.currentTime;

    // Find the current lyrics based on the time
    while (currentLyricIndex < lyricsData.length - 1 && currentTime >= timeToSeconds(lyricsData[currentLyricIndex + 1].time)) {
      currentLyricIndex++;
    }

    // Update the displayed lyrics
    lyricsContainer.innerText = lyricsData[currentLyricIndex].lyrics;
  });

  function timeToSeconds(time) {
    const [minutes, seconds] = time.split(':').map(parseFloat);
    return minutes * 60 + seconds;
  }
});

$(document).ready(function () {
  $('audio.fc-media').mediaelementplayer({
    features: ['playpause', 'progress', 'current', 'duration', 'volume'],
    audioHeight: 40,
    alwaysShowControls: true,
    timeAndDurationSeparator: ' / ',
    iPadUseNativeControls: true,
    iPhoneUseNativeControls: true,
    AndroidUseNativeControls: true
  });
});
