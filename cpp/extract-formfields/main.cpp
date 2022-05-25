#include <QtCore>
#include <QString>
#include <QDebug>
#include <iostream>
#include "poppler-qt5.h"
#include "poppler-form.h"
#include "src/document.h"
#include "src/page.h"
#include "src/field.h"
#include "version.h"

int main(int argc, char **argv) {
    freopen("dev/null", "w", stderr);
    if(QString(argv[1]) == "-v") {
        std::cout << getVersion() << std::endl;
        return 0;
    }

    QString filename;
    filename = QString(argv[1]);

    PdfToJson::Document* document = static_cast<PdfToJson::Document *>(Poppler::Document::load(filename));
    if (!document || document->isLocked()) {
      delete document;
      return 1;
    }

    auto docSerialized = document->serializeToJson();

    auto result = new QJsonDocument(*docSerialized);
    std::cout << std::string(result->toJson().data());

    return 0;
}
