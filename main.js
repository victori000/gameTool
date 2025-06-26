import SceneManager from './SceneManager.js';
import MainMenu from './MainMenu.js';
import loadImages from './loadImages.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const assets = {
    button: 'assets/sprites/button.png'
};

const sceneManager = new SceneManager();

loadImages(assets).then(images => {
    sceneManager.changeScene(new MainMenu(sceneManager, canvas, images));

    let lastTime = 0;
    function gameLoop(timestamp) {
        const deltaTime = timestamp - lastTime;
        lastTime = timestamp;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        sceneManager.update(deltaTime);
        sceneManager.draw(ctx);

        requestAnimationFrame(gameLoop);
    }

    requestAnimationFrame(gameLoop);
});
