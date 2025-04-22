import React, { useEffect, useRef, useState } from 'react';

interface GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Alien extends GameObject {
  direction: number;
}

export const SpaceInvaders: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (!gameStarted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const player = {
      x: canvas.width / 2 - 25,
      y: canvas.height - 50,
      width: 50,
      height: 30,
      speed: 5
    };

    const bullets: GameObject[] = [];
    const aliens: Alien[] = [];
    const alienRows = 3;
    const aliensPerRow = 8;
    const alienWidth = 40;
    const alienHeight = 30;
    const alienPadding = 20;

    // Initialize aliens
    for (let row = 0; row < alienRows; row++) {
      for (let col = 0; col < aliensPerRow; col++) {
        aliens.push({
          x: col * (alienWidth + alienPadding) + 50,
          y: row * (alienHeight + alienPadding) + 50,
          width: alienWidth,
          height: alienHeight,
          direction: 1
        });
      }
    }

    let keys = {
      left: false,
      right: false,
      space: false
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') keys.left = true;
      if (e.key === 'ArrowRight') keys.right = true;
      if (e.key === ' ') keys.space = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') keys.left = false;
      if (e.key === 'ArrowRight') keys.right = false;
      if (e.key === ' ') keys.space = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    let lastShot = 0;
    const shootCooldown = 500; // 0.5 seconds between shots

    function checkCollision(rect1: GameObject, rect2: GameObject) {
      return rect1.x < rect2.x + rect2.width &&
             rect1.x + rect1.width > rect2.x &&
             rect1.y < rect2.y + rect2.height &&
             rect1.y + rect1.height > rect2.y;
    }

    function gameLoop() {
      if (!canvas || !ctx) return;

      // Clear canvas
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Move player
      if (keys.left && player.x > 0) player.x -= player.speed;
      if (keys.right && player.x < canvas.width - player.width) player.x += player.speed;

      // Shoot
      if (keys.space && Date.now() - lastShot > shootCooldown) {
        bullets.push({
          x: player.x + player.width / 2 - 2,
          y: player.y,
          width: 4,
          height: 10
        });
        lastShot = Date.now();
      }

      // Move and draw bullets
      for (let i = bullets.length - 1; i >= 0; i--) {
        bullets[i].y -= 7;
        ctx.fillStyle = 'white';
        ctx.fillRect(bullets[i].x, bullets[i].y, bullets[i].width, bullets[i].height);

        if (bullets[i].y < 0) bullets.splice(i, 1);
      }

      // Move and draw aliens
      let aliensMoveDown = false;
      for (const alien of aliens) {
        alien.x += alien.direction * 2;
        if (alien.x > canvas.width - alien.width || alien.x < 0) {
          aliensMoveDown = true;
        }
      }

      if (aliensMoveDown) {
        for (const alien of aliens) {
          alien.direction *= -1;
          alien.y += 20;
          if (alien.y > player.y - alien.height) {
            setGameOver(true);
            return;
          }
        }
      }

      // Draw aliens
      aliens.forEach(alien => {
        ctx.fillStyle = 'green';
        ctx.fillRect(alien.x, alien.y, alien.width, alien.height);
      });

      // Check collisions
      for (let i = bullets.length - 1; i >= 0; i--) {
        for (let j = aliens.length - 1; j >= 0; j--) {
          if (checkCollision(bullets[i], aliens[j])) {
            bullets.splice(i, 1);
            aliens.splice(j, 1);
            setScore(prev => prev + 100);
            break;
          }
        }
      }

      // Draw player
      ctx.fillStyle = 'blue';
      ctx.fillRect(player.x, player.y, player.width, player.height);

      // Draw score
      ctx.fillStyle = 'white';
      ctx.font = '20px Arial';
      ctx.fillText(`Score: ${score}`, 10, 30);

      if (aliens.length === 0) {
        ctx.fillStyle = 'white';
        ctx.font = '40px Arial';
        ctx.fillText('You Win!', canvas.width / 2 - 70, canvas.height / 2);
        return;
      }

      if (!gameOver) {
        requestAnimationFrame(gameLoop);
      } else {
        ctx.fillStyle = 'white';
        ctx.font = '40px Arial';
        ctx.fillText('Game Over!', canvas.width / 2 - 100, canvas.height / 2);
      }
    }

    gameLoop();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameStarted, gameOver]);

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Space Invaders</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        {!gameStarted ? (
          <div className="text-center">
            <p className="mb-4">Use arrow keys to move and space to shoot!</p>
            <button
              onClick={() => setGameStarted(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Start Game
            </button>
          </div>
        ) : (
          <canvas
            ref={canvasRef}
            width={800}
            height={600}
            className="border border-gray-300"
          />
        )}
      </div>
    </div>
  );
}; 