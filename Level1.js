import Scene from './Scene.js';
import Player from './Player.js';
import NPC from './NPC.js';
import Entity from './Entity.js';
import Position from './Position.js';
import Size from './Size.js';
import SpriteAnimation from './SpriteAnimation.js';
import StaticSprite from './StaticSprite.js';
import Collider from './Collider.js';
import Collision from './Collision.js';
import DialogBox from './DialogBox.js';
import Input from './Input.js';

const frameWidth = 64;
const frameHeight = 64;
const frameCount = 1;
const frameRate = 10;

class Level1 extends Scene {
    constructor(images) {
        super('Level1');
        // Entities
        this.player = new Player(new Position(0, 0), new SpriteAnimation(images.player, frameWidth, frameHeight, frameCount, frameRate));
        this.npc = new NPC(new Position(100, 100), new SpriteAnimation(images.npc, frameWidth, frameHeight, frameCount, frameRate));
        this.door = new Entity();
        this.doorPosition = new Position(200, 200);
        this.doorSize = new Size(32, 32);
        this.door.addComponent('position', this.doorPosition);
        this.door.addComponent('size', this.doorSize);
        this.door.addComponent('collider', new Collider(this.doorPosition, this.doorSize));
        this.door.addComponent('sprite', new StaticSprite(images.door, this.doorSize.width, this.doorSize.height));

        // Components
        this.player.addComponent('size', new Size(frameWidth, frameHeight));
        this.npc.addComponent('size', new Size(frameWidth, frameHeight));

        // Dialog
        this.dialogBox = new DialogBox();
        this.dialogActive = false;
    }

    update(deltaTime) {
        // Collision with NPC
        const playerSize = this.player.getComponent('size');
        const npcSize = this.npc.getComponent('size');
        const collision = new Collision(this.player.position, playerSize, this.npc.position, npcSize);
        if (collision.check()) {
            if (!this.dialogActive && Input.isKeyPressed('e')) {
                this.dialogBox.show('¡Hola! Soy el NPC.');
                this.dialogActive = true;
            }
        }
        if (this.dialogActive && Input.isKeyPressed('e')) {
            this.dialogBox.hide();
            this.dialogActive = false;
        }

        this.player.update(deltaTime);
        this.npc.update(deltaTime);
    }

    draw(ctx) {
        this.player.draw(ctx);
        this.npc.draw(ctx);
        const doorSprite = this.door.getComponent('sprite');
        const doorPosition = this.door.getComponent('position');
        doorSprite.draw(ctx, doorPosition.x, doorPosition.y);
        this.dialogBox.draw(ctx);
    }
}

export default Level1;
