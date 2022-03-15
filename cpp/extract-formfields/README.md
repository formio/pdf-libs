# Description
poppler-pdf-to-json is a command line tool that allows you to extract information about form fields from PDF documents containing either AcroForms or XfaForms.
poppler-pdf-to-json is based on the Poppler library and its Qt bindings Poppler-Qt.
Qt is used for data manipulation and json serialization.
* Poppler webiste: https://poppler.freedesktop.org/
* Poppler-qt documentation: https://poppler.freedesktop.org/api/qt5/

cmake is used for building the project.
Windows OS is not supported. Ubuntu is not tested. It is strongly recommended to use Alpine WSL2 for development.

# Dependencies
## Ubuntu
* libpoppler
* libpoppler-qt5
* Qt5Core
## Alpine
apk add ...
* poppler
* poppler-dev
* poppler-qt5
* poppler-qt5-dev
* qt5-qtbase
* qt5-qtbase-dev

# Building
## Cmake config
CMakeLists.txt and CmakeLists.txt.alpine are for ubuntu and alpine building resectivly. Different configs are needed because of differencies in package managers work.
## Build steps
* `mkdir build`
* `cd build`
* `cmake ..`
* `make`

# Using
Just pass path to PDF document as a command line arg. Application will write JSON result in stdout.

# Version
Current application version is stored in `version.h`.
Also, to get current application version you can run executable with flag `-v`

# Docs 
Docs available at docs/html/index.html

# Licensing
This source code is licenced under the GPL, version 2 or version 3

License text is available in files:
* `COPYING` - for version 2
* `COPYING3` - for version 3
