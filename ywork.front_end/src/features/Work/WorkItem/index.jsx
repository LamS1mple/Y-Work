import React from 'react';
import PropTypes from 'prop-types';
import './index.css'
import {Link} from "react-router-dom";

WorkItem.propTypes = {};
function convertToMillion(number) {
    if (number >= 1_000_000) {
        return `${(number / 1_000_000).toLocaleString('vi-VN')} triệu`;
    }
    return number.toLocaleString('vi-VN');
}

function WorkItem({job}) {
    let loction = new Set(job.locations.map(location => location.name))
    const salary = job.typeSalary === 0 ? "Thỏa thuận" : (`${convertToMillion(job.salaryMin)} ${job.salaryMax !== 0 ? `- ${convertToMillion(job.salaryMax)}`:""}`)
    const listLocation = loction.size <= 2 ? [...loction].join(',') : `${[...loction][0]}&${loction.size - 1} nơi khác`
    return (
        <div className="job-card" >
            <img src={job.urlAvatar} alt={job.nameWork} className="job-image"/>
            <div className="job-info">
                <h3>
                    <Link to={`/job/${job.companyId}/${job.workId}`}>
                        {job.nameWork}
                    </Link>
                </h3>
                <p>{job.nameCompany}</p>
                <div style={{display: 'flex'}}>
                    <p className="wage-location">{salary}</p>
                    <p className={'wage-location'} style={{marginLeft: '10px'}}>
                        {listLocation}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default WorkItem;