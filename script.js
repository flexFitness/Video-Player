const main = document.getElementById('main');

fetch("./movies.json").then(res => res.json()).then(data => {
        showMovies(data);
})


function showMovies(data) {
    main.innerHTML ='';
    data.forEach(movie => {
        const {name ,image} = movie;
        const movieE1 = document.createElement('div');
        movieE1.classList.add('movie');
        movieE1.innerHTML = `
        <img src="${image}" alt="${name}">
        <div class="movie-info">
          <h3>${name}</h3>
        </div>
        `
        main.appendChild(movieE1);
    })
}

const video = document.querySelector('video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const fullscreenBtn = document.querySelector('.fullscreen');



// Play & Pause ----------------------------------- //
function showPlayIcon() {
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
}

function tooglePlay() {
    if(video.paused) {
        video.play();
        playBtn.classList.replace('fa-play', 'fa-pause');
        playBtn.setAttribute('title', 'Pause');
    } else {
        video.pause();
        showPlayIcon();  
    }
}

//On Video End, show play button icon
video.addEventListener('ended', showPlayIcon);



// Progress Bar ---------------------------------- //

//Calculate display time format

function displayTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    seconds = seconds > 9 ? seconds : `0${seconds}`;
    return `${minutes}:${seconds}`;
}
//Update progress bar as video plays
function updateProgress() {
    progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
    currentTime.textContent = `${displayTime(video.currentTime)} /`;
    duration.textContent = `${displayTime(video.duration)}`;
}

//Click to seek within the video

function setProgress(e) {
    const newTime = e.offsetX / progressRange.offsetWidth;
    progressBar.style.width = `${newTime * 100}%`;
    video.currentTime = newTime * video.duration;
}



// Volume Controls --------------------------- //

//Volume Bar 

function changeVolume(e) {
    let volume = e.offsetX / volumeRange.offsetWidth;
    //Rounding volume up or down

    if (volume < 0.1) {
        volume = 0;
    }
    if (volume > 0.9 ) {
        volume = 1;
    }
    volumeBar.style.width = `${volume * 100}%`;
    video.volume = volume;

    //Change icon depending on volume
    volumeIcon.className = '';
    if(volume > 0.7) {
        volumeIcon.classList.add('fas', 'fa-volume-up');
    } else if (volume < 0.7 && volume > 0) {
        volumeIcon.classList.add('fas','fa-volume-down');
    } else if (volume === 0) {
        volumeIcon.classList.add('fas', 'fa-volume-off');
    }
}

//Event Listeners
playBtn.addEventListener('click',tooglePlay);
video.addEventListener('click', tooglePlay);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
progressRange.addEventListener('click', setProgress);
volumeRange.addEventListener('click', changeVolume);