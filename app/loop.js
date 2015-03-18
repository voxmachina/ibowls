//
// Application
//
var iBowls = new IBowls();

//
// processing loop
//

/**
 * Preload sound sources
 */
function preload() {
	soundFormats('ogg', 'mp3');
	iBowls.globalReverbCarrier = createConvolver('assets/HaleHolisticYogaStudio');
}
/**
 * Setup canvas
 */
function setup() {
	var bowl, sequence = iBowls.focusSequence();

	$("body").css({
		"padding": 0,
		"margin": 0
	});

	createCanvas(iBowls.w, iBowls.h);

	frameRate(iBowls.fps);

	/* the bowls */
	for (var i=0; i<iBowls.maxBowls; i++) {
		bowl = new Bowl({radius: random(10, 30), sequence: sequence});
		iBowls.bowls.push(bowl);
		iBowls.startedAt = new Date();
	}

	/* the flock */
	iBowls.flock = new Flock();
	for (var i = 0; i < iBowls.maxBoids; i++) {
		var b = new Boid(random(0, iBowls.w), random(0, iBowls.h));
		iBowls.flock.addBoid(b);
	}

}
/**
 * The draw loop
 */
function draw() {
	var sequence = iBowls.focusSequence();

	for (var i = 0; i < iBowls.bowls.length; i++) {
		iBowls.bowls[i].play();
	}

	fill(0, 0, 0, 10);

	noStroke();
	rect(0, 0, iBowls.w, iBowls.h);

	iBowls.flock.run(sequence.notes[iBowls.currentIndex]);
}
/**
 * On window resized
 */
function windowResized() {
	iBowls.w = $(window).width();
	iBowls.h = $(window).height();
	resizeCanvas(iBowls.w, iBowls.h);
}
