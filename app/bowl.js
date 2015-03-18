/**********************************************
 * A Bowl
 *********************************************/
var Bowl = function (options) {
	this.init(options);
};
Bowl.prototype = {

	_synth: null,
	_gong: null,
	_startedAt: null,
	_duration: null,
	_timeScaleFactor: 1000,
	_delay: 4,
	_note: 436,
	_color: null,
	_circleSize: 50,

	defaults: {
		radius: 10,
		sequence: null
	},

	/**
	 * Initializes bowl
	 */
	init: function (options) {
		this.options = _.defaults(options, this.defaults);

		this._duration = options.radius * this._timeScaleFactor;

		this._synth = FM('gong', {
			amp: 0.75,
			index: 7,
			cmRatio: 5,
			attack: ms(1),
			maxVoices: 4,
			decay: ms(this._duration)
		});

		this.addRingModulator()
			.addFlanger()
			.addTremolo()
			.addVibrato()
			.addDelay()
			.addReverb();

		return this;
	},
	/**
	 * Updates bowl duration
	 */
	updateDuration: function() {
		this._duration = this.options.radius + (this._timeScaleFactor * (this._length/3));

		this._synth = FM('gong', {
			amp: 0.75,
			index: 7,
			cmRatio: 5,
			attack: ms(1),
			maxVoices: 4,
			decay: ms(this._duration)
		});

		this.addRingModulator()
			.addFlanger()
			.addTremolo()
			.addVibrato()
			.addDelay()
			.addReverb();
	},
	/**
	 * Plays a high reverb helper sound
	 */
	playReverbCarrierSound: function () {
		var reverbCarrier;

		reverbCarrier = new p5.Oscillator(this._note, 'sine');
		reverbCarrier.amp(0.5);
		reverbCarrier.start();

		reverbCarrier.disconnect();

		iBowls.globalReverbCarrier.process(reverbCarrier);

		setTimeout(function() {
			reverbCarrier.fade(0, 0.2);
		}, (this._duration / 1000) - 50);
	},
	/**
	 * Adds tremolo fx
	 */
	addTremolo: function() {
		var f = map(this._length, 70.50, 133.08, 0.25, 0.5);

		var r = Tremolo({
			amp: 1,
			frequency:f
		});
		this._synth.fx.add(r);

		return this;
	},
	/**
	 * Adds vibrato fx
	 */
	addVibrato: function() {
		var f = map(this._length, 70.50, 133.08, 0.25, 1);

		var v = Vibrato({
			rate: f
		});
		this._synth.fx.add(v);

		return this;
	},
	/**
	 * Adds flanger fx
	 * @returns {Bowl}
	 */
	addFlanger: function() {
		var r = map(this._length, 70.50, 133.08, 0.01, 0.09);

		var f = Flanger({
			rate: r,
			feedback: 0.24
		});
		this._synth.fx.add(f);

		return this;
	},
	/**
	 * Adds delay fx
	 */
	addDelay: function () {
		var d = Delay({
			time: 1000000000,
			feedback: 0.25
		});
		this._synth.fx.add(d);

		return this;
	},
	/**
	 * Adds ring modulator fx
	 */
	addRingModulator: function () {
		var r = RingMod({amp: 0.25, frequency: this._note - 50});
		this._synth.fx.add(r);
		return this;
	},
	/**
	 * Adds reverb fx
	 */
	addReverb: function () {
		var r = Reverb({roomSize: 0.99, damping: 0.5});
		this._synth.fx.add(r);
		return this;
	},
	/**
	 * Picks the next note to be played
	 */
	pickNote: function () {
		var randNumMin = 0;
		var randNumMax = this.options.sequence.length - 1;
		var randInt = (Math.floor(Math.random() * (randNumMax - randNumMin + 1)) + randNumMin);
		this._note = this.options.sequence.notes[randInt].note;
		this._length = this.options.sequence.notes[randInt].length;
		this._color = this.options.sequence.notes[randInt].color;

		iBowls.currentIndex = randInt;
	},
	/**
	 * Pumps a circle
	 */
	pumpCircle: function() {
		this._circleSize = 50;

		noStroke();
		fill(this._color[0], this._color[1], this._color[2], 10);
		ellipse(iBowls.w/2, iBowls.h/2, this._circleSize, this._circleSize);
	},
	/**
	 * Grows the circle
	 */
	growCircle: function() {
		this._circleSize += 20;

		if (this._circleSize < iBowls.w) {
			noStroke();
			fill(this._color[0], this._color[1], this._color[2], 10);
			ellipse(iBowls.w/2, iBowls.h/2, this._circleSize, this._circleSize);
		}
	},
	/**
	 * Play
	 */
	_play: function () {
		this.pickNote();
		this.updateDuration();
		this._synth.note(this._note);
		this.playReverbCarrierSound();
	},
	/**
	 * Plays a note
	 */
	play: function () {
		var now = new Date(), diff;

		/* first play */
		if (this._startedAt === null) {
			this._play();
			this.pumpCircle();
			this._startedAt = now;
		}

		/* time duration play check */
		diff = now - this._startedAt;

		if (diff > this._duration+1000) {
			this._play();
			this.pumpCircle();
			this._startedAt = now;
		} else {
			this.growCircle();
		}
	},
	/**
	 * Rings through the bowl
	 */
	ring: function () {

	},
	/**
	 * Sets the startedAt
	 */
	setStartedAt: function (val) {
		this._startedAt = val;
	}
};
