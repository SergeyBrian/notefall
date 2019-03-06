const AudioContextFunc = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContextFunc();
const player = new WebAudioFontPlayer();
player.loader.decodeAfterLoading(audioContext, '_tone_0000_Aspirin_sf2_file');

function noteToValue(note) {
    const values = [0+12*1, 1+12*1, 2+12*1, 3+12*1, 4+12*1, 5+12*1, 6+12*1, 7+12*1, 8+12*1, 9+12*1, 10+12*1, 11+12*1, 0+12*2, 1+12*2, 2+12*2, 3+12*2, 4+12*2, 5+12*2, 6+12*2, 7+12*2, 8+12*2, 9+12*2, 10+12*2, 11+12*2, 0+12*3, 1+12*3, 2+12*3, 3+12*3, 4+12*3, 5+12*3, 6+12*3, 7+12*3, 8+12*3, 9+12*3, 10+12*3, 11+12*3, 0+12*4, 1+12*4, 2+12*4, 3+12*4, 4+12*4, 5+12*4, 6+12*4, 7+12*4, 8+12*4, 9+12*4, 10+12*4, 11+12*4, 0+12*5, 1+12*5, 2+12*5, 3+12*5, 4+12*5, 5+12*5, 6+12*5, 7+12*5, 8+12*5, 9+12*5, 10+12*5, 11+12*5, 0+12*6, 1+12*6, 2+12*6, 3+12*6, 4+12*6, 5+12*6, 6+12*6, 7+12*6, 8+12*6, 9+12*6, 10+12*6, 11+12*6, 0+12*7, 1+12*7, 2+12*7, 3+12*7, 4+12*7, 5+12*7, 6+12*7, 7+12*7, 8+12*7, 9+12*7, 10+12*7, 11+12*7, 0+12*8, 1+12*8, 2+12*8, 3+12*8, 4+12*8, 5+12*8, 6+12*8, 7+12*8, 8+12*8, 9+12*8, 10+12*8, 11+12*8];
    return values[note-21];
}

function play(note) {
    player.queueWaveTable(audioContext, audioContext.destination,
        _tone_0000_Aspirin_sf2_file, 0, noteToValue(note), 2);
    return false;
}

