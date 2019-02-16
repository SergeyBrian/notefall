var canvas = document.getElementById("canvas"), ctx = canvas.getContext("2d");
var particles = [];
var s = 1;
var width = canvas.width = window.innerWidth/s;
var height = canvas.height = window.innerHeight/s;
const black = [22, 25, 27, 30, 32, 34, 37, 39, 42, 44, 46, 49, 51, 54, 56, 58, 61, 63, 66, 68, 70, 73, 75, 78, 80, 82, 85, 87, 90, 92, 94, 97, 99, 102, 104, 106];

var vy = -1.5;


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
	var grad = ctx.createLinearGradient(0, 0, 1000, 0);
	grad.addColorStop(0, 'magenta');
	grad.addColorStop(.50, 'blue');
	grad.addColorStop(1, 'red');
	
	ctx.fillStyle = grad;
	ctx.fillRect(x*10, height*0.5, w, 10);
	p = new Particle(x * 10, height * 0.5, grad, w);
	particles.push(p);
}
function endParticle(x){
	let w;
	if (black.indexOf(x) !== -1)
		w = 7;
	else
		w = 10;
	ctx.fillStyle = "#fff";
	ctx.fillRect(x*10, height*0.5, w, 10);
	p = new Particle(x * 10, height * 0.5, "#fff", w);
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