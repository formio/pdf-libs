cmake_minimum_required(VERSION 3.10)

set (CMAKE_CXX_STANDARD 17)

project(hide-formfields)

find_library(poppler poppler)
find_library(poppler-qt poppler-qt5)
find_library(qt Qt5Core)

message("${qt}")
message("${poppler}")
message("${poppler-qt}")

set(LIB_DIR /lib/x86_64-linux-gnu)

set(INCLUDE_POPPLER /usr/include/poppler/cpp)
set(INCLUDE_POPPLER_QT /usr/include/poppler/qt5)
set(INCLUDE_QT /usr/include/qt5)
set(INCLUDE_QT_CORE /usr/include/qt5/QtCore)

add_executable(hide-formfields main.cpp)

include_directories(${INCLUDE_POPPLER} ${INCLUDE_POPPLER_QT} ${INCLUDE_QT} ${INCLUDE_QT_CORE} include)

target_link_libraries(hide-formfields ${qt} ${poppler} ${poppler-qt})
