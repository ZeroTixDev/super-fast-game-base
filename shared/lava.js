'use strict';
module.exports = class Lava {
   constructor(colorRange = [0, 255]) {
      this.color = 50;
      this.down = Math.random() > 0.5;
      this.up = !this.down;
      this.range = { min: colorRange[0], max: colorRange[1] };
   }
   simulate() {
      if (this.up) {
         this.color++;
      } else if (this.down) {
         this.color--;
      }
      if (this.down && this.color < this.range.min) {
         this.down = false;
         this.up = true;
      }
      if (this.up && this.color > this.range.max) {
         this.up = false;
         this.down = true;
      }
   }
};
