#!/bin/bash
set -ev
mkdir bin
mkdir build
cd build
cmake ..
make
mv extract-formfields ../bin
