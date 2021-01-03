let canvas=document.querySelector("canvas");
let c=canvas.getContext("2d");
const base=["a","b","c","d","e","f",0,1,2,3,4,5,6,7,8,9];
let color="#";
let radio=40;
let raton={
	x:undefined,
	y:undefined
};
let maxRadio=70;
const paleta=["f72585","b5179e","7209b7","560bad","480ca8","3a0ca3","3f37c9","4361ee","4895ef","4cc9f0"];

canvas.width=window.innerWidth;
	canvas.height=window.innerHeight;	

//cuadrados//
// for(let i=0; i<25; i++){
// 	for(let i=0;i<6;i++){
// 		color+=base[Math.floor(Math.random()*base.length)];
// 		}
// 	c.fillStyle=color;	
// 	c.fillRect(Math.random()*window.innerWidth,Math.random()*window.innerHeight,100,100);
// 	color="#";	
// }

window.addEventListener("resize", function(){
	canvas.width=window.innerWidth;
	canvas.height=window.innerHeight;	
	init();
});	
window.addEventListener("touchmove",function(){
	raton.x=event.x;
	raton.y=event.y;
})
window.addEventListener("mousemove", function(){
	raton.x=event.x;
	raton.y=event.y;
});

//circulo
function Circulo(x,y,dx,dy,radio, color){
	this.x=x;
	this.y=y;
	this.dx=dx;
	this.dy=dy;
	this.radio=radio;
	this.minRadio=radio;
	this.color=color;
	
	this.dibujar=function(){
		c.beginPath();
		c.arc(this.x,this.y,this.radio,0, Math.PI*2,false);	
		c.strokeStyle=this.color;
		c.stroke();
		c.fillStyle=this.color;
		c.fill();
		
	}
	this.animar= function(){
		if(this.x+this.radio>innerWidth||this.x-this.radio<0){
			this.dx=-this.dx;
		}
		if(this.y+this.radio>innerHeight||this.y-this.radio<0){
			this.dy=-this.dy;
		}
		this.y+=this.dy;
		this.x+=this.dx;

		//interactividad
		if(raton.x-this.x<50 && raton.x-this.x > -50 && raton.y-this.y<50 && raton.y-this.y > -50){
			if(this.radio<maxRadio)
			{this.radio+=1;}
		} else if (this.radio>this.minRadio){
			this.radio-=1;
		} ;



		this.dibujar();
	}
}
let arregloCirculo=[];

function init(){
	arregloCirculo=[];
	for(let i=0; i<250;i++){
		let radio=Math.floor(Math.random()*30);
		console.log(radio);
		let x=Math.random()*(innerWidth-radio*2)+radio;
		let y=Math.random()*(innerHeight-radio*2)+radio;
		let dx=(Math.random()-0.5)*2;
		let dy=(Math.random()-0.5)*2;
		color+=paleta[Math.floor(Math.random()*paleta.length)];
		//for(let i=0;i<6;i++){
		//		color+=base[Math.floor(Math.random()*base.length)];
		//	}
		
		arregloCirculo.push(new Circulo(x,y,dx,dy,radio,color))
		color="#"
}};





function animate(){
	requestAnimationFrame(animate);
	c.clearRect(0,0,innerWidth,innerHeight);

	for(let i=0;i<arregloCirculo.length;i++){
		arregloCirculo[i].animar();
	}

		
			
}

animate();
init();