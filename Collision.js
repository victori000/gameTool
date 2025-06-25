class Collision {
    constructor(position1, size1, position2, size2) {
        this.position1 = position1; // { x: number, y: number }
        this.size1 = size1;         // { width: number, height: number }
        this.position2 = position2; // { x: number, y: number }
        this.size2 = size2;         // { width: number, height: number }
    }
    check() {
        return (
            this.position1.x < this.position2.x + this.size2.width &&
            this.position1.x + this.size1.width > this.position2.x &&
            this.position1.y < this.position2.y + this.size2.height &&
            this.position1.y + this.size1.height > this.position2.y
        );
    }

    superCheck() {
        // Calcula los bordes de ambos objetos
        const a = {
            left: this.position1.x,
            right: this.position1.x + this.size1.width,
            top: this.position1.y,
            bottom: this.position1.y + this.size1.height
        };
        const b = {
            left: this.position2.x,
            right: this.position2.x + this.size2.width,
            top: this.position2.y,
            bottom: this.position2.y + this.size2.height
        };

        // Si no hay colisión, retorna todo en false
        if (
            a.right <= b.left ||
            a.left >= b.right ||
            a.bottom <= b.top ||
            a.top >= b.bottom
        ) {
            return { top: false, bottom: false, left: false, right: false };
        }

        // Calcula la profundidad de la colisión en cada eje
        const overlapLeft = a.right - b.left;
        const overlapRight = b.right - a.left;
        const overlapTop = a.bottom - b.top;
        const overlapBottom = b.bottom - a.top;

        // Encuentra la mínima penetración
        const minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);

        const from = { top: false, bottom: false, left: false, right: false };

        if (minOverlap === overlapLeft) from.left = true;
        if (minOverlap === overlapRight) from.right = true;
        if (minOverlap === overlapTop) from.top = true;
        if (minOverlap === overlapBottom) from.bottom = true;

        return from;
    }
}

export default Collision;