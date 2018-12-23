# Source Code Line Counter

Command line utility written in node.js for counting the number of lines in a source code directory recursively.

### Install

```Shell
$ npm install -g cli-line-counter
```

## Usage

Run

```Shell
$ countlines --log
Finished Running Source Code Line Counter
Scanning Path: C:\Users\eArshdeep\cli-line-counter

-- Results --
C:\Users\eArshdeep\cli-line-counter\.gitignore --> 9 items
C:\Users\eArshdeep\cli-line-counter\README.md --> 42 items
C:\Users\eArshdeep\cli-line-counter\changelog.md --> 19 items
C:\Users\eArshdeep\cli-line-counter\cli.js --> 100 items
C:\Users\eArshdeep\cli-line-counter\config-default.json --> 8 items
C:\Users\eArshdeep\cli-line-counter\config.js --> 150 items
C:\Users\eArshdeep\cli-line-counter\config.json --> 8 items
C:\Users\eArshdeep\cli-line-counter\index.js --> 7 items
C:\Users\eArshdeep\cli-line-counter\line-counter.js --> 280 items
C:\Users\eArshdeep\cli-line-counter\package-lock.json --> 424 items
C:\Users\eArshdeep\cli-line-counter\package.json --> 26 items
C:\Users\eArshdeep\cli-line-counter\usage.md --> 169 items


Total number of lines in source code: 1,242 (in 12 files)
Have a good day :)
```

For the complete guide to usages and examples for this utility, please see [usage.md](usage.md).

Alternatively, refer to the [changelog](changelog.md) for details regarding version history.
