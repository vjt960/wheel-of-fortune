// import fetch from 'cross-fetch';

let realData;
fetch("https://fe-apps.herokuapp.com/api/v1/gametime/1903/wheel-of-fortune/data")
  .then(function(response) {
  return response.json();
})
  .then(function(dataset) {
  realData = dataset.data;
});

class Wheel {
  constructor(dataset = realData) {
    this.data = dataset;
    this.values;
  }

  createWheel() {
    const randomWheel = this.shuffleWheel(this.data.wheel);
    this.values = randomWheel;
  }
 
  shuffleWheel(wheel) {
    return wheel.sort((a, b) => Math.random() - 0.5);
  }

  returnResult() {
    const randomIndex = Math.floor(Math.random() * this.values.length);
    return this.values[randomIndex];
  }
}

export default Wheel;