class Point {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}

var flag = false,
        prevX = 0,
        currX = 0,
        prevY = 0,
        currY = 0,
        dot_flag = false;

var x = "black",
        y = 2;

const canvas = document.getElementsByClassName('draw_panel')[0]
const ctx = canvas.getContext('2d')

let isDrawing = false
let last = new Point(0, 0)
let offset = new Point(30, -25)
var points = []
redraw(canvas)
redraw(document.getElementById("infoDraw"))

canvas.addEventListener("mousemove", function (e) {
    findxy('move', e)
}, false);

canvas.addEventListener("pointermove", function (e) {
    findxy('move', e)
}, false);
canvas.addEventListener("mousedown", function (e) {
    findxy('down', e)
}, false);
canvas.addEventListener("mouseup", function (e) {
    findxy('up', e)
}, false);
canvas.addEventListener("mouseout", function (e) {
    findxy('out', e)
}, false);

function redraw(cCanvas) {
    const cCtx = cCanvas.getContext('2d')
    cCtx.clearRect(0, 0, cCanvas.width, cCanvas.height);

    if(points.length === 0)
        return

    cCtx.beginPath()
    cCtx.moveTo(points[0].x, points[0].y)
    for(const point of points)
        cCtx.lineTo(point.x, point.y)

    cCtx.strokeStyle = "black"
    cCtx.lineWidth = 2
    cCtx.stroke()
}

// function draw(event) {
//     if(!isDrawing) 
//         return

//     ctx.beginPath()

//     offset.y = event.offsetY //> 140 ? -60 : -25
//     offset.x = event.offsetX //> 140 ? 50 : event.offsetX < 110 ? 20 : 30

//     ctx.moveTo(last.x, last.y)
//     ctx.lineTo(event.offsetX , event.offsetY )
//     points.push(new Point(event.offsetX + offset.x, event.offsetY + offset.y))

//     ctx.strokeStyle = "black"
//     ctx.lineWidth = 2
//     ctx.stroke()

//     last.x = event.movementX + offset.x
//     last.y = event.movementY + offset.y
// }

function startDrawing(event) {
    last.x = event.offsetX
    last.y = event.offsetY
    console.log(last)
    isDrawing = true
    points.push(new Point(last.x, last.y))
}

function findxy(res, e) {
    var boundingBox = canvas.getBoundingClientRect()
    if (res == 'down') {
        prevX = currX;
        prevY = currY;
        
        currX = e.clientX - boundingBox.left;
        currY = e.clientY - boundingBox.top;
        //console.log(boundingBox)

        //console.log(currX + " " + currY)
        flag = true;
        dot_flag = true;
        if (dot_flag) {
            ctx.beginPath();
            ctx.fillStyle = x;
            ctx.fillRect(currX, currY, 2, 2);
            ctx.closePath();
            dot_flag = false;
        }
    }
    if (res == 'up' || res == "out") {
        flag = false;
    }
    if (res == 'move') {
        if (flag) {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - boundingBox.left;
            currY = e.clientY - boundingBox.top;
            points.push(new Point(currX, currY))
            draw();
        }
    }
}

function draw() {
    //console.log(prevX)
    //console.log(currY)
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
}