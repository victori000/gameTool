class DialogBox {
    constructor() {
        this.visible = false;
        this.text = '';
    }

    show(text) {
        this.text = text;
        this.visible = true;
    }

    hide() {
        this.visible = false;
    }

    draw(ctx) {
        if (!this.visible) return;
        // Cuadro de diálogo simple en la parte inferior del canvas
        const width = ctx.canvas.width * 0.8;
        const height = 60;
        const x = ctx.canvas.width * 0.1;
        const y = ctx.canvas.height - height - 20;

        ctx.save();
        ctx.globalAlpha = 0.85;
        ctx.fillStyle = '#222';
        ctx.fillRect(x, y, width, height);
        ctx.globalAlpha = 1.0;
        ctx.strokeStyle = '#fff';
        ctx.strokeRect(x, y, width, height);

        ctx.fillStyle = '#fff';
        ctx.font = '20px Arial';
        ctx.fillText(this.text, x + 20, y + 35);
        ctx.restore();
    }
}

export default DialogBox;
