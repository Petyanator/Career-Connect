-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 18, 2024 at 04:25 AM
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
  `job_seeker_status` int(1) NOT NULL,
  `employer_status` int(1) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `applications`
--

INSERT INTO `applications` (`application_id`, `job_posting_id`, `job_seeker_id`, `job_seeker_status`, `employer_status`, `created_at`) VALUES
(1, 19, 1, 2, NULL, '2024-10-16 16:46:56'),
(2, 24, 1, 1, NULL, '2024-10-16 16:49:32'),
(3, 21, 1, 2, NULL, '2024-10-16 17:04:08'),
(4, 23, 1, 1, NULL, '2024-10-16 21:45:41');

-- --------------------------------------------------------

--
-- Table structure for table `employer`
--

CREATE TABLE `employer` (
  `employer_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `company_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employer`
--

INSERT INTO `employer` (`employer_id`, `user_id`, `company_name`) VALUES
(1, 15, 'wCoding');

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
(19, 0, 'Software Engineer', '$80,000 - $100,000', 'New York, NY', 'Python, React, SQL', 'Looking for a skilled Software Engineer to join our team.', '2024-10-14 04:32:59', '2024-10-14 04:32:59'),
(20, 0, 'Project Manager', '$90,000 - $110,000', 'San Francisco, CA', 'Leadership, Agile, Scrum', 'Seeking a Project Manager to oversee software development projects.', '2024-10-14 04:32:59', '2024-10-14 04:32:59'),
(21, 0, 'Data Scientist', '$95,000 - $120,000', 'Chicago, IL', 'Python, R, Machine Learning', 'Join our analytics team as a Data Scientist.', '2024-10-14 04:32:59', '2024-10-14 04:32:59'),
(22, 0, 'UI/UX Designer', '$70,000 - $85,000', 'Los Angeles, CA', 'Figma, Adobe XD, User Research', 'Looking for a creative UI/UX Designer to enhance our product.', '2024-10-14 04:32:59', '2024-10-14 04:32:59'),
(23, 0, 'Full Stack Developer', '$85,000 - $105,000', 'Austin, TX', 'JavaScript, Node.js, MongoDB', 'Seeking a Full Stack Developer with a passion for coding and problem-solving.', '2024-10-14 04:32:59', '2024-10-14 04:32:59'),
(24, 0, 'DevOps Engineer', '$100,000 - $130,000', 'Seattle, WA', 'AWS, Docker, Kubernetes', 'We are looking for a DevOps Engineer to streamline our deployment processes.', '2024-10-14 04:32:59', '2024-10-14 04:32:59'),
(25, 1, 'developer', '60000-70000', 'Seattle', 'JavaScript, React', 'dasdas', '2024-10-18 01:38:51', '2024-10-18 01:38:51');

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
(1, 14, NULL, 'dadwa', 'dsadwa', '2024-10-02', 'male', 'faeaf', 'feafea', 'wdadadwa');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `notification_id` int(11) NOT NULL,
  `application_id` int(11) NOT NULL,
  `employer_id` int(11) NOT NULL,
  `read_at` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(75) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `user_type` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `email`, `password`, `full_name`, `user_type`, `created_at`, `updated_at`) VALUES
(14, 'admin', 'test@beispiel.de', '$2b$12$7DCqavuG3mHrsfuGH4aoxOWpOWcPk1ul0.4np08RnTdc1IaFQH416', 'adsqwq', 'job_seeker', '2024-10-16 06:34:02', '2024-10-16 06:34:02'),
(15, 'Toby', 'dsadas@gmail.com', '$2b$12$.WfrsAJ9OiQKw8T9zLBhW.YGk3u/.vOUbuv6yNf5hKjBNugFfwkJu', 'dsadas', 'employer', '2024-10-18 01:30:55', '2024-10-18 01:30:55');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `applications`
--
ALTER TABLE `applications`
  ADD PRIMARY KEY (`application_id`),
  ADD KEY `applications_to_job_seekers` (`job_seeker_id`),
  ADD KEY `applications_to_job_postings` (`job_posting_id`);

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
  ADD KEY `job_postings_to_employers` (`employer_id`);

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
  ADD PRIMARY KEY (`notification_id`);

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
  MODIFY `application_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `employer`
--
ALTER TABLE `employer`
  MODIFY `employer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `job_posting`
--
ALTER TABLE `job_posting`
  MODIFY `job_posting_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `job_seekers`
--
ALTER TABLE `job_seekers`
  MODIFY `job_seeker_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `notification_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
