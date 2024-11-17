import React from 'react';
import PropTypes from 'prop-types';
import './index.css'
import {Link} from "react-router-dom";

WorkItem.propTypes = {};

function WorkItem({job}) {
    let loction = new Set(job.locations.map(location => location.provinceName).concat(job.locations.map(location => location.districtName)))

    const listLocation = loction.size <= 2 ? [...loction].join(',') : `${[...loction][0]}&${loction.size - 1} nơi khác`
    return (
        <div className="job-card">
            <img src={'job.imageUrl'} alt={job.nameWork} className="job-image"/>
            <div className="job-info">
                <h3>
                    <Link to={`/job/${job.companyId}/${job.workId}`}>
                        {job.nameWork}
                    </Link>
                </h3>
                <p>{job.nameCompany}</p>
                <div style={{display: 'flex'}}>
                    <p className="wage-location">{job.wage.charAt(0) === 'T' ? job.wage : `${job.wage} triệu`}</p>
                    <p className={'wage-location'} style={{marginLeft: '10px'}}>
                        {listLocation}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default WorkItem;