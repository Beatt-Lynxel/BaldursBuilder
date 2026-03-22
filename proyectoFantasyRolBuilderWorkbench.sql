CREATE DATABASE  IF NOT EXISTS "fantasyrolbuilder" /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `fantasyrolbuilder`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: fantasyrolbuilder-eloynesspoke.c.aivencloud.com    Database: fantasyrolbuilder
-- ------------------------------------------------------
-- Server version	8.0.45

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ 'd6d45f77-2624-11f1-87b8-a622933c7012:1-58';

--
-- Table structure for table `accesorios`
--

DROP TABLE IF EXISTS `accesorios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accesorios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `atributo` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `valor` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accesorios`
--

LOCK TABLES `accesorios` WRITE;
/*!40000 ALTER TABLE `accesorios` DISABLE KEYS */;
INSERT INTO `accesorios` VALUES (1,'Brazalete del Rugido Salvaje','fuerza',1),(2,'Cinturón del Gigante de Piedra','fuerza',1),(3,'Hombreras del Leon Rugiente','fuerza',1),(4,'Guante de Poder Dracónico','fuerza',2),(5,'Guanteletes del Coloso Ancestral','fuerza',2),(6,'Casco del Juramento Inquebrantable','fuerza',2),(7,'Anillo de la Sombra Ágil','destreza',1),(8,'Capa del Mustelido Escurridizo','destreza',1),(9,'Tobillera del Raton Huidizo','destreza',1),(10,'Botas del Viento Susurrante','destreza',2),(11,'Guantes del Bailarín Galán','destreza',2),(12,'Capa del Acróbata Fantasma','destreza',2),(13,'Amuleto del Roble Sagrado','constitucion',1),(14,'Pulsera del escudo Viviente','constitucion',1),(15,'Faja del Corazón de Hierro','constitucion',1),(16,'Collar de Esmeralda Vital','constitucion',2),(17,'Anillo del Guardián Pétreo','constitucion',2),(18,'Medallón de la Vida Eterna','constitucion',2),(19,'Sortija del Sabio Olvidado','inteligencia',1),(20,'Gema del Gato Curioso','inteligencia',1),(21,'Monóculo del Teórico Arcano','inteligencia',1),(22,'Tiara de los Arcanos','inteligencia',2),(23,'Corona de la Mente Infinita','inteligencia',2),(24,'Sombrero del Sabio Alquimista','inteligencia',2),(25,'Talismán del Vigía Sereno','sabiduria',1),(26,'Brazalete del Guardabosques','sabiduria',1),(27,'Colgante del Sabio Errante','sabiduria',1),(28,'Símbolo del Equilibrio Lunar','sabiduria',2),(29,'Amuleto de la Hoja Verdeterna','sabiduria',2),(30,'Anillo del Pastor de Estrellas','sabiduria',2),(31,'Collar del Trovador Errante','carisma',1),(32,'Pendiente del Corazón Ardiente','carisma',1),(33,'Gemelos del Encantador Nocturno','carisma',1),(34,'Anillo de la Caracola Armoniosa','carisma',2),(35,'Zapatos del Baile Carmesí','carisma',2),(36,'Broche del Alma Luminosa','carisma',2);
/*!40000 ALTER TABLE `accesorios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `armaduras`
--

DROP TABLE IF EXISTS `armaduras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `armaduras` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `defensa` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `armaduras`
--

LOCK TABLES `armaduras` WRITE;
/*!40000 ALTER TABLE `armaduras` DISABLE KEYS */;
INSERT INTO `armaduras` VALUES (1,'Chaqueta de Cuero Viejo',10),(2,'Ropajes Sencillos',10),(3,'Túnica del Ermitaño',10),(4,'Cota de Malla Simple',11),(5,'Armadura de Escamas',11),(6,'Chaleco del Aprendiz',11),(7,'Vestimenta de Arcanista',12),(8,'Túnica de Mago Blanco',12),(9,'Armadura de Placas Ligera',12),(10,'Coraza de Hierro Reforzado',13),(11,'Ropas de Fiesta Encantadas',13),(12,'Malla Rúnica del Centinela',13),(13,'Armadura del Guardián Caído',14),(14,'Peto del Campeón Caído',14),(15,'Cota de Malla Reforzada',14),(16,'Coraza de Luz Estelar',15),(17,'Armadura Sagrada del Sol',15),(18,'Coraza del Último Guardián',15),(19,'Armadura del Héroe Dragón',16),(20,'Túnica del Fénix Renacido',16),(21,'Armadura de Ébano Ancestral',16);
/*!40000 ALTER TABLE `armaduras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `armas`
--

DROP TABLE IF EXISTS `armas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `armas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `ataque` int DEFAULT '0',
  `atributo` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `armas`
--

LOCK TABLES `armas` WRITE;
/*!40000 ALTER TABLE `armas` DISABLE KEYS */;
INSERT INTO `armas` VALUES (1,'Hacha Pétrea',8,'fuerza'),(2,'Espada de Hierro',8,'fuerza'),(3,'Hacha del Leñador',10,'fuerza'),(4,'Mandoble del Coloso',10,'fuerza'),(5,'Mandoble de los Titanes',12,'fuerza'),(6,'Espada de Acero Negro',12,'fuerza'),(7,'Guadaña de Luna Roja',13,'fuerza'),(8,'Dagas Oxidadas',8,'destreza'),(9,'Arco de Roble Antiguo',8,'destreza'),(10,'Ballesta Puercoespín Venenoso',10,'destreza'),(11,'Dagas del Susurro',10,'destreza'),(12,'Arco del Ciervo Blanco',12,'destreza'),(13,'Estilete del Silencio',12,'destreza'),(14,'Garras de Sombra',13,'destreza'),(15,'Porra de Roble Antiguo',8,'constitucion'),(16,'Maza de Hierro',8,'constitucion'),(17,'Porra Tribal Endurecida',10,'constitucion'),(18,'Martillo del Guardián',10,'constitucion'),(19,'Maza de la Nécora Gargantuesca',12,'constitucion'),(20,'Martillo del Gigante',12,'constitucion'),(21,'Gran Escudo Devorador',13,'constitucion'),(22,'Bastón de Roble Antiguo',8,'inteligencia'),(23,'Orbe Arcano',8,'inteligencia'),(24,'Grimorio de Alquimista',10,'inteligencia'),(25,'Bastón del Conocimiento',10,'inteligencia'),(26,'Orbe de Sabiduría Prohibida',12,'inteligencia'),(27,'Grimorio Etéreo',12,'inteligencia'),(28,'Revolver Rúnico Multiusos',13,'inteligencia'),(29,'Cetro del oráculo',8,'sabiduria'),(30,'Escrituras del Pastor',8,'sabiduria'),(31,'Báculo del equilibrio eterno',10,'sabiduria'),(32,'Cetro del Juicio',10,'sabiduria'),(33,'Báculo de la Verdad',12,'sabiduria'),(34,'Escrituras Divinas',12,'sabiduria'),(35,'Baraja de la Tarotista',13,'sabiduria'),(36,'Espada encantada de palabras',8,'carisma'),(37,'Lira Encantada',8,'carisma'),(38,'Cristal del Encantador',10,'carisma'),(39,'Cadenas de Brujo',10,'carisma'),(40,'Lira de la Sirena',12,'carisma'),(41,'Espada y Escudo Celestiales',12,'carisma'),(42,'Drones Armónicos',13,'carisma');
/*!40000 ALTER TABLE `armas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `builds`
--

DROP TABLE IF EXISTS `builds`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `builds` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `nombre` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `nombre_pj` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `raza_id` int DEFAULT NULL,
  `clase_id` int DEFAULT NULL,
  `historia` text COLLATE utf8mb4_general_ci NOT NULL,
  `fuerza` int DEFAULT '8',
  `destreza` int DEFAULT '8',
  `constitucion` int DEFAULT '8',
  `inteligencia` int DEFAULT '8',
  `sabiduria` int DEFAULT '8',
  `carisma` int DEFAULT '8',
  `bonus1` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `bonus2` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `arma` int DEFAULT NULL,
  `armadura` int DEFAULT NULL,
  `accesorio1` int DEFAULT NULL,
  `accesorio2` int DEFAULT NULL,
  `imagen` int NOT NULL DEFAULT '0',
  `publica` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `raza_id` (`raza_id`),
  KEY `clase_id` (`clase_id`),
  KEY `arma` (`arma`),
  KEY `armadura` (`armadura`),
  KEY `accesorio1` (`accesorio1`),
  KEY `accesorio2` (`accesorio2`),
  CONSTRAINT `builds_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  CONSTRAINT `builds_ibfk_2` FOREIGN KEY (`raza_id`) REFERENCES `razas` (`id`),
  CONSTRAINT `builds_ibfk_3` FOREIGN KEY (`clase_id`) REFERENCES `clases` (`id`),
  CONSTRAINT `builds_ibfk_4` FOREIGN KEY (`arma`) REFERENCES `armas` (`id`),
  CONSTRAINT `builds_ibfk_5` FOREIGN KEY (`armadura`) REFERENCES `armaduras` (`id`),
  CONSTRAINT `builds_ibfk_6` FOREIGN KEY (`accesorio1`) REFERENCES `accesorios` (`id`),
  CONSTRAINT `builds_ibfk_7` FOREIGN KEY (`accesorio2`) REFERENCES `accesorios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `builds`
--

LOCK TABLES `builds` WRITE;
/*!40000 ALTER TABLE `builds` DISABLE KEYS */;
INSERT INTO `builds` VALUES (1,1,'Baladas del Alba','Edrin Cantares',1,2,'Bardo humano de tabernas y caminos reales, convierte historias comunes en himnos inolvidables y anima a sus aliados con melodías antiguas.',8,10,12,10,12,15,'carisma','sabiduria',37,11,31,34,0,1),(2,1,'Juramento de Hierro','Brokk Martilloalba',2,11,'Paladín enano que juró proteger fortalezas sagradas y peregrinos de montaña, firme como la roca y severo con los impíos.',14,8,14,8,12,12,'fuerza','constitucion',2,17,6,17,0,1),(3,1,'Sendero del Ciervo','Faelar Brisaverde',3,6,'Explorador elfo criado entre bosques antiguos, rastrea bestias y bandidos con paciencia sobrenatural y una puntería impecable.',8,15,11,10,14,10,'destreza','sabiduria',12,12,10,29,0,1),(4,2,'Sombra de Terciopelo','Nyra Zarpaluna',4,12,'Pícara felinix de callejones brillantes y tejados húmedos, roba secretos mejor que oro y desaparece antes de ser mirada dos veces.',8,15,10,12,10,12,'destreza','inteligencia',13,1,7,20,0,1),(5,1,'Puño del Camino Sereno','Kael ColmilloManso',5,10,'Monje houndkin errante que perfeccionó cuerpo y mente en monasterios apartados, enfrentando la violencia con disciplina y resistencia.',10,14,14,8,12,10,'destreza','constitucion',18,15,11,16,0,1),(6,2,'Escamas del Saber','Sszira Veloarcano',6,9,'Maga reptilis fascinada por ruinas sumergidas y lenguas muertas, domina fórmulas complejas con una mente fría y meticulosa.',8,10,11,15,12,10,'inteligencia','sabiduria',27,8,22,23,0,1),(7,2,'Raíz y Ceniza','Mira Musgorris',7,5,'Druida rodentia guardiana de madrigueras sagradas y claros ocultos, escucha el pulso de la tierra y convoca la furia suave del bosque.',8,12,12,10,15,10,'sabiduria','constitucion',31,3,28,13,0,1),(8,1,'Furia del Brote Escarlata','Draegor Escamarruja',8,1,'Guerrero draconide veterano de mil duelos, avanza como una muralla viviente y rompe líneas enemigas con brutal precisión.',15,10,14,8,10,8,'fuerza','constitucion',6,18,4,18,0,1),(9,1,'Rugido de la Montaña','Orsik Peñafiera',9,7,'Bárbaro ursin nacido en cumbres heladas, combate con ferocidad ancestral y una resistencia temible forjada por el clima salvaje.',15,10,14,8,10,8,'fuerza','constitucion',5,13,5,16,0,1),(10,2,'Llama del Cielo Errante','Aelia Plumardor',10,8,'Hechicera avian tocada por una magia innata de tormentas y auroras, desata poder puro con elegancia luminosa y presencia imponente.',8,10,12,10,10,15,'carisma','constitucion',40,7,36,15,0,1),(11,2,'Gracia del Firmamento','Serapha Luz de Alba',11,4,'Clériga angel consagrada a sanar, proteger y juzgar con compasión, porta una fe antigua que brilla incluso en la noche más oscura.',8,10,12,10,15,12,'sabiduria','carisma',34,16,30,36,0,1),(12,2,'Pacto de Ceniza','Velka Sombrafina',12,3,'Bruja demonio que selló un pacto con entidades del vacío, manipula voluntades y energías prohibidas con un encanto inquietante.',8,10,12,10,10,15,'carisma','inteligencia',39,7,32,22,0,1),(13,2,'Vínculo celestial','Lioren Luz Serena',5,4,'Clérigo humano devoto de un dios olvidado, guía almas perdidas en campos de batalla abandonados.',8,10,14,10,15,14,'sabiduria','carisma',26,17,18,19,1,1),(14,2,'Drakecuoya','Drake Strong',5,4,'Clérigo humano devoto de un dios olvidado, guía de almas perdidas.',8,10,14,10,15,14,'sabiduria','carisma',26,17,18,19,1,1),(15,3,'Canción de la Ventisca','Beatt Lynxel',11,2,'Un legendario felinix alado demasiado perezoso para ir de aventuras pero que mantendrá seguro su lugar de descanso ante cualquier amenaza con una ventisca capaz de congelar el mismisimo infierno.',9,14,12,11,11,15,'carisma','destreza',42,11,36,35,1,1),(16,3,'Garra de las Sombras','Chartreus Dakar',8,12,'Un misterioso houndkin lobo calavera con dominio sobre las sombras, hará lo que sea para proteger a los suyos, en especial a su amado felino y sus cachorros.',12,14,15,11,11,9,'constitucion','destreza',14,18,12,11,1,1);
/*!40000 ALTER TABLE `builds` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clases`
--

DROP TABLE IF EXISTS `clases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clases` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clases`
--

LOCK TABLES `clases` WRITE;
/*!40000 ALTER TABLE `clases` DISABLE KEYS */;
INSERT INTO `clases` VALUES (1,'Guerrero'),(2,'Bardo'),(3,'Brujo'),(4,'Clérigo'),(5,'Druida'),(6,'Explorador'),(7,'Bárbaro'),(8,'Hechicero'),(9,'Mago'),(10,'Monje'),(11,'Paladín'),(12,'Pícaro');
/*!40000 ALTER TABLE `clases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enemigos`
--

DROP TABLE IF EXISTS `enemigos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enemigos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `vida` int NOT NULL,
  `defensa` int NOT NULL,
  `ataque` int NOT NULL,
  `bonificador` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enemigos`
--

LOCK TABLES `enemigos` WRITE;
/*!40000 ALTER TABLE `enemigos` DISABLE KEYS */;
INSERT INTO `enemigos` VALUES (1,'Goblin Saqueador',16,10,7,1),(2,'Jabalí Furioso',30,10,5,0),(3,'Araña Terrible',20,11,6,2),(4,'Ghoul Errante',24,11,6,1),(5,'Esqueleto Guerrero',26,13,5,1),(6,'Sombra Espectral',32,13,7,3),(7,'Orco Bruto Viejo',43,12,8,1),(8,'Gnoll Despiadado',38,11,9,2),(9,'Ogro del Pantano',54,11,7,0),(10,'Espíritu Vengativo',32,12,9,3),(11,'Troll de Montaña',72,13,10,1),(12,'Armadura Encantada',60,16,8,2),(13,'Caballero Negro',58,14,10,3),(14,'Mimic Gargantuesco',50,13,12,3),(15,'Guardián del Templo',88,15,9,2),(16,'Quimera Furiosa',80,13,12,3),(17,'Hidra de Pantano',110,16,10,2),(18,'Dragón Rojo Joven',100,16,12,3),(19,'Behir Devorador',130,15,10,2),(20,'Demonio Mayor',66,18,11,5);
/*!40000 ALTER TABLE `enemigos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `razas`
--

DROP TABLE IF EXISTS `razas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `razas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `razas`
--

LOCK TABLES `razas` WRITE;
/*!40000 ALTER TABLE `razas` DISABLE KEYS */;
INSERT INTO `razas` VALUES (1,'Humano'),(2,'Enano'),(3,'Elfo'),(4,'Felinix'),(5,'Houndkin'),(6,'Reptilis'),(7,'Rodentia'),(8,'Draconide'),(9,'Ursin'),(10,'Avian'),(11,'Angel'),(12,'Demonio');
/*!40000 ALTER TABLE `razas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'usuario'),(2,'administrador');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `rol` int NOT NULL,
  `activo` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `rol` (`rol`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`rol`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'testadmin@email.com','$2b$10$TtM.E4eGEOuTjJdIEXQ4weFph/s8Vclls48jDjlulyVL7yFl6VzK2',2,1),(2,'testuser@email.com','$2b$10$/slfJbCPZBMcouMWHrpSGuY8QVbU7nC8Hz6kM9IdmsReTYxlYGNLy',1,1),(3,'beatt@gmail.es','$2b$10$l.kC18/VK.2Pz8pWFdM90uU7wkbBd6TO3xkY5HmgTnihYkYSmU4Uq',2,1);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-22 20:56:28
