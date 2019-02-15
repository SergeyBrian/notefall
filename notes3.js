const canvas = document.getElementById("canvas"), ctx = canvas.getContext("2d");
const particles = [];
const s = 1;
var width = canvas.width = window.innerWidth/s;
var height = canvas.height = window.innerHeight/s;

var vy = -1.5;

const scheme = [["white", "yellow", "red"], ["#65AFFC", "#418BFF", "#4701A6"], ["black", "grey", "white"], ["#4E5CEF", "#AB50A8", "#EA4878"], ["#4024D7", "#F32469", "#F6762B"]];
var current_scheme = 0;
const schemes = ["Red orange", "Blue night", "Fading white", "Pink cloud", "Blue peach"];


window.addEventListener('resize', resize);
function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

function createParticle(x){
    var grad = ctx.createLinearGradient(0, 0, 0, 500);
    grad.addColorStop(0, scheme[current_scheme][0]);
    grad.addColorStop(.50, scheme[current_scheme][1]);
    grad.addColorStop(1, scheme[current_scheme][2]);

    ctx.fillStyle = grad;
    ctx.fillRect(x*10, height*0.5, 10, 10);
    let p = new Particle(x * 10, height * 0.5, grad);
    particles.push(p);
}
function endParticle(x){
    ctx.fillStyle = "#000";
    ctx.fillRect(x*10, height*0.5, 10, 10);
    let p = new Particle(x * 10, height * 0.5, "#000");
    particles.push(p);
}

function Particle(x, y, color){
    this.update = function(){
        y += vy;
    };

    this.draw = function(){
        ctx.fillStyle = color;
        ctx.fillRect(x, y, 10, 10);
    };
}

function render(){
    for (var i = 0; i < particles.length; i++){
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
    var inputs = midi.inputs.values();
    for(var input = inputs.next();
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