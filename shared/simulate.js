'use strict';

function simulatePlayer(state, input) {
   // state {players, arena}
   const player = state.player;
   if (input.up && input.down) player.vel.y = 0;
   else if (input.up) player.vel.y = -player.maxSpd;
   else if (input.down) player.vel.y = player.maxSpd;
   else player.vel.y = 0;
   if (input.left && input.right) player.vel.x = 0;
   else if (input.left) player.vel.x = -player.maxSpd;
   else if (input.right) player.vel.x = player.maxSpd;
   else player.vel.x = 0;
   player.pos.x += player.vel.x;
   player.pos.y += player.vel.y;
   if (player.pos.x - player.radius < 0) player.pos.x = player.radius;
   if (player.pos.x + player.radius > state.arena.x) player.pos.x = state.arena.x - player.radius;
   if (player.pos.y - player.radius < 0) player.pos.y = player.radius;
   if (player.pos.y + player.radius > state.arena.y) player.pos.y = state.arena.y - player.radius;
   player.pos.x = Math.round(player.pos.x);
   player.pos.y = Math.round(player.pos.y);
}
module.exports = { simulatePlayer };
