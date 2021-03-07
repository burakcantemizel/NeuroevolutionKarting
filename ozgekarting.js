let yapaySinirAgi;

function setup(){
  tf.setBackend('cpu');

  createCanvas(640, 480);
  background(0);
  yapaySinirAgi = new YapaySinirAgi(2,8,2);
  let girdiler = [];
  girdiler[0] = 0;
  girdiler[1] = 2;
  console.log(yapaySinirAgi.tahminEt(girdiler));
  let digerSinirAgi = yapaySinirAgi.kopyala();
  digerSinirAgi.mutasyon(0.01);
  console.log(digerSinirAgi.tahminEt(girdiler));
}

function draw(){

}