class Circle {
    constructor(public o: Point, public r: number) {
    }

    draw(): void {
        this.o.draw();
        strokeWeight(3);
        stroke(0);
        fill(0, 0, 255, 10);
        ellipse(this.o.x, this.o.y, this.r * 2, this.r * 2);
    }

    drawLight(): void {
        this.o.drawLight();
        strokeWeight(1);
        stroke(0);
        fill(0, 0, 255, 10);
        ellipse(this.o.x, this.o.y, this.r * 2, this.r * 2);
    }

    intersection(line: Line): Point[] {
        const a = line.getA();
        const b = line.getB();

        let points: Point[] = []
        points.push(new Point(
            (-a * b + a * this.o.y + this.o.x + sqrt(this.r * this.r + a * a * this.r * this.r + 2 * a * this.o.y * this.o.x + 2 * b * this.o.y - a * a * this.o.x * this.o.x - 2 * a * b * this.o.x - b * b - this.o.y * this.o.y)) / (a * a + 1),
            NaN, // Majd behelyettesítjük
            "1"
        ));

        points.push(new Point(
            (-a * b + a * this.o.y + this.o.x + sqrt(this.r * this.r + a * a * this.r * this.r + 2 * a * this.o.y * this.o.x + 2 * b * this.o.y - a * a * this.o.x * this.o.x - 2 * a * b * this.o.x - b * b - this.o.y * this.o.y)) / (a * a + 1),
            NaN, // Majd behelyettesítjük
            "2"
        ));

        points.push(new Point(
            (-a * b + a * this.o.y + this.o.x - sqrt(this.r * this.r + a * a * this.r * this.r + 2 * a * this.o.y * this.o.x + 2 * b * this.o.y - a * a * this.o.x * this.o.x - 2 * a * b * this.o.x - b * b - this.o.y * this.o.y)) / (a * a + 1),
            NaN, // Majd behelyettesítjük
            "3"
        ));

        points.push(new Point(
            (-a * b + a * this.o.y + this.o.x - sqrt(this.r * this.r + a * a * this.r * this.r + 2 * a * this.o.y * this.o.x + 2 * b * this.o.y - a * a * this.o.x * this.o.x - 2 * a * b * this.o.x - b * b - this.o.y * this.o.y)) / (a * a + 1),
            NaN, // Majd behelyettesítjük
            "4"
        ));

        points[0].y = this.o.y + sqrt(this.r * this.r - pow(points[0].x - this.o.x, 2));
        points[1].y = this.o.y - sqrt(this.r * this.r - pow(points[0].x - this.o.x, 2));
        points[2].y = this.o.y + sqrt(this.r * this.r - pow(points[2].x - this.o.x, 2));
        points[3].y = this.o.y - sqrt(this.r * this.r - pow(points[2].x - this.o.x, 2));

        return points.filter((p, index) => {
            return p.x !== NaN && p.y !== NaN && abs(a * p.x + b - p.y) <= 0.01;
        });

    }
}
