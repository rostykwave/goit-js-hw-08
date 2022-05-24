import throttle from "lodash.throttle";

///////////Define the player

const iframe = document.querySelector('iframe');
    const player = new Vimeo.Player(iframe);

    player.on('play', function() {
        console.log('played the video!');
    });

    player.getVideoTitle().then(function(title) {
        console.log('title:', title);
    });

///////////// take the time from local storage

const savedTiming = localStorage.getItem("videoplayer-current-time");
///IF true - if timing saved - execute
if (savedTiming) {
    const savedTimingParsed = JSON.parse(savedTiming);
    console.log('savedTiming: ',savedTimingParsed);
    const secondsTime = savedTimingParsed.seconds;

    player.setCurrentTime(secondsTime).then(function(seconds) {
    // seconds = the actual time that the player seeked to
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            // the time was less than 0 or greater than the video’s duration
            break;

        default:
            // some other error occurred
            break;
    }
});
}

//////////// record paused time with throttle
player.on('timeupdate', throttle(onTime,1000));

function onTime(data) {
    const videoplayerCurrentTime = JSON.stringify(data);
    localStorage.setItem("videoplayer-current-time", videoplayerCurrentTime);
}