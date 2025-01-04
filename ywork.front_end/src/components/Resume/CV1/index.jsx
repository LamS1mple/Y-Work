import React from 'react';
import PropTypes from 'prop-types';
import useFormHandlers from "./Handler";
import Form from "./Form";
import Resume from "./Resume";
import './index.css'
import Notification from "../../../features/Notification";
const Cv1 = props => {
    const data = props.data
    const {
        formData: formData1,
        handleChange: handleChange1,
        handleArrayChange: handleArrayChange1,
        handleNestedArrayChange: handleNestedArrayChange1,
        addSkill: addSkill1,
        addEducation: addEducation1,
        addCertificate: addCertificate1,
        addLanguage: addLanguage1,
        handleAddExperience: handleAddExperience1,
        handleDelete: handleDelete1,
        handleSubmit: handleSubmit1,
        notification
    } = useFormHandlers();
    return (
        <div className="form-and-resume">
            <div className="form-wrapper">
                <Form
                    formData={formData1}
                    handleChange={handleChange1}
                    handleArrayChange={handleArrayChange1}
                    addSkill={addSkill1}
                    addEducation={addEducation1}
                    addCertificate={addCertificate1}
                    addLanguage={addLanguage1}
                    handleAddExperience={handleAddExperience1}
                    handleNestedArrayChange={handleNestedArrayChange1}
                    handleSubmit={handleSubmit1}
                    handleDelete={handleDelete1}
                />
            </div>
            <div className="resume-wrapper">
                <Resume resumeData={formData1} submit={handleSubmit1}/>
            </div>

            {notification && (
                <Notification
                    type={notification.type}
                    message={notification.message}
                />
            )}
        </div>
    );
};

Cv1.propTypes = {};

export default Cv1;