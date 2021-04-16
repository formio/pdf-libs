#include <QString>
#include <QDebug>
#include <iostream>
#include "poppler-qt5.h"
#include "poppler-form.h"
#include "src/document.h"
#include "src/page.h"
#include "src/field.h"

int main(int argc, char **argv) {
    freopen("dev/null", "w", stderr);

    QString filename;
    filename = QString(argv[1]);

    Poppler::Document* document = Poppler::Document::load(filename);
    if (!document || document->isLocked()) {
      delete document;
      return 1;
    }

    PdfToJson::Document *doc = new PdfToJson::Document();
    auto page = document->page(1);
    auto links = page->links();
    doc->setFormType(document->formType());
    doc->setNumPages(document->numPages());

    for(int pageIndex = 0; pageIndex < document->numPages(); pageIndex++) {
        PdfToJson::Page *page = new PdfToJson::Page();
        Poppler::Page *popplerPage = document->page(pageIndex);
        page->setNumber(pageIndex);
        page->setSize(popplerPage->pageSizeF());

        QList<Poppler::FormField*> pageFields = popplerPage->formFields();
        for(Poppler::FormField *formField: pageFields) {
            PdfToJson::Field *field = new PdfToJson::Field();
            field->setType(formField->type());
            field->setId(formField->id());
            field->setName(formField->name());
            field->setQualifiedName(formField->fullyQualifiedName());
            field->setUiName(formField->uiName());
            field->setIsVisible(formField->isVisible());
            field->setRect(formField->rect());

            if(formField->type() == Poppler::FormField::FormChoice) {
                Poppler::FormFieldChoice *choiceField = dynamic_cast<Poppler::FormFieldChoice*>(formField);
                field->setChoiceType(choiceField->choiceType());
                field->setChoiceOptions(choiceField->choices());
            }

            if(formField->type() == Poppler::FormField::FormButton) {
                Poppler::FormFieldButton *buttonField = dynamic_cast<Poppler::FormFieldButton*>(formField);
                field->setButtonType(buttonField->buttonType());
//                field->setCaption(buttonField->caption());
                if(buttonField->buttonType() == Poppler::FormFieldButton::Radio) {
                    field->setSiblings(buttonField->siblings());
                }
            }

            page->addField(field);
        }

        doc->addPage(page);
    }

    QJsonDocument *result;
    QJsonObject* docSerialized;
    try {
        docSerialized = doc->serializeToJson();
    }
    catch(std::exception) {
        std::cout << "pizdec";
    }
    result = new QJsonDocument(*docSerialized);
    std::cout << std::string(result->toJson().data());

    delete document;
    delete doc;
    delete result;
    return 0;

}
