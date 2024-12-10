CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE "metadata" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v1mc() NOT NULL,
	"total_questions" integer NOT NULL,
	"coverage_pages" integer[] NOT NULL,
	"primary_topics" text[] DEFAULT '{}'::text[] NOT NULL
);
--> statement-breakpoint
CREATE TABLE "model_answer" (
	"id" integer PRIMARY KEY NOT NULL,
	"main_argument" text NOT NULL,
	"key_points" text[] DEFAULT '{}'::text[] NOT NULL,
	"supporting_evidence" jsonb NOT NULL,
	"conclusion" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "questions" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"question_text" text NOT NULL,
	"context_pages" integer[] NOT NULL,
	"difficulty_level" varchar(50) NOT NULL,
	"cognitive_level" varchar(50) NOT NULL,
	"key_concepts" text[] NOT NULL,
	"course_name" text NOT NULL,
	"model_answer_id" integer NOT NULL,
	"grading_criteria" text[] NOT NULL
);
--> statement-breakpoint
CREATE TABLE "supporting_evidence" (
	"id" integer PRIMARY KEY NOT NULL,
	"point" text NOT NULL,
	"page_reference" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "questions" ADD CONSTRAINT "questions_model_answer_id_model_answer_id_fk" FOREIGN KEY ("model_answer_id") REFERENCES "public"."model_answer"("id") ON DELETE no action ON UPDATE no action;
ALTER TABLE "metadata" ALTER COLUMN "id" SET DEFAULT uuid_generate_v1();
ALTER TABLE "questions" ADD COLUMN "metadata_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "questions" ADD CONSTRAINT "questions_metadata_id_metadata_id_fk" FOREIGN KEY ("metadata_id") REFERENCES "public"."metadata"("id") ON DELETE no action ON UPDATE no action;

-- Metadata Table
INSERT INTO metadata (id, total_questions, coverage_pages, primary_topics)
VALUES
  (uuid_generate_v1(), 3, ARRAY[2, 3, 10, 20, 21], ARRAY['matematik', 'fizik', 'biyoloji']);

-- Model Answer Table
INSERT INTO model_answer (id, main_argument, key_points, supporting_evidence, conclusion)
VALUES
  (1, 'Çokgenin çevresi, kenar uzunluklarının toplamına eşittir.',
   ARRAY['Çokgenin tüm kenar uzunluklarını toplama işlemi yapılmalıdır.', 'Çevre formülü: Çevre = Kenar1 + Kenar2 + Kenar3 + ... + KenarN.'],
   '[{"point": "Kenar uzunlukları verilmiştir: 5 cm, 7 cm, 10 cm, ve 12 cm.", "page_reference": 2},
     {"point": "Toplama işlemi yapılır: 5 + 7 + 10 + 12 = 34 cm.", "page_reference": 3}]',
   'Çokgenin çevresi 34 cm olarak hesaplanır.'),

  (2, 'Yapılan iş, kuvvet ile yer değiştirme çarpılarak bulunur.',
   ARRAY['İş formülü: İş = Kuvvet x Yer Değiştirme.', 'Verilen değerler yerine konulur: İş = 5 N x 10 m.'],
   '[{"point": "Formül, iş tanımına dayalıdır.", "page_reference": 10},
     {"point": "Sonuç: 5 N x 10 m = 50 Joule.", "page_reference": 10}]',
   'Yapılan iş 50 Joule olarak hesaplanır.'),

  (3, 'İklim değişikliği, insan faaliyetleri ve doğal süreçler nedeniyle gerçekleşen bir durumdur.',
   ARRAY['Fosil yakıt kullanımı ve ormansızlaşma ana nedenler arasındadır.',
          'İklim değişikliği küresel sıcaklık artışı, buzulların erimesi, ve deniz seviyesinin yükselmesine neden olur.',
          'Ekosistemler ve tarım üzerinde ciddi etkiler yaratır.'],
   '[{"point": "Fosil yakıt kullanımının karbon salınımını artırdığı açıklanmıştır.", "page_reference": 20},
     {"point": "İklim değişikliği etkileri; sıcaklık artışı ve ekstrem hava olayları ile gösterilmiştir.", "page_reference": 21}]',
   'İklim değişikliğinin nedenleri insan faaliyetleriyle bağlantılıdır ve çevre üzerinde geniş kapsamlı olumsuz etkiler yaratmaktadır.');

-- Supporting Evidence Table
INSERT INTO supporting_evidence (id, point, page_reference)
VALUES
  (1, 'Kenar uzunlukları verilmiştir: 5 cm, 7 cm, 10 cm, ve 12 cm.', 2),
  (2, 'Toplama işlemi yapılır: 5 + 7 + 10 + 12 = 34 cm.', 3),
  (3, 'Formül, iş tanımına dayalıdır.', 10),
  (4, 'Sonuç: 5 N x 10 m = 50 Joule.', 10),
  (5, 'Fosil yakıt kullanımının karbon salınımını artırdığı açıklanmıştır.', 20),
  (6, 'İklim değişikliği etkileri; sıcaklık artışı ve ekstrem hava olayları ile gösterilmiştir.', 21);

-- Questions Table
INSERT INTO questions (id, question_text, context_pages, difficulty_level, cognitive_level, key_concepts, course_name, model_answer_id, grading_criteria, metadata_id)
VALUES
  ('Q1', 'Aşağıdaki çokgenin çevresini hesaplayınız. Kenar uzunlukları: 5 cm, 7 cm, 10 cm, ve 12 cm.',
   ARRAY[2, 3], 'basic', 'application', ARRAY['çevre hesaplama', 'çokgen'], 'Matematik', 1,
   ARRAY['Doğru çevre formülünün yazılması.', 'Tüm kenar uzunluklarının doğru toplanması.', 'Sonucun doğru birimle verilmesi.'],
   (SELECT id FROM metadata LIMIT 1)),

  ('Q2', 'Bir kütle 5 N kuvvet ile 10 m yer değiştirdiğinde yapılan işi hesaplayınız.',
   ARRAY[10], 'intermediate', 'application', ARRAY['iş', 'kuvvet', 'yer değiştirme'], 'Fizik', 2,
   ARRAY['İş formülünün doğru uygulanması.', 'Verilen kuvvet ve yer değiştirme değerlerinin kullanılması.', 'Sonucun doğru birimle belirtilmesi.'],
   (SELECT id FROM metadata LIMIT 1)),

  ('Q3', 'İklim değişikliği nedenleri ve etkileri nelerdir? Kendi cümlelerinizle açıklayınız.',
   ARRAY[20, 21], 'advanced', 'evaluation', ARRAY['iklim değişikliği', 'çevresel etkiler'], 'Biyoloji', 3,
   ARRAY['Nedenlerin ve etkilerin açık ve doğru ifade edilmesi.', 'Mantıklı argümanlarla desteklenmesi.', 'Bilimsel terminolojinin doğru kullanılması.'],
   (SELECT id FROM metadata LIMIT 1));



-- Metadata Table
INSERT INTO metadata (id, total_questions, coverage_pages, primary_topics)
VALUES
  (uuid_generate_v1(), 3, ARRAY[7, 8, 15, 25, 26], ARRAY['matematik', 'fizik', 'kimya']);

-- Model Answer Table
INSERT INTO model_answer (id, main_argument, key_points, supporting_evidence, conclusion)
VALUES
  (4, 'Hız birimleri arasında dönüşüm, uygun çarpanlarla yapılır.',
   ARRAY['1 saat = 3600 saniye ve 1 km = 1000 metre eşitlikleri kullanılır.',
         'Hız: 72 km/saat x (1000 m / 1 km) x (1 saat / 3600 saniye).'],
   '[{"point": "Verilen hız birimlerinin çarpanları doğru şekilde uygulanır.", "page_reference": 15},
     {"point": "Sonuç: 72 x (1000 / 3600) = 20 m/s.", "page_reference": 15}]',
   'Arabanın hızı 20 m/saniye olarak dönüştürülür.'),

  (5, 'Dikdörtgen prizmanın hacmi, boyutlarının çarpımıyla bulunur.',
   ARRAY['Hacim formülü: Hacim = Uzunluk x Genişlik x Yükseklik.',
         'Verilen boyutlar: 5 cm, 3 cm, ve 4 cm.'],
   '[{"point": "Boyutlar doğru bir şekilde yerine konulur.", "page_reference": 7},
     {"point": "Hacim: 5 x 3 x 4 = 60 cm³.", "page_reference": 8}]',
   'Dikdörtgen prizmanın hacmi 60 cm³ olarak bulunur.'),

  (6, 'Fiziksel değişim maddenin kimliği değişmeden gerçekleşirken, kimyasal değişim maddeyi başka bir maddeye dönüştürür.',
   ARRAY['Fiziksel değişimde sadece fiziksel özellikler (şekil, hal vb.) değişir.',
         'Kimyasal değişimde yeni maddeler ve özellikler ortaya çıkar.',
         'Örnek: Buzun erimesi fiziksel bir değişimdir. Kağıdın yanması kimyasal bir değişimdir.'],
   '[{"point": "Fiziksel değişimde moleküler yapı aynı kalır.", "page_reference": 25},
     {"point": "Kimyasal değişimde moleküler bağlar kırılır ve yeni bağlar oluşur.", "page_reference": 26}]',
   'Fiziksel ve kimyasal değişim, maddenin yapısında ve kimliğinde meydana gelen farklılıklarla ayırt edilir.');

-- Supporting Evidence Table
INSERT INTO supporting_evidence (id, point, page_reference)
VALUES
  (7, 'Verilen hız birimlerinin çarpanları doğru şekilde uygulanır.', 15),
  (8, 'Sonuç: 72 x (1000 / 3600) = 20 m/s.', 15),
  (9, 'Boyutlar doğru bir şekilde yerine konulur.', 7),
  (10, 'Hacim: 5 x 3 x 4 = 60 cm³.', 8),
  (11, 'Fiziksel değişimde moleküler yapı aynı kalır.', 25),
  (12, 'Kimyasal değişimde moleküler bağlar kırılır ve yeni bağlar oluşur.', 26);

-- Questions Table
INSERT INTO questions (id, question_text, context_pages, difficulty_level, cognitive_level, key_concepts, course_name, model_answer_id, grading_criteria, metadata_id)
VALUES
  ('Q4', 'Bir arabanın hızı 72 km/saat''ten 20 m/saniye''ye dönüştürülmek isteniyor. Bu dönüşümü yapınız.',
   ARRAY[15], 'intermediate', 'application', ARRAY['birim dönüşümü', 'hız'], 'Fizik', 4,
   ARRAY['Doğru dönüşüm faktörlerinin kullanılması.', 'Hesaplamaların doğru yapılması.', 'Sonucun doğru birimle ifade edilmesi.'],
   (SELECT id FROM metadata LIMIT 1)),

  ('Q5', 'Bir dikdörtgen prizmanın hacmi nasıl hesaplanır? 5 cm x 3 cm x 4 cm boyutlarındaki bir prizmanın hacmini bulunuz.',
   ARRAY[7, 8], 'basic', 'knowledge', ARRAY['hacim', 'geometri'], 'Geometri', 5,
   ARRAY['Doğru hacim formülünün yazılması.', 'Boyutların doğru çarpılması.', 'Sonucun birimle birlikte verilmesi.'],
   (SELECT id FROM metadata LIMIT 1)),

  ('Q6', 'Fiziksel ve kimyasal değişim arasındaki farkları açıklayınız. Örneklerle destekleyiniz.',
   ARRAY[25, 26], 'advanced', 'analysis', ARRAY['fiziksel değişim', 'kimyasal değişim'], 'Kimya', 6,
   ARRAY['Fiziksel ve kimyasal değişimin tanımlarının doğru yapılması.', 'Örneklerin uygun ve açıklayıcı olması.', 'Farkların açık ve mantıklı bir şekilde ifade edilmesi.'],
   (SELECT id FROM metadata LIMIT 1));



-- Metadata Table
INSERT INTO metadata (id, total_questions, coverage_pages, primary_topics)
VALUES
  (uuid_generate_v1(), 3, ARRAY[9, 12, 13, 30, 31], ARRAY['matematik', 'fizik', 'biyoloji']);

-- Model Answer Table
INSERT INTO model_answer (id, main_argument, key_points, supporting_evidence, conclusion)
VALUES
  (7, 'Dikdörtgenin çevresi, tüm kenar uzunluklarının toplamı ile bulunur.',
   ARRAY['Çevre formülü: Çevre = 2 x (Uzunluk + Genişlik).', 'Verilen boyutlar: Uzunluk = 20 m, Genişlik = 15 m.'],
   '[{"point": "Formül yerine konulur: Çevre = 2 x (20 + 15).", "page_reference": 9},
     {"point": "Hesaplama: Çevre = 2 x 35 = 70 metre.", "page_reference": 9}]',
   'Tarlayı çevirmek için 70 metre çit gereklidir.'),

  (8, 'Güneş ışığı hem olumlu hem de olumsuz sağlık etkilerine sahiptir.',
   ARRAY['Olumlu etkiler: D vitamini üretimi ve ruh sağlığını desteklemesi.',
         'Olumsuz etkiler: Aşırı maruziyetin cilt kanseri riskini artırması ve cilt yaşlanmasına neden olması.'],
   '[{"point": "D vitamini, güneş ışığına bağlı olarak sentezlenir.", "page_reference": 30},
     {"point": "Aşırı UV ışınlarına maruziyet cilt hücrelerine zarar verir.", "page_reference": 31}]',
   'Güneş ışığının etkileri dengeli şekilde değerlendirilmelidir; faydalarından yararlanırken zararlarını önlemek önemlidir.'),

  (9, 'Bir kürenin hacmi, yarıçap uzunluğuna dayalı bir formülle hesaplanır.',
   ARRAY['Hacim formülü: Hacim = (4/3) x π x r³.', 'Verilen yarıçap: r = 6 cm.'],
   '[{"point": "Hacim formülü yerine konulur: Hacim = (4/3) x 3.14 x 6³.", "page_reference": 12},
     {"point": "Hesaplama: Hacim = (4/3) x 3.14 x 216 = 904.32 cm³.", "page_reference": 13}]',
   'Kürenin hacmi 904.32 cm³ olarak hesaplanır.');

-- Supporting Evidence Table
INSERT INTO supporting_evidence (id, point, page_reference)
VALUES
  (13, 'Formül yerine konulur: Çevre = 2 x (20 + 15).', 9),
  (14, 'Hesaplama: Çevre = 2 x 35 = 70 metre.', 9),
  (15, 'D vitamini, güneş ışığına bağlı olarak sentezlenir.', 30),
  (16, 'Aşırı UV ışınlarına maruziyet cilt hücrelerine zarar verir.', 31),
  (17, 'Hacim formülü yerine konulur: Hacim = (4/3) x 3.14 x 6³.', 12),
  (18, 'Hesaplama: Hacim = (4/3) x 3.14 x 216 = 904.32 cm³.', 13);

-- Questions Table
INSERT INTO questions (id, question_text, context_pages, difficulty_level, cognitive_level, key_concepts, course_name, model_answer_id, grading_criteria, metadata_id)
VALUES
  ('Q7', 'Bir çiftçi, dikdörtgen şeklindeki bir tarlayı 20 m x 15 m ölçülerinde çit ile çevirmek istiyor. Kaç metre çit gerektiğini hesaplayınız.',
   ARRAY[9], 'basic', 'application', ARRAY['çevre hesaplama', 'dikdörtgen'], 'matematik', 7,
   ARRAY['Çevre formülünün doğru uygulanması.', 'Verilen boyutların doğru kullanılması.', 'Sonucun doğru birimle ifade edilmesi.'],
   (SELECT id FROM metadata LIMIT 1)),

  ('Q8', 'İnsanların sağlığı üzerinde güneş ışığının olumlu ve olumsuz etkilerini tartışınız.',
   ARRAY[30, 31], 'advanced', 'evaluation', ARRAY['güneş ışığı', 'sağlık etkileri'], 'Biyoloji', 8,
   ARRAY['Olumlu ve olumsuz etkilerin net bir şekilde ayrılması.', 'Mantıklı ve bilimsel açıklamalarla desteklenmesi.', 'Sonuçların dengeli bir şekilde ifade edilmesi.'],
   (SELECT id FROM metadata LIMIT 1)),

  ('Q9', 'Bir kürenin hacmini hesaplayınız. Yarıçapı 6 cm olan bir küre için sonucu bulunuz. (π = 3.14 alın)',
   ARRAY[12, 13], 'intermediate', 'application', ARRAY['hacim', 'küre', 'matematik'], 'matematik', 9,
   ARRAY['Küre hacmi formülünün doğru yazılması.', 'Yarıçapın küpünün doğru hesaplanması.', 'Sonucun doğru birimle belirtilmesi.'],
   (SELECT id FROM metadata LIMIT 1));

-- Metadata Table
INSERT INTO metadata (id, total_questions, coverage_pages, primary_topics)
VALUES
  (uuid_generate_v1(), 5, ARRAY[5, 18, 22, 35, 36, 40, 41], ARRAY['fizik', 'kimya', 'biyoloji', 'matematik']);

-- Model Answer Table
INSERT INTO model_answer (id, main_argument, key_points, supporting_evidence, conclusion)
VALUES
  (10, 'Harcanan enerji, güç ile zamanın çarpımıyla hesaplanır.',
   ARRAY['Enerji formülü: Enerji = Güç x Zaman.', 'Verilen güç: 1500 W, Zaman: 5 dakika = 300 saniye.'],
   '[{"point": "Enerji hesaplamasında güç ve zamanın birimleri uyumlu olmalıdır.", "page_reference": 18},
     {"point": "Hesaplama: Enerji = 1500 x 300 = 450,000 J.", "page_reference": 18}]',
   'Harcanan enerji miktarı 450,000 Joule’dür.'),

  (11, 'Dairenin çevresi, çap ile π''nin çarpımıyla bulunur.',
   ARRAY['Çevre formülü: Çevre = 2 x π x r.', 'Verilen yarıçap: r = 7 cm.'],
   '[{"point": "Hesaplama: Çevre = 2 x 3.14 x 7 = 43.96 cm.", "page_reference": 5}]',
   'Dairenin çevresi 43.96 cm olarak hesaplanır.'),

  (12, 'Su döngüsü, suyun sürekli hareket ettiği doğal bir süreçtir.',
   ARRAY['Buharlaşma: Su yüzeylerinden buharın atmosfere yükselmesi.',
         'Yoğunlaşma: Buharın bulutlara dönüşmesi.',
         'Yağış: Bulutlardan suyun kar veya yağmur olarak düşmesi.',
         'Toprak ve yüzey suyu hareketi: Su yüzeylerinden ve yer altından tekrar okyanuslara taşınması.'],
   '[{"point": "Buharlaşma, güneş enerjisi ile gerçekleşir.", "page_reference": 40},
     {"point": "Su döngüsü, yaşamı sürdüren temel bir süreçtir.", "page_reference": 41}]',
   'Su döngüsü, ekosistemin devamlılığını sağlar ve suyun doğadaki yolculuğunu açıklar.'),

  (13, 'Hız, mesafenin zamana bölünmesiyle hesaplanır.',
   ARRAY['Hız formülü: Hız = Mesafe / Zaman.', 'Verilen mesafe: 300 m, Zaman: 40 saniye.'],
   '[{"point": "Formül yerine konulur: Hız = 300 / 40.", "page_reference": 22},
     {"point": "Hesaplama: Hız = 7.5 m/s.", "page_reference": 22}]',
   'Trenin hızı 7.5 m/s olarak hesaplanır.'),

  (14, 'Paylaşım yoluyla oluşan bağ türü kovalent bağdır.',
   ARRAY['Kovalent bağ, iki atomun elektronlarını paylaşmasıyla oluşur.',
         'Bu bağ genellikle ametaller arasında görülür.',
         'Kovalent bağın örnekleri su (H2O) ve metan (CH4) moleküllerinde bulunur.'],
   '[{"point": "Elektron paylaşımı, bağ oluşumunun temelidir.", "page_reference": 35},
     {"point": "Ametaller arasındaki bağlar genelde kovalenttir.", "page_reference": 36}]',
   'Kovalent bağ, atomlar arasında paylaşım esasına dayanır ve birçok bileşiğin temel bağ yapısını oluşturur.');

-- Supporting Evidence Table
INSERT INTO supporting_evidence (id, point, page_reference)
VALUES
  (19, 'Enerji hesaplamasında güç ve zamanın birimleri uyumlu olmalıdır.', 18),
  (20, 'Hesaplama: Enerji = 1500 x 300 = 450,000 J.', 18),
  (21, 'Hesaplama: Çevre = 2 x 3.14 x 7 = 43.96 cm.', 5),
  (22, 'Buharlaşma, güneş enerjisi ile gerçekleşir.', 40),
  (23, 'Su döngüsü, yaşamı sürdüren temel bir süreçtir.', 41),
  (24, 'Formül yerine konulur: Hız = 300 / 40.', 22),
  (25, 'Hesaplama: Hız = 7.5 m/s.', 22),
  (26, 'Elektron paylaşımı, bağ oluşumunun temelidir.', 35),
  (27, 'Ametaller arasındaki bağlar genelde kovalenttir.', 36);

-- Questions Table
INSERT INTO questions (id, question_text, context_pages, difficulty_level, cognitive_level, key_concepts, course_name, model_answer_id, grading_criteria, metadata_id)
VALUES
  ('Q10', 'Bir ısıtıcı, 5 dakika boyunca 1500 W güç ile çalışıyor. Harcanan enerji miktarını hesaplayınız.',
   ARRAY[18], 'intermediate', 'application', ARRAY['enerji', 'güç', 'zaman'], 'Fizik', 10,
   ARRAY['Doğru enerji formülünün kullanılması.', 'Zaman biriminin doğru şekilde saniyeye çevrilmesi.', 'Sonucun doğru birimle ifade edilmesi.'],
   (SELECT id FROM metadata LIMIT 1)),

  ('Q11', 'Bir dairenin çevresini hesaplayınız. Yarıçapı 7 cm olan bir daire için π''yi 3.14 olarak alınız.',
   ARRAY[5], 'basic', 'knowledge', ARRAY['çevre', 'dairenin matematiksi'], 'matematik', 11,
   ARRAY['Doğru çevre formülünün yazılması.', 'Verilen yarıçapın doğru yerine konulması.', 'Sonucun doğru birimle ifade edilmesi.'],
   (SELECT id FROM metadata LIMIT 1)),

  ('Q12', 'Dünya''nın su döngüsü, suyun okyanus, atmosfer ve kara arasındaki hareketidir. Su döngüsünün aşamalarını açıklayınız.',
   ARRAY[40, 41], 'advanced', 'comprehension', ARRAY['su döngüsü', 'hidroloji'], 'Biyoloji', 12,
   ARRAY['Su döngüsünün tüm aşamalarının tanımlanması.', 'Aşamaların doğru sırada ifade edilmesi.', 'Bilimsel açıklamaların yapılması.'],
   (SELECT id FROM metadata LIMIT 1)),

  ('Q13', 'Bir tren, 300 m uzunluğunda bir tünelden 40 saniyede geçiyor. Trenin hızını hesaplayınız.',
   ARRAY[22], 'intermediate', 'application', ARRAY['hız', 'mesafe', 'zaman'], 'Fizik', 13,
   ARRAY['Hız formülünün doğru yazılması.', 'Verilen değerlerin doğru yerine konulması.', 'Sonucun doğru birimle ifade edilmesi.'],
   (SELECT id FROM metadata LIMIT 1)),

  ('Q14', 'Bir molekül içindeki atomlar arasında paylaşım yoluyla oluşan bağ türü nedir? Bu bağın özelliklerini açıklayınız.',
   ARRAY[35, 36], 'advanced', 'knowledge', ARRAY['kovalent bağ', 'kimyasal bağlar'], 'Kimya', 14,
   ARRAY['Kovalent bağın doğru tanımlanması.', 'Özelliklerin bilimsel bir dille ifade edilmesi.', 'Örneklerin uygun şekilde verilmesi.'],
   (SELECT id FROM metadata LIMIT 1));



-- Metadata Table
INSERT INTO metadata (id, total_questions, coverage_pages, primary_topics)
VALUES
  (uuid_generate_v1(), 5, ARRAY[6, 11, 19, 45, 46, 50, 51], ARRAY['matematik', 'fizik', 'biyoloji', 'çevre bilimleri']);

-- Model Answer Table
INSERT INTO model_answer (id, main_argument, key_points, supporting_evidence, conclusion)
VALUES
  (15, 'Pisagor teoremi, dik üçgende hipotenüsü bulmak için kullanılır.',
   ARRAY['Pisagor teoremi: c² = a² + b².', 'Verilen kenarlar: a = 6 cm, b = 8 cm.'],
   '[{"point": "Hesaplama: c² = 6² + 8² = 36 + 64 = 100.", "page_reference": 11},
     {"point": "Karekök alınır: c = √100 = 10 cm.", "page_reference": 11}]',
   'Hipotenüs uzunluğu 10 cm''dir.'),

  (16, 'Sera gazları, atmosferde birikerek küresel ısınmaya neden olur.',
   ARRAY['Karbon dioksit (CO2), metan (CH4) ve su buharı önemli sera gazlarıdır.',
         'Bu gazlar, güneşten gelen enerjinin atmosferde tutulmasını sağlar.',
         'Sonuç olarak sıcaklık artışı ve iklim değişiklikleri meydana gelir.'],
   '[{"point": "Fosil yakıtların yakılması CO2 salınımını artırır.", "page_reference": 45},
     {"point": "Artan sıcaklık ekosistemleri ve deniz seviyesini etkiler.", "page_reference": 46}]',
   'Sera gazlarının artışı, çevresel bozulmaya yol açan küresel ısınmanın ana sebeplerindendir.'),

  (17, 'Newton''un ikinci yasasına göre ivme, kuvvetin kütleye bölünmesiyle hesaplanır.',
   ARRAY['Newton''un ikinci yasası: F = m x a.', 'Verilen değerler: F = 10 N, m = 5 kg.'],
   '[{"point": "Formül düzenlenir: a = F / m.", "page_reference": 19},
     {"point": "Hesaplama: a = 10 / 5 = 2 m/s².", "page_reference": 19}]',
   'Kütlenin ivmesi 2 m/s² olarak bulunur.'),

  (18, 'Fotosentez, bitkilerin güneş ışığını kullanarak besin ve oksijen üretmesidir.',
   ARRAY['Karbondioksit ve su, klorofil yardımıyla glikoz ve oksijene dönüştürülür.',
         'Fotosentez, atmosferdeki oksijen seviyesini korur.',
         'Bu süreç, karbon döngüsünün temel bir parçasıdır.'],
   '[{"point": "Fotosentez denklemi: 6CO2 + 6H2O + ışık enerjisi → C6H12O6 + 6O2.", "page_reference": 50},
     {"point": "Fotosentez, enerji akışını ve ekosistemlerin dengesini sağlar.", "page_reference": 51}]',
   'Fotosentez, hem bitkiler hem de diğer canlılar için temel bir süreçtir ve çevresel dengeyi sağlar.'),

  (19, 'Çemberin alanı, yarıçapın karesi ile π''nin çarpımıyla bulunur.',
   ARRAY['Alan formülü: Alan = π x r².', 'Verilen yarıçap: r = 10 cm.'],
   '[{"point": "Formül yerine konulur: Alan = 3.14 x 10².", "page_reference": 6},
     {"point": "Hesaplama: Alan = 3.14 x 100 = 314 cm².", "page_reference": 6}]',
   'Çemberin alanı 314 cm² olarak hesaplanır.');

-- Supporting Evidence Table
INSERT INTO supporting_evidence (id, point, page_reference)
VALUES
  (28, 'Hesaplama: c² = 6² + 8² = 36 + 64 = 100.', 11),
  (29, 'Karekök alınır: c = √100 = 10 cm.', 11),
  (30, 'Fosil yakıtların yakılması CO2 salınımını artırır.', 45),
  (31, 'Artan sıcaklık ekosistemleri ve deniz seviyesini etkiler.', 46),
  (32, 'Formül düzenlenir: a = F / m.', 19),
  (33, 'Hesaplama: a = 10 / 5 = 2 m/s².', 19),
  (34, 'Fotosentez denklemi: 6CO2 + 6H2O + ışık enerjisi → C6H12O6 + 6O2.', 50),
  (35, 'Fotosentez, enerji akışını ve ekosistemlerin dengesini sağlar.', 51),
  (36, 'Formül yerine konulur: Alan = 3.14 x 10².', 6),
  (37, 'Hesaplama: Alan = 3.14 x 100 = 314 cm².', 6);

-- Questions Table
INSERT INTO questions (id, question_text, context_pages, difficulty_level, cognitive_level, key_concepts, course_name, model_answer_id, grading_criteria, metadata_id)
VALUES
  ('Q15', 'Bir dik üçgende dik kenar uzunlukları 6 cm ve 8 cm. Hipotenüsü hesaplayınız.',
   ARRAY[11], 'basic', 'application', ARRAY['Pisagor teoremi', 'dik üçgen'], 'matematik', 15,
   ARRAY['Pisagor teoreminin doğru uygulanması.', 'Hesaplamaların doğru yapılması.', 'Sonucun doğru birimle ifade edilmesi.'],
   (SELECT id FROM metadata LIMIT 1)),

  ('Q16', 'Küresel ısınmanın temel nedenlerinden biri olan sera gazlarının çevre üzerindeki etkilerini açıklayınız.',
   ARRAY[45, 46], 'advanced', 'analysis', ARRAY['sera gazları', 'küresel ısınma'], 'Çevre Bilimleri', 16,
   ARRAY['Sera gazlarının tanımının doğru yapılması.', 'Neden-sonuç ilişkilerinin açıklanması.', 'Bilimsel kanıtların kullanılması.'],
   (SELECT id FROM metadata LIMIT 1)),

  ('Q17', 'Bir 5 kg kütleye 10 N kuvvet uygulanıyor. Kütlenin ivmesini hesaplayınız.',
   ARRAY[19], 'intermediate', 'application', ARRAY['kuvvet', 'kütle', 'ivme'], 'Fizik', 17,
   ARRAY['Newton''un yasasının doğru uygulanması.', 'Kütle ve kuvvet değerlerinin doğru yerine konulması.', 'Sonucun doğru birimle ifade edilmesi.'],
   (SELECT id FROM metadata LIMIT 1)),

  ('Q18', 'Fotosentez sürecini açıklayınız ve bu sürecin çevresel önemi üzerinde durunuz.',
   ARRAY[50, 51], 'advanced', 'comprehension', ARRAY['fotosentez', 'çevre'], 'Biyoloji', 18,
   ARRAY['Fotosentez sürecinin doğru açıklanması.', 'Sürecin çevresel öneminin belirtilmesi.', 'Bilimsel terimlerin doğru kullanılması.'],
   (SELECT id FROM metadata LIMIT 1)),

  ('Q19', 'Bir çemberin alanını hesaplayınız. Yarıçapı 10 cm olan bir çember için π''yi 3.14 olarak alınız.',
   ARRAY[6], 'basic', 'application', ARRAY['alan', 'çemberin matematiksi'], 'matematik', 19,
   ARRAY['Doğru alan formülünün yazılması.', 'Yarıçapın karesinin doğru hesaplanması.', 'Sonucun doğru birimle ifade edilmesi.'],
   (SELECT id FROM metadata LIMIT 1));

-- Metadata Table
INSERT INTO metadata (id, total_questions, coverage_pages, primary_topics)
VALUES
  (uuid_generate_v1(), 5, ARRAY[8, 17, 20, 32, 33, 55, 56], ARRAY['fizik', 'kimya', 'biyoloji', 'matematik']);

-- Model Answer Table
INSERT INTO model_answer (id, main_argument, key_points, supporting_evidence, conclusion)
VALUES
  (20, 'Ortalama hız, alınan yolun geçen zamana bölünmesiyle bulunur.',
   ARRAY['Hız formülü: Ortalama Hız = Alınan Mesafe / Geçen Zaman.', 'Verilen değerler: Mesafe = 120 km, Zaman = 2 saat.'],
   '[{"point": "Formül yerine konulur: Ortalama Hız = 120 / 2.", "page_reference": 20},
     {"point": "Hesaplama: Ortalama Hız = 60 km/saat.", "page_reference": 20}]',
   'Arabanın ortalama hızı 60 km/saat olarak hesaplanır.'),

  (21, 'Bir karışımın homojen veya heterojen olduğunu belirlemek için bileşenlerin dağılımına bakılır.',
   ARRAY['Homojen karışımlarda bileşenler eşit şekilde dağılmıştır (örneğin, tuzlu su).',
         'Heterojen karışımlarda bileşenler eşit olmayan şekilde dağılmıştır (örneğin, kumlu su).',
         'Görünüş, yoğunluk ve fiziksel ayrışma durumu incelenir.'],
   '[{"point": "Homojen karışımların bileşenleri mikroskobik düzeyde birbiriyle tamamen karışmıştır.", "page_reference": 32},
     {"point": "Heterojen karışımlar çıplak gözle ayrılabilir.", "page_reference": 33}]',
   'Karışımın homojenliği veya heterojenliği, bileşenlerin fiziksel özelliklerine dayanarak belirlenir.'),

  (22, 'Bir cismin ağırlığı, kütle ile yer çekimi ivmesinin çarpımıyla bulunur.',
   ARRAY['Ağırlık formülü: Ağırlık = Kütle x Yer Çekimi İvmesi.', 'Verilen değerler: Kütle = 10 kg, Yer Çekimi İvmesi = 9.8 m/s².'],
   '[{"point": "Formül yerine konulur: Ağırlık = 10 x 9.8.", "page_reference": 17},
     {"point": "Hesaplama: Ağırlık = 98 N.", "page_reference": 17}]',
   'Cismin ağırlığı 98 Newton’dur.'),

  (23, 'Kare prizmanın toplam yüzey alanı, taban alanlarının ve yan yüzey alanlarının toplamıdır.',
   ARRAY['Toplam yüzey alanı formülü: 2 x Taban Alanı + Çevre x Yükseklik.', 'Taban alanı: Kenar² = 5² = 25 cm².', 'Çevre: 4 x Kenar = 4 x 5 = 20 cm.'],
   '[{"point": "Hesaplama: Yüzey Alanı = 2 x 25 + 20 x 10 = 50 + 200 = 250 cm².", "page_reference": 8}]',
   'Kare prizmanın toplam yüzey alanı 250 cm² olarak bulunur.'),

  (24, 'Canlıların enerji ihtiyaçlarını karşılamak için kullandıkları süreç hücresel solunumdur.',
   ARRAY['Hücresel solunum glikoliz, krebs döngüsü ve oksidatif fosforilasyon aşamalarından oluşur.',
         'Glikoliz: Glikoz molekülü pirüvata parçalanır.',
         'Krebs döngüsü: Enerji taşıyıcı moleküller oluşturulur.',
         'Oksidatif fosforilasyon: ATP sentezlenir.'],
   '[{"point": "Glikoliz, sitoplazmada gerçekleşir ve anaerobik olabilir.", "page_reference": 55},
     {"point": "ATP sentezi, mitokondride oksijen varlığında maksimum düzeye ulaşır.", "page_reference": 56}]',
   'Hücresel solunum, enerji üretiminin temel biyokimyasal sürecidir ve yaşamın devamı için gereklidir.');

-- Supporting Evidence Table
INSERT INTO supporting_evidence (id, point, page_reference)
VALUES
  (38, 'Formül yerine konulur: Ortalama Hız = 120 / 2.', 20),
  (39, 'Hesaplama: Ortalama Hız = 60 km/saat.', 20),
  (40, 'Homojen karışımların bileşenleri mikroskobik düzeyde birbiriyle tamamen karışmıştır.', 32),
  (41, 'Heterojen karışımlar çıplak gözle ayrılabilir.', 33),
  (42, 'Formül yerine konulur: Ağırlık = 10 x 9.8.', 17),
  (43, 'Hesaplama: Ağırlık = 98 N.', 17),
  (44, 'Hesaplama: Yüzey Alanı = 2 x 25 + 20 x 10 = 50 + 200 = 250 cm².', 8),
  (45, 'Glikoliz, sitoplazmada gerçekleşir ve anaerobik olabilir.', 55),
  (46, 'ATP sentezi, mitokondride oksijen varlığında maksimum düzeye ulaşır.', 56),
  (47, 'Formül yerine konulur: Alan = π x r².', 6),
  (48, 'Hesaplama: Alan = 3.14 x 100 = 314 cm².', 6);

-- Questions Table
INSERT INTO questions (id, question_text, context_pages, difficulty_level, cognitive_level, key_concepts, course_name, model_answer_id, grading_criteria, metadata_id)
VALUES
  ('Q20', 'Bir araba 2 saatte 120 km yol almıştır. Bu arabanın ortalama hızını hesaplayınız.',
   ARRAY[20], 'basic', 'application', ARRAY['ortalama hız', 'mesafe', 'zaman'], 'Fizik', 20,
   ARRAY['Doğru hız formülünün kullanılması.', 'Mesafe ve zaman değerlerinin doğru hesaplanması.', 'Sonucun doğru birimle ifade edilmesi.'],
   (SELECT id FROM metadata LIMIT 1)),

  ('Q21', 'Bir karışımın homojen mi yoksa heterojen mi olduğunu belirlemek için hangi özelliklere bakılır? Açıklayınız.',
   ARRAY[32, 33], 'advanced', 'analysis', ARRAY['karışım', 'homojenlik', 'heterojenlik'], 'Kimya', 21,
   ARRAY['Homojen ve heterojen karışımların tanımlanması.', 'Belirleyici özelliklerin doğru açıklanması.', 'Örneklerin uygun şekilde verilmesi.'],
   (SELECT id FROM metadata LIMIT 1)),

  ('Q22', 'Bir cismin kütlesi 10 kg ve yer çekimi ivmesi 9.8 m/s². Bu cismin ağırlığını hesaplayınız.',
   ARRAY[17], 'basic', 'application', ARRAY['kütle', 'yer çekimi', 'ağırlık'], 'Fizik', 22,
   ARRAY['Ağırlık formülünün doğru yazılması.', 'Kütle ve ivme değerlerinin doğru kullanılması.', 'Sonucun doğru birimle ifade edilmesi.'],
   (SELECT id FROM metadata LIMIT 1)),

  ('Q23', 'Bir kare prizmanın toplam yüzey alanını hesaplayınız. Kenar uzunluğu 5 cm, yüksekliği 10 cm.',
   ARRAY[8], 'intermediate', 'application', ARRAY['yüzey alanı', 'kare prizma'], 'matematik', 23,
   ARRAY['Formülün doğru yazılması.', 'Taban ve çevre alanlarının doğru hesaplanması.', 'Sonucun doğru birimle ifade edilmesi.'],
   (SELECT id FROM metadata LIMIT 1)),

  ('Q24', 'Canlıların enerji ihtiyaçlarını karşılamak için kullandıkları biyokimyasal süreç nedir? Bu sürecin aşamalarını açıklayınız.',
   ARRAY[55, 56], 'advanced', 'comprehension', ARRAY['hücresel solunum', 'biyokimyasal süreçler'], 'Biyoloji', 24,
   ARRAY['Hücresel solunumun aşamalarının doğru açıklanması.', 'Her aşamanın bilimsel olarak ifade edilmesi.', 'Sürecin öneminin vurgulanması.'],
   (SELECT id FROM metadata LIMIT 1));