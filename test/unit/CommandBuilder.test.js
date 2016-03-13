var assert = require('chai').assert;
var expect = require('chai').expect;



describe('CommandBuilderWorks', function(){
  var commandBuilder = require('../../test-tmp/CommandBuilder');
  it('Should not throw when files are passed in', function(){
    var testObject = {
      heatFiles: ['tst'],
      candleFiles: ['awesome'],
      lightFiles: ['filesss']
    };
    commandBuilder(testObject)

  });
  it('Should not throw when commands are passed in', function(){
    var testObject = {
      heatCommands: ['tst'],
      candleCommands: ['awesome'],
      lightCommands: ['filesss']
    };
    commandBuilder(testObject)

  });

  it('Should Throw if missing light files', function(){
    var testObject = {
      heatFiles: ['tst'],
      candleFiles: ['awesome']
    };
    assert.throws(()=>commandBuilder(testObject));

  });
  it('Should Throw if missing candle files', function(){
    var testObject = {
      heatFiles: ['tst'],
      lightFiles: ['awesome']
    };
    assert.throws(()=>commandBuilder(testObject));

  });
  it('Should not Throw if missing heat files or commands', function(){
    var testObject = {
      lightFiles: ['awesome'],
      candleFiles: ['awesome']
    };
    assert.doesNotThrow(()=>commandBuilder(testObject));

  });

  it('should run as expected with files', function(){
    var testObject = {
      lightFiles: ['lightfile'],
      candleFiles: ['candlefile'],
      heatFiles: ['heatfile']
    };
    var result = commandBuilder(testObject);
    expect(result.heatCommands).to.eql(['@heatfile']);
    expect(result.lightCommands).to.eql(['@lightfile']);
    expect(result.candleCommands).to.eql(['@candlefile']);
  });

  it('should run as expected with commands', function(){
    var testObject = {
      lightCommands: ['lightfile'],
      candleCommands: ['candlefile'],
      heatCommands: ['heatfile']
    };
    var result = commandBuilder(testObject);
    expect(result.heatCommands).to.eql(['heatfile']);
    expect(result.lightCommands).to.eql(['lightfile']);
    expect(result.candleCommands).to.eql(['candlefile']);
  });

  it('should use alternate heat location', function(){
    var testObject = {
      lightCommands: ['lightfile'],
      candleCommands: ['candlefile'],
      heatCommands: ['heatfile'],
      heatPath: "../awesome"
    };
    var result = commandBuilder(testObject);
    expect(result.heatPath).to.eql("../awesome");
  });

  it('should use alternate candle location', function(){
    var testObject = {
      lightCommands: ['lightfile'],
      candleCommands: ['candlefile'],
      heatCommands: ['heatfile'],
      candlePath: "../awesome"
    };
    var result = commandBuilder(testObject);
    expect(result.candlePath).to.eql("../awesome");
  });

  it('should use alternate light location', function(){
    var testObject = {
      lightCommands: ['lightfile'],
      candleCommands: ['candlefile'],
      heatCommands: ['heatfile'],
      lightPath: "../awesome"
    };
    var result = commandBuilder(testObject);
    expect(result.lightPath).to.eql("../awesome");
  });
  it('should suppress validations', function(){
    var testObject = {
      lightCommands: ['lightfile'],
      candleCommands: ['candlefile'],
      heatCommands: ['heatfile'],
      suppressValidation: true
    };
  var result = commandBuilder(testObject);
  expect(result.lightCommands).to.eql(['-sval', 'lightfile']);
  });

});
