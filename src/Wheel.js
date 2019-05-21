import Data from './Data';

class Wheel {
  constructor() {
    this.values;
  }

  createWheel() {
    const randomWheel = this.shuffleWheel(Data.wheel);
    this.values = randomWheel;
  }
 
  shuffleWheel(wheel) {
    return wheel.sort((a, b) => Math.random() - 0.5);
  }

  returnResult() {
    const randomIndex = Math.floor(Math.random() * this.values.length + 1);
    return this.values[randomIndex];
  }
}

export default Wheel;