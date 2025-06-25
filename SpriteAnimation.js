class SpriteAnimation{
    constructor(spriteSheet, frameWidth, frameHeight, frameCount, frameRate) {
        this.spriteSheet = spriteSheet;
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        this.frameCount = frameCount;
        this.frameRate = frameRate;
        this.currentFrame = 0;
        this.elapsedTime = 0;
    }
    
    update(deltaTime) {
        this.elapsedTime += deltaTime;
        if (this.elapsedTime >= (1000 / this.frameRate)) {
        this.currentFrame = (this.currentFrame + 1) % this.frameCount;
        this.elapsedTime = 0;
        }
    }
    
    draw(context, x, y) {
        const sx = (this.currentFrame % (this.spriteSheet.width / this.frameWidth)) * this.frameWidth;
        const sy = Math.floor(this.currentFrame / (this.spriteSheet.width / this.frameWidth)) * this.frameHeight; // Cuantos totales de frames en una linea tengo por el largo del frame
    
        context.drawImage(this.spriteSheet, sx, sy, this.frameWidth, this.frameHeight, x, y, this.frameWidth, this.frameHeight);
    }
}

export default SpriteAnimation;