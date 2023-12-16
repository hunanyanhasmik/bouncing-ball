interface Circle {
	x: number;
	y: number;
	radius: number;
	velocityY: number;
	dampening: number;
	gravity: number;
	color: string;
}

const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
const circles: Circle[] = [];

const width = window.innerWidth;
const height = window.innerHeight;
canvas.width = width;
canvas.height = height;

canvas.addEventListener('click', (event: MouseEvent) => {
	const colorsArray = ["red", "blue", "green", "yellow", "pink"];
	const getRandomColor = colorsArray[Math.floor(Math.random() * colorsArray.length)];

	const newCircle: Circle = {
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

	circles.forEach((circle) => {
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

