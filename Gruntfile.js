/* eslint-disable func-names */
// eslint-disable-next-line func-names

const webpackProdConfig = require('./webpack.prod.js');
const webpackDevConfig = require('./webpack.dev.js');

module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    run: {
      seed: {
        cmd: 'node',
        args: [
          'database/seed.js',
        ],
      },
      server: {
        cmd: 'nodemon',
        args: ['server/server.js']
      },
    },

    webpack: {
      options: {
        stats: !process.env.NODE_ENV || process.env.NODE_ENV === 'development',
      },
      prod: webpackProdConfig,
      dev: Object.assign({ watch: true }, webpackDevConfig),
    },

    aws: grunt.file.readJSON('awss3.json'),

    aws_s3: {
      options: {
        accessKeyId: '<%= aws.AWSAccessKeyId %>',
        secretAccessKey: '<%= aws.AWSSecretKey %>',
      },
      dist: {
        options: {
          bucket: 'fec-details-module',
          signatureVersion: 'v4',
          region: 'us-east-2',
        },
        files: [
          {
            expand: true,
            cwd: 'public/',
            src: ['**'],
            dest: '/',
          },
        ],
      },
    },
  });

  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-run');
  grunt.loadNpmTasks('grunt-aws-s3');

  grunt.registerTask('prod', ['run:seed', 'webpack:prod', 'run:server']);
  grunt.registerTask('dev', ['run:seed', 'webpack:dev']);
  grunt.registerTask('server', ['run:server']);

  grunt.registerTask('deploy', ['webpack:prod', 'aws_s3:dist']);
};
