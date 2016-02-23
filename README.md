# HydroCarbon


simple wrapper over wix. You can see a working demo [here](https://github.com/tparnell8/GulpBuildForDotNet)


## Install

```
$ npm install --save-dev HydroCarbon
```


## Usage

```js
var HydroCarbon = require('HydroCarbon');

HydroCarbon.exec({
  heatFiles: ["installers/heat-web.rsp"],
  candleFiles: ["installers/candle.rsp"],
  lightFiles: ["installers/light.rsp"]
}, mycallbackFunction);
```

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

Type: 'array'
Default: `undefined`

Array of command line args to pass to heat overrides heatFiles

#### candleCommands

Type: 'array'
Default: `undefined`

Array of command line args to pass to candle overrides candleFiles

#### lightCommands

Type: 'array'
Default: `undefined`

Array of command line args to pass to light overrides lightFiles

#### version

Type: 'string'
Default: `undefined`

Sets the BUILD_VERSION environment variable to version before calling heat, candle, and light


```


## License

MIT © [Tommy Parnell](https://github.com/tparnell8)
