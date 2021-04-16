# Description
poppler-pdf-to-json is a command line tool that allows you to extract information about form fields from PDF documents containing either AcroForms or XfaForms.
poppler-pdf-to-json is based on the Poppler library and its Qt bindings Poppler-Qt.
Qt is used for data manipulation and json serialization.
cmake is used for building the project.
For now only ubuntu and alpine are supported OS.

# Dependencies
## Ubuntu
* libpoppler
* libpoppler-qt5
* Qt5Core
## Alpine
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
