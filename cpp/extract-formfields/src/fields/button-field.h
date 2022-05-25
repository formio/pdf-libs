#ifndef POPPLER_PDF_TO_JSON_BUTTON_FIELD_H
#define POPPLER_PDF_TO_JSON_BUTTON_FIELD_H

#include <QtCore>
#include <optional>
#include "field.h"
#include "poppler-qt5.h"
#include "poppler-form.h"

namespace PdfToJson {
    class ButtonField : public Poppler::FormFieldButton, public PdfToJson::Field {
    public:
        QString getButtonType();
    };
}

#endif //POPPLER_PDF_TO_JSON_BUTTON_FIELD_H
