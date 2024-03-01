class Point {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}

const canvas = document.getElementsByClassName('draw_panel')[0]
const ctx = canvas.getContext('2d')

let isDrawing = false
let last = new Point(0, 0)
let offset = new Point(30, -25)
var points = []
redraw(canvas)
redraw(document.getElementsByClassName('draw_panel')[1])

canvas.addEventListener("mousedown", startDrawing)
canvas.addEventListener("mousemove", draw)
canvas.addEventListener("mouseup", () => isDrawing = false)

function redraw(cCanvas) {
    const cCtx = cCanvas.getContext('2d')

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

function draw(event) {
    if(!isDrawing) 
        return

    ctx.beginPath()

    offset.y = event.offsetY > 140 ? -60 : -25
    offset.x = event.offsetX > 140 ? 50 : event.offsetX < 110 ? 20 : 30

    ctx.moveTo(last.x, last.y)
    ctx.lineTo(event.offsetX + offset.x, event.offsetY + offset.y)
    points.push(new Point(event.offsetX + offset.x, event.offsetY + offset.y))

    ctx.strokeStyle = "black"
    ctx.lineWidth = 2
    ctx.stroke()

    last.x = event.offsetX + offset.x
    last.y = event.offsetY + offset.y
}

function startDrawing(event) {
    isDrawing = true
    last.x = event.offsetX + offset.x
    last.y = event.offsetY + offset.y
    points.push(new Point(last.x, last.y))
}