#!/usr/bin/env node

const LineCounter = require('./line-counter.js');
const argv = require('./cli.js');

const app = new LineCounter(argv);
