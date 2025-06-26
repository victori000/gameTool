class SceneManager {
    constructor() {
        this.currentScene = null;
    }

    changeScene(scene) {
        if (this.currentScene && this.currentScene.exit) {
            this.currentScene.exit();
        }
        this.currentScene = scene;
        if (this.currentScene && this.currentScene.enter) {
            this.currentScene.enter();
        }
    }

    update(deltaTime) {
        if (this.currentScene && this.currentScene.update) {
            this.currentScene.update(deltaTime);
        }
    }

    draw(ctx) {
        if (this.currentScene && this.currentScene.draw) {
            this.currentScene.draw(ctx);
        }
    }
}

export default SceneManager;
