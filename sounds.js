var AudioContextFunc = window.AudioContext || window.webkitAudioContext;
var audioContext = new AudioContextFunc();
var player = new WebAudioFontPlayer();
player.loader.decodeAfterLoading(audioContext, '_tone_0000_Aspirin_sf2_file');

function play() {
    player.queueWaveTable(audioContext, audioContext.destination,
        _tone_0000_Aspirin_sf2_file, 0, 12*4+7, 2);
    return false;
}

