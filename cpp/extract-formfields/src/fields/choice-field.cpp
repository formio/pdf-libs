#include "choice-field.h"

QString PdfToJson::ChoiceField::getChoiceType() {
    switch (this->choiceType()) {
        case Poppler::FormFieldChoice::ComboBox:
            return "ComboBox";
            break;
        case Poppler::FormFieldChoice::ListBox:
            return "ListBox";
            break;
        default:
            break;
    }
}
