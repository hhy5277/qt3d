TARGET = tst_qglsharedresource
CONFIG += testcase
TEMPLATE=app
QT += testlib qt3d opengl
CONFIG += warn_on

INCLUDEPATH += ../../../../src/threed/textures
VPATH += ../../../../src/threed/textures

HEADERS += qglsharedresource_p.h
SOURCES += tst_qglsharedresource.cpp qglsharedresource.cpp

macx:CONFIG+=insignificant_test
