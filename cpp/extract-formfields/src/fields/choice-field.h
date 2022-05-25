#ifndef POPPLER_PDF_TO_JSON_CHOICE_FIELD_H
#define POPPLER_PDF_TO_JSON_CHOICE_FIELD_H

#include <poppler-form.h>
#include <QtCore>
#include "../field.h"

namespace PdfToJson {
    class ChoiceField : public Poppler::FormFieldChoice, public PdfToJson::Field {
    public:
        QString getChoiceType();
    };
}
#endif //POPPLER_PDF_TO_JSON_CHOICE_FIELD_H
