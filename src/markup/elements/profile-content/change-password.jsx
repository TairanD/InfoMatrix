import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

const ChangePassword = (id) => {
	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState('');
	let navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post("/personal/edit_password", {
				current_password: currentPassword,
				new_password: newPassword,
				confirm_password: confirmPassword
			});
			if (response.data.code === 200) {
				setMessage("Password updated successfully!");
				alert("You have changed your password! Redirect to login");
				// 清空输入框
				setCurrentPassword('');
				setNewPassword('');
				setConfirmPassword('');
				navigate("/login");
			} else {
				alert(response.data.msg);
			}
		} catch (error) {
			console.error('Error updating password:', error);
		}
	};

	return (
		<>
			<div className="profile-head">
				<h5>Change Password</h5>
			</div>
			<form className="edit-profile" onSubmit={handleSubmit}>
				<div className="">
					<div className="form-group row">
						<div className="col-12 col-sm-8 col-md-8 col-lg-9 ml-auto">
							<h3>Password</h3>
						</div>
					</div>
					<div className="form-group row">
						<label className="col-12 col-sm-4 col-md-4 col-lg-3 col-form-label">Current Password</label>
						<div className="col-12 col-sm-8 col-md-8 col-lg-7">
							<input className="form-control" required={true} type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
						</div>
					</div>
					<div className="form-group row">
						<label className="col-12 col-sm-4 col-md-4 col-lg-3 col-form-label">New Password</label>
						<div className="col-12 col-sm-8 col-md-8 col-lg-7">
							<input className="form-control" required={true} type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
						</div>
					</div>
					<div className="form-group row">
						<label className="col-12 col-sm-4 col-md-4 col-lg-3 col-form-label">Re Type New Password</label>
						<div className="col-12 col-sm-8 col-md-8 col-lg-7">
							<input className="form-control" required={true} type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-12 col-sm-4 col-md-4 col-lg-3">
					</div>
					<div className="col-12 col-sm-8 col-md-8 col-lg-7">
						<button type="submit" className="btn m-r10">Save changes</button>
						<button type="reset" className="btn-secondry">Cancel</button>
					</div>
				</div>
				{message && <div>{message}</div>}
			</form>
		</>
	);
}

export default ChangePassword;