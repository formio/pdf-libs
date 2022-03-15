#ifndef FIELD_H
#define FIELD_H

#include <QtCore>
#include <optional>
#include "poppler-qt5.h"
#include "poppler-form.h"

namespace PdfToJson {
    class Field : public Poppler::FormField{
    public:
        QJsonArray serializeRect(QRectF);
        QJsonArray serializeList(QStringList);
        template <class T>
        QJsonArray serializeList(QList<T>);

        template <class T1, class T2>
        QJsonObject serializePairsVector(QVector<QPair<T1, T2>>);
        QString getType();
        QJsonObject *serializeToJson();
    };
}

#endif
