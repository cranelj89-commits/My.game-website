function checkPockets() {
  const allBalls = [cueBall, ...balls];
  
  allBalls.forEach(ball => {
    if (ball.pocketed) return;

    POCKETS.forEach(p => {
      let dx = ball.x - p.x;
      let dy = ball.y - p.y;
      let dist = Math.sqrt(dx*dx + dy*dy);

      if (dist < POCKET_RADIUS) { // Ball is in pocket
        if (ball.number === 0) {
          // Cue ball: reset position if it falls
          ball.x = 150;
          ball.y = canvas.height / 2;
          ball.vx = 0;
          ball.vy = 0;
        } else {
          // Other balls: mark as pocketed
          ball.pocketed = true;
          pocketedBalls[`player${currentPlayer}`].push(ball.number);

          // Assign type if not set
          if (!playerTypes[currentPlayer]) playerTypes[currentPlayer] = ball.type;

          updatePlayerInfo();
        }
      }
    });
  });
}
