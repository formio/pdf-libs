#include <QtCore>
#include "field.h"
#include <QDebug>
#include <iostream>
#include "fields/button-field.h"
#include "fields/choice-field.h"
#include "fields/text-field.h"

QJsonArray PdfToJson::Field::serializeRect(QRectF rect) {
    qreal left = rect.left();
    qreal top = rect.top();
    qreal right = rect.right();
    qreal bottom = rect.bottom();

    QJsonArray rectSerialized = {left, top, right, bottom};
    return rectSerialized;
}

QJsonArray PdfToJson::Field::serializeList(QStringList list) {
    QJsonArray arraySerialized;
    for (QString str: list) {
        arraySerialized.append(str);
    }
    return arraySerialized;
}

template<class T>
QJsonArray PdfToJson::Field::serializeList(QList <T> list) {
    QJsonArray arraySerialized;
    for (T value: list) {
        arraySerialized.append(value);
    }
    return arraySerialized;
}
template <class T1, class T2>
QJsonObject PdfToJson::Field::serializePairsVector(QVector<QPair<T1, T2>> vector) {
    QJsonObject objectSerialized;
    for (auto pair: vector) {
        objectSerialized.insert(pair.first, pair.second);
    }
    return objectSerialized;
}

QString PdfToJson::Field::getType() {
    switch (this->type()) {
        case Poppler::FormField::FormButton:
            return "FormButton";
        case Poppler::FormField::FormText:
            return "FormText";
        case Poppler::FormField::FormChoice:
            return "FormChoice";
        case Poppler::FormField::FormSignature:
            return "FormSignature";
        default:
            return "";
    }
}


QJsonObject *PdfToJson::Field::serializeToJson() {
    QJsonObject *fieldSerialized = new QJsonObject();

    fieldSerialized->insert("type", this->getType());
    fieldSerialized->insert("rect", serializeRect(this->rect()));
    fieldSerialized->insert("id", this->id());
    fieldSerialized->insert("isVisible", this->isVisible());
    fieldSerialized->insert("name", this->name());
    fieldSerialized->insert("qualifiedName", this->fullyQualifiedName());
    fieldSerialized->insert("uiName", this->uiName());

    if(this->type() == Poppler::FormField::FormButton) {
        auto buttonField = reinterpret_cast<PdfToJson::ButtonField*>(this);
        fieldSerialized->insert("buttonType", buttonField->getButtonType());

        if(buttonField->buttonType() == Poppler::FormFieldButton::Radio ||
           buttonField->buttonType() == Poppler::FormFieldButton::CheckBox) {
            fieldSerialized->insert("exportValue", buttonField->caption());
        }

        if(buttonField->buttonType() == Poppler::FormFieldButton::Radio) {
            fieldSerialized->insert("siblings", serializeList(buttonField->siblings()));
        }
    }
    if(this->type() == Poppler::FormField::FormText) {
        auto textField = reinterpret_cast<PdfToJson::TextField*>(this);
        fieldSerialized->insert("isPassword", textField->isPassword());
        fieldSerialized->insert("fontSize", textField->getFontSize());
        fieldSerialized->insert("maxLength", textField->maximumLength());
        fieldSerialized->insert("textAlignment", textField->getTextAlignment());
        fieldSerialized->insert("textType", textField->getTextType());
    }
    if(this->type() == Poppler::FormField::FormChoice) {
        auto choiceField = reinterpret_cast<PdfToJson::ChoiceField*>(this);
        fieldSerialized->insert("choiceType", choiceField->getChoiceType());
        fieldSerialized->insert("choices", serializePairsVector(choiceField->choicesWithExportValues()));
    }

    return fieldSerialized;
}