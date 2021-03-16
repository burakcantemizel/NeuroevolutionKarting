const TOPLAM_ARABA = 20;

let arabalar = [];
let kaydedilenArabalar = [];
let jenerasyon = 1;

let pistResim;
let baslangicX = 350;
let baslangicY = 520;
let araba;

function preload(){
  pistResim = loadImage("kaynaklar/pist.jpg");
}

function setup(){
  tf.setBackend('cpu');
  noSmooth();
  createCanvas(800, 600);
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
  
  
  
  image(pistResim, 0, 0);

  for(let araba of arabalar){
    araba.cizdir();
  }
}
