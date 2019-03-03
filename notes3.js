const canvas = document.getElementById("canvas"), ctx = canvas.getContext("2d");
const particles = [];
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

let vy = -1.5;

const scheme = [["white", "yellow", "red"], ["#65AFFC", "#418BFF", "#4701A6"], ["black", "grey", "white"], ["#4E5CEF", "#AB50A8", "#EA4878"], ["#4024D7", "#6D9D78", "#F6762B"], ["#001E00", "#269926", "#39E639"], ["#351889", "#9C65CA", "#EA9CE5"], ["#194145", "#E8A145", "#ADC584"]];
let current_scheme = 0;
const schemes = ["Red orange", "Blue night", "Fading white", "Pink cloud", "Blue peach", "Green fade", "Violet", "Morning sky"];

window.addEventListener('resize', resize);
function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

function createParticle(x){
    let w;
    if (black.indexOf(x) !== -1)
        w = 8;
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
        w = 8;
    else
        w = 10;
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