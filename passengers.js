// TAKSİCİ - İSTANBUL HİKAYELERİ
// Yolcu Verileri ve Diyalogları

export const PASSENGERS = [
    // ===== KARAKTER 1: YASLI TEYZE (GENİŞLETİLMİŞ HİKAYE) =====
    {
        id: 1,
        name: "Yaşlı Teyze",
        avatar: "👵",
        image: require('./assets/characters/yasli_teyze.png'),
        location: "Üsküdar",
        time: "09:00",
        intro: "Küçük, çiçekli bir bohça taşıyan 70'li yaşlarında bir teyze. Gözleri yaşlı, elleri titriyor. Taksiye binerken 'Bismillah' diyor ve camdan dışarıya, sanki burada olmayan bir yere bakıyor.",
        dialogue: [
            // 0. GİRİŞ
            {
                text: '"Evladım... Beni acele Haydarpaşa\'ya götür. Tren... Treni kaçıracağım. Oğlum geliyor askerden. 40 yıl oldu... Yok, dün gitti sanki..."\n\nGözlerini siliyor.',
                choices: [
                    { text: "Teyze Haydarpaşa kapalı artık, tren gelmiyor oraya.", next: 1 }, // Gerçekçi (Sert)
                    { text: "Tamam teyzecim, yetiştiririz seni merak etme.", next: 2 }, // Şefkatli (Rol yapma)
                    { text: "Teyze dalga mı geçiyorsun? Gar müze oldu!", next: 3 } // Kaba (Negatif puan)
                ]
            },

            // --- YOL 1: GERÇEKÇİ/SERT ---
            // 1
            {
                text: 'Teyze şaşkınlıkla sana döndü. Yüzünde derin bir hayal kırıklığı...\n\n"Nasıl gelmez? Mektup yazdı bana... \'Ana bekle beni garın kapısında\' dedi. Sen bilmiyorsun şoför bey, götür beni."',
                choices: [
                    { text: "Teyze bak, sene 2024. O mektup eski.", next: 4 },
                    { text: "Peki teyze, gidelim gör kendi gözünle.", next: 5 }
                ]
            },

            // --- YOL 2: ŞEFKATLİ ---
            // 2
            {
                text: 'Teyze gülümsedi, yüzü aydınlandı. Bohçasına sarıldı.\n\n"Allah razı olsun evladım. En sevdiği sarmaları yaptım. Sıcak sıcak yesin diye. Asker ocağında aç kalmıştır kuzum..."',
                choices: [
                    { text: "Ne güzel koktu teyze, oğlun çok şanslı.", next: 6 },
                    { text: "Askerlik nerede yaptı teyze?", next: 7 }
                ]
            },

            // --- YOL 3: KABA ---
            // 3
            {
                text: 'Teyze irkildi, korkuyla geriye yaslandı.\n\n"Neden bağırıyorsun evladım? Ben oğluma gidiyorum... Param var bak..."\n\nTitreyen elleriyle düğümlü bir mendil çıkarıyor.',
                choices: [
                    { text: "Ver bakalım parayı, yolu uzatmam ona göre.", next: 8 },
                    { text: "Tamam teyze sus, sürüyorum.", next: 9 }
                ]
            },

            // --- DEVAM SENARYOLARI ---

            // 4 (Gerçekçi Devam)
            {
                text: '"2024 mü?..." Teyzenin gözleri doldu, elleri titremeye başladı.\n\n"O zaman... Ali\'m nerede? Ali\'m gelmedi mi? 40 yıl mı geçti? Ben... Ben neden buradayım?"',
                choices: [
                    { text: "Teyze gel seni karakola götüreyim, evini bulsunlar.", next: 10 },
                    { text: "Hatırlamaya çalış teyze, evin nerede?", next: 11 }
                ]
            },

            // 5 (Haydarpaşa'ya Gidiş - Hüsran)
            {
                text: 'Haydarpaşa Garı\'nın önüne geldiniz. Sessiz, boş, tadilatta.\n\n"Hani tren? Hani kalabalık? Kimse yok şoför bey... Kandırdın mı beni? Ali\'m nerede?"\n\nAğlamaya başlıyor.',
                choices: [
                    { text: "Teyze dedim sana kapalı diye. Gel dönelim.", next: 12 },
                    { text: "Biraz bekle belki gelir...", next: 13 }
                ]
            },

            // 6 (Şefkatli - Sarmalar)
            {
                text: '"Sever tabii... Kara kaşlım, selvi boylum... Tıpkı sana benziyor biliyor musun? O da senin gibi güzel bakar..."\n\nSana dikiz aynasından uzun uzun bakıyor.',
                choices: [
                    { text: "Sağ ol teyze. Adım Ahmet benim.", next: 14 },
                    { text: "Ali de askerden dönmüştür belki teyze, evde bekliyordur?", next: 15 }
                ]
            },

            // 7 (Şefkatli - Askerlik)
            {
                text: '"Kars\'ta yaptı... Soğuktur oralar dedi. Ben de yün çorap ördüm ona. Mektupları bile soğuk gelirdi..."\n\nDalıyor gözleri.\n\n"Ama sonra mektuplar kesildi... 1980\'di..."',
                choices: [
                    { text: "Sessizce dinle.", next: 16 },
                    { text: "1980 mi? Teyze o çok eski...", next: 15 }
                ]
            },

            // 8 (Kaba - Para)
            {
                text: 'Mendili açtı, içinden eski paralar, bozukluklar ve bir de siyah beyaz fotoğraf düştü.\n\n"Al evladım, hepsi senin olsun. Yeter ki Ali\'me götür beni."',
                choices: [
                    { text: "Bu paralar geçmez teyze! Neyse in şurada.", next: 17 }, // İndirir
                    { text: "Fotoğrafı ver bakayım.", next: 18 }
                ]
            },

            // 9 (Kaba - Sus)
            {
                text: 'Teyze sessizce ağlıyor. Arka koltukta küçücük kaldı.\n\n"Ali\'m... Şoför amca kızıyor bana... Gel kurtar beni..." diye fısıldıyor.',
                choices: [
                    { text: "Vicdan azabı çekip yumuşa.", next: 2 },
                    { text: "Ağlama teyze, başım şişti.", next: 17 }
                ]
            },

            // --- FİNAL YOLCULUKLARI ---

            // 10 (Karakol)
            {
                text: 'Karakola çektin. Polisler teyzeyi tanıdı.\n\n"Ayşe Teyze! Yine mi kaçtın bakım evinden?"\n\nTeyze sana bakıyor: "Ali? Sen Ali değil misin? Beni polise mi veriyorsun?"',
                choices: [
                    { text: "Ben Ali değilim teyze. Burası güvenli.", next: 19 }, // Final: Normal
                    { text: "Affet teyze, senin iyiliğin için.", next: 20 }
                ]
            },

            // 11 (Evini Hatırlatma)
            {
                text: '"Evim... Yeşil panjurlu ev... Üsküdar\'ın tepesinde... Ama... Yıktılar orayı. Apartman yaptılar. Beni de o beyaz binaya tıktılar..."\n\nBakımevini kastediyor.',
                choices: [
                    { text: "Seni oraya götüreyim mi teyze?", next: 21 },
                    { text: "Haydarpaşa'ya gidelim biz yine de.", next: 5 }
                ]
            },

            // 12 (Dönüş)
            {
                text: '"Dönelim... Nereye döneceğiz? Kimim kimsem kalmadı ki..."\n\nTeyze camdan denize bakıyor. Gözlerinde derin bir boşluk var.',
                choices: [
                    { text: "Bakımevine gidelim teyze.", next: 21 },
                    { text: "Gel sana bir çay ısmarlayayım, ısın.", next: 22 }
                ]
            },

            // 13 (Bekleme)
            {
                text: 'Arabayı stop ettin. 10 dakika beklediniz. Kimse gelmedi.\n\n"Gelmedi..." dedi teyze. "Yine gelmedi... Şehit düştü dediler de inanmadım ben. Gelir dedim..."',
                choices: [
                    { text: "Başın sağ olsun teyze...", next: 23 },
                    { text: "Hadi teyze, üşüme gidelim.", next: 21 }
                ]
            },

            // 14 (Ahmet)
            {
                text: '"Ahmet... Benim babamın adı da Ahmet\'ti... Güzel isim..."\n\nElini uzatıp omzuna dokunuyor.\n\n"Sen iyi bir çocuksun Ahmet. Ali\'m gibi merhametlisin."',
                choices: [
                    { text: "Sağ ol teyze. Nereye bırakayım seni?", next: 24 },
                    { text: "Teyze açsan bir şeyler yiyelim mi?", next: 22 }
                ]
            },

            // 15 (Gerçekle Yüzleşme - Yumuşak)
            {
                text: '"Evde kimse yok ki... Beyim öldü, Ali gitti... Ev buz gibi..."\n\nGerçeği az çok biliyor ama kabul etmek istemiyor gibi.\n\n"Beni o hemşirelerin olduğu yere götür bari..."',
                choices: [
                    { text: "Tamam teyzecim, huzurevine gidiyoruz.", next: 21 },
                    { text: "Seni yalnız bırakmam teyze.", next: 22 }
                ]
            },

            // 16 (Dinleme)
            {
                text: 'Yol boyunca anlattı. Ali\'nin çocukluğunu, mektebini, ilk aşkını... Sen dinledikçe teyze rahatladı, omuzları indi.\n\n"Oh be evladım... Yıllardır kimse dinlemedi beni böyle. Herkes \'sus teyze, unuttun\' dedi."',
                choices: [
                    { text: "Anlatmak iyi gelir teyze.", next: 25 }, // Çok iyi son
                    { text: "Geldik teyze.", next: 26 }
                ]
            },

            // 17 (KÖTÜ SON - İndirme)
            {
                text: 'Teyzeyi yarı yolda indirdin. Arkandan bakakaldı. Bohçası elinden düştü.\n\nDikiz aynasından son gördüğün şey, kaldırımda oturup ağlayan yaşlı bir kadındı.',
                ending: {
                    money: 200, // Gasp edilen para
                    reputation: -150,
                    type: 'police', // Polis ceza keser belki
                    text: "Teyzeyi yolda bıraktın. Parası da sende kaldı. O gece rüyanda anneni gördün, sana sırtını dönmüştü. İnsanlık öldü mü?"
                }
            },

            // 18 (Fotoğraf)
            {
                text: 'Fotoğrafta genç bir asker var. Arkasında "1980 - Kars" yazıyor.\n\n"Bak ne yakışıklı değil mi?" diyor teyze gururla.',
                choices: [
                    { text: "Çok yakışıklıymış teyze. Allah rahmet eylesin.", next: 23 },
                    { text: "Teyze bu fotoğrafı bana hediye eder misin?", next: 25 }
                ]
            },

            // --- SONLAR ---

            // 19 (Normal - Karakol)
            {
                text: 'Polisler teyzeye su verdi. Teyze sana el salladı.\n\n"Güle güle Ali... Yine gel emi?"',
                ending: {
                    money: 0,
                    reputation: 50,
                    type: 'normal',
                    text: "Para almadın. Karakola teslim edip güvene aldın. Ama sana 'Ali' demesi içini burktu."
                }
            },

            // 20 (Normal - Karakol 2)
            {
                text: 'Polis: "Sağ olun beyefendi, bu teyze Alzheimer. Oğlu yıllar önce şehit oldu ama o hala bekliyor."\n\nTeyze arkadan seslendi: "Mektup geldi komutanım! Mektup!"',
                ending: {
                    money: 0,
                    reputation: 80,
                    type: 'normal',
                    text: "Teyzenin hikayesi yüreğini dağladı. Para almadın, alamazdın."
                }
            },

            // 21 (Huzurevi)
            {
                text: 'Huzurevine vardınız. Hemşireler koşarak geldi.\n\n"Ayşe Teyze! Çok korktuk!"\n\nTeyze sana döndü: "Bu şoför çok iyi çocuk. Ali\'me selam söyledi."',
                ending: {
                    money: 100, // Hemşire verir belki
                    reputation: 150,
                    type: 'normal',
                    text: "Hemşire sana zorla 100 lira verdi. 'Onu mutlu ettiniz, günlerdir suskundu' dedi."
                }
            },

            // 22 (Çay/Yemek - İnsanlık)
            {
                text: 'Bir çay bahçesinde oturdunuz. Teyze çayını içerken boğaza daldı.\n\n"Ali de severdi denizi... Sağ ol evladım. Bugün kendimi yalnız hissetmedim."',
                ending: {
                    money: -50, // Sen ödedin
                    reputation: 300, // Büyük itibar
                    type: 'normal',
                    text: "Çay parasını sen ödedin. Teyzeyi huzurevine bıraktın. Cebinden para çıktı ama kalbin doldu. Gerçek İstanbul beyefendisi sensin."
                }
            },

            // 23 (Kabullenme)
            {
                text: '"Biliyorum..." dedi fısıltıyla. "Biliyorum gelmeyecek. Ama beklemek... Beklemek beni hayatta tutuyor evladım. Beklemezsem ölürüm."',
                ending: {
                    money: 50,
                    reputation: 100,
                    type: 'normal',
                    text: "50 lira aldın. Teyze gerçeği biliyormuş ama hayata tutunmak için yalan söylüyormuş. Bir ders aldın."
                }
            },

            // 24 (Teşekkür)
            {
                text: '"Beni evime bırak. Hemşireler kızacak ama olsun. Seni tanıdım ya..."\n\nBohçasından bir el örmesi çorap çıkardı.\n\n"Bunu Ali\'ye örmüştüm. Sen giy. Ayakların üşümesin direksiyonda."',
                ending: {
                    money: 0,
                    reputation: 250,
                    type: 'normal',
                    text: "Para almadın. Elinde yün bir çorapla kaldın. O çorap seni kışın en soğuk günlerinde bile ısıttı."
                }
            },

            // 25 (Terapi)
            {
                text: 'Teyzenin yüzünde huzurlu bir gülümseme belirdi.\n\n"Oh be... Konuştum, anlattım, hafifledim. Sanki Ali\'yle konuşmuş gibi oldum."\n\nSana sarıldı.',
                ending: {
                    money: 200, // Hemşire veya teyze verir
                    reputation: 200,
                    type: 'normal',
                    text: "Sadece şoförlük yapmadın, bir yarayı sardın bu gece. Teyze huzurla uyuyacak."
                }
            },

            // 26 (Normal Bitiş)
            {
                text: '"Geldik mi? Ne çabuk... Sağ ol şoför bey."',
                ending: {
                    money: 80,
                    reputation: 30,
                    type: 'normal',
                    text: "80 lira taksimetre ücretini aldın. Standart bir yolculuktu ama teyzenin hikayesi aklında kaldı."
                }
            }
        ]
    },

    // ===== KARAKTER 2: ÜNİVERSİTELİ KIZ (GENİŞLETİLMİŞ HİKAYE) =====
    {
        id: 2,
        name: "Üniversiteli Kız",
        avatar: "👩‍🎓",
        image: require('./assets/characters/universiteli_kiz.png'),
        location: "Kadıköy",
        time: "08:30",
        intro: "Kucağında kalın ders kitapları, saçları darmadağın. Gözlerinin altı mosmor, belli ki hiç uyumamış. Nefes nefese taksiye binip kapıyı çarpıyor.",
        dialogue: [
            // 0. GİRİŞ
            {
                text: '"Abi n\'olur sür! Sür abi! 25 dakika kaldı! Avcılar kampüsü! Finalim var abi, bu dersi geçemezsem bursum yanar! Biterim ben!"\n\nTitriyor.',
                choices: [
                    { text: "Kızım sakin ol. Avcılar buradan 1 saat sürer.", next: 1 },
                    { text: "Tamam kızım, kemerini tak, uçuyoruz!", next: 2 }, // Hız (Riskli)
                    { text: "Bu trafikte yetişmen imkansız. Metrobüse bin.", next: 3 } // Gerçekçi (Kaba gibi ama mantıklı)
                ]
            },

            // --- YOL 1: SAKİNLEŞTİRME ---
            // 1
            {
                text: '"1 saat mi? Olamaz... Olamaz abi... Bittim ben... Anneme ne diyeceğim? Babamın kemikleri sızlayacak..."\n\nAğlama krizine girmek üzere.',
                choices: [
                    { text: "Ağlama hemen. Emniyet şeridinden falan deneriz bir şeyler.", next: 2 },
                    { text: "Hangi bölüm bu kadar zor?", next: 4 }
                ]
            },

            // --- YOL 2: HIZ (AKSİYON) ---
            // 2
            {
                text: 'Gaza kökledin! Araçların arasından makas ata ata gidiyorsun. Kız bir yandan korkuyor bir yandan dua ediyor.\n\n"Abi dikkat et! Ama bas abi, n\'olur bas!"',
                choices: [
                    { text: "Merak etme, bende. (Daha da hızlan)", next: 5 },
                    { text: "Tamam bu kadar hız yeter, kaza yapacağız.", next: 6 }
                ]
            },

            // --- YOL 3: METROBÜS ---
            // 3
            {
                text: '"Metrobüs mü? Abi elimde bu kadar kitapla... Hem çok kalabalık... Yapma abi götür beni..."\n\nSana yalvaran gözlerle bakıyor.',
                choices: [
                    { text: "Tamam bin, deneyeceğiz şansımızı.", next: 2 },
                    { text: "İn kızım, metrobüs en hızlısı. Trafik kilit.", next: 7 }
                ]
            },

            // --- GELİŞME BÖLÜMÜ ---

            // 4 (Sohbet)
            {
                text: '"Elektrik Elektronik Mühendisliği... Diferansiyel Denklemler... Üçüncü alışım abi... Hoca taktı bana... "\n\nKitabını açıp formüllere bakmaya çalışıyor ama midesi bulanıyor.',
                choices: [
                    { text: "Bırak kitabı, miden bulanır. Derin nefes al.", next: 8 },
                    { text: "Zor bölümmüş. Benim yeğen de okuyor.", next: 9 }
                ]
            },

            // 5 (Polis Riski)
            {
                text: 'Hız sınırını aştın! Arkadan siren sesleri geliyor! Polis!\n\n"Abi polis! N\'apacağız? Durursak bittim ben!"',
                choices: [
                    { text: "Durmak zorundayız kızım.", next: 10 },
                    { text: "Kaçarız! Sıkı tutun!", next: 11 } // Çılgınlık
                ]
            },

            // 6 (Yavaşlama)
            {
                text: 'Hızı düşürdün. Kız saate bakıp ağlamaya başladı.\n\n"Yetişemeyeceğiz... Biliyorum... Hayatım kaydı..."',
                choices: [
                    { text: "Umudunu kaybetme. Belki sınav geç başlar.", next: 12 },
                    { text: "Sınav her şey demek değil kızım. Sağlık olsun.", next: 13 }
                ]
            },

            // 7 (Metrobüs Son)
            {
                text: 'Kızı Söğütlüçeşme\'de indirdin.\n\n"Haklısın abi... Sağ ol..."\n\nKoşarak metrobüse gitti.',
                ending: {
                    money: 50,
                    reputation: 20,
                    type: 'normal',
                    text: "En mantıklısını yaptın. O trafikte taksiyle yetişemezdi. Metrobüs hayat kurtarır."
                }
            },

            // 8 (Nefes Egzersizi)
            {
                text: 'Kız derin nefes aldı.\n\n"Sağ ol abi... Elim ayağım titriyor... Dün gece hiç uyumadım. 5 kahve içtim..."',
                choices: [
                    { text: "Gençken biz de çok sabahladık. Değerini bil bu günlerin.", next: 14 },
                    { text: "Aç mısın peki? Bir simit alayım mı?", next: 15 }
                ]
            },

            // --- FİNAL YOLCULUKLARI ---

            // 9 (Yeğen Sohbeti)
            {
                text: '"Öyle mi? Abi dua et n\'olur... Babam yok benim, bursum kesilirse okuyamam... Köye dönmek zorunda kalırım..."',
                choices: [
                    { text: "Allah yardımcın olsun. Ben dualarımı yolladım.", next: 12 },
                    { text: "Merak etme, o sınava gireceksin!", next: 2 }
                ]
            },

            // 10 (Polis Kontrolü)
            {
                text: 'Sağa çektin. Polis geldi.\n\nPolis: "Beyefendi bu ne hız? Radara girdiniz."\n\nKız camı açtı: "Memur bey n\'olur! Sınavım var! Bursum yanacak!"',
                choices: [
                    { text: "Memur bey kızcağızın durumu acil.", next: 16 }, // İkna
                    { text: "Tamam memur bey yaz cezayı, gidelim.", next: 17 } // Kabullenme
                ]
            },

            // 11 (Kaçış - Kaza)
            {
                text: 'Gaza bastın ama önündeki araç aniden durdu! GÜM!\n\nUfak bir kaza. Ama araba hareket edemez durumda.\n\nKız şokta: "Sınav..."',
                ending: {
                    money: 0,
                    reputation: -100,
                    type: 'hospital',
                    text: "Sınava yetişeyim derken kaza yaptın. Kız sınava giremedi. Sen de sanayiye..."
                }
            },

            // 12 (Yetişme Anı)
            {
                text: 'Kampüs kapısına vardınız! Son 2 dakika!\n\n"Abi! Abi geldik! İnanmıyorum!"\n\nKızın gözleri parlıyor.',
                choices: [
                    { text: "Koş kızım koş! Arkana bakma!", next: 18 },
                    { text: "Ücreti alayım abla.", next: 19 } // Şimdi sırası mı?
                ]
            },

            // 13 (Teseelli)
            {
                text: '"Sağlık olsun mu? Abi sen ne diyorsun? Benim bütün geleceğim bu kağıt parçasına bağlı!"\n\nSana kızgın bakıyor.',
                choices: [
                    { text: "Büyüyünce anlarsın.", next: 20 },
                    { text: "Tamam sustum.", next: 6 }
                ]
            },

            // 14 (Nasihat)
            {
                text: '"Değerini mi bileyim? Abi stresten saçlarım dökülüyor... Siz taksicisiniz, kafanız rahat tabii..."',
                choices: [
                    { text: "Bizim de derdimiz ekmek parası kızım. Herkesin derdi kendine.", next: 21 }, // Bilgelik
                    { text: "Bana laf sokma, indiririm aşağı.", next: 22 } // Alınganlık
                ]
            },

            // 15 (Simit)
            {
                text: '"Midem almaz ki... Ama... Çok naziksiniz abi. Babam gibi..."\n\nGözünden bir damla yaş süzüldü.',
                choices: [
                    { text: "Baba yarısı sayılırız. Hadi gayret.", next: 12 },
                    { text: "Sulu gözlülük yapma, konsantre ol.", next: 22 }
                ]
            },

            // 16 (Polis İkna)
            {
                text: 'Polis kızın ağladığını gördü.\n\n"Tamam, bu seferlik ceza yazmıyorum. Ama yavaş git kardeşim. Hadi kızım, başarılar."\n\nKız: "Allah razı olsun memur bey!"',
                choices: [
                    { text: "Gördün mü? Devlet baba da yanında.", next: 12 },
                    { text: "Çok şanslısın kızım.", next: 12 }
                ]
            },

            // 17 (Ceza)
            {
                text: 'Polis cezayı kesti. 5 dakika kaybettiniz.\n\nKız saate bakıyor... Umutsuz.',
                ending: {
                    money: 0,
                    reputation: -20,
                    type: 'normal',
                    text: "Sınava geç kaldı. Kapıdan almadılar. O ağlarken sen de yediğin cezayla kaldın."
                }
            },

            // --- SONLAR ---

            // 18 (Mutlu Son - Para Yok)
            {
                text: 'Kız kapıdan içeri fırladı. Para vermeyi unuttu. Ama arkasından el salladı.',
                ending: {
                    money: 0,
                    reputation: 150,
                    type: 'normal',
                    text: "Para kazanamadın ama bir geleceği kurtardın. Kız sınavdan sonra mesaj attı: 'GEÇTİM ABİ!'"
                }
            },

            // 19 (Mutlu Son - Para Var)
            {
                text: 'Kız aceleyle 200 lira fırlattı koltuğa.\n\n"Üstü kalsın abi çok sağ ol!"',
                ending: {
                    money: 200,
                    reputation: 80,
                    type: 'normal',
                    text: "Hem paranı aldın hem kızı yetiştirdin. Günün kahramanı sensin."
                }
            },

            // 20 (Geç Kalma - Teselli)
            {
                text: 'Sınava 5 dakika geç kaldınız. Kapıdaki görevli almıyor.\n\n"Yalvarırım beyefendi!" diyor kız.\n\nSen arabadan izliyorsun.',
                ending: {
                    money: 100,
                    reputation: 10,
                    type: 'normal',
                    text: "Almadılar. Kız kaldırıma çöküp ağladı. Hayat bazen acımasız."
                }
            },

            // 21 (Bilge Taksici)
            {
                text: 'Kız sustu. Bir süre yolu izledi.\n\n"Özür dilerim abi. Haklısın. Herkesin savaşı farklı."',
                choices: [
                    { text: "Sorun değil. Hadi bak yollar açıldı.", next: 12 }
                ]
            },

            // 22 (Kötü Ayrılık)
            {
                text: '"Ne biçim adamsın sen ya! Moral vereceğine..."\n\nKız yolculuk boyunca somurttu.',
                ending: {
                    money: 100,
                    reputation: -50,
                    type: 'normal',
                    text: "Kızı yetiştirdin ama kalbini kırdın. Sınavdan düşük almış. Senden bildi."
                }
            }
        ]
    },

    // ===== KARAKTER 3: GİZEMLİ ADAM (GENİŞLETİLMİŞ HİKAYE) =====
    {
        id: 3,
        name: "Gizemli Adam",
        avatar: "🕴️",
        image: require('./assets/characters/gizemli_adam.png'),
        location: "Taksim",
        time: "23:45",
        intro: "Gece yarısı olmasına rağmen güneş gözlüğü takıyor. Siyah, pahalı bir takım elbisesi var. Elinde metal bir çanta. Taksiye bindiği an araçtaki hava soğuyor.",
        dialogue: [
            // 0. GİRİŞ
            {
                text: 'Sessizce arka koltuğa oturdu. Aynadan gözlerini göremiyorsun. Size bir kağıt uzatıyor.\n\n"Sarıyer, Eski Konsolosluk Binası. Tek kelime etme, sadece sür."',
                choices: [
                    { text: "Tamam abi, emrin olur.", next: 1 },
                    { text: "Hayırdır abi, başımız belaya girmesin?", next: 2 },
                    { text: "Ben o tarafa gitmiyorum, in aşağı.", next: 3 }
                ]
            },

            // --- YOL 1: İTAAT ---
            // 1
            {
                text: 'Başını hafifçe salladı.\n\n"İyi. Profesyonelleri severim. Dikiz aynasına bakma. Soru sorma. Müziği kapat."',
                choices: [
                    { text: "Müziği kapat ve sessizce sür.", next: 4 },
                    { text: "Tamam da abi gerginlik yapma.", next: 5 }
                ]
            },

            // --- YOL 2: SORGULAMA ---
            // 2
            {
                text: 'Ceketinin içini hafifçe araladı. Bir silah kabzası parladı.\n\n"Senin tek derdin direksiyon olsun şoför. Fazlasını bilen, fazlasını yaşamaz."',
                choices: [
                    { text: "Anlaşıldı abi. Sustum.", next: 4 },
                    { text: "Silah mı? İndiriyorum seni!", next: 6 }
                ]
            },

            // --- YOL 3: REDDETME ---
            // 3
            {
                text: 'Çantasından kalın bir deste Euro çıkardı. Ön koltuğa fırlattı.\n\n"Bu sadece beni götürmen için. Susman için daha fazlası var. Şimdi sür."',
                choices: [
                    { text: "Para her kapıyı açar diyorsun... Gidelim.", next: 4 },
                    { text: "Para istemez, in diyorum!", next: 6 }
                ]
            },

            // --- GELİŞME: TAKİP ---

            // 4 (Takip Başlıyor)
            {
                text: 'Yola çıktınız. Boğaz köprüsüne yaklaşırken adam arkaya baktı.\n\n"Lanet olsun. Siyah SUV. Plakası 34 K... Gördün mü?"',
                choices: [
                    { text: "Evet abi, bizi mi takip ediyor?", next: 7 },
                    { text: "Görmedim abi, paranoya yapma.", next: 8 }
                ]
            },

            // 5 (Gerginlik)
            {
                text: '"Gerginlik mi?" Güldü ama gülüşü buz gibiydi. "Şu an İstanbul\'un en tehlikeli koltuğunda oturuyorsun."',
                choices: [
                    { text: "Sağa çekiyorum, ben yokum.", next: 6 },
                    { text: "Macera severim abi, devam et.", next: 4 }
                ]
            },

            // 6 (İndirme/Kaçış)
            {
                text: 'Arabayı ani frenle durdurdun.\n\n"İn aşağı! Belanı başkasında bul!"',
                ending: {
                    money: 0,
                    reputation: 50, // Dürüstlük puanı
                    type: 'normal',
                    text: "Adamı indirdin. O küfür ederek indi ve karanlığa karıştı. Az sonra oradan silah sesleri geldi. Ucuz atlattın."
                }
            },

            // 7 (Aksiyon)
            {
                text: '"Hızlan şoför! O araçtaki adamlar beni canlı istemiyor. Seni de şahit bırakmazlar."',
                choices: [
                    { text: "Sıkı tutun! Şov başlıyor!", next: 9 }, // Aksiyon modu
                    { text: "Polisi arayacağım!", next: 10 }
                ]
            },

            // 8 (İnkar)
            {
                text: '"Aptal olma! Kaza süsü verip ikimizi de Boğaz\'ın dibine yollarlar. Bas gaza!"\n\nAdam silahını çıkarıp dizine koydu.',
                choices: [
                    { text: "Gaza bas!", next: 9 },
                    { text: "Şok oldun, elin ayağın titredi.", next: 11 }
                ]
            },

            // --- AKSİYON SAHNELERİ ---

            // 9 (Kovalamaca)
            {
                text: 'Makas atarak ilerliyorsun! SUV peşinizde! Adam camı hafifçe açtı.\n\n"Ara sokağa gir! Ortaköy\'den aşağı vur!"',
                choices: [
                    { text: "Tamam, ara sokaklara dalıyorum.", next: 12 },
                    { text: "Hayır, ana yoldan şaşmam, polis vardır.", next: 10 }
                ]
            },

            // 10 (Polis)
            {
                text: 'Polisi aradın veya polisin olduğu yere sürdün. Adam paniğe kapıldı.\n\n"Hain! Polisin yarısı onlardan!"',
                ending: {
                    money: 0,
                    reputation: 100,
                    type: 'police',
                    text: "Polis karakolunun önüne çektin. Adam kaçtı. Polisler seni sorguya çekti. Adam bir uluslararası ajanmış."
                }
            },

            // 11 (Kaza Riski)
            {
                text: 'Titremekten direksiyonu tutamadın. Araba yalpaladı. SUV yanınıza geldi!\n\nAdam camdan ateş etti! BAM BAM!',
                choices: [
                    { text: "Başını eğ ve frene asıl!", next: 13 },
                    { text: "Panikle direksiyonu kır!", next: 14 } // Kaza
                ]
            },

            // 12 (Ara Sokaklar)
            {
                text: 'Dar sokaklarda izini kaybettirdin. Bir çöp konteynerinin arkasına park edip ışıkları kapattın.\n\nSUV yan caddeden geçti gitti.',
                choices: [
                    { text: "Derin bir oh çek.", next: 15 },
                    { text: "Abi ne oluyor Allah aşkına?", next: 16 }
                ]
            },

            // 13 (Çatışma Sonrası)
            {
                text: 'Frene asılınca SUV önünüze geçti. Adam lastiklerine ateş etti! SUV yoldan çıktı!\n\n"Güzel hareket şoför... Soğukkanlısın."',
                choices: [
                    { text: "Biz bittik abi... Kalbim duracak.", next: 15 },
                    { text: "Sen kimsin abi?", next: 16 }
                ]
            },

            // 14 (Kötü Son Kaza)
            {
                text: 'Direksiyonu kırdın... Bariyerlere çarptınız.\n\nEn son hatırladığın şey adamın "Çantayı al!" diye bağırmasıydı.',
                ending: {
                    money: 0,
                    reputation: -100,
                    type: 'hospital',
                    text: "Hastanede gözünü açtın. Adam yok, çanta yok. Polis ifadeni bekliyor. Araban pert oldu."
                }
            },

            // --- FİNAL BÖLÜMÜ ---

            // 15 (Sakinleşme ve Varış)
            {
                text: 'Tekrar yola çıktınız. Sarıyer\'deki o eve yaklaştınız.\n\n"Hayatımı kurtardın şoför. Bu çantada devlet içindeki bir çeteyi bitirecek belgeler var."',
                choices: [
                    { text: "Vatan sağ olsun abi.", next: 17 }, // Milliyetçi/Devletçi
                    { text: "Bana bulaştırma, indir ve git.", next: 18 }
                ]
            },

            // 16 (Merak)
            {
                text: '"Eski istihbaratçıyım. Emekli ettiler ama ben peşlerini bırakmadım. Bu gece Türkiye\'de yer yerinden oynayacak."',
                choices: [
                    { text: "Helal olsun abi.", next: 17 },
                    { text: "Bu çok tehlikeli...", next: 18 }
                ]
            },

            // 17 (İyi Son - Ortaklık)
            {
                text: 'Eve vardınız. Adam çantadan bir zarf çıkardı.\n\n"Bunu al. İçinde hakkın olan para var. Ve bir numara... Başın sıkışırsa ara."',
                ending: {
                    money: 5000,
                    reputation: 200,
                    type: 'normal',
                    text: "5000 Euro bahşiş! Adamın verdiği numara 'Devlet' diye kayıtlı. Belki bir gün lazım olur."
                }
            },

            // 18 (Normal Son - Korku)
            {
                text: 'Eve vardınız. Adam indi.\n\n"Bu geceyi unut. Hiç yaşanmadı. Beni hiç görmedin."',
                ending: {
                    money: 2000,
                    reputation: -50, // Korktuğun için
                    type: 'normal',
                    text: "2000 Euro bıraktı. 'Unut' dedi. Parayı harcadın ama o geceyi ömrünce unutamadın."
                }
            },

            // --- EKSTRA SONLAR ---

            // 19 (İhanet)
            {
                text: 'Adam inerken polisi aradığını fark etti. Sana buz gibi baktı.\n\n"Yazık ettin kendine..."',
                ending: {
                    money: 0,
                    reputation: -200,
                    type: 'hospital',
                    text: "Ertesi gün evinin önünde kimliği belirsiz kişilerce dövüldün. 'Selam söylediler' dediler."
                }
            }
        ]
    },

    // ===== KARAKTER 4: SARHOŞ DAMAT (GENİŞLETİLMİŞ HİKAYE) =====
    {
        id: 4,
        name: "Sarhoş Damat",
        avatar: "🤵",
        image: require('./assets/characters/sarhos_damat.png'),
        location: "Beşiktaş",
        time: "03:00",
        intro: "Papyonu çözülmüş, ceketini omzuna atmış. Elinde yarı dolu bir şampanya şişesi. Yürümekte zorlanıyor. 'Kaçtım ulan! Kaçtııım!' diye bağırarak kendini arka koltuğa atıyor.",
        dialogue: [
            // 0. GİRİŞ
            {
                text: '"Özgürüm be! Özgürüm! Bas gaza şoför! Nereye olursa! Sadece uzaklaş buradan! O düğün salonundan uzaklaş!"\n\nŞişeden büyük bir yudum alıyor.',
                choices: [
                    { text: "Sakin ol damat bey. Nereye gidiyoruz?", next: 1 },
                    { text: "Düğünden mi kaçtın? Neden?", next: 2 },
                    { text: "Sarhoş adam çekemem, in aşağı.", next: 3 }
                ]
            },

            // --- YOL 1: SAKİNLEŞTİRME ---
            // 1
            {
                text: '"Bilmiyorum! Cehenneme sür! O kadının dırdırından kaçayım da nereye olursa olsun! Babası fabrikatör diye beni satın aldığını sanıyor!"\n\nAğlamaya başlıyor.',
                choices: [
                    { text: "Gel bir sahile inelim, temiz hava al.", next: 4 },
                    { text: "Bu işler böyle olmaz. Dönelim konuş.", next: 5 }
                ]
            },

            // --- YOL 2: NEDEN ---
            // 2
            {
                text: '"Neden mi? Sevmiyorum abi! Sevmiyorum! Ailem zorladı. \'Büyük fırsat\' dediler. \'Hayatın kurtulur\' dediler. Ama kalbim başkasında..."',
                choices: [
                    { text: "Kimde kalbin?", next: 6 },
                    { text: "Zengin kızmış, hayatını yaşa işte.", next: 7 }
                ]
            },

            // --- YOL 3: REDDETME (KABA) ---
            // 3
            {
                text: 'Cebinden bir tomar para çıkardı. Yüzüne fırlattı.\n\n"Al! Para mı istiyorsun? Al hepsi senin olsun! Sadece sür!"',
                choices: [
                    { text: "Parayı gördün, fikrin değişti. Sürüyorsun.", next: 8 },
                    { text: "Paranı da al git!", next: 9 }
                ]
            },

            // --- GELİŞME ---

            // 4 (Sahil - İntihar Riski)
            {
                text: 'Sahile çektin. Adam denize bakıyor.\n\n"Şu boğaz ne kadar karanlık... Atlasam biter mi bu acı? Elif beni affeder mi?"',
                choices: [
                    { text: "Sakın! Saçmalama abi!", next: 10 },
                    { text: "Elif kim abi? Anlat bana.", next: 6 }
                ]
            },

            // 5 (Dönüş Baskısı)
            {
                text: '"Dönmem! Asla! Oraya dönersem ölürüm daha iyi! Beni anlamıyorsun şoför!"\n\nKapıyı açmaya çalışıyor hareket halindeyken!',
                choices: [
                    { text: "Tamam dönmüyoruz! Kapıyı kapat!", next: 4 },
                    { text: "Kilitleri kilitle.", next: 11 }
                ]
            },

            // 6 (Elif Hikayesi)
            {
                text: '"Elif... Üniversiteden... 5 yıldır görmedim. Ama rüyalarımda hep o var. Fakirdi, babam istemedi... Ben korkaklık ettim abi..."',
                choices: [
                    { text: "Belki hala seni seviyordur. Git bul onu.", next: 12 },
                    { text: "5 yıl geçmiş. Unut artık.", next: 13 }
                ]
            },

            // 7 (Para Odaklı)
            {
                text: '"Para mı? Para mutluluk getirmiyor abi... Bak şu halime. Damatlık içindeyim ama kefen giymiş gibiyim..."',
                choices: [
                    { text: "Alışırsın zamanla.", next: 13 },
                    { text: "Haklısın abi. Mutluluk başka.", next: 2 }
                ]
            },

            // 8 (Para için Sürüş)
            {
                text: 'Paraları topladın. Nereye gittiğin belli değil. Şehirde turluyorsunuz. Adam sızdı.\n\nCebinden telefonu çalıyor. "KAYINPEDER" arıyor.',
                choices: [
                    { text: "Aç telefonu, durumu anlat.", next: 14 },
                    { text: "Açma, adamı uygun bir yere bırak.", next: 15 }
                ]
            },

            // 9 (Kötü Son - Terk)
            {
                text: 'Adamı zorla indirdin. Kaldırıma düştü.\n\n"Kimse... Kimse sevmiyor beni..."',
                ending: {
                    money: 0,
                    reputation: -100,
                    type: 'hospital',
                    text: "Adamı bıraktığın yerden 1 saat sonra ambulans aldı. Alkol komasına girmiş. Vicdanın rahat mı?"
                }
            },

            // 10 (İkna)
            {
                text: 'Kolundan tuttun.\n\n"Abi yapma, hayat her şeye rağmen yaşamaya değer. Bak Elif diyorsun... Git konuş onunla."',
                choices: [
                    { text: "Evet, Elif'in evine gidelim.", next: 16 },
                    { text: "Önce bir ayıl, sabah gidersin.", next: 17 }
                ]
            },

            // 11 (Kilit)
            {
                text: 'Kapıları kilitledin. Adam cama vuruyor.\n\n"Bırak beni! Hapis mi edeceksin beni!"',
                choices: [
                    { text: "Sakinleşene kadar buradasın.", next: 18 },
                    { text: "Seni evine götürüyorum.", next: 19 }
                ]
            },

            // --- FİNALLER ---

            // 12 (Elif'e Gidiş)
            {
                text: 'Elif\'in eski mahallesine gittiniz. Işıklar sönük.\n\n"Burasıydı... Camı şurası..."\n\nBağırdı: "ELİF! BEN GELDİM! AFFET BENİ!"',
                choices: [
                    { text: "Abi gece yarısı, bağırma.", next: 20 },
                    { text: "Bekle bakalım çıkacak mı?", next: 21 }
                ]
            },

            // 13 (Umutsuzluk)
            {
                text: 'Adam sustu.\n\n"Haklısın... Geçti artık. Bitti. Götür beni o lanet düğüne..."',
                ending: {
                    money: 500,
                    reputation: 10,
                    type: 'normal',
                    text: "Düğüne geri götürdün. Gelin kapıda bekliyordu, yüzü asık. Adam boynunu büktü ve içeri girdi. Bir hayat söndü."
                }
            },

            // 14 (Kayınpeder)
            {
                text: 'Telefonu açtın. Adam kükrüyor: "Nerede o şerefsiz! Getir onu buraya, sana 10.000 lira!"',
                choices: [
                    { text: "Tamam efendim, getiriyorum.", next: 22 }, // Satış
                    { text: "Kusura bakmayın, ben kimseyi zorla getirmem.", next: 23 } // Dürüstlük
                ]
            },

            // 15 (Otel)
            {
                text: 'Adamı bir otele bıraktın. Parasıyla oda tuttun.\n\n"Sağ ol şoför... Beni sattın ama en azından sokakta bırakmadın."',
                ending: {
                    money: 2000,
                    reputation: 0,
                    type: 'normal',
                    text: "Yerden topladığın paraları aldın (2000 TL). Adam otelde sızdı. Sabah ne yapar bilinmez."
                }
            },

            // 16 (Elif Final)
            {
                text: 'O sırada cam açıldı. Bir kadın.\n\n"Murat? Sen misin?"\n\nAdam: "Benim Elif! Geldim! Her şeyi bıraktım geldim!"',
                ending: {
                    money: 1000,
                    reputation: 200,
                    type: 'normal',
                    text: "Kadın aşağı indi, sarıldılar. Yeşilçam filmi gibiydi. Adam sana cebindeki her şeyi verdi. Aşk kazandı."
                }
            },

            // 17 (Otel - İyi)
            {
                text: '"Tamam... Haklısın. Sarhoş kafayla gitmeyeyim."\n\nOtele bıraktın.',
                ending: {
                    money: 500,
                    reputation: 100,
                    type: 'normal',
                    text: "Adamı otele yerleştirdin. Sakinleşti. Sabah seni arayıp teşekkür etti. 'Hayatımı kurtardın' dedi."
                }
            },

            // 18 (Sakinleşme-Düğün)
            {
                text: 'Adam yoruldu. Sızdı.\n\nUyandığında düğün salonunun önündeydiniz.',
                ending: {
                    money: 300,
                    reputation: 20,
                    type: 'normal',
                    text: "Mecburen düğüne döndü. Ama sana kızgın değildi. 'Kaderim buymuş' dedi."
                }
            },

            // 19 (Eve Dönüş)
            {
                text: 'Evine -yani düğün salonuna- döndünüz. Arbede çıktı. Gelin sana bağırdı.\n\n"Neden geç kaldınız!"',
                ending: {
                    money: 400,
                    reputation: -20,
                    type: 'normal',
                    text: "Fırça yedin ama paranı aldın. Damat sürüklenerek içeri götürüldü."
                }
            },

            // 20 (Polis Müdahalesi)
            {
                text: 'Mahalleli polise haber vermiş.\n\n"Sarhoş var, bağırıyor!" diye. Polis geldi.',
                ending: {
                    money: 0,
                    reputation: 50,
                    type: 'police',
                    text: "Polisler adamı aldı. 'Biz hallederiz' dediler. Elif hiç cama çıkmadı..."
                }
            },

            // 21 (Elif Evli)
            {
                text: 'Kapı açıldı ama... Elif değil, bir adam çıktı.\n\n"Kimsin kardeşim? Ne bağırıyorsun karımın adını?"',
                ending: {
                    money: 0,
                    reputation: -50,
                    type: 'hospital',
                    text: "Kocası adamı dövdü. Sen araya girdin, sen de dayak yedin. Elif evlenmiş. Geçmiş olsun."
                }
            },

            // 22 (Kayınpeder Teslim)
            {
                text: 'Düğüne götürdün. Kayınpeder adamlarıla bekliyor.\n\n"Aferin şoför. Al paranı."\n\nDamat sana nefretle baktı.',
                ending: {
                    money: 10000, // Büyük para
                    reputation: -500, // Büyük itibar kaybı
                    type: 'normal',
                    text: "10.000 TL aldın! Ama bir adamı sattın. Damat o bakışıyla seni ömür boyu lanetledi. Değdi mi?"
                }
            },

            // 23 (Dürüstlük)
            {
                text: '"Ne demek getirmem! Sen kimsin lan!"\n\nTelefonu kapattın.',
                choices: [
                    { text: "Hadi abi, uzaklara gidelim.", next: 24 }
                ]
            },

            // 24 (Kaçış Finali)
            {
                text: 'Adam gülümsedi.\n\n"Helal olsun sana... Sür Bodrum\'a abi. Ne kadar yazarsa yazsın."',
                ending: {
                    money: 5000,
                    reputation: 300,
                    type: 'normal',
                    text: "Bodrum'a kadar gitmedin ama otogara bıraktın. 5000 lira verdi. Özgürlüğüne kavuştu."
                }
            }
        ]
    },

    // ===== KARAKTER 5: KAVGACI ÇİFT (GENİŞLETİLMİŞ HİKAYE) =====
    {
        id: 5,
        name: "Kavgacı Çift",
        avatar: "💔",
        image: require('./assets/characters/kavgaci_cift.png'),
        location: "Şişli",
        time: "22:00",
        intro: "Bir kadın ve erkek bindi. Kadın hıçkırarak ağlıyor, adamın yüzü kıpkırmızı. Kadın: 'Bana dokunma!' diye bağırıyor. Araba barut fıçısı gibi.",
        dialogue: [
            // 0. GİRİŞ
            {
                text: 'Kadın: "O mesajları gördüm Mert! Gördüm! \'Canım\' yazmışsın o kadına!"\n\nAdam: "İş arkadaşım o Ayşe! Abartma!"',
                choices: [
                    { text: "Hanımefendi, beyefendi lütfen biraz sessiz.", next: 1 },
                    { text: "Nereye gidiyoruz?", next: 2 }, // Görmezden gel
                    { text: "İkiniz de inin aşağı! Kavga istemem.", next: 3 }
                ]
            },

            // --- YOL 1: ARABULUCULUK ---
            // 1
            {
                text: 'Adam sana döndü: "Sen karışma şoför! İşine bak!"\n\nKadın: "Bırak konuşsun adam! Hakkımı sadece o savunuyor!"',
                choices: [
                    { text: "Beyefendi kadına bağırma.", next: 4 }, // Kadını savun
                    { text: "Hanımefendi adam haklı, iş arkadaşıdır.", next: 5 } // Adamı savun
                ]
            },

            // --- YOL 2: GÖRMEZDEN GELME ---
            // 2
            {
                text: 'Adam: "Çankaya\'ya çek şoför."\n\nKadın: "HAYIR! Ben anneme gidiyorum! Üsküdar\'a! Bu evi de başınıza yıkacağım!"',
                choices: [
                    { text: "Karar verin, iki ayrı yere gidemem.", next: 6 },
                    { text: "Parayı kim ödüyorsa oraya giderim.", next: 7 }
                ]
            },

            // --- YOL 3: KOVMA ---
            // 3
            {
                text: 'Adam 100 dolar fırlattı.\n\n"Al şu parayı ve çeneni kapat. Sür Çankaya\'ya!"\n\nKadın ağlıyor.',
                choices: [
                    { text: "Parayı aldın, sustun.", next: 8 },
                    { text: "Paranız sizin olsun, inin!", next: 9 }
                ]
            },

            // --- GELİŞME ---

            // 4 (Kadını Savunma)
            {
                text: 'Adam köpürdü: "Sana ne lan! Karım değil mi!"\n\nKadın cesaret aldı: "Boşanacağım senden! Duydun mu şoför bey? Şahitsin!"',
                choices: [
                    { text: "Şahidim abla. Yaptığı ayıp.", next: 10 },
                    { text: "Aile arasına girmem ben.", next: 2 }
                ]
            },

            // 5 (Adamı Savunma)
            {
                text: 'Kadın şok oldu: "Erkek dayanışması ha? Yazıklar olsun sizin gibi erkeklere!"\n\nAdam sırıttı: "Bak elin adamı bile anladı."',
                choices: [
                    { text: "Abla sakin ol, yuvayı yıkma.", next: 11 },
                    { text: "Susun artık, başım şişti.", next: 8 }
                ]
            },

            // 6 (Rota Tartışması)
            {
                text: 'Kadın: "Beni Üsküdar\'a bırakmazsan arabadan atlarım!"\n\nKapıyı açmaya yeltendi!',
                choices: [
                    { text: "DUR! Tamam Üsküdar'a gidiyoruz!", next: 12 },
                    { text: "Kapıları kilitledin.", next: 13 }
                ]
            },

            // 7 (Parayı Veren)
            {
                text: 'İkisi de cüzdanına sarıldı. Kadın: "500 veririm!"\nAdam: "1000 veririm Çankaya\'ya sür!"',
                choices: [
                    { text: "1000 lira iyi para. Çankaya.", next: 14 },
                    { text: "Kadın mağdur, parası önemli değil. Üsküdar.", next: 12 }
                ]
            },

            // --- AKSİYON/FİNAL BÖLÜMLERİ ---

            // 8 (Sessiz Sürüş - Kavga Büyüyor)
            {
                text: 'Sen sustun ama onlar susmadı. Adam kadına tokat atmaya çalıştı!',
                choices: [
                    { text: "Frene bas ve adamı indir!", next: 15 },
                    { text: "Polisi ara gizlice.", next: 16 }
                ]
            },

            // 9 (İndirme - Kötü Son)
            {
                text: 'Kenara çektin. İkisini de indirdin.\n\nKaldırımda kavga etmeye devam ettiler. Millet başlarına toplandı.',
                ending: {
                    money: 0,
                    reputation: 0,
                    type: 'normal',
                    text: "Başından attın. Ama arkandan gelen siren seslerini duydun. Belki ayırsan iyiydi."
                }
            },

            // 10 (Boşanma Şahidi)
            {
                text: 'Adam sinirden kızardı: "Sen bittin şoför! Plakanı aldım!"\n\nKadın: "Korkma şoför bey, ben seni korurum."',
                ending: {
                    money: 300,
                    reputation: 150, // Kadın dayanışması
                    type: 'normal',
                    text: "Kadını annesine bıraktın. Adamı yolda attın. Kadın sana 300 lira verdi. 'Mahkemede görüşürüz' dedi."
                }
            },

            // 11 (Barıştırma Çabası)
            {
                text: 'Kadın ağladı ağladı... Sonra sustu.\n\n"Haklısın... Çocuklar var... Yuvayı yıkmak kolay mı..."',
                ending: {
                    money: 200,
                    reputation: 50,
                    type: 'normal',
                    text: "Barıştılar mı? Hayır. Sadece ateşkes yaptılar. Eve birlikte gittiler. Mutsuz bir evlilik devam etti."
                }
            },

            // 12 (Üsküdar - Kadın Zaferi)
            {
                text: 'Üsküdar\'a sürdün. Adam yol boyunca küfretti.\n\n"İneceğim ben! İndir beni!"',
                choices: [
                    { text: "İn o zaman!", next: 17 },
                    { text: "Sus otur, karını eve bırakacağız.", next: 18 }
                ]
            },

            // 13 (Kilitli Kapı)
            {
                text: 'Kadın çığlık attı: "İmdat! Kaçırıyorlar beni!"\n\nAdam: "Sus rezil ettin bizi!"',
                choices: [
                    { text: "Sakinleşin diye yaptım!", next: 19 },
                    { text: "Karakola çekiyorum, orada anlatın.", next: 16 }
                ]
            },

            // 14 (Adam Zaferi)
            {
                text: 'Çankaya\'ya gidiyorsunuz. Kadın sessizce ağlıyor. Adam zafer kazanmış komutan gibi.',
                ending: {
                    money: 1000,
                    reputation: -100, // Vicdan azabı
                    type: 'normal',
                    text: "Parayı (1000 TL) aldın ama kadının o bakışını unutamadın. Para her şeyi satın alır mı?"
                }
            },

            // 15 (Adamı Atma)
            {
                text: 'Adamı yaka paça attın arabadan. Kadın içeride kaldı.\n\n"Allah razı olsun abi... Beni kurtardın o canavardan..."',
                ending: {
                    money: 200,
                    reputation: 200,
                    type: 'normal',
                    text: "Kadını güvenli bir yere bıraktın. Kahraman oldun. Adam arkadan küfür ediyordu ama olsun."
                }
            },

            // 16 (Polis)
            {
                text: 'Karakolun önünde durdun. Polisler koştu.\n\n"Alın bunları memur bey, birbirlerini kesecekler."',
                ending: {
                    money: 0,
                    reputation: 100,
                    type: 'police',
                    text: "En doğrusunu yaptın. Aile içi şiddet şakaya gelmez. Polisler teşekkür etti."
                }
            },

            // 17 (Adam İndi)
            {
                text: 'Adam indi. "Ne halin varsa gör!" dedi.\n\nKadınla baş başa kaldınız. Kadın hıçkırarak ağlıyor.',
                ending: {
                    money: 100,
                    reputation: 80,
                    type: 'normal',
                    text: "Kadına bir peçete uzattın. 'Sıkma canını abla' dedin. Bazen şoförlük dert dinlemektir."
                }
            },

            // 18 (Zoraki Eve Dönüş)
            {
                text: 'Eve vardılar. Adam kadının kolundan tutup indirdi.\n\n"Yürü! Evde hesaplaşacağız!"',
                ending: {
                    money: 200,
                    reputation: -50,
                    type: 'hospital',
                    text: "Onları bıraktın ama için hiç rahat değil. O evden bağırış sesleri geliyordu sen uzaklaşırken. Belki polisi aramalıydın."
                }
            },

            // 19 (Barışma - Mucize)
            {
                text: 'Ani bir fren yaptın! İkisi de öne savruldu.\n\n"Yeter be! Ölüm var ölüm! Birbirinizi yiyeceğinize sarılın ulan!"',
                choices: [
                    { text: "Hayat kısa, değmez.", next: 20 }
                ]
            },

            // 20 (Final Barışma)
            {
                text: 'İkisi de şaşırdı. Sonra birbirlerine baktılar. Adamın gözü doldu.\n\n"Özür dilerim Ayşe... Haklısın... Ben eşeklik ettim..."',
                ending: {
                    money: 500,
                    reputation: 300, // Efsane taksici
                    type: 'normal',
                    text: "Nasihatin işe yaradı! Sarıldılar. Seni düğün tazelemeye çağırdılar. Senin gibisi az kaldı."
                }
            }
        ]
    },

    // ===== KARAKTER 6: YARALI FEDAİ (GENİŞLETİLMİŞ HİKAYE) =====
    {
        id: 6,
        name: "Yaralı Fedai",
        avatar: "🩸",
        image: require('./assets/characters/yarali_fedai.png'),
        location: "Fatih",
        time: "02:30",
        intro: "Kapıyı zor açtı. Göğsünden kan sızıyor, nefes almakta zorlanıyor. Gömleği kıpkırmızı. Elinde bir silah belirdi ama hemen sakladı.",
        dialogue: [
            // 0. GİRİŞ
            {
                text: '"Kimseye... Kimseye söyleme... Sür Bakırköy\'e... Dr. Kemal\'e... Hastane yok! Anladın mı? Hastane yok!"\n\nAdam acı içinde inliyor.',
                choices: [
                    { text: "Tamam ağabey, dayan. Bakırköy'e gidiyoruz.", next: 1 },
                    { text: "Abi kan kaybediyorsun! En yakın hastaneye gitmeliyiz!", next: 2 },
                    { text: "Silah mı o? Ben belaya bulaşmak istemem!", next: 3 }
                ]
            },

            // --- YOL 1: SADAKAT (DOKTORA GİDİŞ) ---
            // 1
            {
                text: '"Aferin... Adamın dibisin... Bas gaza... Arkamızda kuyruk olabilir... Dikiz aynasına bak..."\n\nGözleri kayıyor.',
                choices: [
                    { text: "Merak etme, atlatırız. Kim yaptı bunu?", next: 4 },
                    { text: "Abi sen konuşma, gücünü sakla.", next: 5 }
                ]
            },

            // --- YOL 2: HASTANE ISRARI ---
            // 2
            {
                text: '"Sana hastane yok dedim! Polisi ararlarsa biterim! Öldürürler beni orada! Sür Kemal\'e!"\n\nSilahı hafifçe gösterdi.',
                choices: [
                    { text: "Tamam abi, kızma. Kemal'e gidiyoruz.", next: 1 },
                    { text: "Bu halde Kemal'e yetişemezsin.", next: 6 }
                ]
            },

            // --- YOL 3: KORKU/RED ---
            // 3
            {
                text: '"Bana bak! Sür dedim sana! Yoksa o belayı beynine yersin! Bas gaza!"\n\nAdam ciddi.',
                choices: [
                    { text: "Tamam sürüyorum! Zarar verme!", next: 1 },
                    { text: "İn aşağı! Polisi ararım!", next: 7 }
                ]
            },

            // --- GELİŞME ---

            // 4 (Kim Yaptı?)
            {
                text: '"Kardeşim bildiğim adam... 20 yıllık dostum... Arkamdan sıktı... İhanet şoför, mermiden daha çok yakıyor..."',
                choices: [
                    { text: "Geçmiş olsun abi. İhanet ağırdır.", next: 8 },
                    { text: "Sen de onu vuracak mısın?", next: 9 }
                ]
            },

            // 5 (Sessiz Sürüş)
            {
                text: 'Hızla gidiyorsun. Arkadan siyah bir araç selektör yapıyor!\n\n"Ahmet Abi! Onlar mı?"',
                choices: [
                    { text: "Bizi takip ediyorlar! Kaçıyorum!", next: 10 },
                    { text: "Sakin ol, belki normal araçtır.", next: 11 }
                ]
            },

            // 6 (Hastane İkna)
            {
                text: 'Adamın bilinci kapanıyor. Direksiyonu kırdın Devlet Hastanesi\'ne.\n\n"Hayır... Yapma..." diye mırıldandı.',
                choices: [
                    { text: "Yaşaman lazım abi. Özür dilerim.", next: 12 },
                    { text: "Son anda vazgeçip Bakırköy'e dön.", next: 13 }
                ]
            },

            // 7 (Rest Çekme)
            {
                text: 'Ani fren yaptın! Adamın kafası çarptı, sersemledi. Kapıyı açıp kaçabilirsin.',
                choices: [
                    { text: "Arabadan in ve kaç!", next: 14 },
                    { text: "Silahını al ve polisi ara.", next: 15 },
                    { text: "Vazgeçtim, adamı götüreceğim.", next: 1 } // Geri dönüş
                ]
            },

            // 8 (İhanet Sohbeti)
            {
                text: '"Öyle... Ama intikamım acı olacak... Tabi sağ kalırsam... Şoför, bu işten çıkarsak sana kıyak yapacağım."',
                choices: [
                    { text: "Eyvallah abi. Sen iyileş de.", next: 5 },
                    { text: "Para istemem, başım belaya girmesin.", next: 5 }
                ]
            },

            // 9 (İntikam)
            {
                text: '"Vurmak mı? Onu yaşatmayacağım... Ailesini, her şeyini alacağım..."\n\nGözlerindeki nefreti gördün.',
                choices: [
                    { text: "Abi intikam soğuk yenir.", next: 5 },
                    { text: "Boşver abi, Allah'a havale et.", next: 16 }
                ]
            },

            // 10 (Kovalamaca)
            {
                text: 'Ara sokaklara daldın! Tekerler yanıyor. Arkadaki araç peşini bırakmıyor. Silah sesleri geldi! ÇATIŞMA!',
                choices: [
                    { text: "Kafanı eğ abi!", next: 17 },
                    { text: "Ben bu işte yokum! Duruyorum!", next: 18 }
                ]
            },

            // 11 (Takip Şüphesi)
            {
                text: 'Araba yanınızdan geçti gitti. Normal vatandaşmış.\n\nFedai güldü: "Paranoyak olduk iyice..."',
                choices: [
                    { text: "Bakırköy'e az kaldı.", next: 13 }
                ]
            },

            // --- FİNALLER ---

            // 12 (Hastane - Polis Sonu)
            {
                text: 'Acile girdin. "SEDYE!" diye bağırdın. Doktorlar koştu.\n\nPolis de geldi. "Kurşun yarası mı?" diye sordular.',
                ending: {
                    money: 0,
                    reputation: 150, // Polisle iyi ilişkiler
                    type: 'police',
                    text: "Adamı kurtardın ama tutuklandı. 'Beni yaktın şoför' dedi sedyede. Ama o ölmedi, sen de hapse girmedin. Doğrusu buydu."
                }
            },

            // 13 (Dr. Kemal - Sadakat Sonu)
            {
                text: 'Apartmanın arka girişine geldin. İki izbandut adamı aldı.\n\nDr. Kemal çıktı: "Yine mi Ahmet? Sağ ol şoför."',
                ending: {
                    money: 5000, // Cömert ödül
                    reputation: -50, // Yeraltı dünyasıyla ilişki
                    type: 'normal',
                    text: "Aşırı cömert bir bahşiş (5000 TL). Ertesi gün haberlerde 'Mafya hesaplaşması: 1 ölü' duydun. Ahmet intikamını almış. Parayı harcarken ellerin titredi."
                }
            },

            // 14 (Kaçış - Hastane Sonu)
            {
                text: 'Kaçtın. Adam arabada kaldı. Uzaktan izledin.\n\nBir süre sonra arabadan inip sendeleyerek uzaklaştı. Araban kan içinde.',
                ending: {
                    money: -2000,
                    reputation: -100,
                    type: 'hospital',
                    text: "Arabanı temizletmek servet tuttu. O adam ne oldu bilmiyorsun. Belki öldü. Vicdanın rahat mı?"
                }
            },

            // 15 (Silahı Alma - Kahramanlık)
            {
                text: 'Silahı aldın. Adam şoke oldu. Polisi aradın.\n\nPolisler gelip adamı aldı. "Arananlar listesindeymiş bu şahıs!"',
                ending: {
                    money: 1000, // Ödül
                    reputation: 300,
                    type: 'police',
                    text: "Polis teşkilatından plaket aldın. Aranan bir mafya babasını yakalattın. Gazetelere çıktın: 'Cesur Taksici'."
                }
            },

            // 16 (Nasihat)
            {
                text: '"Allah mı? Bizim dünyada Allah yok şoför..."\n\nSustu. Kan kaybından bayıldı.',
                choices: [
                    { text: "Hızlıca Dr. Kemal'e!", next: 13 }
                ]
            },

            // 17 (Başarılı Kaçış)
            {
                text: 'Müthiş manevralarla izini kaybettirdin. Fedai hayran kaldı.\n\n"Şoför değil, yarışçısın mübarek! Al bu araba parası!"',
                ending: {
                    money: 7000,
                    reputation: 100,
                    type: 'normal',
                    text: "Çatışmadan sağ çıktın. Eline bir tomar para tutuşturdu. Dr. Kemal'e teslim ettin. Adrenalin dolu bir geceydi."
                }
            },

            // 18 (Teslim Olma - Kötü Son)
            {
                text: 'Durdun. Diğer arabadan inenler taradı! Camlar patladı!\n\nFedai son gücüyle ateş etti ama...',
                ending: {
                    money: -5000,
                    reputation: -200,
                    type: 'hospital',
                    text: "Araban delik deşik oldu. Sen omzundan vuruldun. Fedai öldü. Keşke gaza bassaydın. Hastane masrafları belini bükecek."
                }
            }
        ]
    },

    // ===== KARAKTER 7: GURBET AMCA (GENİŞLETİLMİŞ HİKAYE) =====
    {
        id: 7,
        name: "Gurbet Amca",
        avatar: "👴",
        image: require('./assets/characters/gurbet_amca.png'),
        location: "Havalimanı",
        time: "04:00",
        intro: "70 yaşlarında, yorgun gözlü. Elinde 80'lerden kalma eski bir valiz. 'Evladım, Eminönü\'ne gidelim. 40 yıldır görmedim İstanbul\'u.'",
        dialogue: [
            // 0. GİRİŞ
            {
                text: '"40 yıl evladım... Dile kolay. Almanya\'da geçti ömrüm. Şimdi döndüm ama... İstanbul da bana yabancı sanki."\n\nCamdan beton binalara bakıyor.',
                choices: [
                    { text: "Hoş geldin amca. Çok şey değişti maalesef.", next: 1 },
                    { text: "Eminönü'nde kimin var amca?", next: 2 },
                    { text: "Almanya acı vatan derler, doğru mu?", next: 3 }
                ]
            },

            // --- YOL 1: NOSTALJİ ---
            // 1
            {
                text: '"Değişmiş ha? Bu gökdelenler ne böyle? Toprağı öldürmüşler! Bizim zamanımızda buralar dutluktu, bostandı..."\n\nGözleri doldu.',
                choices: [
                    { text: "Haklısın amca, beton yığını olduk.", next: 4 },
                    { text: "Gelişiyoruz be amca, modernleşiyoruz.", next: 5 }
                ]
            },

            // --- YOL 2: AİLE ---
            // 2
            {
                text: '"Kimsem kalmadı evladım... Hanım Almanya\'da vefat etti. Çocuklar orada doğdu, Alman oldular. Türkçe bile bilmiyorlar. Ben ölmeye geldim..."',
                choices: [
                    { text: "Allah gecinden versin amca.", next: 6 },
                    { text: "Çocukların neden gelmedi seninle?", next: 7 }
                ]
            },

            // --- YOL 3: GURBET SOHBETİ ---
            // 3
            {
                text: '"Acı ki ne acı... Paran oluyor ama huzurun olmuyor. Yabancısın orada. Buraya geliyorsun, buraya da yabancısın... Arafta kaldık biz."',
                choices: [
                    { text: "Şimdi evindesin amca, rahatla.", next: 1 },
                    { text: "Keşke gitmeseymişsin.", next: 1 }
                ]
            },

            // --- GELİŞME ---

            // 4 (Beton Eleştirisi)
            {
                text: '"Beton... Ruh yok evladım ruh! Eskiden komşuluk vardı. Şimdi herkes kutularda yaşıyor. Eminönü duruyor mu bari? Balıkçılar?"',
                choices: [
                    { text: "Eminönü hala aynı amca, merak etme.", next: 8 },
                    { text: "Orası da turist doldu amca.", next: 9 }
                ]
            },

            // 5 (Modernleşme Savunusu)
            {
                text: '"Modernlik buysa yerin dibine batsın! İnsanlık ölmüş... Bak kimse kimsenin yüzüne bakmıyor trafikte..."',
                choices: [
                    { text: "Haklısın amca, özür dilerim.", next: 4 }
                ]
            },

            // 6 (Ölüm Konusu)
            {
                text: '"Kanserim ben oğlum... Son evre. Doktorlar 3 ay dedi. Toprağımda öleyim istedim. Baba evini bir göreyim son kez..."',
                choices: [
                    { text: "Seni evine götüreceğim amca, söz.", next: 10 },
                    { text: "Hastaneye gidelim mi amca?", next: 11 }
                ]
            },

            // 7 (Hayırsız Evlatlar)
            {
                text: '"Gelmeyin dedim... Babalarınızın toprağına küstünüz dedim... Onlar Hans oldu, Helga oldu... Ahmet öldü."',
                choices: [
                    { text: "Üzme kendini amca.", next: 6 }
                ]
            },

            // 8 (Eminönü Varış)
            {
                text: 'Eminönü\'ne yaklaştınız. Deniz göründü. Amcanın gözleri parladı.\n\n"Ah İstanbul... Güzel İstanbul... Kokusu bile aynı..."',
                choices: [
                    { text: "işte geldik amca. Hangi sokak?", next: 12 }
                ]
            },

            // 9 (Turist Eleştirisi)
            {
                text: '"Desene işgal altındayız yine... Neyse, taşları yerindedir inşallah."',
                choices: [
                    { text: "Geldik sayılır.", next: 12 }
                ]
            },

            // 10 (Söz Verme)
            {
                text: '"Sağ ol evladım... Balıkçı Sokak, No 5... Ahşap bir ev... Bahçesinde incir ağacı vardı..."',
                choices: [
                    { text: "Sürüyorum amca.", next: 12 },
                    { text: "Amca o mahalle kentsel dönüşüme girdi...", next: 13 }
                ]
            },

            // 11 (Hastane Reddi)
            {
                text: '"İstemem hastane! Beyaz önlüklerden bıktım! Ben incir ağacımın altında oturmak istiyorum!"',
                choices: [
                    { text: "Tamam amca, ağaca gidiyoruz.", next: 12 }
                ]
            },

            // 12 (Sokak Arayışı)
            {
                text: 'Sokağa girdiniz. Ama... Ahşap ev yok. İncir ağacı yok. Yerinde 10 katlı bir otel var.',
                choices: [
                    { text: "Amca... Burası galiba...", next: 14 },
                    { text: "Yanlış sokak belki?", next: 15 }
                ]
            },

            // 13 (Acı Gerçek)
            {
                text: '"Ne? Yıkıldı mı? Babamın evi? Çocukluğum?"\n\nAdamın rengi attı, eli kalbine gitti.',
                choices: [
                    { text: "Sakin ol amca! İyi misin?", next: 16 },
                    { text: "Belki duruyordur, gidip bakalım.", next: 12 }
                ]
            },

            // --- FİNALLER ---

            // 14 (Otel - Hüzünlü Son)
            {
                text: '"Otel yapmışlar... Benim anılarımı satmışlar... İncir ağacımı kesmişler..."\n\nKaldırıma oturdu, hıçkıra hıçkıra ağladı.',
                ending: {
                    money: 0,
                    reputation: 150,
                    type: 'normal',
                    text: "Para almadın. Amcayla kaldırımda oturdun. O anlattı, sen dinledin. İstanbul'a bir kez daha küstün. Amca o gece otele yerleşti ama ruhu sokakta kaldı."
                }
            },

            // 15 (İnkar ve Veda)
            {
                text: '"Yok... Burası değil... Burası olamaz..."\n\nAma orasıydı. Tabelada yazıyordu: "Eski İncir Sokak".',
                ending: {
                    money: 200,
                    reputation: 100,
                    type: 'normal',
                    text: "Gerçeği kabullenemedi. 'Beni karacaahmet'e götür, annem orada' dedi. Mezarlığa bıraktın. 200 lira verdi. 'En azından ölüler yerinde duruyor' dedi."
                }
            },

            // 16 (Kalp Krizi - Hastane)
            {
                text: 'Amca fenalaştı! Kalbi dayanmadı.\n\nHastaneye yetiştirdin. Doktorlar müdahale etti.',
                ending: {
                    money: 0,
                    reputation: 200, // Hayat kurtarma
                    type: 'hospital',
                    text: "Son anda kurtardılar. Gözünü açtığında elini tuttu. 'Evim yokmuş benim evladım' dedi. 'Mezardan başka evim yokmuş'. İçi yandı."
                }
            },

            // 17 (Taksici Dostluğu)
            {
                text: 'Amca çok üzüldü. Onu teselli ettin.\n\n"Gel amca, seni boğazda bir çay içmeye götüreyim. Benden olsun."',
                ending: {
                    money: 500, // Bahşiş
                    reputation: 300,
                    type: 'normal',
                    text: "Çay içtiniz, simit yediniz. Amca gülümsedi. 'Hala iyi insanlar varmış' dedi. Sana 500 lira zorla verdi. İstanbul'u ona yeniden sevdirdin."
                }
            }
        ]
    },

    // ===== KARAKTER 8: ACİL DOKTORU (GENİŞLETİLMİŞ HİKAYE) =====
    {
        id: 8,
        name: "Acil Doktoru",
        avatar: "👨‍⚕️",
        image: require('./assets/characters/acil_doktor.png'),
        location: "Hastane",
        time: "06:00",
        intro: "Gözleri kan çanağı gibi, elleri hafifçe titriyor. Üzerinde kan lekesi kalmış bir önlük var. 'Eve... Çerkezköy... Sadece uyumak istiyorum...'",
        dialogue: [
            // 0. GİRİŞ
            {
                text: '"36 saattir ayaktayım... 12 ameliyat... 4\'ünü kaybettik... Biri çocuktu..."\n\nBaşını cama yasladı. Sesi titriyor.',
                choices: [
                    { text: "Çok zor iş sizinki doktor bey. Allah yardımcınız olsun.", next: 1 },
                    { text: "Çerkezköy çok uzak, bu halde nasıl gideceksiniz?", next: 2 },
                    { text: "Neden bu kadar çalışıyorsunuz? Yazık size de.", next: 3 }
                ]
            },

            // --- YOL 1: EMPATİ ---
            // 1
            {
                text: '"Yardım mı? Bazen kimse yardım etmiyor... O anneın feryadı kulaklarımdan gitmiyor... \'Oğlumu kurtar\' değişi..."',
                choices: [
                    { text: "Siz elinizden geleni yaptınız.", next: 4 },
                    { text: "Unutmaya çalışın, biraz uyuyun.", next: 5 }
                ]
            },

            // --- YOL 2: MESAFE SOHBETİ ---
            // 2
            {
                text: '"Evim orada... Çocuklarım orada... Onları görmezsem delireceğim. Sadece sür şoför bey... Parası mühim değil."',
                choices: [
                    { text: "Tamam doktor bey, güvenle götürürüm.", next: 5 },
                    { text: "Keşke yakında ev tutsaydınız.", next: 3 }
                ]
            },

            // --- YOL 3: SİSTEM ELEŞTİRİSİ ---
            // 3
            {
                text: '"Doktor yok... Herkes gidiyor... Almanya\'ya, İngiltere\'ye... Kalanlar da biz işte... Tükenene kadar çalışıyoruz."',
                choices: [
                    { text: "Siz niye gitmediniz?", next: 6 },
                    { text: "Devletin el atması lazım bu işe.", next: 4 }
                ]
            },

            // --- GELİŞME ---

            // 4 (Vicdan Azabı)
            {
                text: '"Gitmem... Gidemem... Burada insanlar ölüyor. Ben de gidersem o çocuğu kim ameliyat edecek? Ama bazen..."',
                choices: [
                    { text: "Bazen ne?", next: 6 }
                ]
            },

            // 5 (Uyku Arası)
            {
                text: 'Doktor arka koltukta sızdı. Radyoyu kıstın. Yol sakin akıyor...\n\nANİDEN! Öndeki araç bariyerlere çarptı! GÜM!',
                choices: [
                    { text: "Frene bas ve dur!", next: 7 },
                    { text: "Durma, doktor uyuyor, uyanmasın.", next: 8 }
                ]
            },

            // 6 (Gitme İsteği)
            {
                text: '"Bazen lanet ediyorum. Bırakıp gitmek istiyorum. Sonra bir hasta \'Allah razı olsun\' diyor... Yine kalıyorum."',
                choices: [
                    { text: "Siz gerçek bir kahramansınız.", next: 5 }
                ]
            },

            // 7 (Kaza Anı - Müdahale)
            {
                text: 'Aracı sağa çektin. Öndeki arabadan dumanlar çıkıyor! İçeride yaralılar var.\n\nDoktor sarsılarak uyandı: "Ne oldu? Kaza mı?"',
                choices: [
                    { text: "Evet doktor bey! Yaralılar var!", next: 9 },
                    { text: "Önemli değil, devam edelim, siz yorgunsunuz.", next: 10 }
                ]
            },

            // 8 (Kaza Anı - Kaçış)
            {
                text: 'Kazayı görmezden geldin. Ambülans gelir dedin. Aynadan baktın, doktor hala uyuyor.\n\n...Ama vicdanın sızlıyor.',
                choices: [
                    { text: "Devam et.", next: 11 },
                    { text: "Geri dön!", next: 7 }
                ]
            },

            // 9 (Doktor Modu)
            {
                text: 'Doktor anında değişti. Yorgun adam gitti, yerine komutan geldi.\n\n"ÇANTAMI VER! Şoför sen de gel, yardım edeceksin!"',
                choices: [
                    { text: "Emredersin doktor bey!", next: 12 },
                    { text: "Ben gelemem, kan tutar.", next: 13 }
                ]
            },

            // 10 (Doktoru Durdurma)
            {
                text: '"Saçmalama şoför! Durdur arabayı!"\n\nKapıyı açıp hareket halindeyken atlamaya kalktı!',
                choices: [
                    { text: "Tamam durdum! Sakin!", next: 12 }
                ]
            },

            // 11 (Kaçış Devam)
            {
                text: 'Çerkezköy yoluna devam ettin. Radyoda son dakika: "TEM\'de feci kaza, ölüler var."\n\nDoktor uyandı: "Ne oldu? Bir ses duydum?"',
                choices: [
                    { text: "Lastik patladı sanırım, devam ettim.", next: 14 },
                    { text: "Kaza vardı... Duramadım doktor bey.", next: 15 }
                ]
            },

            // 12 (Müdahale Sahnesi)
            {
                text: 'Yaralıları çıkardınız. Doktor birinin bacağına turnike yaptı, diğerine kalp masajı yapıyor.\n\n"Şoför! Şunu bastır buraya! Kanamayı durdur!"',
                choices: [
                    { text: "Tamam! Bastırıyorum!", next: 16 }
                ]
            },

            // 13 (Korkak Şoför)
            {
                text: '"Korkak herif! Arabada bekle o zaman!"\n\nDoktor tek başına koştu dumanların arasına.',
                choices: [
                    { text: "Bekle.", next: 17 }
                ]
            },

            // --- FİNALLER ---

            // 14 (Yalanlı Son)
            {
                text: 'Eve vardınız. Doktor hiçbir şeyden habersiz indi.\n\n"Sağ ol şoför. İyi uyudum." dedi. 500 lira verdi.',
                ending: {
                    money: 500,
                    reputation: -100, // Gizli eksi
                    type: 'normal',
                    text: "Parayı aldın ama o ölüler rüyana girecek. Doktor bilse yüzüne tükürürdü. Bir hayat kurtarılabilirdi."
                }
            },

            // 15 (İtirafın Sonu)
            {
                text: 'Doktorun yüzü buz kesti. "Yaralı vardı ve durmadın mı? Bir de beni taşıyorsun o arabada ha?"\n\nİnmek istedi otobanda.',
                ending: {
                    money: 0,
                    reputation: -200,
                    type: 'normal',
                    text: "Seni yolda bıraktı, otostop çekti. Beş kuruş vermedi. 'Katilsin sen' dedi giderken. Haklı mıydı?"
                }
            },

            // 16 (Kahramanlık Sonu)
            {
                text: 'Ambulanslar geldiğinde doktor iki kişiyi hayata döndürmüştü. Sen de bir çocuğun elini tuttun korkmasın diye.\n\nDoktor sana sarıldı: "Biz iyi bir ekip olduk şoför."',
                ending: {
                    money: 1000, // Bahşiş değil ödül
                    reputation: 500,
                    type: 'hospital',
                    text: "O gece sadece şoför değildin. Yaralıların duasını aldın. Doktor zorla 1000 lira verdi. 'Bu gece uyuyabilirim artık' dedi. Sen de huzurla uyudun."
                }
            },

            // 17 (Pasif Son)
            {
                text: 'Doktor kan ter içinde geri döndü. "Ambulansa teslim ettim... Yoruldum..."\n\nArabaya bindi, tek kelime etmedi.',
                ending: {
                    money: 400,
                    reputation: 50,
                    type: 'normal',
                    text: "Eve bıraktın. Parayı verdi ama yüzüne bakmadı. 'İnsanlık ölmüş' diye mırıldandığını duydun. Utandın."
                }
            }
        ]
    },

    // ===== KARAKTER 9: KAYIP ÇOCUK (GENİŞLETİLMİŞ HİKAYE) =====
    {
        id: 9,
        name: "Kayıp Çocuk",
        avatar: "👧",
        image: require('./assets/characters/kayip_cocuk.png'),
        location: "Beyazıt",
        time: "19:00",
        intro: "8-9 yaşlarında bir kız çocuğu. Kaldırımın kenarında ağlıyor. Yanında kimse yok. Elini ürkekçe kaldırdı.",
        dialogue: [
            // 0. GİRİŞ
            {
                text: '"Amca... Annemi kaybettim... Çarşıda elimi bıraktı... Çok kalabalıktı...""\n\nBurnunu çekiyor, titriyor.',
                choices: [
                    { text: "Korkma güzel kızım, taksiye bin. Nasıl kayboldun?", next: 1 },
                    { text: "Tek başına binmemelisin. Polisi arayalım mı?", next: 2 },
                    { text: "Adresin var mı? Nerede oturuyorsun?", next: 3 }
                ]
            },

            // --- YOL 1: GÜVEN İNŞASI ---
            // 1
            {
                text: '"Bilmiyorum... Dondurma alacaktık... Sonra bir adam çarptı... Annem yoktu..."\n\nArabaya bindi ama kapı kolunu tutuyor.',
                choices: [
                    { text: "Tamam ağlama. Bak ben de babayım. Seni evine götüreceğim.", next: 4 }, // Güven verir
                    { text: "Annenin telefonunu biliyor musun?", next: 5 }
                ]
            },

            // --- YOL 2: POLİS KORKUSU ---
            // 2
            {
                text: '"Hayır! Polis olmaz! Annem çok kızar! Babam hapiste, polisler onu aldı... Lütfen beni eve götür amca..."',
                choices: [
                    { text: "Tamam tamam, polis yok. Adresin neresi?", next: 3 },
                    { text: "Ama en doğrusu bu. Polis seni annene verir.", next: 6 }
                ]
            },

            // --- YOL 3: ADRES BİLGİSİ ---
            // 3
            {
                text: '"Feriköy... Kırmızı bir bina... Altında \'Umut Bakkalı\' var... Biliyorum orayı."',
                choices: [
                    { text: "Tamam Feriköy'e gidiyoruz.", next: 7 },
                    { text: "Feriköy çok büyük. Sokak adı biliyor musun?", next: 8 }
                ]
            },

            // --- GELİŞME ---

            // 4 (Baba Rolü)
            {
                text: '"Gerçekten mi? Senin de kızın var mı?"\n\nBiraz rahatladı. Emniyet kemerini taktı.',
                choices: [
                    { text: "Var tabii. Senin yaşında adı Zeynep.", next: 7 }, // Yalan veya gerçek, güven artar
                    { text: "Yok ama yeğenlerim var.", next: 7 }
                ]
            },

            // 5 (Telefon Denemesi)
            {
                text: '"Numarayı bilmiyorum... Telefonum evde kaldı..."\n\nÇaresizce bakıyor.',
                choices: [
                    { text: "Tamam, Feriköy'e gidelim o zaman.", next: 7 }
                ]
            },

            // 6 (Israr - Polis)
            {
                text: '"İstemiyorum! İneceğim ben!"\n\nÇocuk paniğe kapıldı, kapıyı açmaya çalışıyor! Araba hareket halinde!',
                choices: [
                    { text: "DUR! Tamam inme, eve gidiyoruz!", next: 7 },
                    { text: "Kapadım kapıları! Seni karakola götürüyorum!", next: 9 }
                ]
            },

            // 7 (Yolculuk Sohbeti - Tehlike Sezisi)
            {
                text: 'Feriköy\'e doğru gidiyorsunuz. Çocuk dışarıyı izliyor.\n\n"Amca... Annem taksiciler tehlikeli derdi. Sen iyi birisin değil mi?"',
                choices: [
                    { text: "Ben iyiyim kızım. Herkese güvenme ama.", next: 10 },
                    { text: "Annen haklı. İstanbul tekin değil.", next: 10 }
                ]
            },

            // 8 (Detay Sorgusu)
            {
                text: '"Bilmiyorum... Ama parkın yanındaydı... Parkta büyük bir kaydırak var..."',
                choices: [
                    { text: "Tamam buluruz orayı.", next: 7 }
                ]
            },

            // 9 (Zorla Karakol)
            {
                text: 'Çocuk çığlık atıyor. "İMDAT! Kaçırıyor beni!"\n\nDışarıdaki insanlar bakıyor. Başın belaya girebilir.',
                choices: [
                    { text: "Sus kızım, iyiliğin için!", next: 11 },
                    { text: "Mecbur kenara çektin. İn dedin.", next: 12 }
                ]
            },

            // 10 (Şüpheli Durum)
            {
                text: '"Babam hırsızlık yapmadı... İftira attılar... O yüzden polis sevmiyoruz..."\n\nÇocuk birden olgunlaştı sanki.',
                choices: [
                    { text: "Anlıyorum. Hayat zor.", next: 13 },
                    { text: "Baban nerede şimdi?", next: 13 }
                ]
            },

            // 11 (Karakol Teslimi)
            {
                text: 'Karakola vardın. Çocuk hala ağlıyor.\n\nPolis: "Ne oluyor burada? Kim bu çocuk?"',
                ending: {
                    money: 0,
                    reputation: 100,
                    type: 'police',
                    text: "Çocuğu polise teslim ettin. Çocuk sana nefretle baktı. Ama 2 saat sonra annesi karakola gelip almış. Güvenli olanı yaptın ama kalbini kırdın."
                }
            },

            // 12 (Sokakta Bırakma - Kötü Son)
            {
                text: 'İnsanların bakışlarından korkup indirdin.\n\nÇocuk kalabalıkta kayboldu. Arkana bakmadan gittin.',
                ending: {
                    money: 0,
                    reputation: -300,
                    type: 'normal',
                    text: "O gece uyuyamadın. Ertesi gün haberlerde 'Kayıp çocuk aranıyor' ilanını gördün. Vicdan azabı peşini bırakmayacak."
                }
            },

            // 13 (Eve Varış - Şüphe)
            {
                text: 'Feriköy\'e vardınız. Çocuk "İşte orası! Kırmızı bina!" dedi.\n\nBinanın önünde iki tane kılıksız adam bekliyor.',
                choices: [
                    { text: "Bu adamları tanıyor musun?", next: 14 },
                    { text: "Tamam geldik.", next: 15 }
                ]
            },

            // 14 (Tuzak mı?)
            {
                text: '"Onlar... Dayımlar... Evet dayımlar!" dedi ama sesi titredi.\n\nAdamlar arabaya doğru geliyor.',
                choices: [
                    { text: "Kapıları kilitle! Bu işte bir iş var!", next: 16 },
                    { text: "İn bakalım kızım.", next: 15 }
                ]
            },

            // 15 (Teslim - Riskli Son)
            {
                text: 'Çocuk indi. Adamlar çocuğu kolundan tuttu.\n\n"Sağ ol şoför, bas git şimdi!" dediler sertçe.',
                ending: {
                    money: 50, // Sus payı
                    reputation: -50,
                    type: 'normal',
                    text: "50 lira attılar. Çocuk arkana bakarak eve girdi. Dayıları mıydı? Yoksa kaçıranlar mı? Asla emin olamadın."
                }
            },

            // 16 (Kahramanlık - Kaçış)
            {
                text: 'Gaza bastın! Adamlar arabanın arkasından koştu, küfretti.\n\nÇocuk: "Amca ne yapıyorsun?!"',
                choices: [
                    { text: "Onlar dayın değildi kızım! Korkudan yalan söyledin!", next: 17 }
                ]
            },

            // 17 (Gerçek İtiraf)
            {
                text: 'Çocuk ağlayarak itiraf etti: "Değildi... Tanımıyorum onları... Annem yok... Beni yurda götür amca..."',
                ending: {
                    money: 0,
                    reputation: 400,
                    type: 'police',
                    text: "Çocuğu Çocuk Esirgeme Kurumu'na götürdün. Kimsesizmiş. O adamlar organ mafyası olabilirmiş. Bir hayat kurtardın. Belki de bir melek oldun."
                }
            },

            // 18 (Mutlu Son - Gerçek Anne)
            {
                text: 'Bakkalın önünde bir kadın çığlık atarak koştu!\n\n"YILDIZ! YILDIZIM!"\n\nÇocuk: "ANNE!" diye fırladı.',
                ending: {
                    money: 50,
                    reputation: 250,
                    type: 'normal',
                    text: "Kadın sana sarıldı. 'Allah ne muradın varsa versin' dedi. Cebindeki son 50 lirayı verdi. O parayı harcamaya kıyamadın."
                }
            }
        ]
    },

    // ===== KARAKTER 10: KAÇAK BANKER (GENİŞLETİLMİŞ HİKAYE) =====
    {
        id: 10,
        name: "Kaçak Banker",
        avatar: "💼",
        image: require('./assets/characters/kacak_banker.png'),
        location: "Levent",
        time: "10:00",
        intro: "Çok şık giyimli, elinde kilitli büyük bir çanta var. Ter içinde. Sürekli arkasına ve saatine bakıyor. 'Boş mu? Çabuk! Hemen sür!'",
        dialogue: [
            // 0. GİRİŞ
            {
                text: '"Havaalanı değil... Hayır... Özel uçak pisti... Çorlu\'ya sür! Acele et! Uçağım 45 dakika sonra kalkıyor!"\n\nAdam panik halinde.',
                choices: [
                    { text: "Çorlu çok uzak, o zamana yetişemeyiz.", next: 1 },
                    { text: "Hayırdır beyefendi, kimden kaçıyoruz?", next: 2 },
                    { text: "Taksimetreyi açıyorum?", next: 3 }
                ]
            },

            // --- YOL 1: ZAMAN BASKISI ---
            // 1
            {
                text: '"Yetişeceksin! Yetişmek zorundasın! Al şu 500 Doları peşin! Gerekirse uçur arabayı!"\n\nKucağına 500 Dolar attı.',
                choices: [
                    { text: "500 Dolar mı? Tamam abi, uçuyoruz!", next: 4 }, // Açgözlülük
                    { text: "Dolarla işim olmaz. Kurallara uyarım.", next: 5 }
                ]
            },

            // --- YOL 2: ŞÜPHE ---
            // 2
            {
                text: '"Soru sorma! İşini yap! Parasını veriyoruz işte... Çok büyük para dönecek bu işten... Sen de nasiplenirsin."',
                choices: [
                    { text: "Başım belaya girmesin?", next: 5 },
                    { text: "Ne kadar büyük para?", next: 6 }
                ]
            },

            // 3 (Para Odaklı)
            {
                text: '"Aç aç! Ne istersen aç! Bana sadece zaman kazandır!"\n\nTelefonu çalıyor, açmıyor. Ekranda "SAVCI" yazıyor.',
                choices: [
                    { text: "Savcı mı arıyor? İnin arabadan!", next: 7 }, // Dürüst
                    { text: "Görmezden gel, gaza bas.", next: 4 } // Suça ortaklık
                ]
            },

            // --- GELİŞME ---

            // 4 (Suça Ortaklık Başlangıcı)
            {
                text: 'Otobana çıktın. Makas atarak gidiyorsun. Radyoda haberler: "Ünlü Banker Nedim Yılmaz 100 Milyon Dolarla kayıp!"\n\nAdam radyoyu kapatmaya çalıştı.',
                choices: [
                    { text: "O sizsiniz! Nedim Yılmaz!", next: 8 },
                    { text: "Radyoyu elleme. Haberi duydum.", next: 9 }
                ]
            },

            // 5 (Reddediş)
            {
                text: '"Bak dostum... Bu çantada 5 milyon dolar nakit var. Beni sınıra götür, 50 bin doları senin. Bir ömür taksi sürmezsin."',
                choices: [
                    { text: "50 bin dolar... (Yutkunursun)", next: 10 },
                    { text: "Haram para istemem. İnin.", next: 7 }
                ]
            },

            // 6 (Pazarlık)
            {
                text: '"Sınırı geçince 100 bin dolar veririm! Ama polis çevirmelerini atlatman lazım. Var mısın?"',
                choices: [
                    { text: "100 bin mi? Varım!", next: 10 },
                    { text: "Polisle çatışamam.", next: 1 }
                ]
            },

            // 7 (Kovma Girişimi)
            {
                text: '"Beni burada bırakamazsın! Beni öldürürler! Mağdurlar peşimde!"\n\nSilah çekti! Ama eli titriyor.',
                choices: [
                    { text: "Tamam sakin ol! Götürüyorum!", next: 11 },
                    { text: "Arabada kamera var, yapma!", next: 12 }
                ]
            },

            // 8 (Yüzleşme)
            {
                text: '"Evet benim! Ne olmuş? O aptallar bana paralarını kendileri verdi! Şimdi geri istiyorlar! Vermeyeceğim!"',
                choices: [
                    { text: "Teyzelerin, işçilerin parası mı?", next: 13 },
                    { text: "Bana ne, payımı ver yeter.", next: 10 }
                ]
            },

            // 9 (Sessiz Anlaşma)
            {
                text: '"Duyduysan fiyatı da biliyorsundur. Beni ihbar edersen kuruş alamazsın. Götürürsen zenginsin."',
                choices: [
                    { text: "Hangi sınıra?", next: 10 },
                    { text: "Gizlice polisi ara.", next: 14 }
                ]
            },

            // 10 (Kaçış Yolculuğu)
            {
                text: 'Çorlu\'ya az kaldı. İleride polis çevirmesi var! Jandarma yolu kesmiş!',
                choices: [
                    { text: "Barikata sür! (Riskli)", next: 15 },
                    { text: "Tali yola sap!", next: 16 },
                    { text: "Dur ve teslim ol.", next: 17 }
                ]
            },

            // 11 (Zorla Götürme)
            {
                text: 'Silah zoruyla gidiyorsun. Adam ter içinde.\n\n"Polis görürsen sıkmamı bekleme, sıkarım!"',
                choices: [
                    { text: "Bariyerlere çarpıp adamı sersemlet.", next: 18 },
                    { text: "Dediklerini yap.", next: 10 }
                ]
            },

            // 12 (Kamera Blöfü)
            {
                text: 'Adam tereddüt etti. O sırada polis sireni duyuldu!\n\n"Kahretsin! Bas gaza!" diye bağırdı, silahı indirdi.',
                choices: [
                    { text: "Polise doğru sür.", next: 17 } // Teslim
                ]
            },

            // 13 (Vicdan Sorgusu)
            {
                text: '"Onlar açgözlüydü! Kısa yoldan zengin olmak istediler! Ben sadece fırsatı değerlendirdim!"',
                choices: [
                    { text: "Sen bir hırsızsın.", next: 14 }
                ]
            },

            // 14 (Gizli İhbar)
            {
                text: '(Mesajla polise konum attın). "Neden yavaşladın?" diye sordu banker.\n\n"Motor ısındı" dedin.',
                choices: [
                    { text: "Polisi oyalamaya devam et.", next: 17 }
                ]
            },

            // --- FİNALLER ---

            // 15 (Barikat - Felaket)
            {
                text: 'Gaza bastın! Jandarma ateş açtı! Tekerler patladı, takla attınız.\n\nÇanta açıldı, dolarlar havaya saçıldı.',
                ending: {
                    money: -10000, // Araba pert
                    reputation: -500,
                    type: 'hospital',
                    text: "Gözünü hastanede, kelepçeli açtın. Banker öldü. Sen 'suç ortağı' olarak yargılanacaksın. Hayatın bitti."
                }
            },

            // 16 (Tali Yol - Başarı?)
            {
                text: 'Tarlaların arasından geçtiniz! Özel uçağa vardınız. Adam uçağa koştu.\n\nÇantadan bir deste para fırlattı sana.',
                ending: {
                    money: 10000, // Büyük para (Dolar karşılığı TL)
                    reputation: -1000, // Vatan haini
                    type: 'normal',
                    text: "Uçak havalandı. Elinde tomarla para (100.000 TL). Ama haberlerde 'Banker Kaçtı' denirken herkes sana küfrediyor. Zengin ama onursuzsun."
                }
            },

            // 17 (Teslim - Kahraman)
            {
                text: 'Polis barikatında durdun. "Teslim ol!" diye bağırdın.\n\nBanker şokta. Jandarma adamı derdest etti.',
                ending: {
                    money: 5000, // Ödül
                    reputation: 1000, // Milli Kahraman
                    type: 'police',
                    text: "100 Milyon Doları kurtaran taksici! Devlet Üstün Hizmet Madalyası aldın. Televizyonlara çıktın. En doğru şeyi yaptın."
                }
            },

            // 18 (Kaza Süsü - Yakalama)
            {
                text: 'Bariyere vurdun! Adam kafasını cama vurdu, bayıldı.\n\nPolisler geldiğinde adam paketlenmişti.',
                ending: {
                    money: 2000, // Sigorta öder gerisini
                    reputation: 600,
                    type: 'police',
                    text: "Araban hasar gördü ama bankeri tek başına yakaladın. 'Cengaver Taksici' manşetlerdesin. Araba tamir olur, namın yürüsün."
                }
            }
        ]
    },

    // ===== KARAKTER 11: GİZLİ TANIK (GENİŞLETİLMİŞ HİKAYE) =====
    {
        id: 11,
        name: "Gizli Tanık",
        avatar: "bo",
        image: require('./assets/characters/gizli_tanik.png'),
        location: "Kadıköy",
        time: "14:00",
        intro: "Kapüşonlu, güneş gözlüklü. Titriyor. Sürekli saatine ve etrafına bakıyor. 'Çağlayan Adliyesi... Çabuk! Yoksa öleceğiz!'",
        dialogue: [
            // 0. GİRİŞ
            {
                text: '"Abi bas gaza! Arkadaki siyah Passat beni takip ediyor! Adliyeye yetişmem lazım! Duruşma 15:00\'te!"',
                choices: [
                    { text: "Sakin ol koçum, atlatırız. Kim bunlar?", next: 1 },
                    { text: "Bela mısın nesin? İnecek misin?", next: 2 },
                    { text: "Takip mi? Polisi arıyorum!", next: 3 }
                ]
            },

            // --- YOL 1: KORUMA GÜDÜSÜ ---
            // 1
            {
                text: '"Baronun adamları... İhale mafyası... Bugün konuşursam hepsi yanacak. Konuşamazsam... Ben yanacağım."',
                choices: [
                    { text: "Baron maron dinlemem, benim arabamdasın.", next: 4 },
                    { text: "Olabildiğince hızlı gideceğim.", next: 5 }
                ]
            },

            // --- YOL 2: REDDETME ---
            // 2
            {
                text: '"İnemem abi! İnersem kafama sıkarlar! İki katı para veririm! Sadece sür!"\n\nCebinden bir tomar para çıkardı.',
                choices: [
                    { text: "Para her şeyi çözer diyorsun... Peki.", next: 5 },
                    { text: "Para istemem, başımı yakma.", next: 3 }
                ]
            },

            // --- YOL 3: POLİS KORKUSU ---
            // 3
            {
                text: '"Sakın! Polislerin yarısı onlardan! Konumumu öğrenirlerse yolda keserler önümüzü! Sadece Adliye\'deki Savcı\'ya güveniyorum."',
                choices: [
                    { text: "Polis bile satılmış ha? Vay be.", next: 4 },
                    { text: "Ben riske giremem, in aşağı.", next: 6 }
                ]
            },

            // --- GELİŞME ---

            // 4 (Cesaret)
            {
                text: '"Senin gibi şoför zor bulunur abi... Bak, telefonum çalıyor... Arayan \'Bilinmeyen Numara\'..."',
                choices: [
                    { text: "Açma, dinliyor olabilirler.", next: 7 },
                    { text: "Aç bakalım ne diyecekler.", next: 8 }
                ]
            },

            // 5 (Takip Başlıyor)
            {
                text: 'Aynaya baktın. Siyah Passat dibinde! Selektör yapıyorlar. İçinden silah namlusu göründü!',
                choices: [
                    { text: "Kafanı eğ! Makas atacağım!", next: 9 },
                    { text: "Sağa çekip duralım, konuşalım.", next: 10 }
                ]
            },

            // 6 (Kovma - Tehlike)
            {
                text: 'Sağa çektin. Adam "Yapma abi!" diye yalvardı. Passat yanınızda durdu. İki izbandut indi.',
                choices: [
                    { text: "Ben karışmam, alın adamı.", next: 11 },
                    { text: "Hop! Müşterimi alamazsınız!", next: 12 }
                ]
            },

            // 7 (Telefonu Yok Sayma)
            {
                text: 'Telefonu kapattı. "Konum sinyalinden buluyorlar abi! Telefonu atmam lazım!"\n\nCamı açtı.',
                choices: [
                    { text: "At gitsin!", next: 13 },
                    { text: "Verme, delil olur o telefon.", next: 14 }
                ]
            },

            // 8 (Tehdit Telefonu)
            {
                text: 'Telefonu açtı, hoparlöre verdi. Kalın bir ses: "O taksiden in, 1 Milyon Dolar senin. Adliyeye gidersen aileni unut."',
                choices: [
                    { text: "1 Milyon Dolar mı?! (Gözlerin parladı)", next: 15 },
                    { text: "Kapat şu telefonu! Satılık değiliz!", next: 13 }
                ]
            },

            // 9 (Kovalamaca)
            {
                text: 'E-5\'te film gibi sahne! Kamyonların arasından geçiyorsun. Passat bariyere sürttü ama peşinde!\n\n"Abi bunlar manyak!"',
                choices: [
                    { text: "Ben daha manyağım! Tünel hilesi yapacağım!", next: 16 }, // GPS koparma
                    { text: "Adliyeye az kaldı, dayan!", next: 17 }
                ]
            },

            // 10 (Teslimiyet - Hata)
            {
                text: 'Safça durdun. "Belki konuşuruz" dedin. Passat\'tan inenler arabayı taradı!',
                ending: {
                    money: 0,
                    reputation: -500,
                    type: 'hospital',
                    text: "Araban delik deşik oldu. Yaralandın. Tanık infaz edildi. Mafya ile konuşulmazmış."
                }
            },

            // 11 (İhanet Sonu)
            {
                text: 'Adamı yaka paça aldılar. Bagaja tıktılar. Bir adam cama 2000 Dolar sıkıştırdı.\n\n"Gözün bir şey görmedi kaptan."',
                ending: {
                    money: 2000, // Kirli para
                    reputation: -200,
                    type: 'normal',
                    text: "Parayı aldın ama vicdanın rahat değil. O adam muhtemelen artık yaşamıyor. Adalet sayende öldü."
                }
            },

            // 12 (Son Dakika Kahramanlık)
            {
                text: 'Levyeyi kaptın indin! "Burası benim taksim ulan!"\n\nAdamlar şaşırdı. O sırada siren sesleri! POLİS!',
                choices: [
                    { text: "Polise el salla!", next: 18 }
                ]
            },

            // 13 (İz Kaybettirme)
            {
                text: 'Telefonu denize fırlattı (Sahil yolundasınız). Passat yavaşladı. İzini kaybettirdiniz!',
                choices: [
                    { text: "Şimdi arka sokaklardan Adliye'ye.", next: 17 }
                ]
            },

            // 14 (Delil Saklama)
            {
                text: '"Haklısın... İçinde kayıtlar var..." Sim kartı çıkardı, telefonu kırdı.\n\n"Sim kart bende."',
                choices: [
                    { text: "Aferin. Hadi varıyoruz.", next: 17 }
                ]
            },

            // 15 (Rüşvet İkilemi - Tanık)
            {
                text: 'Tanık sana baktı. Korku dolu. "Abi yapma... Parayı bölüşürüz... Beni satma..."',
                choices: [
                    { text: "Satmam koçum. Şaka yaptım.", next: 13 },
                    { text: "1 Milyon çok para be koçum. Kusura bakma.", next: 11 }
                ]
            },

            // 16 (Tünel Taktiği)
            {
                text: 'Tünele girdin, ışıkları kapattın, ani bir sağ yaptın! Passat düz devam etti.\n\n"Abi sen nesin ya? Jason Statham mısın?"',
                ending: {
                    money: 1000,
                    reputation: 200,
                    type: 'normal',
                    text: "Adliyenin arka kapısına bıraktın. Adam 1000 lira bahşiş bıraktı. Mafyayı atlattın. Efsanesin."
                }
            },

            // 17 (Adliye Varış - Final)
            {
                text: 'Adliye kapısı göründü! Özel Harekat polisleri kapıda bekliyor. Passat geri döndü.\n\n"Yetiştik abi! Yetiştik!"',
                ending: {
                    money: 500,
                    reputation: 400,
                    type: 'police',
                    text: "Tanığı Savcıya bizzat teslim ettin. Savcı elini sıktı: 'Devlet sana minnettar'. Akşam haberlerde 'Gizli Tanık Konuştu, Çete Çökertildi' manşetini gördün."
                }
            },

            // 18 (Polis Müdahalesi)
            {
                text: 'Gerçek polisler geldi! Mafya adamları kaçtı. Tanık kurtuldu.\n\nPolis: "Cesur adammışsı taksici. İfaden lazım."',
                ending: {
                    money: 200,
                    reputation: 300,
                    type: 'police',
                    text: "Karakolda çay içtin. Mafyayı korkutan taksici olarak nam saldın. O gün az kazandın ama çok şey kazandın."
                }
            }
        ]
    },

    // ===== KARAKTER 12: DOĞUM SANCISI (GENİŞLETİLMİŞ HİKAYE) =====
    {
        id: 12,
        name: "Doğum Sancısı",
        avatar: "🤰",
        image: require('./assets/characters/dogum_sancisi.png'),
        location: "Esenler",
        time: "02:00",
        intro: "Hamile kadın (Ayşe) ve kocası (Selim). Kadın iki büklüm, çığlık atıyor. Adam panikten ne yapacağını şaşırmış. 'SU GELDİ! ÇABUK!'",
        dialogue: [
            // 0. GİRİŞ
            {
                text: '"AAAH! GELİYOR! DAYANAMIYORUM!"\n\nSelim: "Abi ne olur en yakın hastane! Çabuk! Karım ölüyor sanırım!"\n\nAdam titriyor.',
                choices: [
                    { text: "Sakin olun! En yakın Kanuni Hastanesi. Basıyorum gaza!", next: 1 },
                    { text: "Arabada doğurmasın? Döşemeler batar!", next: 2 }, // Kaba
                    { text: "Derin nefes al yenge! Ikınma sakın!", next: 3 }
                ]
            },

            // --- YOL 1: ODAKLANMA ---
            // 1
            {
                text: 'Dörtlüleri yaktın, kornaya asıldın. Gece trafiği az ama kırmızı ışıklar var.\n\n"Selim elimimi tut! AAH!"',
                choices: [
                    { text: "Kırmızı ışıkta geçiyorum! Polis görürse durmam!", next: 4 },
                    { text: "Yeşili bekleyelim, kaza yapmayalım.", next: 5 }
                ]
            },

            // --- YOL 2: ENDİŞE ---
            // 2
            {
                text: 'Selim sana öfkeyle baktı: "Döşemeni s...m! Can pazarı var burada! Sür şurayı yoksa seni gebertirim!"',
                choices: [
                    { text: "Tamam tamam, özür dilerim. Sürüyorum.", next: 1 },
                    { text: "Bana bağırma! İn aşağı!", next: 6 }
                ]
            },

            // --- YOL 3: KOÇLUK ---
            // 3
            {
                text: '"Ikınmıyorum! Ama bebek durmuyor! Başını hissediyorum sanki! AAAH!"\nSelim bayılacak gibi: "Abi başı mı dedi?"',
                choices: [
                    { text: "Selim kendine gel! Karına destek ol!", next: 1 },
                    { text: "Eyvah, arabada doğacak galiba. Kenara çekeyim mi?", next: 7 }
                ]
            },

            // --- GELİŞME ---

            // 4 (Kırmızı Işık İhlali)
            {
                text: 'Işıktan fişek gibi geçtin! Yan yoldan çıkan bir tır son anda fren yaptı! KORNA SESLERİ!\n\n"Dikkat et abi! Kaza yapacağız!"',
                choices: [
                    { text: "Merak etme, ben usta şoförüm! Hastane 5 dakika!", next: 8 },
                    { text: "Çok riskli... Biraz yavaşlıyorum.", next: 5 }
                ]
            },

            // 5 (Yavaş/Güvenli Sürüş)
            {
                text: 'Işıkta bekliyorsun. Kadının çığlıkları artıyor.\n\n"NİYE BEKLİYORUZ! DOĞURACAĞIM DİYORUM SANA!"',
                choices: [
                    { text: "Kaza yaparsak hiç gidemeyiz yenge!", next: 9 },
                    { text: "Tamam geçiyorum!", next: 4 }
                ]
            },

            // 6 (Kovma - Felaket)
            {
                text: 'Arabayı sağa çektin. Selim sana saldırdı! Yumruklaştınız!\n\nO sırada kadın: "BEBEK! BEBEK ÇIKTI!"',
                ending: {
                    money: 0,
                    reputation: -1000,
                    type: 'normal',
                    text: "Rezalet. Ambulans geldiğinde sen dayak yemiştin. Bebek kaldırımda doğdu. Haberlere çıktın: 'Vicdansız Taksici'."
                }
            },

            // 7 (Kenara Çekme - Ebe Modu)
            {
                text: 'Kenara çektin. "Yetişemeyiz! Ben hallederim! 3 çocuk büyüttüm ben!"\n\nArkaya geçtin. Selim şokta.',
                choices: [
                    { text: "Ikın yenge! Şimdi! Ikın!", next: 10 },
                    { text: "Yok ben yapamam... Ambulansı arayalım.", next: 11 }
                ]
            },

            // 8 (Polis Takibi)
            {
                text: 'Mavi kırmızı ışıklar! Polis peşinde! "06 plakalı araç sağa çek!"\n\nSelim: "Polis! Durma abi!"',
                choices: [
                    { text: "Duramam! Dörtlüleri yakıp devam ediyorum!", next: 12 },
                    { text: "Duralım, eskortluk yapsınlar.", next: 13 }
                ]
            },

            // 9 (Gecikme)
            {
                text: 'Trafik sıkıştı (gece çalışması). Kadının sesi kesildi.\n\n"Ayşe? Ayşe ses ver!"\n"Bayıldı abi! Çabuk ol!"',
                choices: [
                    { text: "Kaldırıma çıkıyorum!", next: 14 }
                ]
            },

            // 10 (Taksici Ebe)
            {
                text: 'Zorlu bir mücadele... "Geliyor! Başı göründü! Biraz daha!"\n\nVe o ses: "Ingaaaa!"',
                ending: {
                    money: 200, // Temizlik parası eksi
                    reputation: 1000,
                    type: 'hospital',
                    text: "Bebeği kendi ellerinle doğurttun. Göbek bağını ayakkabı bağcığıyla sıktın. Ambulans geldiğinde sen kahramandın. Taksine bir 'Ebe' lakabı takıldı."
                }
            },

            // 11 (Çaresiz Bekleyiş)
            {
                text: 'Ambulans 20 dakika sonra geldi. Çok kan kaybetti kadın.\n\nSağlıkçılar: "Neden getirmediniz?" diye azarladı.',
                ending: {
                    money: 0,
                    reputation: -100,
                    type: 'hospital',
                    text: "Hastaneye yetiştirebilirdin. Korktun. Anne ve bebek iyi ama Selim sana hakkını helal etmedi."
                }
            },

            // 12 (Kaçış Devam)
            {
                text: 'Polis barikat kurdu! Mecbur durdun. Silahlar çekildi!\n\n"İn aşağı!"\n"DOĞUM VAR MEMUR BEY!"',
                choices: [
                    { text: "Kadını göster!", next: 13 }
                ]
            },

            // 13 (Polis Eskortu)
            {
                text: 'Polis durumu gördü. "Aman Allah\'ım! Takip et bizi!"\n\nSirenler açıldı, yollar açıldı. Formula 1 gibi gidiyorsunuz!',
                choices: [
                    { text: "İşte bu! Bas gaza!", next: 15 }
                ]
            },

            // 14 (Kaldırım Şovu)
            {
                text: 'Kaldırımdan, dubaların üzerinden geçtin! Tampon koptu ama durmadın.\n\nHastane kapısı göründü!',
                choices: [
                    { text: "Acile sür!", next: 15 }
                ]
            },

            // --- FİNALLER ---

            // 15 (Mutlu Son - Hastane)
            {
                text: 'Acil kapısına sıfır yanaştın! Sedyeler geldi. Selim Ayşe\'nin elini tuttu.\n\n10 dakika sonra Selim geldi. Ağlıyor...',
                ending: {
                    money: 2000, // Cömert baba
                    reputation: 500,
                    type: 'hospital',
                    text: "Sana sarıldı. 'Oğlum oldu abi! Adını ne koyacağız biliyor musun? Senin adını!' (Ahmet). 2000 Lira bahşiş bıraktı. Tamponun parası çıktı."
                }
            }
        ]
    },

    // ===== KARAKTER 13: EMEKLİ BAŞKOMİSER (GENİŞLETİLMİŞ HİKAYE) =====
    {
        id: 13,
        name: "Emekli Başkomiser",
        avatar: "👮",
        image: require('./assets/characters/emekli_baskomiser.png'),
        location: "Bakırköy",
        time: "11:00",
        intro: "60'lı yaşlarda, çelik gibi sert bakışlı. Elinde bir buket karanfil var. 'Merkezefendi Mezarlığı'na evlat... Eşimi bekletmeyelim.'",
        dialogue: [
            // 0. GİRİŞ
            {
                text: '"35 yıl bu sokaklarda suçlu kovaladım... Şimdi kovaladığım tek şey anılar..."\n\nDikiz aynasından sana bakıyor, analiz ediyor.',
                choices: [
                    { text: "Başınız sağ olsun amirim.", next: 1 },
                    { text: "Suçlu çok mu İstanbul'da?", next: 2 },
                    { text: "Sessizce sürmeye devam et.", next: 3 }
                ]
            },

            // --- YOL 1: SAYGI ---
            // 1
            {
                text: '"Sağ ol evlat. Eşim... Nermin... Beni polis yapan oydu. \'Adaletli ol Rıza\' derdi hep. Olmaya çalıştık işte..."',
                choices: [
                    { text: "Adalet zor zanaat amirim bu devirde.", next: 4 },
                    { text: "Eşiniz gurur duyuyordur eminim.", next: 5 }
                ]
            },

            // --- YOL 2: MESLEKİ SOHBET ---
            // 2
            {
                text: '"Çok... Her sokağın bir günahı var. Ama en kötüsü ne biliyor musun? Çözemediğin dosyalar. Rüyana giren yüzler."',
                choices: [
                    { text: "Var mı öyle aklınızda kalan?", next: 6 },
                    { text: "Unutun gitsin, emeklilik keyfine bakın.", next: 7 }
                ]
            },

            // --- YOL 3: GÖZLEM ---
            // 3
            {
                text: '"Gergin gibisin şoför. Aynaları çok kontrol ediyorsun. Bir sıkıntı mı var?"\n\nAdamın gözünden kaçmıyor.',
                choices: [
                    { text: "Yok amirim, meslek hastalığı.", next: 8 },
                    { text: "Borçlar var, kafa dalgın.", next: 9 }
                ]
            },

            // --- GELİŞME ---

            // 4 (Adalet Tartışması)
            {
                text: '"Zor ama imkansız değil. Bir keresinde bir bakanın oğlunu aldım. Sürdüler beni Kars\'a. Ama pişman değilim. Kanun kanundur."',
                choices: [
                    { text: "Helal olsun amirim.", next: 5 },
                    { text: "Değdi mi peki sürülmeye?", next: 10 }
                ]
            },

            // 5 (Eş Hasreti)
            {
                text: 'Mezarlığa yaklaşıyorsunuz. "O gitti, ev bomboş kaldı. Çocuklar zaten hayrsız... Biri Amerika\'da, biri Bodrum\'da tatilde..."',
                choices: [
                    { text: "Yalnızlık zor.", next: 11 },
                    { text: "Siz de gidin Bodrum'a?", next: 10 }
                ]
            },

            // 6 (Soğuk Vaka - Hikaye)
            {
                text: '"\'Kırmızı Palto\' cinayeti... 1998. 7 yaşında bir kız çocuğu... Katili bulamadık. Dosya zaman aşımına uğradı. Hala o kızın bakışları..."',
                choices: [
                    { text: "Çok üzücü... Belki bir gün çıkar ortaya.", next: 12 },
                    { text: "Kendinizi suçlamayın.", next: 5 }
                ]
            },

            // 7 (Kayıtsızlık - Ters Tepki)
            {
                text: '"Unutulmuyor evlat! Vicdan emekli olmuyor! O yüzden her gece uyanığım ben!"\n\nSesi yükseldi.',
                choices: [
                    { text: "Tamam amirim, sakin olun.", next: 5 }
                ]
            },

            // 8 (Taksici Analizi)
            {
                text: '"İyi şoförsün. Temiz yüzlüsün. Ama gözlerinde bir hüzün var. İstanbul yormuş seni."',
                choices: [
                    { text: "Ekmek parası amirim, yoruyor.", next: 1 }
                ]
            },

            // 9 (Dertleşme)
            {
                text: '"Borç yiğidin kamçısıdır derler ama... Bazen de ipi olur. Dikkat et, kolay para tuzaktır. Ben kaç polisi o tuzağa düşerken gördüm."',
                choices: [
                    { text: "Doğru diyorsun amirim.", next: 1 }
                ]
            },

            // 10 (Sitem)
            {
                text: '"Sürülmeye de değer, yalnız kalmaya da! Yastığa başımı rahat koyuyorum ben! Onlar koyabiliyor mu?"',
                choices: [
                    { text: "En önemlisi o.", next: 11 }
                ]
            },

            // 11 (Vasiyet Gibi)
            {
                text: 'Mezarlık kapısına geldiniz. "Evlat, sana bir nasihat. Aynaya baktığında utanan bir adam görme. Gerisi boş."',
                choices: [
                    { text: "Bu sözü unutmam amirim.", next: 13 },
                    { text: "Sağ olun.", next: 14 }
                ]
            },

            // 12 (İpucu)
            {
                text: '"Geçen hafta bir şey duydum... O dosya ile ilgili... Emekliyim ama peşini bırakmadım. Katil buralarda olabilir..."\n\nDalıyor.',
                choices: [
                    { text: "İnşallah yakalanır.", next: 11 }
                ]
            },

            // --- FİNALLER ---

            // 13 (Kartvizit - Saygı)
            {
                text: 'Cüzdanından bir kartvizit çıkardı. "Rıza Soylu. Başın sıkışırsa ara. Benim emniyette hala hatırım vardır."',
                ending: {
                    money: 200,
                    reputation: 200,
                    type: 'police',
                    text: "200 lira ve Rıza Baba'nın şahsi numarası. Bu şehirde en büyük zırh bu kart olabilir. Bir baba figürü kazandın."
                }
            },

            // 14 (Normal Veda)
            {
                text: 'Karanfilleri aldı, ağır adımlarla mezarlığa girdi. "Bekle Nermin, geldim..." diye mırıldandı.',
                ending: {
                    money: 150,
                    reputation: 100,
                    type: 'normal',
                    text: "150 lira bıraktı. Arkasından bakakaldın. Omuzlarında dünyanın yükü vardı ama dimdik yürüyordu. Onurlu bir adam."
                }
            },

            // 15 (Soğuk Vaka Çözümü - Gizli Final)
            // Bu, belirli bir choice ile değil, şans eseri veya önceki reputation ile tetiklenebilir ama 
            // şimdilik diyalog akışında net bir yere bağlamadım, basit tuttum. 
            // Ama buraya bir ekleme yapabilirim.
            {
                text: 'İnerken durdu. "Şu plakayı not et evlat: 34 VR... O katilin arabası. Görürsen polisi ara."',
                ending: {
                    money: 300,
                    reputation: 300,
                    type: 'police',
                    text: "Sana çok önemli bir bilgi verdi. O plakayı 2 ay sonra gördün, ihbar ettin. 20 yıllık cinayet çözüldü. Rıza Baba seni arayıp ağladı."
                }
            }
        ]
    },

    // ===== KARAKTER 14: FANATİK HOLİGAN (GENİŞLETİLMİŞ HİKAYE) =====
    {
        id: 14,
        name: "Fanatik Holigan",
        avatar: "⚽",
        image: require('./assets/characters/fanatik_holigan.png'),
        location: "Taksim",
        time: "23:00",
        intro: "Formasını giymiş, yüzü boyalı, atkı bağlamış. Elinde yarı sönmüş bir meşale var. 'KADIKÖY! ŞAMPİYON! ÇEK KADIKÖY'E!'",
        dialogue: [
            // 0. GİRİŞ
            {
                text: '"OLEYYY! ŞAMPİYON FENER! Bas gaza abii! Stada yetişmemiz lazım, kutlama var!"\n\nArabanın tavanına vuruyor.',
                choices: [
                    { text: "Tebrikler şampiyon! Tamam gidelim!", next: 1 },
                    { text: "Hop! Arabaya zarar verme! İndiririm bak!", next: 2 },
                    { text: "Ben futboldan anlamam, sakin ol.", next: 3 }
                ]
            },

            // --- YOL 1: UYUM SAĞLAMA ---
            // 1
            {
                text: '"Sen kralsın abi! Aç radyoyu! Marş yok mu marş? Sarııı!"\n\nAvazı çıktığı kadar bağırıyor.',
                choices: [
                    { text: "Laciivert! En büyük Fener!", next: 4 }, // Taraftar modu
                    { text: "Radyo bozuk kardeşim, idare et.", next: 5 }
                ]
            },

            // --- YOL 2: OTORİTE ---
            // 2
            {
                text: '"Aman be abi! Ne kıymetli araban varmış! Taksiciler odası başkanı mısın? Sür işte parasını vereceğiz!"',
                choices: [
                    { text: "Para değil mesele, saygı. Düzgün otur.", next: 5 },
                    { text: "İn aşağı, seni çekemem.", next: 6 }
                ]
            },

            // --- YOL 3: İLGİSİZLİK ---
            // 3
            {
                text: '"Anlamaz mısın? Nasıl Türk\'sün sen abi? Takımsız hayat mı olur? Kesin Galatasaraylısın sen!"\n\nŞüpheyle bakıyor.',
                choices: [
                    { text: "Yok valla takım tutmam.", next: 5 },
                    { text: "Evet Galatasaraylıyım, ne olacak?", next: 7 }
                ]
            },

            // --- GELİŞME ---

            // 4 (Coşku)
            {
                text: '"İŞTE BU! ŞAMPİYON! Abi camı aç, meşale yakacağım!"\n\nÇakmağı çıkardı.',
                choices: [
                    { text: "Yak koçum! Kadıköy yanıyor!", next: 8 },
                    { text: "Sakın! Döşemeyi yakarsın, ceza yeriz!", next: 9 }
                ]
            },

            // 5 (Sakin Yolculuk?)
            {
                text: 'Köprü girişinde trafik durdu. Yan arabada rakip takım taraftarları var! Size el hareketi çektiler!\n\n"ABİ DUR! İNECEĞİM! DÖVECEĞİM ONLARI!"',
                choices: [
                    { text: "Durma sakın! Kapıları kilitle!", next: 10 },
                    { text: "İn ne halin varsa gör.", next: 11 }
                ]
            },

            // 6 (Kovma)
            {
                text: 'Sağa çektin. Adam sinirle indi, kapıyı tekmeledi!\n\n"Cimconun uşağı seni!" diye bağırdı.',
                ending: {
                    money: 0,
                    reputation: -50,
                    type: 'normal',
                    text: "Kapıda göçük var. Para da alamadın. Holiganla uğraşmak pişmanlıktır."
                }
            },

            // 7 (Rakip Takım İtirafı)
            {
                text: 'Adamın yüzü değişti. "İndir beni. Ben hainle yolculuk yapmam. Dur lan dur!"',
                choices: [
                    { text: "Saçmalama kardeşim, alt tarafı spor.", next: 12 },
                    { text: "İn hadi, paran da senin olsun.", next: 6 }
                ]
            },

            // 8 (Meşale Riski)
            {
                text: 'Meşaleyi yaktı! Araba duman altı oldu! Tavan hafif karardı. Ama adam çok mutlu.\n\n"GELİYORUZ ULAN!"',
                choices: [
                    { text: "Öksürerek sürmeye devam et.", next: 13 }
                ]
            },

            // 9 (Otorite Devam)
            {
                text: '"Tamam be abi, öf... Ne sıkıcı adamsın."\n\nMeşaleyi bıraktı. Somurtuyor.',
                choices: [
                    { text: "Kadıköy'e geldik, hadi iyisin.", next: 14 }
                ]
            },

            // 10 (Kavga Engelleme)
            {
                text: 'Kapıları kilitledin. Adam camı yumrukluyor, küfrediyor. Yan araba uzaklaştı.\n\n"Kaçtılar abi! Yoksa öldürürdüm onları!"',
                choices: [
                    { text: "Değmez koçum, hapse mi gireceksin?", next: 14 },
                    { text: "Sakinleş artık.", next: 14 }
                ]
            },

            // 11 (Kavgaya İzin)
            {
                text: 'Kilitleri açtın. Adam otoyolda indi, diğer arabaya koştu! Trafik kilitlendi. Kavga çıktı!',
                ending: {
                    money: 0,
                    reputation: -100,
                    type: 'police',
                    text: "Polis geldi, herkesi topladı. Sen de ifada vermeye gittin. 'Holiganı neden indirdin otobanda?' dediler."
                }
            },

            // 12 (Ders Verme)
            {
                text: '"Spor dostluktur kardeşim. Ben seni taşıyorum, ekmeğime bakıyorum. Sen de keyfine bak."\n\nAdam biraz utandı.',
                choices: [
                    { text: "Hadi barışalım.", next: 14 }
                ]
            },

            // 13 (Dumanlı Varış)
            {
                text: 'Stada vardınız. Araba yanmış plastik kokuyor. Taraftarlar arabayı sallamaya başladı sevgi gösterisi olarak!',
                ending: {
                    money: 500, // Bol bahşiş
                    reputation: 150,
                    type: 'normal',
                    text: "500 lira aldın ama araba temizliği 300 tutar. Yine de o coşku görülmeye değerdi. 'Taksi Reisi' diye tezahürat yaptılar sana."
                }
            },

            // 14 (Normal Varış)
            {
                text: 'Heykelin orada indirdin. Kalabalığa karıştı.\n\n"Sağ ol abi! ŞAMPİYON FENER!"',
                ending: {
                    money: 200,
                    reputation: 50,
                    type: 'normal',
                    text: "200 lira. Normal bir sefer. Adamın enerjisi seni de yordu ama. Kafa şişiren bir yolculuktu."
                }
            }
        ]
    },

    // ===== KARAKTER 15: DEPRESİF MÜZİSYEN (GENİŞLETİLMİŞ HİKAYE) =====
    {
        id: 15,
        name: "Depresif Müzisyen",
        avatar: "🎸",
        image: require('./assets/characters/depresif_muzisyen.png'),
        location: "Beyoğlu",
        time: "04:00",
        intro: "Sırtında gitar çantası, üstü başı dağınık. Gözleri boşluğa bakıyor. Fısıldayarak: 'Köprüye... Boğaz Köprüsü'ne...'",
        dialogue: [
            // 0. GİRİŞ
            {
                text: '"Köprüye sür abi... Ortasında duramaz mısın? Sadece manzaraya bakacağım... Son kez..."\n\nSesi titriyor.',
                choices: [
                    { text: "Köprüde durmak yasak kardeşim.", next: 1 },
                    { text: "Son kez mi? Ne yapacaksın?", next: 2 },
                    { text: "Gece gece ne manzarası?", next: 3 }
                ]
            },

            // --- YOL 1: KURALCILIK ---
            // 1
            {
                text: '"Yasak... Her şey yasak zaten... Yaşamak da yasak olmalı bana... Lütfen abi, sadece bir dakika..."',
                choices: [
                    { text: "Senin niyetin bozuk. Polise gidiyoruz.", next: 4 },
                    { text: "Gel bir çorba içelim, kendinde değilsin.", next: 5 }
                ]
            },

            // --- YOL 2: ŞÜPHE ---
            // 2
            {
                text: '"Gideceğim işte... Bıktım bu şehirden, bu gürültüden, bu sessizlikten... Gitarımı da denize atacağım."',
                choices: [
                    { text: "Gitarına yazık değil mi? Pahalıya benziyor.", next: 6 },
                    { text: "Atma, bana ver o zaman.", next: 7 } // Ters psikoloji
                ]
            },

            // --- YOL 3: KAYITSIZLIK ---
            // 3
            {
                text: '"Karanlığı izleyeceğim... Kendi karanlığımı... Neyse, sen sür paranı alacaksın."',
                choices: [
                    { text: "Ben o parayı almam, seni de köprüye götürmem.", next: 5 },
                    { text: "Tamam, götürüyorum.", next: 8 } // Riskli
                ]
            },

            // --- GELİŞME ---

            // 4 (Polis Tehdidi)
            {
                text: '"Hayır! Polis istemiyorum! Deliler hastanesine kapatırlar yine! İndir beni!"\n\nKapıyı açmaya çalışıyor.',
                choices: [
                    { text: "Kilitledim! Senin iyiliğin için!", next: 9 },
                    { text: "Tamam sakin ol, polis yok.", next: 5 }
                ]
            },

            // 5 (İyileştirici Sohbet)
            {
                text: 'Sahil yoluna saptın. "Boşver köprüyü. Gel denize karşı oturalım biraz."\n\nAdam şaşırdı. "Neden?"',
                choices: [
                    { text: "Çünkü ben de senin gibi hissettim zamanında.", next: 10 },
                    { text: "Müşteri değil, misafirsin şu an.", next: 10 }
                ]
            },

            // 6 (Sanat Sohbeti)
            {
                text: '"Yazık... Bana yazık değil mi? Beste yapıyorum, kimse dinlemiyor. Barda çaldım, kovdular. Yeteneksizim ben..."',
                choices: [
                    { text: "Belki yanlış yerde çaldın.", next: 11 },
                    { text: "Bana bir parça çal, ben karar vereyim.", next: 12 }
                ]
            },

            // 7 (Ters Psikoloji)
            {
                text: '"Sana mı vereyim? Hah... Al senin olsun. Zaten bir işe yaramıyor."\n\nÇıkarıp uzattı. Eli titriyor.',
                choices: [
                    { text: "Al gitarı, kenara koy.", next: 13 },
                    { text: "Şaka yaptım, o senin ruhun.", next: 6 }
                ]
            },

            // 8 (Riskli Sürüş)
            {
                text: 'Köprüye yaklaşıyorsunuz. Adam emniyet kemerini çözdü. Eli kapı kolunda. Çok tehlikeli!',
                choices: [
                    { text: "Kapıları kilitle!", next: 9 },
                    { text: "Ani fren yap!", next: 14 }
                ]
            },

            // 9 (Kriz Anı)
            {
                text: 'Adam kriz geçiriyor. Ağlıyor, bağırıyor. "Bırakın gideyim!"\n\nBu iş seni aşıyor olabilir.',
                choices: [
                    { text: "En yakın hastaneye sür.", next: 15 }
                ]
            },

            // 10 (Umut Aşığı)
            {
                text: 'Arabayı stop ettin. Sessizlik. "Kimse beni dinlemedi abi... Babam bile \'çalgıcı\' dedi..."',
                choices: [
                    { text: "Ben dinliyorum. Anlat.", next: 16 }
                ]
            },

            // 11 (Mekan Önerisi)
            {
                text: '"Her yerde çaldım... Ama benim müziğim hüzünlü. İnsanlar eğlenmek istiyor, oynamak istiyor..."',
                choices: [
                    { text: "Hüzün de lazım bu dünyaya. Sen devam et.", next: 16 }
                ]
            },

            // 12 (Mini Konser)
            {
                text: 'Gitarı eline aldı. Tıngırdatmaya başladı. Hüzünlü ama muhteşem bir melodi... Tüylerin diken diken oldu.',
                choices: [
                    { text: "Oğlum sen harikasın! Bu ne yetenek!", next: 17 },
                    { text: "Devam et, çok güzel.", next: 17 }
                ]
            },

            // 13 (Emanet)
            {
                text: '"Al abi. Ben gidince satarsın. Mezar taşıma katkın olur..."\n\nUmutsuzluk son safhada.',
                choices: [
                    { text: "Hayır kardeşim. Bu gitar seninle yaşayacak.", next: 10 }
                ]
            },

            // 14 (Ani Müdahale)
            {
                text: 'Fren yaptın! Adam öne savruldu. "Ne yapıyorsun deli misin?!" diye bağırdı. Şok etkisi yarattı.',
                choices: [
                    { text: "Asıl sen deli misin? Ölmek çözüm mü sandın?", next: 10 }
                ]
            },

            // --- FİNALLER ---

            // 15 (Hastane Sonu - Güvenli)
            {
                text: 'Bakırköy Ruh ve Sinir Hastalıkları Acil\'e getirdin. Güvenlikler aldı. Doktor: "İyi ki getirdin, durumu kritik."',
                ending: {
                    money: 0,
                    reputation: 200,
                    type: 'hospital',
                    text: "Para almadın. Ama bir trajediyi önledin. Adam tedaviye alındı. Belki sana kızdı ama bir gün teşekkür edecek."
                }
            },

            // 16 (Sahil Sohbeti - Dostluk)
            {
                text: 'Sabaha kadar konuştunuz. Simit sarayından çay aldın. Güneş doğarken adamın yüzünde hafif bir gülümseme belirdi.',
                ending: {
                    money: 0,
                    reputation: 400,
                    type: 'normal',
                    text: "Para yoktu cebinde. Gitarıyla sana bir şarkı besteledi: 'Gece Taksi'. Belki de ünlü olacak. Sen bir hayat kurtardın, sözlerinle."
                }
            },

            // 17 (Umut Işığı - Konser)
            {
                text: 'Sana çaldıktan sonra gözleri parladı. "Beğendin mi? Gerçekten mi?"\n\n"Evet" dedin. "Yarın bir daha dene."',
                ending: {
                    money: 100, // Cebindeki son para
                    reputation: 300,
                    type: 'normal',
                    text: "Sana cebindeki son 100 lirayı verdi. 'Bu ilk konserimin bileti olsun' dedi. Eve değil, stüdyoya bıraktın. Müziğin gücü galip geldi."
                }
            }
        ]
    },

    // ===== KARAKTER 16: ŞÜPHELİ KURYE (GENİŞLETİLMİŞ) =====
    {
        id: 16,
        name: "Şüpheli Kurye",
        avatar: "📦",
        image: require('./assets/characters/supheli_kurye.png'),
        location: "Zeytinburnu",
        time: "01:30",
        intro: "Elinde dondurucu özellikli metal bir çanta. Alnından ter damlıyor. 'Sarıyer'e! Çok acil! Durma sakın!'",
        dialogue: [
            // 0. GİRİŞ
            {
                text: '"Bas gaza kaptan! Arkana bakma! Sadece sür! Dakikalarımız var!"\n\nÇantayı kucağına bastırıyor. Çantadan bip sesi geliyor.',
                choices: [
                    { text: "O çanta ne? Bomba mı taşıyoruz?", next: 1 },
                    { text: "Tamam abi, sakin ol.", next: 2 },
                    { text: "Polisi arıyorum, bu ne hal?", next: 3 }
                ]
            },

            // --- YOL 1: ŞÜPHE ---
            // 1
            {
                text: '"Ne bombası be! Daha değerli... Hayat meselesi! Soru sorma, 2 katını öderim!"\n\nDikiz aynasından siyah bir minibüsün sizi takip ettiğini gördün.',
                choices: [
                    { text: "Takip ediliyoruz! Kim onlar?", next: 4 },
                    { text: "İn arabamdan! Belaya bulaşmam!", next: 5 }
                ]
            },

            // --- YOL 2: İTAAT ---
            // 2
            {
                text: '"Aferin. İşini yap, paranı al. Ama hızlanman lazım, buzlar çözülüyor..."\n\nBuz mu?',
                choices: [
                    { text: "Organ mı taşıyorsun sen?", next: 6 },
                    { text: "Gaza basıyorum.", next: 7 }
                ]
            },

            // --- GELİŞME ---

            // 3 (Polis Tehdidi)
            {
                text: 'Telefonuna uzandın. Adam belinden silahını gösterdi!\n\n"O telefonu bırak şoför. Kimse zarar görsün istemem. Sür sadece."',
                choices: [
                    { text: "Tamam abi... Büyüksün...", next: 7 },
                    { text: "Frene asıl ve in!", next: 8 }
                ]
            },

            // 4 (Takip)
            {
                text: '"Ruslar... Mal onların sanıyorlar. Düşür onları şoför! Ara sokağa gir!"\n\nMinibüs tamponuna vurdu!',
                choices: [
                    { text: "Sıkı tutun! Drift atıyorum!", next: 9 },
                    { text: "Duruyorum! Beni öldürürler!", next: 10 }
                ]
            },

            // 5 (Kovma Girişimi)
            {
                text: '"İnemem! Yolun ortasında bırakamazsın! Çocuk ölecek!"\n\nÇocuk mu? Ağzından kaçırdı.',
                choices: [
                    { text: "Ne çocuğu? Ne var o çantada?", next: 11 },
                    { text: "Umrumda değil, in!", next: 8 }
                ]
            },

            // 6 (Organ İtirafı)
            {
                text: '"Böbrek... 8 yaşındaki bir kız çocuğu için. Babası mafya değil, sadece zengin bir çaresiz. Ruslar ise organı istiyor..."',
                choices: [
                    { text: "Vay şerefsizler! Yakalatmam o böbreği!", next: 9 },
                    { text: "Bu iş yasadışı. Polise gitmeliyiz.", next: 12 }
                ]
            },

            // 7 (Hızlı Sürüş)
            {
                text: 'Otobanda makas atıyorsun. Çanta ötüyor.\n\n"Sıcaklık artıyor! Daha hızlı! Yoksa çöp olacak!"',
                choices: [
                    { text: "Emniyet şeridine giriyorum!", next: 13 }, // Polis riski
                    { text: "Bu kadar hız yeter, kaza yaparız.", next: 14 }
                ]
            },

            // 8 (Ani Fren/İndirme)
            {
                text: 'Frene asıldın! Adam başını cama vurdu. Çanta düştü, açıldı. Buzların içinde kanlı bir poşet...\n\nO sırada siyah minibüs durdu, adamlar indi.',
                ending: {
                    money: 0,
                    reputation: -100,
                    type: 'hospital',
                    text: 'Ruslar seni de adamı da bayılttı. Uyandığında hastanedeydin. Çanta gitmişti. Başın büyük belada, polis ifadenizi bekliyor.'
                }
            },

            // 9 (Aksiyon/Kaçış)
            {
                text: 'Direksiyonu kırdın! Ara sokaklarda izini kaybettirdin. Minibüs duvara çarptı.\n\n"Helal olsun be! İşte şoförlük!"',
                choices: [
                    { text: "Sarıyer'e devam! O çocuğu kurtaralım.", next: 15 }
                ]
            },

            // 10 (Teslim olma)
            {
                text: 'Sağa çektin. Ruslar geldi. Adamı ve çantayı aldılar. Sana da bir zarf fırlattılar.\n\n"Gördüğünü unut."',
                ending: {
                    money: 1000,
                    reputation: -300,
                    type: 'normal',
                    text: 'Zarfta 1000 dolar vardı. Ama o gece uyuyamadın. O böbrek kime gitti? Vicdanın rahat değil.'
                }
            },

            // 11 (Gerçek)
            {
                text: '"Lösemi ilacı... Kaçak getirttik. Gümrükte takıldı, biz de çaldık. Çocuğun bu geceye ihtiyacı var!"',
                choices: [
                    { text: "Madem çocuk var, basalım!", next: 7 },
                    { text: "Yalan söylüyorsun.", next: 3 }
                ]
            },

            // 12 (Polise Gitme)
            {
                text: 'Rotayı karakola kırdın. Adam fark etti.\n\n"Bunu yapma! Bürokrasi yüzünden organ ölecek! Katil olursun!"',
                choices: [
                    { text: "Yasa yasadır.", next: 16 },
                    { text: "Haklısın... Dönüyorum.", next: 7 }
                ]
            },

            // 13 (Polis Çevirmesi)
            {
                text: 'Polis çevirdi! "Ehliyet ruhsat!"\n\nAdam fısıldadı: "Görmezden gel, bas git! Yoksa ikimiz de yanarız."',
                choices: [
                    { text: "Polisten kaçamam.", next: 16 },
                    { text: "Gaza basıp kaç!", next: 17 }
                ]
            },

            // 14 (Geç Kalma)
            {
                text: 'Yavaş gittin. Trafiğe takıldınız. Çantadaki bip sesi uzun bir "BİİİİP" sesine dönüştü.\n\nAdamın yüzü bembeyaz oldu. "Bitti... Isındı..."',
                ending: {
                    money: 100,
                    reputation: -50,
                    type: 'normal',
                    text: 'Organ bozuldu. Adam ağlayarak indi. "Katil sensin" dedi. O 100 lirayı harcarken elin titredi.'
                }
            },

            // FİNALLER

            // 15 (Başarılı Teslimat)
            {
                text: 'Villanın kapısına fren yaparak durdun! Doktorlar koştu, çantayı aldı.\n\nBir saat sonra adam çıktı: "Taktıler şoför. Operasyon başarılı."',
                ending: {
                    money: 2000, // Büyük ödül
                    reputation: 300,
                    type: 'normal',
                    text: '2000 TL ve bir babanın duası. "Hayat kurtaran taksici" oldun. Belki yasadışıydı ama doğruydu.'
                }
            },

            // 16 (Karakol Sonu)
            {
                text: 'Karakola çektin. Polisler etrafınızı sardı. Çantaya el kondu.\n\nKomiser: "Organ kaçakçılığı ha? Anlat bakalım."',
                ending: {
                    money: 0,
                    reputation: 50,
                    type: 'police',
                    text: 'Sabaha kadar nezarethanede kaldın. Organ bozuldu. Adam tutuklandı. Yasalara uydun ama bir hayat söndü.'
                }
            },

            // 17 (Kovalamaca Sonu Kaza)
            {
                text: 'Polisten kaçarken kontrolü kaybettin! Araba takla attı!\n\nHer yer cam kırığı...',
                ending: {
                    money: 0,
                    reputation: -500,
                    type: 'hospital',
                    text: 'Gözünü hastanede açtın. Araba pert. Ehliyetin gitti. Adam yoğun bakımda. Değdi mi?'
                }
            }
        ]
    },

    // ===== KARAKTER 17: KAÇAK AŞIKLAR (GENİŞLETİLMİŞ) =====
    {
        id: 17,
        name: "Kaçak Aşıklar",
        avatar: "💑",
        image: require('./assets/characters/kacak_asiklar.png'),
        location: "Ataşehir",
        time: "03:00",
        intro: "Nefes nefese genç bir çift. Kızın gelinliği yırtık, oğlanın gömleği kanlı. 'Sür abi! Abimler peşimizde! Öldürecekler!'",
        dialogue: [
            // 0
            {
                text: '"Otogar değil! İzmit\'e sür! İstanbul\'dan çıkmamız lazım!"\n\nArkadan silah sesi duyuldu! BAM!',
                choices: [
                    { text: "Silah mı?! İnin aşağı başımı yakmayın!", next: 1 },
                    { text: "Yatın yere! Basıyorum!", next: 2 }
                ]
            },

            // 1
            {
                text: '"Abi n\'olur! Hamileyim ben! O çocuğa kıyma!""\n\nKız karnını tutuyor. Yalan mı gerçek mi?',
                choices: [
                    { text: "Hamile mi? Tamam lanet olsun, biniyoruz!", next: 2 },
                    { text: "Yalan söylüyorsun, inin!", next: 3 }
                ]
            },

            // 2
            {
                text: 'Arka cam patladı! Siyah bir BMW peşinizde! Uzun namlulu silah çıkardılar!\n\nOğlan: "Abi sağa kır! Orman yoluna!"',
                choices: [
                    { text: "Orman yolu tehlikeli! Otoyoldan kaçalım!", next: 4 },
                    { text: "Tamam, ormana giriyorum!", next: 5 }
                ]
            },

            // 3 (Felaket)
            {
                text: 'İndirdin. Arkadan gelen BMW durdu. İçinden inenler çifti zorla arabaya bindirdi. Kız çığlık attı.',
                ending: {
                    money: 0,
                    reputation: -200,
                    type: 'normal',
                    text: 'Gözünün önünde götürdüler. Sabah haberlerde "Töre Cinayeti" haberini gördün. Vicdanın sızladı.'
                }
            },

            // 4 (Otoyol Kaçışı)
            {
                text: 'Otoyolda 180\'le gidiyorsun! BMW tamponunda! Oğlan cebinden bir çakı çıkardı.\n\n"Yaklaşırlarsa atlayacağım!"',
                choices: [
                    { text: "Saçmalama otur oturduğun yerde!", next: 6 },
                    { text: "Polisi arıyorum, başka çare yok!", next: 7 }
                ]
            },

            // 5 (Orman Yolu)
            {
                text: 'Karanlık yola girdin. Farlarını kapattın. BMW geçti gitti.\n\n"Atlattık mı? Oh be..."',
                choices: [
                    { text: "Burada bekleyelim sabaha kadar.", next: 8 },
                    { text: "Yürüyerek devam edin, araba dikkat çeker.", next: 9 }
                ]
            },

            // 6
            {
                text: 'BMW yanına geldi, sana vurmaya çalışıyor! Direksiyon hakimiyetin zorlaşıyor.',
                choices: [
                    { text: "Frene basıp arkalarına geç!", next: 10 },
                    { text: "Onlara vur ve yoldan at!", next: 11 } // Çok riskli
                ]
            },

            // 7 (Polis)
            {
                text: 'Polisi aradın. "Konum atın geliyoruz!"\n\nBMW bunu fark etti, kaçtı. Ama polis sizi durdurdu.',
                end: {
                    type: 'police',
                    money: 0,
                    reputation: 100,
                    text: "Karakolda ifade verdin. Çift koruma altına alındı. Aileleri tutuklandı. Güvenli ama parasız bir son."
                }
            },

            // 8 (Ormanda Doğum?)
            {
                text: 'Beklerken kız sancılandı! "AHHH! SUYUM GELDİ!"\n\nHamileliği gerçekmiş!',
                choices: [
                    { text: "Eyvah! Ebe miyim ben?", next: 12 },
                    { text: "Hastaneye gitmeliyiz, risk alıp!", next: 4 }
                ]
            },

            // 9
            {
                text: 'İndirdin. Karanlıkta kayboldular. Uzaktan silah sesleri geldi...\n\nSonra sessizlik.',
                ending: {
                    money: 0,
                    reputation: -100,
                    type: 'normal',
                    text: 'Ne olduğunu öğrenemedin. Belki kaçtılar, belki vuruldular. Belirsizlik en kötüsü.'
                }
            },

            // 10
            {
                text: 'Arkalarına geçtin! Plakayı aldın. Polise bildirdin.\n\nÇift: "Abi bizi Bolu\'ya kadar götür, 5000 lira veririz!"',
                ending: {
                    money: 5000,
                    reputation: 200,
                    type: 'normal',
                    text: 'Bolu\'ya kadar sürdün. Yoruldun ama değdi. Yeni bir hayata başladılar. Sen de iyi para kazandın.'
                }
            },

            // 11 (Kaza)
            {
                text: 'BMW\'ye vurdun! İki araç da bariyerlere girdi! Ortalık savaş alanı!',
                ending: {
                    money: 0,
                    reputation: -300,
                    type: 'hospital',
                    text: 'Herkes yaralı. Hastanede polis başında bekliyor. "Kasten adam öldürmeye teşebbüs". Geçmiş olsun.'
                }
            },

            // 12 (Orman Doğumu)
            {
                text: 'Arka koltukta doğum başladı. Telefon çekmiyor. Sabah güneş doğarken bir bebek ağlaması duyuldu...',
                ending: {
                    money: 0,
                    reputation: 500,
                    type: 'normal',
                    text: 'Bebeğin göbeğini çakıyla kestin. "Umut" koydular adını. Araban battı ama bir mucizeye şahit oldun.'
                }
            }
        ]
    },

    // ===== KARAKTER 18: DEFİNECİ DAYI (GENİŞLETİLMİŞ) =====
    {
        id: 18,
        name: "Defineci Dayı",
        avatar: "🗺️",
        image: require('./assets/characters/defineci_dayi.png'),
        location: "Sarıyer",
        time: "23:45",
        intro: "Üstü başı çamur içinde, gözleri faltaşı gibi. Elinde paslı bir kürek ve eski harita. 'Belgrad Ormanı! Hemen! Cinler gelmeden!'",
        dialogue: [
            // 0
            {
                text: '"Bulduuum! Sonunda yeri buldum! Ama yalnız gidemem... Korkuyorum... Gel benimle, yarı yarıya!"',
                choices: [
                    { text: "Ben taksiciyim dayı, kazı yapmam.", next: 1 },
                    { text: "Ne buldun? Altın mı?", next: 2 },
                    { text: "Cinler mi? Sen kafayı yemişsin.", next: 3 }
                ]
            },

            // 1
            {
                text: '"Taksiciysen ne olmuş? Zengin olmak istemiyor musun? Bizans Kralı\'nın hazinesi! Tonlarca altın!"',
                choices: [
                    { text: "İkna oldum. Gidelim bakalım.", next: 4 },
                    { text: "İstemem, in aşağı.", next: 5 }
                ]
            },

            // 2
            {
                text: '"Altın ne kelime! Yakut, zümrüt, tılsımlı kolyeler! Ama bekçisi var... Tılsımı kırmak gerek."',
                choices: [
                    { text: "Büyü işlerine bulaşmam.", next: 1 },
                    { text: "Nasıl kıracağız?", next: 4 }
                ]
            },

            // 3
            {
                text: '"Gülme! Sesleri duymuyor musun? Fısıldıyorlar! \'Gel\' diyorlar... Haritayı onlar verdi bana!"',
                choices: [
                    { text: "Adam deli... En yakın akıl hastanesine.", next: 6 },
                    { text: "Tamam dayı, ormana götüreyim sen ne yaparsan yap.", next: 7 }
                ]
            },

            // 4 (Ormana Giriş)
            {
                text: 'Ormanın derinliklerine girdiniz. Araba farları sisli ağaçları aydınlatıyor. Dayı titriyor.\n\n"Şurada! O meşe ağacının altı! Küreği al!"',
                choices: [
                    { text: "Ben kazmam, sen kaz.", next: 8 },
                    { text: "Ver küreği, başlayalım.", next: 9 }
                ]
            },

            // 5
            {
                text: 'Adamı indirdin. Küfür ederek karanlığa yürüdü. Arkasından garip uluma sesleri geldi...',
                ending: {
                    money: 0,
                    reputation: 0,
                    type: 'normal',
                    text: 'Eve döndün. Sabah gazetede "Belgrad Ormanı\'nda Parçalanmış Ceset" haberi... Suçluluk hissettin.'
                }
            },

            // 6 (Hastane)
            {
                text: 'Hastaneye sürdün. Adam fark edince saldırdı! "Beni kapatamazsınız! Altınlarım!"',
                ending: {
                    money: 0,
                    reputation: 100,
                    type: 'hospital',
                    text: 'Güvenlikler zor zapt etti. Adam şizofreni krizi geçiriyormuş. Doktor teşekkür etti. Define hayali suya düştü.'
                }
            },

            // 7
            {
                text: 'Orman girişinde bıraktın. "Beni bekle evlat! Zengin döneceğiz!" dedi ve gitti. 1 saat geçti...',
                choices: [
                    { text: "Daha fazla beklemem, dönerim.", next: 10 },
                    { text: "Merak ettim, peşinden gideyim.", next: 11 }
                ]
            },

            // 8
            {
                text: 'Adam kazmaya başladı. "Kling!" Kürek bir şeye çarptı! "AHA! SANDIK!"',
                choices: [
                    { text: "Aç bakalım!", next: 12 },
                    { text: "Dur! Jandarma geliyor olabilir.", next: 13 }
                ]
            },

            // 9
            {
                text: 'Kazıyorsun... Toprak yumuşak. Bir kemik çıktı. Sonra bir kafatası! Bu bir mezar!',
                choices: [
                    { text: "Dayı bu hazine değil, ceset!", next: 14 },
                    { text: "Devam et, belki altında altın vardır.", next: 12 }
                ]
            },

            // 10
            {
                text: 'Bastın gittin. Parasını bile alamadın.',
                ending: {
                    money: 0,
                    reputation: -10,
                    type: 'normal',
                    text: 'Boşuna mazot yaktın. Define işleri boş işler.'
                }
            },

            // 11
            {
                text: 'Ağaçların arasında adamı buldun. Kendi kendine konuşuyor, boş bir çukura bakıyor. "Hani? Nerede?"',
                ending: {
                    money: 0,
                    reputation: 0,
                    type: 'normal',
                    text: 'Çukur boştu. Adam ağlayarak yere yığıldı. Onu teselli edip eve bıraktın. Hazine yokmuş.'
                }
            },

            // 12 (Sandık Açılıyor)
            {
                text: 'Sandığı açtınız... İçi... BOŞ! Sadece bir not: "Açgözlülük en büyük lanettir".\n\nVe etrafınızı Jandarma sardı! "Yat yere!"',
                ending: {
                    money: 0,
                    reputation: -200,
                    type: 'police',
                    text: 'Kaçak kazıdan tutuklandınız. Nezarethanede sabahladın. Araban bağlandı. 30 bin TL ceza yedin.'
                }
            },

            // 13
            {
                text: 'Jandarma değil ama... Ormandan hırıltılar geliyor. Bir yaban domuzu sürüsü!',
                ending: {
                    money: 0,
                    reputation: -50,
                    type: 'hospital',
                    text: 'Kaçarken düştün, bacağını kırdın. Domuzlar sizi kovaladı. Hastanede alçılı bacakla yattın.'
                }
            },

            // 14
            {
                text: '"Sus! Ölülerin altın dişi olur!" Adam kafatasını kırmaya çalışıyor! Mide bulandırıcı!',
                ending: {
                    money: 0,
                    reputation: -100,
                    type: 'normal',
                    text: 'Küreği bırakıp kaçtın. Bu kadarı fazla. Ruh hastasıyla işim olmaz dedin.'
                }
            }
        ]
    },

    // ===== KARAKTER 19: YOUTUBER VELET (GENİŞLETİLMİŞ) =====
    {
        id: 19,
        name: "Youtuber Velet",
        avatar: "🤳",
        image: require('./assets/characters/youtuber_velet.png'),
        location: "Nişantaşı",
        time: "15:30",
        intro: "Elinde son model kamera, sürekli konuşuyor. 'Selam Çeteee! Bugün efsane bir vlogla karşınızdayım! Taksi Abi ile MAKAS KRALLIĞI yapacağız!'",
        dialogue: [
            // 0
            {
                text: '"Abi kameraya el salla! Canlı yayındayız! 500 bin izleyici var! Bugün rekor kıracağız!"\n\nKamerayı yüzüne sokuyor.',
                choices: [
                    { text: "İndir o kamerayı, dikkatim dağılıyor.", next: 1 },
                    { text: "Selam Çete! Taksiniz emrinizde!", next: 2 },
                    { text: "Bu yolculuk ücretli ama, reklamını yaparım.", next: 3 }
                ]
            },

            // 1
            {
                text: '"Abi yapma ya! İzleyiciler aksiyon istiyor! \'Taksici çok gergin\' yazıyorlar chate. Hadi biraz eğlenelim!"',
                choices: [
                    { text: "Eğlence istiyorsan lunaparka.", next: 4 },
                    { text: "Tamam, ne istiyorlar?", next: 5 }
                ]
            },

            // 2
            {
                text: '"İşte bu enerji lazım! Abi chat diyor ki: \'E-5\'te Makas Show yapsın, 10 bin like atacağız!\' Var mısın?"',
                choices: [
                    { text: "Makas tehlikeli. Yapmam.", next: 4 },
                    { text: "10 bin like mı? Kemerleri bağla!", next: 6 } // Mini-game hook
                ]
            },

            // 3
            {
                text: '"Reklam mı? Tabi abi! Instagram\'ını veririm, patlarsın! Ama önce şu sol şeridi bir ağlatman lazım!"',
                choices: [
                    { text: "Ben kurallara uyarım.", next: 4 },
                    { text: "Hadi bakalım, basıyorum!", next: 6 }
                ]
            },

            // 4 (Sıkıcı Sürüş)
            {
                text: 'Kurallara uygun, yavaş sürdün. Çocuk oflayıp pufladı.\n\n"Abi çok sıkıcısın... Yayını kapatıyorum. İzleyici düştü..."',
                ending: {
                    money: 0,
                    reputation: -20,
                    type: 'normal',
                    text: 'Çocuk inerken surat astı. Para vermedi. "Dislike attım abi" dedi. Güvenli ama keyifsiz.'
                }
            },

            // 5
            {
                text: '"Ters yöne gir diyorlar! Ha ha ha! Abi yaparsan efsane olur! Donation yağıyor şu an!"',
                choices: [
                    { text: "Ölmek mi istiyorsun? Asla!", next: 4 },
                    { text: "Sadece bir sokak için... Tamam!", next: 7 } // Çok riskli
                ]
            },

            // 6 (MAKAS SHOW)
            {
                text: 'Gaza kökledin! Araçların arasından zikzak çiziyorsun! (Burada sürüş oyunu devreye girebilir)\n\n"ALLAHIM SANA GELİYORUZ! ÇOK İYİ ABİ!"',
                choices: [
                    { text: "Daha bitmedi! Drift geliyor!", next: 8 },
                    { text: "Yeter bu kadar, kalbim dayanmaz.", next: 9 }
                ]
            },

            // 7 (Ters Yön)
            {
                text: 'Ters yöne girdin! Karşıdan kamyon geliyor! KORNA SESLERİ!\n\nÇocuk çığlık atıyor: "BU BİR ŞAKAYDIIII!"',
                ending: {
                    money: 0,
                    reputation: -500,
                    type: 'hospital',
                    text: 'Kamyondan kaçarken duvara girdin. Kamera kırıldı. Çocuk hastanelik. Canlı yayında kaza yaptığın için ehliyetin gitti.'
                }
            },

            // 8 (Aşırı Hız)
            {
                text: 'Drift atarken polis sireni duyuldu! Arkanda Yunuslar var!\n\n"POLİS! ÇETEEE POLİS GELDİ! KAÇ ABİ KAÇ!"',
                choices: [
                    { text: "Polisten kaçamam, duruyorum.", next: 10 },
                    { text: "Beni yakalayamazlar!", next: 11 } // Kovalamaca
                ]
            },

            // 9 (Güvenli Bitiş)
            {
                text: 'Hızı kestin. Çocuk nefes nefese.\n\n"Abi naptın sen ya... Elim ayağım titriyor... Ama video trendlere girdi!"',
                ending: {
                    money: 500,
                    reputation: 100,
                    type: 'normal',
                    text: '500 lira verdi. YouTube\'da "ÇILGIN TAKSİCİ" videosu 1 milyon izlendi. Artık ünlüsün.'
                }
            },

            // 10 (Polis Durdurma)
            {
                text: 'Sağa çektin. Polis geldi. Kamerayı kapattırdı.\n\n"Trafiği tehlikeye atmaktan ceza yiyeceksin."',
                ending: {
                    money: 0,
                    reputation: -100,
                    type: 'police',
                    text: '5000 lira ceza yedin. Çocuk videoyu sildi, kaçtı. "Abi kusura bakma" bile demedi.'
                }
            },

            // 11 (Kovalamaca Sonu)
            {
                text: 'Polisten kaçarken kontrolü kaybettin, kaldırıma çıktın! Araba dumanlar içinde.\n\nPolisler silah doğrulttu: "İn aşağı!"',
                ending: {
                    money: 0,
                    reputation: -300,
                    type: 'police',
                    text: 'Nezarethanedesin. Çocuk "Taksici beni kaçırdı" diye ifade verdi! İftira attı velet! Fenomen olmak başa bela.'
                }
            }
        ]
    },

    // ===== KARAKTER 20: GECE KULÜBÜ FEDAİSİ (GENİŞLETİLMİŞ) =====
    {
        id: 20,
        name: "Yaralı Fedai",
        avatar: "🕶️",
        image: require('./assets/characters/gece_kulubu_fedaisi.png'),
        location: "Bebek",
        time: "04:30",
        intro: "2 metre boyunda, takım elbiseli bir dev. Ama gömleği kan içinde. 'Hastaneye değil... Depoya sür. Kimse görmesin.'",
        dialogue: [
            // 0
            {
                text: '"Abi vuruldum... Kasıkta... Çok kan yok ama temizlenmesi lazım... Hastane olmaz, kayda girmemeli..."',
                choices: [
                    { text: "Sen mafya mısın? Hastane şart!", next: 1 },
                    { text: "Tamam, nereye diyorsan oraya.", next: 2 },
                    { text: "Arabamı kanlettin! İn aşağı!", next: 3 }
                ]
            },

            // 1
            {
                text: '"Hastane olursa polis gelir! Polis gelirse ben biterim, sen de bitersin! Sür şu lanet arabayı!"\n\nSilahını gösterdi.',
                choices: [
                    { text: "Tamam sakin ol, sürüyorum.", next: 2 },
                    { text: "Sıkacaksan sık, hastaneye gidiyoruz.", next: 4 }
                ]
            },

            // 2
            {
                text: 'Yola çıktınız. Yarası kötü görünüyor. Adam terliyor.\n\n"Mekanda... Oğluymuş... Bilmiyordum... Patronun oğlunu dövdüm..."',
                choices: [
                    { text: "Patronun oğlunu mu? Neden?", next: 5 },
                    { text: "Sus, enerjini harcama.", next: 6 }
                ]
            },

            // 3 (İndirme)
            {
                text: 'Adamı indirmeye çalıştın. Sana bir tokat attı, dünya karardı!',
                ending: {
                    money: 0,
                    reputation: -50,
                    type: 'hospital',
                    text: 'Gözünü açtığında kaldırımdaydın. Adam arabanı çalmış! Sonra araba terk edilmiş bulundu. Bulaşmamak lazımdı.'
                }
            },

            // 4 (İnatlaşma)
            {
                text: 'Hastaneye sürdün. Adam küfretti ama hali kalmadı. Kapıda yığıldı. "Beni yaktın..." dedi.',
                ending: {
                    money: 0,
                    reputation: 100,
                    type: 'police',
                    text: 'Polise teslim ettin. Adam aranan bir tetikçiymiş! Ödül aldın ama vicdanın rahat mı? Adamı sattın.'
                }
            },

            // 5
            {
                text: '"Kıza sarkıntılık ediyordu... Zorla... Dayanamadım... Kim olduğunu bilseydim..."\n\nPişman ama onurlu.',
                choices: [
                    { text: "Helal olsun. Doğrusunu yapmışsın.", next: 7 },
                    { text: "Profesyonel değilmişsin.", next: 6 }
                ]
            },

            // 6
            {
                text: 'Depoya yaklaşıyorsunuz. Arkada farlar yandı. Siyah Sedan.\n\n"Geldiler... Patronun adamları... Beni infaz edecekler..."',
                choices: [
                    { text: "Kaçalım! Atlatırım ben onları!", next: 8 }, // Mini-game hook
                    { text: "Beni karıştırma, in burada.", next: 9 }
                ]
            },

            // 7
            {
                text: '"İnsanım lan ben! Köpek değilim! Ama şimdi köpek gibi öleceğiz..."\n\nTakip eden araba ateş açtı!',
                choices: [
                    { text: "Başını eğ!", next: 8 },
                    { text: "Teslim olalım.", next: 10 }
                ]
            },

            // 8 (ÇATIŞMA / KAÇIŞ)
            {
                text: 'Ters şeride girdin! Mermiler kaportayı deliyor! Adam camdan karşılık veriyor! ÇATIŞMANIN ORTASINDASIN!',
                choices: [
                    { text: "Lastiklerine nişan al!", next: 11 },
                    { text: "Ben sadece süreceğim, sen hallet!", next: 12 }
                ]
            },

            // 9 (İhanet?)
            {
                text: 'Sağa çektin. Adam sana baktı. "Korkak..."\n\nİndi ve karanlıkta kayboldu. Silah sesleri duyuldu.',
                ending: {
                    money: 0,
                    reputation: -100,
                    type: 'normal',
                    text: 'Kaçtı mı vuruldu mu bilmedin. Ama o gece uyuyamadın. Bir kahramanı ölüme mi terk ettin?'
                }
            },

            // 10 (Teslimiyet)
            {
                text: 'Durdun. Adamlar geldi. Fedaiyi aldılar. Sana dokunmadılar.\n\n"Görgü tanığı yok." dediler.',
                ending: {
                    money: 5000,
                    reputation: -500,
                    type: 'normal',
                    text: 'Arka koltuğa 5000 TL attılar. Kan parası. Fedaiyi götürdüler. Bir daha haber alınamadı.'
                }
            },

            // 11 (Lastik Patlatma)
            {
                text: 'Adam ateş etti! Arkadaki aracın lastiği patladı! Takla attılar!\n\n"VURDUK! HAH! VURDUK!"',
                ending: {
                    money: 1000,
                    reputation: 200,
                    type: 'normal',
                    text: 'Depoya vardınız. Arkadaşları onu karşıladı. Sana 1000 TL verdiler. "Racon kesen taksici" dediler senin için.'
                }
            },

            // 12 (Başarılı Kaçış)
            {
                text: 'Ara sokaklara daldın. İzlerini kaybettirdin.\n\nAdam yaralı halde gülümsedi: "Eyvallah usta... Hayatımı kurtardın."',
                ending: {
                    money: 500,
                    reputation: 150,
                    type: 'hospital',
                    text: 'Depodaki gizli doktora bıraktın. Adam kurtuldu. Sen de arabanın deliklerini tamir ettirmek zorunda kaldın.'
                }
            }
        ]
    },

    // ===== KARAKTER 21: FALCI KADIN =====
    {
        id: 21,
        name: "Falcı Kadın",
        avatar: "🔮",
        image: require('./assets/characters/falci_kadin.png'),
        location: "Fatih",
        time: "16:00",
        intro: "Mor şallar içinde, elinde tarot kartları. 'Evladım seni bekliyordum... Gel, Sultanahmet'e gidelim.'",
        dialogue: [
            { text: '"Senin falına baktım evladım... Büyük bir yolculuk var hayatında...""\n\nKartları karıştırıyor.', choices: [{ text: "Fala inanmam.", next: 1 }, { text: "Ne görüyorsunuz?", next: 2 }] },
            { text: '"İnanmaz mısın? Ama kartlar yalan söylemez... Bak burada Kılıç Ası var..."', choices: [{ text: "Bu ne demek?", next: 3 }, { text: "Tamam teyze, nereye gidiyoruz?", next: 4 }] },
            { text: '"Büyük bir değişim... Bir kadın var hayatında... Ona dikkat et...""\n\nGözleri parladı.', choices: [{ text: "Hangi kadın?", next: 5 }, { text: "Boş iş bunlar.", next: 4 }] },
            { text: '"Kılıç Ası... Savaş, mücadele demek... Ama zafer de var sonunda..."', choices: [{ text: "İlginç...", next: 5 }, { text: "Eyvallah, Sultanahmet'e gidelim.", next: 4 }] },
            { text: 'Sultanahmet\'e yaklaşırken kadın birden durdu.\n\n"Burada dur evladım. Bir şey göstereceğim sana."', choices: [{ text: "Ne göstereceksin?", next: 6 }, { text: "Acele etmen lazım mı?", next: 7 }] },
            { text: '"O kadın... Kalbini kıracak. Ama sonra gerçek aşkı bulacaksın...""\n\nGülümsedi.', choices: [{ text: "Kim bu kadın?", next: 7 }, { text: "Nasıl biliyorsun?", next: 7 }] },
            { text: 'Kadın cüzdanından para çıkardı. Bir de küçük bir muska.\n\n"Al bunu. Seni korur."', ending: { money: 200, reputation: 30, type: 'normal', text: "200 lira ve bir muska. Falcının sözleri kulağında kaldı. 3 ay sonra... Gerçekten bir kadın kalbini kırdı. Tesadüf mü?" } },
            { text: 'Kadın gizemli gülümsemesiyle indi.\n\n"Görüşürüz evladım... Kartlar tekrar buluşacağımızı söylüyor..."', ending: { money: 150, reputation: 40, type: 'normal', text: "150 lira aldın. Kadın kayboldu kalabalıkta. Ama o bakış... Sanki gerçekten bir şey biliyordu." } }
        ]
    },

    // ===== KARAKTER 22: TURİST ÇİFT =====
    {
        id: 22,
        name: "Turist Çift",
        avatar: "🧳",
        image: require('./assets/characters/turist_cift.png'),
        location: "Sultanahmet",
        time: "10:00",
        intro: "Amerikalı çift, harita ellerinde. 'Hello! Galata Tower please! We are lost!'",
        dialogue: [
            { text: '"Hello driver! Galata Tower? How much?""\n\nAdamın aksanı komik.', choices: [{ text: "100 lira. (Normal fiyat)", next: 1 }, { text: "300 lira. (Turist fiyatı)", next: 2 }] },
            { text: '"100? Okay okay, very cheap! Thank you!""\n\nMutlu oldular.', choices: [{ text: "Welcome to Istanbul!", next: 3 }, { text: "Where are you from?", next: 4 }] },
            { text: '"300? Hmm... Okay, I guess.""\n\nŞüpheli baktılar ama bindiler.', choices: [{ text: "(Vicdanın sızlıyor)", next: 5 }, { text: "Devam et.", next: 6 }] },
            { text: '"Istanbul is beautiful! We love Turkish coffee!""\n\nKadın fotoğraf çekiyor.', choices: [{ text: "En iyi kahveci nerede anlatayım.", next: 7 }, { text: "Galata'ya yaklaştık.", next: 8 }] },
            { text: '"We are from Texas! You know, cowboys!""\n\nKovboy şapkasını gösterdi.', choices: [{ text: "Haha nice hat!", next: 3 }, { text: "I love American movies!", next: 3 }] },
            { text: 'Yolda düşündün. 300 lira çok fazlaydı. Turistleri kazıklamak doğru mu?', choices: [{ text: "100 lira olsun aslında.", next: 9 }, { text: "Para para.", next: 6 }] },
            { text: 'Galata\'ya vardınız. Adam 300 lira verdi.\n\n"Thank you! But... Other taxi said 80 lira..."', ending: { money: 300, reputation: -50, type: 'normal', text: "300 lira aldın ama adamın bakışı... Utandın. TripAdvisor'a kötü yorum yazacaklar kesin." } },
            { text: 'En iyi kahveciyi anlattın. Adam not aldı!\n\n"Wow, you are best driver! Here, extra tip!"', ending: { money: 200, reputation: 80, type: 'normal', text: "200 lira + 50 dolar bahşiş! Turistler çok mutluydu. TripAdvisor'a 5 yıldız verdiler. Sen efsane oldun." } },
            { text: 'Galata\'ya vardınız.\n\n"Thank you! Istanbul people are nice!""\n\nKadın selfie çekti seninle.', ending: { money: 100, reputation: 60, type: 'normal', text: "100 lira aldın. Dürüst oldun. Turistler mutlu gitti. İstanbul'un yüzünü ağarttın." } },
            { text: '"Actually, I made mistake. It is 100 lira.""\n\nAdam şaşırdı:\n\n"Really? You are honest man!"', ending: { money: 100, reputation: 100, type: 'normal', text: "100 lira aldın ama 100 dolar bahşiş verdiler! 'Turkish people are amazing!' dediler. Dürüstlük kazandırır." } }
        ]
    },

    // ===== KARAKTER 23: PİYANGO TALİHLİSİ =====
    {
        id: 23,
        name: "Piyango Talihlisi",
        avatar: "🎰",
        image: require('./assets/characters/piyango_talihlisi.png'),
        location: "Bakırköy",
        time: "14:00",
        intro: "Elinde piyango bileti, eller titriyor. 'Abi kazandım! 1 MİLYON LİRA! Milli Piyango'ya git!'",
        dialogue: [
            { text: '"KAZANDIM ABI! BAK ŞU BİLETE! 1 MİLYON!""\n\nBilet gerçek görünüyor.', choices: [{ text: "Ciddi misin? Tebrikler!", next: 1 }, { text: "Emin misin kontrol ettin mi?", next: 2 }] },
            { text: '"VALLAHI KAZANDIM! 40 yıldır oynuyorum! SONUNDA!""\n\nAdamın elleri titriyor.', choices: [{ text: "40 yıl mı? Vay be!", next: 3 }, { text: "Dikkat et, dolandırıcılar var.", next: 4 }] },
            { text: '"Kontrol ettim abi! 3 kere! Numaralar tuttu!""\n\nGözleri dolu.', choices: [{ text: "Hayırlı olsun!", next: 3 }, { text: "Peki ne yapacaksın parayla?", next: 5 }] },
            { text: '"40 yıl abi! Her ay bilet aldım! Karım kızdı, komşular güldü! Ama şimdi...""\n\nAğlıyor.', choices: [{ text: "Sabır zaferin anahtarı.", next: 5 }, { text: "Milli Piyango'ya gidelim hemen.", next: 6 }] },
            { text: '"Dolandırıcı mı? Hayır abi, resmi bayiden aldım! Video çektim!"', choices: [{ text: "İyi düşünmüşsün.", next: 6 }, { text: "Yine de dikkat et.", next: 6 }] },
            { text: '"Parayla mı? Önce borçları öderim... Sonra çocuklara ev... Bana da küçük bir araba..."', choices: [{ text: "Mütevazı adammışsın.", next: 7 }, { text: "Ferrari al abi!", next: 8 }] },
            { text: 'Milli Piyango\'ya vardınız. Adam indi, döndü.\n\n"Abi sen benim şanslı taksicimsin! Numaranı al!"', ending: { money: 500, reputation: 50, type: 'normal', text: "500 lira bahşiş verdi. 1 hafta sonra aradı: 'Para yattı abi! Ferrari değil ama sana hediye var!' Bir altın saat gönderdi." } },
            { text: '"Mütevazı mı? 40 yıl fakirlik gördüm abi. Zenginlik şımartmaz beni."', ending: { money: 300, reputation: 80, type: 'normal', text: "300 lira aldın. Adam gerçekten kazanmıştı. 6 ay sonra haber çıktı: 'Mütevazı Milyoner Okul Yaptırdı!' Güzel insanlar var hala." } },
            { text: '"Ferrari mi? Hahaha! Olur mu abi? Ben fakir kalmaya alışığım!""\n\nAma gözleri parladı.', ending: { money: 200, reputation: 40, type: 'normal', text: "200 lira aldın. Adam düşünceli indi. 3 ay sonra Instagram'da gördün: Ferrari almış! 'Taksici haklıydı' yazmış." } }
        ]
    },

    // ===== KARAKTER 24: KEKO TİMİ =====
    {
        id: 24,
        name: "Keko Timi",
        avatar: "🚬",
        image: require('./assets/characters/keko_timi.png'),
        location: "Bağcılar",
        time: "23:00",
        intro: "3 kişi bindiler. Eşofmanlılar, çok gürültülüler. 'ABIIII! Beşiktaş'a bas! Kafa yapacağız!'",
        dialogue: [
            { text: '"ABI ÇAK BİRAZ MÜZİK! BASS BASS!""\n\nBiri sigara yakmaya çalışıyor.', choices: [{ text: "Arabada sigara olmaz!", next: 1 }, { text: "Tamam, müzik açayım.", next: 2 }] },
            { text: '"Ya abi niye öyle yapıyon? Bi tane içeriz işte!""\n\nSinirli bakıyorlar.', choices: [{ text: "Olmaz dedim, yasak.", next: 3 }, { text: "Camı aç, hızlı iç.", next: 4 }] },
            { text: 'Müzik açtın. Bass çok yüksek.\n\n"EFSANE ABI! SEN ADAMSIN!""\n\nArabada zıplıyorlar.', choices: [{ text: "Koltuğa dikkat edin!", next: 5 }, { text: "Eğlenin bakalım.", next: 6 }] },
            { text: '"Yasak mı? Abi sen buralı değil misin? Her yerde içiyoruz!"\n\nKahkaha atıyorlar.', choices: [{ text: "Benim arabam, benim kurallarım.", next: 7 }, { text: "Tamam şimdilik kapat.", next: 6 }] },
            { text: 'Biri sigarayı yaktı. Duman yayıldı.\n\n"Küçük bir sigara abi, relax!"', choices: [{ text: "İndirin beni!", next: 8 }, { text: "Son kez, bir daha olmaz.", next: 6 }] },
            { text: 'Arabada koltuğu bozdular.\n\n"Pardon abi, kazara oldu hahaha!"', choices: [{ text: "Bedelini ödersiniz!", next: 9 }, { text: "Sorun değil.", next: 6 }] },
            { text: 'Beşiktaş\'a yaklaşıyorsunuz. Çocuklar sakinleşti.\n\n"Abi kusura bakma, biraz aşırıya kaçtık..."', choices: [{ text: "Gençsiniz, anlarım.", next: 10 }, { text: "Dikkat edin bir dahakine.", next: 10 }] },
            { text: '"Abi sen çok kasıntısın ya! Neyse, şurda indir bizi.""\n\nPara atmadan kaçmaya çalıştılar!', choices: [{ text: "KAPILARI KİLİTLE!", next: 11 }, { text: "POLISI ARA!", next: 12 }] },
            { text: 'Arabayı durdurdun, onları indirdin.\n\n"GİDİN BAŞKA TAKSİYE BİNİN!"', ending: { money: 0, reputation: -20, type: 'normal', text: "Para almadın ama sokakta kaldılar. Bazen müşteri seçmek gerekir." } },
            { text: '"Bedelini mi? Tamam abi, al şu 500 lirayı! Kırmızı olma!""\n\nKorkarak ödediler.', ending: { money: 500, reputation: 20, type: 'normal', text: "500 lira koltuk hasarı için. Çocuklar ürktü. Bundan sonra dikkat ederler belki." } },
            { text: 'Ödemeleri yapıp indiler.\n\n"Abi sen adamın dibisin! Numara ver, yine bineriz!"', ending: { money: 200, reputation: 10, type: 'normal', text: "200 lira aldın. Numara vermedin tabii. Ama çocuklar iyi çıktı sonuçta." } },
            { text: 'Kapıları kilitledin! Çocuklar panik.\n\n"ABI ŞAKA ŞAKA! PARA VAR CEBIMIZDE!"', ending: { money: 300, reputation: 30, type: 'normal', text: "300 lira zorla aldın. 'Bir daha taksiciye numare yapmayın!' dedin. Ders oldu." } },
            { text: 'Polisi aradın. Ekip geldi.\n\n"Şoför bey şikayetçi misiniz?"', ending: { money: 150, reputation: 50, type: 'police', text: "Karakola gittiniz. Çocukların ailesi ödeme yaptı. 150 lira + özür. Hukuk kazandı." } }
        ]
    },

    // ===== KARAKTER 25: UZAYLI (KILIK DEĞİŞTİRMİŞ) =====
    {
        id: 25,
        name: "Uzaylı (Kılık Değiştirmiş)",
        avatar: "👽",
        image: require('./assets/characters/uzayli.png'),
        location: "Orman Yolu",
        time: "04:00",
        intro: "İnsana benziyor ama teni hafif yeşil mi? Gözlerini hiç kırpmıyor. 'Havalimanı. Acil.'",
        dialogue: [
            { text: 'Adam garip konuşuyor. Kelimeleri tek tek söylüyor.\n\n"Ben. Uçak. Binmek. İstemek."', choices: [{ text: "Yabancı mısınız?", next: 1 }, { text: "Tamam, havalimanı.", next: 2 }] },
            { text: '"Yabancı? Evet. Çok... uzak... yerden.""\n\nGökyüzüne baktı.', choices: [{ text: "Nereden geliyorsunuz?", next: 3 }, { text: "Tamam, gidiyoruz.", next: 4 }] },
            { text: 'Havalimanına gidiyorsunuz. Adam hiç kırpmadan bakıyor.\n\n"Senin araç. İlginç. Nasıl çalışmak?"', choices: [{ text: "Benzinle çalışıyor.", next: 5 }, { text: "Sen nereden geldin?", next: 3 }] },
            { text: '"Ben gelmek... Yukarıdan.""\n\nParmağıyla gökyüzünü gösterdi. Çok yukarıyı.', choices: [{ text: "Yukarı mı? Uçakla mı?", next: 6 }, { text: "Uzaylı mısın?", next: 7 }] },
            { text: 'Dikiz aynasından baktın. Adamın gözleri PARLAK YEŞİL!\n\n"Dikkat et. Yola bak."', choices: [{ text: "(Korkarak yola bak)", next: 8 }, { text: "Gözlerin parlıyor!", next: 9 }] },
            { text: '"Benzin? Sıvı yakıt mı? İlkel ama işlevsel.""\n\nNot almaya başladı. Garip sembollerle.', choices: [{ text: "O ne yazı?", next: 9 }, { text: "Devam edelim.", next: 4 }] },
            { text: '"Uçak değil. Gemi. Ama sizin geminiz değil.""\n\nGülümsedi. Dişleri çok beyaz ve düzgün.', choices: [{ text: "Uzaylı mısın?!", next: 7 }, { text: "Ne gemisi?", next: 7 }] },
            { text: '"Uzaylı kelimesi. Doğru değil. Biz sadece... komşu.""\n\nSakin gülümsedi.', choices: [{ text: "Dünyaya neden geldin?", next: 10 }, { text: "Buna inanmıyorum.", next: 11 }] },
            { text: 'Havalimanına vardınız. Adam indi, dönüp baktı.\n\n"Sen. İyi insan. Biz hatırlamak."', ending: { money: 1000, reputation: 50, type: 'normal', text: "Adam garip bir para verdi. EVE GİDİNCE BAKTIN: Altın sikke! 1000 lira değerinde! O adam kimdi?" } },
            { text: '"Semboller? Bizim dil. Sen okuyamaz. Henüz.""\n\nKağıdı gösterdi. Anlaşılmaz işaretler.', choices: [{ text: "Fotoğraf çekebilir miyim?", next: 12 }, { text: "Tamam, devam edelim.", next: 4 }] },
            { text: '"Neden gelmek? Gözlemlemek. Öğrenmek. Belki... yardım.""\n\nGözleri yumuşadı.', ending: { money: 500, reputation: 100, type: 'normal', text: "Adam kayboldu kalabalıkta. Ama SENİ ARAMADI. Belki onu bir UFO aldı. Belki de... her şey hayal." } },
            { text: '"İnanmak? Gerek yok. Ben gitmek. Sen unutmak.""\n\nGözlerinin içine baktı. Birden hafızana sis çöktü.', ending: { money: 200, reputation: 0, type: 'normal', text: "Ne oldu hatırlamıyorsun. Sadece 200 lira kazandın. Ve garip bir his. Sanki bir şey unutmuşsun..." } },
            { text: '"Hayır fotoğraf. Değil izin.""\n\nTelefon birden KAPANDI. Pil doluyor ama çalışmıyor.', ending: { money: 300, reputation: 30, type: 'normal', text: "Telefon 10 dakika sonra açıldı. Adam çoktan gitmişti. Galeride garip bir görüntü: BOŞLUK. Siyah bir kare." } }
        ]
    },

    // ===== KARAKTER 26: PİZZACI ÇOCUK =====
    {
        id: 26,
        name: "Pizzacı Çocuk",
        avatar: "🍕",
        image: require('./assets/characters/pizzaci_cocuk.png'),
        location: "Levent",
        time: "19:50",
        intro: "Motoru bozulmuş. Elinde 5 kutu pizza. Ağlamak üzere. 'Abi 10 dakikaya yetiştirmem lazım!'",
        dialogue: [
            { text: '"Abi motor bozuldu! 5 sipariş var! 10 dakikada yetiştiremezsem patron beni kovar!""\n\nGözleri dolu.', choices: [{ text: "Gel bin, yetiştiririz!", next: 1 }, { text: "10 dakika zor.", next: 2 }] },
            { text: '"Patron çok kötü abi! Para kesintisi yapıyor! Annem hasta, ilaçları almalıyım!""\n\nÇocuk 17-18 yaşında.', choices: [{ text: "Üzülme, bas gaza!", next: 3 }, { text: "Hangi adresler?", next: 4 }] },
            { text: '"Zor ama denemem lazım abi! Lütfen!""\n\nYalvarıyor.', choices: [{ text: "Tamam, bin hadi!", next: 1 }, { text: "Neyse, deneyelim.", next: 3 }] },
            { text: 'Gaza bastın! Çocuk adresleri okuyor.\n\n"Şurada bir tanesi! Sonra Maslak!"', choices: [{ text: "Sırayla gidelim.", next: 5 }, { text: "En yakından başla.", next: 5 }] },
            { text: '"4 adres var abi: Levent, Maslak, Etiler, 4. Levent!"', choices: [{ text: "Planladım, sırayla gideriz.", next: 5 }, { text: "Hepsini mi? Deli misin?", next: 6 }] },
            { text: 'İlk adrese vardınız! Çocuk koşarak gitti.\n\nGeri geldi: "BİR TANE TAMAM! Müşteri püf demedi!"', choices: [{ text: "Devam, 3 adres kaldı!", next: 7 }, { text: "Hızlı ol!", next: 7 }] },
            { text: '"Deli değilim abi, çaresizim! Annemin ilaçları bu paraya bağlı!""\n\nSesi titredi.', choices: [{ text: "Tamam kardeş, yaparız.", next: 5 }, { text: "Hadi o zaman!", next: 5 }] },
            { text: '2 adres daha hallettiniz! Son adres kaldı: 4. Levent.\n\n"ABI SON 2 DAKİKA!"', choices: [{ text: "YETİŞİRİZ!", next: 8 }, { text: "Çok zor ama deneyelim.", next: 8 }] },
            { text: 'Son adrese VARAmadınız. 30 saniye geç.\n\nAma müşteri pizza bozuk demedi!\n\n"YETİŞTİK ABI!"', ending: { money: 300, reputation: 80, type: 'normal', text: "Çocuk 300 lira bahşiş verdi. 'Abi sen melekmişsin! Annem ilaçlarını alacak!' Gözyaşları içinde teşekkür etti." } },
            { text: 'SON ADRESE 10 SANİYE KALA YETİŞTİNİZ!\n\nÇocuk zıplayarak döndü: "EFSANE!"', ending: { money: 400, reputation: 100, type: 'normal', text: "400 lira bahşiş! Çocuk TikTok'a video attı: 'Bu taksici hayat kurtardı!' Viral oldunuz. Hayat güzel." } }
        ]
    },

    // ===== KARAKTER 27: SARHOŞ DAMAT (2. VERSİYON) =====
    {
        id: 27,
        name: "Düğünden Kaçan Gelin",
        avatar: "👰",
        image: require('./assets/characters/dugun_gelin.png'),
        location: "Çamlıca",
        time: "00:30",
        intro: "Gelinlik içinde, makyaj akmış. 'Beni uzağa götür abi... En uzağa...'",
        dialogue: [
            { text: '"Kaçtım abi... Düğünden kaçtım...""\n\nGelinliği çamurlu ve yırtık.', choices: [{ text: "Ne oldu?", next: 1 }, { text: "Nereye gidelim?", next: 2 }] },
            { text: '"O adam... Sahte çıktı... Başka karısı varmış...""\n\nHıçkırarak ağlıyor.', choices: [{ text: "Düğün günü mü öğrendin?", next: 3 }, { text: "Çok üzgünüm.", next: 4 }] },
            { text: '"Uzağa... Deniz kenarına belki... Nefes almam lazım..."', choices: [{ text: "Kilyos'a gidelim.", next: 5 }, { text: "Sakin ol önce.", next: 4 }] },
            { text: '"Nikahtan 10 dakika önce biri geldi... Başka eşi... 2 çocuğuyla!""\n\nKahkaha attı, ağladı.', choices: [{ text: "İnanamıyorum.", next: 5 }, { text: "Şerefsiz.", next: 5 }] },
            { text: '"Üzgünsün değil mi? Herkes üzgün... Ben rezil oldum... 300 davetli önünde..."', choices: [{ text: "Sen değil, o rezil.", next: 6 }, { text: "Zaman her şeyi düzeltir.", next: 6 }] },
            { text: 'Kilyos\'a gidiyorsunuz. Gece deniz huzurlu.\n\n"Abi... Buraya geldiğime iyi mi yaptım?"', choices: [{ text: "Evet, nefes al.", next: 7 }, { text: "Bazen kaçmak gerekir.", next: 7 }] },
            { text: '"O serefsiz... Herkes önünde beni aptal yerine koydu!""\n\nAma birden sakinleşti.', choices: [{ text: "En azından şimdi öğrendin.", next: 7 }, { text: "Hayat devam eder.", next: 7 }] },
            { text: 'Deniz kenarına vardınız. Kadın indi, derin nefes aldı.\n\n"Sağ ol abi... Şu anda en çok buna ihtiyacım vardı..."', ending: { money: 500, reputation: 100, type: 'normal', text: "500 lira verdi. 'Gelinliği denize atacağım!' dedi. Ve gerçekten attı. Kahkahalar attıkça iyileşti. Hayat yeniden başlar." } }
        ]
    },

    // ===== KARAKTER 28: MAFYA BABASI =====
    {
        id: 28,
        name: "Mafya Babası",
        avatar: "🎩",
        image: require('./assets/characters/mafya_babasi.png'),
        location: "Nişantaşı",
        time: "02:00",
        intro: "Pahalı takım elbise, altın yüzükler. 2 koruma yanında. 'Şoför, Kartal'a süresin var. Ağzını sıkı tut.'",
        dialogue: [
            { text: '"Kartal\'a git. Yolda kimseyle konuşma. İsimler söylenecek, duymadın.""\n\nSesi buz gibi.', choices: [{ text: "Anladım efendim.", next: 1 }, { text: "Tehlikeli bir iş mi bu?", next: 2 }] },
            { text: 'Adam telefonda konuşuyor:\n\n"Mehmet\'i halledin. Yarına kalmaz.""\n\nKapattı. Sana baktı.', choices: [{ text: "(Duymazdan gel)", next: 3 }, { text: "(Korkuyla bak)", next: 4 }] },
            { text: '"Tehlikeli mi? Senin için değil. Eğer akıllıysan.""\n\nGülümsedi ama gözleri soğuk.', choices: [{ text: "Akıllıyım efendim.", next: 1 }, { text: "Anladım.", next: 3 }] },
            { text: 'Yolda gidiyorsunuz. Korualardan biri:\n\n"Patron, takip var.""\n\nHerkes gergin.', choices: [{ text: "(Hızlan)", next: 5 }, { text: "(Korku içinde sur)", next: 5 }] },
            { text: '"Benim korkmana gerek yok şoför. Ben kötü adamlarla savaşıyorum.""\n\nGerçekten mi?', choices: [{ text: "Siz iyi adamsınız yani?", next: 6 }, { text: "Anladım efendim.", next: 3 }] },
            { text: 'Arkadan gelen araba yaklaştı! Silah sesleri!\n\n"YERE YATIŞ!" diye bağırdı biri.', choices: [{ text: "(Yere yat, saklan)", next: 7 }, { text: "(Gaza bas, kaç)", next: 8 }] },
            { text: '"Ben mi? Ben bu şehrin dengesiyim şoför. Olmadan kaos olur.""\n\nBir sigara yaktı.', ending: { money: 5000, reputation: -30, type: 'normal', text: "Kartal'a vardınız. 5000 lira verdi. 'İyi sürdün. Numaranı aldım. Belki bir gün lazım olur.' Umarım olmaz." } },
            { text: 'Çatışma bitti. Korumalar galip geldi.\n\n"Şoför sağlam çıktın. Takdir ettim."', ending: { money: 10000, reputation: -50, type: 'normal', text: "10.000 lira verdi. 'Sen cesaretli adamsın.' Ama artık isimleri biliyorsun. Bu tehlikeli." } },
            { text: 'Hızla kaçtınız! Takipçiler geride kaldı.\n\nAdam güldü: "İyi sürücüymüşsün. Bizimle çalışmak ister misin?"', ending: { money: 3000, reputation: -20, type: 'normal', text: "Teklifi reddettın. 3000 lira aldın. 'Akıllı karar.' dedi. Ama her köşe başında onu göreceksin artık." } }
        ]
    },

    // ===== KARAKTER 29: ÇILGIN BİLİM ADAMI =====
    {
        id: 29,
        name: "Çılgın Bilim Adamı",
        avatar: "🧪",
        image: require('./assets/characters/cilgin_bilim_adami.png'),
        location: "Pendik",
        time: "03:00",
        intro: "Laboratuvar önlüğü, dağınık saçlar. Elinde tuhaf bir kutu. 'TÜBİTAK'a! Acil! Dünya tehlikede!'",
        dialogue: [
            { text: '"DÜNYA TEHLİKEDE! Bu kutu... Bu kutunun içinde insanlığın kurtuluşu var!""\n\nEller titriyor.', choices: [{ text: "Ne var kutuda?", next: 1 }, { text: "Sakin ol, TÜBİTAK'a gidelim.", next: 2 }] },
            { text: '"Enerji! SINIRSIZ ENERJİ! 50 yıl çalıştım! Sonunda başardım!""\n\nKutuyu öpüyor.', choices: [{ text: "50 yıl mı?", next: 3 }, { text: "Sonsuz enerji ha?", next: 4 }] },
            { text: 'Yola çıktınız. Adam sürekli hesaplar yapıyor.\n\n"Eğer formül doğruysa... Petrol son bulur!"', choices: [{ text: "Petrol şirketleri bunu istemez.", next: 5 }, { text: "Zengin olursun o zaman.", next: 6 }] },
            { text: '"50 yıl! Herkes deli dedi! Ailesi beni terk etti! Ama şimdi...""\n\nGözleri doldu.', choices: [{ text: "Sabır meyvesini verir.", next: 7 }, { text: "Üzülme, başardın.", next: 7 }] },
            { text: '"Sonsuz enerji! Nükleer değil! Temiz! Güvenli! DEVRIMCI!""\n\nKutu garip bir ses çıkardı.', choices: [{ text: "Kutu ses çıkarıyor.", next: 8 }, { text: "Tehlikeli değil di mi?", next: 9 }] },
            { text: '"Petrol şirketleri mi? Onlar beni öldürmeye çalıştı! 3 kez!""\n\nParanoyak mı?', choices: [{ text: "Ciddi misin?", next: 10 }, { text: "Devam edelim.", next: 2 }] },
            { text: '"Zengin mi? PARA ÖNEMLİ DEĞİL! Dünyayı kurtaracağız!""\n\nIdealist.', ending: { money: 200, reputation: 50, type: 'normal', text: "TÜBİTAK'a vardınız. 200 lira verdi, parasının çoğu araştırmaya gitmiş. 1 yıl sonra haber: 'Türk Bilim Adamı Devrimci Buluş!' GERÇEKTEN BAŞARMIŞ!" } },
            { text: 'Adam kitaplarından bahsetti. Gerçekten profesörmüş.\n\n"Adım tarihe geçecek şoför."', ending: { money: 150, reputation: 40, type: 'normal', text: "150 lira aldın. Adam TÜBİTAK'a girdi. Bir daha duymadın. Belki gerçekten dehanın gördün. Belki de bir deli." } },
            { text: '"Ses mi? ÇALIŞIYOR DEMEK! Stabil!""\n\nKutu daha çok ses çıkarmaya başladı.', choices: [{ text: "Emin misin?", next: 9 }, { text: "DURUN PATLİYOR MU?!", next: 11 }] },
            { text: '"Tehlikeli? Hayır! Tamamen stab...""\n\nKutu bir ışık patlaması yaptı! Ama zarar yok.', ending: { money: 100, reputation: 30, type: 'normal', text: "100 lira aldın. Kutu gerçekten enerji yaydı! Arabanın farları bir an çok parlak yandı. O adam gerçekten bir deha mıydı?" } },
            { text: '"Öldürmeye mi? 3 kez! Bir kez arabama bomba koydular! Bir kez zehirlendim!"', choices: [{ text: "Polise gitmedin mi?", next: 2 }, { text: "O zaman dikkat et.", next: 2 }] },
            { text: '"PATLAMIYOR! IŞIK BU! Enerji aktarımı!"\n\nKutu sakinleşti. Adam gülümsedi.', ending: { money: 300, reputation: 60, type: 'normal', text: "TÜBİTAK önünde indirdin. 300 lira verdi. 'Tarihe geçtiğimde seni hatırlarım.' dedi. 2 yıl sonra Nobel Ödülü kazandığını gördün. GERÇEKTEN DEHİYMİŞ!" } }
        ]
    },

    // ===== KARAKTER 30: GECE VARDIYASI POLİS =====
    {
        id: 30,
        name: "Gece Vardiyası Polis",
        avatar: "👮‍♂️",
        image: require('./assets/characters/gece_polis.png'),
        location: "Eminönü",
        time: "05:30",
        intro: "Yorgun bir polis memuru. Üniforma kirli. 'Evime götür şoför. Sarıgazi. 16 saat mesai yaptım.'",
        dialogue: [
            { text: '"16 saat... Bir cinayet, iki kavga, bir kaza... Ve ben hala ayaktayım...""\n\nGözleri kapanıyor.', choices: [{ text: "Zor meslek sizinki.", next: 1 }, { text: "Sarıgazi uzak ama götüreyim.", next: 2 }] },
            { text: '"Zor ama biri yapmalı. Bugün bir çocuğun hayatını kurtardık. Değdi.""\n\nHafif gülümsedi.', choices: [{ text: "Nasıl kurtardınız?", next: 3 }, { text: "Kahraman sınız.", next: 4 }] },
            { text: 'Yola çıktınız. Polis uyuklamaya başladı.\n\n"Uyuyabilir miyim biraz? Karım bekliyor ama..."', choices: [{ text: "Tabii, uyu. Ben uyandırırım.", next: 5 }, { text: "Sarıgazi'ye gelince uyandırırım.", next: 5 }] },
            { text: '"Çocuk merdivenden düşmüş. Ailesi panik. Biz yetiştik, ilk yardım yaptık. Ambulans gelene kadar..."', choices: [{ text: "Hayat kurtardınız yani.", next: 4 }, { text: "Maşallah, iyi ki varsınız.", next: 4 }] },
            { text: '"Kahraman mı? Hayır... Sadece işimizi yapıyoruz... Ama teşekkürler...""\n\nSesi kısıldı.', choices: [{ text: "Uyu sen, konuşma.", next: 5 }, { text: "Takdir ediyorum sizi.", next: 5 }] },
            { text: 'Sarıgazi\'ye geldiniz. Polis uyandı.\n\n"Burada mıyız? Vay be, uyumuşum. Sağ ol kardeş."', choices: [{ text: "Rica ederim, kolay gelsin.", next: 6 }, { text: "Para istemiyorum.", next: 7 }] },
            { text: 'Polis cüzdanını çıkardı.\n\n"Al şunu kardeş. Bugün iyi oldu bana.""\n\n200 lira uzattı.', ending: { money: 200, reputation: 80, type: 'normal', text: "200 lira aldın. Polis evine yürüdü. O gece bir kahraman taşıdın." } },
            { text: '"Para istemiyorsun? Allah razı olsun... Kartımı ver."', ending: { money: 0, reputation: 150, type: 'normal', text: "Para almadın. Ama bir polis kartı aldın. Bu şehirde bağlantılar altın." } }
        ]
    },
    // ===== KARAKTER 31: AĞLAYAN PALYAÇO =====
    {
        id: 31, name: "Ağlayan Palyaço", avatar: "🤡",
        image: require('./assets/characters/aglayan_palyaco.png'),
        location: "Bakırköy", time: "23:00",
        intro: "Palyaço kostümüyle. Makyaj akmış. 'Eve götür beni... Çocuk partisinden kovuldum...'",
        dialogue: [
            { text: '"Çocuklar gülmedi... Balon patlatmayı bile beceremedim...""\n\nMakyajı akmış, gözleri boş.', choices: [{ text: "Üzülme, olur öyle.", next: 1 }, { text: "Neden palyaçosun?", next: 2 }] },
            { text: '"20 yıldır bu işi yapıyorum... Artık kimse gülmüyor..."\n\nDerin bir iç çekti.', choices: [{ text: "Belki yeni numaralar öğrenirsin?", next: 3 }, { text: "20 yıl mı? Vay be...", next: 4 }] },
            { text: '"Neden mi? Çocukken tiyatroya aşıktım... Ama oyuncu olamadım...""\n\nBir an duraksadı.', choices: [{ text: "Oyuncu olmak isteyip palyaço mu oldun?", next: 5 }, { text: "Hayat bazen böyle.", next: 4 }] },
            { text: '"Yeni numara mı? Her yıl yenisini yapıyorum... Ama çocuklar telefona bakıyor artık..."', choices: [{ text: "Teknoloji her şeyi değiştirdi.", next: 6 }, { text: "Çocuklar değişti mi?", next: 6 }] },
            { text: '"20 yıl sokak sokak gezdim. Binlerce parti yaptım. Binlerce çocuk güldürdüm...""\n\nGözleri doldu.', choices: [{ text: "O zaman başarılısın!", next: 7 }, { text: "Neden şimdi üzgünsün?", next: 5 }] },
            { text: '"Oyuncu... Evet... Tiyatro sahnesinde olmak isterdim. Shakespeare oynamak..."\n\nGülümsedi acı acı.', choices: [{ text: "Belki hala bir şans vardır?", next: 8 }, { text: "Palyaçoluk da bir sahne.", next: 7 }] },
            { text: '"Evet... Çocuklar artık TikTok izliyor. Ben ne yapayım? Jonglörlük mü öğreneyim?"', choices: [{ text: "Belki de TikTok aç sen de.", next: 9 }, { text: "Klasik sanat ölmez.", next: 7 }] },
            { text: '"Sağ ol evladım... Sen iyi dinleyicisin... Kimse dinlemiyor artık..."\n\nAğlamaya başladı.', choices: [{ text: "Her zaman buradayım.", next: 10 }, { text: "Ağlama, yarın daha iyi olur.", next: 10 }] },
            { text: '"Hala şans mı? 55 yaşındayım... Geçti o tren..."\n\nAma bir kıvılcım belirdi gözlerinde.', choices: [{ text: "Hiçbir şey için geç değil.", next: 10 }, { text: "Bir tiyatroya git, dene.", next: 10 }] },
            { text: '"TikTok mu? Hmm... Belki... Belki haklısın...""\n\nİlk kez gülümsedi.', ending: { money: 200, reputation: 80, type: 'normal', text: "200 lira aldın. Adam indi ama gülümsüyordu. 3 ay sonra TikTok'ta gördün: 'Ağlayan Palyaço' 2 milyon takipçi! Kaderi sen değiştirdin." } },
            { text: 'Eve vardınız. Adam kapıda durdu, döndü.\n\n"Sen... Sen ilk kez beni dinledin... Teşekkürler..."', ending: { money: 250, reputation: 100, type: 'normal', text: "250 lira verdi. Adını sordu. 'Bir gün sahnemde anlatacağım seni' dedi. Palyaçonun arkasında hep bir insan vardır." } }
        ]
    },
    // ===== KARAKTER 32: KAYIP TURİST (AJAN?) =====
    {
        id: 32, name: "Kayıp Turist (Ajan?)", avatar: "🕵️",
        image: require('./assets/characters/kayip_turist_ajan.png'),
        location: "Taksim", time: "02:00",
        intro: "Yabancı aksanı var ama çok iyi Türkçe. 'Konsolosluk. Acil. Takip ediliyorum.'",
        dialogue: [
            { text: '"Hızlan. Arkamızda siyah bir van var."\n\nDikiz aynasına baktı. Gerçekten bir van var.', choices: [{ text: "Kim takip ediyor?", next: 1 }, { text: "Gaza basıyorum!", next: 2 }] },
            { text: '"Bilmesen daha iyi... Sadece sür..."\n\nCebinden bir şey çıkardı. Tabanca mı?!', choices: [{ text: "O silah mı?!", next: 3 }, { text: "Polisi arayalım.", next: 4 }] },
            { text: 'Gaza bastın! Dar sokaklara daldın.\n\n"İyi sürüyorsun... Eğitimli misin?"', choices: [{ text: "15 yıllık taksiciyim.", next: 5 }, { text: "Sen kimsin?", next: 6 }] },
            { text: '"Sadece tedbir... Kullanmam gerekebilir..."\n\nVan hala arkada!', choices: [{ text: "Dur, polisi ara!", next: 4 }, { text: "Sıkıysa gelsin!", next: 2 }] },
            { text: '"Polis mi? Hayır... Polis işe yaramaz burda..."\n\nTelefon numarası yazdı.', choices: [{ text: "Bu ne?", next: 7 }, { text: "Tehlikede miyiz?", next: 8 }] },
            { text: '"15 yıl mı? Harika. Belki bir gün iş teklif ederim..."\n\nEsrarengiz gülümsedi.', choices: [{ text: "Ne işi?", next: 6 }, { text: "Devam et, konsolosluğa.", next: 9 }] },
            { text: '"Ben mi? Bir turist... Belgeleri taşıyan bir turist..."\n\nElinde bir USB bellek.', choices: [{ text: "O belgeler ne?", next: 8 }, { text: "Anladım, devam.", next: 9 }] },
            { text: '"Bu numara benim. Bir gün lazım olursa ara. Sormadan yardım ederim."\n\nVan kayboldu!', choices: [{ text: "Kaybettik onları!", next: 9 }, { text: "Numara almam.", next: 10 }] },
            { text: '"Tehlike mi? Her zaman tehlike var... Ama sen güvendesin. Seni kimse aramaz."', choices: [{ text: "Beni işe mi karıştırıyorsun?", next: 10 }, { text: "Anlıyorum.", next: 9 }] },
            { text: 'Konsolosluğa vardınız. Adam indi. Kapıda bir an döndü.\n\n"Sana borçluyum şoför. Bir gün öderim."', ending: { money: 3000, reputation: 50, type: 'normal', text: "1000 dolar verdi. Adam konsolosluğa girdi. O gece bir ajan mı taşıdın? Hiç bilemeyeceksin. Ama o numara hala cebinde..." } },
            { text: '"Almak istemiyorsun... Akıllı adamsın. Karışmamak en iyisi."\n\nAma 500 dolar bıraktı.', ending: { money: 1500, reputation: 30, type: 'normal', text: "500 dolar aldın. Adam kayboldu. Haberlerde hiçbir şey çıkmadı. Sanki o gece hiç yaşanmadı..." } }
        ]
    },
    // ===== KARAKTER 33: INSTAGRAM FENOMENİ =====
    {
        id: 33, name: "Instagram Fenomeni", avatar: "📸",
        image: require('./assets/characters/instagram_fenomeni.png'),
        location: "Bebek", time: "14:00",
        intro: "Selfie çubuğu, ring light. 'Abi yavaş git, içerik çekiyorum!'",
        dialogue: [
            { text: '"5 milyon takipçim var! Sen de çık videoya!"\n\nKamerayı sana çevirdi.', choices: [{ text: "Olmaz, utanırım.", next: 1 }, { text: "Tamam, çek.", next: 2 }] },
            { text: '"Utanma abi! Viral olursun! Hayatın değişir!"\n\nIsrar ediyor.', choices: [{ text: "Yüzümü gösterme.", next: 3 }, { text: "Çek o zaman.", next: 2 }] },
            { text: '"EFSANE! Şöyle bir şey söyle: İstanbul trafiğinde hayatta kalmanın sırrı..."\n\nKamera dönüyor.', choices: [{ text: "Sabır ve dua.", next: 4 }, { text: "Kısayol bilmek.", next: 5 }] },
            { text: '"Sadece eller olsun, yüz yok... Tamam mı?"\n\nKamera direksiyona döndü.', choices: [{ text: "Evet, bu iyi.", next: 6 }, { text: "Hiç çekme en iyisi.", next: 7 }] },
            { text: '"SABIR VE DUA! EFSANE! Bu caption olacak!"\n\nTelefona bir şeyler yazıyor.', choices: [{ text: "İşe yarar mı?", next: 6 }, { text: "Saçmalık.", next: 7 }] },
            { text: '"KISAYOL! Abi anlatacan mı bize? Takipçiler çıldırır!"\n\nGözleri parlıyor.', choices: [{ text: "30 yıllık taktik var.", next: 8 }, { text: "Sır söylenmez.", next: 6 }] },
            { text: 'Video bitti. İzledi.\n\n"1 milyon izlenme garantiliyorum buna!"', choices: [{ text: "Gerçekten mi?", next: 9 }, { text: "Para var mı bunda?", next: 10 }] },
            { text: '"Çekmeyecek misin? Yazık... Viral olacaktın..."\n\nHayal kırıklığı.', ending: { money: 100, reputation: 0, type: 'normal', text: "100 lira aldın. Video yok. 3 gün sonra başka taksici 10 milyon izlendi. O abi sensiz viral oldu." } },
            { text: '"30 yıllık mı? ABİ BU ALTIN! Anlat, anlat!"\n\nHer şeyi kaydediyor.', choices: [{ text: "E-5'te 23.kat...", next: 9 }, { text: "Şaka yapıyorum.", next: 7 }] },
            { text: 'Bebege vardiniz.\n\n"Sen efsanesin abi! Bak atiyorum hemen! Takip et beni!"', ending: { money: 500, reputation: 100, type: 'normal', text: "500 lira ve 2 milyon izlenme! 1 hafta sonra reklam teklifi geldi. Artik unlusun." } },
            { text: '"Para mı? Abi bu viral olursa marka anlaşması gelir! Sana da pay veririm!"\n\nGerçek mi şaka mı?', ending: { money: 300, reputation: 50, type: 'normal', text: "300 lira aldın. 1 ay sonra mesaj geldi: 'Abi video 5M oldu! Al şu 2000 lira.' Gerçekmiş!" } }
        ]
    },
    // ===== KARAKTER 34: OPERA SANATÇISI =====
    {
        id: 34, name: "Opera Sanatçısı", avatar: "🎭",
        image: require('./assets/characters/opera_sanatcisi.png'),
        location: "Harbiye", time: "22:30",
        intro: "Uzun elbise, saç topuz. 'AKM'ye! Perde 10 dakikaya!'",
        dialogue: [
            { text: '"Acele et! Bu gece Carmen! Ben başrolüm!"\n\nSaatine baktı. Panik.', choices: [{ text: "Yetiştiririz!", next: 1 }, { text: "Bir şarkı söyle!", next: 2 }] },
            { text: 'Gaza bastın! Trafik yoğun.\n\n"Aman Allah! Perde kalkar ben olmadan!"', choices: [{ text: "Sakin ol, kestirme var.", next: 3 }, { text: "Dua et.", next: 4 }] },
            { text: '"Şarkı mı? Şimdi mi?"\n\nBir an duraksadı. Sonra başladı...', choices: [{ text: "(Dinle)", next: 5 }, { text: "Arabada olmaz.", next: 4 }] },
            { text: 'Kestirmeden gittin. Trafik açıldı!\n\n"Sen melek misin şoför?"', choices: [{ text: "15 yıllık tecrübe.", next: 6 }, { text: "Şans.", next: 6 }] },
            { text: '"İnşallah yetişiriz... 20 yıllık kariyerim bu role bağlı..."\n\nGözleri doldu.', choices: [{ text: "Neden bu kadar önemli?", next: 7 }, { text: "Yetişiriz.", next: 6 }] },
            { text: 'VOKAL BAŞLADI. Araba TİTREDİ. Cam ZINLADI.\n\nİnanılmaz bir ses!', choices: [{ text: "BRAVO!", next: 8 }, { text: "Vay be...", next: 8 }] },
            { text: 'AKM\'ye yaklaşıyorsunuz.\n\n"Görüyorum! Işıklar yanıyor! Yetiştik!"', choices: [{ text: "Hoş geldiniz.", next: 9 }, { text: "Kır kır.", next: 9 }] },
            { text: '"Bu rol... Çocukluğumdan beri hayalim... Annem hiç göremedi beni sahnede..."\n\nSesi kırıldı.', choices: [{ text: "Annen gurur duyardı.", next: 8 }, { text: "Bu gece onun için söyle.", next: 8 }] },
            { text: '"Teşekkürler! Sen... Sen hayatımı kurtardın!"\n\nSarıldı!', choices: [{ text: "Rica ederim.", next: 9 }, { text: "Başarılar!", next: 9 }] },
            { text: 'Kadın koşarak gitti. Kapıda döndü, el salladı.\n\nErtesi gün gazetede gördün: "Muhteşem Carmen!"', ending: { money: 500, reputation: 100, type: 'normal', text: "500 lira ve unutulmaz bir ses. 1 ay sonra davetiye geldi: VIP koltuk. Hayatın en güzel operası." } }
        ]
    },
    // ===== KARAKTER 35: FİRARİ MAHKUM =====
    {
        id: 35, name: "Firari Mahkum", avatar: "⛓️",
        image: require('./assets/characters/firari_mahkum.png'),
        location: "Maltepe", time: "03:00",
        intro: "Yırtık kıyafetler, korku dolu gözler. 'Sınıra götür. Para var.'",
        dialogue: [
            { text: '"Soru sorma. 10.000 lira veririm."\n\nElleri titriyor. Gözleri etrafta.', choices: [{ text: "Sen kimsin?", next: 1 }, { text: "Polisi ararım.", next: 2 }, { text: "Tamam, bin.", next: 3 }] },
            { text: '"Kim olduğumu bilmesen iyi... Sadece sür..."\n\nCebinde bir şey var. Silah mı?', choices: [{ text: "O ne cebinde?", next: 4 }, { text: "Polisi arıyorum.", next: 2 }] },
            { text: 'Polisi aradın. Adam kaçmaya çalıştı.\n\n"HAYIR! YAPMA!"', choices: [{ text: "Kaçamazsın.", next: 5 }, { text: "Dur, dinle.", next: 6 }] },
            { text: 'Adamı aldın. Yola çıktın.\n\n"Hızlan. Arkamızdalar..."', choices: [{ text: "Kimler?", next: 7 }, { text: "Gaza basıyorum.", next: 8 }] },
            { text: '"Bu... Bu para... 10 yıllık birikimim..."\n\nBir tomar para çıkardı.', choices: [{ text: "10 yıl hapiste miydin?", next: 9 }, { text: "Kirli para istemem.", next: 2 }] },
            { text: 'Polis yakaladı. Adam ağlarken baktı sana.\n\n"İyi ettin... İyi ettin..."', ending: { money: 0, reputation: 200, type: 'police', text: "Firari yakalandı. Adam aslında masum olduğunu söylüyordu. Ama kanun kanun. Sen doğru olanı yaptın." } },
            { text: '"DİNLE! Ben masumum! Beni tuzağa düşürdüler!"\n\nGözlerinde umutsuzluk.', choices: [{ text: "Herkes öyle der.", next: 5 }, { text: "Anlat.", next: 9 }] },
            { text: '"Eski ortaklarım... Onlar beni sattı... 10 yıl yattım bir şey yapmadan..."\n\nAğlıyordu.', choices: [{ text: "Mahkemeye git.", next: 10 }, { text: "İnanırım sana.", next: 8 }] },
            { text: 'Sınıra yaklaşıyorsunuz. Arabalar kontrol ediyor.\n\n"DUR! Çevirmeler var!"', ending: { money: -5000, reputation: -100, type: 'court', text: "Jandarma yakaladı. Suç ortaklığından yargılandın. Hayatın karardı. Bazı riskler alınmaz." } },
            { text: '"10 yıl... 10 yıl hapis... Karım gitti. Çocuklarım gitti. Tek istediğim bir şans..."\n\nAdamın gözleri doldu.', choices: [{ text: "Git, bir daha yapma.", next: 11 }, { text: "Gidemem, teslim ol.", next: 5 }] },
            { text: '"Mahkeme mi? Onlar da satılmış... Ama belki haklısın..."\n\nDüşünüyor.', ending: { money: 500, reputation: 50, type: 'normal', text: "500 lira verdi, indi. 'Teslim olacağım' dedi. 1 yıl sonra haber gördün: BERAAT. Adam masummuş. İyi ki yardım ettin." } },
            { text: 'Adamı ıssız bir yere bıraktın.\n\n"Allah razı olsun... Bir gün öderim..."', ending: { money: 10000, reputation: -50, type: 'normal', text: "10.000 lira. Ama vicdan azabı. Adam masummuş ya da değilmiş, bilemeyeceksin. Para her şeyi çözmez." } }
        ]
    },
    // ===== KARAKTER 36: GİZLİ GURME =====
    {
        id: 36, name: "Gizli Gurme", avatar: "🍽️",
        image: require('./assets/characters/gizli_gurme.png'),
        location: "Kadikoy", time: "20:00",
        intro: "Not defteri, şüpheli bakışlar. 'En iyi kokoreçe götür. Araştırma yapıyorum.'",
        dialogue: [
            { text: '"Michelin yıldızı verecek miyiz karar vereceğim. Sen en iyisini biliyorsun değil mi?"\n\nKalem ve defter hazırladı.', choices: [{ text: "Eminönü'ndeki Şampiyon!", next: 1 }, { text: "Kadıköy'de gizli bir yer var.", next: 2 }] },
            { text: '"Eminönü mü? Turistik olmuş artık. Daha otantik bir yer söyle..."\n\nNot alıyor.', choices: [{ text: "Balat var.", next: 3 }, { text: "Bir tane var ama gizli.", next: 4 }] },
            { text: '"Kadıköy... Hmm... Hangi sokak?"\n\nHaritayı açtı.', choices: [{ text: "Arka sokaklarda, işaretsiz.", next: 4 }, { text: "Sana gösteririm.", next: 5 }] },
            { text: '"Balat! Evet, duydum. Dedeler yeri mi?"\n\nGözleri parladı.', choices: [{ text: "Evet, 40 yıllık.", next: 5 }, { text: "Değildir, başka yer.", next: 4 }] },
            { text: '"İşaretsiz mi? MUHTEŞEM! Gerçek lezzet böyle yerlerde olur!"\n\nHeyecanlı.', choices: [{ text: "Evet, sadece yerliler bilir.", next: 5 }, { text: "Ama zor bulurum.", next: 6 }] },
            { text: 'Kokoreçe vardınız. Adam indi, kokladı.\n\n"Bu koku... BU GERÇEK!"', choices: [{ text: "Söyledim.", next: 7 }, { text: "En iyilerden.", next: 7 }] },
            { text: '"Zor bulmak mı? Seni işçi alayım! Her yere götürürsün beni!"\n\nCiddi.', choices: [{ text: "Düşünürüm.", next: 5 }, { text: "Taksiciliği bırakmam.", next: 7 }] },
            { text: 'Adam yedi. Gözleri yumuldu. Sessizlik...\n\n"...EFSANE..."', choices: [{ text: "Beğendin mi?", next: 8 }, { text: "Yıldız veriyor musun?", next: 9 }] },
            { text: '"Beğenmek mi? Bu... Bu sanat!"\n\n2. porsiyon söyledi.', choices: [{ text: "Yazacak mısın?", next: 9 }, { text: "Afiyetler.", next: 9 }] },
            { text: 'Adam kalemi aldı.\n\n"Senin adın ne şoför? Makaleye yazacağım!"', ending: { money: 500, reputation: 150, type: 'normal', text: "500 lira. 1 ay sonra gazete manşeti: 'TAKSİCİNİN ÖNERİSİ MICHELIN YILDIZI ALDI!' Artık efsanesin." } }
        ]
    },
    // ===== KARAKTER 37: UNUTKAN DEDE =====
    {
        id: 37, name: "Unutkan Dede", avatar: "👴",
        image: require('./assets/characters/unutkan_dede.png'),
        location: "Fatih", time: "10:00",
        intro: "80 yaşlarında, şaşkın. 'Evladım... Ben nereye gidiyordum?'",
        dialogue: [
            { text: '"Evimi arıyorum... Ama adresi unuttum..."\n\nGözleri kayıp.', choices: [{ text: "Kimliğine bakalım.", next: 1 }, { text: "Aile var mı arayalım.", next: 2 }] },
            { text: 'Kimliğini çıkardı. Elleri titriyor.\n\n"Nerde bu... Nerde..."', choices: [{ text: "Yardım edeyim.", next: 3 }, { text: "Sakin ol dede.", next: 3 }] },
            { text: '"Aile mi? Oğlum var... Ama numarasını... Numarasını unuttum..."\n\nGözleri doldu.', choices: [{ text: "Telefonun var mı?", next: 4 }, { text: "Polisi arayalım.", next: 5 }] },
            { text: 'Kimlikte adres var! Fatih, Akseki Sokak.\n\n"Akseki... Evet! Orada doğdum!"', choices: [{ text: "Götürüyorum seni.", next: 6 }, { text: "Evi hatırladın mı?", next: 7 }] },
            { text: 'Telefonunu verdi. Rehberde "OĞLUM" var.\n\nAradın. "BABA! NERESİN?!"', choices: [{ text: "Taksideyiz, geliyoruz.", next: 8 }, { text: "Merak etmeyin, yanında.", next: 8 }] },
            { text: 'Polisi aradın. Kayıp ihbarı varmış zaten.\n\n"Bulundu! Allah\'a şükür!"', ending: { money: 0, reputation: 200, type: 'police', text: "Para almadın. Polis teşekkür etti. Bir aile kavuştu. Bazı şeyler paradan önemli." } },
            { text: 'Akseki\'ye vardınız. Dede camdan baktı.\n\n"Burası... Burası bizim ev miydi?"', choices: [{ text: "Ev değişmiş mi?", next: 9 }, { text: "Hatırla dede.", next: 9 }] },
            { text: '"Evimi... Evimi hatırlıyorum... Mavi kapıydı..."\n\nBir an için gözleri netleşti.', choices: [{ text: "Mavi kapı hangisi?", next: 9 }, { text: "Artık yaklaştık.", next: 9 }] },
            { text: 'Oğlu koşarak geldi. Sarıldı dedeye.\n\n"Baba! 3 saattir arıyordum!"', choices: [{ text: "Buldum onu.", next: 10 }, { text: "Para istemem.", next: 11 }] },
            { text: 'Aile kavuştu. Dede ağlıyor, oğlu ağlıyor.\n\n"Sağ ol evlat... Sağ ol..."', ending: { money: 200, reputation: 150, type: 'normal', text: "200 lira ve minnet dolu bakışlar. Alzheimer zor. Ama bugün bir aile mutlu." } },
            { text: '"Para istemez misin? İnsanlık ölmüş..."\n\nAdam cebine uzandı ama durdurdun.', ending: { money: 0, reputation: 250, type: 'normal', text: "Para almadın. Oğlu sarıldı sana da. 'Allah senden razı olsun' dedi. Bazı şeyler paradan değerli." } }
        ]
    },
    // ===== KARAKTER 38: HAMİLE KEDİLİ KADIN =====
    {
        id: 38, name: "Hamile Kedili Kadın", avatar: "🐱",
        image: require('./assets/characters/hamile_kedili_kadin.png'),
        location: "Sisli", time: "01:00",
        intro: "Hamile ve kucağında hamile kedi. 'Veterinere! Kedi doğuruyor!'",
        dialogue: [
            { text: '"Kedi sancı çekiyor! Ben de 8 aylığım! Çabuk!"\n\nKedi miyavlıyor, kadın nefes nefese.', choices: [{ text: "İkisi de mi hamile?!", next: 1 }, { text: "Gaza basıyorum!", next: 2 }] },
            { text: '"Evet! Aynı anda hamile kaldık! Şimdi o önce doğuracak!"\n\nKedi inliyor.', choices: [{ text: "Vay be!", next: 3 }, { text: "Yetişiriz!", next: 2 }] },
            { text: 'Gaza bastın! Gece trafiği boş.\n\n"Faster! Faster! Daha hızlı!"', choices: [{ text: "Sakin ol.", next: 4 }, { text: "Gidiyoruz.", next: 4 }] },
            { text: '"Ay! Tekmeliyor! Bebek de heyecanlı galiba!"\n\nKedi miyavladı.', choices: [{ text: "İkisi de sabırsız.", next: 5 }, { text: "Güzel tesadüf.", next: 5 }] },
            { text: '"Pamuk benim ilk kedim... 5 yıldır yanımda..."\n\nKediye baktı sevgiyle.', choices: [{ text: "Güzel isim.", next: 6 }, { text: "Sadık dost.", next: 6 }] },
            { text: 'Veterinere yaklaşıyorsunuz!\n\n"Görüyorum ışıkları! AH! Pamuk DOĞURUYOR!"', choices: [{ text: "YA?! ŞİMDİ Mİ?!", next: 7 }, { text: "DUR KEDİ DUR!", next: 7 }] },
            { text: 'KEDİ ARABADA DOĞURDU! İLK YAVRU GELDİ!\n\n"AAAA! BABASI OLDU ŞOFÖR ABİ!"', choices: [{ text: "BEN BABA MIYIM?!", next: 8 }, { text: "VETERİNERE GİR!", next: 9 }] },
            { text: '"EVET! İLK YAVRU SENİN SAYENDE DOĞDU! SEN BABASIN!"\n\n2. yavru geliyor...', choices: [{ text: "Kaç tane olacak?!", next: 9 }, { text: "Veteriner!", next: 9 }] },
            { text: 'Veterinere girdiniz. Kedi 5 yavru doğurdu!\n\n"BEŞİZ! HARİKA!"', choices: [{ text: "Tebrikler.", next: 10 }, { text: "Soğuk terler.", next: 10 }] },
            { text: 'Kadın minnettar baktı.\n\n"Bir tanesinin adı senin olsun! Ne koyalım?"', ending: { money: 300, reputation: 100, type: 'normal', text: "300 lira ve bir yavru kedi! Adını sen koydun: TAKSİ. 1 ay sonra kadın da doğurdu. Bebeğin ikinci adı: dedenin adından almış!" } }
        ]
    },
    // ===== KARAKTER 39: ESKİ SEVGİLİ =====
    {
        id: 39, name: "Eski Sevgili", avatar: "💔",
        image: require('./assets/characters/eski_sevgili.png'),
        location: "Besiktas", time: "23:30",
        intro: "Tanıdık bir yüz... 10 yıl önceki aşkın binmiş taksine. 'Merhaba... Seni hatırladım.'",
        dialogue: [
            { text: '"10 yıl olmuş... Nasılsın?"\n\nGözleri dolu dolu.', choices: [{ text: "İyiyim. Sen?", next: 1 }, { text: "Tanıştık mı biz?", next: 2 }] },
            { text: '"Evlendim, boşandım... Sen hala taksicisin..."\n\nCama baktı.', choices: [{ text: "Evet, mutluyum.", next: 3 }, { text: "Hayat işte.", next: 4 }] },
            { text: '"Tanıştık mı? Ben Elif... Üniversiteden..."\n\nSesi titredi.', choices: [{ text: "Elif... Evet... Hatırladım.", next: 5 }, { text: "Üzgünüm, tanımıyorum.", next: 6 }] },
            { text: '"Mutlu musun? Gerçekten mutlu musun?"\n\nSana baktı derin derin.', choices: [{ text: "Evet, bu iş bana iyi geliyor.", next: 7 }, { text: "Ya sen?", next: 8 }] },
            { text: '"Hayat işte... Hayat..." \n\nİç çekti.', choices: [{ text: "Neden boşandın?", next: 8 }, { text: "Üzgünüm.", next: 7 }] },
            { text: '"Elif... Evet... O yaz... Boğaz... Hatırlıyor musun?"\n\nGözleri dolu.', choices: [{ text: "Hatırlıyorum.", next: 9 }, { text: "Çok eski kaldı.", next: 6 }] },
            { text: '"Tanımıyor... Tamam... İyi geceler..."\n\nUsulca indi.', ending: { money: 100, reputation: 0, type: 'normal', text: "100 lira. Elif mi? Belki de hatırlamak istemedin. Bazı anılar acıtır." } },
            { text: '"Taksicilik... Bu şehirde herkes taksici oldu..."\n\nAcı gülümsedi.', choices: [{ text: "Sen ne iş yapıyorsun?", next: 8 }, { text: "Doğru.", next: 9 }] },
            { text: '"Ben mi? Avukattım... Şimdi? Hiçbir şey..."\n\nGözleri doldu.', choices: [{ text: "Neden bıraktın?", next: 10 }, { text: "Üzgünüm, düzelecek.", next: 9 }] },
            { text: 'Eve yaklaşıyorsunuz. Elif pencereden bakıyor.\n\n"Burası... Artık her yer karanlık geliyor..."', choices: [{ text: "Yarın farklı olur.", next: 11 }, { text: "Bir şeye ihtiyacın var mı?", next: 11 }] },
            { text: '"Boşandım çünkü... Onu hiç sevmedim... Hep başkasını düşündüm..."\n\nSana baktı.', choices: [{ text: "Kim?", next: 11 }, { text: "(Anladın)", next: 11 }] },
            { text: 'Elif kapıdan indi. Durdu. Döndü.\n\n"Belki... Kahve içeriz bir gün?"', ending: { money: 200, reputation: 50, type: 'normal', text: "200 lira ve bir numara. 10 yıl sonra ikinci şans? Hayat bazen ikinci şans verir." } }
        ]
    },
    // ===== KARAKTER 40: ŞÜPHELİ TAKIM ELBİSELİ =====
    {
        id: 40, name: "Şüpheli Takım Elbiseli", avatar: "🕴️",
        image: require('./assets/characters/supheli_takim_elbiseli.png'),
        location: "Levent", time: "19:00",
        intro: "Pahalı takım ama gergin. 'Sarıyer. Ve hiç konuşma.'",
        dialogue: [
            { text: 'Adam telefonda fısıltıyla konuşuyor.\n\n"Belgeler hazır... Yarın açıklanacak..."', choices: [{ text: "(Kulak ver)", next: 1 }, { text: "(Duymazdan gel)", next: 2 }] },
            { text: '"İhale... Milyarlık... Herkes şok olacak..."\n\nSesi alçaldı.', choices: [{ text: "İlginç iş.", next: 3 }, { text: "Bana ne.", next: 2 }] },
            { text: 'Adam sana baktı.\n\n"Çok mu duydun?"', choices: [{ text: "Hiçbir şey duymadım.", next: 4 }, { text: "Maalesef.", next: 5 }] },
            { text: '"İyi... İyi... Sen akıllı adama benziyorsun..."\n\nCebinden bir kart çıkardı.', choices: [{ text: "Bu ne?", next: 6 }, { text: "İstemem.", next: 4 }] },
            { text: '"İyi. Devam et. Hiçbir şey duymadın."\n\nSessizlik.', choices: [{ text: "Anlaşıldı.", next: 7 }, { text: "Tehdit mi?", next: 8 }] },

            { text: '"Bu kart... Bir gün lazım olabilir. Benim ismim yok üzerinde."\n\nGizemli.', choices: [{ text: "Ne işi bu?", next: 8 }, { text: "Tamam, alırım.", next: 7 }] },
            { text: 'Sarıyer\'e yaklaşıyorsunuz.\n\n"Burda in beni. Sağ taraf."', choices: [{ text: "Tamam.", next: 10 }, { text: "Para?", next: 10 }] },
            { text: '"Tehdit mi? Hayır... Sadece tavsiye. Bu şehirde bilmek tehlikelidir."\n\nSoğuk.', choices: [{ text: "Anladım.", next: 7 }, { text: "(Kork)", next: 10 }] },
            { text: '"Polis mi? Gülmezler bile. Ben kimim biliyor musun?"\n\nGüldü.', ending: { money: 1000, reputation: -50, type: 'normal', text: "1000 lira bıraktı. 'Susma parası' dedi. Ertesi gün haberlerde: 'Büyük Vurgun!' O adam mıydı? Hiç bilemeyeceksin." } },
            { text: 'Adam indi. 500 lira bıraktı.\n\n"Hiçbir şey duymadın. Unutma."', ending: { money: 500, reputation: 0, type: 'normal', text: "500 lira. Ertesi gün haberlerde gördün: 'Büyük İhale Skandalı!' O adam mıydı acaba? Bazı soruların cevabı olmaz." } }
        ]
    },
    // ===== KARAKTER 41: GİZEMLİ KADIN (CİN?) =====
    {
        id: 41, name: "Gizemli Kadın (Cin?)", avatar: "👻",
        image: require('./assets/characters/gizemli_kadin_cin.png'),
        location: "Belgrad Ormani", time: "03:00",
        intro: "Beyaz elbiseli, solgun tenli. 'Köye götür beni... Sabaha kadar ulaşmalıyım.'",
        dialogue: [
            { text: '"Köy çok eski... Haritada yok..."\n\nSesi fısıl gibi.', choices: [{ text: "Haritada yok mu?", next: 1 }, { text: "Tamam, yol tarifi ver.", next: 2 }] },
            { text: '"Harita mı? Haritalar yalan söyler... Sadece sür... Yol görünecek..."\n\nGözleri boşluğa bakıyor.', choices: [{ text: "Garip konuşuyorsun.", next: 3 }, { text: "Tamam, gidiyoruz.", next: 4 }] },
            { text: '"Sola dön... Ormanın içine..."\n\nYol kararıyor.', choices: [{ text: "Orman mı? Yol yok.", next: 5 }, { text: "(Devam et)", next: 4 }] },
            { text: '"Garip mi? Belki... 100 yıldır garip hissediyorum..."\n\nNe?!', choices: [{ text: "100 yıl mı?!", next: 6 }, { text: "(Kork)", next: 7 }] },
            { text: 'Karanlık yolda ilerliyorsun. Kadın sessiz. Soğuk bir hava var.\n\nAynadan baktın. KADININ SURETİ YOK?!', choices: [{ text: "AAAAHHH!", next: 7 }, { text: "(Devam et, bakma)", next: 8 }] },
            { text: '"Yol var... Onu göremiyor musun? Işık var... Köye gidiyor..."\n\nGerçekten uzakta bir ışık var.', choices: [{ text: "Görüyorum...", next: 8 }, { text: "O ne?", next: 8 }] },
            { text: '"100 yıl... Evet... O gece... Düğünden dönüyordu... ama köy artık yok..."\n\nSesi uzaklaşıyor.', choices: [{ text: "Sen... Sen ölmüş müsün?", next: 9 }, { text: "(Arabayı durdur)", next: 10 }] },
            { text: 'Arabayı durdurdun. Arkana baktın. KİMSE YOK!\n\nKadın kaybolmuş!', ending: { money: 0, reputation: 0, type: 'normal', text: "Ne oldu? Rüya mıydı? Sabah arabada beyaz bir tüy buldun... Bazı geceler unutulmaz." } },
            { text: 'Bir köye vardınız. Işık yanıyor. Kadın indi.\n\n"Sağol... Sonunda geldim..."', choices: [{ text: "Para?", next: 11 }, { text: "İyi geceler.", next: 11 }] },
            { text: '"Ölmüş mü? Ölmemek daha zor..."\n\nGözleri PARLADI!', ending: { money: 0, reputation: 0, type: 'normal', text: "Kadın döndü, baktı. GÖZLERİ BEYAZDI. Sonra yok oldu. Eve gittin. O gece uyuyamadın. Hiç." } },
            { text: 'Arabayı çalıştırmaya çalıştın. ÇALIŞMADI!\n\nArkana baktın. Kadın HALA ORADA. Ama şimdi... GÜLÜMSÜYORDU.', ending: { money: 0, reputation: 0, type: 'normal', text: "10 dakika sonra araba çalıştı. Kadın yok olmuştu. KAPI HİÇ AÇILMADI. Sabah tuz serptin arabaya." } },
            { text: 'Kadın döndü. Gülümsedi. KAPI AÇILMADAN ÇIKTI.\n\n"Bekliyorlardı beni... 100 yıldır..."', ending: { money: 0, reputation: 0, type: 'normal', text: "Para vermedi. KAPI AÇILMADAN İNDİ. Eve gittin. O gece tüm ışıkları açık bıraktın." } }
        ]
    },
    // ===== KARAKTER 42: ZAMANDA YOLCU =====
    {
        id: 42, name: "Zamanda Yolcu", avatar: "⏰",
        image: require('./assets/characters/zamanda_yolcu.png'),
        location: "Sultanahmet", time: "23:59",
        intro: "Eski püşkü kıyafetler ama lüks saat. 'Sabiha Gökçen. 2 saatim var. 1955'e dönmeliyim.'",
        dialogue: [
            { text: '"1955 mi dedin?"\n\nAdam ciddi baktı.', choices: [{ text: "Şaka mı bu?", next: 1 }, { text: "Tamam, havalimanı.", next: 2 }] },
            { text: '"Şaka değil. Zamanda kayıp bir yolcuyum..."\n\nSaatine baktı.', choices: [{ text: "Deli bu.", next: 3 }, { text: "İlginç, anlat.", next: 4 }] },
            { text: 'Havalimanı yönünde gidiyorsun.\n\n"Biliyor musun bu şehir ne kadar değişti? 1955\'te burası bostandı..."', choices: [{ text: "Nereden biliyorsun?", next: 4 }, { text: "Hayal bu.", next: 3 }] },
            { text: '"Hayal mi? Sana bir şey göstereyim..."\n\nCebinden eski bir gazete çıkardı. TARİH: 15 MAYIS 1955.', choices: [{ text: "Bu sahte!", next: 5 }, { text: "Vay be...", next: 6 }] },
            { text: '"1955\'te doğdum. 1985\'te zaman makinesini buldum. O günden beri kayboldum..."\n\nGözleri uzaklarda.', choices: [{ text: "Neden 1955'e dönüyorsun?", next: 7 }, { text: "İmkansız.", next: 5 }] },
            { text: '"Sahte mi? Bu bozuk parayı al. 1955 tarihli. Antikacıya sor."\n\nVerdi.', choices: [{ text: "Tamam, alırım.", next: 8 }, { text: "İstemem.", next: 2 }] },
            { text: '"İnanmak zor... Biliyorum... Ben de inanmadım ilk başta..."\n\nİç çekti.', choices: [{ text: "Peki neden döndün?", next: 7 }, { text: "Tamam, yetişelim.", next: 8 }] },
            { text: '"1955\'e neden mi? Çünkü annemi son kez görmek istiyorum... O gece ölüyor..."\n\nGözleri doldu.', choices: [{ text: "Annen mi?", next: 9 }, { text: "Bazı şeyler değişmez.", next: 9 }] },
            { text: 'Havalimanı göründü.\n\n"Tamam dık. Sen iyi adamsın. Sana bir şey söyleyeyim..."', choices: [{ text: "Ne?", next: 10 }, { text: "İyi yolculuklar.", next: 11 }] },
            { text: '"2050\'de İstanbul sular altında olacak. Ama sen... Sen kurtulacaksın. Bunu bilmeni istedim."', choices: [{ text: "Nasıl biliyorsun?", next: 11 }, { text: "Teşekkürler.", next: 11 }] },
            { text: '"Nasıl mı? Çünkü 2050\'den de geçtim..."\n\nGizemli gülümsedi.', ending: { money: 500, reputation: 100, type: 'normal', text: "500 lira verdi. Adam gitti. O bozuk para antikacıda 5000 lira etti! Adam gerçekten 1955'ten miydi?" } },
            { text: 'Adam indi. Elini salladı.\n\n"Bir gün anlarsın... Zaman sadece bir illüzyon..."', ending: { money: 100, reputation: 50, type: 'normal', text: "100 lira ve 1955 tarihli bozuk para. Antikacıda 5000 lira etti! Adam gerçekten zamanda mı kaybolmuş?" } }
        ]
    },
    // ===== KARAKTER 43: SARHOŞ DAMAT 2 =====
    {
        id: 43, name: "Düğünden Kaçan Damat 2", avatar: "🤵",
        image: require('./assets/characters/sarhos_damat_2.png'),
        location: "Florya", time: "01:00",
        intro: "Smokin, papyon çözülmüş. 'Abi oluyorum! Düğün iptal! Kaç!'",
        dialogue: [
            { text: '"Kız beni son dakika bıraktı! 500 davetli! Rezil oldum!"\n\nYüz kızarmış, gözler dolu.', choices: [{ text: "Neden bıraktı?", next: 1 }, { text: "Üzülme, kurtuluş bu.", next: 2 }] },
            { text: '"Başka biri varmış! 3 yıl! Ağzımla kuş tutsam yetmezmiş!"\n\nŞampanya şişiyor.', choices: [{ text: "Şansına şükret.", next: 3 }, { text: "İyi ki şimdi öğrendin.", next: 4 }] },
            { text: '"Kurtuluş mu? KURTULUŞ MU?! BENİ 500 KİŞİ BEKLİYOR!"\n\nTelefon çalıyor. 87 cevapsız arama.', choices: [{ text: "Aç telefonu.", next: 5 }, { text: "Kapat, sakinleş.", next: 6 }] },
            { text: '"Şans mı? Hayatım bitti abi... 3 yılım gitti... Ev aldık, araba aldık..."\n\nAğlıyor.', choices: [{ text: "Mallar senin değil mi?", next: 7 }, { text: "Hayat bitmez.", next: 6 }] },
            { text: '"Şimdi öğrenmek mi iyi? Düğün günü öğrenseydim?! HERKESİN ÖNÜNDE?!"\n\nÖfkeleniyor.', choices: [{ text: "Haklısın.", next: 6 }, { text: "Bu daha iyi.", next: 6 }] },
            { text: 'Telefonu açtı. Annesi bağırıyor.\n\n"NEREDESİN?! HERKES BEKLİYOR!"', choices: [{ text: "(Sessiz kal)", next: 8 }, { text: "Telefonu al, konuş.", next: 9 }] },
            { text: 'Biraz sakinleşti.\n\n"Abi... Ben ne yapacağım şimdi? Her şey planlıydı..."', choices: [{ text: "Yeni plan yap.", next: 10 }, { text: "Önce eve git.", next: 10 }] },
            { text: '"Mallar mı? Hepsi onun üzerine... Ben salak mıyım abi?"\n\nKendi kendine güldü acı acı.', choices: [{ text: "Avukat tut.", next: 10 }, { text: "Geçmiş olsun.", next: 10 }] },
            { text: '"Anne ben evlenmiyorum... Hayır... Kız aldattı..."\n\nSessizlik. Sonra çığlık. Kapattı.', choices: [{ text: "Ailene söyle.", next: 10 }, { text: "Üzülme.", next: 10 }] },
            { text: 'Anneyle konuştun.\n\n"Oğlum nerede?! Getir onu! Ben bu kızı..."', ending: { money: 300, reputation: 40, type: 'normal', text: "300 lira. Anne geldi, oğlunu aldı. 'Bu kız yerini bulacak' dedi. Türk annesi kızdırırsan..." } },
            { text: 'Eve götürdüm. Adam kapıda durdu.\n\n"Abi... Hayat bitmedi değil mi?"', ending: { money: 400, reputation: 70, type: 'normal', text: "400 lira. Hayat bitmedi tabii. Bu da geçecek. 6 ay sonra mesaj geldi: 'Yeni sevgilim var abi, daha güzel!'" } },
        ]
    },
    // ===== KARAKTER 44: KEDİ SEVEN TEYZE =====
    {
        id: 44, name: "Kedi Seven Teyze", avatar: "🐈",
        image: require('./assets/characters/kedi_seven_teyze.png'),
        location: "Kadikoy", time: "18:00",
        intro: "Kollarında 3 kedi. 'Veterinere! Hepsinin aşı günü!'",
        dialogue: [
            { text: '"Dikkat et, Pamuk korkak, Minnoş hırçın, Tekir uslu..."\n\nKediler miyavlıyor.', choices: [{ text: "3 kedi mi?", next: 1 }, { text: "Tamam teyze.", next: 2 }] },
            { text: '"12 kedim var ama 3\'ü acildi. Diğerleri sırada bekliyor."\n\nKollarındakiler huysuz.', choices: [{ text: "12 kedi mi?!", next: 3 }, { text: "Vay be.", next: 4 }] },
            { text: 'Gaza bastın. Bir kedi kucağından atladı!\n\n"PAMUK! YAKALA!"', choices: [{ text: "Yakaladım!", next: 5 }, { text: "Nereye gitti?!", next: 6 }] },
            { text: '"12 değil, 14 olacak. Pamuk hamile. Minnoş da galiba..."\n\nKediler birbirine baktı.', choices: [{ text: "Maşallah.", next: 4 }, { text: "Çok değil mi?", next: 7 }] },
            { text: '"Ben yalnızım evladım. Kedilerim ailem. 20 yıldır böyle..."\n\nGözleri doldu.', choices: [{ text: "Anladım teyze.", next: 8 }, { text: "Güzel aile.", next: 8 }] },
            { text: 'Pamuk koltuğun altında! Titreyerek yakaladım.\n\n"AFERİN EVLADIM!"', choices: [{ text: "Zor kedi.", next: 8 }, { text: "Gelsin bakalım.", next: 8 }] },
            { text: 'Pamuk kaybettin! Arkadan miyavlıyor.\n\nTeyze panik: "DUR! PAMUK!"', ending: { money: 0, reputation: -20, type: 'normal', text: "Pamuk kaçtı. Teyze ağlarken indi. 1 hafta sonra mesaj: 'Pamuk bulundu! Komşu almış.' Neyse ki." } },
            { text: '"Çok mu? Herkes öyle diyor. Ama kim bakacak bu hayvanlara? Sokak mı?"\n\nŞiddetle baktı.', choices: [{ text: "Haklısınız.", next: 8 }, { text: "Barınak var.", next: 9 }] },
            { text: 'Veterinere vardınız. 3 kedi 3 kafese.\n\n"Sağ ol evladım. Bir dahaki sefer kalanlarla geliriz!"', choices: [{ text: "Bekliyorum.", next: 10 }, { text: "Diğer 11 ne zaman?", next: 10 }] },
            { text: '"Barınak mı?! ASLA! Orada öldürüp bu hayvanları!"\n\nÖfkelendi.', ending: { money: 100, reputation: 20, type: 'normal', text: "100 lira. Teyze öfkeli indi. Ama belki haklıdır. Sokak hayvanları zor." } },
            { text: 'Teyze 200 lira verdi. "Hafta sonu gel, diğerleri için. Ekstra öderim."\n\nKediler miyavladı.', ending: { money: 200, reputation: 60, type: 'normal', text: "200 lira ve kedi tüyleri. Araba 1 hafta kedi koktu. Ama teyze mutlu, kediler sağlıklı." } },
        ]
    },
    // ===== KARAKTER 45: KAYKAYCII GENÇ =====
    {
        id: 45, name: "Kaykaycı Genç", avatar: "🛹",
        image: require('./assets/characters/kaykayci_genc.png'),
        location: "Macka", time: "22:00",
        intro: "Kaykay kırık, diz kanıyor. 'Hastaneye abi! Yarışmam var yarın!'",
        dialogue: [
            { text: '"Trick yaparken düştüm! Yarın şampiyonluk finali!"\n\nDizi kanatıyor.', choices: [{ text: "Acil gidelim.", next: 1 }, { text: "Yarın yarışamazsın galiba.", next: 2 }] },
            { text: '"Acil evet! Ama yarın KESİN yarışıyorum! Bu finale 3 yıldır hazırlandık!"\n\nAcıyla yüzünü buruşturdu.', choices: [{ text: "Kararlıyım abi.", next: 3 }, { text: "Doktor ne der?", next: 4 }] },
            { text: '"Yarışamamak mı? YOK ÖYLE ŞEY ABİ!"\n\nAyağa kalkmaya çalıştı, düştü.', choices: [{ text: "Otur, götürüyorum.", next: 4 }, { text: "İnatçı mısın?", next: 5 }] },
            { text: 'Gaza bastın. Çocuk dizini tutuyor.\n\n"Abi çok acıyorum... Ama vazgeçmiyorum..."', choices: [{ text: "Doktor bakar.", next: 6 }, { text: "Seni anlıyorum.", next: 6 }] },
            { text: '"3 yıl çalıştık... Her gün antrenman... Sponsorluk bile geldi... Şimdi bu mu?"\n\nGözleri doldu.', choices: [{ text: "Bir yarış değil her şey.", next: 6 }, { text: "Diğer yarışlar olur.", next: 6 }] },
            { text: '"İnatçı mı? Abi bu hayatım! Kaykay olmasa ben yokum!"\n\nTutkulu baktı.', choices: [{ text: "Tutkun güzel.", next: 6 }, { text: "Sağlık önce.", next: 6 }] },
            { text: 'Hastaneye vardınız. Çocuk sordu:\n\n"Abi... Sen de bi şeyi çok istedin mi hiç?"', choices: [{ text: "Evet, taksicilik.", next: 7 }, { text: "Herkesin bir hayali var.", next: 7 }] },
            { text: '"Taksicilik mi? İlginç. Neden?"\n\nMerakla baktı.', choices: [{ text: "İnsanları dinlemek.", next: 8 }, { text: "Özgürlük.", next: 8 }] },
            { text: 'Acile girdik. Doktor baktı.\n\n"Sadece yırtık. Yarın yarışabilir. DİKİŞ bile yok!"', choices: [{ text: "Süper!", next: 9 }, { text: "Dikkatli ol.", next: 9 }] },
            { text: 'Çocuk zıpladı!\n\n"ABİ SEN UĞURLU MUSUN! GEL YARIN! VİP BİLET!"', ending: { money: 100, reputation: 80, type: 'hospital', text: "100 lira. Ertesi gün gittin. Çocuk ŞAMPİYON OLDU! Seni selamladı. 'Bu abi beni getirdi!' dedi TV'ye." } }
        ]
    },
    // ===== KARAKTER 46: ROMANTİK GENÇ =====
    {
        id: 46, name: "Romantik Genç", avatar: "💐",
        image: require('./assets/characters/romantik_genc.png'),
        location: "Besiktas", time: "19:00",
        intro: "Elinde dev çiçek buketi. 'Kız arkadaşımın evine! Evlenme teklifi yapacağım!'",
        dialogue: [
            { text: '"3 yıldır birlikte! Bugün gün! Yüzük cebimde!"\n\nElleri titriyor.', choices: [{ text: "Tebrikler!", next: 1 }, { text: "Heyecanlı mısın?", next: 2 }] },
            { text: '"EVET derse hayatım tamam! HAYIR derse..."\n\nSessizleşti.', choices: [{ text: "Evet der.", next: 3 }, { text: "Korkma, seviyor.", next: 4 }] },
            { text: '"Çok heyecanlıyım! Elim ayağım titriyor!"\n\nÇiçeklere baktı.', choices: [{ text: "Rahat ol.", next: 5 }, { text: "Prova yapalım mı?", next: 6 }] },
            { text: '"Nereden biliyorsun evet diyeceğini?"\n\nŞüpheli baktı.', choices: [{ text: "7 yıllık taksiciyim, görüyorum.", next: 5 }, { text: "Seviyor seni.", next: 5 }] },
            { text: '"Seviyor... Evet seviyor... En azından öyle sanıyorum..."\n\nTereddüt.', choices: [{ text: "Neden şüphe?", next: 7 }, { text: "Elbette seviyor.", next: 5 }] },
            { text: 'Eve yaklaştın.\n\n"Tamam... Derin nefes... Sakin ol..."', choices: [{ text: "Başarırsın.", next: 8 }, { text: "İyi şanslar!", next: 8 }] },
            { text: '"Prova yapalım mı derken?"\n\nGüldü.', choices: [{ text: "Ne diyeceksin söyle.", next: 9 }, { text: "Şaka yaptım.", next: 5 }] },
            { text: '"Şüphe çünkü... Son zamanlarda uzak geliyor... Ama belki yorgundur..."\n\nİç çekti.', choices: [{ text: "Evlenme teklifiyle düzelir.", next: 8 }, { text: "Önce konuş.", next: 10 }] },
            { text: 'Evin önünde indin.\n\n"Tamam... Gidiyorum... Dua et abi!"', choices: [{ text: "Hayırlı olsun!", next: 11 }, { text: "Bekliyorum.", next: 12 }] },
            { text: '"Diyeceğim ki: Seni seviyorum, benimle evlenir misin?"\n\nBasit ama etkili.', choices: [{ text: "Mükemmel.", next: 8 }, { text: "Daha romantik?", next: 8 }] },
            { text: '"Önce konuşalım mı? Ama yüzük hazırladı, çiçekler hazırladı..."\n\nDüşündü.', ending: { money: 150, reputation: 30, type: 'normal', text: "150 lira. Adam gitti. 2 saat sonra mesaj: 'Konuştuk. Ayrılıyoruz.' Üzücü ama iyi ki teklif etmemiş." } },
            { text: 'Adam koşarak gitti. Bekledin.\n\n10 dakika sonra mesaj: "EVET DEDİ!!!"', ending: { money: 300, reputation: 100, type: 'normal', text: "300 lira ve mutluluk! Düğüne davet etti. 6 ay sonra nikah şahitliği yaptın." } },
            { text: 'Bekledin. 15 dakika sonra geri geldi. Ağlıyor.\n\n"HAYIR DEDİ ABİ..."', ending: { money: 100, reputation: 50, type: 'normal', text: "100 lira. Adam ağladı, sen dinledin. Hayat böyle. Ama en azından denedi." } },
        ]
    },
    // ===== KARAKTER 47: BITCOIN MİLYONERİ =====
    {
        id: 47, name: "Bitcoin Milyoneri", avatar: "₿",
        image: require('./assets/characters/bitcoin_milyoneri.png'),
        location: "Etiler", time: "16:00",
        intro: "Genc, rahat kiyafetler ama luks saat. 'Levente. Lamborghini almaya!'",
        dialogue: [
            { text: '"2010\'da 100 Bitcoin aldım! Herkes güldü! Şimdi 3 milyon dolarım var!"\n\nKendinden emin.', choices: [{ text: "Vay be! Keşke biz de alsaydık.", next: 1 }, { text: "Şanslıymışsın.", next: 2 }] },
            { text: '"Şans değil VİZYON! Bir tane daha al derim sana!"\n\nTavsiye veriyor.', choices: [{ text: "Param yok ki.", next: 3 }, { text: "Bakarız.", next: 4 }] },
            { text: '"Vizyon mu şans mı? Bilemiyorum abi..."\n\nGüldü.', choices: [{ text: "Her ikisi de.", next: 4 }, { text: "Zeki adammışsın.", next: 4 }] },
            { text: '"Param olmadığında ben de fakirdim. Şimdi 4 arabam var!"\n\nKibir mi, gerçek mi?', choices: [{ text: "Neden 4 araba?", next: 5 }, { text: "Tebrikler.", next: 6 }] },
            { text: '"Kripto çok riskli diyorlar. Doğru mu?"\n\nMerakla sordu.', choices: [{ text: "Evet, dikkat et.", next: 7 }, { text: "Sen bilirsin.", next: 6 }] },
            { text: '"4 araba çünkü her gün farklı mod! Bugün Lambo modu!"\n\nGüldü.', choices: [{ text: "Güzel hayat.", next: 6 }, { text: "Zenginlik yorar mı?", next: 8 }] },
            { text: 'Galeriye yaklaşıyorsun.\n\n"İşte orası! Hayalim gerçek olacak!"', choices: [{ text: "Tebrikler.", next: 9 }, { text: "Kaç para?", next: 10 }] },
            { text: '"Riskli mi? HAYAT RİSKLİ! Risk almayan kazanmaz!"\n\nFelsefe yapıyor.', choices: [{ text: "Haklısın.", next: 6 }, { text: "Dikkatli ol.", next: 6 }] },
            { text: '"Yorar mı? Bazen... Herkes para istiyor... Gerçek dost yok..."\n\nBir an hüzünlendi.', choices: [{ text: "Anlıyorum.", next: 9 }, { text: "Para her şeyi çözmez.", next: 9 }] },
            { text: 'Galeri önünde indin. Lamborghini sipariş etti.\n\n"1 yılda sen de olursun!"', ending: { money: 1000, reputation: 50, type: 'normal', text: "1000 lira bahşiş! 'Kripto al abi!' dedi. 1 ay sonra Bitcoin düştü. İyi ki almamışsın." } },
            { text: '"500.000 dolar! Ama nakit ödüyorum!"\n\nGüldü.', ending: { money: 500, reputation: 30, type: 'normal', text: "500 lira. Hayaller güzel ama gerçek farklı. Sen taksine devam et." } },
        ]
    },
    // ===== KARAKTER 48: HAYALET AVCISI =====
    {
        id: 48, name: "Hayalet Avcısı", avatar: "👻",
        image: require('./assets/characters/hayalet_avcisi.png'),
        location: "Rumeli Hisari", time: "22:00",
        intro: "Garip aletler, siyah kıyafet. 'Belgrad Ormanı! Paranormal aktivite var!'",
        dialogue: [
            { text: '"Bu gece RUH AVLAYACAĞIZ! Gel sen de!"\n\nCiddi baktı.', choices: [{ text: "Hayır sağ ol.", next: 1 }, { text: "Tamam, gelelim.", next: 2 }] },
            { text: '"Korkma, profesyoneliz! 200 ruh yakaladık!"\n\nAletlerini gösterdi.', choices: [{ text: "(Deli bu)", next: 3 }, { text: "Vay canına.", next: 4 }] },
            { text: '"Gelmezsen büyük fırsat kaçırırsın! Bugün DOLUNAY!"\n\nIsrar.', choices: [{ text: "Yok, pas.", next: 5 }, { text: "Tamam ikna oldum.", next: 4 }] },
            { text: '"200 ruh mu? Sahiden mi?"\n\nŞüpheli baktın.', choices: [{ text: "Şaka yapıyor.", next: 5 }, { text: "Anlat.", next: 6 }] },
            { text: 'Ormana girdin. Karanlık. Sessizlik.\n\n"Şşş... Duyuyor musun?"', choices: [{ text: "Hiçbir şey duymuyorum.", next: 7 }, { text: "(Bekle)", next: 8 }] },
            { text: 'Orman girişinde indin.\n\n"Tamam, yarın tekrar geliriz! Sen bırak!"', ending: { money: 200, reputation: 10, type: 'normal', text: "200 lira. Adam gitti. Hayalet yoktu galiba. Ya da vardı?" } },
            { text: '"Her birini belgeledik! Youtube kanalımız var! 1 milyon abone!"\n\nGururlu.', choices: [{ text: "Link gönder.", next: 5 }, { text: "İlginç.", next: 5 }] },
            { text: '"Hiçbir şey mi? BEKLE!"\n\nAletler çıldırdı! IŞIKLAR YANDI!', choices: [{ text: "N-NE OLUYOR?!", next: 9 }, { text: "Gidelim buradan!", next: 10 }] },
            { text: 'Sessizlik... Sonra bir ses... FISILDA...\n\n"...gitt..."', choices: [{ text: "KAÇÇÇÇÇÇ!", next: 10 }, { text: "(Dona kal)", next: 10 }] },
            { text: 'ALETLER PATLADI! CAMLAR TİTREDİ!\n\n"BULDUK! BULDUK! KAYIT ALIYOR!"', ending: { money: 500, reputation: 50, type: 'normal', text: "500 lira. Videoya çıktın. 5 milyon izlendi. Yorumlarda: 'TAKSİCİ HAYALET GÖRDÜ!' Ünlü oldun. Garip bir şekilde." } },
            { text: 'Arabaya atladınız. Gaza bastın!\n\n"EFSANEYDİ! SEN KAHRAMANSIN!"', ending: { money: 300, reputation: 30, type: 'normal', text: "300 lira. O gece uyuyamadın. Ama adam mutluydu. Hayaletler... varlar mı?" } },
        ]
    },
    // ===== KARAKTER 49: SÜRPRİZ YUMURTA =====
    {
        id: 49, name: "Sürpriz Yumurta", avatar: "🥚",
        image: require('./assets/characters/surpriz_yumurta.png'),
        location: "Bagdat Caddesi", time: "12:00",
        intro: "Çocuk doğum günü kostümü: Dev yumurta. 'Partiye yetişmeliyim! Animatörüm!'",
        dialogue: [
            { text: '"Kafam sıkıştı! Kaskı çıkaramıyorum! Ama partiye yetişmeliyim!"\n\nSesi boğuk geliyor.', choices: [{ text: "Yardım edeyim.", next: 1 }, { text: "Nasıl süreceksin?", next: 2 }] },
            { text: 'Kaskı çıkardın. Adam rahat nefes aldı.\n\n"OF! Sağ ol! Hadi gidelim!"', choices: [{ text: "Güzel kostüm.", next: 3 }, { text: "Zor iş.", next: 4 }] },
            { text: '"Göremiyorum abi! Sen bana yardım et!"\n\nGülünç durum.', choices: [{ text: "Tamam, yönlendiririm.", next: 5 }, { text: "Çıkarsana kaskı.", next: 1 }] },
            { text: '"Bu kostüm 5000 lira! Çocuklar bayılıyor!"\n\nGururlu.', choices: [{ text: "Pahalı.", next: 5 }, { text: "Değecek.", next: 5 }] },
            { text: '"Zor iş mi? CENNETİ GÖRMÜYORSUN! Çocukların yüzündeki mutluluk..."\n\nGözleri parladı.', choices: [{ text: "Güzel meslek.", next: 5 }, { text: "Yorucu değil mi?", next: 6 }] },
            { text: 'Parti adresine yaklaştın.\n\n"Tamam, kask taksam mı şimdi?"', choices: [{ text: "Tak.", next: 7 }, { text: "Bekle, inince.", next: 7 }] },
            { text: '"Yorucu ama değmez! Her parti farklı hikaye!"\n\nAnlatıyor.', choices: [{ text: "Mesela?", next: 8 }, { text: "İlginç.", next: 7 }] },
            { text: 'Partiye varacaksın. Çocuklar pencereden bakıyor!\n\n"YUMURTA AMCA GELİYOR!"', choices: [{ text: "Hazır mısın?", next: 9 }, { text: "Eğlenceli olacak.", next: 9 }] },
            { text: '"Bir keresinde çocuk ağladı durdu. Yumurtayı kırdı. İçinden çıkmamı istedi!"\n\nGüldü.', choices: [{ text: "Haha, güzel.", next: 7 }, { text: "Çocuklar.", next: 7 }] },
            { text: 'İndin. Çocuklar yumurtaya koştu!\n\n"YUMURTA AMCA! SÜRPRİZ NE?!"', ending: { money: 250, reputation: 80, type: 'normal', text: "250 lira ve çocuk gülücükleri. Adam el salladı kostümüyle. Animatörlük zor ama güzel meslek." } },
        ]
    },
    // ===== KARAKTER 50: ÖZEL DEDEKTİF =====
    {
        id: 50, name: "Özel Dedektif", avatar: "🔍",
        image: require('./assets/characters/ozel_dedektif.png'),
        location: "Karakoy", time: "21:00",
        intro: "Trençkot, şapka. 'Takip ediyorum birini. Yalnızca sür, soru sorma.'",
        dialogue: [
            { text: '"Öndeki beyaz arabayı takip et. Mesafe koru."\n\nCiddi.', choices: [{ text: "Kim bu?", next: 1 }, { text: "Tamam.", next: 2 }] },
            { text: '"Soru sorma dedim. Sadece sür."\n\nDikiz aynasından bakıyor.', choices: [{ text: "(Sus)", next: 2 }, { text: "Tehlikeli iş mi?", next: 3 }] },
            { text: 'Beyaz araba sağa döndü. Takip ediyorsun.\n\n"İyi... İyi... Yaklaşma."', choices: [{ text: "Ne arıyorsun?", next: 4 }, { text: "(Devam)", next: 5 }] },
            { text: '"Tehlikeli mi? Her iş tehlikeli. Bu iş özellikle."\n\nSigara yaktı.', choices: [{ text: "Polis değilsin.", next: 6 }, { text: "Anlat.", next: 4 }] },
            { text: '"Adam karısını aldatıyor. Kadından 50.000 alacağım ispatlarsam."\n\nİş.', choices: [{ text: "Aldatma vakası mı?", next: 7 }, { text: "Zor iş.", next: 7 }] },
            { text: 'Araba bir apart otele girdi!\n\n"BINGO! Fotoğraf çek!"', choices: [{ text: "Ben mi?!", next: 8 }, { text: "Kendin çek.", next: 9 }] },
            { text: '"Polis mi? Hayır. Özel dedektif. Lisansım var."\n\nKart gösterdi.', choices: [{ text: "İlginç meslek.", next: 5 }, { text: "Tehlikeli.", next: 5 }] },
            { text: '"Evet, aldatma. En çok bu vakalar geliyor. Üzücü ama kazançlı."\n\nProfesyonel.', choices: [{ text: "Vicdan?", next: 10 }, { text: "İş iş.", next: 5 }] },
            { text: '"Sen çek! Taksici kimse şüphelenmez!"\n\nMantıklı.', choices: [{ text: "Tamam, çekerim.", next: 11 }, { text: "Olmaz, riskli.", next: 9 }] },
            { text: 'Adam kendi çekti. 10 dakika sonra döndü.\n\n"ALDIM! İSPAT VAR!"', ending: { money: 500, reputation: 40, type: 'normal', text: "500 lira. Adam mutlu, bir evlilik bitecek. Garip bir gece." } },
            { text: '"Vicdan mı? Onlar aldatıyor, ben sadece kaydediyorum."\n\nSoğuk.', ending: { money: 300, reputation: 20, type: 'normal', text: "300 lira. Adam delil aldı. Bir evlilik daha bitti. Sen sadece şofördün." } },
            { text: 'Fotoğraf çektin. Adam ve kadın ışıkları!\n\n"MÜKEMMEL! BONUS!"', ending: { money: 800, reputation: 50, type: 'normal', text: "800 lira! Delil sen çektin. Bir evlilik bitti ama... vicdan rahat mı?" } },
        ]
    },
    // ===== KARAKTER 51: EMEKLİ KAPTAN =====
    {
        id: 51, name: "Emekli Kaptan", avatar: "⚓",
        image: require('./assets/characters/emekli_kaptan.png'),
        location: "Kadikoy", time: "16:00",
        intro: "Denizci şapkası, yüzünde sigara. 'Limana götür evlat. Son vapur kalkıyor.'",
        dialogue: [
            { text: '"40 yıl denizlerde geçtim. Şimdi karada kayboldum..."\n\nCamdan bakıyor.', choices: [{ text: "Denizi özlüyor musun?", next: 1 }, { text: "Huzurlu hayat.", next: 2 }] },
            { text: '"Özlemek mi? Her gece dalgaları duyuyorum... Ruhumda deniz var..."\n\nGözleri daldı.', choices: [{ text: "Neden emekli oldun?", next: 3 }, { text: "Deniz zor.", next: 4 }] },
            { text: '"Huzur mu? Denizde fırtına vardı ama huzur da vardı..."\n\nİç çekti.', choices: [{ text: "Kara zor mu?", next: 5 }, { text: "Anlıyorum.", next: 4 }] },
            { text: '"Emekli mi? Mecbur kaldım evlat. Gözlerim artık göremez oldu. Deniz tehlikeli..."\n\nGözleri doldu.', choices: [{ text: "Üzülme kaptan.", next: 6 }, { text: "40 yıl büyük başarı.", next: 6 }] },
            { text: '"Deniz zor evet. Ama hep doğruydu. İnsanlar gibi yalan söylemezdi..."\n\nAcı gülümsedi.', choices: [{ text: "İnsanlar mı hayal kırıklığı?", next: 7 }, { text: "Deniz sadık dost.", next: 6 }] },
            { text: '"Kara mı? Karada kayboldum evlat. Sokaklar bana yabancı..."\n\nEtrafa baktı şaşkın.', choices: [{ text: "Yardım edeyim.", next: 6 }, { text: "Alışırsın.", next: 6 }] },
            { text: 'Limana yaklaşıyorsunuz. Vapurlar göründü.\n\n"İşte... İşte onlar... Eski dostlarım..."', choices: [{ text: "Güzel görünüm.", next: 8 }, { text: "Özlemişsin.", next: 8 }] },
            { text: '"İnsanlar mı? Oğullarım beni terk etti. Karım öldü. Şimdi sadece vapur kaldı..."\n\nSessizlik.', choices: [{ text: "Üzgünüm.", next: 8 }, { text: "Vapur iyi dost.", next: 8 }] },
            { text: 'Kaptan indi. Limana doğru yürüdü. Bir vapura baktı, el salladı.\n\n"Elveda dostum... Son sefer..."', ending: { money: 300, reputation: 100, type: 'normal', text: "300 lira. Kaptan vapura bindi. Denize doğru el salladı. 40 yıllık denizci artık karada." } },
        ]
    },
    // ===== KARAKTER 52: SINAV OGRENCİSİ =====
    {
        id: 52, name: "Sınav Öğrencisi", avatar: "📚",
        image: require('./assets/characters/sinav_ogrencisi.png'),
        location: "Besiktas", time: "07:30",
        intro: "Kitaplar kolunda, gözler kırmızı. 'YKS merkezi! 30 dakika var!'",
        dialogue: [
            { text: '"2 yıldır çalışıyorum! Hayatım bu sınava bağlı!"\n\nElleri titriyor.', choices: [{ text: "Yetişiriz, sakin ol.", next: 1 }, { text: "Başarılı olacaksın!", next: 2 }] },
            { text: '"Sakin mi?! SAKİN Mİ?! Annem babam bekliyor! Tüm aile bekliyor!"\n\nStres.', choices: [{ text: "Derin nefes.", next: 3 }, { text: "Trafik boş.", next: 4 }] },
            { text: '"Başarılı... Başarılı olmalıyım... Yoksa..."\n\nSustu.', choices: [{ text: "Yoksa ne?", next: 5 }, { text: "Başarırsın.", next: 4 }] },
            { text: 'Derin nefes aldı. Biraz sakinledi.\n\n"Tamam... Tamam... Formüllere odaklan..."', choices: [{ text: "Ne sınavı?", next: 6 }, { text: "Çalış.", next: 4 }] },
            { text: 'Gaza bastın! Trafik boş.\n\n"Yetişeceğiz gibi! ALLAH RAZI OLSUN ABİ!"', choices: [{ text: "Dua et.", next: 7 }, { text: "Neredeyse geldik.", next: 7 }] },
            { text: '"Yoksa... Babam çok hayal kırıklığı olacak. Tek çocuklarıyım. Bütün umutları bende..."\n\nGözleri doldu.', choices: [{ text: "Ailen seni sever.", next: 7 }, { text: "Kendin için çalış.", next: 7 }] },
            { text: '"Tıp istiyorum. Cerrah olmak istiyorum. İnsanları kurtarmak..."\n\nGözleri parladı.', choices: [{ text: "Güzel hedef.", next: 7 }, { text: "Zor ama değecek.", next: 7 }] },
            { text: 'Sınav merkezine vardınız! Öğrenci kapı önünde.\n\n"YETİŞTİK! ABİ SEN MELEKSİN!"', choices: [{ text: "Başarılar!", next: 8 }, { text: "Dua ediyorum.", next: 8 }] },
            { text: 'Öğrenci koştu. Kapıda döndü, el salladı.\n\n"DUA ET ABİ!"', ending: { money: 100, reputation: 100, type: 'normal', text: "100 lira. 3 ay sonra mesaj: 'TIP KAZANDIM ABİ! 10.000'de 500!' Hayat güzel. Bir cerrah daha." } },
        ]
    },
    // ===== KARAKTER 53: SOKAK MÜZİSYENİ =====
    {
        id: 53, name: "Sokak Müzisyeni", avatar: "🎺",
        image: require('./assets/characters/sokak_muzisyeni.png'),
        location: "Istiklal", time: "00:30",
        intro: "Elinde saksafon, şapka para dolu. 'Limana götür. Gemi kalkıyor.'",
        dialogue: [
            { text: '"İtalya\'ya gidiyorum. İstanbul bitti benim için..."\n\nSaksafonu okşuyor.', choices: [{ text: "Neden gidiyorsun?", next: 1 }, { text: "İyi yolculuklar.", next: 2 }] },
            { text: '"Neden mi? Burada kimse müziği anlamıyor. Avrupa\'da değerimi bilirler."\n\nAcı gülümsedi.', choices: [{ text: "İstanbul da güzel.", next: 3 }, { text: "Haklısın belki.", next: 4 }] },
            { text: '"İyi yolculuklar mı? 15 yılımı verdim bu şehre. Tek bir teşekkür..."\n\nGözleri doldu.', choices: [{ text: "Ben teşekkür ederim.", next: 5 }, { text: "Orada başarılı olursun.", next: 4 }] },
            { text: '"İstanbul güzel evet. Ama para yok. Sanat olmuyor parasız..."\n\nİç çekti.', choices: [{ text: "Online denesen?", next: 6 }, { text: "Anlıyorum.", next: 4 }] },
            { text: '"Haklı mıyım? Bilmiyorum. Ama denemem lazım. Son şans..."\n\nLimana baktı.', choices: [{ text: "Risk almak cesaret.", next: 7 }, { text: "Başarılar.", next: 7 }] },
            { text: '"Sen teşekkür mü? Sen iyi adamsın şoför. 15 yılda sen ilk..."\n\nEli uzattı.', choices: [{ text: "(Tokalaş)", next: 7 }, { text: "İyi şanslar.", next: 7 }] },
            { text: '"Online mı? YouTube denedim. 47 abone. Hepsi akrabam."\n\nGüldü acı acı.', choices: [{ text: "İtalya\'da farklı olur.", next: 7 }, { text: "Pes etme.", next: 7 }] },
            { text: 'Limana vardınız. Gemi bekliyor.\n\n"İşte... Yeni hayat... Ya da son hayal..."', choices: [{ text: "Başarırsın.", next: 8 }, { text: "Bilet parası da ödeyeyim.", next: 9 }] },
            { text: 'Adam indi. Saksafonunu çıkardı. SON BİR MELODİ ÇALDI. Unutulmaz.\n\n"İstanbul için... Ve senin için..."', ending: { money: 200, reputation: 80, type: 'normal', text: "200 lira. Adam gemiye bindi. 1 yıl sonra Spotifyda buldun: 10 MILYON DINLEME! Başarmış!" } },
            { text: '"Bilet mi? Hayır abi. Sen çok yaptın. Bu son hediyem sana..."\n\nSaksafon çaldı. Gözlerin doldu.', ending: { money: 0, reputation: 150, type: 'normal', text: "Para almadın. Adam saksafonla veda etti. O melodi hala aklında. Bazı geceler unutulmaz." } },
        ]
    },
    // ===== KARAKTER 54: ALMANCI DAYI =====
    {
        id: 54, name: "Almancı Dayı", avatar: "🇩🇪",
        image: require('./assets/characters/almanci_dayi.png'),
        location: "Havalimani", time: "09:00",
        intro: "Mercedes şapkası, kalın palto. 'Köye götür! Memleketi görmeyeli 10 yıl!'",
        dialogue: [
            { text: '"Almanya soğuk! Burası sıcak! İnsanlar sıcak! Her şey güzel!"\n\nGözleri parladı.', choices: [{ text: "Hoşgeldiniz dayı.", next: 1 }, { text: "10 yıl çok uzun.", next: 2 }] },
            { text: '"Hoşbuldum evlat! TÜRKİYE TÜRKİYE! Almanya\'da böyle ışık yok!"\n\nHer yere bakıyor.', choices: [{ text: "Özlemişsiniz.", next: 3 }, { text: "Neden geri dönmediniz?", next: 4 }] },
            { text: '"10 yıl... Evet uzun... Annem öldü, babam öldü... Gelemedim..."\n\nSustu.', choices: [{ text: "Başınız sağ olsun.", next: 5 }, { text: "Şimdi buradasın.", next: 5 }] },
            { text: '"Özlem mi? Her gece Türkiye rüyası... Her sabah Almanya gerçeği..."\n\nİç çekti.', choices: [{ text: "Gurbet zor.", next: 5 }, { text: "Para için mi?", next: 6 }] },
            { text: '"Neden mi? Çocuklar... İşler... Hayat..."\n\nMazeret gibi.', choices: [{ text: "Şimdi buradasın.", next: 5 }, { text: "Anlıyorum.", next: 5 }] },
            { text: '"Sağ ol evlat. 40 yıl gurbette yaşadım. Annem babam ölmeden göremedim..."\n\nAğladı.', choices: [{ text: "Üzülme dayı.", next: 7 }, { text: "(Sessiz kal)", next: 7 }] },
            { text: '"Para mı? Evet para. Ama şimdi param var, ailem yok. Değer miydi?"\n\nSoran bakış.', choices: [{ text: "Zor soru.", next: 7 }, { text: "En azından denediniz.", next: 7 }] },
            { text: 'Köye yaklaşıyorsunuz. Dayı camdan bakıyor.\n\n"Burası... Burası bizim köy... 40 yılda ne kadar değişmiş..."', choices: [{ text: "Güzel yer.", next: 8 }, { text: "Her şey değişir.", next: 8 }] },
            { text: 'Köye vardınız. Dayı indi. Etrafa baktı. Gözlerinden yaşlar aktı.\n\n"Sağ ol evlat. Almanya\'da böyle taksici yok. Belki hiç yok..."', ending: { money: 500, reputation: 100, type: 'normal', text: "500 lira ve çok bahşiş. Dayı mezarlığa yürüdü. 'Anne, baba, geldim...' dedi. Gurbet zor. Çok zor." } }
        ]
    },
    // ===== KARAKTER 55: AVM ÇOCUĞU =====
    {
        id: 55, name: "AVM Çocuğu", avatar: "👦",
        image: require('./assets/characters/kaybolan_cocuk.png'),
        location: "AVM", time: "18:00",
        intro: "8-9 yaşında, ağlıyor. 'Amca annemi kaybettim!'",
        dialogue: [
            { text: '"AVM\'de kayboldum! Annem beni arıyor olmalı!"\n\nHıçkıra hıçkıra ağlıyor.', choices: [{ text: "Sakin ol, buluruz.", next: 1 }, { text: "Polisi arayalım.", next: 2 }] },
            { text: '"Sakin ol mu?! ANNEM NEREDE?!"\n\nPanik.', choices: [{ text: "Birlikte buluruz.", next: 3 }, { text: "Annenin telefonu?", next: 4 }] },
            { text: '"Polis mi? Annem kızıyor polise..."\n\nKorktu.', choices: [{ text: "Tamam, güvenlik arayalım.", next: 5 }, { text: "Polis yardım eder.", next: 6 }] },
            { text: '"Birlikte mi? Sen... Sen iyi amca mısın?"\n\nŞüpheli baktı.', choices: [{ text: "Evet, yardım edeceğim.", next: 5 }, { text: "Taksiciyim, merak etme.", next: 5 }] },
            { text: '"Telefon mu? 0532... 0532... UNUTTUM!"\n\nDaha çok ağladı.', choices: [{ text: "Güvenlik arayalım.", next: 5 }, { text: "AVM hangi?", next: 7 }] },
            { text: 'Güvenlik aradınız. Anons yaptıkları.\n\n10 dakika sonra anne geldi. "YAVRUM!"', choices: [{ text: "Bulundu.", next: 8 }, { text: "(Geri çekil)", next: 8 }] },
            { text: 'Polisi aradın. 15 dakika sonra polis ve anne beraber geldi.\n\n"Allah razı olsun abicim!"', ending: { money: 0, reputation: 250, type: 'police', text: "Para almadın. Polis teşekkür etti. Anne sarıldı. Bir çocuk ailesine kavuştu." } },
            { text: '"Cevahir AVM. Orada oyuncakçıydık. Sonra kayboldum..."\n\nHatırladı.', choices: [{ text: "Geri dönelim.", next: 5 }, { text: "Güvenlik arar.", next: 5 }] },
            { text: 'Anne çocuğa sarıldı. Ağlıyor.\n\n"Oğlum! Bir daha ayrılma!"', ending: { money: 0, reputation: 200, type: 'normal', text: "Para almadın. Anne ağlayarak teşekkür etti. 'Sizi unutmayacağız' dedi. Bazı şeyler parayla olmaz." } },
        ]
    },
    // ===== KARAKTER 56: ANTİKACI =====
    {
        id: 56, name: "Antikacı", avatar: "🏺",
        image: require('./assets/characters/antikaci.png'),
        location: "Cukurcuma", time: "11:00",
        intro: "Eski kıyafetler, elinde paha biçilmez görünen bir vazo. 'Müzeye! Keşfettim!'",
        dialogue: [
            { text: '"Bu vazo Bizans dönemi! Milyon dolar eder!"\n\nGözleri parladı.', choices: [{ text: "Ciddi misin?", next: 1 }, { text: "Nereden buldun?", next: 2 }] },
            { text: '"Ciddi mi? 30 yıllık antikacıyım! Gözüm yanılmaz!"\n\nKendinden emin.', choices: [{ text: "Nereden buldun?", next: 2 }, { text: "Tebrikler.", next: 3 }] },
            { text: '"Nereden mi? Bir ev boşaltıyorduk. Çatıda gizli bir oda... Ve bu!"\n\nVazoyu gösterdi.', choices: [{ text: "Gizli oda mı?", next: 4 }, { text: "İlginç.", next: 3 }] },
            { text: '"Teşekkürler. 30 yıl bekledim bu an için. Artık zengin olacağım!"\n\nHayaller.', choices: [{ text: "Ya sahte çıkarsa?", next: 5 }, { text: "İnşallah.", next: 6 }] },
            { text: '"Gizli oda! Osmanlı döneminden kalmış. Orada 100 parça vardı! Bu en değerli!"\n\nHeyecanlı.', choices: [{ text: "Diğer parçalar?", next: 7 }, { text: "Wow.", next: 6 }] },
            { text: '"Sahte mi? ASLA! Bu vazonun ağırlığını, desenini, rengini biliyorum! GERÇEK!"\n\nÖfkelendi.', choices: [{ text: "Tamam tamam.", next: 6 }, { text: "Uzman ne der?", next: 6 }] },
            { text: 'Müzeye yaklaşıyorsunuz.\n\n"İşte! İstanbul Arkeoloji Müzesi! Burada karar verilecek!"', choices: [{ text: "Heyecanlı mısın?", next: 8 }, { text: "Başarılar.", next: 8 }] },
            { text: '"Diğer parçalar? Evde. Ama bu en önemli. Bu gerçekse, hepsi gerçek!"\n\nPlan yapıyor.', choices: [{ text: "Akıllı plan.", next: 6 }, { text: "Dikkatli ol.", next: 6 }] },
            { text: 'Müzeye vardınız. Adam indi. Geri döndü.\n\n"Gel sen de! Tarihi an!"', choices: [{ text: "Tamam, gelelim.", next: 9 }, { text: "Bekleyeyim.", next: 10 }] },
            { text: 'İçeri girdiniz. Uzmanlar inceledi. 30 dakika sonra...\n\n"BU GERÇEK! PAHA BİÇİLEMEZ!"', ending: { money: 2000, reputation: 150, type: 'normal', text: "2000 lira bahşiş! Adam tarih yazdı. Vazo 3 milyon dolara sigortalattı. Sen de o anın şahidisin." } },
            { text: '30 dakika bekledin. Adam geri geldi. Gülüyordu.\n\n"GERÇEK! 3 MİLYON DOLAR!"', ending: { money: 1000, reputation: 100, type: 'normal', text: "1000 lira bahşiş! Adam tarih yazdı. Sen de bunun parçasısın." } },
        ]
    },
    // ===== KARAKTER 57: ÜNLÜ YAZAR =====
    {
        id: 57, name: "Ünlü Yazar", avatar: "📝",
        image: require('./assets/characters/unlu_yazar.png'),
        location: "Bebek", time: "16:00",
        intro: "Eski model gözlük, dağınık saç. 'Yayın evine. Yeni kitap teslimi!'",
        dialogue: [
            { text: '"20 kitap yazdım. Bu sonuncusu en iyisi..."\n\nDosyayı okşuyor.', choices: [{ text: "Ne hakkında?", next: 1 }, { text: "Tebrikler.", next: 2 }] },
            { text: '"Ne hakkında mı? İstanbul. Taksiciler. SENİN HİKAYEN!"\n\nSana baktı.', choices: [{ text: "Benim mi?!", next: 3 }, { text: "Vay be.", next: 4 }] },
            { text: '"Teşekkürler. Ama bu kitap farklı. Gerçek insanlar. Gerçek hikayeler."\n\nCiddi.', choices: [{ text: "Benim de var mı?", next: 3 }, { text: "İlginç.", next: 4 }] },
            { text: '"Evet! 3 yıldır taksicileri dinliyorum. Seni de yazdım. ADIN VAR!"\n\nHeyecanlı.', choices: [{ text: "Ciddi mi?", next: 5 }, { text: "Vay be.", next: 5 }] },
            { text: '"Gerçek insanlar... Bu şehrin görünmeyen kahramanları... Taksiciler!"\n\nDuygusal.', choices: [{ text: "Güzel perspektif.", next: 5 }, { text: "Bizi kim dinler ki.", next: 6 }] },
            { text: '"Evet ciddi! 3 yıl önce bindim taksine. O gece hikayeni anlattın. UNUTULMAZ!"\n\nHatırlıyor.', choices: [{ text: "Hatırlamıyorum.", next: 7 }, { text: "Hangi hikaye?", next: 7 }] },
            { text: '"Kim dinler mi? BEN DİNLEDİM! Ve 50.000 kişi okuyacak!"\n\nGururlu.', choices: [{ text: "Vay canına.", next: 5 }, { text: "Teşekkürler.", next: 5 }] },
            { text: '"Annenin hikayesi. Hastanede son anlar. Ağlayarak anlattın. BEN DE AĞLADIM."\n\nGözleri doldu.', choices: [{ text: "(Hatırladın)", next: 8 }, { text: "O gece...", next: 8 }] },
            { text: 'Yayın evine vardınız. Adam indi. Kapıda döndü.\n\n"Kitapta senin adın var. İmzalı kopya göndereceğim. Adresin?"', ending: { money: 300, reputation: 150, type: 'normal', text: "300 lira. 6 ay sonra kitap çıktı: 'TAKSİCİ'. Satın aldın. Gerçekten senin hikayen. Sayfa 127'de annenin hikayesi. Ağladın." } },
        ]
    },
    // ===== KARAKTER 58: YORGUN HEMŞİRE =====
    {
        id: 58, name: "Yorgun Hemşire", avatar: "👩‍⚕️",
        image: require('./assets/characters/yorgun_hemsire.png'),
        location: "Hastane", time: "06:00",
        intro: "Göz altları mor, ayakta zor duruyor. 'Eve... 36 saat mesai...'",
        dialogue: [
            { text: '"36 saat... 3 ameliyat... 2 doğum... Ve bir kayıp..."\n\nSesi zor çıkıyor.', choices: [{ text: "Kahramansınız.", next: 1 }, { text: "Çok zor.", next: 2 }] },
            { text: '"Kahraman mı? Sadece işimizi yapıyoruz..."\n\nGözleri kapanıyor.', choices: [{ text: "Takdir ediyorum.", next: 3 }, { text: "Para istemem.", next: 4 }] },
            { text: '"Zor... Evet zor... Ama biri yapmalı değil mi?"\n\nZor gülümsedi.', choices: [{ text: "Siz özelsiniz.", next: 3 }, { text: "Toplum size borçlu.", next: 3 }] },
            { text: '"Takdir mi? Nadiren duyarız. Çoğu hasta bağırıyor. Ama bazen..."\n\nSustu.', choices: [{ text: "Bazen?", next: 5 }, { text: "Anlıyorum.", next: 6 }] },
            { text: '"Ciddi misin? Yok artık! Lütfen al!"\n\nŞaşırdı.', choices: [{ text: "Bu gece benden.", next: 8 }, { text: "Bir kahve ısmarlarsın bir gün.", next: 8 }] },
            { text: '"Zor mu? İnsan üstü. Ama bir hayat kurtarınca her şeyi unutuyorsun..."\n\nGülümsedi yorgun.', choices: [{ text: "Kaç kişi kurtardın?", next: 2 }, { text: "Kutsal görev.", next: 2 }] },
            { text: 'Eve yaklaşıyorsunuz.\n\n"Neredeyse geldik. Sonunda..."', choices: [{ text: "İyi uykular.", next: 8 }, { text: "Yarın?", next: 9 }] },
            { text: '"Ben yeteyim mi? Hayır evlat. SEN yettin bu gece. Seni dinledim. İyi geldi."\n\nGülümsedi.', ending: { money: 0, reputation: 250, type: 'normal', text: "Para almadın. Ama bir kahramana yardım ettin. Hemşire kapıda döndü. 'Allah seni korusun' dedi. Bazı şeyler paradan önemli." } },
            { text: 'Eve vardınız. Hemşire kapıda durdu.\n\n"Sağ ol evlat. Bu gece 5 hayat kurtardık. Yorgunluk gider. Ama o 5 hayat kalır."', ending: { money: 200, reputation: 150, type: 'normal', text: "200 lira. Ama o bakış... Sağlıkçılar gerçek kahraman. Her gün, her gece." } },
            { text: '"Yarın mı? 12 saat sonra tekrar mesai. Ama şimdi uyku lazım..."\n\nGözleri kapandı neredeyse.', ending: { money: 100, reputation: 100, type: 'normal', text: "100 lira. Hemşire eve girdi. Kapı kapanmadan salladı el. Bu insanlar mucize." } }
        ]
    },
    // ===== KARAKTER 59: TARTIŞMALI ÇİFT =====
    {
        id: 59, name: "Tartışmalı Çift", avatar: "💥",
        image: require('./assets/characters/kavgaci_cift.png'),
        location: "Kadıköy", time: "22:00",
        intro: "Birbirlerine bağırıyorlar. 'Taksiyi ben gördüm!', 'Hayır ben el kaldırdım!'",
        dialogue: [
            { text: '"Şoför Bey söyle! Kim önce el kaldırdı?!"\n\nAdam sinirli.', choices: [{ text: "Siz beyefendi.", next: 1 }, { text: "Hanımefendi kaldırdı.", next: 2 }, { text: "İkinizi de alayım?", next: 3 }] },
            { text: '"Abi sen karar ver! Kadın deli!"\n\nAdam bağırdı.', choices: [{ text: "Eve gidelim.", next: 1 }, { text: "Otele gidelim.", next: 2 }, { text: "Siz karar verin.", next: 3 }] },
            { text: '"Otele mi?! Parasını sen mi ödüyorsun?!"\n\nKadın daha çok kızdı.', choices: [{ text: "Eve gidelim o zaman.", next: 1 }, { text: "Adam ödemez mi?", next: 7 }] },
            { text: '"Biz karar verelim mi?! 3 saattir tartışıyoruz!"\n\nİkisi birden bağırdı.', choices: [{ text: "Eve.", next: 4 }, { text: "Otele.", next: 8 }] },
            { text: 'Eve gittin. Kadın mutlu, adam somurttu.\n\n"Sağ ol abi! En azından biri akıllı!"', ending: { money: 200, reputation: 40, type: 'normal', text: "200 lira. Kadın kazandı. Evde barıştıklarıdır belki. Ya da kavga devam etti." } },
            { text: '"Senin adın ne? Ben Murat." "Ben Ayşe."\n\nSohbet başladı.', choices: [{ text: "Aşk doğuyor galiba.", next: 9 }, { text: "Müzik açayım.", next: 9 }] },
            { text: '"Sakin mi olalım?! 7 yıl evlilik! 7 yıl yalan!"\n\nKadın ağladı.', choices: [{ text: "Ne oldu?", next: 10 }, { text: "Eve gidin, konuşun.", next: 4 }] },
            { text: '"Adam mı? Adam ödemiyor zaten! Her şey bende!"\n\nKadın kızdı.', choices: [{ text: "Eve.", next: 4 }, { text: "Ayrılın o zaman.", next: 11 }] },
            { text: 'Otele gittin. Adam mutlu, kadın öfkeli baktı.\n\n"Görürsün sen!"', ending: { money: 150, reputation: -20, type: 'normal', text: "150 lira. Adam kazandı. Ama o kadın bakışı... Ertesi gün boşandılardır belki." } },
            { text: '"Evliysen bilirsin! Kadınlar hep haklı!"\n\nAdam alaycı.', ending: { money: 100, reputation: 0, type: 'normal', text: "100 lira. İkisini de bıraktın. Arkasından bağrışmaya devam ettiler. Evlilik zor." } },
            { text: '"7 yıl! Adam beni aldatıyormuş! Herkes biliyormuş ben hariç!"\n\nHisterik.', choices: [{ text: "Boşanın.", next: 11 }, { text: "Konuşun.", next: 4 }] },
            { text: '"Ayrılalım mı?! Zaten yarın avukata gidiyorum!"\n\nKadın bağırdı.', ending: { money: 50, reputation: 10, type: 'normal', text: "50 lira. Eve bıraktın kadını. Adam ortada kaldı. Bir evlilik daha bitti İstanbul'un sokaklarında." } }
        ]
    },
    // ===== KARAKTER 60: GECE SEYYAHİ =====
    {
        id: 60, name: "Gece Seyyahı", avatar: "🎭",
        image: require('./assets/characters/gizemli_adam.png'),
        location: "Galata Kulesi", time: "23:59",
        intro: "Siyah palto, sapka, yuz gorunmuyor. 'Eminonu. Sessizce.'",
        dialogue: [
            { text: 'Adam hic konusmuyor. Sadece bakiyor.\n\nGozleri karanlikta parlyor.', choices: [{ text: "(Duymazdan gel)", next: 1 }, { text: "(Soru sor)", next: 2 }] },
            { text: 'Sessizce suruyorsun. Adam camdan bakiyor.\n\nBogazin isiklari yansyor yuzune. Kim bu?', choices: [{ text: "(Devam et)", next: 3 }, { text: "Guzel gece.", next: 4 }] },
            { text: '"Kim misin?" diye sordun. Adam dondu.\n\n"Bilmesen daha iyi sofor..."', choices: [{ text: "Tehlikeli misin?", next: 5 }, { text: "Tamam.", next: 3 }] },
            { text: 'Eminonu yaklasyor.\n\nAdam cebinden bir sey cikardi. PARA MI? SILAH MI?', choices: [{ text: "(Tedirgin ol)", next: 6 }, { text: "(Bekle)", next: 7 }] },
            { text: '"Guzel gece mi? Evet. Son guzel gece..."\n\nNe demek istedi?', choices: [{ text: "Ne demek istiyorsun?", next: 8 }, { text: "(Sus)", next: 3 }] },
            { text: '"Tehlikeli mi? Hayir. En azindan sana degil..."\n\nGizemli gulumsedi.', choices: [{ text: "Baskasina mi?", next: 8 }, { text: "Tamam.", next: 3 }] },
            { text: 'Tedirginsin. Adam hissetti.\n\n"Korkma sofor. Ben sadece yorgun bir yolcuyum."', choices: [{ text: "Kim misin?", next: 8 }, { text: "Tamam.", next: 7 }] },
            { text: 'PARA. Bir tomar para. 500 lira.\n\n"Sessizlik icin. Ve... iyi dinleyici oldun."', choices: [{ text: "Tesekkurler.", next: 9 }, { text: "Kim oldununu hic bilmeyecek miyim?", next: 10 }] },
            { text: '"Kim mi? Bazi insanlar hep gizemli kalir sofor. Sen de oylesin. Farkinda degilsin."\n\nFelsefe mi bu?', choices: [{ text: "Anlasildim.", next: 9 }, { text: "Ben gizemli degilim.", next: 10 }] },
            { text: 'Eminonune vardiniz. Adam indi. Karanliga yurudu.\n\nArkasina bakmadi. Kim oldugunu HIC bilemedin.', ending: { money: 500, reputation: 50, type: 'normal', text: "500 lira birakti. Kim oldugunu hic bilemedin. Bazi geceler, bazi insanlar... Hep gizemli kalir." } },
            { text: '"Gizemli degilsin mi? Herkes gizemli sofor. Herkesin bir siri var. Seninki ne?"\n\nSana bakti derin.', ending: { money: 300, reputation: 70, type: 'normal', text: "300 lira ve bir soru. O gece kendini dusundun. Senin sirin ne? Adam hakli miydi?" } }
        ]
    }
];

