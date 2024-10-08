-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 08, 2024 at 09:49 AM
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
-- Database: `finalproject`
--

-- --------------------------------------------------------

--
-- Table structure for table `job_postings`
--

CREATE TABLE `job_postings` (
  `id` int(11) NOT NULL,
  `job_title` varchar(255) NOT NULL,
  `company` varchar(255) NOT NULL,
  `salary_range` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `required_skills` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `job_postings`
--

INSERT INTO `job_postings` (`id`, `job_title`, `company`, `salary_range`, `location`, `required_skills`, `description`, `created_at`) VALUES
(1, 'Frontend Developer', 'Tech Corp', '50k-70k', 'New York', 'JavaScript, React', 'We are looking for a skilled frontend developer.', '2024-10-06 22:29:09'),
(2, 'Coding Instructor', 'wCoding', '30mil - 35 mil', 'Seoul, Korea', 'Full Stack ', 'Teach how to code to future developers. ', '2024-10-06 22:48:20'),
(3, 'Backend Developer', 'Innovative Solutions', '$80k to $100k', 'Tokyo', 'Python, Django, SQL', '\"We are looking for an experienced backend developer to join our growing team.\"', '2024-10-07 17:18:11'),
(5, 'Plumber', 'Plumber Great', '100K - 120K', 'Seattle', 'Plumbing, HVAC', 'Experienced plumber with a license.', '2024-10-08 02:48:59'),
(6, 'Software Engineer', 'Tech Innovations', '80K - 120K', 'San Francisco', 'JavaScript, React, Node.js', 'Looking for a full-stack developer with 3 years of experience.', '2024-10-08 02:48:59'),
(7, 'Data Analyst', 'Data Wizards', '70K - 90K', 'New York', 'SQL, Excel, Python', 'Analytical thinker with strong problem-solving skills.', '2024-10-08 02:48:59'),
(8, 'Marketing Specialist', 'Creative Solutions', '50K - 70K', 'Austin', 'SEO, Content Marketing', 'Must have experience with digital marketing strategies.', '2024-10-08 02:48:59'),
(9, 'Graphic Designer', 'Design Studio', '60K - 80K', 'Los Angeles', 'Adobe Creative Suite', 'Creative individual with a portfolio.', '2024-10-08 02:48:59'),
(10, 'Project Manager', 'Build It Better', '90K - 110K', 'Chicago', 'Agile, Scrum', 'Proven track record in project management.', '2024-10-08 02:48:59'),
(11, 'Mechanical Engineer', 'Engineering Pros', '75K - 95K', 'Detroit', 'CAD, Manufacturing', 'Strong understanding of mechanical systems.', '2024-10-08 02:48:59'),
(12, 'Web Developer', 'Web Solutions', '70K - 100K', 'Seattle', 'HTML, CSS, JavaScript', 'Expertise in front-end technologies required.', '2024-10-08 02:48:59'),
(13, 'Database Administrator', 'Data Keepers', '85K - 110K', 'Dallas', 'MySQL, Oracle', 'Experience in database management and security.', '2024-10-08 02:48:59'),
(14, 'Cybersecurity Analyst', 'SecureTech', '90K - 120K', 'Washington D.C.', 'Network Security, Ethical Hacking', 'Looking for a professional to safeguard our systems.', '2024-10-08 02:48:59'),
(15, 'Sales Representative', 'Sales Gurus', '45K - 65K', 'Miami', 'Sales, Negotiation', 'Dynamic individual with strong communication skills.', '2024-10-08 02:48:59'),
(16, 'Nurse', 'HealthCare Heroes', '70K - 90K', 'Boston', 'Nursing, Patient Care', 'Compassionate and skilled nursing professionals needed.', '2024-10-08 02:48:59'),
(17, 'Financial Analyst', 'Finance Experts', '80K - 100K', 'Atlanta', 'Financial Modeling, Excel', 'Detail-oriented analyst with strong quantitative skills.', '2024-10-08 02:48:59'),
(18, 'Content Writer', 'Content Creators', '40K - 60K', 'Denver', 'Writing, Editing', 'Excellent writing skills and creativity required.', '2024-10-08 02:48:59'),
(19, 'Human Resources Manager', 'People First', '75K - 95K', 'Phoenix', 'Recruitment, Employee Relations', 'HR experience with a focus on employee engagement.', '2024-10-08 02:48:59'),
(20, 'Customer Service Representative', 'Customer Care', '35K - 50K', 'Portland', 'Communication, Problem-Solving', 'Friendly and helpful customer service skills needed.', '2024-10-08 02:48:59'),
(21, 'Electrical Engineer', 'Electro Tech', '80K - 100K', 'San Jose', 'Circuit Design, Electronics', 'Looking for a skilled electrical engineer.', '2024-10-08 02:48:59'),
(22, 'Research Scientist', 'Science Innovations', '85K - 110K', 'San Diego', 'Biology, Chemistry', 'PhD in relevant field preferred.', '2024-10-08 02:48:59'),
(23, 'Operations Manager', 'Operational Excellence', '95K - 120K', 'Philadelphia', 'Leadership, Strategic Planning', 'Experienced manager with a focus on efficiency.', '2024-10-08 02:48:59'),
(24, 'UX/UI Designer', 'Design Pros', '70K - 90K', 'New Orleans', 'User Experience, Prototyping', 'Creative designer with a user-centered approach.', '2024-10-08 02:48:59');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `job_postings`
--
ALTER TABLE `job_postings`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `job_postings`
--
ALTER TABLE `job_postings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
