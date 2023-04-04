const yaml = require('yaml');
const StyleDictionary = require('style-dictionary');
const StyleDictionaryUtility = require('style-dictionary-utils'); // https://github.com/lukasoppermann/style-dictionary-utils
const styleDictionarySchema = require('./schema.json');

StyleDictionary.registerFileHeader({
  name: 'myCustomHeader',
  fileHeader: (defaultMessage) => {
    return [
      `dBrand via Style Dictionary v3 `,
      `source: https://github.com/dicaire/dStyle`,
      ...defaultMessage,
    ]
  }
});

console.log('\n==============================================');
console.log('Style Dictionary: build started...');
console.log('==============================================');


StyleDictionary.registerTransform({
  name: 'attribute/font',
  type: 'attribute',
  transformer: prop => ({
    category: prop.path[0],
    type: prop.path[1],
    family: prop.path[2],
    weight: prop.path[3],
    style: prop.path[4]
  })
});




// Register a custom format to generate @font-face rules.
StyleDictionary.registerFormat({
  name: 'font-face',
  formatter: ({ dictionary: { allTokens }, options }) => {
    const fontPathPrefix = options.fontPathPrefix || '../';

    // https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/src
    const formatsMap = {
      'woff2': 'woff2',
      'woff': 'woff',
      'ttf': 'truetype',
      'otf': 'opentype',
      'svg': 'svg',
      'eot': 'embedded-opentype'
    };

    return allTokens.reduce((fontList, prop) => {
      const {
        attributes: { family, weight, style },
        formats,
        value: path
      } = prop;

      const urls = formats
        .map(extension => `url("${fontPathPrefix}${path}.${extension}") format("${formatsMap[extension]}")`);

      const fontCss = [
        '@font-face {',
        `\n\tfont-family: "${family}";`,
        `\n\tfont-style: ${style};`,
        `\n\tfont-weight: ${weight};`,
        `\n\tsrc: ${urls.join(',\n\t\t\t ')};`,
        '\n\tfont-display: fallback;',
        '\n}\n'
      ].join('');

      fontList.push(fontCss);

      return fontList;
    }, []).join('\n');
  }
});





module.exports = {
  parsers: [{
    pattern: /\.yaml$/,
    parse: ({contents, filePath}) => yaml.parse(contents)
  }],

  source: [`input/**/*.yaml`],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'output/',
      files: [{
        destination: 'variables.css',
        format: 'css/variables',
        options: {
          fileHeader: 'myCustomHeader'
        }
      }]
    },

    'css-font-face': {
      transforms: ['attribute/font'],
      buildPath: 'output/',
      files: [
        {
          destination: 'fonts.css',
          format: 'font-face',
          filter: {
            attributes: {
              category: 'asset',
              type: 'font'
            }
          },
          options: {
            fontPathPrefix: '../'
          }
        }
      ]
    },
    'scss-font-face': {
      transforms: ['attribute/font'],
      buildPath: 'output/scss/',
      files: [
        {
          destination: '_fonts.scss',
          format: 'font-face',
          filter: {
            attributes: {
              category: 'asset',
              type: 'font'
            }
          },
          options: {
            fontPathPrefix: '#{$font-path}/'
        }
      }]
    },
//     html2Clr: {
//       transformGroup: "web",
//       "buildPath": "output/web/",
//       "files": [{
//         "destination": "tokens.scss",
//         "format": "custom/format/scss"
//       }]
//     },


    ios: {
      transformGroup: 'ios',
      buildPath: 'output/',
      files: [{
        "destination": "StyleDictionaryColor.m",
        "format": "ios/colors.m",
        "className": "StyleDictionaryColor",
        "type": "StyleDictionaryColorName",
        "filter": {
          "attributes": {
            "category": "color"
          }  }
      }]
    },

    scss: {
      transformGroup: "scss",
      "buildPath": "output/scss/",
      "files": [{
        "destination": "_variables.scss",
        "format": "scss/variables"
      }]
    },

//     "web/js": {
//       "transformGroup": "tokens-js",
//       "buildPath": `output/js/`,
//       "prefix": "token",
//       "files": [
//         {
//         "destination": "tokens.module.js",
//         "format": "javascript/module"
//         },
//         {
//         "destination": "tokens.object.js",
//         "format": "javascript/object"
//         },
//         {
//         "destination": "tokens.es6.js",
//         "format": "javascript/es6"
//         }
//         ]
//             },
    kaput: {
      transformGroup: 'css',
      buildPath: 'output/',
      files: [{
        destination: 'houba.css',
        format: 'css/variables'
      }]
    }

  }
}

