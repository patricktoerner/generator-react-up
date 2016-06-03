'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var kebabCase = require('lodash.kebabcase');

module.exports = yeoman.Base.extend({

  // NOTE: The name 'constructor' is important here
  constructor: function () {
    var now = new Date();
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var month = months[now.getMonth()];
    var date = month + ' ' + now.getDay() + ', ' + now.getFullYear();

    // Calling the super constructor is important so our generator is correctly set up
    yeoman.Base.apply(this, arguments);

    this.date = date;
    this.name = arguments[0][0] || 'ExComponent';
    this.slug = this.name.toLowerCase();
    this.initialized = false;
  },

  install: function () {
    console.log('01 - Installation');
    this.npmInstall(['lodash', 'babel'], {
      saveDev: false
    });
  },

  /**
   * 1. Create component
   * 2. Optional test stubs
   * 3. Do we want to use inline styles
   */
  prompting: function () {
    var prompts = [{
      type: 'confirm',
      name: 'createComponent',
      message: 'Create a ' + this.name + ' component?',
      default: true
    }, {
      type: 'confirm',
      name: 'addTests',
      message: 'Create test folder + stub?',
      default: true
    }, {
      type: 'confirm',
      name: 'useRadium',
      message: 'Use radium / CSS Modules?',
      default: true
    }];

    // Now we ahve our answers, set our data
    return this.prompt(prompts).then(function (props) {
      this.props = props;
      this.data = {
        date: this.date,
        name: this.name,
        radium: props.useRadium,
        slug: this.slug
      };

      if (props.createComponent) {
        this._create(props);
      } else {
        this.log(chalk.yellow('Skipping creation'));
      }
    }.bind(this));
  },

  /**
   * Now we actually copy and create
   */
  _create: function (props) {
    var data = this.data;
    var folder = data.name;
    var compPackage = folder + '/package.json';
    var compJavascript = folder + '/' + data.name + '.js';
    var compStyles = folder + '/styles.json';

    this.template('package.json', compPackage, data);
    this.template('component.js', compJavascript, data);
    this.template('styles.scss', compStyles, data);

    // Testing folder / stub
    if (props.addTests) {
      var testPath = folder + '/__test__/index.js';
      this.template('test.js', testPath, data);
    }
  }
});
