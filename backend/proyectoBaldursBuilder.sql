-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-05-2025 a las 23:07:03
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proyectobaldursbuilderv4`
--
CREATE DATABASE IF NOT EXISTS `proyectobaldursbuilder` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `proyectobaldursbuilder`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `accesorios`
--

CREATE TABLE `accesorios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `atributo` varchar(20) NOT NULL,
  `valor` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `accesorios`
--

INSERT INTO `accesorios` (`id`, `nombre`, `atributo`, `valor`) VALUES
(1, 'Brazalete del Rugido Salvaje', 'fuerza', 1),
(2, 'Cinturón del Gigante de Piedra', 'fuerza', 1),
(3, 'Hombreras del Leon Rugiente', 'fuerza', 1),
(4, 'Guante de Poder Dracónico', 'fuerza', 2),
(5, 'Guanteletes del Coloso Ancestral', 'fuerza', 2),
(6, 'Casco del Juramento Inquebrantable', 'fuerza', 2),
(7, 'Anillo de la Sombra Ágil', 'destreza', 1),
(8, 'Capa del Mustelido Escurridizo', 'destreza', 1),
(9, 'Tobillera del Raton Huidizo', 'destreza', 1),
(10, 'Botas del Viento Susurrante', 'destreza', 2),
(11, 'Guantes del Bailarín Galán', 'destreza', 2),
(12, 'Capa del Acróbata Fantasma', 'destreza', 2),
(13, 'Amuleto del Roble Sagrado', 'constitucion', 1),
(14, 'Pulsera del escudo Viviente', 'constitucion', 1),
(15, 'Faja del Corazón de Hierro', 'constitucion', 1),
(16, 'Collar de Esmeralda Vital', 'constitucion', 2),
(17, 'Anillo del Guardián Pétreo', 'constitucion', 2),
(18, 'Medallón de la Vida Eterna', 'constitucion', 2),
(19, 'Sortija del Sabio Olvidado', 'inteligencia', 1),
(20, 'Gema del Gato Curioso', 'inteligencia', 1),
(21, 'Monóculo del Teórico Arcano', 'inteligencia', 1),
(22, 'Tiara de los Arcanos', 'inteligencia', 2),
(23, 'Corona de la Mente Infinita', 'inteligencia', 2),
(24, 'Sombrero del Sabio Alquimista', 'inteligencia', 2),
(25, 'Talismán del Vigía Sereno', 'sabiduria', 1),
(26, 'Brazalete del Guardabosques', 'sabiduria', 1),
(27, 'Colgante del Sabio Errante', 'sabiduria', 1),
(28, 'Símbolo del Equilibrio Lunar', 'sabiduria', 2),
(29, 'Amuleto de la Hoja Verdeterna', 'sabiduria', 2),
(30, 'Anillo del Pastor de Estrellas', 'sabiduria', 2),
(31, 'Collar del Trovador Errante', 'carisma', 1),
(32, 'Pendiente del Corazón Ardiente', 'carisma', 1),
(33, 'Gemelos del Encantador Nocturno', 'carisma', 1),
(34, 'Anillo de la Caracola Armoniosa', 'carisma', 2),
(35, 'Zapatos del Baile Carmesí', 'carisma', 2),
(36, 'Broche del Alma Luminosa', 'carisma', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `armaduras`
--

CREATE TABLE `armaduras` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `defensa` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `armaduras`
--

INSERT INTO `armaduras` (`id`, `nombre`, `defensa`) VALUES
(1, 'Chaqueta de Cuero Viejo', 10),
(2, 'Ropajes Sencillos', 10),
(3, 'Túnica del Ermitaño', 10),
(4, 'Cota de Malla Simple', 11),
(5, 'Armadura de Escamas', 11),
(6, 'Chaleco del Aprendiz', 11),
(7, 'Vestimenta de Arcanista', 12),
(8, 'Túnica de Mago Blanco', 12),
(9, 'Armadura de Placas Ligera', 12),
(10, 'Coraza de Hierro Reforzado', 13),
(11, 'Ropas de Fiesta Encantadas', 13),
(12, 'Malla Rúnica del Centinela', 13),
(13, 'Armadura del Guardián Caído', 14),
(14, 'Peto del Campeón Caído', 14),
(15, 'Cota de Malla Reforzada', 14),
(16, 'Coraza de Luz Estelar', 15),
(17, 'Armadura Sagrada del Sol', 15),
(18, 'Coraza del Último Guardián', 15),
(19, 'Armadura del Héroe Dragón', 16),
(20, 'Túnica del Fénix Renacido', 16),
(21, 'Armadura de Ébano Ancestral', 16);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `armas`
--

CREATE TABLE `armas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `ataque` int(11) DEFAULT 0,
  `atributo` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `armas`
--

INSERT INTO `armas` (`id`, `nombre`, `ataque`, `atributo`) VALUES
(1, 'Hacha Pétrea', 8, 'fuerza'),
(2, 'Espada de Hierro', 8, 'fuerza'),
(3, 'Hacha del Leñador', 10, 'fuerza'),
(4, 'Mandoble del Coloso', 10, 'fuerza'),
(5, 'Mandoble de los Titanes', 12, 'fuerza'),
(6, 'Espada de Acero Negro', 12, 'fuerza'),
(7, 'Guadaña de Luna Roja', 13, 'fuerza'),
(8, 'Dagas Oxidadas', 8, 'destreza'),
(9, 'Arco de Roble Antiguo', 8, 'destreza'),
(10, 'Ballesta Puercoespín Venenoso', 10, 'destreza'),
(11, 'Dagas del Susurro', 10, 'destreza'),
(12, 'Arco del Ciervo Blanco', 12, 'destreza'),
(13, 'Estilete del Silencio', 12, 'destreza'),
(14, 'Garras de Sombra', 13, 'destreza'),
(15, 'Porra de Roble Antiguo', 8, 'constitucion'),
(16, 'Maza de Hierro', 8, 'constitucion'),
(17, 'Porra Tribal Endurecida', 10, 'constitucion'),
(18, 'Martillo del Guardián', 10, 'constitucion'),
(19, 'Maza de la Nécora Gargantuesca', 12, 'constitucion'),
(20, 'Martillo del Gigante', 12, 'constitucion'),
(21, 'Gran Escudo Devorador', 13, 'constitucion'),
(22, 'Bastón de Roble Antiguo', 8, 'inteligencia'),
(23, 'Orbe Arcano', 8, 'inteligencia'),
(24, 'Grimorio de Alquimista', 10, 'inteligencia'),
(25, 'Bastón del Conocimiento', 10, 'inteligencia'),
(26, 'Orbe de Sabiduría Prohibida', 12, 'inteligencia'),
(27, 'Grimorio Etéreo', 12, 'inteligencia'),
(28, 'Revolver Rúnico Multiusos', 13, 'inteligencia'),
(29, 'Cetro del oráculo', 8, 'sabiduria'),
(30, 'Escrituras del Pastor', 8, 'sabiduria'),
(31, 'Báculo del equilibrio eterno', 10, 'sabiduria'),
(32, 'Cetro del Juicio', 10, 'sabiduria'),
(33, 'Báculo de la Verdad', 12, 'sabiduria'),
(34, 'Escrituras Divinas', 12, 'sabiduria'),
(35, 'Baraja de la Tarotista', 13, 'sabiduria'),
(36, 'Espada encantada de palabras', 8, 'carisma'),
(37, 'Lira Encantada', 8, 'carisma'),
(38, 'Cristal del Encantador', 10, 'carisma'),
(39, 'Cadenas de Brujo', 10, 'carisma'),
(40, 'Lira de la Sirena', 12, 'carisma'),
(41, 'Espada y Escudo Celestiales', 12, 'carisma'),
(42, 'Drones Armónicos', 13, 'carisma');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `builds`
--

CREATE TABLE `builds` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `nombre_pj` varchar(50) NOT NULL,
  `raza_id` int(11) DEFAULT NULL,
  `clase_id` int(11) DEFAULT NULL,
  `historia` text NOT NULL,
  `fuerza` int(11) DEFAULT 8,
  `destreza` int(11) DEFAULT 8,
  `constitucion` int(11) DEFAULT 8,
  `inteligencia` int(11) DEFAULT 8,
  `sabiduria` int(11) DEFAULT 8,
  `carisma` int(11) DEFAULT 8,
  `bonus1` varchar(20) DEFAULT NULL,
  `bonus2` varchar(20) DEFAULT NULL,
  `arma` int(11) DEFAULT NULL,
  `armadura` int(11) DEFAULT NULL,
  `accesorio1` int(11) DEFAULT NULL,
  `accesorio2` int(11) DEFAULT NULL,
  `imagen` int(1) NOT NULL DEFAULT 0,
  `publica` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `builds`
--

INSERT INTO `builds` (`id`, `user_id`, `nombre`, `nombre_pj`, `raza_id`, `clase_id`, `historia`, `fuerza`, `destreza`, `constitucion`, `inteligencia`, `sabiduria`, `carisma`, `bonus1`, `bonus2`, `arma`, `armadura`, `accesorio1`, `accesorio2`, `imagen`, `publica`) VALUES
(1, 1, 'El rugido de la tormenta', 'Tharok Puño de Trueno', 10, 1, 'Un bárbaro draconido exiliado, que busca redención en las batallas del norte.', 15, 14, 14, 9, 9, 10, 'fuerza', 'constitucion', 3, 5, 4, 16, 0, 1),
(2, 1, 'Susurros de sombras', 'Velmira Sombrafina', 4, 12, 'Una pícaro drow que aprendió a sobrevivir entre intrigas y traiciones.', 10, 15, 12, 14, 8, 13, 'destreza', 'inteligencia', 10, 2, 12, 10, 0, 0),
(3, 1, 'Canción de la luna', 'Elarion Brisaveloz', 1, 2, 'Bardo elfo viajero que canta sobre tierras olvidadas y misterios antiguos.', 9, 14, 12, 11, 11, 15, 'carisma', 'destreza', 32, 11, 32, 31, 0, 0),
(4, 1, 'Juramento de ceniza', 'Darmik Martillo de Fuego', 2, 11, 'Paladín enano que perdió su orden, y ahora impone justicia con puño firme.', 15, 11, 13, 9, 10, 14, 'fuerza', 'carisma', 16, 15, 17, 15, 0, 0),
(5, 1, 'Furia natural', 'Kaela Ramaoscura', 9, 5, 'Druida semielfa conectada con la ira ancestral del bosque.', 9, 13, 15, 10, 15, 9, 'sabiduria', 'constitucion', 27, 3, 13, 29, 0, 1),
(6, 2, 'Llama interior', 'Zarek Corazón Ardiente', 3, 8, 'Hechicero tiefling perseguido por su propio linaje demoníaco.', 12, 14, 14, 15, 8, 8, 'inteligencia', 'constitucion', 22, 7, 19, 20, 0, 1),
(7, 2, 'Filo del viento', 'Nyssa Caminavientos', 11, 6, 'Exploradora tabaxi veloz como el relámpago, guardiana de rutas perdidas.', 9, 15, 14, 10, 14, 9, 'destreza', 'sabiduria', 9, 9, 10, 1, 0, 0),
(8, 2, 'Vínculo celestial', 'Lioren Luz Serena', 5, 4, 'Clérigo humano devoto de un dios olvidado, guía de almas perdidas.', 8, 10, 14, 10, 15, 14, 'sabiduria', 'carisma', 26, 17, 18, 19, 1, 1),
(9, 2, 'Rey de las Setas', 'Diego Seta Micelio', 6, 5, 'Un gnomo con una poderosa conexión con las setas pudiendo erradicar reinos con su poder.', 9, 15, 14, 10, 14, 9, 'destreza', 'sabiduria', 27, 18, 25, 26, 0, 1),
(10, 2, 'Perro Rabioso', 'Lupo el Pulgoso', 8, 1, 'Un licántropo de bajo estatus que está obsesionado con la pelea', 14, 15, 14, 10, 9, 9, 'destreza', 'fuerza', 3, 14, 25, 26, 0, 1),
(11, 3, 'Canción de la Ventisca', 'Beatt Lynxel', 11, 2, 'Un legendario tabaxi demasiado perezoso para ir de aventuras pero que mantendrá seguro su lugar de descanso ante cualquier amenaza con una ventisca capaz de congelar el mismisimo infierno.', 9, 14, 12, 11, 11, 15, 'carisma', 'destreza', 42, 11, 36, 35, 1, 1),
(12, 3, 'Garra de Sombras', 'Chartreus Dakar', 8, 12, 'Licántropo infernal con dominio sobre las sombras, hará lo que sea para proteger a los suyos.', 12, 14, 15, 11, 11, 9, 'constitucion', 'destreza', 14, 18, 12, 11, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clases`
--

CREATE TABLE `clases` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `clases`
--

INSERT INTO `clases` (`id`, `nombre`) VALUES
(1, 'Bárbaro'),
(2, 'Bardo'),
(3, 'Brujo'),
(4, 'Clérigo'),
(5, 'Druida'),
(6, 'Explorador'),
(7, 'Guerrero'),
(8, 'Hechicero'),
(9, 'Mago'),
(10, 'Monje'),
(11, 'Paladín'),
(12, 'Pícaro');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `enemigos`
--

CREATE TABLE `enemigos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `vida` int(11) NOT NULL,
  `defensa` int(11) NOT NULL,
  `ataque` int(11) NOT NULL,
  `bonificador` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `enemigos`
--

INSERT INTO `enemigos` (`id`, `nombre`, `vida`, `defensa`, `ataque`, `bonificador`) VALUES
(1, 'Goblin Saqueador', 16, 10, 7, 1),
(2, 'Jabalí Furioso', 30, 10, 5, 0),
(3, 'Araña Terrible', 20, 11, 6, 2),
(4, 'Ghoul Errante', 24, 11, 6, 1),
(5, 'Esqueleto Guerrero', 26, 13, 5, 1),
(6, 'Sombra Espectral', 32, 13, 7, 3),
(7, 'Orco Bruto Viejo', 43, 12, 8, 1),
(8, 'Gnoll Despiadado', 38, 11, 9, 2),
(9, 'Ogro del Pantano', 54, 11, 7, 0),
(10, 'Espíritu Vengativo', 32, 12, 9, 3),
(11, 'Troll de Montaña', 72, 13, 10, 1),
(12, 'Armadura Encantada', 60, 16, 8, 2),
(13, 'Caballero Negro', 58, 14, 10, 3),
(14, 'Mimic Gargantuesco', 50, 13, 12, 3),
(15, 'Guardián del Templo', 88, 15, 9, 2),
(16, 'Quimera Furiosa', 80, 13, 12, 3),
(17, 'Hidra de Pantano', 110, 16, 10, 2),
(18, 'Dragón Rojo Joven', 100, 16, 12, 3),
(19, 'Behir Devorador', 130, 15, 10, 2),
(20, 'Demonio Mayor', 66, 18, 11, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `razas`
--

CREATE TABLE `razas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `razas`
--

INSERT INTO `razas` (`id`, `nombre`) VALUES
(1, 'Elfo'),
(2, 'Enano'),
(3, 'Tiefling'),
(4, 'Drow'),
(5, 'Humano'),
(6, 'Gnomo'),
(7, 'Mediano'),
(8, 'Licántropo'),
(9, 'Semielfo'),
(10, 'Draconido'),
(11, 'Tabaxi');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `nombre`) VALUES
(1, 'usuario'),
(2, 'administrador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `rol` int(11) NOT NULL,
  `activo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `email`, `password`, `rol`, `activo`) VALUES
(1, 'testadmin@email.com', '$2b$10$TtM.E4eGEOuTjJdIEXQ4weFph/s8Vclls48jDjlulyVL7yFl6VzK2', 2, 1),
(2, 'testuser@email.com', '$2b$10$/slfJbCPZBMcouMWHrpSGuY8QVbU7nC8Hz6kM9IdmsReTYxlYGNLy', 1, 1),
(3, 'beatt@gmail.es', '$2b$10$l.kC18/VK.2Pz8pWFdM90uU7wkbBd6TO3xkY5HmgTnihYkYSmU4Uq', 2, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `accesorios`
--
ALTER TABLE `accesorios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `armaduras`
--
ALTER TABLE `armaduras`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `armas`
--
ALTER TABLE `armas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `builds`
--
ALTER TABLE `builds`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `raza_id` (`raza_id`),
  ADD KEY `clase_id` (`clase_id`),
  ADD KEY `arma` (`arma`),
  ADD KEY `armadura` (`armadura`),
  ADD KEY `accesorio1` (`accesorio1`),
  ADD KEY `accesorio2` (`accesorio2`);

--
-- Indices de la tabla `clases`
--
ALTER TABLE `clases`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `enemigos`
--
ALTER TABLE `enemigos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `razas`
--
ALTER TABLE `razas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `rol` (`rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `accesorios`
--
ALTER TABLE `accesorios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT de la tabla `armaduras`
--
ALTER TABLE `armaduras`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `armas`
--
ALTER TABLE `armas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT de la tabla `builds`
--
ALTER TABLE `builds`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `clases`
--
ALTER TABLE `clases`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `enemigos`
--
ALTER TABLE `enemigos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `razas`
--
ALTER TABLE `razas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `builds`
--
ALTER TABLE `builds`
  ADD CONSTRAINT `builds_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `builds_ibfk_2` FOREIGN KEY (`raza_id`) REFERENCES `razas` (`id`),
  ADD CONSTRAINT `builds_ibfk_3` FOREIGN KEY (`clase_id`) REFERENCES `clases` (`id`),
  ADD CONSTRAINT `builds_ibfk_4` FOREIGN KEY (`arma`) REFERENCES `armas` (`id`),
  ADD CONSTRAINT `builds_ibfk_5` FOREIGN KEY (`armadura`) REFERENCES `armaduras` (`id`),
  ADD CONSTRAINT `builds_ibfk_6` FOREIGN KEY (`accesorio1`) REFERENCES `accesorios` (`id`),
  ADD CONSTRAINT `builds_ibfk_7` FOREIGN KEY (`accesorio2`) REFERENCES `accesorios` (`id`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`rol`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;