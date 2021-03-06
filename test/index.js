var assert = require('assert');
var fs = require('fs')
var vm = require('../src/vm');

before(function() {
  this.assemblyCode = fs.readFileSync('./examples/min.dark', {encoding: 'utf8'});
});

describe('Dark Stack Machine', function() {
  it('should find the minimum value', function(done) {
    vm.load(this.assemblyCode);
    vm.stack = [0,3,2,4,5,6];
    vm.run(function(result) {
      assert.equal(result, 2);
      done();
    });
  });

  it('should start at correct instruction', function() {
    vm.load('test\npush 1\nmain\npush 2\ndup\nend main');
    assert.equal(vm.getStartInstruction(), 2);
  });
});
