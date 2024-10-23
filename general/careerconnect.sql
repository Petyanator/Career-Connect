-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 21, 2024 at 03:58 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- --------------------------------------------------------

--
-- Database: `careerconnect`
--

-- --------------------------------------------------------

--
-- Table structure for table `applications`
--

CREATE TABLE `applications` (
  `application_id` int(11) NOT NULL AUTO_INCREMENT,
  `job_posting_id` int(11) NOT NULL,
  `job_seeker_id` int(11) NOT NULL,
<<<<<<< HEAD
  `job_seeker_status` tinyint(1) NOT NULL,
  `employer_status` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`application_id`),
  KEY `applications_to_job_seekers` (`job_seeker_id`),
  KEY `applications_to_job_postings` (`job_posting_id`),
  CONSTRAINT `applications_to_job_postings` FOREIGN KEY (`job_posting_id`) REFERENCES `job_posting` (`job_posting_id`),
  CONSTRAINT `applications_to_job_seekers` FOREIGN KEY (`job_seeker_id`) REFERENCES `job_seekers` (`job_seeker_id`)
=======
  `job_seeker_status` int(1) NOT NULL,
  `employer_status` int(1) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
>>>>>>> main
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `employer`
--

CREATE TABLE `employer` (
  `employer_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `company_name` varchar(255) NOT NULL,
<<<<<<< HEAD
  `company_logo` varchar(255) DEFAULT NULL,
  `about_company` text DEFAULT NULL,
  `preferential_treatment` text DEFAULT NULL,
  `company_benefits` text DEFAULT NULL,
  `contact` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`employer_id`),
  KEY `employer_to_users` (`user_id`),
  CONSTRAINT `employer_to_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
=======
  `company_logo` varchar(255) NOT NULL,
  `about_company` text NOT NULL,
  `preferential_treatment` varchar(255) NOT NULL,
  `company_benefits` text NOT NULL,
  `email` varchar(100) NOT NULL
>>>>>>> main
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_posting`
--

CREATE TABLE `job_posting` (
  `job_posting_id` int(11) NOT NULL AUTO_INCREMENT,
  `employer_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `salary` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `skills` text NOT NULL,
  `description` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`job_posting_id`),
  KEY `job_postings_to_employers` (`employer_id`),
  CONSTRAINT `job_postings_to_employers` FOREIGN KEY (`employer_id`) REFERENCES `employer` (`employer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_seekers`
--

CREATE TABLE `job_seekers` (
  `job_seeker_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `profile_pic` varchar(255) DEFAULT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `dob` date NOT NULL,
  `gender` varchar(30) NOT NULL,
  `nationality` varchar(255) NOT NULL,
  `education` text NOT NULL,
  `skills` text NOT NULL,
  PRIMARY KEY (`job_seeker_id`),
  KEY `job_seekers_to_users` (`user_id`),
  CONSTRAINT `job_seekers_to_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `notification_id` int(11) NOT NULL AUTO_INCREMENT,
  `application_id` int(11) NOT NULL,
  `employer_id` int(11) NOT NULL,
  `read_at` tinyint(1) NOT NULL,
  PRIMARY KEY (`notification_id`),
  CONSTRAINT `notifications_to_applications` FOREIGN KEY (`application_id`) REFERENCES `applications` (`application_id`),
  CONSTRAINT `notifications_to_employers` FOREIGN KEY (`employer_id`) REFERENCES `employer` (`employer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `user_type` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Indexes for tables
--

-- Indexes have been included within the table definitions.

-- --------------------------------------------------------

--
-- AUTO_INCREMENT for tables
--

ALTER TABLE `applications`
  AUTO_INCREMENT = 1;

ALTER TABLE `employer`
  AUTO_INCREMENT = 1;

ALTER TABLE `job_posting`
  AUTO_INCREMENT = 1;

ALTER TABLE `job_seekers`
  AUTO_INCREMENT = 1;

ALTER TABLE `notifications`
  AUTO_INCREMENT = 1;

ALTER TABLE `users`
  AUTO_INCREMENT = 1;

-- --------------------------------------------------------

--
-- Constraints for tables
--

<<<<<<< HEAD
-- Constraints have been included within the table definitions.

-- --------------------------------------------------------

=======
--
-- AUTO_INCREMENT for table `applications`
--
ALTER TABLE `applications`
  MODIFY `application_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `employer`
--
ALTER TABLE `employer`
  MODIFY `employer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `job_posting`
--
ALTER TABLE `job_posting`
  MODIFY `job_posting_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `job_seekers`
--
ALTER TABLE `job_seekers`
  MODIFY `job_seeker_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `notification_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `applications`
--
ALTER TABLE `applications`
  ADD CONSTRAINT `applications_to_job_postings` FOREIGN KEY (`job_posting_id`) REFERENCES `job_posting` (`job_posting_id`),
  ADD CONSTRAINT `applications_to_job_seekers` FOREIGN KEY (`job_seeker_id`) REFERENCES `job_seekers` (`job_seeker_id`);

--
-- Constraints for table `employer`
--
ALTER TABLE `employer`
  ADD CONSTRAINT `employer_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `job_seekers`
--
ALTER TABLE `job_seekers`
  ADD CONSTRAINT `job_seekers_to_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
>>>>>>> main
COMMIT;

