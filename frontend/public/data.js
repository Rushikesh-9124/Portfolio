import resume1 from './RushikeshReddy_resume.pdf'

export const data = {
  personalDetails: {
    profilePic:
      "https://www.pngmart.com/files/23/Profile-PNG-Photo.png",
    firstName: "Rushikesh",
    lastName: "Reddy",
    passionateIn: ["Full Stack Developer", 'Artificial Intelligence', "Problem Solving"],
    tagLine: "Turning ideas into code.",
    about: 'Computer Science undergraduate specializing in full-stack development with JavaScript and Next.js. My portfolio includes 10+ full-stack applications  and a strong, demonstrated ability in coding and problem-solving, making me an interview-ready and independent contributor.',
    contact: [
      {platform: 'linkedIn', icon: 'FaLinkedin', link: "https://www.linkedin.com/in/rushikesh-reddy-875516280/"},
      {platform: "email", icon: 'MdAttachEmail', link: "https://mail.google.com/mail/?view=cm&fs=1&to=rushikesh6281@gmail.com"},
      {platform: "github", icon: 'FaGithub', link: "https://github.com/Rushikesh-9124"},
      {platform: "twitter", icon: 'FaXTwitter', link: "https://x.com/chill_guy9124"},
    ],
  },
  about: {
    summary: [
      "10+ Full Stack Applications",
      "Strong DSA foundation (320+ problems solved)",
      "Experienced with React, Next.js, Node.js",
      "Hands-on with Firebase, MongoDB, and REST APIs",
      "Built scalable, production-ready web apps",
      "Active learner, currently mastering Graphs & Advanced DSA",
      "Good problem solver with competitive programming experience",
    ],    
    education: [
      {
        id: 1,
        degree: "B.Tech",
        course: 'Computer Science and Engineering',
        college: "Bennett University, Greater Noida",
        from: 2022,
        to: 2026,
        cgpa: 8.9,
      },
      {
        id: 2,
        degree: "Intermediate",
        course: "Maths Physics & Chemistry",
        college: "Sri Chaitanya Jr. College, Khammam",
        from: 2020,
        to: 2022,
        marks: 978,
      },
    ],
    problemSolving: [
      { platform: "LeetCode", totalProblems: 120, link: "" },
      { platform: "GeeksForGeeks", totalProblems: 120, link: "" },
      { platform: "Coding Ninjas", totalProblems: 120, link: "" },
    ],
    courses: [
      "Data Structures",
      "Algorithms",
      "Full Stack Development",
      "Artificial Intelligence",
    ],
  },
  skills : [
    // Languages
    {
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
      skillName: "C++",
      progress: "Advanced",
      category: "Language",
    },
    {
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      skillName: "Python",
      progress: "Intermediate",
      category: "Language",
    },
    {
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      skillName: "JavaScript",
      progress: "Advanced",
      category: "Language",
    },
    {
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
      skillName: "Java",
      progress: "Intermediate",
      category: "Language",
    },
  
    // Technologies
    {
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
      skillName: "HTML",
      progress: "Advanced",
      category: "Technology",
    },
    {
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
      skillName: "CSS",
      progress: "Advanced",
      category: "Technology",
    },
    {
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      skillName: "ReactJS",
      progress: "Advanced",
      category: "Technology",
    },
    {
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      skillName: "NodeJS",
      progress: "Intermediate",
      category: "Technology",
    },
    {
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
      skillName: "ExpressJS",
      progress: "Intermediate",
      category: "Technology",
    },
    {
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      skillName: "NextJS",
      progress: "Intermediate",
      category: "Technology",
    },
    {
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
      skillName: "MongoDB",
      progress: "Intermediate",
      category: "Technology",
    },
    {
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
      skillName: "MySQL",
      progress: "Intermediate",
      category: "Technology",
    },
    {
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
      skillName: "TailwindCSS",
      progress: "Advanced",
      category: "Technology",
    },
    {
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
      skillName: "Machine Learning",
      progress: "Beginner",
      category: "Technology",
    },
    
  
    // Developer Tools
    {
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
      skillName: "Git",
      progress: "Advanced",
      category: "Developer Tool",
    },
    {
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
      skillName: "GitHub",
      progress: "Advanced",
      category: "Developer Tool",
    },
    {
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
      skillName: "VS Code",
      progress: "Advanced",
      category: "Developer Tool",
    },
  
    // Development Practices
    {
      image: "https://e7.pngegg.com/pngimages/270/546/png-clipart-logo-organization-behance-computer-icons-design-agile-icons-blue-company-thumbnail.png",
      skillName: "Agile",
      progress: "Intermediate",
      category: "Development Practice",
    },
    {
      image: "https://img.icons8.com/fluency/48/merge-git.png",
      skillName: "Version Control",
      progress: "Advanced",
      category: "Development Practice",
    },
    {
      image: "https://img.icons8.com/color/48/api.png",
      skillName: "API Integration",
      progress: "Intermediate",
      category: "Development Practice",
    },
    {
      image: "https://img.icons8.com/color/48/bug.png",
      skillName: "Debugging",
      progress: "Advanced",
      category: "Development Practice",
    },
  ],  
  projects: [
    {
      id: 1,
      title: "Expense Tracker",
      github: "https://github.com/yourusername/expense-tracker",
      liveDemo: "https://expense-tracker-demo.netlify.app/",
      image:
        "https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg",
      technologies: ["ReactJS", "TailwindCSS", "NodeJS", "MongoDB"],
    },
    {
      id: 2,
      title: "AI Career Coach",
      github: "https://github.com/yourusername/ai-career-coach",
      liveDemo: "https://ai-career-coach-demo.netlify.app/",
      image:
        "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg",
      technologies: ["NextJS", "OpenAI API", "TailwindCSS", "Firebase"],
    },
    {
      id: 3,
      title: "E-Commerce Platform",
      github: "https://github.com/yourusername/ecommerce-platform",
      liveDemo: "https://ecommerce-demo.netlify.app/",
      image:
        "https://images.pexels.com/photos/3945650/pexels-photo-3945650.jpeg",
      technologies: ["ReactJS", "Redux", "NodeJS", "Stripe API"],
    },
    {
      id: 4,
      title: "Chat Application",
      github: "https://github.com/yourusername/chat-app",
      liveDemo: "https://chatapp-demo.netlify.app/",
      image:
        "https://images.pexels.com/photos/4974915/pexels-photo-4974915.jpeg",
      technologies: ["ReactJS", "Socket.IO", "NodeJS", "ExpressJS"],
    },
    {
      id: 5,
      title: "Portfolio Website",
      github: "https://github.com/yourusername/portfolio",
      liveDemo: "https://your-portfolio.netlify.app/",
      image:
        "https://images.pexels.com/photos/3130810/pexels-photo-3130810.jpeg",
      technologies: ["NextJS", "TailwindCSS", "Framer Motion"],
    },
  ],  
  certificates: [
    {
      id: 1,
      title: "The Bits and Bytes of Computer Networking - Google",
      verify: "https://www.coursera.org/verify/BQMYV89JRL6W",
      image: "https://68.media.tumblr.com/fa217af735e039c5eca4b3d4a969192a/tumblr_inline_mm6pnbwDPS1qz4rgp.png",
    },
    {
      id: 2,
      title: "Algorithmic Toolbox",
      verify: "https://www.coursera.org/verify/YS9Z5Z4XHF27",
      image: "https://68.media.tumblr.com/fa217af735e039c5eca4b3d4a969192a/tumblr_inline_mm6pnbwDPS1qz4rgp.png",
    },
    {
      id: 3,
      title: "Machine Learning - Stanford University",
      verify: "https://www.coursera.org/verify/Y4KJ9D7X8L23",
      image: "https://68.media.tumblr.com/fa217af735e039c5eca4b3d4a969192a/tumblr_inline_mm6pnbwDPS1qz4rgp.png",
    },
    {
      id: 4,
      title: "Deep Learning Specialization - DeepLearning.AI",
      verify: "https://www.coursera.org/verify/X8H2L5J9WQ10",
      image: "https://68.media.tumblr.com/fa217af735e039c5eca4b3d4a969192a/tumblr_inline_mm6pnbwDPS1qz4rgp.png",
    },
    {
      id: 5,
      title: "Data Structures and Algorithms - UC San Diego",
      verify: "https://www.coursera.org/verify/Z9T3M6K1P7F4",
      image: "https://68.media.tumblr.com/fa217af735e039c5eca4b3d4a969192a/tumblr_inline_mm6pnbwDPS1qz4rgp.png",
    },
    {
      id: 6,
      title: "Neural Networks and Deep Learning - DeepLearning.AI",
      verify: "https://www.coursera.org/verify/W2Q8R5L7C3H9",
      image: "https://68.media.tumblr.com/fa217af735e039c5eca4b3d4a969192a/tumblr_inline_mm6pnbwDPS1qz4rgp.png",
    },
  ]
};
