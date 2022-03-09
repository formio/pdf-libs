#include <QtCore>
#include <QString>
#include <QDebug>
#include <iostream>
#include "poppler-qt5.h"
#include "poppler-form.h"

bool saveToFile(const QString &filename, const Poppler::Document* doc) {
    Poppler::PDFConverter *pdfConv = doc->pdfConverter();
    pdfConv->setOutputFileName(filename);
    pdfConv->setPDFOptions(pdfConv->pdfOptions()|Poppler::PDFConverter::WithChanges);
    bool success = pdfConv->convert();
    delete pdfConv;

    return success;
}

int main(int argc, char **argv) {
    freopen("dev/null", "w", stderr);

    QString filename, toFile;
    filename = QString(argv[1]);
    toFile = QString(argv[2]);

    Poppler::Document* doc = Poppler::Document::load(filename);
    Poppler::Page* page = doc->page(0);
    QList<Poppler::FormField *> fields = page->formFields();

    for(int j = 0; j < fields.length(); j++) {
        Poppler::FormField *f = fields.at(j);
        f->setVisible(false);
    }

    saveToFile(toFile, doc);

    return 0;
}
