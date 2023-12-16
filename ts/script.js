var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var circles = [];
var width = window.innerWidth;
var height = window.innerHeight;
canvas.width = width;
canvas.height = height;
canvas.addEventListener('click', function (event) {
    var colorsArray = ["red", "blue", "green", "yellow", "pink"];
    var getRandomColor = colorsArray[Math.floor(Math.random() * colorsArray.length)];
    var newCircle = {
        x: event.clientX - canvas.offsetLeft,
        y: event.clientY - canvas.offsetTop,
        radius: 20,
        velocityY: 0,
        dampening: 0.9,
        gravity: 0.5,
        color: getRandomColor,
    };
    circles.push(newCircle);
});
function update() {
    ctx.fillStyle = "rgba(0,0,0,0.3)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    circles.forEach(function (circle) {
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
        ctx.fillStyle = circle.color;
        ctx.fill();
        ctx.closePath();
        circle.velocityY += circle.gravity;
        circle.y += circle.velocityY;
        if (circle.y + circle.radius > canvas.height) {
            circle.y = canvas.height - circle.radius;
            circle.velocityY *= -circle.dampening;
        }
    });
    requestAnimationFrame(update);
}
update();
