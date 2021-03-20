class Araba{

  constructor(beyin){
    this.x = baslangicX;
    this.y = baslangicY;
    this.w = 64;
    this.h = 32;
    this.hiz = 5;
    this.aci = 0;
    this.donmeMiktari = 3;
    this.noktalariHesapla();
    this.isinlariHesapla();

    this.skor = 0;
    this.uygunluk = 0;

    this.maksimumIsinUzunluk = 100;

    if(beyin){
      this.beyin = beyin.kopyala();
    }else{
      this.beyin = new YapaySinirAgi(5,8,2);
    }

  }


  noktalariHesapla(){
    this.solOnNokta_x = cos(this.aci) * this.w/2 - sin(-this.aci) * -this.h/2 + this.x;
    this.solOnNokta_y = sin(-this.aci) * this.w/2 + cos(this.aci) * -this.h/2 + this.y;
    this.sagOnNokta_x = cos(this.aci) * this.w/2 - sin(-this.aci) * +this.h/2 + this.x;
    this.sagOnNokta_y = sin(-this.aci) * this.w/2 + cos(this.aci) * +this.h/2 + this.y;
    this.solArkaNokta_x = cos(this.aci) * -this.w/2 - sin(-this.aci) * -this.h/2 + this.x;
    this.solArkaNokta_y = sin(-this.aci) * -this.w/2 + cos(this.aci) * -this.h/2 + this.y;
    this.sagArkaNokta_x = cos(this.aci) * -this.w/2 - sin(-this.aci) * +this.h/2 + this.x;
    this.sagArkaNokta_y = sin(-this.aci) * -this.w/2 + cos(this.aci) * +this.h/2 + this.y;
  }

  isinlariHesapla(){
    //5 adet isin 
    // sol, solcarpraz, ön, sagcarpraz, sag
    this.solIsinUzunluk = 0;
    this.solUstIsinUzunluk = 0;
    this.ustIsinUzunluk = 0;
    this.sagUstIsinUzunluk = 0;
    this.sagIsinUzunluk = 0;

    for(let aci = -90; aci < 100; aci += 45){
      for(let i = 0; i < this.maksimumIsinUzunluk; i++){
        let x = this.x + i * cos(-this.aci + aci);
        let y = this.y + i * sin(-this.aci + aci);
        let isinRenk = pistResim.get(x, y);
        if(isinRenk[0] == 255 && isinRenk[1] == 255 && isinRenk[2] == 255){
          break;
        }
        if(aci == -90){
          this.solIsinUzunluk = i;
        }else if(aci == -45){
          this.solUstIsinUzunluk = i;
        }else if(aci == 0){
          this.ustIsinUzunluk = i;
        }else if(aci == 45){
          this.sagUstIsinUzunluk = i;
        }else if(aci == 90){
          this.sagIsinUzunluk = i;
        }
      }
    }
    

    //console.log("sol isin: " + this.solIsinUzunluk);
    //console.log("sol ust isin: " + this.solUstIsinUzunluk);
    //console.log("ust isin: " + this.ustIsinUzunluk);
    //console.log("sag ust isin: " + this.sagUstIsinUzunluk);
    //console.log("sag isin: " + this.sagIsinUzunluk);
  }

  
  dusun(){
    let girdiler = [];
    girdiler[0] = this.solIsinUzunluk / this.maksimumIsinUzunluk;
    girdiler[1] = this.solUstIsinUzunluk / this.maksimumIsinUzunluk;
    girdiler[2] = this.ustIsinUzunluk / this.maksimumIsinUzunluk;
    girdiler[3] = this.sagUstIsinUzunluk / this.maksimumIsinUzunluk;
    girdiler[4] = this.sagIsinUzunluk / this.maksimumIsinUzunluk;

    let cikti = this.beyin.tahminEt(girdiler);
    if(cikti[0] > cikti[1]){
      this.solaDon();
    }else{
      this.sagaDon();
    }
  }

  mutasyon(){
    this.beyin.mutasyon(0.1);
  }

  hareket(){
    this.skor++;
    this.aci = this.aci % 360;
    
    /*
    if(keyIsDown(LEFT_ARROW) == true){
      this.solaDon();
    }
    if(keyIsDown(RIGHT_ARROW) == true){
      this.sagaDon();
    }
    if(keyIsDown(UP_ARROW) == true){
      //hizda bir islem;
    }
    */

    //console.log(this.aci);

    this.x += this.hiz * cos(this.aci);
    this.y -= this.hiz * sin(this.aci);

    this.noktalariHesapla();
    this.isinlariHesapla();
  }

  cizdir(){
    push();
      //stroke(0);
      //fill(255,0,0);
      fill(255,0,0);
      stroke(0);
      translate(this.x , this.y, 10);
      scale(0.4);
      //scale(0.35);
      rotateX(90 );
      rotateY(90-this.aci);
      rotateZ(0);
      //rect(-this.w/2, -this.h/2, this.w, this.h);
      model(arabaModel);
    pop();

    stroke(255);
    fill(255);
    
    /*
    ellipse(this.x , this.y,  2 ,2);
    ellipse(this.solOnNokta_x, this.solOnNokta_y, 2, 2);
    ellipse(this.sagOnNokta_x, this.sagOnNokta_y, 2, 2);
    ellipse(this.solArkaNokta_x, this.solArkaNokta_y, 2, 2);
    ellipse(this.sagArkaNokta_x, this.sagArkaNokta_y, 2, 2);
    */

    stroke(0,0,255);
    line(this.x, this.y, this.x + this.solIsinUzunluk * cos(-this.aci-90), this.y + this.solIsinUzunluk * sin(-this.aci-90));
    line(this.x, this.y, this.x + this.solUstIsinUzunluk * cos(-this.aci-45), this.y + this.solUstIsinUzunluk * sin(-this.aci-45));
    line(this.x, this.y, this.x + this.ustIsinUzunluk * cos(-this.aci), this.y + this.ustIsinUzunluk * sin(-this.aci));
    line(this.x, this.y, this.x + this.sagUstIsinUzunluk * cos(-this.aci+45), this.y + this.sagUstIsinUzunluk * sin(-this.aci+45));
    line(this.x, this.y, this.x + this.sagIsinUzunluk * cos(-this.aci+90), this.y + this.sagIsinUzunluk * sin(-this.aci+90));
  }

  solaDon(){
    this.aci += this.donmeMiktari;
  }

  sagaDon(){
    this.aci -= this.donmeMiktari;
  }

  carpisma(){
    let solOnNoktaRenk = pistResim.get(this.solOnNokta_x, this.solOnNokta_y);
    let sagOnNoktaRenk = pistResim.get(this.sagOnNokta_x, this.sagOnNokta_y);
    let solArkaNoktaRenk = pistResim.get(this.solArkaNokta_x, this.solArkaNokta_y);
    let sagArkaNoktaRenk = pistResim.get(this.sagArkaNokta_x, this.sagArkaNokta_y);
    if(solOnNoktaRenk[0] == 255 && solOnNoktaRenk[1] == 255 && solOnNoktaRenk[2] == 255){
      return true;
    }
    if(sagOnNoktaRenk[0] == 255 && sagOnNoktaRenk[1] == 255 && sagOnNoktaRenk[2] == 255){
      return true;
    }
    if(solArkaNoktaRenk[0] == 255 && solArkaNoktaRenk[1] == 255 && solArkaNoktaRenk[2] == 255){
      return true;
    }
    if(sagArkaNoktaRenk[0] == 255 && sagArkaNoktaRenk[1] == 255 && sagArkaNoktaRenk[2] == 255){
      return true;
    }
    return false;
  }

}