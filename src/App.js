import React from "react";
import { useRoutes } from "react-router-dom";
// import Markup from "./markup/markup";
// ROUTES
import routes from "./markup/markup";



// Plugins Stylesheet
import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Slick Carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// React Modal Video
import "react-modal-video/css/modal-video.min.css";

// StyleSheet
import "./css/typography.css";
import "./css/shortcodes/shortcodes.css";
import "./css/style.css";
import "./css/color/color-1.css";

// V
import "./css/customize_v.css";
import "./css/forum.css";
import "./css/staff_v.css";

// Ding
import "./css/customize_dtr.css";
import "./css/shepower.css"


// Fonts
import "./vendors/fontawesome/css/font-awesome.min.css";
import "./vendors/flaticon/flaticon.css";
import "./vendors/line-awesome/css/line-awesome.min.css";
import "./vendors/themify/themify-icons.css";

//IDE Stylesheet
import "./css/IDE/ide.css";
import "./css/IDE/ide-question-describe.css";

import SettingsProvider from "./app/contexts/SettingsContext";
import { AuthProvider } from "./app/contexts/JWTAuthContext";
import { MatxTheme } from "./app/components";
import CssBaseline from "@mui/material/CssBaseline";
import MatxLayout from "./app/components/MatxLayout/MatxLayout";

import UpdatedRoutes from "./markup/routes"

function App() {
  // const content = useRoutes(routes);

  return (
    // <div className="page-wraper">
    //   <SettingsProvider>
    //   {/* <AuthProvider> */}
    //     <MatxTheme>
    //       <CssBaseline />
    //       {content}
    //     </MatxTheme>
    //   {/* </AuthProvider> */}
    //   </SettingsProvider>
    // </div>

    // 5.15 old version
    // <div className="page-wraper">
    //   {content}
    // </div>

    // 5.15 new version
    <UpdatedRoutes />
  );
}

export default App;
