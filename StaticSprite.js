class StaticSprite {
    constructor(image, width, height) {
        this.image = image;
        this.width = width;
        this.height = height;
    }

    update(deltaTime) {
        // No hace nada, ya que no hay animación
    }

    draw(context, x, y) {
        context.drawImage(this.image, x, y, this.width, this.height);
        console.log("StaticSprite drawn at", x, y);
    }
}

export default StaticSprite;
