'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var BibliosophGenerator = module.exports = function BibliosophGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(BibliosophGenerator, yeoman.generators.Base);

BibliosophGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  var welcome =
'\n   .-----------------------------------------------.' +
'\n   |   '+'Welcome to Yeoman\'s Bibliosoph generator'.yellow+'    |' +
'\n   \'_______________________________________________\'' +
'\n';

  // have Yeoman greet the user.
  console.log(welcome);

  var prompts = [
    {
      name: 'name',
      message: 'The name for your project',
      default: 'My documentation website'
    },
    {
      name: 'description',
      message: 'A short description for your project'
    },
    {
      name: 'repository',
      message: 'The url to your repository'
    },
    {
      name: 'download',
      message: 'The url to your download'
    },
    {
      name: 'analytics_id',
      message: 'The UA code for Google Analytics (optional)'
    },
    {
      name: 'domain',
      message: 'The domain name the site will be hosted under, like google.com (required only by Google Analytics)'
    },
    {
      type: 'confirm',
      name: 'menu',
      message: 'Do you want a menu?',
      default: true
    },
    {
      name: 'version',
      message: 'The version of your project',
      default: '0.1.0'
    },
    {
      name: 'author_email',
      message: 'Your email'
    },
    {
      name: 'author_name',
      message: 'Your name'
    },
    {
      name: 'author_url',
      message: 'Your url'
    },
    {
      name: 'port',
      message: 'What port do you want to run the server on',
      default: '5000'
    }
  ];

  this.prompt(prompts, function (props) {
    console.log(util);

    for(var key in props) {
      this[key] = props[key];
    }

    this.github = (this.repository.match(/github/)) ? this.repository : '';
    this.bitbucket = (this.repository.match(/bitbucket/)) ? this.repository : '';

    cb();
  }.bind(this));
};

BibliosophGenerator.prototype.app = function app() {
  this.directory('assets');
  this.directory('lib');
  this.directory('public');
  this.directory('views');

  this.template('app.js');
  this.template('config.json');
  this.template('package.json');
  this.copy('routes.js');
  this.copy('Procfile');
};

// BibliosophGenerator.prototype.projectfiles = function projectfiles() {
//   this.copy('editorconfig', '.editorconfig');
//   this.copy('jshintrc', '.jshintrc');
// };
