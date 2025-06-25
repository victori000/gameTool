class Entity {
    constructor() {
        this.components = new Map();
    }

    addComponent(name, component) {
        this.components.set(name, component);
    }

    getComponent(name) {
        return this.components.get(name);
    }

    removeComponent(name) {
        this.components.delete(name);
    }

    hasComponent(name) {
        return this.components.has(name);
    }

    // Executes a function on all components that have that method
    executeOnComponents(method, ...args) {
        for (const component of this.components.values()) {
            if (typeof component[method] === 'function') {
                component[method](...args);
            }
        }
    }
}

export default Entity;