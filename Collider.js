class Collider{
    constructor(position, size){
        this.position = position || { x: 0, y: 0 };
        this.size = size || { width: 0, height: 0 };
    }
    intersects(other) {
        return (
            this.position.x < other.position.x + other.size.width &&
            this.position.x + this.size.width > other.position.x &&
            this.position.y < other.position.y + other.size.height &&
            this.position.y + this.size.height > other.position.y
        );
    }
    getBounds() {
        return {
            x: this.position.x,
            y: this.position.y,
            width: this.size.width,
            height: this.size.height
        };
    }

}
export default Collider;