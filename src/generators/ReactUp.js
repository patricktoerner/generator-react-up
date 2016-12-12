// Vendor
import { Base } from 'yeoman-generator';
import { kebabCase } from 'lodash';

// Internal
import helper from './common/helper';

/**
 * @class ReactUp
 * @description The ReactUp class to gather all the command line information
 * and store it during initialization which we extend from for each generator
 */
class ReactUp extends Base { // eslint-disable-line padded-blocks

  /**
   * @description Anytime we extend a Class as done above, we need to call super
   * to ensure the original Class is initialized. From there we save some basic
   * data and let the generator do it's thing.
   */
  constructor(args, options) {
    // we store this before yeoman resets the root
    const current = process.cwd();

    // Always call super to ensure things are setup
    super(args, options);

    const name = args[0] ? helper.componentName(args[0]) : 'Example';
    const type = args[1] ? args[1].toLowerCase() : 'pure';

    const config = this.config.getAll();
    const date = helper.date();
    const slug = name ? kebabCase(name) : false;
    const tag = name ? `<${ name } />` : false;

    // We'll use this for more data as well later on
    this.data = { args, config, current, date, name, slug, tag, type };

    // Used to stop running any public methods left to run
    this.stop = false;

    // Setup our template path up each
    helper.templates(this);
  }
}

// Export our generator
module.exports = ReactUp;
