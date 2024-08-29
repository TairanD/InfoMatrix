import React from "react";

import { lazy } from "react";
import { Navigate } from "react-router-dom";
import Loadable from "./components-staff/Loadable";

import AuthGuard from "../app/auth/AuthGuard";
import { authRoles } from "../app/auth/authRoles";

import MatxLayout from "../app/components/MatxLayout/MatxLayout";

import materialRoutes from "../app/views/material-kit/MaterialRoutes";



// // Elements
// const BackToTop = Loadable(lazy(() => import("./elements/back-top")));
// const PageScrollTop = Loadable(lazy(() => import("./elements/page-scroll-top")));

// Home Pages
const Index = Loadable(lazy(() => import("./pages/index")));
const Index2 = Loadable(lazy(() => import("./pages/index-2")));
const Index3 = Loadable(lazy(() => import("./pages/index-3")));
const IndexInfoMatrix = Loadable(lazy(() => import("./pages-infoMatrix/index-infoMatrix")));

// About Us
const About1 = Loadable(lazy(() => import("./pages/about-1")));
const About2 = Loadable(lazy(() => import("./pages/about-2")));

// Events
const Events = Loadable(lazy(() => import("./pages/event")));
const EventsDetails = Loadable(lazy(() => import("./pages/events-details")));

// Faq
const Faq1 = Loadable(lazy(() => import("./pages/faq-1")));
const Faq2 = Loadable(lazy(() => import("./pages/faq-2")));

// Other Pages
const Portfolio = Loadable(lazy(() => import("./pages/portfolio")));
const Profile = Loadable(lazy(() => import("./pages/profile")));
const Membership = Loadable(lazy(() => import("./pages/membership")));
const Error404 = Loadable(lazy(() => import("./pages/error-404")));
const Register = Loadable(lazy(() => import("./pages-infoMatrix/register")));
const Login = Loadable(lazy(() => import("./pages-infoMatrix/login")));
const ForgetPassword = Loadable(lazy(() => import("./pages/forget-password")));

// Courses
const Courses = Loadable(lazy(() => import("./pages/courses")));
const CoursesDetails = Loadable(lazy(() => import("./pages/courses-details")));

// Blog Pages
const BlogClassicGrid = Loadable(lazy(() => import("./pages/blog-classic-grid")));
const BlogClassicSidebar = Loadable(lazy(() => import("./pages/blog-classic-sidebar")));
const BlogListSidebar = Loadable(lazy(() => import("./pages/blog-list-sidebar")));
const BlogStandardSidebar = Loadable(lazy(() => import("./pages/blog-standard-sidebar")));
const BlogDetails = Loadable(lazy(() => import("./pages/blog-details")));
// const UploadBlog = Loadable(lazy(() => import("./pages-infoMatrix/forum-upload-blog")))

// Contact Us
const Contact1 = Loadable(lazy(() => import("./pages/contact-1")));
const Contact2 = Loadable(lazy(() => import("./pages/contact-2")));
const ContactUs = Loadable(lazy(() => import("./pages-infoMatrix/contact-us")));

// Question Bank
const QuestionBank = Loadable(lazy(() => import("./pages-infoMatrix/question-bank")));
const SpecificQuestion = Loadable(lazy(() => import("./pages-infoMatrix/question-specific")));

// Forum
const ForumIndex = Loadable(lazy(() => import("./pages-infoMatrix/forum-index")));
const ForumStudy = Loadable(lazy(() => import("./pages-infoMatrix/forum-study")));
const ForumJob = Loadable(lazy(() => import("./pages-infoMatrix/forum-job")));
const ForumSpecificOrg = Loadable(lazy(() => import("./pages-infoMatrix/forum-specific-org")));
const ForumSpecific = Loadable(lazy(() => import("./pages-infoMatrix/forum-specific")));

// She Power
const ShePower = Loadable(lazy(() => import("./pages-infoMatrix/she-power")));

// Programming
const IDESearch = Loadable(lazy(() => import("./pages-infoMatrix/IDE-search")));

// IDE
const IDE = Loadable(lazy(() => import("./pages-infoMatrix/IDE")));

//AI
const AI = Loadable(lazy(() => import("./pages-infoMatrix/test-ai")));

// Profile
const PersonalPage = Loadable(lazy(() => import("./pages-infoMatrix/personal")));
const EditYourProfile = Loadable(lazy(() => import("./elements/profile-content/edit-your-profile")));
const UploadBlog = Loadable(lazy(() => import("./pages-infoMatrix/forum-upload-blog")));
// const UploadBlogClass = Loadable(lazy(() => import("./pages-infoMatrix/backup1/forum-upload-blog")));
const Posts = Loadable(lazy(() => import("./elements/profile-content/posts")));
const YourForumSpecific = Loadable(lazy(() => import("./pages-infoMatrix/your-forum-specific")));

// SESSION PAGES (sample staff portals)
const NotFound = Loadable(lazy(() => import("../app/views/sessions/NotFound")));
const JwtLogin = Loadable(lazy(() => import("../app/views/sessions/JwtLogin")));
const JwtRegister = Loadable(lazy(() => import("../app/views/sessions/JwtRegister")));
const ForgotPassword = Loadable(lazy(() => import("../app/views/sessions/ForgotPassword")));
const AppEchart = Loadable(lazy(() => import("../app/views/charts/echarts/AppEchart")));
const Analytics = Loadable(lazy(() => import("../app/views/dashboard/Analytics")));

// Staff Portal
const Dashboard = Loadable(lazy(() => import("./pages-staff/dashboard")))
const AdminUser = Loadable(lazy(() => import("./pages-staff/admin-user")))
const AdminQuestion = Loadable(lazy( () => import("./pages-staff/admin-question")))
const AdminCoding = Loadable(lazy( () => import("./pages-staff/admin-coding")))
const AdminAnswer = Loadable(lazy( () => import("./pages-staff/admin-answer")))
const AdminPosts = Loadable(lazy( () => import("./pages-staff/admin-posts")))
const AdminOrganization = Loadable(lazy( () => import("./pages-staff/admin-organization")))
const Homepage = Loadable(lazy( () => import("./pages-staff/HomePage")))


const routes = [
  { path: "/", element: <IndexInfoMatrix /> },
  { path: "/index-1", element: <Index /> },
  { path: "/index-2", element: <Index2 /> },
  { path: "/index-3", element: <Index3 /> },

  // Question Bank
  { path: "/question-bank", element: <QuestionBank /> },
  { path: "/specific-question/:q_id", element: <SpecificQuestion /> },

  // She Power
  { path: "/she-power", element: <ShePower /> },

            

  // Forum
  { path: "/forum", element: <ForumIndex /> },
  { path: "/forum/study", element: <ForumStudy /> },
  { path: "/forum/job", element: <ForumJob /> },
  { path: "/forum/study/:org_id", element: <ForumSpecificOrg /> },
  { path: "/forum/job/:org_id", element: <ForumSpecificOrg /> },
  // post_info // post_id
  { path: "/forum/study/:org_id/post/:post_info", element: <ForumSpecific /> },
  { path: "/forum/job/:org_id/post/:post_info", element: <ForumSpecific /> },
  { path: "/your-forum/job/:org_id/post/:post_id", element: <YourForumSpecific /> },
  { path: "/your-forum/study/:org_id/post/:post_id", element: <YourForumSpecific /> },
  { path: "/forum/upload", element: <UploadBlog />  },
    
    
  // IDE Pages
  { path: "/IDE-search", element: <IDESearch /> },
  { path: "/IDE/:q_id", element: <IDE /> },
  // Dynamic Programming Question Page
  // { path: "/code_question/:id", element: <CodeComponent /> },

    // AI Components
    { path:"/test_ai", element: <AI />},

  // About Us
  { path: "/about-1", element: <About1 /> },
  { path: "/about-2", element: <About2 /> },

  // Events
  { path: "/event", element: <Events /> },
  { path: "/events-details", element: <EventsDetails /> },

  // Faq
  { path: "/faq-1", element: <Faq1 /> },
  { path: "/faq-2", element: <Faq2 /> },

  // Other Pages
  { path: "/portfolio", element: <Portfolio /> },
  { path: "/profile", element: <Profile /> },
  { path: "/membership", element: <Membership /> },
  { path: "/error-404", element: <Error404 /> },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
  { path: "/forget-password", element: <ForgetPassword /> },
    
  // Courses
  { path: "/courses", element: <Courses /> },
  { path: "/courses-details", element: <CoursesDetails /> },

  // Personal Pages
  { path: "/personal/:u_id", element: <PersonalPage /> },
  { path: "/edit-profile", element: <EditYourProfile /> },
    { path: "/your-posts", element: <Posts /> },

  // Blog Pages
  { path: "/blog-classic-grid", element: <BlogClassicGrid /> },
  { path: "/blog-classic-sidebar", element: <BlogClassicSidebar /> },
  { path: "/blog-list-sidebar", element: <BlogListSidebar /> },
  { path: "/blog-standard-sidebar", element: <BlogStandardSidebar /> },
  { path: "/blog-details", element: <BlogDetails /> },
  { path: "/forum/upload", element: <UploadBlog /> },

  // Contact Us
  { path: "/contact-us", element: <ContactUs /> },
  { path: "/contact-1", element: <Contact1 /> },
  { path: "/contact-2", element: <Contact2 /> },

  {
    element: (

    <MatxLayout />

    ),
    children: [
      ...materialRoutes,
      // dashboard route
      { path: "/dashboard/default", element: <Analytics /> },
      // e-chart route
      { path: "/charts/echarts", element: <AppEchart /> }
    ]
  },

  // session pages route
  { path: "/session/404", element: <NotFound /> },
  { path: "/session/signin", element: <JwtLogin /> },
  { path: "/session/signup", element: <JwtRegister /> },
  { path: "/session/forgot-password", element: <ForgotPassword /> },
  { path: "*", element: <NotFound /> },

  // staff portal
  { path: "/staff", element: <Dashboard /> },
  { path: "/staff/user", element: <AdminUser /> },
  { path: "/staff/question", element: <AdminQuestion /> },
  { path: "/staff/coding-question", element: <AdminCoding/> },
  { path: "/staff/answers", element: <AdminAnswer /> },
  { path: "/staff/organizations", element: <AdminOrganization /> },
  { path: "/staff/posts", element: <AdminPosts/> },
    { path: "/staff-new", element: <Homepage/> },
];

export default routes;
