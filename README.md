# HydroCarbon
[![NPM](https://img.shields.io/npm/v/gulp-msbuild.svg?style=flat-square)](https://www.npmjs.com/package/hydrocarbon)
[![Coverage Status](https://coveralls.io/repos/github/tparnell8/HydroCarbon/badge.svg?branch=master)](https://coveralls.io/github/tparnell8/HydroCarbon?branch=master)
[![Build status](https://ci.appveyor.com/api/projects/status/vekt2xrdn1iqjwxr/branch/master?svg=true)](https://ci.appveyor.com/project/tparnell8/hydrocarbon/branch/master)


simple wrapper over wix. You can see a working demo [here](https://github.com/tparnell8/GulpBuildForDotNet)


## Install

```
$ npm install --save-dev hydrocarbon
```


## Usage

```js
var HydroCarbon = require('hydrocarbon');

HydroCarbon.exec({
  heatFiles: ["installers/heat.rsp"],
  candleFiles: ["installers/candle.rsp"],
  lightFiles: ["installers/light.rsp"]
}, mycallbackFunction);
```



## API

### HydroCarbon.Exec(options, callback)

#### options

##### heatFiles

Type: `array`  
Default: `undefined`

Array of heat response file paths

##### candleFiles

Type: `array`  
Default: `undefined`

Array of candle response file paths

##### lightFiles

Type: `array`  
Default: `undefined`

Array of light response file paths

#### heatCommands

Type: `array`
Default: `undefined`

Array of command line args to pass to heat overrides heatFiles

#### candleCommands

Type: `array`
Default: `undefined`

Array of command line args to pass to candle overrides candleFiles

#### lightCommands

Type: `array`
Default: `undefined`

Array of command line args to pass to light overrides lightFiles

#### version

Type: `string`
Default: `undefined`

Sets the BUILD_VERSION environment variable to version before calling heat, candle, and light

#### suppressValidation

Type: `bool`
Default: `false`

If true this will supress ICE validation checks during the linking process.


## License

MIT © [Tommy Parnell](https://github.com/tparnell8)
