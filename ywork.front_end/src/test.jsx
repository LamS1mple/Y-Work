import React, {useState} from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Switch,
    Button,
    Typography,
    Paper,
} from "@mui/material";

const RecruitmentDashboard = () => {
    // State quản lý trạng thái bật/tắt của từng row
    const [campaigns, setCampaigns] = useState([
        // {
        //     id: 1,
        //     name: "Nhân viên kinh doanh phát triển thị trường",
        //     status: true,
        //     cvCount: "Chưa có CV nào",
        //     optimization: "50%",
        //     jobTitle: "Nhân Viên Kinh Doanh Thị Trường",
        //     approvalStatus: "Đang xét duyệt",
        //     scoutStatus: "Chưa kích hoạt CV Scout",
        // },
        // {
        //     id: 2,
        //     name: "Nhân viên tư vấn dịch vụ khách hàng",
        //     status: false,
        //     cvCount: "Đang tuyển dụng",
        //     optimization: "70%",
        //     jobTitle: "Tư Vấn Viên Dịch Vụ Khách Hàng",
        //     approvalStatus: "Đã duyệt",
        //     scoutStatus: "Chưa kích hoạt CV Scout",
        // },
    ]);

    // Hàm xử lý thay đổi trạng thái Switch
    const handleSwitchChange = (id) => {
        setCampaigns((prevCampaigns) =>
            prevCampaigns.map((campaign) =>
                campaign.id === id
                    ? {...campaign, status: !campaign.status}
                    : campaign
            )
        );
        console.log(`Campaign ID: ${id} status changed`);
    };

    return (
        <TableContainer component={Paper} style={{padding: "20px"}}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Chiến dịch tuyển dụng</TableCell>
                        <TableCell>Tối ưu</TableCell>
                        <TableCell>Tin tuyển dụng</TableCell>
                        <TableCell>CV Scout</TableCell>
                        <TableCell>Lọc CV</TableCell>
                        <TableCell>Dịch vụ đang chạy</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {campaigns.map((campaign) => (
                        <TableRow key={campaign.id}>
                            <TableCell>
                                <div
                                    style={{display: "flex", alignItems: "center", gap: "10px"}}
                                >
                                    <Switch
                                        checked={campaign.status}
                                        onChange={() => handleSwitchChange(campaign.id)}
                                    />
                                    <Typography variant="body1">{campaign.name}</Typography>
                                </div>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    style={{marginTop: "5px"}}
                                >
                                    {campaign.cvCount}
                                </Typography>
                                <Button size="small" style={{marginRight: "10px"}}>
                                    Sửa chiến dịch
                                </Button>
                                <Button size="small">Xem báo cáo</Button>
                            </TableCell>
                            <TableCell>{campaign.optimization}</TableCell>
                            <TableCell>
                                <Typography variant="body1">{campaign.jobTitle}</Typography>
                                <Typography
                                    variant="body2"
                                    style={{
                                        color: campaign.approvalStatus === "Đã duyệt" ? "green" : "orange",
                                        marginTop: "5px",
                                    }}
                                >
                                    {campaign.approvalStatus}
                                </Typography>
                                <Button size="small">Chỉnh sửa</Button>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body2" color="textSecondary">
                                    {campaign.scoutStatus}
                                </Typography>
                                <Button size="small">Xem chi tiết</Button>
                            </TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    size="small"
                                    style={{backgroundColor: "#28a745", color: "#fff"}}
                                >
                                    Tìm CV
                                </Button>
                            </TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    size="small"
                                    style={{backgroundColor: "#28a745", color: "#fff"}}
                                >
                                    Thêm
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default RecruitmentDashboard;
