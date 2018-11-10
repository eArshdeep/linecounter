# CLI-LINE-COUNTER

## COMMAND USAGES

### Scanning

The 'countlines' command can be run with or without a path.

```Shell
$ countlines
|-(run scan in the current directory using default settings)
```

```Shell
$ countlines path
|-(run scan using the given path and default settings)
|-(path can be an absolute or relative path to a directory or file)
```

You can exclude files and folders by name to override settings store.

```Shell
$ countlines path --exclude -e index.js node_modules
```

Exclusion also works with a list of extensions.

```Shell
$ countlines path --exclude-exts -E .js .php
```

Same goes for including files, folders, and extensions otherwise excluded in the settings store.

```Shell
$ countlines path --include -i file.json .git
```

```Shell
$ countlines path --include-exts -I .cpp .xml
```
