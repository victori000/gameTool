import Position from './Position.js';
import Size from './Size.js'; // Adjust the import path as necessary
import SpriteAnimation from './SpriteAnimation.js'; // Adjust the import path as necessary
import Player from './Player.js'; // Adjust the import path as necessary
import NPC from './NPC.js'; // Adjust the import path as necessary
import Collision from './Collision.js'; // Adjust the import path as necessary
import loadImages from './loadImages.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const paths = {
    player: 'assets/sprites/pj_especical.png',
    npc: 'assets/sprites/pj_animated.png',
};

const frameWidth = 64; // Width of each frame in the sprite sheet
const frameHeight = 64; // Height of each frame in the sprite sheet
const frameCount = 1; // Total number of frames in the sprite sheet
const frameRate = 10; // Frames per second




const playerPosition = new Position(0, 0); // Initial position of the player
const npcPosition = new Position(100, 100); // Initial position of the NPC

loadImages(paths).then(images => {
    const playerSpriteAnimation = new SpriteAnimation(images.player, frameWidth, frameHeight, frameCount, frameRate);
    const npcSpriteAnimation = new SpriteAnimation(images.npc, frameWidth, frameHeight, frameCount, frameRate);

    const player = new Player(playerPosition, playerSpriteAnimation); // Create a new player entity with position and sprite animation
    const npc = new NPC(npcPosition, npcSpriteAnimation); // Create a new NPC entity with position and sprite animation

    player.addComponent('size', new Size(frameWidth, frameHeight)); // Add size component to player
    npc.addComponent('size', new Size(frameWidth, frameHeight)); // Add size component to NPC
    const playerSize = player.getComponent('size');
    const npcSize = npc.getComponent('size');


    let lastTime = 0;
    function gameLoop(timestamp) {
        const deltaTime = timestamp - lastTime;
        lastTime = timestamp;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Check for collisions between player and NPC
        const collision = new Collision(player.position, playerSize, npc.position, npcSize);
        if (collision.check()) {
            console.log('Collision detected between player and NPC!');
            const collisionFrom = collision.superCheck(); 
            if (collisionFrom.left) {
                npc.position.x += 5; // Move NPC to the right
            }
            // Handle collision logic here, e.g., stop movement, trigger an event, etc.
        }
        player.update(deltaTime); // Update the player entity
        player.draw(ctx); // Draw the player entity
        npc.update(deltaTime); // Update the NPC entity
        npc.draw(ctx); // Draw the NPC entity

        requestAnimationFrame(gameLoop);
    }

    requestAnimationFrame(gameLoop); // Start the game loop


}).catch(error => {
    console.error('Error loading images:', error);
});

