/**
 * Source: The Nature of Code
 *
 * Daniel Shiffman
 * http://natureofcode.com
 *
 * Adjustments and customization by Pedro Eugenio
 */

var Flock = function() {
	this.boids = [];
};

Flock.prototype = {
	/**
	 * Runs each boid
	 *
	 * @param note
	 */
	run: function(note) {
		for (var i = 0; i < this.boids.length; i++) {
			this.boids[i].run(this.boids, note);
		}
	},
	/**
	 * Adds a boid
	 *
	 * @param b
	 */
	addBoid: function(b) {
		this.boids.push(b);
	}
};
