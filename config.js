const chalk = require('chalk');
const path = require('path');
const fs = require('fs');

const config = require('./config.json');

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
    console.log("Settings store reset to factory defaults");
}

function modify_config(argv) {
    // handle show command
    if (argv["show"] != undefined && argv["show"][0] == "show") {
        show_config(argv);
        process.exit();
    }

    // handle show-log
    if (typeof argv["show-log"] != "undefined") {
        if (argv["show-log"] == true)
        {
            config["showLog"] = argv["show-log"];
            console.log("showLog set to true");
        }
        else if (argv["show-log"] == false)
        {
            config["showLog"] = argv["show-log"];
            console.log("showLog set to false");
        }
        else
        {
            console.log(`[!] Value for showLog cannot be "${argv["show-log"]}". Please indicate true or false only.`)
        }
    }

    // add-file-exclusions
    if (typeof argv["add-file-exclusions"] != "undefined") {
        config["ignoreFiles"] = config["ignoreFiles"].concat(argv["add-file-exclusions"]);
        console.log(`Added" ${chalk.green(JSON.stringify(argv["add-file-exclusions"]))} to file and folder exclusions.`);
    }

    // add-extension-exclusions
    if (typeof argv["add-extension-exclusions"] != "undefined") {
        config["ignoreExts"] = config["ignoreExts"].concat(argv["add-extension-exclusions"]);
        console.log(`Added" ${chalk.green(JSON.stringify(argv["add-extension-exclusions"]))} to extension exclusions.`);
    }

    // remove-file-exclusions
    if (typeof argv["remove-file-exclusions"] != "undefined") {
        // return array.filter(item => !targetArray.includes(item));
        config["ignoreFiles"] = config["ignoreFiles"].filter(item => !argv["remove-file-exclusions"].includes(item));
        console.log(`Removed" ${chalk.green(JSON.stringify(argv["remove-file-exclusions"]))} from file and folder name exclusions.`);
    }

    // remove-extension-exclusions
    if (typeof argv["remove-extension-exclusions"] != "undefined") {
        // return array.filter(item => !targetArray.includes(item));
        config["ignoreExts"] = config["ignoreExts"].filter(item => !argv["remove-extension-exclusions"].includes(item));
        console.log(`Removed" ${chalk.green(JSON.stringify(argv["remove-extension-exclusions"]))} from extensions exclusion.`);
    }

    // save
    let configPath = path.join(__dirname, "config.json");
    fs.writeFileSync(configPath, JSON.stringify(config));
}

function show_config(argv) {
    // ensure arguments are provided
    if (argv["show"].length == 1) {
        console.log("Please include fields of the settings store you would like to view.\n")
        console.log("\tRun", chalk.green("countlines config --help"), "to view more information.");
        console.log("\tOr", chalk.green("countlines config show all"), "to view current settings store values and fields.\n");
        process.exit(1);
    }

    // display whole config if all arg is present
    for (let item in argv["show"]) {
        if (argv["show"][item] == "all") {
            print_config();
            process.exit();
        }
    }

    // iterate over array
    let fields = argv["show"];
    fields.shift();
    for (let field in fields) {
        if (typeof config[fields[field]] == "undefined") {
            console.log("[!] Field does not exist:", fields[field])
        } else {
            console.log(fields[field], ":", config[fields[field]]);
        }
    }
}

function print_config() {
    console.log("{");
    for (let item in config) {
        console.log("\t", item, ":", config[item]);
    }
    console.log("}");
}

module.exports.reset_config = reset_config;
module.exports.modify_config = modify_config;