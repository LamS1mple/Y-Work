
import React, {useEffect, useState} from "react";
import ProTypes from "prop-types"
import "./index.css"
import WorkItem from "../WorkItem";
import workApi from "../../../api/workApi";
WorkList.prototype = {
    workList : ProTypes.array,
};
WorkList.defaultProps = {
    workList:[],
};

const jobs = [
    {
        title: "Nhân Viên Kinh Doanh (Dự Án Mới)",
        company: "CÔNG TY TNHH BẢO HIỂM NHÂN THỌ AI",
        salary: "12 triệu",
        location: "Hà Nội",
    },
    {
        title: "Nhân Viên Chụp Ảnh Sản Phẩm",
        company: "CÔNG TY TNHH CARBON BILLIARDS",
        salary: "10 - 15 triệu",
        location: "Hà Nội",
    },
    {
        title: "Kỹ Thuật Điện/Bảo Trì Thiết Bị",
        company: "CÔNG TY CỔ PHẦN VN ECOFLOOR",
        salary: "15 - 30 triệu",
        location: "Hà Nam, Hà Nội",
    },
    {
        title: "Kỹ Thuật Điện/Bảo Trì Thiết Bị",
        company: "CÔNG TY CỔ PHẦN VN ECOFLOOR",
        salary: "15 - 30 triệu",
        location: "Hà Nam, Hà Nội",
    },
    {
        title: "Kỹ Thuật Điện/Bảo Trì Thiết Bị",
        company: "CÔNG TY CỔ PHẦN VN ECOFLOOR",
        salary: "15 - 30 triệu",
        location: "Hà Nam, Hà Nội",
    },
    {
        title: "Kỹ Thuật Điện/Bảo Trì Thiết Bị",
        company: "CÔNG TY CỔ PHẦN VN ECOFLOOR",
        salary: "15 - 30 triệu",
        location: "Hà Nam, Hà Nội",
    },
    {
        title: "Kỹ Thuật Điện/Bảo Trì Thiết Bị",
        company: "CÔNG TY CỔ PHẦN VN ECOFLOOR",
        salary: "15 - 30 triệu",
        location: "Hà Nam, Hà Nội",
    },
    {
        title: "Kỹ Thuật Điện/Bảo Trì Thiết Bị",
        company: "CÔNG TY CỔ PHẦN VN ECOFLOOR",
        salary: "15 - 30 triệu",
        location: "Hà Nam, Hà Nội",
    },
    {
        title: "Kỹ Thuật Điện/Bảo Trì Thiết Bị",
        company: "CÔNG TY CỔ PHẦN VN ECOFLOOR",
        salary: "15 - 30 triệu",
        location: "Hà Nam, Hà Nội",
    },
    // Thêm các công việc khác tương tự ở đây
];
const ITEMS_PER_PAGE = 12;

function WorkList(){
    console.log(123)
    const [listWork, setWorkList] = useState([]);
    useEffect(() =>{
        const fetchUser = async () =>{
            const workList = await workApi.workListAll();
            // console.log(workList)
            setWorkList(workList.object)
            console.log(listWork)
        };
        fetchUser()
    },[])

    const [filter, setFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const filteredJobs = jobs.filter((job) =>
        job.location.toLowerCase().includes(filter.toLowerCase())
    );

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
            <div className="filter">
                <input
                    type="text"
                    placeholder="Lọc theo địa điểm"
                    value={filter}
                    onChange={(e) => {
                        setFilter(e.target.value);
                        setCurrentPage(1); // Reset về trang đầu khi thay đổi bộ lọc
                    }}
                />
            </div>

            <div className="job-list">
                {listWork.map((job, index) => (
                    <WorkItem key={index} job={job} />
                ))}
            </div>

            <div className="pagination">
                <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
                    &lt;
                </button>
                <span>
          Trang {currentPage} / {totalPages}
        </span>
                <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
                    &gt;
                </button>
            </div>
        </div>
    );
}

export default WorkList;