const canvas = document.getElementById("canvas"), ctx = canvas.getContext("2d");
const particles = [];
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;
const black = [22, 25, 27, 30, 32, 34, 37, 39, 42, 44, 46, 49, 51, 54, 56, 58, 61, 63, 66, 68, 70, 73, 75, 78, 80, 82, 85, 87, 90, 92, 94, 97, 99, 102, 104, 106];
const white = [21, 23, 23, 24, 26, 28, 29, 31, 33, 35, 36, 38, 40, 41, 43, 45, 47, 48, 50, 52, 53, 55, 57, 59, 60, 62, 64, 65, 67, 69, 71, 72, 74, 76, 77, 79, 81, 83, 84, 86, 88, 89, 91, 93, 95, 96, 98, 100, 101, 103, 105, 107, 108];

let vy = -1.5;

const scheme = [["white", "yellow", "red"], ["#65AFFC", "#418BFF", "#4701A6"], ["black", "grey", "white"], ["#4E5CEF", "#AB50A8", "#EA4878"], ["#4024D7", "#F32469", "#F6762B"], ["#001E00", "#269926", "#39E639"]];
let current_scheme = 0;
const schemes = ["Red orange", "Blue night", "Fading white", "Pink cloud", "Blue peach", "Green fade"];

window.addEventListener('resize', resize);
function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

function createParticle(x){
    let w;
    if (black.indexOf(x) !== -1)
        w = 7;
    else
        w = 10;
    const grad = ctx.createLinearGradient(0, 0, 0, 500);
    grad.addColorStop(0, scheme[current_scheme][0]);
    grad.addColorStop(.50, scheme[current_scheme][1]);
    grad.addColorStop(1, scheme[current_scheme][2]);

    ctx.fillStyle = grad;
    ctx.fillRect(calc_x(x), height*0.5, w, 10);
    let p = new Particle(calc_x(x), height * 0.5, grad, w);
    particles.push(p);
}
function endParticle(x){
    let w;
    if (black.indexOf(x) !== -1)
        w = 7;
    else
        w = 10;
    ctx.fillStyle = "#000";
    ctx.fillRect(calc_x(x), height*0.5, w, 10);
    let p = new Particle(calc_x(x), height * 0.5, "#000", w);
    particles.push(p);
}

function Particle(x, y, color, w){
    this.update = function(){
        y += vy;
    };

    this.draw = function(){
        ctx.fillStyle = color;
        ctx.fillRect(x, y, w, 10);
    };
}

function render(){
    for (let i = 0; i < particles.length; i++){
        particles[i].update();
        particles[i].draw();
    }

    requestAnimationFrame(render);
}

function process(action, note, status){
    if (action === 144 && status !== 0) {
        console.log("Pressed " + note);
        createParticle(note);
    } else if (action === 144 && status === 0) {
        console.log("Released " + note);
        endParticle(note);
    }
}

function success(midi){
    console.log("Midi device connected! ", midi);
    let inputs = midi.inputs.values();
    for(let input = inputs.next();
        input && !input.done;
        input = inputs.next()) {
        input.value.onmidimessage = onMIDIMessage;
    }
}

function failture(){
    console.log("Cannot access MIDI device!");
}

if (navigator.requestMIDIAccess) {
    console.log("Browser supports MIDI!");
    navigator.requestMIDIAccess()
        .then(success, failture);
} else {
    document.getElementById("connected").innerHTML = "Your device doesn't support MIDI..";
    throw "stop";
}

function onMIDIMessage(message) {
    process(message.data[0], message.data[1], message.data[2]);
}

render();