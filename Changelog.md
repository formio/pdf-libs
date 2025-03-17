# Change Log
All notable changes to this project will be documented in this file

## 2.2.0-rc.20
### Changed
 - Update node image

## 2.2.0-rc.19
### Changed
 - Update image

## 2.2.0-rc.18
### Changed
 - Correct versioning

## 2.2.0-rc.17
### Changed
 - Update image

## 2.2.0-rc.16
###
 - Update image

## 2.2.0-rc.15
###
 - Update image

## 2.2.0-rc.14
### Changed
 - Update image

## 2.2.0-rc.13
### Changed
 - Fix HTML Generation Timeout Parsing and Add PDFLIBS_PORT to Configuration

## 2.2.0-rc.12
### Changed 
 - FIO-9254: Add mutilstage build 
   
## 2.2.0-rc.11
### Changed
 - FIO-9177: update dockerfile to build pdf2htmlex from source

## 2.2.0-rc.10
### Changed
 - Update image

## 2.2.0-rc.9
### Changed
 - Update image
 - Update debug@4.3.7
 - Update express@4.21.1

## 2.2.0-rc.8
### Changed
 - Actually update yarn.lock

## 2.2.0-rc.7
### Changed
 - Update yarn.lock

## 2.2.0-rc.6
### Changed
 - Update image

## 2.2.0-rc.5
### Changed
 - remove non-functional tests

## 2.2.0-rc.4
### Changed
 - FIO-8733: Update Docker build process

## 2.2.0-rc.3
### Changed
 - Fix formidable upload issue, fix error handling, do structural refactor

## 2.1.3-rc.7
### Changed
 - Update image

## 2.1.3-rc.6
### Changed
 - Update image

## 2.1.3-rc.5
### Changed
 - Update image

## 2.1.3-rc.4
### Changed
 - Update image

## 2.1.3-rc.3
### Changed
 - Update image
 - FIO-7820: Update Dockerfile to pull in Node.js v20

## 2.1.3-rc.2
### Changed
 - FIO-7589: hotfix for no return crash

## 2.1.3-rc.1
### Changed
 - Update build

## 2.1.2
### Changed
 - Official Release

## 2.1.2-rc.1
### Changed
 - add debug dependency

## 2.1.1
### Changed
 - Official Release

## 2.1.1-rc.3
### Changed
 - Update build

## 2.1.1-rc.2
### Changed
 - update nodesource script

## 2.1.1-rc.1
### Changed
 - Updated build
   
## 2.1.0
### Changed
 - Official Release

## 2.1.0-rc.1
### Changed
 - FIO-7174: Added poppler-utils
   
## 2.0.5
### Changed
 - Official Release
   
## 2.0.5-rc.5
### Changed
 - port env variable name changed to PDFLIBS_PORT
## 2.0.5-rc.4
### Fixed
 - FIO-6389: max stdout buffer for extractFormfields increased
### Changed
 - Github Actions workflows added
 - Unit tests for extract-formfields added
 - FIO-5005: Circle CI config added
## 2.0.5-rc.3
### Changed
 - FIO-6640: Move to Ubuntu to fix dependency problems between chromium and pdf2htmlEX

## 2.0.5-rc.1
- updated Dockerfile to eliminate edge dependencies

## 2.0.4
- do not use

## 2.0.3
- fixed HTML generation hang up for some PDFs
- basic linting added
- some dependecies updated
## 2.0.2
### Changed
- nodejs updated to resolve CVE-2022-32213

## 2.0.1
### Changed
- poppler updated to 22.09.0 to resolve CVE-2022-38784
- build sctipts filemode changed to more allowing

## 2.0.0
### Changed
- extract-formfields tool (ex PDF to JSON) merged into pdf-libs
- Swagger documentation removed due to CVE
- Files cleanup added
- Non optimized pdfs handling fixed
- Edpoints renamed
  - `/pdf/pdf2html` -> `/pdf/convertToHtml`
  - `/pdf/pdf2json` -> `/pdf/getFormfields`

## 1.0.2-rc.2
### Changed
- [PDF to JSON](https://gitlab.com/formio/pdf-to-json) version updated to [1.0.1-rc.2](https://gitlab.com/formio/pdf-to-json/-/tree/1.0.1-rc.2)

## 1.0.2-rc.1
### Changed
- `/version` endpoint added (commits [430f783](https://gitlab.com/formio/pdf-libs/-/commit/430f78e9be97a96dee532d4b085eca18389f9b15), [7b0e602](https://gitlab.com/formio/pdf-libs/-/commit/7b0e602b2f814acebc9cd31e38365d0a84accb12), [e1ae36c](https://gitlab.com/formio/pdf-libs/-/commit/e1ae36c3cbb4e27af96b897f82bac36fb60a76bc))
- [PDF to JSON](https://gitlab.com/formio/pdf-to-json) version updated to [1.0.1-rc.1](https://gitlab.com/formio/pdf-to-json/-/tree/1.0.1-rc.1) (commit [c509d355](https://gitlab.com/formio/pdf-libs/-/commit/c509d35523fda3992ff925f24b1d60bc8b9b00a0))
