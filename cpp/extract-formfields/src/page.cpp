#include <QtCore>
#include "page.h"
#include "field.h"
#include "fields/button-field.h"

QJsonArray PdfToJson::Page::serializeSize(QSizeF size) {
    QJsonArray sizeSerialized = {size.width(), size.height()};
    return sizeSerialized;
}

// MAY BE USED LATER
//PdfToJson::Field *PdfToJson::Page::downcastField(PdfToJson::Field *field) {
//    auto field = static_cast<PdfToJson::Field *>(formField);
//    if (field->type() == Poppler::FormField::FormButton) return reinterpret_cast<PdfToJson::ButtonField *>(field);
//    else if (field->type() == Poppler::FormField::FormText) return reinterpret_cast<PdfToJson::TextField *>(field);
//    else if (field->type() == Poppler::FormField::FormChoice) return reinterpret_cast<PdfToJson::ChoiceField *>(field);
//    else if (field->type() == Poppler::FormField::FormSignature) return field;
//}

QList<PdfToJson::Field *> PdfToJson::Page::formFields() {
    auto formFields = Poppler::Page::formFields();

    QList<PdfToJson::Field *> fields;
    for (auto formField : formFields) {
        fields.append(static_cast<PdfToJson::Field*>(formField));
    }
    return fields;
}


QJsonObject *PdfToJson::Page::serializeToJson() {
    QJsonObject *pageSerialized = new QJsonObject();
    QJsonArray fieldsSerialized;
    for (PdfToJson::Field *field: this->formFields()) {
        fieldsSerialized.append(*(field->serializeToJson()));
    }
    pageSerialized->insert("fields", fieldsSerialized);
    pageSerialized->insert("size", serializeSize(this->pageSizeF()));
    pageSerialized->insert("number", this->index());
    return pageSerialized;
}
