import React from "react";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {Link} from "react-router-dom";

const CompanyCard = (props) => {
    const companyDetail = props.companyDetail
    return (
        <div style={styles.cardContainer}>
            <div style={styles.logoContainer}>
                <img
                    src={companyDetail.urlAvatar}
                    alt="Company Logo"
                    style={styles.logo}
                />
                <div>
                    <h3 style={styles.title}>
                        {companyDetail.nameCompany}
                    </h3>
                    <div style={styles.badge}>Pro Company</div>
                </div>
            </div>
            <div style={styles.content}>

                <div style={styles.info}>
                    <p style={styles.infoItem}>
                        <PeopleOutlineIcon style={styles.icon}/> <strong>Quy mô
                        :</strong> {companyDetail.quantityStaff} nhân viên
                    </p>
                    {/*<p style={styles.infoItem}>*/}
                    {/*    <WorkOutlineIcon style={styles.icon}/> Lĩnh vực: IT - Phần mềm*/}
                    {/*</p>*/}
                    <p style={styles.infoItem}
                       title={`Địa điểm: ${companyDetail.locationDetailCompany}, Phường ${companyDetail.nameWard}, Quận ${companyDetail.nameDistrict}, Thành phố ${companyDetail.nameProvince}`}>
                        <LocationOnIcon style={styles.icon}/>
                        <strong>Địa điểm:</strong> {companyDetail.locationDetailCompany},
                        Phường {companyDetail.nameWard}, Quận {companyDetail.nameDistrict},
                        Thành phố {companyDetail.nameProvince}
                    </p>
                </div>

                <Link to={`/company/detail/${companyDetail.idCompany}`} style={styles.link}>
                    Xem trang công ty
                </Link>
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
        display: "flex",
        alignItems: "center",
    },
    logo: {
        marginRight: "15px",
        width: "80px",
        height: "80px",
        borderRadius: "50%"
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

        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 2, // Giới hạn 2 dòng
        overflow: 'hidden', // Ẩn nội dung vượt quá
        textOverflow: 'ellipsis', // Thêm dấu "..."
        lineHeight: '1.5', // Chiều cao dòng
        whiteSpace: 'normal', // Đảm bảo xuống dòng khi cần
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
