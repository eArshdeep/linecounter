# Source Code Line Counter

Command line utility written in node.js for counting the number of lines in a source code directory recursively.

### Install

`$ npm install -g cli-line-counter`

## Usage

Run

`$ countlines`

Output

```
Finished running Source Line Counter

-- Results --
/Code/linecounter/.package-lock.json ==> 15 lines
/Code/linecounter/.package.json ==> 14 lines
/Code/linecounter/.cli.js ==> 91 lines
/Code/linecounter/.README.md ==> 14 lines


Total number of lines in source code: 134
Good day :)
```

## File Structure

`./line-counter.js` contains source code for program functionality

`./cli.js` serves as command line wrapper for source code
