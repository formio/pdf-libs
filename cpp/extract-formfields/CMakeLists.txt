cmake_minimum_required(VERSION 3.10)

set (CMAKE_CXX_STANDARD 17)
option(STATIC "Build static binary" ON)
project(extract-formfields)

find_library(poppler poppler)
find_library(poppler-qt poppler-qt5)
find_library(qt Qt5Core)

message("${qt}")
message("${poppler}")
message("${poppler-qt}")
add_definitions(-fPIC)

set(LIB_DIR /lib/x86_64-linux-gnu)

set(INCLUDE_POPPLER /usr/include/poppler/cpp)
set(INCLUDE_POPPLER_QT /usr/include/poppler/qt5)
set(INCLUDE_QT /usr/include/x86_64-linux-gnu/qt5)
set(INCLUDE_QT_CORE /usr/include/x86_64-linux-gnu/qt5/QtCore)

add_executable(extract-formfields main.cpp version.h src/document.cpp src/page.cpp src/field.cpp src/fields/button-field.cpp src/fields/text-field.cpp src/fields/choice-field.cpp)

include_directories(${INCLUDE_POPPLER} ${INCLUDE_POPPLER_QT} ${INCLUDE_QT} ${INCLUDE_QT_CORE} ${CMAKE_SOURCE_DIR}/src ${CMAKE_SOURCE_DIR}/src/fields include)

target_link_libraries(extract-formfields ${qt} ${poppler} ${poppler-qt})
