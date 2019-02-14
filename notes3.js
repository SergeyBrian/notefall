var canvas = document.getElementById("canvas"), ctx = canvas.getContext("2d");
var particles = [];
var s = 1;
var width = canvas.width = window.innerWidth/s;
var height = canvas.height = window.innerHeight/s;

var vy = -1.5;


window.addEventListener('resize', resize);
function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

function createParticle(x){
    var grad = ctx.createLinearGradient(0, 0, 0, 500);
    grad.addColorStop(0, 'white');
    grad.addColorStop(.50, 'yellow');
    grad.addColorStop(1, 'red');

    ctx.fillStyle = grad;
    ctx.fillRect(x*10, height*0.5, 10, 10);
    p = new Particle(x*10, height*0.5, grad);
    particles.push(p);
}
function endParticle(x){
    ctx.fillStyle = "#000";
    ctx.fillRect(x*10, height*0.5, 10, 10);
    p = new Particle(x*10, height*0.5, "#000");
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
    if (action == 144 && status != 0) {
        console.log("Pressed " + note);
        createParticle(note);
    } else if (action == 144 && status == 0) {
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