class Line {

    constructor(public p1: Point, public p2: Point, public name: string) {}

    getAtDistance(distance: number, pointNumber?: number): p5.Vector {
        let vect = this.p2.copy().sub(this.p1);
        vect.normalize();
        vect.mult(distance);
        if(pointNumber == 2){
            return this.p2.copy().sub(vect);
        }
        return this.p1.copy().add(vect);
    }

    vector(): p5.Vector{
        return p5.Vector.sub(this.p2, this.p1);
    }

    length(): number{
        return this.p2.dist(this.p1);
    }

    getA(): number {
        return (this.p2.y - this.p1.y) / (this.p2.x - this.p1.x + 0.01); // végtelen meredekségű cuccok esetére ne osszunk 0-val
    }

    getB(): number {
        return this.p1.y - this.p1.x * this.getA();
    }

    perpendicularLineAtPoint(P: Point, length?: number):Line {
        if(!length){
            length = 1
        }
        return new Line(P, Point.fromVector(P.copy().add(length, -length/this.getA()), ""), "");
    }

    intersection(other: Line, name?: string): p5.Vector | Point {
        if(name){
            const i = this.intersection(other);
            return Point.fromVector(i, name);
        }
        const a1 = this.getA();
        const b1 = this.getB();
        const a2 = other.getA();
        const b2 = other.getB();
        const x = (b1-b2) / (a2-a1 + 0.00001); // párhuzamos cuccok esetére ne osszunk 0-val
        const y = a2*x + b2;
        return createVector(x, y);
    }

    draw() :void{
        stroke(0);
        strokeWeight(3);
        line(this.p1.x,this.p1.y,this.p2.x, this.p2.y);
        noStroke();
        fill(0);
        textSize(20);
        text(this.name, p5.Vector.add(this.p1, this.p2).div(2).x, p5.Vector.add(this.p1, this.p2).div(2).y);

        this.p1.draw();
        this.p2.draw();
    }

    drawLight(): void {
        strokeWeight(1);
        stroke(128);
        line(this.p1.x, this. p1.y, this.p2.x, this.p2.y);
    }
}
