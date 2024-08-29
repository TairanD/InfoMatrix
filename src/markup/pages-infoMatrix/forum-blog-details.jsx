import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderInfoMatrix from "../layout/header/header-homepage";
import FooterBlack from "../layout/footer/footer-black";
import UploadPostBox from "../elements/upload-post-box";

const UploadBlog = (props) => {
    const navigate = useNavigate();
    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        let month = today.getMonth() + 1;
        let day = today.getDate();

        // Add leading zero if month or day is single digit
        month = month < 10 ? `0${month}` : month;
        day = day < 10 ? `0${day}` : day;

        return `${year}-${month}-${day}`;
    };

    const org_Id = props.location.state.orgId;

    const [formData, setFormData] = useState({ subject: '', content: '', date: getCurrentDate(), photos: [], organisation_id: org_Id});
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePhotoChange = (e) => {
        const files = Array.from(e.target.files);
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = () => {
                const previewUrl = reader.result;
                setFormData(prevState => ({
                    ...prevState,
                    photos: [...prevState.photos, { file, previewUrl }]
                }));
            };
            reader.readAsDataURL(file);
        });
    };

    const handleRemovePhoto = (index) => {
        setFormData(prevState => ({
            ...prevState,
            photos: prevState.photos.filter((_, idx) => idx !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataWithPhotos = new FormData();
            formDataWithPhotos.append('subject', formData.subject);
            formDataWithPhotos.append('content', formData.content);
            formDataWithPhotos.append('date', formData.date);
            formDataWithPhotos.append('organisation_id', org_Id);
            formData.photos.forEach((photo, index) => {
                formDataWithPhotos.append(`photo${index + 1}`, photo.file);
            });

            const response = await fetch('/forum/compose_new_post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error('Failed to upload data.');
            }
            const data = await response.json();
            console.log('Data updated successfully:', data);
            // 根据后端返回的数据进行跳转或者显示提示信息

            navigate('/forum/job/'+org_Id);
        } catch (error) {
            console.error('Error updating data:', error);
            setErrorMessage('Failed to update data.');
        }
    };

    return (
        <>
            <HeaderInfoMatrix />
            {/*{errorMessage && <div className="error-message">{errorMessage}</div>}*/}
            {/*<div className="profile-head">*/}
            {/*    <h5>Start Your Topic</h5>*/}
            {/*</div>*/}
            <UploadPostBox orgId = {org_Id}/>
            {/*<form className="edit-profile" onSubmit={handleSubmit}>*/}
            {/*    <div className="">*/}

            {/*        <div className="form-group row">*/}
            {/*            <label className="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">Subject</label>*/}
            {/*            <div className="col-12 col-sm-9 col-md-9 col-lg-7">*/}
            {/*                <input*/}
            {/*                    className="form-control"*/}
            {/*                    type="text"*/}
            {/*                    name="subject"*/}
            {/*                    value={formData.subject}*/}
            {/*                    onChange={handleChange}*/}
            {/*                />*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <div className="form-group row">*/}
            {/*            <label className="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">Content</label>*/}
            {/*            <div className="col-12 col-sm-9 col-md-9 col-lg-7">*/}
            {/*                <input*/}
            {/*                    className="form-control"*/}
            {/*                    type="text"*/}
            {/*                    name="content"*/}
            {/*                    value={formData.content}*/}
            {/*                    onChange={handleChange}*/}
            {/*                />*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <div className="form-group row">*/}
            {/*            <label className="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">Date</label>*/}
            {/*            <div className="col-12 col-sm-9 col-md-9 col-lg-7">*/}
            {/*                <input*/}
            {/*                    className="form-control"*/}
            {/*                    type="date"*/}
            {/*                    name="date"*/}
            {/*                    value={formData.date}*/}
            {/*                    onChange={handleChange}*/}
            {/*                />*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <div className="form-group row">*/}
            {/*            <label className="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">Photos</label>*/}
            {/*            <div className="col-12 col-sm-9 col-md-9 col-lg-7">*/}
            {/*                /!* 文件输入框 *!/*/}
            {/*                <input*/}
            {/*                    type="file"*/}
            {/*                    accept="image/*"*/}
            {/*                    name="photos"*/}
            {/*                    multiple*/}
            {/*                    onChange={handlePhotoChange}*/}
            {/*                />*/}
            {/*                /!* 预览图像 *!/*/}
            {/*                {formData.photos.map((photo, index) => (*/}
            {/*                    <div key={index} className="photo-preview">*/}
            {/*                        <img*/}
            {/*                            src={photo.previewUrl}*/}
            {/*                            alt={`Photo Preview ${index + 1}`}*/}
            {/*                            style={{ maxWidth: '100%', marginTop: '10px' }}*/}
            {/*                        />*/}
            {/*                        <button type="button" onClick={() => handleRemovePhoto(index)}>Remove</button>*/}
            {/*                    </div>*/}
            {/*                ))}*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div className="">*/}
            {/*        <div className="">*/}
            {/*            <div className="row">*/}
            {/*                <div className="col-12 col-sm-3 col-md-3 col-lg-2">*/}
            {/*                </div>*/}
            {/*                <div className="col-12 col-sm-9 col-md-9 col-lg-7">*/}
            {/*                    <button type="submit" className="btn m-r10">Send</button>*/}
            {/*                    <button type="reset" className="btn-secondry">Clear</button>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</form>*/}
            <FooterBlack />
        </>
    );
};

export default UploadBlog;
