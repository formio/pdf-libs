#ifndef DOCUMENT_H
#define DOCUMENT_H

#include <QtCore>
#include "page.h"
#include "poppler-qt5.h"
#include "poppler-form.h"

namespace PdfToJson {
    class Document {
    private:
        QList<PdfToJson::Page*> _pages;
        QString _formType;
        int _numPages;
    public:
        void addPage(PdfToJson::Page*);
        void setFormType(Poppler::Document::FormType);
        void setNumPages(int);

        QJsonObject* serializeToJson();
        ~Document();
    };
}

#endif
