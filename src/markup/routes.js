// libraries
import React, { lazy } from "react";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import Loadable from "./components-staff/Loadable";

// Home Pages
const Index = Loadable(lazy(() => import("./pages/index")));
const Index2 = Loadable(lazy(() => import("./pages/index-2")));
const Index3 = Loadable(lazy(() => import("./pages/index-3")));
const IndexInfoMatrix = Loadable(
  lazy(() => import("./pages-infoMatrix/index-infoMatrix"))
);

// About Us
const About1 = Loadable(lazy(() => import("./pages/about-1")));
const About2 = Loadable(lazy(() => import("./pages-infoMatrix/about-2")));

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
const BlogClassicGrid = Loadable(
  lazy(() => import("./pages/blog-classic-grid"))
);
const BlogClassicSidebar = Loadable(
  lazy(() => import("./pages/blog-classic-sidebar"))
);
const BlogListSidebar = Loadable(
  lazy(() => import("./pages/blog-list-sidebar"))
);
const BlogStandardSidebar = Loadable(
  lazy(() => import("./pages/blog-standard-sidebar"))
);
const BlogDetails = Loadable(lazy(() => import("./pages/blog-details")));
// const UploadBlog = Loadable(lazy(() => import("./pages-infoMatrix/forum-upload-blog")))

// Contact Us
const Contact1 = Loadable(lazy(() => import("./pages/contact-1")));
const Contact2 = Loadable(lazy(() => import("./pages/contact-2")));
const ContactUs = Loadable(lazy(() => import("./pages-infoMatrix/contact-us")));

// Question Bank
const QuestionBank = Loadable(
  lazy(() => import("./pages-infoMatrix/question-bank"))
);
const SpecificQuestion = Loadable(
  lazy(() => import("./pages-infoMatrix/question-specific"))
);

// Forum
const ForumIndex = Loadable(
  lazy(() => import("./pages-infoMatrix/forum-index"))
);
const ForumStudy = Loadable(
  lazy(() => import("./pages-infoMatrix/forum-study"))
);
const ForumJob = Loadable(lazy(() => import("./pages-infoMatrix/forum-job")));
const ForumSpecificOrg = Loadable(
  lazy(() => import("./pages-infoMatrix/forum-specific-org"))
);
const ForumSpecific = Loadable(
  lazy(() => import("./pages-infoMatrix/forum-specific"))
);

// She Power
const ShePower = Loadable(lazy(() => import("./pages-infoMatrix/she-power")));
const WeRaceAsOne = Loadable(
  lazy(() => import("./pages-infoMatrix/we-race-as-one"))
);
const ShareYourFeeling = Loadable(
  lazy(() => import("./pages-infoMatrix/share-your-feeling"))
);

const ShePosts = Loadable(
    lazy(() => import("./pages-infoMatrix/she-posts"))
)

// Programming
const IDESearch = Loadable(lazy(() => import("./pages-infoMatrix/IDE-search")));
const IDE = Loadable(lazy(() => import("./pages-infoMatrix/IDE")));

//AI
const AI = Loadable(lazy(() => import("./pages-infoMatrix/test-ai")));

// Profile
const PersonalPage = Loadable(
  lazy(() => import("./pages-infoMatrix/personal"))
);
const EditYourProfile = Loadable(
  lazy(() => import("./elements/profile-content/edit-your-profile"))
);
const UploadBlog = Loadable(
  lazy(() => import("./pages-infoMatrix/forum-upload-blog"))
);
const MyInfoMatrix = Loadable(
  lazy(() => import("./pages-infoMatrix/my-infomatrix"))
);
// const UploadBlogClass = Loadable(lazy(() => import("./pages-infoMatrix/backup1/forum-upload-blog")));
const Posts = Loadable(lazy(() => import("./elements/profile-content/posts")));
const YourForumSpecific = Loadable(
  lazy(() => import("./pages-infoMatrix/your-forum-specific"))
);

// SESSION PAGES (sample staff portals)
const NotFound = Loadable(lazy(() => import("../app/views/sessions/NotFound")));
// const JwtLogin = Loadable(lazy(() => import("../app/views/sessions/JwtLogin")));
// const JwtRegister = Loadable(lazy(() => import("../app/views/sessions/JwtRegister")));
// const ForgotPassword = Loadable(lazy(() => import("../app/views/sessions/ForgotPassword")));
// const AppEchart = Loadable(lazy(() => import("../app/views/charts/echarts/AppEchart")));
// const Analytics = Loadable(lazy(() => import("../app/views/dashboard/Analytics")));

// Staff Portal
const Homepage = Loadable(lazy(() => import("./pages-staff/HomePage")));
const StaffGuard = Loadable(
  lazy(() => import("./components-staff/StaffGuard"))
);

// Other Users
const OtherUser = Loadable(lazy(() => import("./pages-follow/other-user")));

export default function UpdatedRoutes() {
  return (
    <HashRouter>
      <div className="page-wrapper">
        <Routes>
          {/* Homepage */}
          <Route path="/" element={<IndexInfoMatrix />} />
          <Route path="/index-1" element={<Index />} />
          <Route path="/index-2" element={<Index2 />} />
          <Route path="/index-3" element={<Index3 />} />

          {/* Question Bank */}
          <Route path="/question-bank" element={<QuestionBank />} />
          <Route
            path="/specific-question/:q_id"
            element={<SpecificQuestion />}
          />

          {/* She Power */}
          <Route path="/she-power" element={<ShePower />} />
          <Route path="/we-race-as-one" element={<WeRaceAsOne />} />
          <Route path="/share-your-feeling" element={<ShareYourFeeling />} />

          {/* View Other Users */}
          <Route path="/friends" element={<OtherUser />} />

          {/* Forum */}
          <Route path="/forum" element={<ForumIndex />} />
          <Route path="/forum/study" element={<ForumStudy />} />
          <Route path="/forum/job" element={<ForumJob />} />
          <Route path="/forum/study/:org_id" element={<ForumSpecificOrg />} />
          <Route path="/forum/job/:org_id" element={<ForumSpecificOrg />} />
          <Route
            path="/forum/study/:org_id/post/:post_info"
            element={<ForumSpecific />}
          />
          <Route
            path="/forum/job/:org_id/post/:post_info"
            element={<ForumSpecific />}
          />
          <Route
            path="/your-forum/job/:org_id/post/:post_id"
            element={<YourForumSpecific />}
          />
          <Route
            path="/your-forum/study/:org_id/post/:post_id"
            element={<YourForumSpecific />}
          />
          <Route path="/forum/upload" element={<UploadBlog />} />

          {/* IDE Pages */}
          <Route path="/IDE-search" element={<IDESearch />} />
          <Route path="/IDE/:q_id" element={<IDE />} />

          {/* AI Components */}
          <Route path="/test_ai" element={<AI />} />

          {/* About Us */}
          <Route path="/about-1" element={<About1 />} />
          <Route path="/about-us" element={<About2 />} />

          {/* Events */}
          <Route path="/event" element={<Events />} />
          <Route path="/events-details" element={<EventsDetails />} />

          {/* Faq */}
          <Route path="/faq-1" element={<Faq1 />} />
          <Route path="/faq-2" element={<Faq2 />} />

          {/* Other Pages */}
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/error-404" element={<Error404 />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forget-password" element={<ForgetPassword />} />

          {/* Courses */}
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses-details" element={<CoursesDetails />} />

          <Route path= "/she-power" element={ <ShePower /> } />
          <Route path= "/we-race-as-one" element={ <WeRaceAsOne />} />
          <Route path= "/share-your-feeling" element={ <ShareYourFeeling /> } />
          <Route path= "/we-race-as-one/:id" element={ <ShePosts /> } />

          {/* Personal Pages */}
          <Route path="/personal/:u_id" element={<PersonalPage />} />
          <Route path="/edit-profile" element={<EditYourProfile />} />
          <Route path="/your-posts" element={<Posts />} />
          <Route path="/my-infomatrix" element={<MyInfoMatrix />} />

          {/* Blog Pages */}
          <Route path="/blog-classic-grid" element={<BlogClassicGrid />} />
          <Route
            path="/blog-classic-sidebar"
            element={<BlogClassicSidebar />}
          />
          <Route path="/blog-list-sidebar" element={<BlogListSidebar />} />
          <Route
            path="/blog-standard-sidebar"
            element={<BlogStandardSidebar />}
          />
          <Route path="/blog-details" element={<BlogDetails />} />

          {/* Contact Us */}
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/contact-1" element={<Contact1 />} />
          <Route path="/contact-2" element={<Contact2 />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />

          {/* Staff */}
          <Route path="/" element={<StaffGuard />}>
            <Route path="staff-new" element={<Homepage />} />
          </Route>
        </Routes>
      </div>
    </HashRouter>
  );
}
