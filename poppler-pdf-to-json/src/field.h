#ifndef FIELD_H
#define FIELD_H

#include <QtCore>
#include "poppler-qt5.h"
#include "poppler-form.h"

namespace PdfToJson {
    class Field {
    private:
        QString _type;
        QRectF _rect;
        int _id;
        QString _name;
        QString _qualifiedName;
        bool _isVisible;
        QString _uiName;

        QString *_caption;
        QString *_choiceType;
        QStringList *_choices;
        QString *_buttonType;
        QList<int> *_siblings;
        int *_radioGroupId;

        QJsonArray serializeRect(QRectF);
        QJsonArray serializeList(QStringList);
        template <class T>
        QJsonArray serializeList(QList<T>);
    public:
        Field();
        void setType(Poppler::FormField::FormType);
        void setRect(QRectF);
        void setId(int);
        void setName(QString);
        void setQualifiedName(QString);
        void setUiName(QString);
        void setIsVisible(bool);
        void setCaption(QString);
        void setChoiceType(Poppler::FormFieldChoice::ChoiceType);
        void setChoiceOptions(QStringList);
        void setButtonType(Poppler::FormFieldButton::ButtonType);
        void setSiblings(QList<int>);
        void setRadioGroupId(int);

        QJsonObject *serializeToJson();
        ~Field();
    };
}

#endif
