class Point extends p5.Vector {
    constructor(public x: number, public y: number, public name: string, public mColor?: number[]) {
        super();
    }

    static fromVector(p: p5.Vector, name: string) {
        return new Point(p.x, p.y, name);
    }

    drawLight(): void {
        fill(0);
        noStroke();
        ellipse(this.x, this.y, pointSize / 4, pointSize / 4);
    }

    draw(): void {
        noStroke();
        if (!this.mColor) fill(10, 30, 255, 200);
        else fill(this.mColor);

        ellipse(this.x, this.y, pointSize / 2, pointSize / 2);
        if (this.dist(mouse) <= pointSize) {
            fill(10, 30, 255, 20);
            ellipse(this.x, this.y, pointSize, pointSize);
        }

        noStroke();

        textSize(20);
        fill(0);
        text(this.name, this.x + width / 40, this.y + width / 40);

        if (mouseIsPressed && draggedPoint == null && this.dist(mouse) <= pointSize / 2) {
            draggedPoint = this;
        }
        if (draggedPoint == this) {
            this.x = mouse.x;
            this.y = mouse.y;
        }
    }
}
