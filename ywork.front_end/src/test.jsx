// App.js
import React, { useState } from 'react';
import './App.css';

function Test() {
    const [userData, setUserData] = useState({
        name: 'SAMANTHA BEE',
        position: 'Software Developer',
        aboutMe: 'Diligent software designer with 8+ years of experience in business application development...',
        email: 'samantha@job.com',
        phone: '+44 707 555 22 11',
        address: 'Lily St 44, 6000 Luzern',
        linkedin: 'linkedin.com/in/samanthabee',
        languages: ['English', 'Spanish', 'French'],
        skills: ['JavaScript', 'ReactJS', 'Node.js', 'Docker', 'AWS'],
        profile: 'Flexible to adapt to priorities, change and ambiguity...',
        experiences: [
            {
                company: 'AwesomeDreem Ltd',
                period: '2020 - present',
                details: 'Member of Agile Scrum developing team. Architect and design software solutions...'
            },
            {
                company: 'WellModern Gists Ltd',
                period: '2015 - 2019',
                details: 'Using a variety of programming languages in developing big-scale tools...'
            }
        ],
        education: [
            { school: 'Lontecnica University', period: '2019', degree: 'Course on system architecture and design' },
            { school: 'Stisou University', period: '2010-2014', degree: 'BSc in Computer Science' },
            { school: 'Liceo Bon Colegio', period: '2010', degree: 'Baccalaureate' }
        ]
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <div className="app-container">
            <header className="header">
                <h1>Editable CV Template:</h1>
            </header>

            <section className="profile-section">
                <img src="avatar-placeholder.png" alt="Avatar" className="avatar" />
                <div className="profile-details">
                    <h2>{userData.name}</h2>
                    <p>{userData.position}</p>
                    <textarea
                        name="aboutMe"
                        value={userData.aboutMe}
                        onChange={handleChange}
                        placeholder="About me"
                    />
                </div>
            </section>

            <section className="contact-section">
                <h2>Contact</h2>
                <p>Email: <input type="email" name="email" value={userData.email} onChange={handleChange} /></p>
                <p>Phone: <input type="text" name="phone" value={userData.phone} onChange={handleChange} /></p>
                <p>Address: <input type="text" name="address" value={userData.address} onChange={handleChange} /></p>
                <p>LinkedIn: <input type="text" name="linkedin" value={userData.linkedin} onChange={handleChange} /></p>
            </section>

            <section className="languages-section">
                <h2>Languages</h2>
                <ul>
                    {userData.languages.map((lang, index) => (
                        <li key={index}>{lang}</li>
                    ))}
                </ul>
            </section>

            <section className="skills-section">
                <h2>Skills</h2>
                <ul>
                    {userData.skills.map((skill, index) => (
                        <li key={index}>{skill}</li>
                    ))}
                </ul>
            </section>

            <section className="profile-summary">
                <h2>Profile</h2>
                <textarea
                    name="profile"
                    value={userData.profile}
                    onChange={handleChange}
                    placeholder="Profile summary"
                />
            </section>

            <section className="experience-section">
                <h2>Experience</h2>
                {userData.experiences.map((exp, index) => (
                    <div className="experience" key={index}>
                        <h3>{exp.company}</h3>
                        <p>{exp.period}</p>
                        <textarea
                            name={`experience_${index}`}
                            value={exp.details}
                            onChange={(e) => {
                                const updatedExperiences = [...userData.experiences];
                                updatedExperiences[index].details = e.target.value;
                                setUserData((prevData) => ({ ...prevData, experiences: updatedExperiences }));
                            }}
                            placeholder="Details"
                        />
                    </div>
                ))}
            </section>

            <section className="education-section">
                <h2>Education</h2>
                {userData.education.map((edu, index) => (
                    <div className="education" key={index}>
                        <h3>{edu.school}</h3>
                        <p>{edu.period}</p>
                        <input
                            type="text"
                            name={`education_${index}`}
                            value={edu.degree}
                            onChange={(e) => {
                                const updatedEducation = [...userData.education];
                                updatedEducation[index].degree = e.target.value;
                                setUserData((prevData) => ({ ...prevData, education: updatedEducation }));
                            }}
                            placeholder="Degree"
                        />
                    </div>
                ))}
            </section>

            <footer className="footer">
                <p>Customize and save your CV</p>
                <button>Save</button>
            </footer>
        </div>
    );
}

export default Test;
