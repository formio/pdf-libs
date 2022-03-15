#include "button-field.h"

QString PdfToJson::ButtonField::getButtonType() {
    switch (this->buttonType()) {
        case Poppler::FormFieldButton::Push:
            return "Push";
        case Poppler::FormFieldButton::CheckBox:
            return "CheckBox";
        case Poppler::FormFieldButton::Radio:
            return "Radio";
        default:
            return "";
    }
}
