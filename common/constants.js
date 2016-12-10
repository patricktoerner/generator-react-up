var fileDefaults = {
  'package.json': { path: '/', name: 'package.json' },
  'pure.js': { path: '/', name: '<%= name %>.js' },
  'styles.js': { path: '/', name: 'styles.js' },
  'styles.scss': { path: '/', name: 'styles.scss' },
  'test.js': { path: '/__test__/', name: 'test.js' },
  'class.js': { path: '/', name: '<%= name %>.js' },
  'class-detailed.js': { path: '/', name: '<%= name %>.js' }
};

var destRootDefault = '<%= name %>';


module.exports = {
  fileDefaults: fileDefaults,
  destRootDefault: destRootDefault
}