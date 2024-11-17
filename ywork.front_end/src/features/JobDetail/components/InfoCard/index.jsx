import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";
import PersonIcon from "@mui/icons-material/Person";
import TimerIcon from "@mui/icons-material/Timer";
import WcIcon from "@mui/icons-material/Wc";

const InfoCard = () => {
    return (
        <div style={styles.cardContainer}>
            <h3 style={styles.title}>Thông tin chung</h3>
            <div style={styles.infoItem}>
                <HomeIcon style={styles.icon}/>
                <span>
          <strong>Cấp bậc:</strong> Nhân viên
        </span>
            </div>
            <div style={styles.infoItem}>
                <TimerIcon style={styles.icon}/>
                <span>
          <strong>Kinh nghiệm:</strong> 2 năm
        </span>
            </div>
            <div style={styles.infoItem}>
                <PersonIcon style={styles.icon}/>
                <span>
          <strong>Số lượng tuyển:</strong> 1 người
        </span>
            </div>
            <div style={styles.infoItem}>
                <WorkIcon style={styles.icon}/>
                <span>
          <strong>Hình thức làm việc:</strong> Toàn thời gian
        </span>
            </div>
            <div style={styles.infoItem}>
                <WcIcon style={styles.icon}/>
                <span>
          <strong>Giới tính:</strong> Không yêu cầu
        </span>
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
