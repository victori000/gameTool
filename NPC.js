import Entity from "./Entity.js";
class NPC extends Entity {
    constructor(position, spriteAnimation) {
        super();
        this.position = position || { x: 0, y: 0 };
        this.spriteAnimation = spriteAnimation || null;
    }

    update(deltaTime) {
        if (this.spriteAnimation) {
            this.spriteAnimation.update(deltaTime);
        }
        // NPC logic can be added here, e.g., random movement or AI behavior
    }

    draw(ctx) {
        if (this.spriteAnimation) {
            this.spriteAnimation.draw(ctx, this.position.x, this.position.y);
        }
    }
}
export default NPC;