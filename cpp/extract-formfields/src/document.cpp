#include "document.h"
#include "page.h"

QList<PdfToJson::Page *> PdfToJson::Document::pages() {
    QList<PdfToJson::Page *> pages;
    for(int pageIndex = 0; pageIndex < this->numPages(); pageIndex++) {
        pages.append(static_cast<PdfToJson::Page*>(this->page(pageIndex)));
    }
    return pages;
}

QString PdfToJson::Document::getFormType() {
    switch (this->formType()) {
        case Poppler::Document::NoForm: return "NoForm";
        case Poppler::Document::AcroForm: return "AcroForm";
        case Poppler::Document::XfaForm: return "XfaForm";
        default: return "Unsupported";
    }
}

QJsonObject *PdfToJson::Document::serializeToJson() {
    QJsonObject *documentSerialized = new QJsonObject();
    QJsonArray pagesSerialized;
    for(PdfToJson::Page *page: this->pages()) {
        pagesSerialized.append(*(page->serializeToJson()));
    }
    documentSerialized->insert("formType", this->getFormType());
    documentSerialized->insert("numPages", this->numPages());
    documentSerialized->insert("pages", pagesSerialized);
    return documentSerialized;
}
