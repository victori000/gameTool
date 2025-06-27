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
        this.playerSpriteAnimation = new SpriteAnimation(images.player, frameWidth, frameHeight, frameCount, frameRate);
        this.player = new Player(new Position(0, 0), this.playerSpriteAnimation);
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

        this.player.addComponent('collider', new Collider(this.player.position, this.player.getComponent('size')));
        this.npc.addComponent('collider', new Collider(this.npc.position, this.npc.getComponent('size')));

        this.hasSword = false;

        this.swordSprite = new StaticSprite(images.sword, 32, 32);
        this.sword = new Entity();
        this.swordPosition = new Position(300, 300);
        this.swordSize = new Size(32, 32);
        this.sword.addComponent('size', this.swordSize);
        this.sword.addComponent('position', this.swordPosition);
        this.sword.addComponent('sprite', this.swordSprite);
        this.sword.addComponent('collider', new Collider(this.swordPosition, this.sword.getComponent('size')));

    }

    update(deltaTime) {
        
        if (this.player.getComponent('collider').intersects(this.npc.getComponent('collider'))) {
            console.log('Player and NPC are colliding');
            this.playerSpriteAnimation.frameCount = 4;
        }

        if (this.player.getComponent('collider').intersects(this.sword.getComponent('collider'))) {
            console.log('Player and Sword are colliding');
            this.player.addComponent('sword', this.sword);
            this.hasSword = true;
        }

        this.player.update(deltaTime);
        this.npc.update(deltaTime);
    }

    draw(ctx) {
        this.player.draw(ctx);
        this.npc.draw(ctx);
        const doorSprite = this.door.getComponent('sprite');
        const doorPosition = this.door.getComponent('position');
        const swordSprite = this.sword.getComponent('sprite');
        const swordPosition = this.sword.getComponent('position');
        if(this.hasSword){
            swordSprite.draw(ctx, this.player.position.x+55, this.player.position.y+10);
        }else{
            swordSprite.draw(ctx, swordPosition.x, swordPosition.y);
        }
        doorSprite.draw(ctx, doorPosition.x, doorPosition.y);
    }
}

export default Level1;
