import Entity from './Entity.js';
import Input from './Input.js';

class Player extends Entity{
    constructor(position, spriteAnimation){
        super();
        this.position = position || { x: 0, y: 0 };
        this.spriteAnimation = spriteAnimation || null;
        this.speed = 5; // Movement speed
    }

    update(deltaTime) {
        if (this.spriteAnimation) {
            this.spriteAnimation.update(deltaTime);
        }
        // Handle input for movement (permite movimiento diagonal)
        let dx = 0, dy = 0;
        if (Input.isKeyPressed('ArrowUp')) {
            dy -= 1;
        }
        if (Input.isKeyPressed('ArrowDown')) {
            dy += 1;
        }
        if (Input.isKeyPressed('ArrowLeft')) {
            dx -= 1;
        }
        if (Input.isKeyPressed('ArrowRight')) {
            dx += 1;
        }
        if (dx !== 0 || dy !== 0) {
            this.move(dx, dy);
        }

    }
    draw(ctx) {
        if (this.spriteAnimation) {
            this.spriteAnimation.draw(ctx, this.position.x, this.position.y);
        }
    }
    move(dx, dy) {
        this.position.x += dx * this.speed;
        this.position.y += dy * this.speed;
    }

}

export default Player;