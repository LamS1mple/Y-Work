import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";
import PersonIcon from "@mui/icons-material/Person";
import TimerIcon from "@mui/icons-material/Timer";
import WcIcon from "@mui/icons-material/Wc";

const containerStyle = {
    fontFamily: "Arial, sans-serif",
    // maxWidth: "400px",
    // margin: "20px auto",
    // padding: "20px",
    // border: "1px solid #ddd",
    // borderRadius: "8px",
    // backgroundColor: "#f9f9f9",
};

const sectionTitleStyle = {
    marginBottom: "10px",
    color: "#333",
};

const tagsContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
};

const tagStyle = {
    padding: "8px 12px",
    backgroundColor: "#e9ecef",
    color: "#495057",
    borderRadius: "15px",
    fontSize: "14px",
    cursor: "pointer",
    transition: "background-color 0.3s",
};

const tagHoverStyle = {
    backgroundColor: "#d6d8db",
};
const InfoCard = (props) => {
    const job = props.workDetail
    console.log("data job", job)
    const jobCategories = [
        "Kinh doanh/Bán hàng",
        "Tài chính/Ngân hàng/Bảo hiểm",
        "Sales Tài chính/Ngân hàng/Bảo hiểm",
        "Bảo hiểm",
        "Tư vấn bảo hiểm",
    ];

    const locations = job.locations?.map(lo => lo.name) || [];
    const uniqueNames = Array.from(
        new Set(
            job.skills?.flatMap((item) => [
                item.skillName,
                item.fieldName,
                item.careerName,
            ])
        )
    );
    return (
        <div style={styles.cardContainer}>
            <h3 style={styles.title}>Thông tin chung</h3>
            <div style={styles.infoItem}>
                <HomeIcon style={styles.icon}/>
                <span>
          <strong>Cấp bậc:</strong> {job.position}
        </span>
            </div>
            <div style={styles.infoItem}>
                <TimerIcon style={styles.icon}/>
                <span>
          <strong>Kinh nghiệm:</strong> {job.experience}
        </span>
            </div>
            <div style={styles.infoItem}>
                <PersonIcon style={styles.icon}/>
                <span>
                    <strong>Số lượng tuyển:</strong> {job.quantity} người
                </span>
            </div>
            <div style={styles.infoItem}>
                <WorkIcon style={styles.icon}/>
                <span>
          <strong>Hình thức làm việc:</strong> {job.workType}
        </span>
            </div>
            <div style={styles.infoItem}>
                <WcIcon style={styles.icon}/>
                <span>
          <strong>Giới tính:</strong> {job.sex}
        </span>
            </div>

            <div style={containerStyle}>
                <div>
                    <h3 style={sectionTitleStyle}>Danh mục Nghề</h3>
                    <div style={tagsContainerStyle}>
                        {uniqueNames.map((name, index) => (
                            <span
                                key={index}
                                style={{
                                    padding: "8px 12px",
                                    backgroundColor: "#e9ecef",
                                    color: "#495057",
                                    borderRadius: "15px",
                                    fontSize: "14px",
                                    cursor: "pointer",
                                }}
                            >
            {name}
          </span>
                        ))}
                    </div>
                </div>
                <div>
                    <h3 style={sectionTitleStyle}>Khu vực</h3>
                    <div style={tagsContainerStyle}>
                        {locations.map((location, index) => (
                            <span
                                key={index}
                                style={{
                                    ...tagStyle,
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = tagHoverStyle.backgroundColor;
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = tagStyle.backgroundColor;
                                }}
                            >
              {location}
            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>


    );
};

const styles = {
    cardContainer: {
        marginTop: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        backgroundColor: "#fff",
        width: "300px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        fontFamily: "Arial, sans-serif",
    },
    title: {
        fontSize: "18px",
        fontWeight: "bold",
        color: "#333",
        marginBottom: "16px",
    },
    infoItem: {
        display: "flex",
        alignItems: "center",
        marginBottom: "12px",
        fontSize: "14px",
        color: "#333",
    },
    icon: {
        marginRight: "8px",
        color: "#2D9CDB",
    },
};

export default InfoCard;
