// module.exports = function(grunt){
//   // // project configuration
//   grunt.initConfig({
//       // _____reload_____
//       connect: {
//         default: {
//           options: {
//             port: 8000,
//             hostname: 'localhost',
//             base: {
//                     path: 'public',
//                   }
//           }
//         },
//         dev: {
//           options: {
//             middleware: function (connect) {
//               return [
//                 require('connect-livereload')(), // <--- here 
//                 checkForDownload,
//                 mountFolder(connect, '.tmp'),
//                 mountFolder(connect, 'app')
//               ];
//             }
//           }
//         }
//       },

//       // ________concationation______
//       concat: {
//           dist: {
//               src: ['public/js/*.js', '!public/js/*.concat.js'],
//               dest: 'public/js/built.concat.js',
//           },
//       },


//       // ______watching on files__________
//       watch: {
//           files:['public/js/*.js', 'public/css/*.css', '*.html'],
//           tasks:['connect:dev'],
//           options: {
//             livereload: true,
//           },
//       },
//   });

//   grunt.loadNpmTasks('grunt-contrib-connect');
//   // grunt.loadNpmTasks('connect-livereload');
//   grunt.loadNpmTasks('grunt-contrib-concat');
//   grunt.loadNpmTasks('grunt-contrib-watch');

//   grunt.registerTask('default', ['connect','concat', 'watch']);
// }




module.exports = function(grunt) {
  grunt.initConfig({
    // ---------------------JS-----------------------------------------------
    // ________concationation______
    jshint: {
      options: {
          reporter: require('jshint-stylish')
      },

      main: [
          'public/js/*.js',
          '!public/js/*.concat.js',
          '!public/js/*.min.js',
      ]
    },

    concat: {
        default: {
            src: ['public/js/*.js', '!public/js/*.concat.js'],
            dest: 'public/js/built.concat.js'
        }
    },

    uglify: {
      target: {
        files: {
          'public/js/output.min.js': ['public/js/built.concat.js']
        }
      }
    },


    // ----------------------CSS-----------------------------------------------
    cssmin: {
          options: {
            shorthandCompacting: false,
            roundingPrecision: -1
          },
          target: {
            files: {
              'public/css/output.min.css': ['public/css/*.css', '!public/css/*.min.css']
            }
          }
    },

    // ----------------------SIMPLE SERVER---------------------------
    connect: {
      default: {
        options: {
          port: 8000,
          hostname: 'localhost',
          base: {
            path: 'public',
          }
        }
      }
    },

    // ----------------------WATCHING FOR FILES CHANGING----------------------
    watch: {
      all: {
        files: ["public/**/*"],
        tasks: ["filetask"],
        options: {
          nospawn: true,
          interrupt: false,
          debounceDelay: 250
        }
      }
    },

    // ----------------------RELOADED SERVER ON--------------------------------
    // localhost:35729
    // ----------------------------------------
    reload: {
      port: 35729,
      liveReload: {},
      proxy: {
        host: "localhost",
        port: 8000,
      },
    },

    clean: {
      default: ["public/js/*.concat.js", "public/js/*.min.js", "public/css/*.min.css"]
    },
  });

  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-reload");
  grunt.loadNpmTasks('grunt-contrib-connect');
  
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('jshint-stylish');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.loadNpmTasks('grunt-contrib-cssmin');

  
  grunt.registerTask("default", ["clean", "jshint","concat", "uglify", "cssmin", "connect", "reload", "watch"]);
  
  grunt.registerTask("filetask", ["clean", "jshint","concat", "uglify", "cssmin", "reload"]);
};