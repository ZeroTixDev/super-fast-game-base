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
      const deltaX = this.x - vector.x;
      const deltaY = this.y - vector.y;
      return new Vector(this.x > vector.x ? deltaX : -deltaX, this.y > vector.y ? -deltaY : deltaY);
   }
};
