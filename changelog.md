# CLI-LINE-COUNTER CHANGELOG

## v1.0.7 (released 12/23/2018)

* Bump from version 1.0.6 to 1.0.7
* Changed `readme.md` usage section

## v1.0.6 (released 12/23/2018)

* Bump from version 1.0.5 to 1.0.6.
* Added `usage.md` to explain best use cases.
* Started keeping release notes in `changelog.md`.
* Added ability to scan a path passed as a cli argument.
* Added ability to scan a single file when a file name is passed as a cli argument.
* Added ability to exclude file names, folder names, and extensions from scan.
* Added application configuration that is loaded from a local settings store and merged with command line arguments during execution.
* Made final scan log output to console optinal based on configuration file or arguments.
* Updated colors used in console output.
* Added ability to view, modify, and reset settings store.
* Updated `readme.md`
* Started displaying the path upon which the scan was conducted.
* Added safeguards to check for read access before scanning files and directories.
* Final output of scan now shows how many files were scanned.
