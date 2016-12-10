// Vendor
var _ = require('lodash');
var path = require('path');
var ejs = require('ejs');

var { fileDefaults, destRootDefault } = require('./constants');

// Setup
var now = new Date();
var months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];
var month = months[now.getMonth()];
var date = month + ' ' + now.getDate() + ', ' + now.getFullYear();

/**
 * @description Our components and classes both need to be capitalized
 */
var componentName = function(str) {
  return _.upperFirst(_.camelCase(str));
};

/**
 * @description We use this to allow users to copy all our the initial
 * templates into a local (project) folder for even more customization.
 */
var templates = function(generator) {
  var rootPath;

  if (generator.config.get('templates')) {
    rootPath = generator.config.get('templates');
  } else {
    rootPath = path.resolve(generator.sourceRoot(), '../../../templates');
  }

  generator.sourceRoot(rootPath);
};

var getDestRoot = function(generator) {
  return generator.config.get('destRoot') ? generator.config.get('destRoot') : destRootDefault;
};

var getFilePath = function(generator, templateName) {
  var filePaths = generator.config.get('files') ? generator.config.get('files') : fileDefaults;
  return filePaths[templateName].path;
};

var getFileName = function(generator, templateName) {
  var fileNames = generator.config.get('files') ? generator.config.get('files') : fileDefaults;
  return fileNames[templateName].name;
};

var getDestPath = function(generator, data, templateName) {
  var destRoot = getDestRoot(generator);
  var destPath = getFilePath(generator, templateName);
  var fileName = getFileName(generator, templateName);
  return ejs.render( destRoot + destPath + fileName, data );
};

var templatize = function(generator, data, templateName) {
  generator.template(
    templateName,
    getDestPath(generator, data, templateName),
    data
  );
};

var addIncludeFiles = function(generator, data) {
  var includeFiles = generator.config.get('includeFiles');
  if (includeFiles) {
    Object.keys(includeFiles).forEach(function (templateName) {
      generator.template(
        templateName,
        ejs.render(getDestRoot(generator) + includeFiles[templateName].path + includeFiles[templateName].name, data),
        data
      );
    });
  }
};

module.exports = {
  componentName: componentName,
  date: date,
  month: month,
  templates: templates,
  templatize: templatize,
  addIncludeFiles: addIncludeFiles
};
