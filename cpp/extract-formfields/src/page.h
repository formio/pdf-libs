#ifndef PAGE_H
#define PAGE_H

#include <QtCore>
#include "field.h"
#include "fields/button-field.h"
#include "fields/text-field.h"
#include "fields/choice-field.h"

namespace PdfToJson {
    class Page : public Poppler::Page{
    private:
        QJsonArray serializeSize(QSizeF);
    public:
// MAY BE USED LATER
//        PdfToJson::Field* downcastField(PdfToJson::Field*);
        QList<PdfToJson::Field*> formFields();
        QJsonObject *serializeToJson();
    };
}

#endif
