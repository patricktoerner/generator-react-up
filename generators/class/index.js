'use strict';

// Vendor
var _ = require('lodash');
var chalk = require('chalk');
var yeoman = require('yeoman-generator');

// Internal
var { componentName, date, templates, templatize } = require('../../common/helper');

module.exports = yeoman.Base.extend({

  /**
   * NOTE: Some generator methods can only be called inside the constructor function.
   * These special methods may do things like set up important state controls and may
   * not function outside of the constructor. To override the generator constructor,
   * you pass a constructor function to extend() like so:
   */
  constructor: function () {
    // Calling the super constructor is important so our generator is correctly set up
    yeoman.Base.apply(this, arguments);
    templates(this);

    var name = arguments[0][0]
      ? componentName(arguments[0][0])
      : 'DemoClass';

    this.data = {
      author: this.config.get('author') || false,
      date: date,
      name: name,
      slug: _.kebabCase(name),
      tag: '<' + name + ' />'
    };
  },

  prompting: function () {
    var prompts = [{
      type: 'confirm',
      name: 'createComponent',
      message: 'Create a ' + chalk.cyan('smart') + ' component ' + chalk.yellow(this.data.tag) + '',
      default: true
    }, {
      type: 'confirm',
      name: 'addTests',
      message: 'Create ' + chalk.green('test') + ' folder & stub?',
      default: true
    }, {
      type: 'confirm',
      name: 'useRadium',
      message: 'Use ' + chalk.yellow('radium') + ' inline styles?',
      default: false
    }];

    // Now we ahve our answers, set our data
    return this.prompt(prompts)
      .then(function (answers) {
        if (answers.createComponent) {
          this._create(answers);
        } else {
          this.log(chalk.yellow('Skipping...'));
        }
      }.bind(this)
    );
  },

  /**
   * Now we actually copy and create
   */
  _create: function (props) {
    var data = this.data;

    templatize(this, data, 'package.json');
    templatize(this, data, 'class.js');

    // Do we want to use inline styles via radium `.js` ~ or ~ `.scss`
    var stylesheet = props.radium ? 'styles.js' : 'styles.scss';
    templatize(this, data, stylesheet);

    // Testing folder / stub
    if (props.addTests) {
      templatize(this, data, 'test.js');
    }
    addIncludeFiles(this, data);
  }
});
