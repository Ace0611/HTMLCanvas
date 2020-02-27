let canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d')

// console.log(c)

// c.fillStyle = 'rgba(255,0,0,0.8)'
// c.fillRect(100, 100, 100, 100)
// c.fillStyle = 'blue'
// c.fillRect(400, 100, 100, 100)

// //Line
// c.beginPath()
// c.moveTo(50, 300);
// c.strokeStyle = 'green'
// c.lineTo(300, 100)
// c.lineTo(400, 300)
// c.lineTo(500, 100)
// c.stroke();

// //Arc
// // c.beginPath()
// // c.arc(300,300,30,0,Math.PI*2,false)
// // c.strokeStyle = 'pink'
// // c.stroke()

// for(let i=0; i<100; i++){
//     let x = Math.random() * window.innerWidth;
//     let y = Math.random() * window.innerHeight;
//     let red = Math.random() * 255
//     let blue = Math.random() * 255
//     let green = Math.random() * 255

//     c.beginPath();
//     c.arc(x,y,30,0,Math.PI*2, false)
//     c.strokeStyle = `rgba(${red},${green},${blue},1)`
//     c.stroke()
// }

let mouse = {
    x: undefined,
    y: undefined,
}

let colorsArray = [
    '#ff0033',
    '#99ffaa',
    'red',
    'green',
    'whitesmoke'
]

window.addEventListener('mousemove', function(e){
    mouse.x = e.x;
    mouse.y = e.y;
})

window.addEventListener('resize', function(){
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
})

function Circle(x,y,dx,dy,radius){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = colorsArray[Math.floor(Math.random()*colorsArray.length)];
    this.minRadius = radius

    this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.strokeStyle = 'blue';
        c.stroke();
        c.fill();
        c.fillStyle = this.color
    }

    this.update = function(){
        if(this.x + this.radius > innerWidth || this.x - this.radius<0){
            this.dx = -this.dx;
        }

        if(this.y + this.radius > innerHeight || this.y - this.radius<0){
            this.dy = -this.dy;
        }
        if(Math.abs(this.x-mouse.x)<50 && Math.abs(this.y-mouse.y)<50){
            if(this.radius<50){
                this.radius++;
            }
        }else if(this.radius>this.minRadius){
            this.radius--;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw()
    }
}
let circle = new Circle(200, 200, 3, 3, 30); 

var circleArray = [];

function init(){
    circleArray = [];
    for(let i=0; i<1000; i++){
        var radius = Math.random()*3 + 1;
        var x = Math.random() * (innerWidth-radius*2)+radius;
        var y = Math.random() * (innerHeight-radius*2)+radius;
        var dx = (Math.random() - 0.5) * 4;
        var dy = (Math.random() - 0.5) * 4;
        circleArray.push(new Circle(x,y,dx,dy,radius))
}
}


function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight )
    for(let i=0; i<circleArray.length; i++){
        circleArray[i].update();
    }
    // if(x+radius>innerWidth || x-radius<0){
    //     dx = -dx;
    // }
    // if(y+radius>innerHeight || y-radius<0){
    //     dy = -dy;
    // }
    // x += dx;
    // y += dy
}

animate()
init()