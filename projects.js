// Edit your projects here. The home page cards and the pop-up both read from this list.
// Put images in an "assets" folder. Missing images simply show a dark placeholder.
// "category" decides which filter chips show the project: "Data Visualisation", "AI", "Software Development", "UI Design".
// "period" is the timeline shown at the bottom of the card, e.g. "Feb \u2013 Aug 2026".
// "details" is the pop-up description. Keep it short: an Overview (1-2 sentences), optional Features (2-3 bullets) and Outcome (1-3 bullets, ideally with a number).
// "apk" (Android download link) is optional too.
// "github" and "demo" are optional: leave one as "" and its button is hidden (both empty = no link row).
const PROJECTS = [
  {
    id: "arasa",
    category: ["Software Development"],
    title: "ARasa",
    summary: "An augmented reality escape room for Iban food culture transmission.",
    cover: "assets/arasa-cover.jpg",
    tags: ["Software Development", "AR"],
    year: "2026",
    period: "Oct 2025 \u2013 Jun 2026",
    role: "Designer & Developer",
    tools: "Unity, AR Foundation, Firebase, React, Figma",
    details: [
      { title: "Overview", points: ["An Android AR escape room that teaches Iban food culture through interactive objects and quizzes."] },
      { title: "Features", points: ["Countdown timer, leaderboard and achievements", "Admin dashboard for managing users, questions, and rooms, and viewing player performance"] },
      { title: "Outcome", points: ["Evaluated usability with 30 university students, achieving a System Usability Scale (SUS) score of 76.8/100", "90% of players reported that ARasa improved their understanding of Iban food culture"] }
    ],
    github: "",
    demo: "",
    apk: "https://drive.google.com/file/d/114T-ap6n7MPvC6tNnRJzVGJ6qejXUrIW/view?usp=sharing"
  },
  {
    id: "titanic-dashboard",
    category: ["Data Visualisation"],
    title: "Titanic Survival Dashboard",
    summary: "An interactive dashboard comparing Titanic survival rates by passenger profile.",
    cover: "assets/titanic-cover.jpg",
    tags: ["Data Visualisation", "Tableau"],
    year: "2026",
    period: "May \u2013 Jun 2026",
    role: "Data Visualisation",
    tools: "Tableau Public",
    details: [
      { title: "Overview", points: ["An interactive Tableau dashboard that compares Titanic passenger survival rates by gender, age group, and travel status."] },
      { title: "Features", points: ["Key insight banner and summary cards update when users select a passenger group or a path in the Sankey diagram"] },
      { title: "Outcome", points: ["Most respondents identified the main finding at a glance", "Adult male passengers who travelled alone had a lower survival rate than those who travelled with family"] }
    ],
    github: "",
    demo: "https://public.tableau.com/app/profile/cindy.jong5690/viz/TitanicSurvivalDashboard_17810997167810/laptop",
    demoLabel: "View Dashboard"
  },
    {
    id: "vegetables-detection",
    category: ["AI"],
    title: "Vegetable Detection Model",
    summary: "A vegetable detection model that identifies eight vegetable classes using computer vision.",
    cover: "assets/vegetables-cover.jpg",
    tags: ["AI", "Object Detection"],
    year: "2026",
    period: "Dec 2025",
    role: "Developer",
    tools: "Roboflow, YOLOv8-compatible, MS COCO checkpoint",
    details: [
      { title: "Overview", points: ["An object detection model that recognises 8 vegetables, trained on a custom dataset of 800 annotated images."] },
      { title: "Features", points: ["Detects and labels vegetables in images with bounding boxes and confidence scores", "Training used augmentation which expanded the training set from 560 to 1,680 images"] },
      { title: "Outcome", points: ["99.0% mAP@50 on the validation set and 98.0% on an 80-image held-out test set", "7 of 8 classes reached 100% on the test set; garlic was weakest at 91%" ] }
    ],
    github: "",
    demo: "https://app.roboflow.com/workflows/embed/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3b3JrZmxvd0lkIjoiSWVMNWNjNzBNcDFndW5kVlVua3oiLCJ3b3Jrc3BhY2VJZCI6IjdkcU5OTnZKTGJNTUptMmxNUVNMWVBva2d2NDMiLCJ1c2VySWQiOiIyalY2ZUprUDZxUm9Xc1p0Yk5sS2N4YkRKQmwxIiwiaWF0IjoxNzk1NTE5NzYwfQ.Wt_IBOyDvsYU5tr3-lDe54KMMBQqp2AGB4dq2vALD8o",
    demoLabel: "Try Model"
  },
  {
    id: "unimasbuy",
    category: ["UI Design"],
    title: "UNIMASBuy",
    summary: "A UI design of an e-commerce website for the UNIMAS community.",
    cover: "assets/unimasbuy-cover.jpg",
    tags: ["UI Design", "E-commerce"],
    year: "2024",
    period: "May \u2013 Jun 2024",
    role: "UI Designer",
    tools: "Figma, Canva",
    details: [
      { title: "Overview", points: ["A high-fidelity Figma prototype of an online shopping website for the UNIMAS community."] },
      { title: "Features", points: ["Product search, product details, shopping cart, checkout flow, and account management"] },
      { title: "Outcome", points: ["Most respondents found the navigation clear and the prototype easy to use"] }
    ],
    github: "",
    demo: "https://www.figma.com/proto/z1sXviRTklStHDt3nzR3Ob/UNIMASBuy?node-id=75-1856&p=f&t=CrXXC0fx58F1Qn88-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=75%3A1856",
    demoLabel: "View Prototype"
  },
  {
    id: "ecoapp",
    category: ["UI Design"],
    title: "EcoApp",
    summary: "A mobile app UI design for encouraging sustainable living habits.",
    cover: "assets/ecoapp-cover.jpg",
    tags: ["UI Design", "Mobile"],
    year: "2024",
    period: "Feb 2024",
    role: "UI Designer",
    tools: "Figma, Canva",
    details: [
      { title: "Overview", points: ["A high-fidelity Figma prototype of an eco-friendly mobile app that helps people understand their carbon footprint for sustainable living."] },
      { title: "Features", points: ["Carbon footprint tracking, sustainable shopping, daily challenges, rewards, community forum and leaderboard"] }
    ],
    github: "",
    demo: "https://www.figma.com/proto/PVkuGNgYYLclqYrFKBMlzj/EcoApp?node-id=0-1&t=PTzZfZlQyDHKQjyb-1",
    demoLabel: "View Prototype"
  }
];
