/**
 * Reusable role descriptions by technology / discipline.
 * A job in jobs.ts picks one profile + one level; the page combines them.
 * Edit text here once and every role using the profile updates.
 */

export interface Profile {
  skills: string[];
  about: string; // what this work is about at Mindsoft
  do: string[]; // responsibilities specific to the technology
  need: string[]; // requirements specific to the technology
  nice: string[];
}

export const profiles = {
  react: {
    skills: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "REST APIs"],
    about: "You'll build fast, accessible interfaces for client websites, dashboards and web applications using React and Next.js.",
    do: [
      "Build responsive pages and reusable components in React and Next.js",
      "Turn Figma designs into pixel-accurate, accessible interfaces",
      "Integrate REST/GraphQL APIs with proper loading, error and empty states",
      "Improve performance, SEO and Core Web Vitals",
    ],
    need: [
      "Strong JavaScript (ES2020+) and working TypeScript",
      "Hands-on experience with React hooks, state management and component design",
      "Good understanding of Next.js routing and server/client rendering",
      "Solid HTML, CSS and responsive layout skills",
    ],
    nice: ["Testing Library / Playwright", "Experience with a headless CMS", "Animation with Framer Motion or GSAP"],
  },
  vue: {
    skills: ["Vue.js", "Nuxt", "TypeScript", "Pinia", "REST APIs"],
    about: "You'll build modern, maintainable single-page applications and dashboards with Vue.js for our clients.",
    do: [
      "Develop features and reusable components in Vue 3 (Composition API)",
      "Manage application state with Pinia or Vuex",
      "Integrate APIs and handle routing, forms and validation",
      "Optimise bundle size and runtime performance",
    ],
    need: [
      "Hands-on Vue 3 experience in production projects",
      "Strong JavaScript and working TypeScript",
      "Good understanding of component architecture and reactivity",
      "Solid HTML, CSS and responsive design",
    ],
    nice: ["Nuxt for SSR", "Unit testing with Vitest", "Experience migrating Vue 2 apps"],
  },
  angular: {
    skills: ["Angular", "TypeScript", "RxJS", "NgRx", "REST APIs"],
    about: "You'll build structured, enterprise-grade web applications with Angular for business clients.",
    do: [
      "Build modules, components and services in modern Angular",
      "Handle complex forms, routing and role-based screens",
      "Manage state and async data with RxJS and NgRx",
      "Write unit tests and keep code quality high",
    ],
    need: [
      "Hands-on experience with Angular (v12+) in production",
      "Strong TypeScript and RxJS fundamentals",
      "Experience with reactive forms and REST integration",
      "Good HTML, SCSS and responsive design skills",
    ],
    nice: ["Angular Material", "Jasmine / Jest testing", "Micro-frontend experience"],
  },
  frontend: {
    skills: ["React", "Angular", "Vue.js", "TypeScript", "HTML/CSS"],
    about: "You'll deliver polished front-ends across our client projects, working in whichever modern framework the project needs.",
    do: [
      "Build responsive interfaces in React, Angular or Vue depending on the project",
      "Translate designs into reusable, accessible components",
      "Integrate APIs and handle application state",
      "Keep performance, accessibility and browser support in check",
    ],
    need: [
      "Production experience in at least one of React, Angular or Vue",
      "Strong JavaScript/TypeScript, HTML and CSS",
      "Understanding of accessibility and responsive design",
      "Comfortable with Git and code reviews",
    ],
    nice: ["Experience in more than one framework", "Design systems", "Front-end testing"],
  },
  java: {
    skills: ["Java", "Spring Boot", "Microservices", "SQL", "REST APIs"],
    about: "You'll design and build reliable backend services and APIs in Java and Spring Boot.",
    do: [
      "Develop REST APIs and microservices with Spring Boot",
      "Model data and write efficient SQL / JPA queries",
      "Integrate third-party services, queues and payment gateways",
      "Write unit and integration tests and support deployments",
    ],
    need: [
      "Strong Core Java (8+), OOP and collections",
      "Hands-on Spring Boot, Spring Data and REST",
      "Good knowledge of relational databases (MySQL / PostgreSQL)",
      "Understanding of security basics (auth, JWT, OWASP)",
    ],
    nice: ["Kafka or RabbitMQ", "Docker / Kubernetes", "AWS or Azure"],
  },
  javaFullstack: {
    skills: ["Java", "Spring Boot", "React / Angular", "SQL", "Microservices"],
    about: "You'll own features end to end, from Spring Boot APIs to the React or Angular screens that use them.",
    do: [
      "Build Spring Boot services and the front-end that consumes them",
      "Design database schemas and APIs together with the team",
      "Deliver complete features from requirement to deployment",
      "Write tests and take part in code reviews",
    ],
    need: [
      "Strong Java and Spring Boot experience",
      "Hands-on React or Angular",
      "Good SQL and data-modelling skills",
      "Understanding of REST design and authentication",
    ],
    nice: ["Microservices in production", "CI/CD pipelines", "Cloud experience"],
  },
  node: {
    skills: ["Node.js", "Express / NestJS", "MongoDB", "TypeScript", "REST APIs"],
    about: "You'll build scalable APIs and real-time services with Node.js and MongoDB.",
    do: [
      "Develop APIs and services with Node.js (Express or NestJS)",
      "Design MongoDB schemas, indexes and aggregations",
      "Integrate authentication, payments and third-party APIs",
      "Write tests and monitor services in production",
    ],
    need: [
      "Strong JavaScript/TypeScript and async programming",
      "Hands-on Node.js with Express or NestJS",
      "Good MongoDB (and ideally SQL) knowledge",
      "Understanding of API security and performance",
    ],
    nice: ["Redis and queues", "WebSockets", "Docker and AWS"],
  },
  mean: {
    skills: ["MongoDB", "Express", "Angular", "Node.js", "TypeScript"],
    about: "You'll build full-stack web applications on the MEAN stack, from database to Angular front-end.",
    do: [
      "Build Angular front-ends backed by Node/Express APIs",
      "Design MongoDB data models",
      "Deliver features end to end with tests",
      "Collaborate with designers and QA on releases",
    ],
    need: [
      "Hands-on Angular and Node.js/Express",
      "Good MongoDB knowledge",
      "Strong TypeScript and REST API design",
      "Comfortable with Git-based workflows",
    ],
    nice: ["NgRx", "NestJS", "Cloud deployment"],
  },
  mern: {
    skills: ["MongoDB", "Express", "React", "Node.js", "TypeScript"],
    about: "You'll build full-stack web applications on the MERN stack, from database to React front-end.",
    do: [
      "Build React front-ends backed by Node/Express APIs",
      "Design MongoDB data models and APIs",
      "Deliver features end to end with tests",
      "Work closely with design and QA on releases",
    ],
    need: [
      "Hands-on React and Node.js/Express",
      "Good MongoDB knowledge",
      "Strong JavaScript/TypeScript",
      "Understanding of authentication and REST design",
    ],
    nice: ["Next.js", "Redux Toolkit / React Query", "AWS or Vercel deployment"],
  },
  python: {
    skills: ["Python", "Django", "FastAPI", "PostgreSQL", "REST APIs"],
    about: "You'll design and build reliable APIs, backends and automation with Python, Django and FastAPI.",
    do: [
      "Develop REST APIs with Django REST Framework or FastAPI",
      "Model data in PostgreSQL and write migrations",
      "Build background jobs, integrations and automation scripts",
      "Write tests and monitor services in production",
    ],
    need: [
      "Strong Python fundamentals",
      "Hands-on Django or FastAPI",
      "Good SQL and relational database design",
      "Understanding of API security basics",
    ],
    nice: ["Celery / Redis", "Docker", "Experience with LLM APIs or data processing"],
  },
  dotnetMvc: {
    skills: ["C#", "ASP.NET MVC", "Entity Framework", "SQL Server", "jQuery / JS"],
    about: "You'll build and maintain business web applications on ASP.NET MVC for enterprise clients.",
    do: [
      "Develop features in ASP.NET MVC with C#",
      "Work with SQL Server, stored procedures and Entity Framework",
      "Build and maintain Razor views and front-end scripts",
      "Fix issues and improve performance in existing systems",
    ],
    need: [
      "Strong C# and .NET Framework experience",
      "Hands-on ASP.NET MVC and Entity Framework",
      "Good SQL Server skills",
      "JavaScript and HTML/CSS for front-end work",
    ],
    nice: ["Migrating apps to .NET Core", "Web API", "Azure"],
  },
  dotnetCore: {
    skills: ["C#", "ASP.NET Core", "Web API", "SQL Server", "React / Angular"],
    about: "You'll build modern APIs and full-stack applications on ASP.NET Core.",
    do: [
      "Develop Web APIs and services in ASP.NET Core",
      "Build front-ends in React, Angular or Blazor as needed",
      "Design data models with EF Core and SQL Server",
      "Write tests and support CI/CD deployments",
    ],
    need: [
      "Strong C# and ASP.NET Core",
      "Experience with EF Core and SQL Server",
      "REST API design and authentication",
      "Hands-on with a modern front-end framework",
    ],
    nice: ["Azure App Service / Functions", "Microservices", "Docker"],
  },
  dotnetWebforms: {
    skills: ["C#", "ASP.NET Web Forms", "SQL Server", "ADO.NET", "JavaScript"],
    about: "You'll maintain and modernise business-critical ASP.NET Web Forms applications.",
    do: [
      "Maintain and enhance ASP.NET Web Forms applications",
      "Work with SQL Server and ADO.NET data access",
      "Fix bugs and improve stability and performance",
      "Help plan migration to modern .NET where suitable",
    ],
    need: [
      "Hands-on ASP.NET Web Forms and C#",
      "Good SQL Server and stored procedure skills",
      "JavaScript and HTML/CSS",
      "Ability to understand and improve legacy code",
    ],
    nice: ["ASP.NET MVC / Core", "Reporting tools (SSRS, Crystal)", "IIS administration"],
  },
  sharepoint: {
    skills: ["SharePoint Online", "Office 365", "SPFx", "Power Automate", "Power Apps"],
    about: "You'll build intranets, workflows and business apps on SharePoint and Microsoft 365.",
    do: [
      "Develop SharePoint Online sites, lists and SPFx web parts",
      "Automate business processes with Power Automate",
      "Build Power Apps for internal teams",
      "Manage permissions, migrations and governance",
    ],
    need: [
      "Hands-on SharePoint Online and Microsoft 365",
      "Experience with SPFx (React/TypeScript)",
      "Power Automate and Power Apps",
      "Understanding of permissions and information architecture",
    ],
    nice: ["Microsoft Graph API", "Teams apps", "SharePoint migration tools"],
  },
  php: {
    skills: ["PHP", "Laravel", "MySQL", "Vue / React", "REST APIs"],
    about: "You'll build web applications, APIs and admin systems with PHP and Laravel.",
    do: [
      "Develop features and APIs in Laravel",
      "Design MySQL schemas and write efficient queries",
      "Build front-end screens with Blade, Vue or React",
      "Integrate payment gateways and third-party services",
    ],
    need: [
      "Strong PHP (7.4+/8) and OOP",
      "Hands-on Laravel in production",
      "Good MySQL skills",
      "JavaScript and front-end basics",
    ],
    nice: ["Livewire / Inertia", "Queues and Redis", "AWS deployment"],
  },
  magento: {
    skills: ["Magento 2", "PHP", "MySQL", "Knockout.js", "E-commerce"],
    about: "You'll build and customise online stores on Magento 2 / Adobe Commerce.",
    do: [
      "Develop custom Magento 2 modules and themes",
      "Integrate payment, shipping and ERP systems",
      "Improve store performance and checkout conversion",
      "Handle upgrades, patches and extension conflicts",
    ],
    need: [
      "Hands-on Magento 2 development",
      "Strong PHP and MySQL",
      "Understanding of Magento architecture (DI, plugins, observers)",
      "Front-end theming with LESS and Knockout.js",
    ],
    nice: ["Adobe Commerce Cloud", "PWA Studio / Hyvä", "Magento certification"],
  },
  drupal: {
    skills: ["Drupal 9/10", "PHP", "Twig", "MySQL", "Symfony"],
    about: "You'll build content-rich websites and portals on Drupal.",
    do: [
      "Build Drupal sites, content types and views",
      "Develop custom modules and Twig themes",
      "Migrate content and upgrade older Drupal sites",
      "Optimise performance and security",
    ],
    need: [
      "Hands-on Drupal 9/10 development",
      "Strong PHP and Symfony basics",
      "Twig theming and front-end skills",
      "Experience with Composer and Drush",
    ],
    nice: ["Headless Drupal", "Acquia / Pantheon hosting", "Drupal certification"],
  },
  wordpress: {
    skills: ["WordPress", "PHP", "Gutenberg", "WooCommerce", "MySQL"],
    about: "You'll build fast, secure business websites and online stores on WordPress.",
    do: [
      "Develop custom themes and Gutenberg blocks",
      "Build and customise plugins and WooCommerce stores",
      "Improve site speed, SEO and security",
      "Maintain and update client websites",
    ],
    need: [
      "Hands-on custom WordPress theme and plugin development",
      "Good PHP, HTML, CSS and JavaScript",
      "Experience with WooCommerce",
      "Understanding of performance and security best practices",
    ],
    nice: ["Headless WordPress", "ACF Pro", "Page speed optimisation"],
  },
  ror: {
    skills: ["Ruby on Rails", "PostgreSQL", "Hotwire / React", "Sidekiq", "RSpec"],
    about: "You'll build and scale web applications with Ruby on Rails.",
    do: [
      "Develop features end to end in Ruby on Rails",
      "Design PostgreSQL schemas and optimise queries",
      "Build background jobs with Sidekiq",
      "Write RSpec tests and review code",
    ],
    need: [
      "Hands-on Ruby on Rails in production",
      "Good PostgreSQL and ActiveRecord skills",
      "Front-end with Hotwire or React",
      "Testing with RSpec or Minitest",
    ],
    nice: ["Rails upgrades", "Redis", "Heroku / AWS"],
  },
  android: {
    skills: ["Kotlin", "Android SDK", "Jetpack Compose", "MVVM", "REST APIs"],
    about: "You'll build high-quality native Android apps in Kotlin.",
    do: [
      "Develop Android apps with Kotlin and Jetpack Compose",
      "Implement clean architecture (MVVM) and offline support",
      "Integrate APIs, push notifications and payments",
      "Publish and maintain apps on the Google Play Store",
    ],
    need: [
      "Strong Kotlin and Android SDK",
      "Hands-on Jetpack components (Compose, Room, Navigation)",
      "Experience with coroutines and Flow",
      "Published apps on Google Play",
    ],
    nice: ["Firebase", "Kotlin Multiplatform", "App performance profiling"],
  },
  ios: {
    skills: ["Swift", "SwiftUI", "UIKit", "Combine", "REST APIs"],
    about: "You'll build polished native iOS apps in Swift.",
    do: [
      "Develop iOS apps with Swift, SwiftUI and UIKit",
      "Implement clean architecture and offline support",
      "Integrate APIs, push notifications and in-app purchases",
      "Publish and maintain apps on the App Store",
    ],
    need: [
      "Strong Swift and iOS SDK",
      "Hands-on SwiftUI and/or UIKit",
      "Experience with async/await or Combine",
      "Published apps on the App Store",
    ],
    nice: ["Core Data", "XCTest / XCUITest", "App Store optimisation"],
  },
  flutter: {
    skills: ["Flutter", "Dart", "Bloc / Riverpod", "Firebase", "REST APIs"],
    about: "You'll build beautiful cross-platform mobile apps for Android and iOS with Flutter.",
    do: [
      "Develop cross-platform apps with Flutter and Dart",
      "Manage state with Bloc, Provider or Riverpod",
      "Integrate APIs, Firebase and native features",
      "Release apps to Google Play and the App Store",
    ],
    need: [
      "Hands-on Flutter and Dart in production",
      "Good state-management experience",
      "Understanding of mobile UI/UX patterns",
      "Published apps on Play Store or App Store",
    ],
    nice: ["Platform channels (Kotlin/Swift)", "Flutter web", "CI/CD for mobile"],
  },
  reactNative: {
    skills: ["React Native", "TypeScript", "Redux / Zustand", "Expo", "REST APIs"],
    about: "You'll build cross-platform mobile apps with React Native and TypeScript.",
    do: [
      "Develop Android and iOS apps with React Native",
      "Manage state and data fetching",
      "Integrate native modules, push notifications and payments",
      "Release and maintain apps on both stores",
    ],
    need: [
      "Hands-on React Native in production",
      "Strong JavaScript/TypeScript and React",
      "Experience with navigation and state management",
      "Published apps on Play Store or App Store",
    ],
    nice: ["Expo EAS", "Native iOS/Android basics", "Detox / Jest testing"],
  },
  data: {
    skills: ["Python", "SQL", "Apache Spark", "Airflow", "AWS / Azure"],
    about: "You'll build data pipelines, warehouses and analytics that help clients make better decisions.",
    do: [
      "Build ETL/ELT pipelines from multiple data sources",
      "Model data in warehouses (Redshift, BigQuery, Snowflake)",
      "Orchestrate workflows with Airflow or similar tools",
      "Create datasets and dashboards for reporting",
    ],
    need: [
      "Strong SQL and Python",
      "Experience building ETL pipelines",
      "Knowledge of data modelling and warehousing",
      "Hands-on with at least one cloud data platform",
    ],
    nice: ["Spark / Databricks", "dbt", "Power BI or Tableau"],
  },
  aiml: {
    skills: ["Python", "PyTorch / TensorFlow", "scikit-learn", "LLMs", "MLOps"],
    about: "You'll build practical AI features, from classic machine learning to LLM-powered assistants.",
    do: [
      "Build, train and evaluate ML models for real use cases",
      "Develop LLM features: RAG, prompt design and evaluation",
      "Deploy models as APIs and monitor quality",
      "Work with product teams to turn ideas into features",
    ],
    need: [
      "Strong Python and ML fundamentals",
      "Hands-on PyTorch, TensorFlow or scikit-learn",
      "Experience with LLM APIs and vector databases",
      "Understanding of model evaluation and data quality",
    ],
    nice: ["MLOps (MLflow, SageMaker)", "NLP or computer vision", "FastAPI"],
  },
  iot: {
    skills: ["Python", "MQTT", "Raspberry Pi / ESP32", "AWS IoT", "Embedded C"],
    about: "You'll connect devices to the cloud and build IoT dashboards and automations.",
    do: [
      "Develop firmware and device software for sensors and gateways",
      "Build MQTT / cloud integrations for device data",
      "Create dashboards and alerting for device fleets",
      "Test hardware-software integration end to end",
    ],
    need: [
      "Python and/or Embedded C",
      "Experience with MQTT and IoT protocols",
      "Hands-on with Raspberry Pi, ESP32 or similar boards",
      "Basic cloud (AWS IoT / Azure IoT) knowledge",
    ],
    nice: ["Edge computing", "Node-RED", "Time-series databases"],
  },
  blockchain: {
    skills: ["Solidity", "Ethereum / EVM", "Web3.js / Ethers.js", "Hardhat", "Node.js"],
    about: "You'll build and integrate smart contracts and decentralised applications.",
    do: [
      "Write, test and deploy smart contracts in Solidity",
      "Integrate dApps with wallets using Ethers.js or Web3.js",
      "Follow security best practices and support audits",
      "Build supporting backend services in Node.js",
    ],
    need: [
      "Hands-on Solidity and EVM chains",
      "Experience with Hardhat or Foundry",
      "Understanding of smart contract security",
      "JavaScript/TypeScript for dApp integration",
    ],
    nice: ["Layer-2 networks", "Hyperledger", "Token standards (ERC-20/721/1155)"],
  },
  cloud: {
    skills: ["AWS", "Azure", "GCP", "Terraform", "Networking"],
    about: "You'll design, build and run secure cloud infrastructure for client applications.",
    do: [
      "Provision cloud infrastructure on AWS, Azure or GCP",
      "Automate infrastructure with Terraform",
      "Set up networking, security, backups and monitoring",
      "Optimise cloud costs and reliability",
    ],
    need: [
      "Hands-on experience with at least one major cloud",
      "Infrastructure as code (Terraform / CloudFormation)",
      "Networking, IAM and security fundamentals",
      "Linux administration",
    ],
    nice: ["Cloud certification", "Kubernetes", "Cost optimisation experience"],
  },
  devops: {
    skills: ["Docker", "Kubernetes", "CI/CD", "Terraform", "Linux"],
    about: "You'll automate how we build, test, ship and monitor software.",
    do: [
      "Build and maintain CI/CD pipelines",
      "Containerise applications and manage Kubernetes clusters",
      "Set up monitoring, logging and alerting",
      "Improve deployment speed, reliability and security",
    ],
    need: [
      "Hands-on Docker and CI/CD (GitHub Actions, GitLab, Jenkins)",
      "Experience with Kubernetes",
      "Linux and scripting (Bash / Python)",
      "Cloud experience (AWS, Azure or GCP)",
    ],
    nice: ["Helm / ArgoCD", "Prometheus / Grafana", "DevSecOps practices"],
  },
  rpa: {
    skills: ["UiPath", "Power Automate", "Automation Anywhere", "Python", "SQL"],
    about: "You'll automate repetitive business processes with RPA and scripting.",
    do: [
      "Analyse processes and design automation workflows",
      "Build bots in UiPath, Power Automate or Automation Anywhere",
      "Handle exceptions, logging and bot monitoring",
      "Document and support automations in production",
    ],
    need: [
      "Hands-on with at least one RPA platform",
      "Understanding of process analysis",
      "Basic scripting (Python, VB.NET or C#)",
      "SQL and Excel automation",
    ],
    nice: ["UiPath certification", "Document understanding / OCR", "API integrations"],
  },
  qaAutomation: {
    skills: ["Selenium", "Playwright / Cypress", "Java / TypeScript", "API testing", "CI/CD"],
    about: "You'll build automated test suites that keep our releases reliable.",
    do: [
      "Design and maintain UI and API automation frameworks",
      "Write automated tests with Selenium, Playwright or Cypress",
      "Run tests in CI/CD and report results",
      "Work with developers to reproduce and fix defects",
    ],
    need: [
      "Hands-on test automation in Java, Python or TypeScript",
      "Experience with Selenium, Playwright or Cypress",
      "API testing with Postman or REST Assured",
      "Good understanding of the testing lifecycle",
    ],
    nice: ["Mobile automation (Appium)", "BDD with Cucumber", "Performance testing basics"],
  },
  qaManual: {
    skills: ["Manual testing", "Test cases", "JIRA", "API testing", "SQL"],
    about: "You'll make sure every release works the way users expect.",
    do: [
      "Understand requirements and write clear test cases",
      "Perform functional, regression and UAT testing",
      "Log, track and verify defects in JIRA",
      "Test web and mobile apps across devices and browsers",
    ],
    need: [
      "Solid understanding of SDLC and STLC",
      "Experience writing test cases and bug reports",
      "Basic API testing with Postman",
      "Basic SQL for data validation",
    ],
    nice: ["Exposure to automation tools", "ISTQB certification", "Mobile testing"],
  },
  qaPerformance: {
    skills: ["JMeter", "LoadRunner", "Gatling / k6", "APM tools", "Performance tuning"],
    about: "You'll find and fix performance bottlenecks before users notice them.",
    do: [
      "Plan and run load, stress and endurance tests",
      "Build test scripts in JMeter, LoadRunner or k6",
      "Analyse results with APM tools and identify bottlenecks",
      "Recommend and verify performance improvements",
    ],
    need: [
      "Hands-on JMeter, LoadRunner, Gatling or k6",
      "Understanding of web architecture and databases",
      "Experience with APM tools (New Relic, Dynatrace, etc.)",
      "Ability to explain findings clearly",
    ],
    nice: ["Cloud load testing", "Database tuning", "Scripting in Java or Python"],
  },
  qaSecurity: {
    skills: ["OWASP", "Burp Suite", "Penetration testing", "VAPT", "API security"],
    about: "You'll test our applications for security weaknesses and help fix them.",
    do: [
      "Perform VAPT on web, mobile and API applications",
      "Test against the OWASP Top 10 and ASVS",
      "Report findings with clear risk ratings and fixes",
      "Re-test and help teams build secure habits",
    ],
    need: [
      "Hands-on web application security testing",
      "Experience with Burp Suite, OWASP ZAP or similar",
      "Good understanding of OWASP Top 10",
      "Clear technical reporting skills",
    ],
    nice: ["CEH / OSCP / eJPT", "Mobile app security", "Cloud security basics"],
  },
  ux: {
    skills: ["Figma", "User research", "Wireframing", "Prototyping", "Usability testing"],
    about: "You'll shape how our clients' products work, through research, flows and prototypes.",
    do: [
      "Run user research and translate findings into insights",
      "Create user journeys, wireframes and prototypes",
      "Test designs with users and iterate",
      "Work closely with UI designers and developers",
    ],
    need: [
      "A portfolio showing UX process, not just visuals",
      "Strong Figma skills",
      "Experience with research and usability testing",
      "Understanding of accessibility",
    ],
    nice: ["Design systems", "Analytics-driven design", "B2B / SaaS experience"],
  },
  ui: {
    skills: ["Figma", "Visual design", "Design systems", "Illustration", "Adobe CC"],
    about: "You'll create beautiful, consistent interfaces and brand visuals for web and mobile.",
    do: [
      "Design high-fidelity web and mobile interfaces",
      "Build and maintain design systems and component libraries",
      "Create graphics, icons and marketing visuals",
      "Hand off clean, developer-ready designs",
    ],
    need: [
      "A strong portfolio of web and mobile UI work",
      "Expert Figma skills",
      "Excellent typography, colour and layout sense",
      "Adobe Photoshop / Illustrator",
    ],
    nice: ["Motion design", "3D / illustration", "Basic HTML/CSS"],
  },
  frontendDesigner: {
    skills: ["HTML5", "CSS3 / SCSS", "JavaScript", "Tailwind CSS", "Figma"],
    about: "You'll turn designs into pixel-perfect, responsive and accessible HTML/CSS.",
    do: [
      "Convert Figma designs into responsive HTML/CSS",
      "Build reusable UI components and style guides",
      "Add interactions and animations with JavaScript",
      "Ensure cross-browser compatibility and accessibility",
    ],
    need: [
      "Expert HTML5, CSS3/SCSS and responsive design",
      "Good JavaScript",
      "Experience with Tailwind or Bootstrap",
      "An eye for detail and design quality",
    ],
    nice: ["React basics", "GSAP / CSS animations", "Email template coding"],
  },
  architectGeneric: {
    skills: ["System design", "Microservices", "Cloud", "Security", "DevOps"],
    about: "You'll design scalable, secure solutions and guide teams to build them well.",
    do: [
      "Design end-to-end architecture for client solutions",
      "Choose technologies and define standards",
      "Review designs and code for quality and scalability",
      "Support pre-sales with solution proposals and estimates",
    ],
    need: [
      "Deep experience designing production systems",
      "Strong knowledge of cloud, microservices and integration patterns",
      "Security, performance and reliability expertise",
      "Excellent communication with clients and teams",
    ],
    nice: ["Cloud architect certification", "TOGAF", "Domain experience (BFSI, retail, health)"],
  },
  mobileArchitect: {
    skills: ["iOS", "Android", "React Native", "Flutter", "Mobile security"],
    about: "You'll set the technical direction for our mobile apps across native and cross-platform stacks.",
    do: [
      "Define mobile architecture across native and cross-platform apps",
      "Choose the right stack for each client project",
      "Set standards for performance, security and releases",
      "Mentor mobile developers and review code",
    ],
    need: [
      "Deep experience with native and cross-platform mobile",
      "Strong understanding of mobile security and offline sync",
      "Experience with CI/CD for mobile",
      "Clear communication with clients and teams",
    ],
    nice: ["Ionic / Capacitor", "Mobile backend (BaaS)", "App store optimisation"],
  },
  pm: {
    skills: ["Agile / Scrum", "JIRA", "Stakeholder management", "Planning", "Risk management"],
    about: "You'll keep client projects on track, on scope and clearly communicated.",
    do: [
      "Plan sprints, timelines and resources",
      "Run Scrum ceremonies and remove blockers",
      "Communicate progress and risks to clients",
      "Manage scope changes and delivery quality",
    ],
    need: [
      "Experience delivering software projects with Agile/Scrum",
      "Hands-on with JIRA or similar tools",
      "Excellent written and spoken English",
      "Strong organisation and stakeholder skills",
    ],
    nice: ["CSM / PSM / PMP", "Technical background", "Client-facing experience abroad"],
  },
  productOwner: {
    skills: ["Product strategy", "Backlog management", "User stories", "Agile", "Analytics"],
    about: "You'll define what we build and why, turning business goals into clear product backlogs.",
    do: [
      "Own and prioritise the product backlog",
      "Write user stories with clear acceptance criteria",
      "Work with clients, design and engineering on the roadmap",
      "Measure outcomes and iterate",
    ],
    need: [
      "Experience as a product owner or product manager",
      "Strong analytical and communication skills",
      "Experience with Agile and JIRA",
      "Ability to balance business, user and technical needs",
    ],
    nice: ["CSPO", "SaaS product experience", "Data / SQL basics"],
  },
  kam: {
    skills: ["Account management", "Client relations", "Upselling", "Reporting", "CRM"],
    about: "You'll look after key client relationships and make sure they get great value from us.",
    do: [
      "Act as the main contact for key accounts",
      "Coordinate delivery teams and track project health",
      "Identify upsell and cross-sell opportunities",
      "Prepare account reports and reviews",
    ],
    need: [
      "Experience managing clients in IT services",
      "Excellent communication and relationship skills",
      "Good understanding of software delivery",
      "Comfortable with CRM tools",
    ],
    nice: ["International client experience", "Basic technical background", "MBA"],
  },
  bizdev: {
    skills: ["B2B sales", "Lead qualification", "Proposals", "Negotiation", "CRM"],
    about: "You'll help grow Mindsoft by finding and winning new clients for our IT services.",
    do: [
      "Identify and reach prospective clients",
      "Understand needs and prepare proposals with the delivery team",
      "Negotiate and close deals",
      "Maintain a healthy pipeline in the CRM",
    ],
    need: [
      "Experience in B2B / IT services sales (or strong interest for freshers)",
      "Excellent written and spoken English",
      "Confident communication and presentation skills",
      "Self-driven and target-oriented",
    ],
    nice: ["International market experience", "LinkedIn Sales Navigator", "Understanding of software projects"],
  },
  leadgen: {
    skills: ["Lead research", "LinkedIn outreach", "Cold email", "CRM", "Data tools"],
    about: "You'll find and qualify potential clients and set up conversations for our sales team.",
    do: [
      "Research target companies and decision makers",
      "Run outreach via LinkedIn and email",
      "Qualify leads and book meetings",
      "Keep lead data clean in the CRM",
    ],
    need: [
      "Experience in B2B lead generation",
      "Good written English",
      "Comfort with LinkedIn, Apollo or similar tools",
      "Organised and consistent",
    ],
    nice: ["IT services experience", "Email deliverability knowledge", "Copywriting"],
  },
  marcom: {
    skills: ["Brand communication", "Content", "Social media", "Campaigns", "Analytics"],
    about: "You'll shape how Mindsoft talks about itself, across the website, social media and campaigns.",
    do: [
      "Plan and run marketing campaigns",
      "Create and manage content for website and social media",
      "Coordinate with design on brand materials",
      "Track performance and improve results",
    ],
    need: [
      "Experience in marketing communications",
      "Excellent written English",
      "Social media and campaign experience",
      "Basic analytics skills",
    ],
    nice: ["B2B tech marketing", "SEO knowledge", "Design tools (Canva / Figma)"],
  },
  content: {
    skills: ["Content writing", "SEO", "Technical writing", "Editing", "Research"],
    about: "You'll write clear, useful content about technology for business readers.",
    do: [
      "Write blogs, case studies and website copy",
      "Research technical topics and explain them simply",
      "Optimise content for search",
      "Edit and proofread for quality",
    ],
    need: [
      "Excellent written English",
      "Experience writing about technology or B2B topics",
      "Good understanding of SEO basics",
      "A portfolio of published work",
    ],
    nice: ["Technical documentation", "Social media writing", "CMS experience"],
  },
  payroll: {
    skills: ["Payroll processing", "Statutory compliance", "Excel", "HRMS", "Attendance"],
    about: "You'll make sure everyone at Mindsoft is paid accurately and on time.",
    do: [
      "Process monthly payroll accurately",
      "Handle PF, ESI, PT, TDS and other statutory compliance",
      "Maintain attendance and leave records",
      "Answer employee payroll queries",
    ],
    need: [
      "Experience in end-to-end payroll",
      "Knowledge of Indian statutory compliance",
      "Strong Excel skills",
      "Accuracy and confidentiality",
    ],
    nice: ["HRMS tools (Keka, Zoho People, greytHR)", "Full and final settlements", "Basic accounting"],
  },
  pricing: {
    skills: ["Financial analysis", "Pricing models", "Excel", "Cost analysis", "Reporting"],
    about: "You'll help price our projects and services so they are fair to clients and sustainable for us.",
    do: [
      "Build pricing and cost models for proposals",
      "Analyse project margins and profitability",
      "Prepare reports for management",
      "Support sales with pricing inputs",
    ],
    need: [
      "Experience in FP&A or pricing analysis",
      "Advanced Excel and financial modelling",
      "Strong analytical skills",
      "Clear communication of numbers",
    ],
    nice: ["IT services pricing", "Power BI", "CA / MBA Finance"],
  },
} satisfies Record<string, Profile>;

export type ProfileKey = keyof typeof profiles;

/** Extra duties and requirements added by seniority. */
export const levels = {
  intern: {
    do: ["Work on real features with guidance from a mentor", "Learn code reviews, Git workflows and testing", "Document what you build"],
    need: ["Pursuing or recently completed a relevant degree or diploma", "At least one personal or academic project to show", "Eagerness to learn and ask questions"],
  },
  fresher: {
    do: ["Learn our process with guidance from senior colleagues", "Take ownership of small, well-defined tasks"],
    need: ["Graduate in a relevant field", "Strong communication and willingness to learn"],
  },
  ic: {
    do: ["Take part in planning, estimation and code reviews", "Communicate progress clearly with the team and clients"],
    need: ["Comfortable with Git and pull-request workflows", "Good communication in English"],
  },
  lead: {
    do: [
      "Lead a team of developers and own technical decisions",
      "Break down requirements, estimate and plan sprints",
      "Review code and mentor team members",
      "Work directly with clients on technical discussions",
    ],
    need: ["Experience leading a team of 3+ engineers", "Strong code review and mentoring skills", "Excellent communication with clients"],
  },
  architect: {
    do: [
      "Define architecture, coding standards and best practices",
      "Review designs for scalability, security and performance",
      "Guide multiple teams and resolve complex technical problems",
      "Support pre-sales with solution design and estimates",
    ],
    need: ["Experience architecting large production systems", "Ability to explain technical trade-offs to non-technical stakeholders"],
  },
  manager: {
    do: ["Lead and grow the team, including hiring and reviews", "Set goals, processes and quality standards", "Report to management on progress and risks"],
    need: ["Experience managing a team and its results", "Strong leadership and planning skills"],
  },
  specialist: {
    do: ["Collaborate with teams across the company", "Keep clear records and report on your work"],
    need: ["Strong organisation and attention to detail", "Good communication in English"],
  },
} as const;

export type LevelKey = keyof typeof levels;

export const perks = [
  { t: "Remote-first", d: "Work from anywhere in India with clear, async-friendly communication." },
  { t: "Learn from seniors", d: "Regular code and design reviews, pairing and mentoring." },
  { t: "Real ownership", d: "Own features and see them used by real businesses." },
  { t: "Flexible hours", d: "Plan your day around deep work, with shared overlap hours." },
  { t: "Modern stack", d: "Work with current tools and frameworks, not legacy-only projects." },
  { t: "Room to grow", d: "Clear feedback and a path to lead, specialise or architect." },
];
