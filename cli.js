/**
 * File: CLI.JS
 * Sets rules for command line interface and
 * exports arguments vector from yargs parser.
*/

const argv = require('yargs')

    .usage('Usage: countlines [command] [path] [options...]')

    .example('countlines', 'actual line counter utility, accepts custom options')
    .example('countlines config', 'open the configuration to make persistent settings change')
    .example('countlines reset-config', 'restore configuration file to factory default state')

    .command('config', 'Open application configuration file to modify for persistent settings.', () => {
        console.log('You will soon be able to modify the settings file, just not yet.');
        process.exit();
    })

    .command('reset-config', 'Reset application configuration to factory default values.', () => {
        console.log('You will soon be able to reset the settings file, just not yet.');
        process.exit();
    })

    .option('log', {
        alias: 'l',
        describe: 'Print a log of files scanned to console.'
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

    .argv

module.exports = argv;
