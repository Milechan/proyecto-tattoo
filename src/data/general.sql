DELETE FROM user_type;
DELETE FROM category;
DELETE FROM user;
DELETE FROM profile;
DELETE FROM post;

INSERT INTO user_type (name, description) VALUES 
('user', 'este es un usuario normal'),
('tattooer', 'este es un usuario tatuador');

INSERT INTO category (name, description, image, carousel) VALUES 
('Neotradicional', 
 'El tatuaje neotradicional combina elementos del old y el new school.El estilo «Neotradi», como también se le conoce, combina a la perfección innovación y tradición ya que toma elementos de la escuela Old School y los enriquece con toques del realismo y del estilo New School dando lugar a tatuaje muy llamativos.', 
 'https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/categorias/banners/image-neotradicional.png', 
 '["https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/categorias/carrusel/neotradicional/1.png","https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/categorias/carrusel/neotradicional/3.png","https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/categorias/carrusel/neotradicional/4.png"]'),

('Geeks', 
 'Un tatuaje geek es un diseño inspirado en la cultura geek, que incluye temas de ciencia, tecnología, videojuegos, dibujos animados, cómics, películas, y más.Geek es un término que se usa para describir a una persona apasionada por la tecnología, la informática, y temas relacionados.Los geeks suelen estar obsesionados con lo más nuevo, lo más cool, y lo más de moda en su tema de interés.', 
 'https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/categorias/banners/image-geek.png', 
 '["https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/categorias/carrusel/geecks/ChatGPT+Image+7+abr+2025%2C+16_42_15.png","https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/categorias/carrusel/geecks/ChatGPT+Image+7+abr+2025%2C+16_42_21.png","https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/categorias/carrusel/geecks/ChatGPT+Image+7+abr+2025%2C+17_06_19.png"]'),

('Minimalista', 
 'Un tatuaje minimalista es un diseño sencillo que se caracteriza por líneas limpias, sombreado mínimo y colores sobrios. Son populares por su discreción y elegancia.Son fáciles de realizar, ideales para personas que no toleran bien el dolor.Suelen ser de pequeño tamaño y pueden tener significados profundos y personales', 
 'https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/categorias/banners/image-minimalista.png', 
 '["https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/categorias/carrusel/minimalista/ChatGPT+Image+7+abr+2025%2C+19_07_46.png","https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/categorias/carrusel/minimalista/ChatGPT+Image+7+abr+2025%2C+19_10_57.png","https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/categorias/carrusel/minimalista/ChatGPT+Image+7+abr+2025%2C+19_07_52.png"]'),

('Black-Out', 
 'Un tatuaje blackout es un tatuaje que cubre una parte del cuerpo con tinta negra sólida.Esta técnica de tatuaje se ha vuelto popular entre celebridades y deportistas.Se pueden tatuar grandes áreas del cuerpo, como brazos, piernas, espalda, pecho o cuello.Pueden ser una forma de ocultar tatuajes antiguos que ya no se desean.Pueden crear contrastes audaces con áreas no tatuadas y también pueden incorporar patrones y diseños geométricos.', 
 'https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/categorias/banners/image-black-out.png', 
 '["https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/categorias/carrusel/black-out/ChatGPT+Image+11+abr+2025%2C+16_49_09.png","https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/categorias/carrusel/black-out/ChatGPT+Image+11+abr+2025%2C+16_49_10.png","https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/categorias/carrusel/black-out/ChatGPT+Image+11+abr+2025%2C+16_49_13.png"]'),

('Realismo', 
 'Un tatuaje realista es un diseño que imita de manera fiel la realidad, como si fuera un cuadro. Este estilo de tatuaje se caracteriza por los detalles precisos, las sombras y la reproducción de fotografías.Se basa en una imagen de referencia, ya sea una foto o algo natural.Requiere de una gran habilidad y experiencia por parte del tatuador.La calidad del tatuaje depende de la pericia del tatuador y de la calidad de la imagen original.Puede ser duradero, por lo que es importante elegir bien el diseño', 
 'https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/categorias/banners/image-realismo.png', 
 '["https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/categorias/carrusel/realismo/ChatGPT+Image+7+abr+2025%2C+19_16_40.png","https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/categorias/carrusel/realismo/ChatGPT+Image+7+abr+2025%2C+19_17_47.png","https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/categorias/carrusel/realismo/ChatGPT+Image+7+abr+2025%2C+19_28_23.png"]');
 
INSERT INTO user (name,username,password,email,notification_enabled,user_type_id,category_id) VALUES
--neotradicional
("Asmodeus","asmodeus_tattoo","scrypt:32768:8:1$YIds4JWIXsmbVHTD$a7400517853410c14e8227988a778cb46044ac0d8daafc048ccf58ec2fec6d03ffa5cecb699cbffb3e25b056e94cd730480f8ab0f329a904b9ad127b10468d81","asmodeus.tattoo@gmail.com",true,2,1),
("Monse Santelices","ateskun_","scrypt:32768:8:1$YIds4JWIXsmbVHTD$a7400517853410c14e8227988a778cb46044ac0d8daafc048ccf58ec2fec6d03ffa5cecb699cbffb3e25b056e94cd730480f8ab0f329a904b9ad127b10468d81","ateskun@gmail.com",true,2,1),
("Karen","krn.blvck","scrypt:32768:8:1$YIds4JWIXsmbVHTD$a7400517853410c14e8227988a778cb46044ac0d8daafc048ccf58ec2fec6d03ffa5cecb699cbffb3e25b056e94cd730480f8ab0f329a904b9ad127b10468d81","Karen@gmail.com",true,2,1),
("Pipa Kabuki","pipakabuki","scrypt:32768:8:1$YIds4JWIXsmbVHTD$a7400517853410c14e8227988a778cb46044ac0d8daafc048ccf58ec2fec6d03ffa5cecb699cbffb3e25b056e94cd730480f8ab0f329a904b9ad127b10468d81","pipa.kabuki@gmail.com",true,2,1),
--geeks
("dearmermaid","deadmermaid.tattoo","scrypt:32768:8:1$YIds4JWIXsmbVHTD$a7400517853410c14e8227988a778cb46044ac0d8daafc048ccf58ec2fec6d03ffa5cecb699cbffb3e25b056e94cd730480f8ab0f329a904b9ad127b10468d81","deadmermaid@gmail.com",true,2,2),
("dr.etherlnk","dr.etherink","scrypt:32768:8:1$YIds4JWIXsmbVHTD$a7400517853410c14e8227988a778cb46044ac0d8daafc048ccf58ec2fec6d03ffa5cecb699cbffb3e25b056e94cd730480f8ab0f329a904b9ad127b10468d81","dr.etherink@gmail.com",true,2,2), 
("Lissalme","lissssalme","scrypt:32768:8:1$YIds4JWIXsmbVHTD$a7400517853410c14e8227988a778cb46044ac0d8daafc048ccf58ec2fec6d03ffa5cecb699cbffb3e25b056e94cd730480f8ab0f329a904b9ad127b10468d81","lissssalme@gmail.com",true,2,2),
("Alejandra","aleinnk","scrypt:32768:8:1$YIds4JWIXsmbVHTD$a7400517853410c14e8227988a778cb46044ac0d8daafc048ccf58ec2fec6d03ffa5cecb699cbffb3e25b056e94cd730480f8ab0f329a904b9ad127b10468d81","aleinnk@gmail.com",true,2,2),
--minimalista
("Teffylines Bta", "teffylines", "scrypt:32768:8:1$YIds4JWIXsmbVHTD$a7400517853410c14e8227988a778cb46044ac0d8daafc048ccf58ec2fec6d03ffa5cecb699cbffb3e25b056e94cd730480f8ab0f329a904b9ad127b10468d81", "teffylines@gmail.com", true, 2, 3),
("Jessica Dahian Duran Molina", "jessicaduran_art", "scrypt:32768:8:1$YIds4JWIXsmbVHTD$a7400517853410c14e8227988a778cb46044ac0d8daafc048ccf58ec2fec6d03ffa5cecb699cbffb3e25b056e94cd730480f8ab0f329a904b9ad127b10468d81", "jessicaduran_art@gmail.com", true, 2, 3),
("Daisy", "daisydoestattoos", "scrypt:32768:8:1$YIds4JWIXsmbVHTD$a7400517853410c14e8227988a778cb46044ac0d8daafc048ccf58ec2fec6d03ffa5cecb699cbffb3e25b056e94cd730480f8ab0f329a904b9ad127b10468d81", "daisydoestattoos@gmail.com", true, 2, 3),
("Gime Femia", "gimefemia", "scrypt:32768:8:1$YIds4JWIXsmbVHTD$a7400517853410c14e8227988a778cb46044ac0d8daafc048ccf58ec2fec6d03ffa5cecb699cbffb3e25b056e94cd730480f8ab0f329a904b9ad127b10468d81", "gimefemia@gmail.com", true, 2, 3),
--black-out
("Alejandro Alles", "allesink", "scrypt:32768:8:1$YIds4JWIXsmbVHTD$a7400517853410c14e8227988a778cb46044ac0d8daafc048ccf58ec2fec6d03ffa5cecb699cbffb3e25b056e94cd730480f8ab0f329a904b9ad127b10468d81", "allesink@gmail.com", true, 2, 4),
("Carlos Guerrero", "carlos_tattooer1", "scrypt:32768:8:1$YIds4JWIXsmbVHTD$a7400517853410c14e8227988a778cb46044ac0d8daafc048ccf58ec2fec6d03ffa5cecb699cbffb3e25b056e94cd730480f8ab0f329a904b9ad127b10468d81", "carlos_tattooer1@gmail.com", true, 2, 4),
("Valentina Brow", "bisnezbrow", "scrypt:32768:8:1$YIds4JWIXsmbVHTD$a7400517853410c14e8227988a778cb46044ac0d8daafc048ccf58ec2fec6d03ffa5cecb699cbffb3e25b056e94cd730480f8ab0f329a904b9ad127b10468d81", "bisnezbrow@gmail.com", true, 2, 4),
("Proyecto OXO", "project_oxo", "scrypt:32768:8:1$YIds4JWIXsmbVHTD$a7400517853410c14e8227988a778cb46044ac0d8daafc048ccf58ec2fec6d03ffa5cecb699cbffb3e25b056e94cd730480f8ab0f329a904b9ad127b10468d81", "project_oxo@gmail.com", true, 2, 4),
--realismo
("Javier Alvial","vieralvialtattoo","scrypt:32768:8:1$YIds4JWIXsmbVHTD$a7400517853410c14e8227988a778cb46044ac0d8daafc048ccf58ec2fec6d03ffa5cecb699cbffb3e25b056e94cd730480f8ab0f329a904b9ad127b10468d81","javieralvialtattoo@gmail.com",true,2,5),
("Realismo Tattoo","realismo.tattoo","scrypt:32768:8:1$YIds4JWIXsmbVHTD$a7400517853410c14e8227988a778cb46044ac0d8daafc048ccf58ec2fec6d03ffa5cecb699cbffb3e25b056e94cd730480f8ab0f329a904b9ad127b10468d81","realismo.tattoo@gmail.com",true,2,5),
("Ivan Ignacio","ivanignacio07_inktattoo","scrypt:32768:8:1$YIds4JWIXsmbVHTD$a7400517853410c14e8227988a778cb46044ac0d8daafc048ccf58ec2fec6d03ffa5cecb699cbffb3e25b056e94cd730480f8ab0f329a904b9ad127b10468d81","ivanignacio07_inktattoo@gmail.com",true,2,5),
("Ramon Nieves","ramonieves_","scrypt:32768:8:1$YIds4JWIXsmbVHTD$a7400517853410c14e8227988a778cb46044ac0d8daafc048ccf58ec2fec6d03ffa5cecb699cbffb3e25b056e94cd730480f8ab0f329a904b9ad127b10468d81","ramonieves_@gmail.com",true,2,5);

INSERT INTO profile (user_id, bio, profile_picture, ranking, category_id, social_media_insta,social_media_wsp,social_media_x,social_media_facebook) VALUES
--neotradicional
(1,"Me dedico a realizar arte neotradicional desde hace años, me gusta el poder sobreexagerar los colores al momento de tatuar,y claramente los Onis son lo mas caracteristico que realizo","https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/neotradicional/tatuador1/1.png","",0,1,"https://www.instagram.com/asmodeus_tattoo/?hl=es-la","","",""),
(2,"Me identifico como una tatuadara extravagante, me gusta el poder tatuar con colores, siento que le da mas realismo en si mismo, al igual el que me permitan hacer tatuajes en mi estilo de dibujo,ya que tambien soy artista","https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/neotradicional/tatuador2/7.png","",0,1,"https://www.instagram.com/ateskun_/?hl=es-la","","",""),
(3,"No hay nada que me guste mas que tatuar en negro, siento que las lineas realmente resaltan y que uno puede identificarse con ello.Claramente usando el estilo neotradicional","https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/neotradicional/tatuador3/4.png","",0,1,"https://www.instagram.com/krn.blvck/?hl=es-la","","",""),
(4,"En lo personal me gusta tatuar animales en el estilo neotradicional, me es algo muy artistico y claramente que con mi estilo integrado, siento que queda GOD","https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/neotradicional/tatuador4/6.png","",0,1,"https://www.instagram.com/pipakabuki/?hl=es-la","","",""),
--geeks
(5,"Aguja en mano y corazón geek, soy una tatuadora apasionada por el anime y los videojuegos. Mi tinta da vida a personajes y mundos favoritos en la piel de mis clientes, creando obras únicas llenas de color y detalle. Si amas el anime y buscas llevarlo contigo, ¡hablemos de tu próximo tatuaje!","https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/geeks/tatuador1/6.png","",0,2,"https://www.instagram.com/deadmermaid.tattoo/?hl=es-la","","",""),
(6,"Tatuadora geek de corazón otaku. Mi pasión: convertir la piel en un lienzo vibrante de anime y videojuegos. Cada aguja traza historias y personajes amados, creando tatuajes únicos para verdaderos fans. ¿Listo para llevar tu fandom a otro nivel? ¡Conversemos!","https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/geeks/tatuador2/4.png","",0,2,"https://www.instagram.com/dr.etherink/?hl=es-la","","",""),
(7,"Agujas frías sobre la piel, desvelando trazos de la noche y la melancolía. Mi arte en tinta explora la belleza en lo oscuro, lo etéreo y los susurros del alma. Si tus historias se tiñen de sombras y buscas un tatuaje que las recite en tu piel, aquí encontrarás un eco en cada línea.","https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/geeks/tatuador3/6.png","",0,2,"https://www.instagram.com/lissssalme/?hl=es-la","","",""),
(8,"Mi arte en la piel es una explosión de color y líneas vivaces. Con cada tatuaje, celebro la alegría y los momentos que nos hacen sonreír. Si buscas plasmar esa chispa de felicidad en tu piel, creando un recuerdo vibrante y lleno de energía, ¡manos a la obra!","https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/geeks/tatuador4/6.png","",0,2,"https://www.instagram.com/aleinnk/?hl=es-la","","",""),
--minimalista
(9,"El arte de la naturaleza, reducido a lo esencial. Tatuajes minimalistas que capturan la belleza de las plantas y flores.","https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/minimalista/tatuador1/imagenes+2+.png","",0,3,"https://www.instagram.com/teffylines/?hl=es","wa.me/573125697412","","https://www.facebook.com/people/Teffy-Lines-Tatto/61573715077130/?ref=ig_profile_ac"),
(10,"Tatuajes que combinan el minimalismo y la naturaleza. Cada diseño, una obra única inspirada en la serenidad de las plantas.","https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/minimalista/tatuador2/minimalist+5.jpeg","",0,3,"https://www.instagram.com/jessicaduran_art/?hl=es-la","wa.me/573126013290","",""),
(11,"Transformando la simplicidad en arte. Tatuajes botánicos que celebran las formas y detalles más sutiles de la naturaleza.","https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/minimalista/tatuador3/minimalista+botanico+6.png","",0,3,"https://www.instagram.com/daisydoestattoos/?utm_source=ig_embed&ig_rid=c271bf3e-98e0-4355-8d3b-1d1f33ea4c69","wa.me/573126013290","",""),
(12,"Minimalismo y botánica en su máxima expresión. Diseños limpios y elegantes, inspirados en la flora que nos rodea.","https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/minimalista/tatuador4/botanico+4.jpeg","",0,3,"https://www.instagram.com/gimefemia/?hl=es","wa.me/573126013290","",""),
--black-out
(13,"Transformando el dolor en arte oscuro. Tatuajes black-out que cubren la piel con carácter, fuerza y elegancia minimalista.","https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/black-out/tatuador1/BLK++.%23inprogresstattoo+Two+sessions+in+a+row+for+start+to+my+friend+%40don_galvis+++I%E2%80%99m+existing+to+see+how+this+Blackout+is+gonna+be+soon!+Hit+me+on+comments++.%23blacktattooart+%23balckout+%23darkart+%23blxckout+%23brokentat.jpg","",0,4,"https://www.instagram.com/allesink/?hl=es-la","","",""),
(14,"Negro profundo, trazos intensos. Cada diseño black-out redefine el cuerpo como un lienzo de poder visual absoluto.","https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/black-out/tatuador2/Suminagashi+en+2+sesiones+para+Abraham+++..%23venezuela+%23madrid+%23tattooart+%23tattoos+%23blackwork%23blackworktattoo+%23quito+%23ecuador+%23venezuela+%23dynamicink%23tattoomadrid+%23blacktattoo+%23inked+%23tatuajes+%23tattooer%23tattooed+%23rome.jpg","",0,4,"https://www.instagram.com/carlos_tattooer1/?hl=es-la","","",""),
(15,"Arte conceptual y cobertura total. Diseños black-out que combinan simetría, geometría y expresión corporal radical.","https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/black-out/tatuador3/DALL%C2%B7E+2025-04-12+20.28.25+-+A+unique+blackout+tattoo+design+on+a+different+body+part%2C+using+bold+black+ink+with+creative+elements+like+abstract+forms%2C+geometric+patterns%2C+or+trib.webp","",0,4,"https://www.instagram.com/bisnezbrow/?hl=es-la","","",""),
(16,"Minimalismo extremo y tinta sólida. Cada pieza black-out cubre el cuerpo con personalidad, audacia y belleza cruda.","https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/black-out/tatuador4/DALL%C2%B7E+2025-04-12+20.42.33+-+Blackout+tattoo+in+solid+black+ink+covering+the+full+leg+in+a+minimalistic+style.+The+tattoo+design+should+feature+deep+black+ink+without+patterns+or+.webp","",0,4,"https://www.instagram.com/project.oxo/?hl=es-la","","",""),
--realismo
(17,"El realismo cobra vida en la piel. Tatuajes que capturan cada detalle, sombra y textura, transformando imágenes en arte permanente.","https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/realismo/tatuador1/70f41ede5296246189fc7c711e04871c.jpg","",0,5,"https://www.instagram.com/javieralvialtattoo/","","",""),
(18,"Arte hiperrealista en tu piel. Cada tatuaje es un lienzo de precisión, donde la profundidad y los contrastes narran historias.","https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/realismo/tatuador2/ChatGPT+Image+11+abr+2025%2C+07_06_46.png","",0,5,"https://www.instagram.com/realismo.tattoo/","","",""),
(19,"Tatuajes realistas que desafían la percepción. Trabajando con sombras y volúmenes para crear piezas que respiran en tu piel.","https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/realismo/tatuador3/Tatuaje-realista-de-mujer-970x1024.jpeg.jpg","",0,5,"https://www.instagram.com/ivanignacio07_inktattoo/?hl=es-la","","",""),
(20,"Realismo puro, emoción en cada trazo. Especializado en retratos y escenas que conservan la esencia de lo que amas.","https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/realismo/tatuador4/steel-of-doom-tony-black-tattoo-barcelona-realismo-2.jpg","",0,5,"https://www.instagram.com/ramonieves_/","","","");

INSERT INTO post (user_id,image,description) VALUES
--neotradicional
--user 1
(1,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/neotradicional/tatuador1/7.png","grulla conc alavera Oni✨"),
(1,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/neotradicional/tatuador1/6.png","nuestro demonio sombrilla presente"),
(1,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/neotradicional/tatuador1/4.png","el mismisimo autobus de gatito que sale en totoro"),
(1,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/neotradicional/tatuador1/3.png","infaltable la mascarita de Oni de hoy"),
(1,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/neotradicional/tatuador1/2.png","el zorrito mas loco que he hecho hasta ahora"),
(1,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/neotradicional/tatuador1/1.png","presente nuestro demonio tigre!"),
--user 2
(2,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/neotradicional/tatuador2/image.png","uno de los primeros dibujitos que he podido llegar a tatuar"),
(2,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/neotradicional/tatuador2/image.png","gatito vaquitaaaa, muuu"),
(2,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/neotradicional/tatuador2/6.png","nuestro precioso haku en su version de dragonsito uwu"),
(2,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/neotradicional/tatuador2/4.png","hermosisimas peonias que se llevo una clienta el dia de hoy"),
(2,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/neotradicional/tatuador2/3.png","este es el trigre mas bonito que me han pedido,gracias por dejarme hacer este tipo de trabajito"),
(2,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/neotradicional/tatuador2/2.png","infaltable pecesito Koi,muy divertida sesion y buenas historias jaja"),
--user 3
(3,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/neotradicional/tatuador3/6.png","gracias por el aguantee, estuvo muy entretenido ahcer este demonio"),
(3,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/neotradicional/tatuador3/5.png","como saben siempre hay un dragonsito!, atrevase a hacerse algo asi!"),
(3,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/neotradicional/tatuador3/4.png","fueron varias horitas,pero valio la pena completamente!"),
(3,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/neotradicional/tatuador3/3.png","lejos uno de los dragonsitos que mas me han gustado"),
(3,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/neotradicional/tatuador3/2.png","mascarita de Oni!"),
(3,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/neotradicional/tatuador3/1.png","antebrazo con un dragonsito juju"),
--user 4
(4,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/neotradicional/tatuador4/7.png","alcon milenario!, quedo brutal,gracias por la confianza"),
(4,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/neotradicional/tatuador4/6.png","aguila full neotradi"),
(4,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/neotradicional/tatuador4/5.png","calaverita de la semana,cuanto aguante mi panita en ese cuello"),
(4,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/neotradicional/tatuador4/3.png","nuestro super tigresito que quedo mortal"),
(4,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/neotradicional/tatuador4/2.png","otra aguilita aqui, bien bonita,tatuense!"),
(4,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/neotradicional/tatuador4/1.png","referencia traida por el cliente,quedamos muy conformes con el resultado!"),


--geeks
--user 5
(5,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/geeks/tatuador1/4.png",""),
(5,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/geeks/tatuador1/5.png",""),
(5,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/geeks/tatuador1/6.png",""),
(5,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/geeks/tatuador1/Captura+de+pantalla+2025-04-11+185746.png",""),
(5,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/geeks/tatuador1/Captura+de+pantalla+2025-04-11+185821.png",""),
(5,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/geeks/tatuador1/geeks_2.webp",""),
--user 6
(6,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/geeks/tatuador2/1.png",""),
(6,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/geeks/tatuador2/2.png",""),
(6,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/geeks/tatuador2/3.png",""),
(6,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/geeks/tatuador2/4.png",""),
(6,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/geeks/tatuador2/5.png",""),
(6,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/geeks/tatuador2/6.png",""),
--user 7
(7,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/geeks/tatuador3/1.png",""),
(7,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/geeks/tatuador3/2.png",""),
(7,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/geeks/tatuador3/4.png",""),
(7,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/geeks/tatuador3/5.png",""),
(7,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/geeks/tatuador3/6.png",""),
(7,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/geeks/tatuador3/7.png",""),
--user 8
(8,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/geeks/tatuador4/6.png",""),
(8,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/geeks/tatuador4/Captura+de+pantalla+2025-04-11+185959.png",""),
(8,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/geeks/tatuador4/Captura+de+pantalla+2025-04-11+190057.png",""),
(8,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/geeks/tatuador4/Captura+de+pantalla+2025-04-11+190149.png",""),
(8,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/geeks/tatuador4/Captura+de+pantalla+2025-04-11+190226.png",""),
(8,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/geeks/tatuador4/geeks_5.png",""),


--minimalista
--user 9
(9,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/minimalista/tatuador1/minimalista+5.png","Tatuaje minimalista de un perro en línea sencilla."),
(9,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/minimalista/tatuador1/minimalista+6.png","Tatuaje minimalista con las palabras 'SELF LOVE' en tipografía sencilla."),
(9,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/minimalista/tatuador1/Imagenes+-+minimalista.png","Tatuaje minimalista con una flor, montañas, una luna, estrellas y un gato."),
(9,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/minimalista/tatuador1/imagenes+2+.png","Tatuaje minimalista con tres flores: una rosa, una margarita y un tulipán."),
(9,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/minimalista/tatuador1/minimalista+3+.png","Tatuaje minimalista con tres flores: una rosa, una margarita y una flor silvestre."),
(9,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/minimalista/tatuador1/minimalista+4.png","Tatuaje minimalista de un gato sentado, delineado con líneas sencillas."),
--user 10
(10,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/minimalista/tatuador2/minimalist+1.jpeg","Tatuaje minimalista de una rama delicada con pequeños detalles, colocado en el hombro."),
(10,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/minimalista/tatuador2/minimalist+2.jpeg","Tatuaje minimalista de una flor delicada con detalles finos, ubicado en el costado."),
(10,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/minimalista/tatuador2/minimalist+3.jpeg","Tatuaje minimalista de flores azules delicadas acompañadas de dos mariposas, ubicado en el costado."),
(10,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/minimalista/tatuador2/minimalist+4.jpeg","Tatuaje minimalista de un delfín en movimiento, formado por líneas simples y suaves."),
(10,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/minimalista/tatuador2/minimalist+5.jpeg","Tatuaje minimalista de un dragón fluido acompañado de ramas de flores rojas, creando un diseño dinámico y elegante."),
(10,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/minimalista/tatuador2/minimalist+6.jpeg","Tatuaje minimalista de flores delicadas con una mariposa, creando un diseño armonioso y elegante en el hombro."),
--user 11
(11,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/minimalista/tatuador3/minimalista+bot%C3%A1nico+5.png","Tatuaje detallado de flores con sombras suaves, creando un diseño florido y elegante en el pecho."),
(11,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/minimalista/tatuador3/minimalista+bot%C3%A1nico+4+.png","Tatuaje detallado de una rama con hojas y flores, creando un diseño elegante y lleno de textura en el brazo."),
(11,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/minimalista/tatuador3/minimalista+botanico+6.png","Tatuaje vibrante de flores coloridas con detalles finos, creando un diseño elegante y floral en el antebrazo."),
(11,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/minimalista/tatuador3/botanico+minimalista+1.png","Tatuaje minimalista de una rama delicada con detalles finos, complementada con un símbolo pequeño en la parte inferior del diseño, ubicado en el brazo"),
(11,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/minimalista/tatuador3/minimalista+bot%C3%A1nico+2+.png","Tatuaje floral detallado con flores de colores suaves y sombras delicadas, creando un diseño elegante en el hombro."),
(11,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/minimalista/tatuador3/minimalista+botanico+3+.png","Tatuaje minimalista de flores delicadas, con detalles sutiles en tonos suaves, ubicado en el antebrazo."),
--user 12
(12,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/minimalista/tatuador4/bot%C3%A1nico+1+.jpeg","Tatuaje detallado de flores y plantas, cubriendo el antebrazo con un diseño fluido y natural."),
(12,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/minimalista/tatuador4/botanico+2.jpeg","Tatuaje detallado de una variedad de flores y plantas con toques sutiles de sombreado, cubriendo el antebrazo."),
(12,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/minimalista/tatuador4/botanico+3.jpeg","Tatuaje detallado de flores y plantas que cubre toda la pierna, con un diseño fluido y sutilmente sombreado."),
(12,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/minimalista/tatuador4/botanico+4.jpeg","Tatuaje detallado de flores y hojas cubriendo todo el brazo y parte del hombro, creando un diseño fluido y natural."),
(12,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/minimalista/tatuador4/botanico+5+.jpeg","Tatuaje detallado de un pájaro en vuelo rodeado de ramas y hojas, cubriendo el brazo con un diseño elegante y fluido."),
(12,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/minimalista/tatuador4/botanico+6.jpeg","Tatuaje de flores detalladas, principalmente rosas, con sombreado suave, cubriendo el hombro y parte del brazo"),


--black-out
--user 13
(13,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/black-out/tatuador1/487169151_18494954569035389_8816209427697667018_n.jpg","🖤 Diseño blackout que cubre una amplia zona del brazo con tinta sólida negra, resaltando un estilo oscuro y profundo."),
(13,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/black-out/tatuador1/Blast+Swipe+next-+desliza+++.Estaré+una+semana+en+BARCELONA+y+MADRID+++para+quienes+deseen+reservar+un+cupo+me+escriban+al+mail++.+allesinkcl%40gmail.com+.O+al+WhatsApp+(link+in+bio)+.%23darkart+%23broken+%23blasttattoo+%23ve.jpg","Tatuaje estilo blackout con fuerte presencia de tinta negra en bloques, transmitiendo intensidad y dramatismo."),
(13,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/black-out/tatuador1/BLK++.%23inprogresstattoo+Two+sessions+in+a+row+for+start+to+my+friend+%40don_galvis+++I’m+existing+to+see+how+this+Blackout+is+gonna+be+soon!+Hit+me+on+comments++.%23blacktattooart+%23balckout+%23darkart+%23blxckout+%23brokentat.jpg","Blackout en proceso con cobertura extensa del brazo, destacando geometría oscura y contrastes intensos."),
(13,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/black-out/tatuador1/brknk+%23inprogress+.Cupos+disponibles+en+Santiago++5-6-7-8-9-10+Febrero++Interesadxs+escribir+al+dm++.%40snowcrewstudio+%40eztattooing+%40allegoryink+%40expresion_tattoosupply+%40dont_cry_baby_productos+%40skeletons_supplies+%40ca.jpg","🖤 Tatuaje blackout en progreso con un diseño envolvente y agresivo, enfocado en el uso intensivo de negro sólido."),
(13,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/black-out/tatuador1/brknk+%23inprogress+.Cupos+disponibles+en+Santiago++5-6-7-8-9-10+Febrero++Interesadxs+escribir+al+dm++.%40snowcrewstudio+%40eztattooing+%40allegoryink+%40expresion_tattoosupply+%40dont_cry_baby_productos+%40skeletons_supplies+%40ca.jpg","Cobertura blackout simétrica con zonas amplias de tinta negra continua, ideal para quienes buscan un estilo fuerte."),
(13,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/black-out/tatuador1/fill+.Reservas+al+dm+o+link+en+bio++DIC+-+ENE+-+FEB+Stgo%2C+Chile+++%40snowcrewstudio+.%23darkarm+%23blackwork+%23blackproject+%23blackworkers+%23blackartist+%23mandala+%23geometric+%23darkgeometry.heic","🖤 Diseño blackout con tinta profunda y efecto de relleno total en el brazo, sin elementos decorativos."),
--user 14
(14,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/black-out/tatuador2/Blackout+brazo+completo%2C+2+sesiones+++..%23venezuela+%23madrid+%23tattooart+%23tattoos+%23blackwork%23blackworktattoo+%23quito+%23ecuador+%23venezuela+%23dynamicink%23tattoomadrid+%23blacktattoo+%23inked+%23tatuajes+%23tattooer%23tattooed+%23rometat.jpg","🖤 Tatuaje blackout de brazo completo realizado en dos sesiones, destacando un acabado sólido y profesional."),
(14,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/black-out/tatuador2/El+poder+de+la+apuesta+++gracias+Jair+por+el+proyecto+++Gente+de+quito%2C+tendré+descuento+en+mi+sesión+por+el+mes+de+noviembre+y+diciembre%2C+así+que+agenda+ya+++no+te+quedes+sin+la+oportunidad+de+lucir+un+tatuaje+herm.jpg","🖤 Diseño blackout potente con tinta negra 🖤 dominante, reflejando fuerza y decisión en cada trazo."),
(14,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/black-out/tatuador2/Hannya+samurai%2C+primera+sesión+de+brazo+completo+en+estilo+blackwork+oriental++..%23venezuela+%23madrid+%23tattooart+%23tattoos+%23blackwork%23blackworktattoo+%23quito+%23ecuador+%23venezuela+%23dynamicink%23tattoomadrid+%23blacktattoo+%23in.jpg","Primera sesión de brazo completo con fusión entre estilo blackout y arte oriental 🈶, con una máscara Hannya 🎭 como protagonista."),
(14,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/black-out/tatuador2/Manga+externa+blackwork+oriental+++3+sesiones+12+horas+aproximadamente+en+total++..%23venezuela+%23madrid+%23tattooart+%23tattoos+%23blackwork%23blackworktattoo+%23quito+%23ecuador+%23venezuela+%23dynamicink%23tattoomadrid+%23blacktattoo+%23.jpg","Manga completa en estilo blackout oriental, realizada en tres sesiones con gran detalle y profundidad."),
(14,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/black-out/tatuador2/Poseidon+++proyecto+realizado+en+7+sesiones+++para+Rafa+++...%23venezuela+%23madrid+%23tattooart+%23tattoos+%23blackwork%23blackworktattoo+%23quito+%23ecuador+%23venezuela+%23dynamicink%23tattoomadrid+%23blacktattoo+%23inked+%23tatuajes+%23tatto.jpg","Imponente tatuaje de Poseidón 🌊 en estilo blackout, con sombreado profundo y múltiples sesiones de ejecución."),
(14,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/black-out/tatuador2/Suminagashi+en+2+sesiones+para+Abraham+++..%23venezuela+%23madrid+%23tattooart+%23tattoos+%23blackwork%23blackworktattoo+%23quito+%23ecuador+%23venezuela+%23dynamicink%23tattoomadrid+%23blacktattoo+%23inked+%23tatuajes+%23tattooer%23tattooed+%23rome.jpg","🖤 Diseño blackout inspirado en el arte japonés Suminagashi, con patrones fluidos en tinta negra sólida."),
--user 15
(15,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/black-out/tatuador3/DALL·E+2025-04-12+20.28.18+-+A+tattoo+design+in+the+blackout+style.+The+tattoo+features+bold+black+ink+coverage+with+artistic+elements+such+as+geometric+shapes%2C+tribal+patterns%2C+a.webp","🖤 Diseño blackout con tinta negra 🖤 audaz, incorporando patrones geométricos y tribales en una composición artística."),
(15,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/black-out/tatuador3/DALL·E+2025-04-12+20.28.23+-+A+tattoo+design+in+the+blackout+style.+The+tattoo+features+bold+black+ink+coverage+with+artistic+elements+such+as+geometric+shapes%2C+tribal+patterns%2C+a.webp","🖤 Tatuaje blackout con diseño abstracto que mezcla figuras geométricas 🔷 con líneas tribales en tinta negra intensa."),
(15,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/black-out/tatuador3/DALL·E+2025-04-12+20.28.25+-+A+unique+blackout+tattoo+design+on+a+different+body+part%2C+using+bold+black+ink+with+creative+elements+like+abstract+forms%2C+geometric+patterns%2C+or+trib.webp","🖤 Tatuaje blackout único en una zona corporal distinta, con formas abstractas 🎨 y tinta negra sólida."),
(15,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/black-out/tatuador3/DALL·E+2025-04-12+20.28.28+-+A+unique+blackout+tattoo+design+on+a+different+body+part%2C+using+bold+black+ink+with+creative+elements+like+abstract+forms%2C+geometric+patterns%2C+or+trib.webp","🖤 Diseño blackout creativo que cubre el cuerpo con patrones oscuros y formas no convencionales."),
(15,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/black-out/tatuador3/DALL·E+2025-04-12+20.28.34+-+A+blackout+tattoo+design+featuring+bold+black+ink+with+geometric+patterns+and+abstract+forms.+The+tattoo+is+applied+on+a+visible+body+part+such+as+the.webp","🖤 Tatuaje blackout aplicado en una zona muy visible 👀, con figuras geométricas 🔷 y estética moderna."),
(15,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/black-out/tatuador3/DALL·E+2025-04-12+20.28.39+-+A+blackout+tattoo+design+featuring+bold+black+ink+with+geometric+patterns+and+abstract+forms.+The+tattoo+is+applied+on+a+visible+body+part+such+as+the.webp","Blackout contemporáneo con líneas abstractas 🎨 y figuras geométricas 🔷, resaltando sobre fondo completamente negro."),
--user 16
(16,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/black-out/tatuador4/DALL·E+2025-04-12+20.30.29+-+Solid+black+blackout+tattoo+design+on+uncommon+body+parts+like+the+side+of+the+neck%2C+back+of+the+hand%2C+upper+thighs%2C+lower+calves%2C+abdomen%2C+or+shoulde.webp","🖤 Diseño blackout de tinta negra sólida aplicado en zonas poco comunes ✨ como cuello lateral, mano o pantorrillas."),
(16,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/black-out/tatuador4/DALL·E+2025-04-12+20.30.51+-+Solid+black+blackout+tattoo+design+on+uncommon+body+parts+like+the+side+of+the+neck%2C+back+of+the+hand%2C+upper+thighs%2C+lower+calves%2C+abdomen%2C+or+shoulde.webp","🖤 Tatuaje blackout completo en zonas como muslos o abdomen, con tinta negra 🖤 intensa y estilo minimalista."),
(16,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/black-out/tatuador4/DALL·E+2025-04-12+20.30.54+-+Blackout+tattoo+design+with+solid+black+ink%2C+located+on+different+parts+of+the+body+not+previously+shown%2C+such+as+the+neck%2C+hands%2C+thighs%2C+calves%2C+sto.webp","🖤 Diseño blackout en tinta negra continua aplicado en cuello, manos y otras zonas no tradicionales."),
(16,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/black-out/tatuador4/DALL·E+2025-04-12+20.30.57+-+Blackout+tattoo+in+solid+black+ink+applied+on+rare+body+areas+such+as+the+neck%2C+hands%2C+thighs%2C+calves%2C+abdomen%2C+or+shoulders.+The+design+is+minimalist.webp","🖤 Tatuaje blackout minimalista en zonas atípicas como el abdomen o los hombros, con enfoque en cobertura total."),
(16,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/black-out/tatuador4/DALL·E+2025-04-12+20.42.33+-+Blackout+tattoo+in+solid+black+ink+covering+the+full+leg+in+a+minimalistic+style.+The+tattoo+design+should+feature+deep+black+ink+without+patterns+or+.webp","🖤 Tatuaje blackout que cubre completamente la pierna 🦵 con tinta negra 🖤 uniforme, sin patrones adicionales."),
(16,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/black-out/tatuador4/DALL·E+2025-04-12+20.42.36+-+Blackout+tattoo+design+in+solid+black+ink+covering+a+large+portion+of+the+back.+The+style+is+minimalistic+and+bold%2C+using+deep+black+ink+without+any+p.webp","🖤 Diseño blackout de estilo minimalista que cubre gran parte de la espalda 🖤 con negro profundo y sin ornamentos."),


--realismo
--user 17
(17,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/realismo/tatuador1/70f41ede5296246189fc7c711e04871c.jpg","Retrato realista en blanco y negro - Excelente sombreado y detalles en el rostro"),
(17,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/realismo/tatuador1/ffa2b5ddb2f5bc0a3ee5bcfb7f69e6a6.jpg","Ojo realista con texturas – Profundidad y realismo en el iris y pestañas."),
(17,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/realismo/tatuador1/IMG_7168.jpg","Retrato femenino en brazo – Buena proporción y degradados suaves."),
(17,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/realismo/tatuador1/tattoo-realismo-brazo-leon-1658395609jXpLi.jpeg","León en brazo – Fuerza en los detalles del pelaje y expresión."),
(17,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/realismo/tatuador1/tatuaje-realista-en-brazo-de-mujer.jpg","Retrato de mujer en brazo – Técnica limpia, buen manejo de luces."),
(17,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/realismo/tatuador1/Tatuajes-realismo-brazo-1-768x1024.jpg","Retrato masculino en brazo – Contraste marcado y definición precisa."),
--user 18
(18,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/realismo/tatuador2/ChatGPT+Image+11+abr+2025%2C+07_06_46.png","Tatuaje de IA (rostro futurista) – Diseño conceptual con detalles abstractos."),
(18,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/realismo/tatuador2/Flux_Dev_Ultradetailed_black_and_gray_tattoo_session_armleg_wi_0.jpg","Sesión de tatuaje en brazo/pierna (B&G) – Alto detalle, sombras profundas."),
(18,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/realismo/tatuador2/Flux_Dev_Ultradetailed_black_and_gray_tattoo_session_armleg_wi_1.jpg","Tatuaje de retrato en pierna – Realismo intenso, buen flujo anatómico."),
(18,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/realismo/tatuador2/Flux_Dev_Ultradetailed_black_and_gray_tattoo_session_armleg_wi_2.jpg","Detalle de manga en B&G – Texturas complejas, enfoque en volúmenes."),
(18,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/realismo/tatuador2/Flux_Dev_Ultradetailed_black_and_gray_tattoo_session_armleg_wi_3.jpg","Tatuaje en brazo (efecto 3D) – Ilusión óptica bien lograda."),
(18,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/realismo/tatuador2/ChatGPT+Image+11+abr+2025%2C+07_06_48.png","Tatuaje de geometría y rostro – Fusión de estilos, técnica imaginativa."),
--user 19
(19,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/realismo/tatuador3/6bd939912780fb195b6299dbe1da74d6.jpg","Retrato de mujer con sombrero – Claroscuro efectivo, expresión emotiva."),
(19,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/realismo/tatuador3/8ccd4996fadf247a852de16a5cd3a815.jpg","Ojo realista hiperdetallado – Precision en reflejos y piel."),
(19,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/realismo/tatuador3/54a81606-37fd-46e5-9458-88e2a88c86c1.jpg","Retrato femenino (estilo sketch) – Trazos artísticos, aire boceto."),
(19,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/realismo/tatuador3/coreh-lopez-curso-ojos.max-1000x1000.format-webp.jpg","Curso de ojos (demo) – Enseñanza técnica, buen ejemplo didáctico."),
(19,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/realismo/tatuador3/tatuaje-realismo-black-and-grey-cebaztattoo14.jpg","Tatuaje B&G (rostro y flores) – Equilibrio entre elementos orgánicos y realismo."),
(19,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/realismo/tatuador3/Tatuaje-realista-de-mujer-970x1024.jpeg.jpg","Retrato femenino (perfil) – Elegancia en el sombreado y líneas."),
--user 20
(20,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/realismo/tatuador4/IMG_7083.jpg","Retrato de hombre (brazo) – Detalles en barba y expresión cruda."),
(20,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/realismo/tatuador4/img_c_62d5c1db95daa.jpg","Retrato en blanco y negro – Contraste alto, estilo clásico."),
(20,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/realismo/tatuador4/Jack-Sparrow-Roma-1-1008x1024.jpg","Jack Sparrow (realismo) – Fidelidad al personaje, texturas en ropa."),
(20,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/realismo/tatuador4/steel-of-doom-tony-black-tattoo-barcelona-realismo-2.jpg","Tatuaje Steel Doom – Estilo épico, metal y sombras dramáticas."),
(20,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/realismo/tatuador4/tattoo-realismo-brazo-leon-1658395461pV8tm.jpg","León rugiendo (brazo) – Dinamismo y detalles en melena."),
(20,"https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/realismo/tatuador4/tatuaje-realismo-black-and-grey-cebaztattoo9.jpg","Retrato B&G (hombre con gorra) – Profundidad en arrugas y mirada.");