-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 23, 2024 at 04:25 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `careerconnect`
--

-- --------------------------------------------------------

--
-- Table structure for table `applications`
--

CREATE TABLE `applications` (
  `application_id` int(11) NOT NULL,
  `job_posting_id` int(11) NOT NULL,
  `job_seeker_id` int(11) NOT NULL,
  `job_seeker_status` int(11) NOT NULL,
  `employer_status` int(1) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `applications`
--

INSERT INTO `applications` (`application_id`, `job_posting_id`, `job_seeker_id`, `job_seeker_status`, `employer_status`, `created_at`) VALUES
(27, 35, 12, 1, 1, '2024-10-22 06:24:57'),
(28, 37, 13, 1, 1, '2024-10-22 17:10:47');

-- --------------------------------------------------------

--
-- Table structure for table `employer`
--

CREATE TABLE `employer` (
  `employer_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `company_name` varchar(255) NOT NULL,
  `company_logo` varchar(255) DEFAULT NULL,
  `about_company` text NOT NULL,
  `preferential_treatment` text DEFAULT NULL,
  `company_benefits` text DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employer`
--

INSERT INTO `employer` (`employer_id`, `user_id`, `company_name`, `company_logo`, `about_company`, `preferential_treatment`, `company_benefits`, `email`) VALUES
(5, 39, 'employer company', '', 'Company', 'Treatment', '[\"Benefit1\",\"Benefit 2\"]', 'employer@gmail.com'),
(6, 43, 'Employer2 Company', '', 'This Employer 2\'s company', 'Insurance', '[\"Benefit 1\",\"Benefit 2\",\"Benefit 3\"]', 'Employer2@gmail.com'),
(7, 45, 'Vlad The Company', '', 'It is a vlad company', 'You are treated well', '[\"Lost of money\",\"Lots of free time\"]', 'vlady@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `job_posting`
--

CREATE TABLE `job_posting` (
  `job_posting_id` int(11) NOT NULL,
  `employer_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `salary` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `skills` text NOT NULL,
  `description` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `job_posting`
--

INSERT INTO `job_posting` (`job_posting_id`, `employer_id`, `title`, `salary`, `location`, `skills`, `description`, `created_at`, `updated_at`) VALUES
(35, 5, 'Coding Instructor', '1233333', 'Taiwan', 'Fullstack', 'Teach it\n', '2024-10-22 08:00:28', '2024-10-22 08:00:28'),
(36, 6, 'Restaurant', '$35k to $40k', 'DTC', 'Culinary Skills', 'Manage and Cook', '2024-10-22 14:26:21', '2024-10-22 14:26:21'),
(37, 7, 'Fitness Instructor', '30mil to 45 mil', 'Seoul, South Korea', 'Good physique', 'Know how to teach fitness', '2024-10-23 02:10:08', '2024-10-23 02:10:08');

-- --------------------------------------------------------

--
-- Table structure for table `job_seekers`
--

CREATE TABLE `job_seekers` (
  `job_seeker_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `profile_pic` varchar(255) DEFAULT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `dob` date NOT NULL,
  `gender` varchar(30) NOT NULL,
  `nationality` varchar(255) NOT NULL,
  `education` text NOT NULL,
  `skills` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `job_seekers`
--

INSERT INTO `job_seekers` (`job_seeker_id`, `user_id`, `profile_pic`, `first_name`, `last_name`, `dob`, `gender`, `nationality`, `education`, `skills`) VALUES
(11, 42, '', 'jobseeker2', 'jobseeker2', '1990-01-01', 'Male', 'USA', '[{\"education\": \"Bachelor\'s Degree\", \"degreeDetails\": \"International Relations\", \"institution\": \"University\"}]', '[\"Skill 1\",\"Skill 2\",\"skill 3\"]'),
(12, 40, '', 'jobseeker', 'jobseeker', '1990-01-01', 'Male', 'USA', '[{\"education\": \"Bachelor\'s Degree\", \"degreeDetails\": \"Int Relations\", \"institution\": \"CU Denver\"}]', '[\"asefsfe\",\"sefsef\",\"sfsef\"]'),
(13, 44, '', 'Dan', 'Jobseeker', '1990-01-01', 'Male', 'US', '[{\"education\": \"High School Diploma\", \"degreeDetails\": \"\", \"institution\": \"\"}, {\"education\": \"\", \"degreeDetails\": \"\", \"institution\": \"\"}]', '[\"Sales\",\"Code\",\"Video Games\"]');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `notification_id` int(11) NOT NULL,
  `application_id` int(11) NOT NULL,
  `employer_id` int(11) NOT NULL,
  `job_seeker_id` int(11) NOT NULL,
  `job_posting_id` int(11) NOT NULL,
  `send_notification` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`notification_id`, `application_id`, `employer_id`, `job_seeker_id`, `job_posting_id`, `send_notification`, `created_at`) VALUES
(8, 27, 5, 12, 35, 1, '2024-10-22 15:24:57'),
(9, 28, 7, 13, 37, 1, '2024-10-23 02:10:47');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `user_type` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `email`, `password`, `full_name`, `user_type`, `created_at`, `updated_at`) VALUES
(39, 'employer', 'employer@gmail.com', '$2b$12$0o1oA7eeeP42/UA5aWZAhuHPcsolCLWZDT48I1BQv6GAOJ4e8AFC2', 'employer', 'employer', '2024-10-22 07:58:28', '2024-10-22 07:58:28'),
(40, 'jobseeker', 'jobseeker@gmail.com', '$2b$12$Hc.8O5Rfw8hqrPCiZTjh2.1llujAjzxpLVwRqgfzlblNZVKVVle/y', 'jobseeker', 'job_seeker', '2024-10-22 08:03:22', '2024-10-22 08:03:22'),
(42, 'jobseeker2', 'jobseeker2@gmail.com', '$2b$12$WrSlueGcF8P9/AMXcTJM0uaE4KFeGNtv4LYQefSTxnAmKnyDUlO4a', 'jobseeker2', 'job_seeker', '2024-10-22 14:20:20', '2024-10-22 14:20:20'),
(43, 'employer2', 'employer2@gmail.com', '$2b$12$tdSStqwKhUCcGBmISejF9ObXlGzjirJSZGbJuE8SQobjGGWiMAfrO', 'employer2', 'employer', '2024-10-22 14:22:18', '2024-10-22 14:22:18'),
(44, 'DanJobSeeker', 'dan@gmail.com', '$2b$12$zmDxP2Ty4WVPJNIQfVLrZ.Y6AS48eJxosFqqdimVRW0V54GojusJm', 'DanJobSeeker', 'job_seeker', '2024-10-23 02:05:46', '2024-10-23 02:05:46'),
(45, 'Vlad', 'Vlady@gmail.com', '$2b$12$mZD0EqYmMMrdEzfgaiNJSOi/ZVQG/oV71KUo4jrl5DwoVJ5njEiti', 'VladEmployer', 'employer', '2024-10-23 02:07:27', '2024-10-23 02:07:27');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `applications`
--
ALTER TABLE `applications`
  ADD PRIMARY KEY (`application_id`),
  ADD KEY `app_post` (`job_posting_id`),
  ADD KEY `app_seeker` (`job_seeker_id`);

--
-- Indexes for table `employer`
--
ALTER TABLE `employer`
  ADD PRIMARY KEY (`employer_id`),
  ADD KEY `employer_to_users` (`user_id`);

--
-- Indexes for table `job_posting`
--
ALTER TABLE `job_posting`
  ADD PRIMARY KEY (`job_posting_id`),
  ADD KEY `post_employer` (`employer_id`);

--
-- Indexes for table `job_seekers`
--
ALTER TABLE `job_seekers`
  ADD PRIMARY KEY (`job_seeker_id`),
  ADD KEY `job_seekers_to_users` (`user_id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`notification_id`),
  ADD KEY `application_id` (`application_id`),
  ADD KEY `notification_to_employer` (`employer_id`),
  ADD KEY `notification_to_jobseeker` (`job_seeker_id`),
  ADD KEY `notificatio_to_jobposting` (`job_posting_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `applications`
--
ALTER TABLE `applications`
  MODIFY `application_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `employer`
--
ALTER TABLE `employer`
  MODIFY `employer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `job_posting`
--
ALTER TABLE `job_posting`
  MODIFY `job_posting_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `job_seekers`
--
ALTER TABLE `job_seekers`
  MODIFY `job_seeker_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `notification_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `applications`
--
ALTER TABLE `applications`
  ADD CONSTRAINT `app_post` FOREIGN KEY (`job_posting_id`) REFERENCES `job_posting` (`job_posting_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `app_seeker` FOREIGN KEY (`job_seeker_id`) REFERENCES `job_seekers` (`job_seeker_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `employer`
--
ALTER TABLE `employer`
  ADD CONSTRAINT `employer_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `job_posting`
--
ALTER TABLE `job_posting`
  ADD CONSTRAINT `post_employer` FOREIGN KEY (`employer_id`) REFERENCES `employer` (`employer_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `job_seekers`
--
ALTER TABLE `job_seekers`
  ADD CONSTRAINT `job_seekers_to_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notificatio_to_jobposting` FOREIGN KEY (`job_posting_id`) REFERENCES `job_posting` (`job_posting_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `notification_to_employer` FOREIGN KEY (`employer_id`) REFERENCES `employer` (`employer_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `notification_to_jobseeker` FOREIGN KEY (`job_seeker_id`) REFERENCES `job_seekers` (`job_seeker_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`application_id`) REFERENCES `applications` (`application_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
