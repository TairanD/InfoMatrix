import { Navigate, useLocation, Outlet } from "react-router-dom";
import {connect} from "react-redux";
// HOOK

function StaffGuard({ isAuthenticated }) {
  const { pathname } = useLocation();
  console.log("before conditional judgement Authenticated", isAuthenticated);
  // if (currentUser && currentUser.role === 1) return {children};
  if (isAuthenticated) {
    console.log("Authenticated", isAuthenticated);
    return <Outlet />
  }
  else {
    console.log("Authenticated", isAuthenticated);
    return <Navigate replace to="/no-rights" state={{ from: pathname }} />;
  }
}

const mapStateToProps = (state) => {
  return {isAuthenticated: state.login.ifStaff};
}

export default connect(mapStateToProps)(StaffGuard)