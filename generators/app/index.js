const chalk = require('chalk');
const generator = require('yeoman-generator');
const packagejs = require('../../package.json');

// Stores JHipster variables
const jhipsterVar = { moduleName: 'fortune' };

// Stores JHipster functions
const jhipsterFunc = {};

module.exports = generator.extend({

    initializing: {
        compose() {
            this.composeWith('jhipster:modules',
                { jhipsterVar, jhipsterFunc },
                this.options.testmode ? { local: require.resolve('generator-jhipster/generators/modules') } : null
            );
        },
        displayLogo() {
            // Have Yeoman greet the user.
            this.log(`Welcome to the ${chalk.bold.yellow('JHipster fortune')} generator! ${chalk.yellow(`v${packagejs.version}\n`)}`);
        }
    },

    prompting() {
        const done = this.async();

        if (jhipsterVar.clientFramework !== 'angular1') {
            this.log(chalk.red('Error! The JHipster Fortune module only works with AngularJS 1'));
            process.exit(1);
        }
        if (jhipsterVar.databaseType !== 'sql') {
            this.log(chalk.red('Error! The JHipster Fortune module only works with SQL databases'));
            process.exit(1);
        }
        if (jhipsterVar.enableTranslation !== true) {
            this.log(chalk.red('Error! The JHipster Fortune module only works when translation (i18n) is enabled'));
            process.exit(1);
        }

        const prompts = [
            {
                type: 'input',
                name: 'userFortune',
                message: 'Please write your own fortune cookie',
                default: 'Do. Or do not. There is no try.'
            }
        ];

        this.prompt(prompts).then((props) => {
            this.props = props;
            // To access props later use this.props.someOption;

            done();
        });
    },

    writing() {
        // function to use directly template
        this.template = function (source, destination) {
            this.fs.copyTpl(
                this.templatePath(source),
                this.destinationPath(destination),
                this
            );
        };

        this.baseName = jhipsterVar.baseName;
        this.packageName = jhipsterVar.packageName;
        this.packageFolder = jhipsterVar.packageFolder;
        this.angularAppName = jhipsterVar.angularAppName;
        this.clientFramework = jhipsterVar.clientFramework;
        this.clientPackageManager = jhipsterVar.clientPackageManager;
        const javaDir = jhipsterVar.javaDir;
        const resourceDir = jhipsterVar.resourceDir;
        const webappDir = jhipsterVar.webappDir;

        this.userFortune = this.props.userFortune;

        this.template('src/main/java/package/domain/_Fortune.java', `${javaDir}domain/Fortune.java`);
        this.template('src/main/java/package/repository/_FortuneRepository.java', `${javaDir}repository/FortuneRepository.java`);
        this.template('src/main/java/package/web/rest/_FortuneResource.java', `${javaDir}web/rest/FortuneResource.java`);
        this.template('src/main/resources/config/liquibase/_fortunes.csv', `${resourceDir}config/liquibase/fortunes.csv`);

        this.changelogDate = jhipsterFunc.dateFormatForLiquibase();
        this.template('src/main/resources/config/liquibase/changelog/_added_entity_Fortune.xml', `${resourceDir}config/liquibase/changelog/${this.changelogDate}_added_entity_Fortune.xml`);
        jhipsterFunc.addChangelogToLiquibase(`${this.changelogDate}_added_entity_Fortune`);

        this.template('src/main/webapp/scripts/app/fortune/_fortune.controller.js', `${webappDir}app/fortune/fortune.controller.js`);
        this.template('src/main/webapp/scripts/app/fortune/_fortune.html', `${webappDir}app/fortune/fortune.html`);
        this.template('src/main/webapp/scripts/app/fortune/_fortune.js', `${webappDir}app/fortune/fortune.js`);
        this.template('src/main/webapp/scripts/app/fortune/_fortune.service.js', `${webappDir}app/fortune//fortune.service.js`);
        jhipsterFunc.addElementToMenu('fortune', 'sunglasses', true, this.clientFramework);
        jhipsterFunc.addElementTranslationKey('fortune', 'Fortune', 'en');
        jhipsterFunc.addElementTranslationKey('fortune', 'Fortune', 'fr');

        this.template('src/main/webapp/i18n/en/fortune.json', `${webappDir}i18n/en/fortune.json`);
        this.template('src/main/webapp/i18n/fr/fortune.json', `${webappDir}i18n/fr/fortune.json`);
    },

    install() {
        let logMsg =
            `To install your dependencies manually, run: ${chalk.yellow.bold(`${this.clientPackageManager} install`)}`;

        if (this.clientFramework === 'angular1') {
            logMsg =
                `To install your dependencies manually, run: ${chalk.yellow.bold(`${this.clientPackageManager} install & bower install`)}`;
        }
        const injectDependenciesAndConstants = (err) => {
            if (err) {
                this.warning('Install of dependencies failed!');
                this.log(logMsg);
            } else if (this.clientFramework === 'angular1') {
                this.spawnCommand('gulp', ['install']);
            }
        };
        const installConfig = {
            bower: this.clientFramework === 'angular1',
            npm: this.clientPackageManager !== 'yarn',
            yarn: this.clientPackageManager === 'yarn',
            callback: injectDependenciesAndConstants
        };
        this.installDependencies(installConfig);
    },

    end() {
        this.log('End of fortune generator');
    }
});
