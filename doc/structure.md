# Structure

Every framework use variables to customize the user interface. They answer “What options do I have?” yet leave “where and how do I user them ?" unclear.

A design decision fill the gap, it document how to apply variables to specific context. Usually decisions are stored in a document that is not version controlled and not available to all the stakeholders.

A design token encode a design decision as a single-source-of-truth. The YAML markup language describe the design decision including variables  stored in  `assets/`, and `input/` to generate platform or technology specific configuration files with [AWS Style Dictionary](https://amzn.github.io/style-dictionary).

![alt text](https://raw.githubusercontent.com/dicaire/designTokens/main/doc/designTokens.png "Design Tokens")

If you don’t care about this stuff and want to jump into the [setup](https://github.com/dicaire/designTokens/blob/main/README.md), you can skip these sections.

## Build system

The build system does a deep merge of all the tokens defined in the `input/` folder. This allow you to keep separate the design token in many files split up in several directory as you see fit.

AWS Style Dictionary build an internal map that will be sliced and diced by `config.js` supported by [pre-defined formats](https://amzn.github.io/style-dictionary/#/formats?id=pre-defined-formats), and [custom formats](https://amzn.github.io/style-dictionary/#/formats?id=custom-formats) also known as [_format that uses templating_](https://amzn.github.io/style-dictionary/#/formats?id=using-a-template-templating-engine-to-create-a-format).

### Config.js
If you open `config.js` you will see there are platforms aligned with your platform or technology specific configuration files. The buildPath, and files attributes describe the `ouput/` directory and the file name.

The magic is done by [`transforms`](https://amzn.github.io/style-dictionary/#/transforms) and [`transform groups`](https://amzn.github.io/style-dictionary/#/transform_groups).

### Makefile

Invoking `make` will show the options:
* build – build the configuration files
* clr – build MacOS color palette
* samples – copy example code to get you started
* clean – delete the configuration files and remove the `ouput/` directory

Now let's make a change and see how that affects things. Open up `input/colors/core.yml` and change the black value to "{color.palette.grey-90.value}". After you make that change, save the file and re-run the build command `make build`. Open up the build files and take a look at the `ouput/`

## Design tokens
Style properties are organized into a hierarchical tree structure supported by category, type and items (CTI). Refer to the repository to view the current implementation.

![alt text](https://raw.githubusercontent.com/dicaire/designTokens/main/doc/styleProperties.png "Style Properties")

A successful token structure depends on grouping items to get an informal consensus. Don't mix foundation variables with design decisions in the document, for example "{color.palette.red-60.value}" and "{color.icon.value}".  Don't worry, the tool [Transforms](https://amzn.github.io/style-dictionary/#/transforms) values (e.g., px, em, ...) automatically via helpers.

## Color

Using colors with a system is convenient. It eliminates the hassle of hunting for specific RGB values each time you need to configure an element.

The foundation variables for the color palette is documented in the [`/input/colors/colorPalette.yml`](https://github.com/dicaire/designTokens/blob/main/input/colors/colorPalette.yml). The other files are design decisions.

Everything under the color category must be related to colors. The type identify background, text, or border. The item describe the brand, primary or secondary. The sub item also known as state will describe the base, link, and hover colors.

![alt text](https://raw.githubusercontent.com/dicaire/designTokens/main/doc/color.png "Color structure")

## Sizes

Meaningful scales are based on t-shirt sizing: XS/ S/ M/ L/ XL/ XXL, or a geometric progressions such as 2, 4, 8, 16, 32, 64.

The foundation variables are documented in the [`input/sizes/`](https://github.com/dicaire/designTokens/blob/main/input/sizes) directory.

## Typography
The foundation variables are documented in the [`input/typography/`](https://github.com/dicaire/designTokens/blob/main/input/typography) directory.

## Assets

The assets variables are documented in the [`input/assets/`](https://github.com/dicaire/designTokens/blob/main/input/assets) directory.

![alt text](https://raw.githubusercontent.com/dicaire/designTokens/main/doc/assets.png "Assets structure")
