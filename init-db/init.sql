
-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 06, 2023 at 04:36 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kinclean`
--

-- --------------------------------------------------------

--
-- Table structure for table `food`
--

CREATE TABLE `food` (
  `FoodID` int(11) NOT NULL,
  `FoodName` varchar(255) NOT NULL,
  `FoodPrice` int(11) NOT NULL,
  `FoodTypeID` int(11) NOT NULL,
  `FoodPic` varchar(255) DEFAULT NULL,
  `FoodSig` char(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `food`
--

INSERT INTO `food` (`FoodID`, `FoodName`, `FoodPrice`, `FoodTypeID`, `FoodPic`, `FoodSig`) VALUES
(1, 'โรลผัก 5 สี แซลมอนกุ้ง', 79, 1, 'https://www.ohkajhuorganic.com/wp-content/uploads/2021/09/Untitled-1-25-300x300.png', 'N'),
(2, 'ขนมปังกระเทียม', 69, 1, 'https://www.ohkajhuorganic.com/wp-content/uploads/2021/09/Untitled-1-23-300x300.png', 'N'),
(3, 'ขนมปังกระเทียมครีมชีสยีสธรรมชาติ', 79, 1, 'https://www.ohkajhuorganic.com/wp-content/uploads/2021/09/Untitled-1-28-300x300.png', 'Y'),
(4, 'ซุปข้าวโพด แครอท', 129, 1, 'https://www.ohkajhuorganic.com/wp-content/uploads/2021/09/Untitled-1-30-300x300.png', 'N'),
(5, 'สลัดเห็ดรวมกุ้งย่าง', 159, 2, 'https://www.ohkajhuorganic.com/wp-content/uploads/2021/09/Untitled-1-15-300x300.png', 'Y'),
(6, 'สลัดแซลมอนย่าง', 169, 2, 'https://www.ohkajhuorganic.com/wp-content/uploads/2021/09/Untitled-1-04-300x300.png', 'N'),
(7, 'สลัดธัญพืช', 139, 2, 'https://www.ohkajhuorganic.com/wp-content/uploads/2021/09/Untitled-1-12-300x300.png', 'N'),
(8, 'สลัดทูน่ายำแซ่บ', 99, 2, 'https://www.ohkajhuorganic.com/wp-content/uploads/2021/09/Untitled-1-40-300x300.png', 'N'),
(9, 'เม็กซิกัน นาโช่', 149, 2, 'https://www.ohkajhuorganic.com/wp-content/uploads/2021/09/Untitled-1-03-300x300.png', 'N'),
(10, 'สลัดเห็ดเทมปุระ', 99, 2, 'https://www.ohkajhuorganic.com/wp-content/uploads/2021/09/300x300-43-300x300.png', 'N'),
(11, 'ฟิช แอนด์ ชิพส์', 99, 3, 'https://www.ohkajhuorganic.com/wp-content/uploads/2021/09/Untitled-1-38-300x300.png', 'Y'),
(12, 'สเต็กซี่โครงสะพานโค้ง', 189, 3, 'https://www.ohkajhuorganic.com/wp-content/uploads/2021/09/Untitled-1-01-300x300.png', 'Y'),
(13, 'เลดี้ ริบส์ โอ้กะจู๋', 189, 3, 'https://www.ohkajhuorganic.com/wp-content/uploads/2021/09/Untitled-1-17-300x300.png', 'Y'),
(14, 'พอร์คชอป เฟรนช์คัท', 179, 3, 'https://www.ohkajhuorganic.com/wp-content/uploads/2021/09/Untitled-1-37-300x300.png', 'N'),
(15, 'สเต็กไก่ย่าง ซอสพริกไทยดำไวน์แดง', 169, 3, 'https://www.ohkajhuorganic.com/wp-content/uploads/2021/09/300x300-44-300x300.png', 'N'),
(16, 'สเต็กปลาแซลมอนซอสบีทรูทธัญพืช', 189, 3, 'https://www.ohkajhuorganic.com/wp-content/uploads/2021/09/Untitled-1-35-300x300.png', 'N'),
(17, 'สปาเกตตี้ปูนิ่มพริกเกลือ', 139, 4, 'https://www.ohkajhuorganic.com/wp-content/uploads/2021/09/Untitled-1-20-300x300.png', 'Y'),
(18, 'สปาเก็ตตี้ต้มยำปูกุ้ง', 149, 4, 'https://www.ohkajhuorganic.com/wp-content/uploads/2021/09/300x300-47-300x300.png', 'N'),
(19, 'แองเจิ้ลแฮร์เห็ดรวมครีมทรัฟเฟิล', 139, 4, 'https://www.ohkajhuorganic.com/wp-content/uploads/2021/09/300x300-46-300x300.png', 'Y');

-- --------------------------------------------------------

--
-- Table structure for table `foodtype`
--

CREATE TABLE `foodtype` (
  `FoodTypeID` int(11) NOT NULL,
  `FoodTypeName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `foodtype`
--

INSERT INTO `foodtype` (`FoodTypeID`, `FoodTypeName`) VALUES
(1, 'APPETIZER'),
(2, 'ORGANIC'),
(3, 'STEAK'),
(4, 'SPAGETTI');

-- --------------------------------------------------------

--
-- Table structure for table `orderlist`
--

CREATE TABLE `orderlist` (
  `Seq` int(11) NOT NULL,
  `RecptNo` int(11) NOT NULL,
  `FoodID` int(11) NOT NULL,
  `Qty` int(11) NOT NULL,
  `Amount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `receipt`
--

CREATE TABLE `receipt` (
  `RecptNo` int(11) NOT NULL,
  `TableNo` int(11) DEFAULT NULL,
  `RecptDate` date NOT NULL,
  `TotalAmt` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `food`
--
ALTER TABLE `food`
  ADD PRIMARY KEY (`FoodID`),
  ADD KEY `FoodTypeID` (`FoodTypeID`);

--
-- Indexes for table `foodtype`
--
ALTER TABLE `foodtype`
  ADD PRIMARY KEY (`FoodTypeID`);

--
-- Indexes for table `orderlist`
--
ALTER TABLE `orderlist`
  ADD PRIMARY KEY (`Seq`,`RecptNo`),
  ADD KEY `FoodID` (`FoodID`);

--
-- Indexes for table `receipt`
--
ALTER TABLE `receipt`
  ADD PRIMARY KEY (`RecptNo`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `food`
--
ALTER TABLE `food`
  MODIFY `FoodID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `foodtype`
--
ALTER TABLE `foodtype`
  MODIFY `FoodTypeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `receipt`
--
ALTER TABLE `receipt`
  MODIFY `RecptNo` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `food`
--
ALTER TABLE `food`
  ADD CONSTRAINT `Fk_FoodType` FOREIGN KEY (`FoodTypeID`) REFERENCES `foodtype` (`FoodTypeID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `orderlist`
--
ALTER TABLE `orderlist`
  ADD CONSTRAINT `Fk_Food` FOREIGN KEY (`FoodID`) REFERENCES `food` (`FoodID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
