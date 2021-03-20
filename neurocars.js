const TOPLAM_ARABA = 25;

let arabalar = [];
let kaydedilenArabalar = [];
let jenerasyon = 1;

let pistResim;
let baslangicX = 350;
let baslangicY = 450;
let araba;


function preload(){
  pistResim = loadImage("kaynaklar/pist2.jpg");
  arabaModel = loadModel('kaynaklar/race.obj', true);
}

function setup(){
  tf.setBackend('cpu');
  noSmooth();
  frameRate(30);
  
   

  createCanvas(800, 600, WEBGL);
  angleMode(DEGREES);


  for(let i = 0; i < TOPLAM_ARABA; i++){
    arabalar[i] = new Araba();
  }
  
  araba = new Araba();
}

function draw(){
  
  for(let i = arabalar.length - 1; i >= 0; i--){
    if(arabalar[i].carpisma() == true){
      kaydedilenArabalar.push(arabalar.splice(i,1)[0]);
    }
  }

  for(let araba of arabalar){
    araba.dusun();
    araba.hareket();
  }

  if(arabalar.length === 0){
    sonrakiNesil();
  }
   camera(0, 550, 250,0,0,0, 0, 1, 0);
  background(255);
  //orbitControl();
  translate(-width/2, -height/2);
  image(pistResim, 0, 0);

  for(let araba of arabalar){
    araba.cizdir();
  }
}
