class Boundary {
    constructor(canvas) {
        this.canvas = canvas || document.getElementById('canvas');
    }

    clamp(position, size) {
        const width = size && size.width ? size.width : 0;
        const height = size && size.height ? size.height : 0;
        position.x = Math.max(0, Math.min(position.x, this.canvas.width - width));
        position.y = Math.max(0, Math.min(position.y, this.canvas.height - height));
    }
}

export default Boundary;
