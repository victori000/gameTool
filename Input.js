class Input {
    constructor() {
        this.keys = {};
        this.mouse = {
            x: 0,
            y: 0,
            left: false,
            right: false
        };

        window.addEventListener('keydown', (event) => {
            this.keys[event.key] = true;
        });

        window.addEventListener('keyup', (event) => {
            this.keys[event.key] = false;
        });

        window.addEventListener('mousemove', (event) => {
            this.mouse.x = event.clientX;
            this.mouse.y = event.clientY;
        });

        window.addEventListener('mousedown', (event) => {
            if (event.button === 0) {
                this.mouse.left = true;
            } else if (event.button === 2) {
                this.mouse.right = true;
            }
        });

        window.addEventListener('mouseup', (event) => {
            if (event.button === 0) {
                this.mouse.left = false;
            } else if (event.button === 2) {
                this.mouse.right = false;
            }
        });
    }

    isKeyPressed(key) {
        return !!this.keys[key];
    }

    getMousePosition() {
        return { x: this.mouse.x, y: this.mouse.y };
    }

    isMouseLeftPressed() {
        return this.mouse.left;
    }

    isMouseRightPressed() {
        return this.mouse.right;
    }
    clear() {
        this.keys = {};
        this.mouse.left = false;
        this.mouse.right = false;
    }
    resetMousePosition() {
        this.mouse.x = 0;
        this.mouse.y = 0;
    }
    resetKeys() {
        this.keys = {};
    }


}
export default new Input;