# CLI-LINE-COUNTER USAGES

## Scanning

### Path

The `countlines` command can be run with or without a path.

```Shell
$ countlines [path]
```

Without a path, the current working directory is used for the scan.

A path can either point to file or directory,
as well as being either an absolute or relative path.

If the path is that of a directory, scanning is done recursively.

### Logging

You also have the option to allow a log output at the end of execution.

Here, the filename and path of each file that has been scanned,
as well as the number of lines found within that file
are outputted to the console.

```Shell
$ countlines --log -l
Finished Running Source Code Line Counter
Scanning Path: C:\Developer\cli-line-counter

-- Results --
C:\Developer\cli-line-counter/.gitignore --> 9 items
C:\Developer\cli-line-counter/changelog.md --> 12 items
C:\Developer\cli-line-counter/cli.js --> 100 items
C:\Developer\cli-line-counter/config-default.json --> 8 items
C:\Developer\cli-line-counter/config.js --> 150 items
C:\Developer\cli-line-counter/config.json --> 8 items
C:\Developer\cli-line-counter/index.js --> 7 items
C:\Developer\cli-line-counter/line-counter.js --> 255 items
C:\Developer\cli-line-counter/package-lock.json --> 68 items
C:\Developer\cli-line-counter/package.json --> 26 items
C:\Developer\cli-line-counter/README.md --> 35 items
C:\Developer\cli-line-counter/usage.md --> 41 items


Total number of lines in source code: 719
Have a good day :)
```

### Inclusions and Exclusions

You can also exclude files and folders by name to override the default settings store.

Multiple values should be seperated by a space.

```Shell
$ countlines [path] --exclude -e index.js node_modules
```

Exclusion also works with a list of extensions. Be sure to include the preceding dot in the extension name.

```Shell
$ countlines [path] --exclude-exts -E .js .php
```

Same goes for including files, folders, and extensions otherwise excluded in the settings store.

```Shell
$ countlines [path] --include -i file.json .git
```

```Shell
$ countlines [path] --include-exts -I .cpp .xml
```

### Help

For more information, run `countlines --help`.

## Config

This application has its own configuration file, referred to as the `settings store`, where default
settings can be stored so you don't have to supply each value as an option everytime you run the utility.

### The Command

The command used to interact with the settings store is `countlines config`.

By default, this command prints help information. You can also run `countlines config --help` to view all possible options and arguments.

This command can be used in two modes, viewing the settings store, and modifying it.

### View Configuration

To view the settings store in its entirety, run `countlines config show all`.

To view certain fields, run `countlines config show [field...]`.

You can provide multiple fields at the same time.

Field names must match the same fields used in the settings store file `config.json`, listed below:

```JSON
{
	"showLog": false,
	"ignoreExts": [],
	"ignoreFiles": [
		"node_modules",
		".git"
	]
}
```

For instance, you could run `countlines config show showLog` or
`countlines config show showLog ignoreFiles`. Both are in valid forms.

### Modify Configuration

Enable or disable logging by default.

Running without true or false evaluates to true.

```Shell
$ countlines config --show-log [true|false]
```

Add to file and folder names to be excluded by default.

```Shell
$ countlines config --add-file-exclusions package-lock.json config.json
```

Remove file and folder names from exclusion list.

```Shell
$ countlines config --remove-file-exclusions index.js index.php
```

Add extensions to exclusion list.

```Shell
$ countlines config --add-extension-exclusions .js .php
```

Remove extensions from exclusion list.

```Shell
$ countlines config --remove-extension-exclusions .cpp .json
```

### Reset Configuration

To reset the settings store to its factory defaults, run `countlines config-reset`.

The factory settings are listed below:

```JSON
{
	"showLog": false,
	"ignoreExts": [],
	"ignoreFiles": [
		"node_modules",
		".git"
	]
}
```
