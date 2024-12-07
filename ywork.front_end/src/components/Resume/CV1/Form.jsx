import React from 'react';
import './Form.css';

const Form = ({
                  formData,
                  handleChange,
                  handleArrayChange,
                  addSkill,
                  addEducation,
                  addCertificate,
                  addLanguage,
                  handleAddExperience,
                  handleNestedArrayChange,
                  handleSubmit,
                  handleDelete
              }) => {

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h2><i className="fas fa-user"></i>Thông tin</h2>
            <input
                className="form-input"
                type="text"
                name="name"
                placeholder="Họ và tên"
                value={formData.name}
                onChange={handleChange}
                required
            />
            <input
                className="form-input"
                type="text"
                name="title"
                placeholder="Vị trí công viêc"
                value={formData.title}
                onChange={handleChange}
                required
            />

            <h2><i className="fas fa-address-book"></i> Liên hệ</h2>
            <input
                className="form-input"
                type="text"
                name="contact.phone"
                placeholder="Số điện thoại"
                value={formData.contact.phone}
                onChange={handleChange}
                required
            />
            <input
                className="form-input"
                type="email"
                name="contact.email"
                placeholder="Email"
                value={formData.contact.email}
                onChange={handleChange}
                required
            />
            <input
                className="form-input"
                type="text"
                name="contact.linkedin"
                placeholder=" LinkedIn URL"
                value={formData.contact.linkedin}
                onChange={handleChange}
            />
            <input
                className="form-input"
                type="text"
                name="contact.github"
                placeholder=" GitHub URL"
                value={formData.contact.github}
                onChange={handleChange}
            />
            <input
                className="form-input"
                type="text"
                name="contact.address"
                placeholder="Địa chỉ"
                value={formData.contact.address}
                onChange={handleChange}
            />

            <h2><i className="fas fa-user-tie"></i>Mô tả</h2>
            {/*<select*/}
            {/*    className="form-input"*/}
            {/*    name="profile"*/}
            {/*    onChange={handleChange}*/}
            {/*    value={formData.profile}*/}
            {/*    required*/}
            {/*>*/}
            {/*    <option value="">Select Profile</option>*/}
            {/*    <option value="fullStack">Full Stack Developer</option>*/}
            {/*    <option value="software">Software Developer</option>*/}
            {/*    <option value="mernStack">MERN Stack Developer</option>*/}
            {/*    <option value="appDeveloper">App Developer</option>*/}
            {/*    <option value="frontEnd">Front End Developer</option>*/}
            {/*</select>*/}
            <textarea
                className="form-input textarea"
                name="profileText"
                placeholder="Mô tả"
                value={formData.profileText}
                onChange={handleChange}
            />

            <h2><i className="fas fa-cogs"></i> Kỹ năng</h2>
            {formData.skills.map((skill, index) => (
                <div key={index} className="form-group">
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Kỹ năng"
                        value={skill}  // Directly render the string value
                        onChange={(e) => handleArrayChange(e, index, 'skills')}
                    />
                    <button type="button" className="delete-button" onClick={() => handleDelete(index, 'skills')}>
                        Xóa
                    </button>
                </div>
            ))}
            <button type="button" className="add-button" onClick={addSkill}>
                Thêm kỹ năng
            </button>
            <h2><i className="fas fa-graduation-cap"></i> Học vấn</h2>
            {formData.education.map((edu, index) => (
                <div key={index} className="nested-form-group">
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Nghành học"
                        value={edu.degree}
                        onChange={(e) => handleNestedArrayChange(e, index, 'degree', 'education')}
                        required
                    />
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Tên trường học"
                        value={edu.institution}
                        onChange={(e) => handleNestedArrayChange(e, index, 'institution', 'education')}
                        required
                    />
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Ngày bắt đầu"
                        value={edu.startYear}
                        onChange={(e) => handleNestedArrayChange(e, index, 'startYear', 'education')}
                        required
                    />
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Ngày kêt thúc"
                        value={edu.endYear}
                        onChange={(e) => handleNestedArrayChange(e, index, 'endYear', 'education')}
                        required
                    />
                    <button type="button" className="delete-button" onClick={() => handleDelete(index, 'education')}>
                        Xóa
                    </button>
                </div>
            ))}
            <button type="button" className="add-button" onClick={addEducation}>
                Thêm học vấn
            </button>

            <h2><i className="fas fa-briefcase"></i> Kinh nghiệm làm việc</h2>
            {formData.experience.map((exp, index) => (
                <div key={index} className="nested-form-group">
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Vị trí"
                        value={exp.position}
                        onChange={(e) => handleNestedArrayChange(e, index, 'position', 'experience')}
                    />
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Tên công ty"
                        value={exp.company}
                        onChange={(e) => handleNestedArrayChange(e, index, 'company', 'experience')}
                    />
                    {/*<input*/}
                    {/*    className="form-input"*/}
                    {/*    type="text"*/}
                    {/*    placeholder="Start Month"*/}
                    {/*    value={exp.startMonth}*/}
                    {/*    onChange={(e) => handleNestedArrayChange(e, index, 'startMonth', 'experience')}*/}
                    {/*/>*/}
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Ngày kết thúc"
                        value={exp.startYear}
                        onChange={(e) => handleNestedArrayChange(e, index, 'startYear', 'experience')}
                    />
                    {/*<input*/}
                    {/*    className="form-input"*/}
                    {/*    type="text"*/}
                    {/*    placeholder="End Month"*/}
                    {/*    value={exp.endMonth}*/}
                    {/*    onChange={(e) => handleNestedArrayChange(e, index, 'endMonth', 'experience')}*/}
                    {/*/>*/}
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Ngày kêt thúc"
                        value={exp.endYear}
                        onChange={(e) => handleNestedArrayChange(e, index, 'endYear', 'experience')}
                    />
                    <textarea
                        className="form-input textarea"
                        placeholder="Mô tả"
                        value={exp.internships}
                        onChange={(e) => handleNestedArrayChange(e, index, 'internships', 'experience')}
                    />
                    <button type="button" className="delete-button" onClick={() => handleDelete(index, 'experience')}>
                        Xóa
                    </button>
                </div>
            ))}
            <button type="button" className="add-button" onClick={handleAddExperience}>
                Thêm kinh nghiệm
            </button>

            <h2><i className="fas fa-award"></i> Chứng chỉ</h2>
            {formData.certificates.map((certificate, index) => (
                <div key={index} className="form-group">
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Certificate"
                        value={certificate}
                        onChange={(e) => handleArrayChange(e, index, 'certificates')}
                    />
                    <button type="button" className="delete-button" onClick={() => handleDelete(index, 'certificates')}>
                        Xóa
                    </button>
                </div>
            ))}
            <button type="button" className="add-button" onClick={addCertificate}>
                Thêm chứng chỉ
            </button>

            <h2><i className="fas fa-globe-americas"></i> Ngoại ngữ</h2>
            {formData.languages.map((lang, index) => (
                <div key={index} className="form-group">
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Language"
                        value={lang}  // Directly render the string value
                        onChange={(e) => handleArrayChange(e, index, 'languages')}
                    />
                    <button type="button" className="delete-button" onClick={() => handleDelete(index, 'languages')}>
                        Xóa
                    </button>
                </div>
            ))}
            <button type="button" className="add-button" onClick={addLanguage}>
               Thêm ngoại ngữ
            </button>


        </form>
    );
};

export default Form;
