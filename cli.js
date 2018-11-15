/**
 * File: CLI.JS
 * Sets rules for command line interface and
 * exports arguments vector from yargs parser.
*/

const config_module = require('./config');

const argv = require('yargs')

    .usage('Usage: countlines [command] [path] [options...]')

    .example('countlines', 'actual line counter utility, accepts custom options and optional path')
    .example('countlines config show all', 'view the current settings store')
    .example('countlines reset-config', 'restore settings to factory defaults')

    .command('*', 'Run scan utility', (yargs) => {

        yargs
        
            .option('log', {
                alias: 'l',
                describe: 'Print a log of files scanned to console.',
                boolean: true
            })
        
            .option('include', {
                alias: 'i',
                describe: 'List of one or more space seperated file or folder names to include in scan. Overides settings store.',
                array: true
            })
        
            .option('exclude', {
                alias: 'e',
                describe: 'List of one or more space seperated file or folder names to exclude in scan. Overides settings store.',
                array: true
            })
        
            .option('include-exts', {
                alias: 'I',
                describe: 'List of one or more space seperated extensions to include in scan. Include preceding dot. Overides settings store.',
                array: true
            })
        
            .option('exclude-exts', {
                alias: 'E',
                describe: 'List of one or more space seperated extensions to exclude in scan. Include preceding dot. Overides settings store.',
                array: true
            })

    })

    .command('config [options...|show..]', 'Modify application settings store for persistent settings.', (yargs) => {

        yargs

            .option('show-log', {
                describe: 'Show files scanned output log at end of scan',
                boolean: true
            })

            .option('add-file-exclusions', {
                describe: 'Add to list of file and folder names to exclude from scan by default',
                array: true
            })

            .option('remove-file-exclusions', {
                describe: 'Remove from list of file and folder names to exclude from scan by default',
                array: true
            })

            .option('add-extension-exclusions', {
                describe: 'Add to list of extensions to exclude from scan by default',
                array: true
            })

            .option('remove-extension-exclusions', {
                describe: 'Remove from list of extensions to exclude from scan by default',
                array: true
            })

            .help('h')
            .alias('h', 'help')

    }, (argv) => {
        config_module.modify_config(argv);
        process.exit();
    })

    .command('reset-config', 'Reset application settings to factory default values.', (yargs) => {
        yargs.help('h').alias('h', 'help')
    }, () => {
        config_module.reset_config();
        process.exit();
    })

    .argv

module.exports = argv;
