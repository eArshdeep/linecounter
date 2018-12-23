# Source Code Line Counter

Command line utility written in node.js for counting the number of lines in a source code directory recursively.

### Install

```Shell
$ npm install -g cli-line-counter
```

## Usage

Run

```Shell
$ countlines
Finished Running Source Code Line Counter
Scanning Path: C:\Users\Arshdeep Padda\OneDrive\cli-line-counter
Total number of lines in source code: 908 (in 13 files)
Have a good day :)

Arshdeep Padda@CoolerMasterPC MINGW64 ~/OneDrive/cli-line-counter (v1.0.6)
$ countlines --log
Finished Running Source Code Line Counter
Scanning Path: C:\Users\Arshdeep Padda\OneDrive\cli-line-counter

-- Results --
C:\Users\Arshdeep Padda\OneDrive\cli-line-counter/.gitignore --> 9 items
C:\Users\Arshdeep Padda\OneDrive\cli-line-counter/.vscode/launch.json --> 23 items
C:\Users\Arshdeep Padda\OneDrive\cli-line-counter/changelog.md --> 19 items
C:\Users\Arshdeep Padda\OneDrive\cli-line-counter/cli.js --> 100 items
C:\Users\Arshdeep Padda\OneDrive\cli-line-counter/config-default.json --> 8 items
C:\Users\Arshdeep Padda\OneDrive\cli-line-counter/config.js --> 150 items
C:\Users\Arshdeep Padda\OneDrive\cli-line-counter/config.json --> 8 items
C:\Users\Arshdeep Padda\OneDrive\cli-line-counter/index.js --> 7 items
C:\Users\Arshdeep Padda\OneDrive\cli-line-counter/line-counter.js --> 280 items
C:\Users\Arshdeep Padda\OneDrive\cli-line-counter/package-lock.json --> 68 items
C:\Users\Arshdeep Padda\OneDrive\cli-line-counter/package.json --> 26 items
C:\Users\Arshdeep Padda\OneDrive\cli-line-counter/README.md --> 42 items
C:\Users\Arshdeep Padda\OneDrive\cli-line-counter/usage.md --> 169 items


Total number of lines in source code: 909 (in 13 files)
Have a good day :)
```

For the complete guide to usages and examples for this utility, please see [usage.md](usage.md).

Alternatively, refer to the [changelog](changelog.md) for details regarding version history.
