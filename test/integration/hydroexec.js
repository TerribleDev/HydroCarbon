var assert = require('chai').assert;
var expect = require('chai').expect;
var hydroexec = require('../../test-tmp/exec');
describe('wix', function(){

  it('creates an msi', function(cb){
    this.timeout(1000000);
    return hydroexec({
      heatFiles: ['test/integration/heat.rsp'],
      candleFiles: ['test/integration/candle.rsp'],
      lightFiles: ['test/integration/light.rsp']
    }, cb);
  })
});
