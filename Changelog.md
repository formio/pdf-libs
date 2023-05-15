# Change Log
All notable changes to this project will be documented in this file

# [Unreleased 2.0.5-rc.4]
## Changed
 - FIO-5005: Circle CI config added

# 2.0.5-rc.3
## Changed
 - FIO-6640: Move to Ubuntu to fix dependency problems between chromium and pdf2htmlEX

# 2.0.5-rc.1
- updated Dockerfile to eliminate edge dependencies

# 2.0.4
- do not use

# 2.0.3
- fixed HTML generation hang up for some PDFs
- basic linting added
- some dependecies updated
# 2.0.2
### Changed
- nodejs updated to resolve CVE-2022-32213

# 2.0.1
### Changed
- poppler updated to 22.09.0 to resolve CVE-2022-38784
- build sctipts filemode changed to more allowing

# 2.0.0
### Changed
- extract-formfields tool (ex PDF to JSON) merged into pdf-libs
- Swagger documentation removed due to CVE
- Files cleanup added
- Non optimized pdfs handling fixed
- Edpoints renamed
  - `/pdf/pdf2html` -> `/pdf/convertToHtml`
  - `/pdf/pdf2json` -> `/pdf/getFormfields`

# 1.0.2-rc.2
### Changed
- [PDF to JSON](https://gitlab.com/formio/pdf-to-json) version updated to [1.0.1-rc.2](https://gitlab.com/formio/pdf-to-json/-/tree/1.0.1-rc.2)

# 1.0.2-rc.1
### Changed
- `/version` endpoint added (commits [430f783](https://gitlab.com/formio/pdf-libs/-/commit/430f78e9be97a96dee532d4b085eca18389f9b15), [7b0e602](https://gitlab.com/formio/pdf-libs/-/commit/7b0e602b2f814acebc9cd31e38365d0a84accb12), [e1ae36c](https://gitlab.com/formio/pdf-libs/-/commit/e1ae36c3cbb4e27af96b897f82bac36fb60a76bc))
- [PDF to JSON](https://gitlab.com/formio/pdf-to-json) version updated to [1.0.1-rc.1](https://gitlab.com/formio/pdf-to-json/-/tree/1.0.1-rc.1) (commit [c509d355](https://gitlab.com/formio/pdf-libs/-/commit/c509d35523fda3992ff925f24b1d60bc8b9b00a0))
