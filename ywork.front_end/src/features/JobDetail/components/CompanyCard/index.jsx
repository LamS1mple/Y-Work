import React from "react";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const CompanyCard = () => {
    return (
        <div style={styles.cardContainer}>
            <div style={styles.logoContainer}>
                <img
                    src="your-logo-url-here"
                    alt="Company Logo"
                    style={styles.logo}
                />
            </div>
            <div style={styles.content}>
                <h3 style={styles.title}>
                    CÔNG TY DỊCH VỤ MOBIFONE KHU VỰC 1 - CHI NHÁNH TỔNG CÔNG...
                </h3>
                <div style={styles.badge}>Pro Company</div>
                <div style={styles.info}>
                    <p style={styles.infoItem}>
                        <PeopleOutlineIcon style={styles.icon} /> Quy mô: 100-499 nhân viên
                    </p>
                    <p style={styles.infoItem}>
                        <WorkOutlineIcon style={styles.icon} /> Lĩnh vực: IT - Phần mềm
                    </p>
                    <p style={styles.infoItem}>
                        <LocationOnIcon style={styles.icon} /> Địa điểm: Số 5/82 đường Duy
                        Tân, Phường Dịch Vọng Hậu, Quận...
                    </p>
                </div>
                <a
                    href="#"
                    style={styles.link}
                >
                    Xem trang công ty
                </a>
            </div>
        </div>
    );
};

const styles = {
    cardContainer: {
        display: "flex",
        flexDirection: "column",
        border: "1px solid #ddd",
        borderRadius: "8px",
        overflow: "hidden",
        width: "300px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        fontFamily: "Arial, sans-serif",
    },
    logoContainer: {
        backgroundColor: "#f9f9f9",
        padding: "10px",
        textAlign: "center",
    },
    logo: {
        width: "80px",
        height: "auto",
    },
    content: {
        padding: "10px",
    },
    title: {
        fontSize: "16px",
        fontWeight: "bold",
        margin: "10px 0",
    },
    badge: {
        display: "inline-block",
        backgroundColor: "#FFC107",
        color: "#fff",
        padding: "2px 8px",
        borderRadius: "4px",
        fontSize: "12px",
        marginBottom: "10px",
    },
    info: {
        margin: "10px 0",
    },
    infoItem: {
        marginBottom: "5px",
        fontSize: "14px",
        display: "flex",
        alignItems: "center",
    },
    icon: {
        marginRight: "5px",
        color: "#555",
    },
    link: {
        display: "block",
        marginTop: "10px",
        textDecoration: "none",
        color: "#007BFF",
        fontWeight: "bold",
    },
};

export default CompanyCard;
