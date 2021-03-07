class YapaySinirAgi{

  constructor(a, b, c, d){
    if(a instanceof tf.Sequential){
      this.model = a;
      this.girdi_dugumler = b;
      this.gizli_dugumler = c;
      this.cikti_dugumler = d;
    }else{
      this.girdi_dugumler = a;
      this.gizli_dugumler = b;
      this.cikti_dugumler = c;
      this.model = this.modelOlustur();
    }
  }

  kopyala(){
    return tf.tidy(()=>{
      const kopya_model = this.modelOlustur();
      const agirliklar = this.model.getWeights();
      const kopya_agirliklar = [];
      
      for(let i = 0; i < agirliklar.length; i++){
        kopya_agirliklar[i] = agirliklar[i].clone();
      }

      kopya_model.setWeights(kopya_agirliklar);
      
      return new YapaySinirAgi(
        kopya_model, 
        this.girdi_dugumler,
        this.gizli_dugumler, 
        this.cikti_dugumler
      );
    });

  }

  mutasyon(oran){
    tf.tidy(() => { 
      const agirliklar = this.model.getWeights();
      const mutasyonlu_agirliklar = [];

      for(let i = 0; i < agirliklar.length; i++){
        let tensor = agirliklar[i];
        let sekil = agirliklar[i].shape;
        let degerler = tensor.dataSync().slice();

        for(let j = 0; j < degerler.length; j++){
          if(random(1) < oran){
            let agirlik = degerler[j];
            degerler[j] = agirlik + randomGaussian();
          }
        }

        let yeni_tensor = tf.tensor(degerler, sekil);
        mutasyonlu_agirliklar[i] = yeni_tensor;
      }

      this.model.setWeights(mutasyonlu_agirliklar);
    });
  }

  temizle(){
    this.model.dispose();
  }

  tahminEt(girdi_dizisi){
    return tf.tidy(() => {
      const xler = tf.tensor2d([girdi_dizisi]);
      const yler = this.model.predict(xler);
      const ciktilar = yler.dataSync();
      //console.log(ciktilar);
      return ciktilar;
    });
  }

  modelOlustur(){
    //return tf.tidy(()=>{
      const model = tf.sequential();
      const gizli_katman = tf.layers.dense({
        units: this.gizli_dugumler,
        inputShape: [this.girdi_dugumler],
        activation: 'sigmoid',
      });
      model.add(gizli_katman);
      const cikti_katman = tf.layers.dense({
        units: this.cikti_dugumler,
        activation : 'softmax',
      });
      model.add(cikti_katman);
      //this.model.compile({}); 
      return model;
    //});
  }
  
}