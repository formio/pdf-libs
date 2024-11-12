cmake_minimum_required(VERSION 3.10)

set(CMAKE_CXX_STANDARD 17)

project(hide-formfields)

find_package(Qt5Core REQUIRED)
find_library(poppler_LIB poppler)
find_library(poppler_qt_LIB poppler-qt5)

message("Qt5Core found at: ${Qt5Core_LIBRARIES}")
message("Poppler found at: ${poppler_LIB}")
message("Poppler-Qt5 found at: ${poppler_qt_LIB}")

set(INCLUDE_POPPLER /usr/include/poppler/cpp)
set(INCLUDE_POPPLER_QT /usr/include/poppler/qt5)

include_directories(${INCLUDE_POPPLER} ${INCLUDE_POPPLER_QT})

add_executable(hide-formfields main.cpp)

target_link_libraries(hide-formfields Qt5::Core ${poppler_LIB} ${poppler_qt_LIB})
