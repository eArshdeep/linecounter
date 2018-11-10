const chalk = require('chalk');
const path = require('path');
const fs = require('fs');

/**
 * reset_config() resets application settings store.
 * This is done by copying config-default.json to config.json.
 * If config-default.json is missing, the user is advised to reinstall app.
*/
function reset_config() {
    // handle paths
    let factoryConfigPath = path.join(__dirname, "config-default.json");
    let configPath = path.join(__dirname, "config.json");

    // if factory store does not exist
    if (!fs.existsSync(factoryConfigPath)) {
        console.log(chalk.red("[!] Error: We were unable to locate config-default.json"));

        console.log("This is the file use to factory reset your application.");
        console.log("This error may occur if application files are corrupt.");
        console.log("To resolve this issue, a simple uninstall and reinstall should do the trick.");
        console.log("We apologize for the inconvenience :(");

        console.log("\n");
        console.log(chalk.green("Try:"));

        console.log("\tnpm uninstall -g cli-line-counter");
        console.log("\tnpm install -g cli-line-counter\n");

        process.exit(1);
    }

    // copy
    fs.copyFileSync(factoryConfigPath, configPath);
}

module.exports.reset_config = reset_config;