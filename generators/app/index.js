'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var jhipster = require('generator-jhipster');

var configuration = {'moduleName': 'fortune'};

module.exports = yeoman.generators.Base.extend({

  templates: function() {
    this.composeWith('jhipster:modules', { options: {
        configuration: configuration }});
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('JHipster Fortune') + ' generator!'
  ));

    var prompts = [{
      type: 'input',
      name: 'userFortune',
      message: 'Please write your own fortune cookie',
      default: 'Do. Or do not. There is no try.'
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: function () {
    console.log("Writing files...");
    var done = this.async();

    this.baseName = configuration.baseName;
    this.packageName = configuration.packageName;
    this.userFortune = this.props.userFortune;
    var javaDir = configuration.javaDir;
    var resourceDir = configuration.resourceDir;
    var webappDir = configuration.webappDir;

    this.template('src/main/java/package/domain/_Fortune.java', javaDir + 'domain/Fortune.java');
    this.template('src/main/java/package/repository/_FortuneRepository.java', javaDir + 'repository/FortuneRepository.java');
    this.template('src/main/java/package/web/rest/_FortuneResource.java', javaDir + 'web/rest/FortuneResource.java');
    this.template('src/main/resources/config/liquibase/_fortunes.csv', resourceDir + 'config/liquibase/fortunes.csv');

    this.changelogDate = configuration.dateFormatForLiquibase();
    configuration.addChangelogToLiquibase(this.changelogDate + '_added_entity_Fortune');
    this.template('src/main/resources/config/liquibase/changelog/_added_entity_Fortune.xml', resourceDir + 'config/liquibase/changelog/' + this.changelogDate + '_added_entity_Fortune.xml');

    done();
  },

  install: function () {
    this.installDependencies();
  }
});
