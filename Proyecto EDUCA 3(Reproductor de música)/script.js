const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const cover = document.getElementById('cover');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const playIcon = document.getElementById('play-icon');

const songs = [
    {
        title: 'Recuerdos susurrantes',
        artist: 'ElevenLabs',
        cover: 'https://i.pinimg.com/236x/43/f2/5b/43f25bd90df87174763733f44b0bad9e.jpg',
        src: 'music/recuerdos-susurrantes.mp3'
    },
    {
        title: 'Perfect beauty',
        artist: 'Pixabay',
        cover: 'https://media.istockphoto.com/id/1264258168/es/foto/piedras-en-el-oc%C3%A9ano-al-amanecer.jpg?s=612x612&w=0&k=20&c=TW6_66OIBr7Euv_tDiU6ZZM0ed52AUqhhLNlTfMeRwA=',
        src: 'music/good_b_music-perfect-beauty-191271.mp3'
    },
    
    { 
        title : 'Resonancia a través del abismo',
        artist: 'ElevenLabs',
        cover: 'https://i.pinimg.com/236x/f2/7e/0d/f27e0d8b11e1a79b6a87609c64fb2ccd.jpg',
        src: 'music/resonancia-a-travs-del-abismo.mp3'
    }
];

let songIndex = 0;

function loadSong(song) {
    title.innerText = song.title;
    artist.innerText = song.artist;
    cover.src = song.cover;
    audio.src = song.src;
}

loadSong(songs[songIndex]);

function playSong() {
    playBtn.classList.add('play');
    playIcon.classList.remove('fa-play');
    playIcon.classList.add('fa-pause');
    audio.play();
}

function pauseSong() {
    playBtn.classList.remove('play');
    playIcon.classList.remove('fa-pause');
    playIcon.classList.add('fa-play');
    audio.pause();
}

function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1; 
    }
    loadSong(songs[songIndex]);
    playSong();
}

function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0; 
    }
    loadSong(songs[songIndex]);
    playSong();
}

// 5. Actualizar la barra de progreso
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

playBtn.addEventListener('click', () => {
    const isPlaying = playBtn.classList.contains('play');
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('click', setProgress);
progressContainer.addEventListener('click', setProgress);

audio.addEventListener('ended', nextSong);
