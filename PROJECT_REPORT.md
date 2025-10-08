# TAMIL WORDS LEARNING APPLICATION
## A Web-Based Platform for Preserving and Learning Extinct Tamil Words

---

**Project Report**

Submitted in partial fulfillment of the requirements for the degree of  
Bachelor of Technology in Computer Science and Engineering

---

**Academic Year: 2024-2025**

---

## TABLE OF CONTENTS

| Chapter | Title | Page |
|---------|-------|------|
| | **ABSTRACT** | i |
| | **LIST OF TABLES** | v |
| | **LIST OF FIGURES** | vi |
| | **LIST OF ABBREVIATIONS** | vii |
| **1** | **INTRODUCTION** | 1 |
| | 1.1 EXISTING SYSTEM | 1 |
| | 1.2 PROPOSED SYSTEM | 2 |
| | 1.2.1 Advantages of the Proposed System | 2 |
| **2** | **SYSTEM ANALYSIS** | 3 |
| | 2.1 FEASIBILITY STUDY | 3 |
| | 2.1.1 Operational Feasibility | 3 |
| | 2.1.2 Technical Feasibility | 3 |
| | 2.1.3 Economical Feasibility | 4 |
| | 2.2 USE CASE DIAGRAM | 5 |
| | 2.2.1 Primary Use Case Diagram | 5 |
| | 2.2.2 Secondary Use Case Diagram | 6 |
| **3** | **SYSTEM REQUIREMENT SPECIFICATION** | 11 |
| | 3.1 SCOPE | 11 |
| | 3.2 FUNCTIONAL REQUIREMENTS | 11 |
| | 3.3 PERFORMANCE REQUIREMENTS | 12 |
| | 3.3.1 Reusability | 13 |
| | 3.3.2 Flexibility | 13 |
| | 3.3.3 Reliability | 13 |
| | 3.3.4 Performance | 13 |
| | 3.3.5 Functionality | 13 |
| | 3.3.6 Speed | 13 |
| | 3.4 SOFTWARE SPECIFICATION | 14 |
| | 3.5 HARDWARE SPECIFICATION | 14 |
| | 3.6 TECHNOLOGIES USED | 15 |
| **4** | **SYSTEM DESIGN** | 17 |
| | 4.1 SYSTEM ARCHITECTURE DIAGRAM | 17 |
| | 4.2 DATA FLOW DIAGRAM | 18 |
| | 4.2.1 Level 0 DFD | 18 |
| | 4.2.2 Level 1 DFD | 19 |
| | 4.3 ER DIAGRAM | 20 |
| | 4.4 PROCESS FLOW DIAGRAM | 21 |
| | 4.5 LOGICAL DESIGN USING UML | 22 |
| | 4.5.1 Class Diagram | 22 |
| | 4.5.2 Sequence Diagram | 23 |
| | 4.5.3 State Chart Diagram | 24 |
| | 4.5.4 Activity Diagram | 25 |
| | 4.6 PHYSICAL DESIGN USING UML | 26 |
| | 4.6.1 Package Diagram | 26 |
| | 4.6.2 Component Diagram | 27 |
| | 4.6.3 Deployment Diagram | 28 |
| | 4.7 MODULE DESCRIPTION | 29 |
| | 4.7.1 User Authentication Module | 29 |
| | 4.7.2 Word Management Module | 30 |
| | 4.7.3 Game Module | 31 |
| | 4.7.4 Request Approval Module | 32 |
| | 4.8 DATABASE DESIGN | 33 |
| **5** | **TESTING** | 38 |
| | 5.1 TESTING OBJECTIVE | 38 |
| | 5.2 UNIT TESTING | 38 |
| | 5.3 INTEGRATION TESTING | 40 |
| | 5.4 USER INTERFACE TESTING | 42 |
| | 5.5 PERFORMANCE TESTING | 42 |
| | 5.6 SYSTEM TESTING | 42 |
| **6** | **IMPLEMENTATION** | 43 |
| **7** | **CONCLUSION** | 45 |
| **8** | **BIBLIOGRAPHY** | 47 |
| **9** | **APPENDICES** | 48 |
| | 9.1 Appendix A - Project Screenshots | 48 |
| | 9.2 Appendix B - Testing Screenshots | 57 |
| | 9.3 Appendix C - User Interface Testing | 60 |

---

# ABSTRACT

Tamil, one of the world's oldest living languages, possesses a rich vocabulary that has evolved over millennia. However, many ancient Tamil words are becoming extinct due to modernization and the lack of systematic preservation and learning mechanisms. This project addresses the critical need for preserving and revitalizing extinct Tamil words through an interactive, technology-driven approach.

The **Tamil Words Learning Application** is a comprehensive web-based platform designed to facilitate the learning, preservation, and gamification of extinct Tamil words. The system employs a three-tier architecture comprising a React-based frontend, Node.js/Express backend, and MongoDB database, ensuring scalability and maintainability.

The application features role-based access control with three distinct user roles: Students, Teachers, and Administrators. Students engage with the platform through interactive games including Word Matching, Fill in the Blanks, and Multiple Choice Questions, progressing through five difficulty levels. The gamification approach incorporates points, accuracy tracking, and performance analytics to enhance user engagement and learning outcomes.

Teachers are empowered to contribute to the word database through a structured request-approval system. They can submit suggestions for new words, request modifications to existing entries, or propose deletions, all subject to administrative review. This collaborative approach ensures data quality while enabling community participation in language preservation.

The administrative module provides comprehensive oversight of the entire system, including user management, content moderation, and approval workflows. Administrators review and approve teacher requests, manage word suggestions, monitor system statistics, and maintain data integrity.

Key features include:
- **Interactive Learning Games**: Three game types with progressive difficulty levels
- **Request-Based Word Management**: Structured approval workflow for content quality
- **Performance Analytics**: Comprehensive tracking of student progress and achievements
- **Mobile Responsiveness**: Cross-platform compatibility for accessibility
- **Real-time Statistics**: Dashboard analytics for all user roles

The system implements industry-standard security practices including JWT-based authentication, password hashing using bcrypt, and role-based authorization middleware. The application has been rigorously tested through unit testing, integration testing, and user acceptance testing to ensure reliability and performance.

This project successfully demonstrates how modern web technologies can be leveraged to address cultural preservation challenges. By making extinct Tamil words accessible and engaging through gamification, the platform contributes to the broader effort of maintaining linguistic heritage for future generations.

**Keywords**: Tamil Language Preservation, Extinct Words, E-Learning, Gamification, MERN Stack, Role-Based Access Control, Educational Technology

---

# LIST OF TABLES

| Table No. | Table Name | Page No. |
|-----------|------------|----------|
| 3.1 | Functional Requirements | 11 |
| 3.2 | Software Specifications | 14 |
| 3.3 | Hardware Specifications | 14 |
| 3.4 | Technologies and Frameworks | 15 |
| 4.1 | User Collection Schema | 33 |
| 4.2 | Word Collection Schema | 34 |
| 4.3 | Game Session Collection Schema | 35 |
| 4.4 | Word Suggestion Collection Schema | 36 |
| 4.5 | Word Modification Request Schema | 37 |
| 5.1 | Unit Test Cases | 39 |
| 5.2 | Integration Test Cases | 41 |

---

# LIST OF FIGURES

| Figure No. | Figure Name | Page No. |
|------------|-------------|----------|
| 2.1 | Primary Use Case Diagram | 5 |
| 2.2 | Student Use Case Diagram | 6 |
| 2.3 | Teacher Use Case Diagram | 7 |
| 2.4 | Admin Use Case Diagram | 8 |
| 4.1 | System Architecture Diagram | 17 |
| 4.2 | Level 0 Data Flow Diagram | 18 |
| 4.3 | Level 1 Data Flow Diagram | 19 |
| 4.4 | Entity Relationship Diagram | 20 |
| 4.5 | Process Flow Diagram | 21 |
| 4.6 | Class Diagram | 22 |
| 4.7 | Sequence Diagram - User Authentication | 23 |
| 4.8 | Sequence Diagram - Word Approval | 24 |
| 4.9 | Sequence Diagram - Game Play | 25 |
| 4.10 | State Chart Diagram - Word Request | 26 |
| 4.11 | State Chart Diagram - Game Session | 27 |
| 4.12 | Activity Diagram - Student Game Flow | 28 |
| 4.13 | Activity Diagram - Teacher Request Flow | 29 |
| 4.14 | Activity Diagram - Admin Approval Flow | 30 |
| 4.15 | Package Diagram | 31 |
| 4.16 | Component Diagram | 32 |
| 4.17 | Deployment Diagram | 33 |

---

# LIST OF ABBREVIATIONS

| Abbreviation | Full Form |
|--------------|-----------|
| API | Application Programming Interface |
| CRUD | Create, Read, Update, Delete |
| DFD | Data Flow Diagram |
| ER | Entity Relationship |
| HTML | Hypertext Markup Language |
| HTTP | Hypertext Transfer Protocol |
| HTTPS | Hypertext Transfer Protocol Secure |
| JWT | JSON Web Token |
| MERN | MongoDB, Express, React, Node.js |
| MVC | Model View Controller |
| NoSQL | Not Only SQL |
| REST | Representational State Transfer |
| SRS | Software Requirement Specification |
| UI | User Interface |
| UML | Unified Modeling Language |
| UX | User Experience |
| WCAG | Web Content Accessibility Guidelines |

---

*[Report continues in next file...]*
