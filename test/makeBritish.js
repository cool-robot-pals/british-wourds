const chai = require('chai');
const makeBritish = require('./../lib/makeBritish.js');

describe('Basic', function() {

	it('should make words british',()=>{

		chai.expect(makeBritish('color')).to.equal('coullour');

	});

});
