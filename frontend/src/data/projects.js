// frontend/src/data/projects.js
//
// Single source of truth for portfolio projects.
// Features LuminaCare (Primary Java Microservices Project) alongside secondary supporting projects.

export const projectsData = [
  {
    id: 1,
    title: "LuminaCare - Doctor Appointment Booking Platform",
    tagline: "Healthcare microservices platform engineered with Java, Spring Boot, Kafka, Redis, and Stripe.",
    description:
      "LuminaCare is an enterprise-grade healthcare microservices platform designed for scalable doctor discovery, appointment scheduling, real-time event notifications, and secure payment processing. Built using Domain-Driven Design (DDD) and Event-Driven Architecture, it decouples core business domains into resilient Spring Boot microservices backed by Redis caching, Kafka message streams, and Spring Cloud infrastructure.",
    category: "Java Microservices",
    featured: true,
    isPrimary: true,
    screenshot: null,
    screenshots: [],
    duration: "3.2 Years",
    architecturePattern: "Microservices + Domain-Driven Design + Event-Driven Architecture",
    tech: [
      "Java",
      "Spring Boot",
      "Spring Cloud",
      "Spring Security",
      "Microservices",
      "Kafka",
      "Redis",
      "MySQL",
      "Spring Data JPA",
      "Hibernate",
      "Stripe SDK",
      "Twilio",
      "REST API",
      "Docker",
    ],
    techStack: [
      "Java 8 / 17",
      "Spring Boot",
      "Spring MVC",
      "Spring Cloud Gateway",
      "Eureka Server",
      "Zipkin",
      "Spring Boot Admin",
      "Spring Security",
      "JWT",
      "Hibernate",
      "JPA",
      "Feign Client",
      "Stripe SDK",
      "Twilio API",
      "Redis",
      "MySQL",
      "Apache Kafka",
      "Maven",
      "SLF4J / Logback",
      "Swagger / OpenAPI",
    ],
    github: null, // Private / Corporate Enterprise project
    githubNote: "Enterprise Microservices Architecture Spec & Documentation",
    live: null,
    liveDemo: null,
    modules: [
      {
        name: "Patient Service",
        description:
          "Handles secure patient registration, authentication, and profile management using Spring Security and JWT. Enforces Role-Based Access Control (RBAC) for Admin and Patient roles with structured SLF4J/Logback audit logging.",
      },
      {
        name: "Doctor Service",
        description:
          "Manages doctor profile CRUD operations, medical specializations, clinic locations, years of experience, and recurring availability schedules optimized via Hibernate/JPA ORM query tuning.",
      },
      {
        name: "Appointment Service",
        description:
          "Executes appointment bookings, slot availability checks, confirmation code generation, rescheduling, and cancellations with Redis distributed caching for instant availability retrieval.",
      },
      {
        name: "Booking & Notification Service",
        description:
          "Event-driven messaging engine consuming Kafka topics to trigger real-time Twilio SMS and email notifications, booking confirmation dispatches, and automated appointment reminders.",
      },
      {
        name: "Payment Service",
        description:
          "Integrates Stripe SDK for secure consultation fee payments, transaction validation, invoice generation, and financial audit records.",
      },
      {
        name: "Search & Filter Service",
        description:
          "High-performance query service utilizing Spring Data JPA specifications to filter doctors by name, specialization, location, fee ranges, ratings, and online/offline consultation availability.",
      },
      {
        name: "Infrastructure & Observability",
        description:
          "Spring Cloud API Gateway for centralized routing, rate limiting, and auth filters; Eureka Server for service discovery; Zipkin for distributed tracing; and Spring Boot Admin for central cluster metrics.",
      },
    ],
    features: [
      "Decoupled microservices architecture designed with Domain-Driven Design (DDD) principles",
      "Stateless JWT authentication & RBAC authorization implemented via Spring Security filter chain",
      "Asynchronous event-driven messaging with Apache Kafka for booking updates & Twilio SMS/Email alerts",
      "Distributed Redis caching layer for doctor schedule lookup and slot availability validation",
      "Stripe payment gateway integration for consultation fee validation and checkout processing",
      "Centralized Spring Cloud API Gateway with rate limiting, authentication, and routing",
      "Service discovery with Netflix Eureka Server and inter-service communication with OpenFeign clients",
      "Distributed tracing with Zipkin and centralized health monitoring via Spring Boot Admin",
      "Interactive API documentation generated using Swagger UI / OpenAPI 3 specification",
    ],
    challenges: [
      "Preventing double-booking race conditions during peak hours by leveraging Redis slot locking and database transaction isolation",
      "Maintaining distributed transaction state across Payment and Booking services using event-driven saga orchestration via Kafka",
      "Optimizing JPA query performance and indexing strategies to eliminate N+1 fetch issues across complex doctor-schedule relations",
    ],
    learnings: [
      "Gained 3.2 years of practical experience architecting and maintaining production-grade Spring Boot microservices",
      "Mastered event-driven asynchronous communication patterns using Kafka producers, consumer groups, and topic partitioning",
      "Engineered resilient inter-service calls using OpenFeign, Resilience4j circuit breakers, and Eureka service registries",
    ],
    improvements: [
      "Implement Elasticsearch for instant full-text doctor and medical keyword search",
      "Containerize microservices cluster using Docker Compose and Kubernetes Helm charts",
      "Deploy Prometheus and Grafana dashboards for custom microservice metrics monitoring",
    ],
  },
  {
    id: 2,
    title: "Lithub - Library Management System",
    tagline: "Full-stack library management application with role-based auth and book catalog CRUD.",
    description:
      "Lithub is a complete library management system enabling users to browse, borrow, and manage catalog books. It features role-based authentication, a responsive React frontend, and a Node.js/Express REST backend connected to MongoDB for persistent storage.",
    category: "Full Stack",
    featured: false,
    isPrimary: false,
    screenshot: null,
    screenshots: [],
    tech: ["React", "Node.js", "MongoDB", "Express", "REST API"],
    techStack: ["React", "Node.js", "MongoDB", "Express", "REST API"],
    github: "https://github.com/Priyanshu7354/lithub",
    live: null,
    liveDemo: null,
    features: [
      "Role-based authentication (Admin & User roles)",
      "Full CRUD operations for managing book inventory and checkouts",
      "Search and filter by genre, author, and availability status",
      "Responsive UI with real-time field validation",
      "RESTful API with clean error handling middleware",
    ],
    challenges: [
      "Implementing secure JWT-based auth with refresh token handling",
      "Designing flexible database schema for book-user borrowing relationships",
    ],
    learnings: [
      "Deepened understanding of token-based authentication patterns",
      "Learned schema design best practices for document databases",
    ],
    improvements: [
      "Add real-time notifications for book return due dates",
      "Implement book recommendation engine",
    ],
  },
  {
    id: 3,
    title: "Chatty - Real-Time Chat Application",
    tagline: "Real-time messaging application powered by WebSockets, Express, and React.",
    description:
      "Chatty is a real-time messaging application built with React and Socket.io. It supports multiple chat rooms, live typing indicators, online presence tracking, and delivers messages with sub-100ms latency.",
    category: "Full Stack",
    featured: false,
    isPrimary: false,
    screenshot: null,
    screenshots: [],
    tech: ["React", "Socket.io", "Express", "Node.js", "CSS"],
    techStack: ["React", "Socket.io", "Express", "Node.js", "CSS"],
    github: "https://github.com/Priyanshu7354/chatty",
    live: null,
    liveDemo: null,
    features: [
      "Real-time messaging with Socket.io event triggers",
      "Multiple chat rooms with room-based isolation",
      "Live typing indicators and user online status",
      "Message history persistence",
    ],
    challenges: [
      "Managing WebSocket connection lifecycle across reconnects",
      "Scaling rooms without leaking event listeners",
    ],
    learnings: [
      "Mastered WebSocket event-driven architecture",
      "Learned strategies for real-time state synchronization",
    ],
    improvements: [
      "Add end-to-end encryption for private messages",
      "Implement file and media sharing",
    ],
  },
];