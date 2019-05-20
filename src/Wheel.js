import Data from './Data';

class Wheel {

  createWheel() {
    const randomWheel = this.shuffleWheel(Data.wheel);
    this.values = randomWheel;
  }
 
  shuffleWheel(wheel) {
    return wheel.sort((a, b) => Math.random() - 0.5);
  }

  returnResult() {
    const randomIndex = Math.floor(Math.random() * this.values.length + 1);
    console.log(randomIndex)
    return this.values.find(value => this.values.indexOf(value) === randomIndex);
  }
}

export default Wheel;