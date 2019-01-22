var canvas = document.getElementById("canvas"), ctx = canvas.getContext("2d");
var particles = [];
var s = 1;
var width = canvas.width = window.innerWidth/s;
var height = canvas.height = window.innerHeight/s;
var gravity = 0.004;

function initParticles(a, x) {
  for (var i = 0; i < a/10; i++) {
    setTimeout(createParticle, 20, i, x);
  }
}

function createParticle(i, x) {
	x = x * 10;
	var y = height*0.5;
	var vx = -2+Math.random()*4;
	var vy = Math.random()*-3;
	var size = 5+Math.random()*5;
	var grad = ctx.createLinearGradient(0, 0, 1000, 0);
	grad.addColorStop(0, 'magenta');
	grad.addColorStop(.50, 'blue');
	grad.addColorStop(1, 'red');

	var color = grad;
	var opacity =  0.5 + Math.random()*0.5;
	var p = new Particle(x, y, vx, vy, size, color, opacity);
	particles.push(p);
}

function Particle(x, y, vx, vy, size, color, opacity) {  
  this.update = function() {
    if (opacity - 0.004 > 0) opacity -= 0.004 ;
    
    vy += gravity;
    x += vx/2;
    y += vy/2;
  }
  
  this.draw = function() {
    ctx.globalAlpha = opacity;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, size, size);
  } 
}

function render() {
  ctx.clearRect(0, 0, width, height);
  for (var i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
  }
  requestAnimationFrame(render);
}

//MIDI

window.addEventListener('resize', resize);
function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

function process(action, note, status){
	if (action == 144 && status != 0) {
		console.log("Pressed " + note);
		initParticles(status, note);
	}
}
render();

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