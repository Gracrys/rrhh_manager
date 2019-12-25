-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-12-2019 a las 01:50:01
-- Versión del servidor: 10.4.8-MariaDB
-- Versión de PHP: 7.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `rrhh`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `docs`
--

CREATE TABLE `docs` (
  `id` int(11) NOT NULL,
  `creation_date` date DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `task` int(9) DEFAULT NULL,
  `file` varchar(120) DEFAULT NULL,
  `description` varchar(120) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `docs`
--

INSERT INTO `docs` (`id`, `creation_date`, `type`, `task`, `file`, `description`) VALUES
(1, '2019-12-24', 'image/png', 1, '481510_music-waves-png.png-1577212787782.png', 'documento');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `employee`
--

CREATE TABLE `employee` (
  `id` int(3) NOT NULL,
  `CI` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `lastname` varchar(20) NOT NULL,
  `address` varchar(60) DEFAULT NULL,
  `telephone` varchar(15) DEFAULT NULL,
  `email` varchar(30) NOT NULL,
  `initial_date` date DEFAULT NULL,
  `speciality` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `employee`
--

INSERT INTO `employee` (`id`, `CI`, `name`, `lastname`, `address`, `telephone`, `email`, `initial_date`, `speciality`) VALUES
(1, 25953968, 'myname', 'my lastname', 'my address', '112223344', 'a@a.c', '0000-00-00', NULL),

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyects`
--

CREATE TABLE `proyects` (
  `keyname` varchar(5) NOT NULL,
  `denominacion` varchar(20) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `finish_date` date DEFAULT NULL,
  `status` int(1) DEFAULT NULL,
  `employees_id` varchar(30) DEFAULT NULL,
  `promotor_id` int(11) DEFAULT NULL,
  `description` varchar(120) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `proyects`
--

INSERT INTO `proyects` (`keyname`, `denominacion`, `start_date`, `finish_date`, `status`, `employees_id`, `promotor_id`, `description`) VALUES
('123', '1231', '2019-12-12', '2019-12-03', 1, '12', 14, NULL),
('1231', '12312', '0000-00-00', '0000-00-00', 1, '11', 11, NULL),

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tasks`
--

CREATE TABLE `tasks` (
  `id` int(9) NOT NULL,
  `created_at` date DEFAULT NULL,
  `due_date` date DEFAULT NULL,
  `title` varchar(30) NOT NULL,
  `proyect` varchar(9) NOT NULL,
  `description` mediumtext DEFAULT NULL,
  `asignee` varchar(30) DEFAULT NULL,
  `status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tasks`
--

INSERT INTO `tasks` (`id`, `created_at`, `due_date`, `title`, `proyect`, `description`, `asignee`, `status`) VALUES
(1, '2019-12-15', '2019-12-26', 'mi descripcion', '123', '234234', '16', 3),
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(3) NOT NULL,
  `username` varchar(50) NOT NULL,
  `pass` char(60) DEFAULT NULL,
  `secret_key` varchar(20) DEFAULT NULL,
  `user_type` int(1) DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `username`, `pass`, `secret_key`, `user_type`, `employee_id`) VALUES
(1, 'admin', '123456', 'moody toxicroak', 1, NULL),
(4, 'admin', '123456', 'moody toxicroak', 1, NULL),
(5, 'admin', '123456', 'moody toxicroak', 1, NULL),
(6, 'admin', '123456', 'moody toxicroak', 1, NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `docs`
--
ALTER TABLE `docs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `task` (`task`);

--
-- Indices de la tabla `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `proyects`
--
ALTER TABLE `proyects`
  ADD PRIMARY KEY (`keyname`),
  ADD KEY `promotor_id` (`promotor_id`);

--
-- Indices de la tabla `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `proyect` (`proyect`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employee_id` (`employee_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `docs`
--
ALTER TABLE `docs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `employee`
--
ALTER TABLE `employee`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `docs`
--
ALTER TABLE `docs`
  ADD CONSTRAINT `docs_ibfk_1` FOREIGN KEY (`task`) REFERENCES `tasks` (`id`);

--
-- Filtros para la tabla `proyects`
--
ALTER TABLE `proyects`
  ADD CONSTRAINT `proyects_ibfk_1` FOREIGN KEY (`promotor_id`) REFERENCES `employee` (`id`);

--
-- Filtros para la tabla `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`proyect`) REFERENCES `proyects` (`keyname`);

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
