import React from 'react';
import './Form2.css';

const Form2 = ({
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
    handleDelete,
    handleFileChange
}) => {
    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h2><i className="fas fa-user"></i> Thông tin</h2>
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
                placeholder="Vị trí công việc"
                value={formData.title}
                onChange={handleChange}
                required
            />

            <h2><i className="fas fa-address-book"></i>Liên Hệ</h2>
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
                placeholder=" Address"
                value={formData.contact.address}
                onChange={handleChange}
            />
            <h2><i className="fas fa-image"></i>Ảnh đại diện</h2>
            <input
                className="form-input"
                type="file"
                name="photo"
                accept="image/*"
                onChange={handleFileChange}
            />

            <h2><i className="fas fa-user-tie"></i> Mô tả</h2>
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
                placeholder="Giới thiệu"
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
            value={skill.name}
            onChange={(e) => handleArrayChange(e, index, 'skills', 'name')}
        />
        <input
            className="form-input"
            type="number"
            placeholder="Điểm số"
            value={skill.percentage}
            onChange={(e) => handleArrayChange(e, index, 'skills', 'percentage')}
            min="0"
            max="100"
        />
        <button type="button" className="delete-button" onClick={() => handleDelete(index, 'skills')}>
            Delete
        </button>
    </div>
))}
<button type="button" className="add-button" onClick={addSkill}>
    Add Skill
</button>
            <h2><i className="fas fa-graduation-cap"></i> Học vấn</h2>
            {formData.education.map((edu, index) => (
                <div key={index} className="nested-form-group">
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Bằng cấp"
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
                        placeholder="Nghành học"
                        value={edu.branch}
                        onChange={(e) => handleNestedArrayChange(e, index, 'branch', 'education')}
                        required
                    />
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Vị trí"
                        value={edu.location}
                        onChange={(e) => handleNestedArrayChange(e, index, 'location', 'education')}
                    />
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Năm bat đầu"
                        value={edu.startYear}
                        onChange={(e) => handleNestedArrayChange(e, index, 'startYear', 'education')}
                        required
                    />
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Năm kết thúc"
                        value={edu.endYear}
                        onChange={(e) => handleNestedArrayChange(e, index, 'endYear', 'education')}
                        required
                    />
                    <div className="form-group">
                        <input
                            className="form-input"
                            type="text"
                            placeholder="Điểm số"
                            value={edu.cgpa}
                            onChange={(e) => handleNestedArrayChange(e, index, 'cgpa', 'education')}
                            required
                        />
                        <select
                            className="form-input"
                            value={edu.cgpaType}
                            onChange={(e) => handleNestedArrayChange(e, index, 'cgpaType', 'education')}
                        >
                            <option value="percentage">Thang 10</option>
                            <option value="cgpa">Thang 4</option>
                        </select>
                    </div>
                    <button type="button" className="delete-button" onClick={() => handleDelete(index, 'education')}>
                        Delete
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
                    
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Tháng bắt đầu"
                        value={exp.startMonth}
                        onChange={(e) => handleNestedArrayChange(e, index, 'startMonth', 'experience')}
                    />
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Năm bắt đầu"
                        value={exp.startYear}
                        onChange={(e) => handleNestedArrayChange(e, index, 'startYear', 'experience')}
                    />
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Tháng ket thúc"
                        value={exp.endMonth}
                        onChange={(e) => handleNestedArrayChange(e, index, 'endMonth', 'experience')}
                    />
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Năm kết thúc"
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

            <h2><i className="fas fa-award"></i>Chứng chỉ</h2>
            {formData.certificates.map((certificate, index) => (
                <div key={index} className="form-group">
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Chứng chỉ"
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

            <h2><i className="fas fa-globe-americas"></i> Ngôn ngữ</h2>
            {formData.languages.map((lang, index) => (
    <div key={index} className="form-group">
        <input
            className="form-input"
            type="text"
            placeholder="Ngôn ngữ"
            value={lang.name}
            onChange={(e) => handleArrayChange(e, index, 'languages', 'name')}
        />
        <input
            className="form-input"
            type="number"
            placeholder="Điểm số"
            value={lang.percentage}
            onChange={(e) => handleArrayChange(e, index, 'languages', 'percentage')}
            min="0"
            max="100"
        />
        <button type="button" className="delete-button" onClick={() => handleDelete(index, 'languages')}>
            Xóa
        </button>
    </div>
))}
<button type="button" className="add-button" onClick={addLanguage}>
    Thêm ngôn ngữ
</button>
        </form>
    );
};

export default Form2;
