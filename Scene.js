class Scene {
    constructor(name) {
        this.name = name;
    }

    enter() {
        // Called when the scene becomes active
    }

    exit() {
        // Called when the scene is deactivated
    }

    update(deltaTime) {
        // Scene update logic
    }

    draw(ctx) {
        // Scene drawing logic
    }
}

export default Scene;
