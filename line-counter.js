const isBinaryFile = require('isbinaryfile');
const commaNumber = require('comma-number');
const config = require('./config.json');
const chalk = require('chalk');
const _path = require('path');
const fs = require('fs');

class LineCounter {

	/**
	 * Constructor()
	 * @param {Object} argv Arguments vector provided by yargs parser.
	*/
	constructor(argv) {
		this.argv = argv;
		this.prep();
		if(this.mode == "directory")
			this.traverse(this.cwd);	
		if(this.mode == "file")
			this.read(this.cwd);
		this.report();
	}

	/**
	 * Prep program for execution.
	*/
	prep() {
		this.log = [];
		this.lineCount = 0;
		this.determineCWD();
		this.determineLogOption();
		this.excludeExts = this.gatherExcludeOptions('I', 'E', 'ignoreExts');
		this.excludeFiles = this.gatherExcludeOptions('i', 'e', 'ignoreFiles');
	}

	/**
	 * Determine starting directory for scan based on cwd or passed path.
	 * Also determine if program is to run on a directory path or file path.
	*/
	determineCWD(){
		let arg_path = this.argv._[0];
		// if no path is present, set cwd as scan path and continue
		if (arg_path == undefined){
			this.cwd = process.cwd();
			this.mode = "directory";
			return;
		}
		// make path absolute if not already
		if(!_path.isAbsolute(arg_path)){
			arg_path = _path.join(process.cwd(), arg_path);
		}
		// ensure path is valid, end process if not
		if(!fs.existsSync(arg_path)){
			console.log(chalk.red("[!] ERROR: Invalid path given. Please try again."));
			console.log(`<${arg_path}>`);
			process.exit(1);
		}
		/*
			+ Attempt to open path to determine if it is a directory or file
			+ Set mode for application
			|- Mode "directory": recursive scan of a directory path
			|- Mode "file": scanning a single file
		*/
		try {
			let stats = fs.readdirSync(arg_path, {
				withFileTypes: true
			});
			this.mode = "directory";
		} catch (error) {
			if (error.code == "ENOTDIR") {
				this.mode = "file";
			}
		}
		// set path
		this.cwd = arg_path;
	}

	/**
	 * Determine whether to show output log based on settings store
	 * and cli flags.
	*/
	determineLogOption(){
		// if any cli flag regarding log is provided, use that.
		// else default to settings store.
		if( this.argv["log"] != undefined )
			this.showLog = this.argv["log"];
		else
			this.showLog = config["showLog"];
	}

	/**
	 * Outputs program findings to user.
	 * 
	 * Includes the final line count and root path scanned,
	 * and optionally a detailed log of files scanned and their line count.
	*/
	report() {
		console.log("Finished Running Source Code Line Counter");
		console.log(`Scanning Path: ${chalk.yellow(this.cwd)}`);
		if (this.showLog)
		{
			console.log(chalk.yellow("\n-- Results --"));
			for (let item in this.log)
			{
				console.log(`${item} ${chalk.yellow("-->")} ${this.log[item]} items`);
			}
			console.log('\n');
		}
		console.log(`Total number of lines in source code: ${chalk.yellow(commaNumber(this.lineCount))}`);
		console.log("Have a good day :)");
	}

	traverse(path) {
		var nodes = fs.readdirSync(path);
		nodes.forEach(node => {
			// generate url
			let url = path + '/' + node;
			// exit if path does not exist or is mac alias
			if( !LineCounter.exists(url) ) return;
			// gather node data
			let isBinary = LineCounter.isBinary(url);
			let extension = _path.extname(node);
			let stats = fs.statSync(url);
			let isFile = stats.isFile();
			let isFolder = stats.isDirectory();
			/*
				scan files that are
				* a file
				* not binary
				* not in exclusion list
			*/
			if
			(
				isFile &&
				!isBinary &&
				!LineCounter.included(extension, this.excludeExts) &&
				!LineCounter.included(node, this.excludeFiles)
			)
			{
				this.read(url);
			}
			/*
				recursive folder scanning if
				* is a folder
				* not in exclusion list
			*/
			if (isFolder && !LineCounter.included(node, this.excludeFiles))
			{
				this.traverse(url);
			}
		});
	}

	/**
	 * isBinary() determines whether a file is text or binary.
	 * @param {string} path Abs path of a file to test.
	 * @return {boolean} True if file is binary, otherwise false.
	*/
	static isBinary(path)
	{
		return isBinaryFile.sync(path);
	}

	/**
	 * included() determines whether a item is found in a provided array.
	 * @param {string} term Term to find in target array.
	 * @param {array} array Target array.
	 * @return {boolean} True if provided item is found in array.
	*/
	static included(term, array) {
		// return true if term is found in given array
		return array.includes(term);
	}

	/**
	 * exists() checks to see whether a path exists.
	 * Finder alias entities on macOS return false.
	 * @param {string} path Path to check for existance.
	 * @return {boolean} True if given path exists.
	*/
	static exists(path) {
		return fs.existsSync(path);
	}

	/**
	 * read() reads a file given a path.
	 * @param {string} path Path of file to read.
	*/
	read(path) {
		// local line count
		let count = 0;
		// open file
		let file = fs.readFileSync(path);
		// traverse
		for (let byte of file) {
			// detect newline code
			if (byte == 10) count++;
		}
		/* increment count by 1 to account for first line
		if file buffer is not empty */
		if (file.length != 0) count++;
		this.log[path] = count;
		this.lineCount += count;
	}

	/**
	 * resolveDuplicates()
	 * @param {array} array Main array to filter for duplicates.
	 * @param {array} targetArray Array used to compare with main array.
	 * @return {array} Filtered version of the inputted main array.
	 */
	resolveDuplicates(array, targetArray) {
		return array.filter(item => !targetArray.includes(item));
	}

	/**
	 * gatherExcludeOptions(): returns the appropriate final exclude options for either files or extensions.
	 * @param {string} ifield Value for include field. ['i'|'I']
	 * @param {string} efield Value for exclude field. ['e'|'E']
	 * @param {string} configField Field value to use for config object. [ignoreExts|ignoreFiles]
	 * @return {array} Filtered array of values to exclude from scan.
	*/
	gatherExcludeOptions(ifield, efield, configField) {
		let finalOptions = [];
		
		let include;
		if( typeof this.argv[ifield] == "undefined" )
			include = [];
		else
			include = this.argv[ifield];

		let exclude;
		if( typeof this.argv[efield] == "undefined" )
			exclude = [];
		else
			exclude = this.argv[efield];
		
		let stock = config[configField];

		// remove duplicates from cli 'include' and 'exclude' options
		let iFinal = this.resolveDuplicates(include, exclude);
		let eFinal = this.resolveDuplicates(exclude, include);

		// combine exclude option sets
		let finalExclude = eFinal.concat(stock);

		// override cli include options over stock exclude options
		finalOptions = this.resolveDuplicates(finalExclude, iFinal);

		return finalOptions;
	}
}

module.exports = LineCounter;
