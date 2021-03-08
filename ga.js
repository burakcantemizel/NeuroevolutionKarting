  function sonrakiNesil(){
    jenerasyon++;
    uygunlukHesapla();
    for(let i = 0; i < TOPLAM_ARABA; i++){
      arabalar[i] = biriniSec();
    }

    for(let i = 0; i < TOPLAM_ARABA; i++){
      kaydedilenArabalar[i].beyin.temizle();
    }
    kaydedilenArabalar = [];
  }

  function biriniSec() {
    let index = 0;
    let r = random(1);
    while (r > 0) {
      r = r - kaydedilenArabalar[index].uygunluk;
      index++;
    }
    index--;
    let araba = kaydedilenArabalar[index];
    let cocuk = new Araba(araba.beyin);
    cocuk.mutasyon();
    return cocuk;
  }

  function uygunlukHesapla(){
    let toplam = 0;

    for(let araba of kaydedilenArabalar){
      toplam += araba.skor;
    }

    for(let araba of kaydedilenArabalar){
      araba.uygunluk = araba.skor / toplam;
    } 


  }