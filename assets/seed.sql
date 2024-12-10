-- Metadata Table
INSERT INTO
    metadata (
        id,
        total_questions,
        coverage_pages,
        primary_topics
    )
VALUES
    (
        uuid_generate_v1(),
        3,
        ARRAY [2, 3, 10, 20, 21],
        ARRAY ['matematik', 'fizik', 'biyoloji']
    ),
    (
        uuid_generate_v1(),
        3,
        ARRAY [7, 8, 15, 25, 26],
        ARRAY ['matematik', 'fizik', 'kimya']
    ),
    (
        uuid_generate_v1(),
        5,
        ARRAY [6, 11, 19, 45, 46, 50, 51],
        ARRAY ['fizik', 'kimya', 'biyoloji', 'matematik']
    ),
    (
        uuid_generate_v1(),
        5,
        ARRAY [8, 17, 20, 32, 33, 55, 56],
        ARRAY ['fizik', 'kimya', 'biyoloji', 'çevre bilimleri']
    );

-- Model Answer Table
INSERT INTO
    model_answer (
        id,
        main_argument,
        key_points,
        supporting_evidence,
        conclusion
    )
VALUES
    (
        1,
        'Çokgenin çevresi, kenar uzunluklarının toplamına eşittir.',
        ARRAY ['Çokgenin tüm kenar uzunluklarını toplama işlemi yapılmalıdır.', 'Çevre formülü: Çevre = Kenar1 + Kenar2 + Kenar3 + ... + KenarN.'],
        '[{"point": "Kenar uzunlukları verilmiştir: 5 cm, 7 cm, 10 cm, ve 12 cm.", "page_reference": 2},
     {"point": "Toplama işlemi yapılır: 5 + 7 + 10 + 12 = 34 cm.", "page_reference": 3}]',
        'Çokgenin çevresi 34 cm olarak hesaplanır.'
    ),
    (
        2,
        'Yapılan iş, kuvvet ile yer değiştirme çarpılarak bulunur.',
        ARRAY ['İş formülü: İş = Kuvvet x Yer Değiştirme.', 'Verilen değerler yerine konulur: İş = 5 N x 10 m.'],
        '[{"point": "Formül, iş tanımına dayalıdır.", "page_reference": 10},
     {"point": "Sonuç: 5 N x 10 m = 50 Joule.", "page_reference": 10}]',
        'Yapılan iş 50 Joule olarak hesaplanır.'
    ),
    (
        3,
        'İklim değişikliği, insan faaliyetleri ve doğal süreçler nedeniyle gerçekleşen bir durumdur.',
        ARRAY ['Fosil yakıt kullanımı ve ormansızlaşma ana nedenler arasındadır.',
          'İklim değişikliği küresel sıcaklık artışı, buzulların erimesi, ve deniz seviyesinin yükselmesine neden olur.',
          'Ekosistemler ve tarım üzerinde ciddi etkiler yaratır.'],
        '[{"point": "Fosil yakıt kullanımının karbon salınımını artırdığı açıklanmıştır.", "page_reference": 20},
     {"point": "İklim değişikliği etkileri; sıcaklık artışı ve ekstrem hava olayları ile gösterilmiştir.", "page_reference": 21}]',
        'İklim değişikliğinin nedenleri insan faaliyetleriyle bağlantılıdır ve çevre üzerinde geniş kapsamlı olumsuz etkiler yaratmaktadır.'
    ),
    (
        4,
        'Hız birimleri arasında dönüşüm, uygun çarpanlarla yapılır.',
        ARRAY ['1 saat = 3600 saniye ve 1 km = 1000 metre eşitlikleri kullanılır.',
         'Hız: 72 km/saat x (1000 m / 1 km) x (1 saat / 3600 saniye).'],
        '[{"point": "Verilen hız birimlerinin çarpanları doğru şekilde uygulanır.", "page_reference": 15},
     {"point": "Sonuç: 72 x (1000 / 3600) = 20 m/s.", "page_reference": 15}]',
        'Arabanın hızı 20 m/saniye olarak dönüştürülür.'
    ),
    (
        5,
        'Dikdörtgen prizmanın hacmi, boyutlarının çarpımıyla bulunur.',
        ARRAY ['Hacim formülü: Hacim = Uzunluk x Genişlik x Yükseklik.',
         'Verilen boyutlar: 5 cm, 3 cm, ve 4 cm.'],
        '[{"point": "Boyutlar doğru bir şekilde yerine konulur.", "page_reference": 7},
     {"point": "Hacim: 5 x 3 x 4 = 60 cm³.", "page_reference": 8}]',
        'Dikdörtgen prizmanın hacmi 60 cm³ olarak bulunur.'
    ),
    (
        6,
        'Fiziksel değişim maddenin kimliği değişmeden gerçekleşirken, kimyasal değişim maddeyi başka bir maddeye dönüştürür.',
        ARRAY ['Fiziksel değişimde sadece fiziksel özellikler (şekil, hal vb.) değişir.',
         'Kimyasal değişimde yeni maddeler ve özellikler ortaya çıkar.',
         'Örnek: Buzun erimesi fiziksel bir değişimdir. Kağıdın yanması kimyasal bir değişimdir.'],
        '[{"point": "Fiziksel değişimde moleküler yapı aynı kalır.", "page_reference": 25},
     {"point": "Kimyasal değişimde moleküler bağlar kırılır ve yeni bağlar oluşur.", "page_reference": 26}]',
        'Fiziksel ve kimyasal değişim, maddenin yapısında ve kimliğinde meydana gelen farklılıklarla ayırt edilir.'
    ),
    (
        10,
        'Harcanan enerji, güç ile zamanın çarpımıyla hesaplanır.',
        ARRAY ['Enerji formülü: Enerji = Güç x Zaman.', 'Verilen güç: 1500 W, Zaman: 5 dakika = 300 saniye.'],
        '[{"point": "Enerji hesaplamasında güç ve zamanın birimleri uyumlu olmalıdır.", "page_reference": 18},
     {"point": "Hesaplama: Enerji = 1500 x 300 = 450,000 J.", "page_reference": 18}]',
        'Harcanan enerji miktarı 450,000 Joule’dür.'
    ),
    (
        11,
        'Dairenin çevresi, çap ile π''nin çarpımıyla bulunur.',
        ARRAY ['Çevre formülü: Çevre = 2 x π x r.', 'Verilen yarıçap: r = 7 cm.'],
        '[{"point": "Hesaplama: Çevre = 2 x 3.14 x 7 = 43.96 cm.", "page_reference": 5}]',
        'Dairenin çevresi 43.96 cm olarak hesaplanır.'
    ),
    (
        12,
        'Su döngüsü, suyun sürekli hareket ettiği doğal bir süreçtir.',
        ARRAY ['Buharlaşma: Su yüzeylerinden buharın atmosfere yükselmesi.',
         'Yoğunlaşma: Buharın bulutlara dönüşmesi.',
         'Yağış: Bulutlardan suyun kar veya yağmur olarak düşmesi.',
         'Toprak ve yüzey suyu hareketi: Su yüzeylerinden ve yer altından tekrar okyanuslara taşınması.'],
        '[{"point": "Buharlaşma, güneş enerjisi ile gerçekleşir.", "page_reference": 40},
     {"point": "Su döngüsü, yaşamı sürdüren temel bir süreçtir.", "page_reference": 41}]',
        'Su döngüsü, ekosistemin devamlılığını sağlar ve suyun doğadaki yolculuğunu açıklar.'
    ),
    (
        13,
        'Hız, mesafenin zamana bölünmesiyle hesaplanır.',
        ARRAY ['Hız formülü: Hız = Mesafe / Zaman.', 'Verilen mesafe: 300 m, Zaman: 40 saniye.'],
        '[{"point": "Formül yerine konulur: Hız = 300 / 40.", "page_reference": 22},
     {"point": "Hesaplama: Hız = 7.5 m/s.", "page_reference": 22}]',
        'Trenin hızı 7.5 m/s olarak hesaplanır.'
    ),
    (
        14,
        'Paylaşım yoluyla oluşan bağ türü kovalent bağdır.',
        ARRAY ['Kovalent bağ, iki atomun elektronlarını paylaşmasıyla oluşur.',
         'Bu bağ genellikle ametaller arasında görülür.',
         'Kovalent bağın örnekleri su (H2O) ve metan (CH4) moleküllerinde bulunur.'],
        '[{"point": "Elektron paylaşımı, bağ oluşumunun temelidir.", "page_reference": 35},
     {"point": "Ametaller arasındaki bağlar genelde kovalenttir.", "page_reference": 36}]',
        'Kovalent bağ, atomlar arasında paylaşım esasına dayanır ve birçok bileşiğin temel bağ yapısını oluşturur.'
    );

-- Supporting Evidence Table
INSERT INTO
    supporting_evidence (id, point, page_reference)
VALUES
    (
        1,
        'Kenar uzunlukları verilmiştir: 5 cm, 7 cm, 10 cm, ve 12 cm.',
        2
    ),
    (
        2,
        'Toplama işlemi yapılır: 5 + 7 + 10 + 12 = 34 cm.',
        3
    ),
    (3, 'Formül, iş tanımına dayalıdır.', 10),
    (4, 'Sonuç: 5 N x 10 m = 50 Joule.', 10),
    (
        5,
        'Fosil yakıt kullanımının karbon salınımını artırdığı açıklanmıştır.',
        20
    ),
    (
        6,
        'İklim değişikliği etkileri; sıcaklık artışı ve ekstrem hava olayları ile gösterilmiştir.',
        21
    ),
    (
        7,
        'Verilen hız birimlerinin çarpanları doğru şekilde uygulanır.',
        15
    ),
    (8, 'Sonuç: 72 x (1000 / 3600) = 20 m/s.', 15),
    (
        9,
        'Boyutlar doğru bir şekilde yerine konulur.',
        7
    ),
    (10, 'Hacim: 5 x 3 x 4 = 60 cm³.', 8),
    (
        11,
        'Fiziksel değişimde moleküler yapı aynı kalır.',
        25
    ),
    (
        12,
        'Kimyasal değişimde moleküler bağlar kırılır ve yeni bağlar oluşur.',
        26
    ),
    (
        13,
        'Enerji hesaplamasında güç ve zamanın birimleri uyumlu olmalıdır.',
        18
    ),
    (
        14,
        'Hesaplama: Enerji = 1500 x 300 = 450,000 J.',
        18
    ),
    (
        15,
        'Hesaplama: Çevre = 2 x 3.14 x 7 = 43.96 cm.',
        5
    ),
    (
        16,
        'Buharlaşma, güneş enerjisi ile gerçekleşir.',
        40
    ),
    (
        17,
        'Su döngüsü, yaşamı sürdüren temel bir süreçtir.',
        41
    ),
    (18, 'Formül yerine konulur: Hız = 300 / 40.', 22),
    (19, 'Hesaplama: Hız = 7.5 m/s.', 22),
    (
        20,
        'Elektron paylaşımı, bağ oluşumunun temelidir.',
        35
    ),
    (
        21,
        'Ametaller arasındaki bağlar genelde kovalenttir.',
        36
    );

-- Questions Table
INSERT INTO
    questions (
        id,
        question_text,
        context_pages,
        difficulty_level,
        cognitive_level,
        key_concepts,
        course_name,
        model_answer_id,
        grading_criteria,
        metadata_id
    )
VALUES
    (
        'Q1',
        'Aşağıdaki çokgenin çevresini hesaplayınız. Kenar uzunlukları: 5 cm, 7 cm, 10 cm, ve 12 cm.',
        ARRAY [2, 3],
        'basic',
        'application',
        ARRAY ['çevre hesaplama', 'çokgen'],
        'Matematik',
        1,
        ARRAY ['Doğru çevre formülünün yazılması.', 'Tüm kenar uzunluklarının doğru toplanması.', 'Sonucun doğru birimle verilmesi.'],
        (
            SELECT
                id
            FROM
                metadata
            LIMIT
                1
        )
    ), (
        'Q2', 'Bir kütle 5 N kuvvet ile 10 m yer değiştirdiğinde yapılan işi hesaplayınız.', ARRAY [10], 'intermediate', 'application', ARRAY ['iş', 'kuvvet', 'yer değiştirme'], 'Fizik', 2, ARRAY ['İş formülünün doğru uygulanması.', 'Verilen kuvvet ve yer değiştirme değerlerinin kullanılması.', 'Sonucun doğru birimle belirtilmesi.'], (
            SELECT
                id
            FROM
                metadata
            LIMIT
                1
        )
    ), (
        'Q3', 'İklim değişikliği nedenleri ve etkileri nelerdir? Kendi cümlelerinizle açıklayınız.', ARRAY [20, 21], 'advanced', 'evaluation', ARRAY ['iklim değişikliği', 'çevresel etkiler'], 'Biyoloji', 3, ARRAY ['Nedenlerin ve etkilerin açık ve doğru ifade edilmesi.', 'Mantıklı argümanlarla desteklenmesi.', 'Bilimsel terminolojinin doğru kullanılması.'], (
            SELECT
                id
            FROM
                metadata
            LIMIT
                1
        )
    ), (
        'Q4', 'Bir arabanın hızı 72 km/saat''ten 20 m/saniye''ye dönüştürülmek isteniyor. Bu dönüşümü yapınız.', ARRAY [15], 'intermediate', 'application', ARRAY ['birim dönüşümü', 'hız'], 'Fizik', 4, ARRAY ['Doğru dönüşüm faktörlerinin kullanılması.', 'Hesaplamaların doğru yapılması.', 'Sonucun doğru birimle ifade edilmesi.'], (
            SELECT
                id
            FROM
                metadata
            LIMIT
                1
        )
    ), (
        'Q5', 'Bir dikdörtgen prizmanın hacmi nasıl hesaplanır? 5 cm x 3 cm x 4 cm boyutlarındaki bir prizmanın hacmini bulunuz.', ARRAY [7, 8], 'basic', 'knowledge', ARRAY ['hacim', 'geometri'], 'Geometri', 5, ARRAY ['Doğru hacim formülünün yazılması.', 'Boyutların doğru çarpılması.', 'Sonucun birimle birlikte verilmesi.'], (
            SELECT
                id
            FROM
                metadata
            LIMIT
                1
        )
    ), (
        'Q6', 'Fiziksel ve kimyasal değişim arasındaki farkları açıklayınız. Örneklerle destekleyiniz.', ARRAY [25, 26], 'advanced', 'analysis', ARRAY ['fiziksel değişim', 'kimyasal değişim'], 'Kimya', 6, ARRAY ['Fiziksel ve kimyasal değişimin tanımlarının doğru yapılması.', 'Örneklerin uygun ve açıklayıcı olması.', 'Farkların açık ve mantıklı bir şekilde ifade edilmesi.'], (
            SELECT
                id
            FROM
                metadata
            LIMIT
                1
        )
    ), (
        'Q10', 'Bir ısıtıcı, 5 dakika boyunca 1500 W güç ile çalışıyor. Harcanan enerji miktarını hesaplayınız.', ARRAY [18], 'intermediate', 'application', ARRAY ['enerji', 'güç', 'zaman'], 'Fizik', 10, ARRAY ['Doğru enerji formülünün kullanılması.', 'Zaman biriminin doğru şekilde saniyeye çevrilmesi.', 'Sonucun doğru birimle ifade edilmesi.'], (
            SELECT
                id
            FROM
                metadata
            LIMIT
                1
        )
    ), (
        'Q11', 'Bir dairenin çevresini hesaplayınız. Yarıçapı 7 cm olan bir daire için π''yi 3.14 olarak alınız.', ARRAY [5], 'basic', 'knowledge', ARRAY ['çevre', 'dairenin matematiksi'], 'matematik', 11, ARRAY ['Doğru çevre formülünün yazılması.', 'Verilen yarıçapın doğru yerine konulması.', 'Sonucun doğru birimle ifade edilmesi.'], (
            SELECT
                id
            FROM
                metadata
            LIMIT
                1
        )
    ), (
        'Q12', 'Dünya''nın su döngüsü, suyun okyanus, atmosfer ve kara arasındaki hareketidir. Su döngüsünün aşamalarını açıklayınız.', ARRAY [40, 41], 'advanced', 'comprehension', ARRAY ['su döngüsü', 'hidroloji'], 'Biyoloji', 12, ARRAY ['Su döngüsünün tüm aşamalarının tanımlanması.', 'Aşamaların doğru sırada ifade edilmesi.', 'Bilimsel açıklamaların yapılması.'], (
            SELECT
                id
            FROM
                metadata
            LIMIT
                1
        )
    ), (
        'Q13', 'Bir tren, 300 m uzunluğunda bir tünelden 40 saniyede geçiyor. Trenin hızını hesaplayınız.', ARRAY [22], 'intermediate', 'application', ARRAY ['hız', 'mesafe', 'zaman'], 'Fizik', 13, ARRAY ['Hız formülünün doğru yazılması.', 'Verilen değerlerin doğru yerine konulması.', 'Sonucun doğru birimle ifade edilmesi.'], (
            SELECT
                id
            FROM
                metadata
            LIMIT
                1
        )
    ), (
        'Q14', 'Bir molekül içindeki atomlar arasında paylaşım yoluyla oluşan bağ türü nedir? Bu bağın özelliklerini açıklayınız.', ARRAY [35, 36], 'advanced', 'knowledge', ARRAY ['kovalent bağ', 'kimyasal bağlar'], 'Kimya', 14, ARRAY ['Kovalent bağın doğru tanımlanması.', 'Özelliklerin bilimsel bir dille ifade edilmesi.', 'Örneklerin uygun şekilde verilmesi.'], (
            SELECT
                id
            FROM
                metadata
            LIMIT
                1
        )
    );