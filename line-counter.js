const isBinaryFile = require('isbinaryfile');
const commaNumber = require('comma-number');
const config = require('./config.json');
const chalk = require('chalk');
const _path = require('path');
const fs = require('fs');

module.exports = class LineCounter {
	constructor() {
		this.prep();
		this.traverse(this.cwd);
		this.report();
	}

	prep() {
		this.log = [];
		this.cwd = process.cwd();
		this.excludeExts = config.ignoreExtensions;
		this.excludeFolders = config.ignoreFolders;
	}

	report() {
		let linecount = 0;
		console.log(chalk.blue("Finished running Source Line Counter \n"));
		console.log(chalk.blue("-- Results --"));
		for (let item in this.log) {
			console.log(chalk.magenta(item), '-->', chalk.red(this.log[item], 'lines'));
			linecount += this.log[item];
		}
		console.log('\n')
		console.log(chalk.blue("Total number of lines in source code:"), chalk.red(commaNumber(linecount), 'lines'))
		console.log(chalk.blue("Good day :)"))
	}

	traverse(path) {
		var nodes = fs.readdirSync(path);
		nodes.forEach(node => {
			// generate url
			let url = path + '/' + node;
			// exit if path does not exist or is mac alias
			if( !this.exists(url) ) return;
			// gather node data
			let isBinary = this.isBinary(url);
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
			if (isFile &&
				!isBinary &&
				!this.included(extension, this.excludeExts)) { this.read(url); }
			/*
				recursive folder scanning if
				* is a folder
				* not in exclusion list
			*/
			if (isFolder && !this.included(node, this.excludeFolders)) {
				this.traverse(url);
			}
		});
	}

	isBinary(path) {
		// return true if file is binary given a path
		return isBinaryFile.sync(path);
	}

	included(term, array) {
		// return true if term is found in given array
		return array.includes(term);
	}

	exists(path) {
		/*
			Check to see if path exists
			Finder alias entities on mac return false
		*/
		return fs.existsSync(path);
	}

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
	}
}
