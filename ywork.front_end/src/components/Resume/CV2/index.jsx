import React from 'react';
import PropTypes from 'prop-types';
import useFormHandlers2 from "./Handler2";
import Form2 from "./Form2";
import Resume2 from "./Resume2";
import './index.css'
const Cv2 = props => {
    const data = props.data
    const {
        formData: formData2,
        handleChange: handleChange2,
        handleArrayChange: handleArrayChange2,
        handleNestedArrayChange: handleNestedArrayChange2,
        addSkill: addSkill2,
        addEducation: addEducation2,
        addCertificate: addCertificate2,
        addLanguage: addLanguage2,
        handleAddExperience: handleAddExperience2,
        handleDelete: handleDelete2,
        handleSubmit: handleSubmit2,
        handleFileChange: handleFileChange2
    } = useFormHandlers2(); // Destructure the returned object from useFormHandlers2
    return (
        <div className="form-and-resume">
            <div className="form-wrapper">
                <Form2
                    formData={formData2}
                    handleChange={handleChange2}
                    handleArrayChange={handleArrayChange2}
                    addSkill={addSkill2}
                    addEducation={addEducation2}
                    addCertificate={addCertificate2}
                    addLanguage={addLanguage2}
                    handleAddExperience={handleAddExperience2}
                    handleNestedArrayChange={handleNestedArrayChange2}
                    handleSubmit={handleSubmit2}
                    handleDelete={handleDelete2}
                    handleFileChange={handleFileChange2}
                />
            </div>
            <div className="resume-wrapper">
                <Resume2 resumeData={formData2}/>
            </div>
        </div>
    );
};

Cv2.propTypes = {};

export default Cv2;