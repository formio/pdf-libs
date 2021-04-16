{
  'targets': [
    {
      'target_name': 'poppler-pdf-to-json',
      'sources': [
        'addon.cc',
      ],
      'conditions': [
        ['OS=="mac"', {
          'xcode_settings': {
            'OTHER_CFLAGS': [
              '-std=c++11 -stdlib=libc++',
              '-mmacosx-version-min=10.7'
            ],
          },
          'include_dirs': [
            'deps/poppler',
            'deps/qt-5.3.0/darwin/x64/include',
            'deps/qt-5.3.0/darwin/x64/include/QtCore',
          ],
          'libraries': [
            '../deps/qt-5.3.0/darwin/x64/lib/QtCore.framework/QtCore',
            # '../deps/poppler/libpoppler.dll.a',
            # '../deps/poppler/libpoppler-qt5.dll.a',
          ],
        }],
        ['OS=="linux"', {
          'cflags': [
            '<!@(pkg-config --cflags Qt5Core)'
          ],
          'ldflags': [
            '<!@(pkg-config --libs-only-L --libs-only-other Qt5Core)'
          ],
          'libraries': [
            '<!@(pkg-config --libs-only-l Qt5Core)'
          ]
        }],
        ['OS=="win"', {
          'include_dirs': [
              'deps/poppler',
              'deps/qt-5.3.0/win32/ia32/include',
              'deps/qt-5.3.0/win32/ia32/include/QtCore',
          ],
          'libraries': [
              '../deps/qt-5.3.0/win32/ia32/lib/Qt5Core.lib',
              '../deps/poppler/poppler-cpp.lib',
              '../deps/poppler/poppler-glib.lib',
              '../deps/poppler/poppler.lib',
          ],
          'copies': [
            {
              'destination': 'build/Release/',
              'files': [
                'deps/qt-5.3.0/win32/ia32/Qt5Core.dll',
                'deps/poppler/libpoppler.dll',
                'deps/poppler/libpoppler-qt5.dll',
              ]
            }
          ]
        }]
      ]
    }
    # {
    #   'target_name': 'copy_binary',
    #   'type': 'none',
    #   'dependencies': ['qt'],
    #   'conditions': [
    #     ['OS=="win"', {
    #       'copies':
    #       [
    #         {
    #           'destination': 'build/Release/',
    #           'files': [
    #             'deps/qt-5.3.0/win32/ia32/Qt5Core.dll',
    #             # 'deps/qt-5.3.0/win32/ia32/libGLESv2.dll',
    #             # 'deps/qt-5.3.0/win32/ia32/icudt52.dll',
    #             # 'deps/qt-5.3.0/win32/ia32/icuin52.dll',
    #             # 'deps/qt-5.3.0/win32/ia32/icuuc52.dll',
    #           ]
    #         }
    #       ]
    #     }]
    #   ]
    # }
  ]
}
