import React, { useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import axios from "axios";

// Images
import bg1 from "../../images/background/bg1.jpg";
import appBg from "../../images/background/appointment-bg.png";
import {useNavigate} from "react-router-dom";

const UploadPostBox = (props) => {
  let navigate = useNavigate();
  let [id,setID] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/user_status');
        // 处理响应数据
        console.log(response.data);
        console.log(response.data.id)
        setID(response.data.id)
      } catch (error) {
        // 处理错误
        console.error('Error fetching user status:', error);
      }
    };

    fetchData(); // 调用函数以发送请求

    // 例如：return () => cleanupFunction();
  }, []); // 注意第二个参数是空数组，表示只在组件加载时调用一次

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

  const [formData, setFormData] = useState({
    subject: '',
    content: '',
    date: getCurrentDate(),
    photos: []});
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
      // formDataWithPhotos.append('organisation_id', formData.org); // Use formData.org_id instead of formData.organisation_id
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

      const data = await response.json();
      console.log('Data updated successfully:', data);
      // 根据后端返回的数据进行跳转或者显示提示信息
      alert("Post sent successfully!")
      if (id == 0) {
        navigate('/forum');
      }else{
        navigate('/personal/' + id)
      }
    } catch (error) {
      console.error('Error updating data:', error);
      setErrorMessage('Failed to update data.');
    }
  };

  return (
    <>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div className="profile-head">
        <h5>Start Your Topic</h5>
      </div>

      <div
        className="section-area section-sp3 ovpr-dark bg-fix appointment-box"
        style={{ backgroundImage: "url(" + bg1 + ")" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12 heading-bx style1 text-white text-center">
              <h2 className="title-head">Upload Your New Discussion Now</h2>
              <p>
                Select the image of the discussion from your device and submit
                this as a new discussion in current forum area.
              </p>
            </div>
          </div>
          <form className="contact-bx ajax-form" onSubmit={handleSubmit}>
            <div className="ajax-message"></div>
            <div className="row placeani">
              <div className="col-lg-12">
                <p style={{color: "grey"}}>Upload discussion Here</p>
                <div className="form-group">
                  <div className="input-group">
                    <input
                        type="file"
                        accept="image/*"
                        name="photos"
                        multiple
                        onChange={handlePhotoChange}
                        className="form-control valid-character"
                    />
                    {formData.photos.map((photo, index) => (
                        <div key={index} className="photo-preview">
                          <img
                              src={photo.previewUrl}
                              alt={`Photo Preview ${index + 1}`}
                              style={{ maxWidth: '100%', marginTop: '10px' }}
                          />
                          <button type="button" onClick={() => handleRemovePhoto(index)}>Remove</button>
                        </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="col-lg-12">
                <div className="form-group">
                  <div className="input-group">
                    <input
                        className="form-control"
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        required={true}
                        value={formData.subject}
                        onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              {/*<div className="col-lg-6">*/}
              {/*  <div className="form-group">*/}
              {/*    <div className="input-group">*/}
              {/*      <input*/}
              {/*          className="form-control"*/}
              {/*          type="date"*/}
              {/*          name="date"*/}
              {/*          value={formData.date}*/}
              {/*          onChange={handleChange}*/}
              {/*      />*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*</div>*/}
              <div className="col-lg-12">
                <div className="form-group">
                  <div className="input-group">
                    <textarea
                        className="form-control"
                        placeholder="Content"
                        type="text"
                        name="content"
                        required={true}
                        value={formData.content}
                        onChange={handleChange}
                    ></textarea>
                  </div>
                </div>
              </div>



              <div className="col-12 col-sm-3 col-md-3 col-lg-2">
                  <button
                      name="submit"
                      type="submit"
                      value="Submit"
                      className="btn m-r10"
                  >
                    Submit Discussion
                  </button>
                  {/*<button type="reset" className="btn-secondry">Clear</button>*/}
              </div>

            </div>
          </form>
        </div>
        <img src={appBg} className="appoint-bg" alt="" />
      </div>
    </>
  );
}

export default UploadPostBox;
