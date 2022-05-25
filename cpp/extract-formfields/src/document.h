#ifndef DOCUMENT_H
#define DOCUMENT_H

#include <QtCore>
#include "page.h"
#include "poppler-qt5.h"
#include "poppler-form.h"

namespace PdfToJson {
    class Document : public Poppler::Document {
    public:
        QList<PdfToJson::Page*> pages();
        QString getFormType();
        QJsonObject* serializeToJson();
    };
}

#endif
