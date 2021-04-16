#ifndef PAGE_H
#define PAGE_H

#include <QtCore>
#include "field.h"

namespace PdfToJson {
    class Page {
    private:
        QList<PdfToJson::Field*> _fields;
        QSizeF _size;
        int _number;
        QJsonArray serializeSize(QSizeF);
    public:
        void addField(PdfToJson::Field*);
        void setSize(QSizeF);
        void setNumber(int);


        QJsonObject *serializeToJson();
        ~Page();
    };
}

#endif
