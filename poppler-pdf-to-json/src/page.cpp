#include <QtCore>
#include "page.h"
#include "field.h"

QJsonArray PdfToJson::Page::serializeSize(QSizeF size) {
    QJsonArray sizeSerialized = {size.width(), size.height()};
    return sizeSerialized;
}

void PdfToJson::Page::addField(PdfToJson::Field *field) {
    _fields.append(field);
}

void PdfToJson::Page::setSize(QSizeF size) {
    _size = size;
}

void PdfToJson::Page::setNumber(int number) {
    _number = number;
}

QJsonObject* PdfToJson::Page::serializeToJson() {
    QJsonObject *pageSerialized = new QJsonObject();
    QJsonArray fieldsSerialized;
    for(PdfToJson::Field* field: _fields) {
        fieldsSerialized.append(*(field->serializeToJson()));
    }
    pageSerialized->insert("fields", fieldsSerialized);
    pageSerialized->insert("size", serializeSize(_size));
    pageSerialized->insert("number", _number);
    return pageSerialized;
}

PdfToJson::Page::~Page()
{
    for(PdfToJson::Field* field: _fields) {
        delete field;
    }
}
