var canvas = document.getElementById("canvas"), ctx = canvas.getContext("2d");
canvas.height = 1000;
canvas.width  = 1000;

window.onload = function(){
	setTimeout(20);
};

function startLine(action, note, status) {
	canvas.height = 1000;
	canvas.width  = 1000;

	ctx.strokeStyle = "#000000";
	ctx.fillStyle = "#" + status + note + status;
	console.log(ctx.fillStyle);

	ctx.beginPath();
	ctx.moveTo(note, status);
	ctx.bezierCurveTo(note, note*2, 175, 20, note*10, note*10);
	ctx.moveTo(note, status);
	ctx.quadraticCurveTo(100, note*2-(note/2), note*10, note*10);
	ctx.stroke();
	ctx.fill();
}

function process(action, note, status){
	if (action == 144 && status != 0) {
		console.log("Pressed " + note);
		startLine(action, note, status);
	}
	// else if (action == 144 && status == 0) {
	// 	console.log("Released " + note);
	// 	endLine(note);
	// }
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

