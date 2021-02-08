'use strict';

function simulatePlayer(state, input) {
   // state {players, arena}
   const players = state.players;
   const player = players[state.id];
   if (!player.mouseMode) {
      if (input.up && !input.down) player.vel.y -= player.maxSpd;
      else if (input.down && !input.up) player.vel.y += player.maxSpd;
      if (input.left && !input.right) player.vel.x -= player.maxSpd;
      else if (input.right && !input.left) player.vel.x += player.maxSpd;
      player.pos.x += player.vel.x;
      player.pos.y += player.vel.y;
      player.vel.x *= 0.4;
      player.vel.y *= 0.4;
   } else {
      const distX = player.mouse.x - 800;
      const distY = player.mouse.y - 450;
      const distance = Math.min(Math.sqrt(distX * distX + distY * distY), 80);
      const angle = Math.atan2(distY, distX);
      player.vel.x = Math.cos(angle) * player.maxSpd;
      player.vel.y = Math.sin(angle) * player.maxSpd;
      player.pos.x += player.vel.x * (distance / 80);
      player.pos.y += player.vel.y * (distance / 80);
   }
   const playerArray = Object.entries({ ...players });
   for (let i = 0; i < playerArray.length; i++) {
      for (let j = i + 1; j < playerArray.length; j++) {
         const player1 = players[playerArray[i][0]];
         const player2 = players[playerArray[j][0]];
         if (
            Math.sqrt(
               Math.abs(Math.pow(player2.pos.x - player1.pos.x, 2) + Math.pow(player2.pos.y - player1.pos.y, 2))
            ) < 60
         ) {
            const distance = Math.sqrt(
               Math.abs(Math.pow(player2.pos.x - player1.pos.x, 2) + Math.pow(player2.pos.y - player1.pos.y, 2))
            );
            const rotate = Math.atan2(player2.pos.y - player1.pos.y, player2.pos.x - player1.pos.x);
            player2.pos.x += ((Math.cos(rotate) * 1) / distance) * 50;
            player1.pos.x -= ((Math.cos(rotate) * 1) / distance) * 50;
            player2.pos.y += ((Math.sin(rotate) * 1) / distance) * 50;
            player1.pos.y -= ((Math.sin(rotate) * 1) / distance) * 50;
         }
      }
   }
   if (player.pos.x - player.radius < 0) player.pos.x = player.radius;
   if (player.pos.x + player.radius > state.arena.x) player.pos.x = state.arena.x - player.radius;
   if (player.pos.y - player.radius < 0) player.pos.y = player.radius;
   if (player.pos.y + player.radius > state.arena.y) player.pos.y = state.arena.y - player.radius;
   player.pos.x = Math.round(player.pos.x);
   player.pos.y = Math.round(player.pos.y);
}
module.exports = { simulatePlayer };
