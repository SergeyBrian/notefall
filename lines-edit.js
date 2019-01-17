var canvas = document.getElementById("canvas"), ctx = canvas.getContext("2d");
var particles = [];
var s = 1;
var width = canvas.width = window.innerWidth/s;
var height = canvas.height = window.innerHeight/s;

var color = "#000";
var alhpa = "rgba(255, 255, 255, 0.1)";

document.getElementById('color').oninput = function() {
	color = document.getElementById('color').value;
	console.log(color);
}
document.getElementById('alpha').oninput = function() {
	alpha = "rgba(0, 0, 0," + document.getElementById('alpha').value + ")";
	console.log(alpha);
}

function createParticle(x){
	ctx.fillStyle = color;
	console.log(color);
	x = x*10;
	var y = height*0.5;
	var size = 10;
	var v = -1.5;
	ctx.fillRect(x, y, size, size);
	var p = new Particle(x, y, size, v)
	particles.push(p);
}

function Particle(x, y, size, v){
	this.update = function(){
		y += v;
	}

	this.draw = function(){
		ctx.fillStyle = color;
		ctx.fillRect(x, y, size, size);
	}
}

function render() {
	ctx.fillStyle = alpha;
	ctx.fillRect(0, 0, width, height);
	for (var i = 0; i < particles.length; i++){
		particles[i].update();
		particles[i].draw();
	}
	requestAnimationFrame(render);
}

window.addEventListener('resize', resize);
function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

function process(action, note, status){
	if (action == 144 && status != 0) {
		console.log("Pressed " + note);
		createParticle(note);
		// render();
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