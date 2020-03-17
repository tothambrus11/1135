class Circle {
    constructor(o, r) {
        this.o = o;
        this.r = r;
    }
    draw() {
        this.o.draw();
        strokeWeight(3);
        stroke(0);
        fill(0, 0, 255, 10);
        ellipse(this.o.x, this.o.y, this.r * 2, this.r * 2);
    }
    drawLight() {
        this.o.drawLight();
        strokeWeight(1);
        stroke(0);
        fill(0, 0, 255, 10);
        ellipse(this.o.x, this.o.y, this.r * 2, this.r * 2);
    }
    intersection(line) {
        const a = line.getA();
        const b = line.getB();
        let points = [];
        points.push(new Point((-a * b + a * this.o.y + this.o.x + sqrt(this.r * this.r + a * a * this.r * this.r + 2 * a * this.o.y * this.o.x + 2 * b * this.o.y - a * a * this.o.x * this.o.x - 2 * a * b * this.o.x - b * b - this.o.y * this.o.y)) / (a * a + 1), NaN, "1"));
        points.push(new Point((-a * b + a * this.o.y + this.o.x + sqrt(this.r * this.r + a * a * this.r * this.r + 2 * a * this.o.y * this.o.x + 2 * b * this.o.y - a * a * this.o.x * this.o.x - 2 * a * b * this.o.x - b * b - this.o.y * this.o.y)) / (a * a + 1), NaN, "2"));
        points.push(new Point((-a * b + a * this.o.y + this.o.x - sqrt(this.r * this.r + a * a * this.r * this.r + 2 * a * this.o.y * this.o.x + 2 * b * this.o.y - a * a * this.o.x * this.o.x - 2 * a * b * this.o.x - b * b - this.o.y * this.o.y)) / (a * a + 1), NaN, "3"));
        points.push(new Point((-a * b + a * this.o.y + this.o.x - sqrt(this.r * this.r + a * a * this.r * this.r + 2 * a * this.o.y * this.o.x + 2 * b * this.o.y - a * a * this.o.x * this.o.x - 2 * a * b * this.o.x - b * b - this.o.y * this.o.y)) / (a * a + 1), NaN, "4"));
        points[0].y = this.o.y + sqrt(this.r * this.r - pow(points[0].x - this.o.x, 2));
        points[1].y = this.o.y - sqrt(this.r * this.r - pow(points[0].x - this.o.x, 2));
        points[2].y = this.o.y + sqrt(this.r * this.r - pow(points[2].x - this.o.x, 2));
        points[3].y = this.o.y - sqrt(this.r * this.r - pow(points[2].x - this.o.x, 2));
        return points.filter((p, index) => {
            return p.x !== NaN && p.y !== NaN && abs(a * p.x + b - p.y) <= 0.01;
        });
    }
}
class Line {
    constructor(p1, p2, name) {
        this.p1 = p1;
        this.p2 = p2;
        this.name = name;
    }
    getAtDistance(distance, pointNumber) {
        let vect = this.p2.copy().sub(this.p1);
        vect.normalize();
        vect.mult(distance);
        if (pointNumber == 2) {
            return this.p2.copy().sub(vect);
        }
        return this.p1.copy().add(vect);
    }
    vector() {
        return p5.Vector.sub(this.p2, this.p1);
    }
    length() {
        return this.p2.dist(this.p1);
    }
    getA() {
        return (this.p2.y - this.p1.y) / (this.p2.x - this.p1.x + 0.01);
    }
    getB() {
        return this.p1.y - this.p1.x * this.getA();
    }
    perpendicularLineAtPoint(P, length) {
        if (!length) {
            length = 1;
        }
        return new Line(P, Point.fromVector(P.copy().add(length, -length / this.getA()), ""), "");
    }
    intersection(other, name) {
        if (name) {
            const i = this.intersection(other);
            return Point.fromVector(i, name);
        }
        const a1 = this.getA();
        const b1 = this.getB();
        const a2 = other.getA();
        const b2 = other.getB();
        const x = (b1 - b2) / (a2 - a1 + 0.00001);
        const y = a2 * x + b2;
        return createVector(x, y);
    }
    draw() {
        stroke(0);
        strokeWeight(3);
        line(this.p1.x, this.p1.y, this.p2.x, this.p2.y);
        noStroke();
        fill(0);
        textSize(20);
        text(this.name, p5.Vector.add(this.p1, this.p2).div(2).x, p5.Vector.add(this.p1, this.p2).div(2).y);
        this.p1.draw();
        this.p2.draw();
    }
    drawLight() {
        strokeWeight(1);
        stroke(128);
        line(this.p1.x, this.p1.y, this.p2.x, this.p2.y);
    }
}
class Point extends p5.Vector {
    constructor(x, y, name, mColor) {
        super();
        this.x = x;
        this.y = y;
        this.name = name;
        this.mColor = mColor;
    }
    static fromVector(p, name) {
        return new Point(p.x, p.y, name);
    }
    drawLight() {
        fill(0);
        noStroke();
        ellipse(this.x, this.y, pointSize / 4, pointSize / 4);
    }
    draw() {
        noStroke();
        if (!this.mColor)
            fill(10, 30, 255, 200);
        else
            fill(this.mColor);
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
const pointSize = 40;
let mouse;
let draggedPoint = null;
let A, B, C;
let AB, BC, AC;
let O1;
let P;
let c;
let irany1;
let irany2;
let irany3;
let iranyOrigo;
let sk0;
function setup() {
    createCanvas(windowWidth, windowHeight);
    O1 = new Point(0.75 * width, 0.5 * height, "O");
    P = new Point(0.6 * width, 0.3 * height, "P");
    c = new Circle(O1, P.dist(O1));
    sk0 = new Point(width * 0.3, height * 0.6, "sk0");
    iranyOrigo = new Point(width * 0.2, height * 0.2, "IO");
    irany1 = new Line(iranyOrigo, new Point(width * 0.221, height * 0.3, "alfa"), "");
    irany2 = new Line(iranyOrigo, new Point(width * 0.27, height * 0.25, "béta"), "");
    irany3 = new Line(iranyOrigo, new Point(width * 0.1, height * 0.25, "gamma"), "");
}
function mouseReleased() {
    draggedPoint = null;
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
function draw() {
    mouse = createVector(mouseX, mouseY);
    background(255);
    c.r = P.dist(O1);
    A = Point.fromVector(sk0, "A");
    B = Point.fromVector(sk0.copy().add(irany1.vector().normalize().mult(width * 0.1)), "B");
    let BC_egyenes = new Line(B, Point.fromVector(B.copy().add(irany2.vector().normalize().mult(width * 0.1)), ""), "BC_egyenes");
    BC_egyenes.drawLight();
    let AC_egyenes = new Line(A, Point.fromVector(A.copy().add(irany3.vector().normalize().mult(width * 0.1)), ""), "AC_egyenes");
    AC_egyenes.drawLight();
    C = AC_egyenes.intersection(BC_egyenes, "C");
    AB = new Line(A, B, "c");
    BC = new Line(B, C, "a");
    AC = new Line(A, C, "b");
    let ACfelezoPont = Point.fromVector(A.copy().add(C).div(2), "");
    let meroleges1 = AC.perpendicularLineAtPoint(ACfelezoPont, 1000);
    let meroleges1_masikirany = AC.perpendicularLineAtPoint(ACfelezoPont, -1000);
    let ABfelezoPont = Point.fromVector(A.copy().add(B).div(2), "");
    let meroleges2 = AB.perpendicularLineAtPoint(ABfelezoPont, -1000);
    let meroleges2_masikirany = AB.perpendicularLineAtPoint(ABfelezoPont, 1000);
    let O = meroleges1.intersection(meroleges2, "O'");
    let c1 = new Circle(O, O.dist(A));
    let A_dir = A.copy().sub(O).heading();
    let B_dir = B.copy().sub(O).heading();
    let C_dir = C.copy().sub(O).heading();
    let newAs = c.intersection(new Line(O1, Point.fromVector(O1.copy().add(p5.Vector.fromAngle(A_dir).mult(c.r)), ""), ""));
    newAs = newAs.filter((a) => {
        return (O.x - A.x > 0 && O1.x - a.x > 0) || (O.x - A.x <= 0 && O1.x - a.x <= 0);
    });
    const newA = newAs[0];
    let newBs = c.intersection(new Line(O1, Point.fromVector(O1.copy().add(p5.Vector.fromAngle(B_dir).mult(c.r)), ""), ""));
    newBs = newBs.filter((b) => {
        return (O.x - B.x > 0 && O1.x - b.x > 0) || (O.x - B.x <= 0 && O1.x - b.x <= 0);
    });
    const newB = newBs[0];
    let newCs = c.intersection(new Line(O1, Point.fromVector(O1.copy().add(p5.Vector.fromAngle(C_dir).mult(c.r)), ""), ""));
    newCs = newCs.filter((c) => {
        return (O.x - C.x > 0 && O1.x - c.x > 0) || (O.x - C.x <= 0 && O1.x - c.x <= 0);
    });
    const newC = newCs[0];
    newA.mColor = [255, 0, 0, 128];
    newB.mColor = [255, 0, 0, 128];
    newC.mColor = [255, 0, 0, 128];
    const newAB = new Line(newA, newB, "c'");
    const newAC = new Line(newA, newC, "b'");
    const newBC = new Line(newB, newC, "a'");
    irany1.draw();
    irany2.draw();
    irany3.draw();
    c.draw();
    P.draw();
    c1.drawLight();
    AB.draw();
    BC.draw();
    AC.draw();
    meroleges1.drawLight();
    meroleges1_masikirany.drawLight();
    meroleges2.drawLight();
    meroleges2_masikirany.drawLight();
    newAB.draw();
    newBC.draw();
    newAC.draw();
}
//# sourceMappingURL=build.js.map