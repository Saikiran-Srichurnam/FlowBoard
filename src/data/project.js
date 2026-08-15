import AdminImg from "../assets/projectImages/admin-dashboard.jpg";
import EcommerceImg from "../assets/projectImages/e-commerce-platform.jpg";
import FlowBoard from "../assets/projectImages/flowboard.jpg";
import MarketingImg from "../assets/projectImages/marketing-website.jpg";
import MobileImg from "../assets/projectImages/mobile-application.jpg";
import PortfolioImg from "../assets/projectImages/portfolio-website.jpg";

export const projects = [
  {
    id: 1,
    image: FlowBoard,
    name: "FlowBoard SaaS",
    description: "Project management platform for modern teams.",
    status: "Active",
    progress: 75,
    dueDate: "Aug 20, 2026",
    tasks: 24,
    members: ["Saikiran", "Rahul", "Priya", "Ankit"],
  },

  {
    id: 2,
    image: EcommerceImg,
    name: "E-Commerce Platform",
    description: "Modern shopping experience for online customers.",
    status: "Active",
    progress: 60,
    dueDate: "Aug 25, 2026",
    tasks: 42,
    members: ["Rahul", "Priya", "Ankit"],
  },

  {
    id: 3,
    image: MarketingImg,
    name: "Marketing Website",
    description: "Company marketing website and landing pages.",
    status: "Completed",
    progress: 100,
    dueDate: "Aug 15, 2026",
    tasks: 18,
    members: ["Priya", "Saikiran"],
  },

  {
    id: 4,
    image: MobileImg,
    name: "Mobile Application",
    description: "Cross-platform mobile application for customers.",
    status: "Active",
    progress: 45,
    dueDate: "Sep 05, 2026",
    tasks: 31,
    members: ["Rahul", "Ankit", "Priya"],
  },

  {
    id: 5,
    image: AdminImg,
    name: "Admin Dashboard",
    description: "Internal dashboard for managing business operations.",
    status: "On Hold",
    progress: 35,
    dueDate: "Sep 10, 2026",
    tasks: 16,
    members: ["Saikiran", "Rahul"],
  },

  {
    id: 6,
    image: PortfolioImg,
    name: "Portfolio Website",
    description: "Personal portfolio website for showcasing projects.",
    status: "Completed",
    progress: 100,
    dueDate: "Aug 10, 2026",
    tasks: 12,
    members: ["Saikiran"],
  },
];