export const freeElectives = [
    "Introduction to Information Security",
    "Computing for Good",
    "Graduate Introduction to Operating Systems",
    "Advanced Operating Systems",
    "Special Topics: Systems Design for Cloud Computing",
    "Secure Computer Systems",
    "Computer Networks",
    "Applied Cryptography",
    "Network Security",
    "Introduction to Cyber-Physical Systems Security",
    "Information Security Lab: System and Network Defenses",
    "Information Security Lab: Binary Exploitation",
    "High-Performance Computer Architecture",
    "Embedded Systems Optimization",
    "Software Development Process",
    "Software Architecture and Design",
    "Advanced Topics in Software Analysis and Testing",
    "Database Systems Concepts and Design",
    "Introduction to Health Informatics",
    "Video Game Design and Programming",
    "Educational Technology: Conceptual Foundations",
    "Computational Photography",
    "Introduction to Computer Vision",
    "Introduction to Graduate Algorithms",
    "Artificial Intelligence",
    "AI, Ethics, and Society",
    "Advanced Internet Computing Systems and Applications",
    "Advanced Topics in Malware Analysis",
    "Human-Computer Interaction",
    "Introduction to Cognitive Science",
    "Distributed Computing",
    "Network Science: Methods and Applications",
    "Mobile and Ubiquitous Computing",
    "Game Artificial Intelligence",
    "Knowledge-Based AI",
    "Artificial Intelligence Techniques for Robotics",
    "Cyber Physical Design and Analysis",
    "Machine Learning",
    "Reinforcement Learning and Decision Making",
    "Deep Learning",
    "Machine Learning for Trading",
    "Natural Language Processing",
    "Special Topics: Compilers - Theory and Practice",
    "Special Topics: Quantum Computing",
    "Special Topics: Introduction to Computer Law",
    "Digital Health Equity",
    "Special Topics: Global Entrepreneurship",
    "High Performance Computing",
    "Data and Visual Analytics",
    "Big Data Analytics for Healthcare",
    "Modeling, Simulation and Military Gaming",
    "Side Channels and their Role in Cybersecurity",
    "Data Analytics and Security",
    "Time Series Analysis",
    "Introduction to Theory and Practice of Bayesian Statistics",
    "Introduction to Analytics Modeling",
    "Simulation",
    "Deterministic Optimization",
    "Special Topics: High-Dimensional Data Analytics",
    "Digital Marketing",
    "Information Security Policies and Strategies",
    "Special Topics: Financial Modeling",
    "Special Topics: GPU Hardware and Software",
    "Security Incident Response",
    "Modern Internet Research Methods",
    "Intro to Research",
    "Special Topics: Geopolitics of Cybersecurity"
]
export const Specialization = {
    ComputationalPerceptionAndRobotics: 'Computational Perception & Robotics',
    ComputingSystems: 'Computing Systems',
    HumanComputerInteraction: 'Human-Computer Interaction',
    InteractiveIntelligence: 'Interactive Intelligence',
    MachineLearning: 'Machine Learning',
}

export const LocalStorageKeys = {
    Specialization: 'specialization',
    SelectedCourses: 'selectedCourses'
}

export const writeToLocalStorage = (key, value) => {
    window.localStorage.setItem(key, value)
}

export const readFromLocalStorage = (key) => {
    return window.localStorage.getItem(key)
}
