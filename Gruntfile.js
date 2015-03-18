module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		copy: {
			main: {
				files: [
					{expand: true, src: ['assets/*'], dest: 'dist/'},
					{src: ['index.html'], dest: 'dist/'}
				]
			},
			index: {
				src: 'index.html',
				dest: 'dist/index.html',
				options: {
					process: function (content, srcpath) {
						var tokensFirst, initialContent, tokensSecond, endingContent;

						tokensFirst = content.split("<!-- SOURCEJS -->");
						initialContent = tokensFirst[0];
						tokensSecond = tokensFirst[1].split("<!-- /SOURCEJS -->");
						endingContent = tokensSecond[1];

						return initialContent +
							'<script src="app/jquery.min.js" type="text/javascript"></script>\n' +
							'<script src="app/underscore.min.js" type="text/javascript"></script>\n' +
							'<script src="app/lib.min.js" type="text/javascript"></script>\n' +
							'<script src="app/app.min.js" type="text/javascript"></script>' +
							endingContent;
					}
				}
			}
		},

		uglify: {
			jquery: {
				files: {
					'dist/app/jquery.min.js' : ['libraries/jquery.js']
				}
			},
			underscore: {
				files: {
					'dist/app/underscore.min.js' : ['libraries/underscore.js']
				}
			},
			lib: {
				files: {
					'dist/app/lib.min.js' : [
						'libraries/p5.js',
						'libraries/p5.sound.js',
						'libraries/p5.gibber.js'
					]
				}
			},
			app: {
				files: {
					'dist/app/app.min.js' : [
						'app/bowl.js',
						'app/flock.js',
						'app/boid.js',
						'app/main.js',
						'app/loop.js'
					]
				}
			}
		},

		cssmin: {
			options: {
				shorthandCompacting: false,
				roundingPrecision: -1
			},
			target: {
				files: {
					'dist/css/style.css': ['css/style.css']
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	return grunt.registerTask('build', ['copy', 'uglify', 'cssmin']);
};
