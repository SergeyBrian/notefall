const canvas = document.getElementById("canvas"), ctx = canvas.getContext("2d");
const particles = [];
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

let color = "#fff";
let alpha = "rgba(0, 0, 0, 0.1)";

function createParticle(x){
	ctx.fillStyle = color;
	x = calc_x(x);
	let y = height * 0.5;
	let size = 10;
	let v = -1.5;
	ctx.fillRect(x, y, size, size);
	let p = new Particle(x, y, size, v);
	particles.push(p);
}

function Particle(x, y, size, v){
	this.update = function(){
		y += v;
	};

	this.draw = function(){
		ctx.fillStyle = color;
		ctx.fillRect(x, y, size, size);
	};
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
	if (action === 144 && status !== 0) {
		console.log("Pressed " + note);
		createParticle(note);
	}
}

function success(midi){
	console.log("Midi device connected! ", midi);
	const INPUTS = midi.inputs.values();
	for(let input = INPUTS.next();
		input && !input.done;
		input = INPUTS.next()) {
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