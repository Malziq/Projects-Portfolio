import pygame
import random
import sys
import os
from pygame.locals import *

# Initialize pygame
pygame.init()

# Game constants
SCREEN_WIDTH = 800
SCREEN_HEIGHT = 600
FPS = 60

# Colors
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
GREEN = (0, 255, 0)
RED = (255, 0, 0)
BLUE = (0, 0, 255)
YELLOW = (255, 255, 0)

# Game classes
class Player(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        self.image = pygame.Surface((40, 30))
        self.image.fill(BLUE)
        # Create a triangle shape for the player
        pygame.draw.polygon(self.image, (100, 100, 255), [(0, 30), (20, 0), (40, 30)])
        self.rect = self.image.get_rect()
        self.rect.centerx = SCREEN_WIDTH // 2
        self.rect.bottom = SCREEN_HEIGHT - 10
        self.speed = 5
        self.lives = 3

    def update(self):
        keys = pygame.key.get_pressed()
        if keys[K_LEFT] or keys[K_a]:
            self.rect.x -= self.speed
        if keys[K_RIGHT] or keys[K_d]:
            self.rect.x += self.speed
        
        # Keep player on screen
        if self.rect.left < 0:
            self.rect.left = 0
        if self.rect.right > SCREEN_WIDTH:
            self.rect.right = SCREEN_WIDTH

    def shoot(self):
        bullet = Bullet(self.rect.centerx, self.rect.top)
        return bullet

class Alien(pygame.sprite.Sprite):
    def __init__(self, x, y, alien_type="normal"):
        super().__init__()
        self.type = alien_type
        self.image = pygame.Surface((30, 30))
        
        # Different colors for different alien types
        if alien_type == "boss":
            self.image.fill(RED)
            self.points = 30
        else:
            self.image.fill(GREEN)
            self.points = 10
            
        # Draw alien eyes
        pygame.draw.circle(self.image, WHITE, (8, 10), 3)
        pygame.draw.circle(self.image, WHITE, (22, 10), 3)
        
        self.rect = self.image.get_rect()
        self.rect.x = x
        self.rect.y = y

class Bullet(pygame.sprite.Sprite):
    def __init__(self, x, y, direction="up"):
        super().__init__()
        self.image = pygame.Surface((4, 10))
        
        if direction == "up":
            self.image.fill(YELLOW)
            self.speed = -7
        else:
            self.image.fill(RED)
            self.speed = 5
            
        self.rect = self.image.get_rect()
        self.rect.centerx = x
        self.rect.centery = y
        self.direction = direction

    def update(self):
        self.rect.y += self.speed
        # Remove bullet if it goes off screen
        if self.rect.bottom < 0 or self.rect.top > SCREEN_HEIGHT:
            self.kill()

class Game:
    def __init__(self):
        # Set up the display
        self.screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
        pygame.display.set_caption("Space Invaders")
        self.clock = pygame.time.Clock()
        
        # Game state
        self.running = True
        self.playing = False
        self.game_over = False
        self.level_cleared = False
        self.score = 0
        self.high_score = self.load_high_score()
        self.level = 1
        self.alien_speed = 1
        self.alien_direction = 1  # 1 for right, -1 for left
        self.last_shot_time = 0
        
        # Sprite groups
        self.all_sprites = pygame.sprite.Group()
        self.aliens = pygame.sprite.Group()
        self.bullets = pygame.sprite.Group()
        self.alien_bullets = pygame.sprite.Group()
        
        # Create player
        self.player = Player()
        self.all_sprites.add(self.player)
        
        # Create stars background
        self.stars = []
        for _ in range(100):
            x = random.randint(0, SCREEN_WIDTH)
            y = random.randint(0, SCREEN_HEIGHT)
            size = random.randint(1, 2)
            brightness = random.randint(100, 255)
            self.stars.append((x, y, size, brightness))
        
        # Font for text
        self.font = pygame.font.SysFont(None, 36)
        self.small_font = pygame.font.SysFont(None, 24)

    def load_high_score(self):
        try:
            with open("high_score.txt", "r") as file:
                return int(file.read())
        except:
            return 0

    def save_high_score(self):
        with open("high_score.txt", "w") as file:
            file.write(str(self.high_score))

    def create_aliens(self):
        # Clear any existing aliens
        self.aliens.empty()
        
        # Create new aliens
        rows = 4
        cols = 8
        alien_width = 30
        alien_height = 30
        padding = 15
        
        start_x = (SCREEN_WIDTH - (cols * (alien_width + padding))) // 2
        
        for row in range(rows):
            for col in range(cols):
                alien_type = "boss" if row == 0 else "normal"
                alien = Alien(
                    start_x + col * (alien_width + padding),
                    50 + row * (alien_height + padding),
                    alien_type
                )
                self.aliens.add(alien)
                self.all_sprites.add(alien)

    def start_game(self):
        # Reset game state
        self.playing = True
        self.game_over = False
        self.level_cleared = False
        self.score = 0
        self.level = 1
        self.alien_speed = 1
        self.alien_direction = 1
        
        # Clear all sprites
        self.all_sprites.empty()
        self.aliens.empty()
        self.bullets.empty()
        self.alien_bullets.empty()
        
        # Create player
        self.player = Player()
        self.all_sprites.add(self.player)
        
        # Create aliens
        self.create_aliens()

    def handle_events(self):
        for event in pygame.event.get():
            if event.type == QUIT:
                self.running = False
                pygame.quit()
                sys.exit()
                
            if event.type == KEYDOWN:
                if event.key == K_ESCAPE:
                    self.running = False
                    
                if event.key == K_SPACE:
                    if not self.playing:
                        self.start_game()
                    elif self.playing and not self.game_over:
                        current_time = pygame.time.get_ticks()
                        if current_time - self.last_shot_time > 300:  # Limit firing rate
                            self.last_shot_time = current_time
                            bullet = self.player.shoot()
                            self.bullets.add(bullet)
                            self.all_sprites.add(bullet)

    def update(self):
        if not self.playing or self.game_over:
            return
            
        # Update all sprites
        self.all_sprites.update()
        
        # Skip alien movement if level is cleared
        if not self.level_cleared:
            # Move aliens
            move_down = False
            for alien in self.aliens:
                if alien.rect.right >= SCREEN_WIDTH and self.alien_direction > 0:
                    self.alien_direction = -1
                    move_down = True
                    break
                elif alien.rect.left <= 0 and self.alien_direction < 0:
                    self.alien_direction = 1
                    move_down = True
                    break
            
            for alien in self.aliens:
                alien.rect.x += self.alien_speed * self.alien_direction
                if move_down:
                    alien.rect.y += 20
                    
                # Check if aliens reached the bottom
                if alien.rect.bottom >= self.player.rect.top:
                    self.game_over = True
                    self.playing = False
            
            # Randomly fire alien bullets
            if random.random() < 0.02 and len(self.aliens) > 0:
                shooting_alien = random.choice(self.aliens.sprites())
                alien_bullet = Bullet(shooting_alien.rect.centerx, shooting_alien.rect.bottom, "down")
                self.alien_bullets.add(alien_bullet)
                self.all_sprites.add(alien_bullet)
        
        # Check for collisions between player bullets and aliens
        hits = pygame.sprite.groupcollide(self.aliens, self.bullets, True, True)
        for alien in hits:
            self.score += alien.points
            if self.score > self.high_score:
                self.high_score = self.score
                self.save_high_score()
        
        # Check if all aliens are destroyed
        if len(self.aliens) == 0 and not self.level_cleared:
            self.level_cleared = True
            self.level += 1
            self.alien_speed = min(self.alien_speed + 0.5, 4)
            
            # Create new aliens after a delay
            pygame.time.set_timer(pygame.USEREVENT, 1500)
            pygame.event.post(pygame.event.Event(pygame.USEREVENT))
        
        # Check for collisions between alien bullets and player
        hits = pygame.sprite.spritecollide(self.player, self.alien_bullets, True)
        if hits:
            self.player.lives -= 1
            if self.player.lives <= 0:
                self.game_over = True
                self.playing = False

    def draw(self):
        # Fill the screen with black
        self.screen.fill(BLACK)
        
        # Draw stars
        for x, y, size, brightness in self.stars:
            pygame.draw.circle(self.screen, (brightness, brightness, brightness), (x, y), size)
        
        # Draw all sprites
        self.all_sprites.draw(self.screen)
        
        # Draw UI
        score_text = self.font.render(f"Score: {self.score}", True, WHITE)
        self.screen.blit(score_text, (10, 10))
        
        high_score_text = self.small_font.render(f"High Score: {self.high_score}", True, WHITE)
        self.screen.blit(high_score_text, (10, 50))
        
        lives_text = self.small_font.render(f"Lives: {self.player.lives}", True, WHITE)
        self.screen.blit(lives_text, (10, 80))
        
        level_text = self.small_font.render(f"Level: {self.level}", True, WHITE)
        self.screen.blit(level_text, (10, 110))
        
        # Draw level cleared message
        if self.level_cleared:
            level_cleared_text = self.font.render(f"Level {self.level-1} Cleared!", True, BLUE)
            text_rect = level_cleared_text.get_rect(center=(SCREEN_WIDTH//2, SCREEN_HEIGHT//3))
            self.screen.blit(level_cleared_text, text_rect)
        
        # Draw game over or start screen
        if not self.playing:
            overlay = pygame.Surface((SCREEN_WIDTH, SCREEN_HEIGHT))
            overlay.set_alpha(180)
            overlay.fill(BLACK)
            self.screen.blit(overlay, (0, 0))
            
            if self.game_over:
                game_over_text = self.font.render("GAME OVER", True, WHITE)
                text_rect = game_over_text.get_rect(center=(SCREEN_WIDTH//2, SCREEN_HEIGHT//2 - 50))
                self.screen.blit(game_over_text, text_rect)
                
                final_score_text = self.font.render(f"Final Score: {self.score}", True, WHITE)
                text_rect = final_score_text.get_rect(center=(SCREEN_WIDTH//2, SCREEN_HEIGHT//2))
                self.screen.blit(final_score_text, text_rect)
            else:
                title_text = self.font.render("SPACE INVADERS", True, WHITE)
                text_rect = title_text.get_rect(center=(SCREEN_WIDTH//2, SCREEN_HEIGHT//2 - 50))
                self.screen.blit(title_text, text_rect)
            
            start_text = self.font.render("Press SPACE to start", True, WHITE)
            text_rect = start_text.get_rect(center=(SCREEN_WIDTH//2, SCREEN_HEIGHT//2 + 50))
            self.screen.blit(start_text, text_rect)
            
            instructions = [
                "Controls:",
                "← → or A/D: Move",
                "SPACE: Shoot",
                "ESC: Quit"
            ]
            
            for i, line in enumerate(instructions):
                instruction_text = self.small_font.render(line, True, WHITE)
                self.screen.blit(instruction_text, (SCREEN_WIDTH//2 - 100, SCREEN_HEIGHT//2 + 100 + i*25))
        
        # Update the display
        pygame.display.flip()

    def run(self):
        # Main game loop
        while self.running:
            self.clock.tick(FPS)
            self.handle_events()
            
            # Check for level cleared timer
            for event in pygame.event.get(pygame.USEREVENT):
                if self.level_cleared:
                    self.level_cleared = False
                    self.create_aliens()
            
            self.update()
            self.draw()

# Run the game if this file is executed directly
if __name__ == "__main__":
    game = Game()
    game.run()