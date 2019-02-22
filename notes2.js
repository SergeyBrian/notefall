const canvas = document.getElementById("canvas"), ctx = canvas.getContext("2d");
const particles = [];
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;
const vy = -1.5;


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
	const grad = ctx.createLinearGradient(0, 0, 1000, 0);
	grad.addColorStop(0, 'magenta');
	grad.addColorStop(.50, 'blue');
	grad.addColorStop(1, 'red');
	
	ctx.fillStyle = grad;
	ctx.fillRect(calc_x(x), height*0.5, w, 10);
	p = new Particle(calc_x(x), height * 0.5, grad, w);
	particles.push(p);
}
function endParticle(x){
	let w;
	if (black.indexOf(x) !== -1)
		w = 8;
	else
		w = 10;
	ctx.fillStyle = "#fff";
	ctx.fillRect(calc_x(x), height*0.5, w, 10);
	p = new Particle(calc_x(x), height * 0.5, "#fff", w);
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
	const inputs = midi.inputs.values();
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