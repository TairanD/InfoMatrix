import React, {Component, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import HeaderInfoMatrix from "../layout/header/header-homepage";
import FooterBlack from "../layout/footer/footer-black";
import { connect } from "react-redux";

const ShareYourFeeling = (props) => {
    let navigate = useNavigate();
    const [formData, setFormData] = useState({ subject: '', content: '', type: '', photo: '' });
    const [imageFile, setImageFile] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);

        const reader = new FileReader();
        reader.onload = () => {
            setFormData({ ...formData, photo: reader.result });
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!props.isAuthenticated) {
            navigate('/login');
        } else {
            try {
                const formDataWithPhoto = { ...formData };
                if (imageFile) {
                    formDataWithPhoto.photo = formData.photo;
                }
                const response = await fetch('/share_your_feelings', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formDataWithPhoto),
                });
                if (!response.ok) {

                }
                const data = await response.json();
                console.log('Data updated successfully:', data);
                // 可以根据后端返回的数据进行跳转或者显示提示信息
                navigate("/we-race-as-one");
            } catch (error) {
                console.error('Error updating data:', error);

            }
        }


    };
    return(
        <>
            <HeaderInfoMatrix />

            <div className="profile-head">
                <h5>Share Your Feelings</h5>
            </div>
            <form className="edit-profile" onSubmit={handleSubmit}>
                <div className="">
                    <div className="form-group row">
                        <label className="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">Subject</label>
                        <div className="col-12 col-sm-9 col-md-9 col-lg-7">
                            <input
                                className="form-control"
                                type="text"
                                name="subject"
                                required={true}
                                value={formData.subject}
                                onChange={handleChange}
                            />
                        </div>
                    </div><div className="form-group row">
                    <label className="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">Conetnt</label>
                    <div className="col-12 col-sm-9 col-md-9 col-lg-7">
                        <textarea
                            className="form-control"
                            name="content"
                            value={formData.content}
                            required={true}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                    <div className="form-group row">
                        <label className="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">Type</label>
                        <div className="col-12 col-sm-9 col-md-9 col-lg-7">
                            <select
                                className="form-control"
                                name="type"
                                value={formData.type}
                                required={true}
                                onChange={handleChange}
                            >
                                <option value="">Select Type</option>
                                <option value="0">Employability</option>
                                <option value="1">Academia</option>
                            </select>
                        </div>
                    </div>


                    <div className="form-group row">
                        <label className="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">Image</label>
                        <div className="col-12 col-sm-9 col-md-9 col-lg-7">
                            {/* 文件输入框 */}
                            <input
                                type="file"
                                accept="image/*"
                                name="photo"
                                required={true}
                                onChange={handleImageChange}
                            />
                            {/* 预览图像 */}
                            {formData.photo && (
                                <img
                                    src={formData.photo}
                                    alt="Image Preview"
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
            <FooterBlack />
        </>
        );

}
// function TextBox() {
//     let navigate = useNavigate();
//     const [imagePreview, setImagePreview] = useState(null);
//     const [formData, setFormData] = useState({
//         subject: '',
//         content: '',
//         type: '0',
//         photo: null
//     });
//
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };
//
//     const handleImageUpload = (event) => {
//         const file = event.target.files[0];
//         const reader = new FileReader();
//
//         reader.onloadend = () => {
//             setImagePreview(reader.result);
//         };
//
//         if (file) {
//             reader.readAsDataURL(file);
//             setFormData({
//                 ...formData,
//                 photo: file
//             });
//         } else {
//             setImagePreview(null);
//             setFormData({
//                 ...formData,
//                 photo: null
//             });
//         }
//     };
//
//     const cancelImagePreview = () => {
//         setImagePreview(null);
//         setFormData({
//             ...formData,
//             photo: null
//         });
//     };
//
//     const shareFeelings = async () => {
//         const formDataToSend = new FormData();
//         formDataToSend.append('subject', formData.subject);
//         formDataToSend.append('content', formData.content);
//         formDataToSend.append('photo', formData.photo);
//         formDataToSend.append('type', formData.type);
//
//         try {
//             const response = await fetch('/share_your_feelings', {
//                 method: 'POST',
//                 body: formDataToSend
//             });
//
//             const data = await response.json();
//             if (data.code === 200) {
//                 navigate("/");
//             } else {
//                 alert('Failed to share your feelings. Please try again later.');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };
//
//     return (
//         <>
//             <HeaderInfoMatrix />
//             <div className="profile-head">
//                 <h5>Edit Profile</h5>
//             </div>
//             <form className="edit-profile">
//                 <div className="">
//                     <div className="form-group row">
//                         <div className="col-12 col-sm-9 col-md-9 col-lg-10 ml-auto">
//                             <h3>Subject</h3>
//                         </div>
//                     </div>
//                     <div className="form-group row">
//                         <label className="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label"></label>
//                         <div className="col-12 col-sm-9 col-md-9 col-lg-7">
//                             <input id="subject" className="form-control" type="text" onChange={handleChange} value={formData.subject} />
//                         </div>
//                     </div>
//
//                     <div className="seperator"></div>
//
//                     <div className="form-group row">
//                         <div className="col-12 col-sm-9 col-md-9 col-lg-10 ml-auto">
//                             <h3>Content</h3>
//                         </div>
//                     </div>
//                     <div className="form-group row">
//                         <label className="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label"></label>
//                         <div className="col-12 col-sm-9 col-md-9 col-lg-7">
//                             <textarea id="content" className="form-control form-control-lg" type="text" style={{ height: "250px" }} onChange={handleChange} value={formData.content} />
//                         </div>
//                     </div>
//
//                     <div className="m-form__seperator m-form__seperator--dashed m-form__seperator--space-2x"></div>
//
//                     <div className="form-group row">
//                         <div className="col-12 col-sm-9 col-md-9 col-lg-10 ml-auto">
//                             <h3 className="m-form__section">Attachment & Tag</h3>
//                         </div>
//                     </div>
//
//                     <div className="form-group row">
//                         <label className="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">Attached Photo</label>
//                         <div className="col-12 col-sm-9 col-md-9 col-lg-7">
//                             <input id="photo" className="form-control" type="file" onChange={handleImageUpload} accept="image/*" />
//                             {imagePreview && (
//                                 <div>
//                                     <img src={imagePreview} alt="Preview" style={{ maxWidth: "100%", maxHeight: "200px" }} />
//                                     <button onClick={cancelImagePreview}>Cancel</button>
//                                     <a href={imagePreview} target="_blank" rel="noopener noreferrer">View Larger</a>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//
//                     <div className="form-group row">
//                         <label className="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">Tag</label>
//                         <div className="col-12 col-sm-9 col-md-9 col-lg-7">
//                             <select id="type" className="form-control" onChange={handleChange} value={formData.type}>
//                                 <option value="0">Employability</option>
//                                 <option value="1">Academia</option>
//                             </select>
//                         </div>
//                     </div>
//
//                 </div>
//                 <div className="">
//                     <div className="">
//                         <div className="row">
//                             <div className="col-12 col-sm-3 col-md-3 col-lg-2">
//                             </div>
//                             <div className="col-12 col-sm-9 col-md-9 col-lg-7">
//                                 <Button onClick={shareFeelings} variant="contained" className="m-r10">Submit</Button>
//                                 <Button type="reset" variant="contained" className="btn-secondry">Clear</Button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </form>
//             <FooterBlack />
//         </>
//     );
// }
//
// class ShareYourFeeling extends Component {
//     render() {
//         return <TextBox />;
//     }
// }

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.login.isAuthenticated
    };
}

export default connect(mapStateToProps)(ShareYourFeeling);