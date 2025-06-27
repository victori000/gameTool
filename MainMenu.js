import Scene from './Scene.js';
import Position from './Position.js';
import Size from './Size.js';
import Entity from './Entity.js';
import StaticSprite from './StaticSprite.js';
import DialogBox from './DialogBox.js';
import Input from './Input.js';
import loadImages from './loadImages.js';
import Level1 from './Level1.js';


class MainMenu extends Scene {
    constructor(sceneManager, canvas, images) {
        super('MainMenu');
        this.sceneManager = sceneManager;
        this.canvas = canvas;
        // Background color
        this.backgroundColor = 'black';

        // Title
        this.title = 'Mi Juego';
        this.titlePosition = new Position(canvas.width / 2, canvas.height / 4);

        // Start button
        this.startButton = new Entity();
        this.startButtonPosition = new Position(canvas.width / 2 - 50, canvas.height / 2);
        this.startButtonSize = new Size(100, 50);
        this.startButton.addComponent('position', this.startButtonPosition);
        this.startButton.addComponent('size', this.startButtonSize);
        this.startButton.addComponent(
            'sprite',
            new StaticSprite(images && images.button ? images.button : null, this.startButtonSize.width, this.startButtonSize.height)
        );

        // Components
        this.startButton.addComponent('hover', false);

        // Dialog
        this.dialogBox = new DialogBox();
        this.dialogActive = false;
    }

    update(deltaTime) {
        // Check if the mouse is over the start button
        const mousePosition = Input.getMousePosition();
        const buttonSize = this.startButton.getComponent('size');
        const buttonPosition = this.startButton.getComponent('position');
        const hover = mousePosition.x >= buttonPosition.x && mousePosition.x <= buttonPosition.x + buttonSize.width &&
            mousePosition.y >= buttonPosition.y && mousePosition.y <= buttonPosition.y + buttonSize.height;
        this.startButton.addComponent('hover', hover);

        // Start the game when clicking the start button
        if (hover && Input.isMouseLeftPressed && Input.isMouseLeftPressed()) {
            this.startGame();
        }
    }

    draw(ctx) {
        // Draw background
        ctx.fillStyle = this.backgroundColor;
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw title
        ctx.fillStyle = 'white';
        ctx.font = '40px Arial';
        ctx.fillText(this.title, this.titlePosition.x, this.titlePosition.y);

        // Draw start button
        const buttonSprite = this.startButton.getComponent('sprite');
        const buttonPosition = this.startButton.getComponent('position');
        buttonSprite.draw(ctx, buttonPosition.x, buttonPosition.y);

        // Draw dialog box
        this.dialogBox.draw(ctx);
    }

    startGame() {
        const paths = {
            player: 'assets/sprites/pj_especical.png',
            npc: 'assets/sprites/pj_animated.png',
            door: 'assets/sprites/door.png',
            sword: 'assets/sprites/sword.png'
        };
        loadImages(paths).then(images => {
            const level1 = new Level1(images);
            this.sceneManager.changeScene(level1);
        }).catch(error => {
            console.error('Error loading images:', error);
        });
    }
}

export default MainMenu;
