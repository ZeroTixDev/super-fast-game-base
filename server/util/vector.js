'use strict';

module.exports = class Vector {
   constructor(x, y) {
      this.x = x;
      this.y = y;
   }
   add(vector) {
      return new Vector(this.x + vector.x, this.y + vector.y);
   }
   mult(factor) {
      return new Vector(this.x * factor, this.y * factor);
   }
   copy() {
      return new Vector(this.x, this.y);
   }
   round() {
      return new Vector(Math.round(this.x), Math.round(this.y));
   }
   equal(vector) {
      return vector.x === this.x && vector.y === this.y;
   }
   delta(vector) {
      return new Vector(this.x - vector.x, this.y - vector.y);
   }
};
