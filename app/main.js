/**
 * Global configuration for the sketch
 */
var IBowls = function(options) {
	this.init(options);
};

IBowls.prototype = {
	/* opacity to use in colors */
	opacity: 50,
	/* note frequencies, wave length and rgb color, tuned in 436Hz */
	notes: {},
	/* current bowl index */
	currentIndex: -1,
	/* window width */
	w: $(window).width(),
	/* window height */
	h: $(window).height(),
	/* the flock */
	flock: null,
	/* the bowls */
	bowls: [],
	/* the desired fps */
	fps: 60,
	/* max of boids */
	maxBoids: 100,
	/* max of bowls allowed per session */
	maxBowls: 1,
	/* sound analiser */
	fft: null,
	/* timestamp */
	startedAt: new Date(),
	/* a global reverb carrier */
	globalReverbCarrier: null,
	/* note scale */
	noteScale: 0.5,
	/**
	 * Application initialization
	 */
	init: function() {
		this.setNotes();
	},
	/**
	 * Defines the notes
	 */
	setNotes: function() {
		this.notes = {
			c:  {note: 259.25*this.noteScale, length: 133.08, color: [231, 47, 47, this.opacity]},
			cd: {note: 274.66*this.noteScale, length: 125.61, color: [240, 125, 49, this.opacity]},
			d:  {note: 290.99*this.noteScale, length: 118.56, color: [240, 125, 49, this.opacity]},
			de: {note: 308.30*this.noteScale, length: 111.90, color: [216, 171, 3, this.opacity]},
			e:  {note: 326.63*this.noteScale, length: 105.62, color: [216, 171, 3, this.opacity]},
			f:  {note: 346.05*this.noteScale, length: 99.70, color: [14, 150, 69, this.opacity]},
			fg: {note: 366.63*this.noteScale, length: 94.10, color: [14, 150, 69, this.opacity]},
			g:  {note: 388.43*this.noteScale, length: 88.82, color: [77, 77, 236, this.opacity]},
			ga: {note: 411.53*this.noteScale, length: 83.83, color: [77, 77, 236, this.opacity]},
			a:  {note: 436.00*this.noteScale, length: 79.13, color: [147, 55, 199, this.opacity]},
			ab: {note: 461.93*this.noteScale, length: 74.69, color: [147, 55, 199, this.opacity]},
			b:  {note: 489.39*this.noteScale, length: 70.50, color: [194, 51, 148, this.opacity]}
		};
	},
	/**
	 * Returns a focus sequence
	 *
	 * @returns {*[]}
	 */
	focusSequence: function() {
		return {
			notes: [this.notes.a, this.notes.ab, this.notes.d, this.notes.cd],
			length: 4
		};
	}
};
