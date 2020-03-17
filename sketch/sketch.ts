const pointSize = 40;


let mouse: p5.Vector;
let draggedPoint: Point = null;

let A: Point, B: Point, C: Point;
let AB: Line, BC: Line, AC: Line;
let O1: Point;
let P: Point;
let c: Circle;
let irany1: Line;
let irany2: Line;
let irany3: Line;
let iranyOrigo: Point;
let sk0: Point

function setup() {
    createCanvas(windowWidth, windowHeight);

    O1 = new Point(0.75*width, 0.5*height, "O");
    P = new Point(0.6*width, 0.3*height, "P");
    c = new Circle(O1, P.dist(O1));

    sk0 = new Point(width* 0.3, height * 0.6, "sk0");

    iranyOrigo = new Point(width * 0.2, height * 0.2, "IO");
    irany1 = new Line(iranyOrigo, new Point(width*0.221, height *0.3, "alfa"), "");
    irany2 = new Line(iranyOrigo, new Point(width*0.27, height *0.25, "béta"), "");
    irany3 = new Line(iranyOrigo, new Point(width*0.1, height *0.25, "gamma"), "");
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
    B = Point.fromVector(sk0.copy().add(irany1.vector().normalize().mult(width*0.1)), "B");
    let BC_egyenes = new Line(B, Point.fromVector(B.copy().add(irany2.vector().normalize().mult(width*0.1)), ""), "BC_egyenes")
    BC_egyenes.drawLight();
    let AC_egyenes = new Line(A, Point.fromVector(A.copy().add(irany3.vector().normalize().mult(width*0.1)), ""), "AC_egyenes")
    AC_egyenes.drawLight();
    C = AC_egyenes.intersection(BC_egyenes, "C") as Point;

    AB = new Line(A, B, "c");
    BC = new Line(B, C, "a");
    AC = new Line(A, C, "b");

    let ACfelezoPont = Point.fromVector(A.copy().add(C).div(2), "");
    let meroleges1 = AC.perpendicularLineAtPoint(ACfelezoPont, 1000);
    let meroleges1_masikirany = AC.perpendicularLineAtPoint(ACfelezoPont, -1000);

    let ABfelezoPont = Point.fromVector(A.copy().add(B).div(2), "");
    let meroleges2 = AB.perpendicularLineAtPoint(ABfelezoPont, -1000);
    let meroleges2_masikirany = AB.perpendicularLineAtPoint(ABfelezoPont, 1000);

    let O = meroleges1.intersection(meroleges2, "O'") as Point;
    let c1 = new Circle(O, O.dist(A));

    let A_dir: number = A.copy().sub(O).heading();
    let B_dir = B.copy().sub(O).heading();
    let C_dir = C.copy().sub(O).heading();

    let newAs = c.intersection(new Line(O1, Point.fromVector(O1.copy().add(p5.Vector.fromAngle(A_dir).mult(c.r)), ""), ""));
    newAs = newAs.filter((a)=>{
        return (O.x - A.x > 0 && O1.x - a.x > 0) || (O.x - A.x <= 0 && O1.x - a.x <= 0)
    });
    const newA = newAs[0];

    let newBs = c.intersection(new Line(O1, Point.fromVector(O1.copy().add(p5.Vector.fromAngle(B_dir).mult(c.r)), ""), ""));
    newBs = newBs.filter((b)=>{
        return (O.x - B.x > 0 && O1.x - b.x > 0) || (O.x - B.x <= 0 && O1.x - b.x <= 0)
    });
    const newB = newBs[0];

    let newCs = c.intersection(new Line(O1, Point.fromVector(O1.copy().add(p5.Vector.fromAngle(C_dir).mult(c.r)), ""), ""));
    newCs = newCs.filter((c)=>{
        return (O.x - C.x > 0 && O1.x - c.x > 0) || (O.x - C.x <= 0 && O1.x - c.x <= 0)
    });
    const newC = newCs[0];

    newA.mColor = [255,0,0,128];
    newB.mColor = [255,0,0,128];
    newC.mColor = [255,0,0,128];
    const newAB = new Line(newA, newB, "c'")
    const newAC = new Line(newA, newC, "b'")
    const newBC = new Line(newB, newC, "a'")

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
