import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EditYourProfile = ({ name, email, avatar }) => {
	let navigate = useNavigate();
	const [formData, setFormData] = useState({ name, email, avatar, password: '' });
	const [avatarFile, setAvatarFile] = useState(null);
	const [errorMessage, setErrorMessage] = useState('');

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleAvatarChange = (e) => {
		const file = e.target.files[0];
		setAvatarFile(file);

		const reader = new FileReader();
		reader.onload = () => {
			setFormData({ ...formData, avatar: reader.result });
		};
		reader.readAsDataURL(file);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const formDataWithAvatar = { ...formData };
			if (avatarFile) {
				formDataWithAvatar.avatar = formData.avatar;
			}
			const response = await fetch('/personal/edit_profile', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formDataWithAvatar),
			});
			if (!response.ok) {

			}
			const data = await response.json();
			console.log('Data updated successfully:', data);
			// 可以根据后端返回的数据进行跳转或者显示提示信息
			alert(data.msg);
			// navigate("/");
			window.location.reload();
		} catch (error) {
			console.error('Error updating data:', error);
			setErrorMessage('Failed to update profile.');
		}
	};

	return (
		<>
			{errorMessage && <div className="error-message">{errorMessage}</div>}
			<div className="profile-head">
				<h5>Edit Profile</h5>
			</div>
			<form className="edit-profile" onSubmit={handleSubmit}>
				<div className="">
					<div className="form-group row">
						<label className="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">User Name</label>
						<div className="col-12 col-sm-9 col-md-9 col-lg-7">
							<input
								className="form-control"
								type="text"
								name="name"
								value={formData.name.trim() !== '' ? formData.name : name}
								// required={true}
								// value={formData.name}
								onChange={handleChange}
							/>
						</div>
					</div>
					{/*<div className="form-group row">*/}
					{/*	<label className="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">Email Address</label>*/}
						{/*<div className="col-12 col-sm-9 col-md-9 col-lg-7">*/}
						{/*	<input*/}
						{/*		className="form-control"*/}
						{/*		type="text"*/}
						{/*		name="email"*/}
						{/*		value={formData.email}*/}
						{/*		onChange={handleChange}*/}
						{/*	/>*/}
						{/*</div>*/}
					{/*</div>*/}
					{/*<div className="form-group row">*/}
					{/*	<label className="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">Email Address</label>*/}
					{/*	<div className="col-12 col-sm-9 col-md-9 col-lg-7">*/}
					{/*		<input*/}
					{/*			className="form-control"*/}
					{/*			type="text"*/}
					{/*			name="email"*/}
					{/*			value={formData.email}*/}
					{/*			onChange={handleChange}*/}
					{/*		/>*/}
					{/*	</div>*/}
					{/*</div>*/}
					<div className="form-group row">
						<label className="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">Avatar</label>
						<div className="col-12 col-sm-9 col-md-9 col-lg-7">
							{/* 文件输入框 */}
							<input
								type="file"
								accept="image/*"
								name="avatar"
								// required={true}
								onChange={handleAvatarChange}
							/>
							{/* 预览图像 */}
							{formData.avatar && (
								<img
									src={formData.avatar}
									alt="Avatar Preview"
									style={{ maxWidth: '100%', marginTop: '10px' }}
								/>
							)}
						</div>
					</div>
				</div>
				<div className="">
					<div className="">
						<div className="row">
							<div className="col-12 col-sm-3 col-md-3 col-lg-2">
							</div>
							<div className="col-12 col-sm-9 col-md-9 col-lg-7">
								<button type="submit" className="btn m-r10">Save changes</button>
								<button type="reset" className="btn-secondry">Cancel</button>
							</div>
						</div>
					</div>
				</div>
			</form>
		</>
	);
};

export default EditYourProfile;