import chai from 'chai'
const expect = chai.expect;
import spies from 'chai-spies';
chai.use(spies);
import Wheel from '../src/Wheel.js';

describe('Wheel', function() {
  let wheel;
  beforeEach(function() {
    wheel = new Wheel();
    wheel.createWheel();
  });

  it('should have default properties', function() {
    expect(wheel.values.length).to.equal(22);
  });

  it('Should be able to shuffle the wheel values', function() {
    const startingWheelFirstValue = wheel.values[0];
    wheel.createWheel();
    expect(wheel.values[0] == startingWheelFirstValue).to.equal(false);
  });

  it('Should be able to return a spin result', function() {
    const result1 = wheel.returnResult();
    const result2 = wheel.returnResult();
    const result3 = wheel.returnResult();
    expect(wheel.returnResult() === result1 && wheel.returnResult() === result2 && wheel.returnResult() === result3).to.equal(false);
  });
});