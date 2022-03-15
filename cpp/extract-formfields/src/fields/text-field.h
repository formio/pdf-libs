#ifndef POPPLER_PDF_TO_JSON_TEXT_FIELD_H
#define POPPLER_PDF_TO_JSON_TEXT_FIELD_H

#include <poppler-form.h>
#include <QtCore>
#include "../field.h"

namespace PdfToJson {
    class TextField : public Poppler::FormFieldText, public PdfToJson::Field {
    public:
        QString getTextAlignment();
        QString getTextType();
    };
}
#endif //POPPLER_PDF_TO_JSON_TEXT_FIELD_H
