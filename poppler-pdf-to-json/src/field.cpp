#include <QtCore>
#include "field.h"

QJsonArray PdfToJson::Field::serializeRect(QRectF rect) {
    qreal left = rect.left();
    qreal top = rect.top();
    qreal right = rect.right();
    qreal bottom = rect.bottom();

    QJsonArray rectSerialized = {left, top, right, bottom};
    return rectSerialized;
}

QJsonArray PdfToJson::Field::serializeList(QStringList list)
{
    QJsonArray arraySerialized;
    for(QString str: list) {
        arraySerialized.append(str);
    }
    return arraySerialized;
}

PdfToJson::Field::Field()
{
    _caption = nullptr;
    _choiceType = nullptr;
    _choices = nullptr;
    _buttonType = nullptr;
    _siblings = nullptr;
    _radioGroupId = nullptr;
}

template <class T>
QJsonArray PdfToJson::Field::serializeList(QList<T> list)
{
    QJsonArray arraySerialized;
    for(T value: list) {
        arraySerialized.append(value);
    }
    return arraySerialized;
}

void PdfToJson::Field::setType(Poppler::FormField::FormType type) {
    switch (type) {
    case Poppler::FormField::FormButton:
        _type = "FormButton";
        break;
    case Poppler::FormField::FormText:
        _type = "FormText";
        break;
    case Poppler::FormField::FormChoice:
        _type = "FormChoice";
        break;
    case Poppler::FormField::FormSignature:
        _type = "FormSignature";
        break;
    default:
        break;
    }
}

void PdfToJson::Field::setRect(QRectF rect) {
    _rect = rect;
}

void PdfToJson::Field::setId(int id) {
    _id = id;
}

void PdfToJson::Field::setName(QString name) {
    _name = name;
}

void PdfToJson::Field::setQualifiedName(QString qualifiedName) {
    _qualifiedName = qualifiedName;
}

void PdfToJson::Field::setUiName(QString uiName)
{
    _uiName = uiName;
}

void PdfToJson::Field::setIsVisible(bool isVisible)
{
    _isVisible = isVisible;
}

void PdfToJson::Field::setCaption(QString caption)
{
    _caption = &caption;
}

void PdfToJson::Field::setChoiceType(Poppler::FormFieldChoice::ChoiceType choiceType)
{
    switch (choiceType) {
    case Poppler::FormFieldChoice::ComboBox:
       _choiceType = new QString("ComboBox");
        break;
    case Poppler::FormFieldChoice::ListBox:
        _choiceType = new QString("ListBox");
        break;
    default:
        break;
    }
}

void PdfToJson::Field::setChoiceOptions(QStringList choiceOptions)
{
    _choices = &choiceOptions;
}

void PdfToJson::Field::setButtonType(Poppler::FormFieldButton::ButtonType buttonType)
{
    switch (buttonType) {
    case Poppler::FormFieldButton::Push:
       _buttonType = new QString("Push");
        break;
    case Poppler::FormFieldButton::CheckBox:
        _buttonType = new QString("CheckBox");
        break;
    case Poppler::FormFieldButton::Radio:
        _buttonType = new QString("Radio");
        break;
    default:
        break;
    }
}

void PdfToJson::Field::setSiblings(QList<int> siblings)
{
    _siblings = new QList<int>(siblings);
}

void PdfToJson::Field::setRadioGroupId(int radioGroupId)
{
    _radioGroupId = &radioGroupId;
}

QJsonObject* PdfToJson::Field::serializeToJson() {
    QJsonObject *fieldSerialized = new QJsonObject();

    fieldSerialized->insert("type", _type);
    fieldSerialized->insert("rect", serializeRect(_rect));
    fieldSerialized->insert("id", _id);
    fieldSerialized->insert("isVisible", _isVisible);
    fieldSerialized->insert("name", _name);
    fieldSerialized->insert("qualifiedName", _qualifiedName);
    fieldSerialized->insert("uiName", _uiName);
//    if(_caption != 0x0) fieldSerialized->insert("caption", *(_caption));
    if(_choiceType != nullptr) fieldSerialized->insert("choiceType", *_choiceType);
    if(_choices != nullptr) fieldSerialized->insert("choiceOptions", serializeList(*_choices));
    if(_buttonType != nullptr) fieldSerialized->insert("buttonType", *_buttonType);
    if(_siblings != nullptr) fieldSerialized->insert("siblings", serializeList(*_siblings));
    if(_radioGroupId != nullptr) fieldSerialized->insert("radioGroupId", *_radioGroupId);
    return fieldSerialized;
}

PdfToJson::Field::~Field()
{
    delete _caption;
    delete _choiceType;
    delete _choices;
    delete _buttonType;
    delete _siblings;
    delete _radioGroupId;
}
