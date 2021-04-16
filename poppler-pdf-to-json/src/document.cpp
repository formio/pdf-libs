#include "document.h"
#include "page.h"

void PdfToJson::Document::addPage(PdfToJson::Page *page) {
    _pages.append(page);
}
void PdfToJson::Document::setFormType(Poppler::Document::FormType formType) {
    switch (formType) {
    case Poppler::Document::AcroForm:
       _formType = "AcroForm";
        break;
    case Poppler::Document::NoForm:
        _formType = "NoForm";
        break;
    case Poppler::Document::XfaForm:
        _formType = "XfaForm";
        break;
    default:
        break;
    }
}
void PdfToJson::Document::setNumPages(int numPages) {
    _numPages = numPages;
}

QJsonObject *PdfToJson::Document::serializeToJson() {
    QJsonObject *documentSerialized = new QJsonObject();
    QJsonArray pagesSerialized;
    for(PdfToJson::Page *page: _pages) {
        pagesSerialized.append(*(page->serializeToJson()));
    }
    documentSerialized->insert("formType", _formType);
    documentSerialized->insert("numPages", _numPages);
    documentSerialized->insert("pages", pagesSerialized);
    return documentSerialized;
}

PdfToJson::Document::~Document()
{
    for(PdfToJson::Page *page: _pages) {
        delete page;
    }
}
