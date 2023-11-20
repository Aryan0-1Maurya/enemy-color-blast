/* 

    #############################################################
      
          @@@@@@@@@@    &&&&&&&&&&&&&&&&&&&    %%%%%%%%%%

(   By ~Aryan Maurya Mr.perfect https://amsrportfolio.netlify.app  )

          @@@@@@@@@@    &&&&&&&&&&&&&&&&&&&    %%%%%%%%%%

    #############################################################

*/

alert("First ever game in java script you lose  ")


onload=()=>{
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
let score = document.querySelector('.s');
let showScore=document.querySelector('.O');
var startBtn=document.querySelector(".button");
let scoreBoard=document.querySelector('.starting');
class Player {
  constructor(x, y, color, radius) {
    this.x = x
    this.y = y
    this.color = color
    this.radius = radius
  } 
  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }
}
const x = canvas.width / 2;
const y = canvas.height / 2;
let player = new Player(x, y, 'white', 10);
//player done
//projectiles started

class Projectile {
  constructor(x, y, color, radius, velocity) {
    this.x = x
    this.y = y
    this.color = color
    this.radius = radius
    this.velocity = velocity
  }
  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }
  update() {
    this.draw();
    this.x = this.x + this.velocity.x
    this.y = this.y + this.velocity.y
  }
}
//enimies 
class Enemy {
  constructor(x, y, color, radius, velocity) {
    this.x = x
    this.y = y
    this.color = color
    this.radius = radius
    this.velocity = velocity
  }
draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }
  update() {
    this.draw();
    this.x = this.x + this.velocity.x
    this.y = this.y + this.velocity.y
  }  
}

//bursting effect
class Particle{
  constructor(x,y,radius,color,velocity){
    this.x=x 
    this.y=y 
    this.radius=radius
    this.color=color 
    this.velocity=velocity
    this.alpha=2
  }
  draw() {
    c.save();
    c.globalAlpha=this.alpha;
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.restore();
  }
  update() {
    this.draw();
    this.x = this.x + this.velocity.x 
    this.y = this.y + this.velocity.y 
    this.alpha-=0.05;
  }
}
const projectile = new Projectile(canvas.width / 2, canvas.height / 2, 'red', 10, {
  x: 2,
  y: 1
})
//arrays
let projectiles = [];
let enemies = [];
let particles=[];
//making restarr function

function init() {
 projectiles = [];
 enemies = [];
 particles=[];
 player = new Player(x, y, 'white', 10);
}

//arrays
function spawnEnemy() {
  setInterval(() => {
    const radius = Math.random()*(30-4)+4;
    let x;
    let y;
    if (Math.random() < 0.5) {
      x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
      y = Math.random() * canvas.height;
    } else {
      x = Math.random() * canvas.width;
      y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
    }
    const color = `hsl(${Math.random()*360},50%,50%`;
   const angle = Math.atan2(
    canvas.height / 2 - y,
    canvas.width / 2 - x
    );
    const velocity = {
      x: Math.cos(angle),
      y: Math.sin(angle)
    }
    enemies.push(new Enemy(x,y,color,radius,velocity));
  }, 1000)
}

/* 

    #############################################################
      
          @@@@@@@@@@    &&&&&&&&&&&&&&&&&&&    %%%%%%%%%%

(   By ~Aryan Maurya Mr.perfect https://amsrportfolio.netlify.app  )

          @@@@@@@@@@    &&&&&&&&&&&&&&&&&&&    %%%%%%%%%%

    #############################################################

*/

let scoreO =0 ;
function animate() {
  
animationId=  requestAnimationFrame(animate);
c.fillStyle='rgba(0,0,0,0.1)';
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.draw();
  particles.forEach((particle,index)=>{
    if (particle.alpha<=0){
      particles.splice(index,1)
    }else{
    particle.update();
    }
  })
  projectiles.forEach((projectile,index) => {
    projectile.update();
if(projectile.x+projectile.radius<0||
projectile.x-projectile.radius>canvas.width||projectile.y+projectile.radius<0||projectile.y-projectile.radius>canvas.height){
      setTimeout(()=>{
        projectiles.splice(index,1);
      },0)
    }
  })
  enemies.forEach((enemy,index)=>{
    enemy.update();
const dist = Math.hypot(player.x-enemy.x,player.y-enemy.y);  
if(dist - player.radius - enemy.radius<1){
  //when game over showing restart

scoreBoard.style.display='block';
  cancelAnimationFrame(animationId);
}

projectiles.forEach((projectile,projectileindex)=>{
const dist = Math.hypot(projectile.x-enemy.x,projectile.y-enemy.y);
//when enemy touches
if(dist - enemy.radius - projectile.radius<1){
  //score 
  scoreO+=100;
  score.innerHTML=scoreO;
  showScore.innerHTML=scoreO;
  //firework simulator
for(let i=0;i<enemy.radius*2;i++){
  particles.push(new Particle(projectile.x,projectile.y,Math.random()*3,enemy.color,{
    x:(Math.random()-0.5)*(Math.random()*10),
    y:(Math.random()-0.5)*(Math.random()*10)
  }))   
}
  
  if(enemy.radius-10>10){
    gsap.to(enemy,{
    radius:enemy.radius-10
   })
    
   
    setTimeout(()=>{
      projectiles.splice(projectileindex,1);
    })
  }else{
       setTimeout(()=>{
         enemies.splice(index,1);
         projectiles.splice(projectileindex,1);
       },0)
  }
     }
   }) 
  })
  
}

window.addEventListener('click', (Event) => {
  const angle = Math.atan2(Event.clientY - canvas.height / 2, Event.clientX - canvas.width / 2);
  const velocity = {
    x: Math.cos(angle)*5,
    y: Math.sin(angle)*5
  }
  projectiles.push(new Projectile(canvas.width / 2, canvas.height / 2,'white', 5, velocity))
  
})
//making start button
//animate();
//spawnEnemy();

startBtn.addEventListener("click",()=>{
  init();
  spawnEnemy();
  animate();
  scoreBoard.style.display='none';
  zeroScore=0;
  score.innerHTML=zeroScore;
  scoreO=0;
  startBtn.innerHTML="Re Start";
});
}

/* 

    #############################################################
      
          @@@@@@@@@@    &&&&&&&&&&&&&&&&&&&    %%%%%%%%%%

(   By ~Aryan Maurya Mr.perfect https://amsrportfolio.netlify.app  )

          @@@@@@@@@@    &&&&&&&&&&&&&&&&&&&    %%%%%%%%%%

    #############################################################

*/