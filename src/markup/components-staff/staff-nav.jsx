import React from 'react';
import { useNavigate } from 'react-router-dom';

const StaffNav = () => {
    let navigate = useNavigate();

    return (
        <div className="staff-nav">
            <h2 className="staff-nav-header">Staff Portal</h2>
            <div className="d-flex flex-column align-items-center">
                <button className="btn btn-secondary staff-nav-button" onClick={() => navigate("/staff")}>Dashboard</button>
                <button className="btn btn-secondary staff-nav-button" onClick={() => navigate("/staff/user")}>Users</button>
                <button className="btn btn-secondary staff-nav-button" onClick={() => navigate("/staff/question")}>Questions</button>
                <button className="btn btn-secondary staff-nav-button" onClick={() => navigate("/staff/answers")}>Answers</button>
                <button className="btn btn-secondary staff-nav-button" onClick={() => navigate("/staff/coding-question")}>IDE Questions</button>
                <button className="btn btn-secondary staff-nav-button" onClick={() => navigate("/staff/organizations")}>Organizations</button>
                {/*<button className="btn btn-secondary staff-nav-button" onClick={() => navigate("/staff/posts")}>Posts</button>*/}
            </div>
        </div>
    );
};

export default StaffNav;
