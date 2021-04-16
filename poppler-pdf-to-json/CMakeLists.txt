cmake_minimum_required(VERSION 3.10)

# set(CMAKE_C_COMPILER_WORKS 1)
# set(CMAKE_CXX_COMPILER_WORKS 1)

project(poppler-pdf-to-json)
# set(CMAKE_FIND_LIBRARY_PREFIXES /usr/lib/x86_64-linux-gnu/)
# set(CMAKE_FIND_LIBRARY_SUFFIXES .so)
# find_package(poppler)
# find_library(poppler-qt libpoppler-qt5-dev)
# message("poppler is at ${poppler}")
# message("popplre-qt is at ${poppler-qt}")

set(LIB_DIR /lib/x86_64-linux-gnu)

set(INCLUDE_POPPLER /usr/include/poppler/cpp)
set(INCLUDE_POPPLER_QT /usr/include/poppler/qt5)
set(INCLUDE_QT /usr/include/QtCore)

list(APPEND CMAKE_PREFIX_PATH /usr/lib)
list(APPEND CMAKE_PREFIX_PATH ${LIB_DIR})
list(APPEND CMAKE_PREFIX_PATH /usr/share/lintian/overrides)

# find_library(libpoppler libpoppler.so poppler)
# find_library(libpoppler-qt5 libpoppler-qt5.so poppler-qt5)

# find_library(qt libQt5Core.so REQUIRED)
# find_package(Qt5 COMPONENTS Core REQUIRED) ## FOR UBUNTU

# message("${libpoppler}")
# message("${libpoppler-qt5}")
# message("${qt}")

add_executable(poppler-pdf-to-json main.cpp src/document.cpp src/page.cpp src/field.cpp)

include_directories(${INCLUDE_POPPLER} ${INCLUDE_POPPLER_QT} ${INCLUDE_QT} ${CMAKE_SOURCE_DIR}/src)

# target_link_libraries(main Qt5::Core /lib/x86_64-linux-gnu/libpoppler.so /lib/x86_64-linux-gnu/libpoppler-qt5.so) FOR UBUNTU

target_link_libraries(poppler-pdf-to-json /usr/lib/libQt5Core.so.5 /usr/lib/libpoppler.so.109 /usr/lib/libpoppler-qt5.so.1)
