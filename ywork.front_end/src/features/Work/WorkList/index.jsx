import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./index.css";
import WorkItem from "../WorkItem";
import workApi from "../../../api/workApi";
import Test from "../../../test";
import CompanyListHome from "../CompanyListHome";

WorkList.propTypes = {
    workList: PropTypes.array,
};
WorkList.defaultProps = {
    workList: [],
};

function removeVietnameseTones(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y");
    str = str.replace(/đ/g,"d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g," ");
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
    return str;
}

const ITEMS_PER_PAGE = 6;

function WorkList() {
    const [listWork, setWorkList] = useState([]);
    const [filter, setFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchUser = async () => {
            const workList = await workApi.workListAll();
            setWorkList(workList.object || []); // Xử lý trường hợp dữ liệu không có
        };
        fetchUser();
    }, []);

    // Lọc dữ liệu theo bộ lọc địa điểm
    const filteredJobs = listWork.filter((job) =>{
        let loction = new Set(job.locations.map(location => location.name))
        const filterRemove = removeVietnameseTones(filter.toLowerCase())
        return removeVietnameseTones([...loction].join(',').toLowerCase()).includes(filterRemove) ||
            removeVietnameseTones(job.nameCompany).toLowerCase().includes(filterRemove) ||
            removeVietnameseTones(job.nameWork).toLowerCase().includes(filterRemove) ;
    });

    // Tính toán số trang và danh sách công việc hiện tại
    const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentJobs = filteredJobs.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="job-list-container">
            {/* Bộ lọc */}
            <div className="filter">
                <input
                    type="text"
                    placeholder="Tìm kiếm công việc"
                    value={filter}
                    onChange={(e) => {
                        setFilter(e.target.value);
                        setCurrentPage(1); // Reset về trang đầu khi thay đổi bộ lọc
                    }}
                />
            </div>

            {/* Danh sách công việc */}
            <div className="job-list">
                {currentJobs.map((job, index) => (
                    <WorkItem key={index} job={job} />
                ))}
            </div>

            {/* Phân trang */}
            <div className="pagination">
                <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    &lt;
                </button>
                <span>
                    Trang {currentPage} / {totalPages}
                </span>
                <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    &gt;
                </button>
            </div>
            <CompanyListHome />
        </div>
    );
}

export default WorkList;
