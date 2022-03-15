#include "text-field.h"

QString PdfToJson::TextField::getTextAlignment() {
    switch (this->textAlignment()) {
        case Qt::AlignLeft:
            return "left";
        case Qt::AlignRight:
            return "right";
        case Qt::AlignHCenter:
            return "hcenter";
        case Qt::AlignJustify:
            return "justify";
        case Qt::AlignTop:
            return "top";
        case Qt::AlignBottom:
            return "bottom";
        case Qt::AlignVCenter:
            return "vcenter";
        case Qt::AlignBaseline:
            return "baseline";
        default:
            return "";
    }
}

QString PdfToJson::TextField::getTextType() {
    switch (this->textType()) {
        case Poppler::FormFieldText::Normal:
            return "Normal";
        case Poppler::FormFieldText::Multiline:
            return "Multiline";
        case Poppler::FormFieldText::FileSelect:
            return "FileSelect";
        default:
            return "";
    }
}
