const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var engine, world;

let particles = [];
let plinkos = [];
let divisions = [];

var divisionHeight = 300;

function setup() {
  createCanvas(480, 800);

  engine = Engine.create();
  world = engine.world;

  let groundThickness = 20;
  ground = {
    bottom: new Ground(width / 2, height, width, groundThickness),
    right: new Ground(width, height / 2, groundThickness, height),
    left: new Ground(0, height / 2, groundThickness, height)
  };

  for (let i = 0; i <= width; i += 80) {
    divisions.push(new Division(i, height - divisionHeight / 2, 10, divisionHeight));
  }

  for (let i = 0; i < 4; i++) {
    let j;
    if (i % 2 == 0) {
      j = 15;
    } else {
      j = 40;
    }
    for (; j <= width; j += 50) {
      plinkos.push(new Plinko(j, i * 100 + 75));
    }
  }
  Engine.run(engine);
}

function draw() {
  background(0);

  ground.bottom.display();
  ground.right.display();
  ground.left.display();

  for (let division of divisions) {
    division.display();
  }

  for (let i = 0; i < plinkos.length; i++) {
    plinkos[i].display();
  }

  for (let i = 0; i < particles.length; i++) {
    particles[i].display();
  }

  if (frameCount % 90 == 0 || frameCount % 60 == 0) {
    particles.push(new Particle(random(20, width - 20), 0, 10));
  }
}