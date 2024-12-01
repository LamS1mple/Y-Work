import React, {useEffect, useState} from "react";
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
import workApi from "../../../../api/workApi";
import {useNavigate, useParams} from "react-router-dom";

const CompanyJob = () => {
    const {companyId} = useParams();
    // State quản lý trạng thái bật/tắt của từng row
    useEffect(() => {
        workApi.companyWork(companyId)
            .then(res => {
                setJobList(res.object)
            })
            .catch(err => console.log(err));
    }, [])
    const [jobList, setJobList] = useState([
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
    const navigate = useNavigate();
    const handleOnClickSeeCv = (workId) =>{
        navigate("cv/" + workId)
    }

    // Hàm xử lý thay đổi trạng thái Switch
    const handleSwitchChange = (workId) => {
        setJobList((prevJobs) =>
            prevJobs.map((job) =>
                job.workId === workId
                    ? {...job, status: job.status === 1 ? 0 : 1}
                    : job
            )
        );

        workApi.workChangeStatus(workId)
            .then(res =>{})
            .catch(error => console.log(error));
        console.log(`Campaign ID: ${workId} status changed`);
    };

    return (
        <TableContainer component={Paper} style={{padding: "20px"}}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Tên tuyển dụng</TableCell>
                        <TableCell>Ngày hết hạn</TableCell>
                        {/*<TableCell>Tin tuyển dụng</TableCell>*/}
                        {/*<TableCell>CV Scout</TableCell>*/}
                        <TableCell>Thao tác</TableCell>
                        {/*<TableCell>Chỉnh sửa</TableCell>*/}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {jobList.map((job) => (
                        <TableRow key={job.workId}>
                            <TableCell>
                                <div
                                    style={{display: "flex", alignItems: "center", gap: "10px"}}
                                >
                                    <Switch
                                        checked={job.status === 1}
                                        onChange={() => handleSwitchChange(job.workId)}
                                    />
                                    <Typography variant="body1">{job.nameWork}</Typography>
                                </div>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    style={{marginTop: "5px"}}
                                >
                                    {job.quantityCandidate} CV ứng tuyển
                                </Typography>
                                <Button size="small" style={{marginRight: "10px"}} onClick={() =>{
                                    handleOnClickSeeCv(job.workId)
                                }}>
                                    Xem CV ứng viên
                                </Button>
                                {/*<Button size="small">Xem báo cáo</Button>*/}
                            </TableCell>
                            <TableCell>{job.dueDate}</TableCell>
                            {/*<TableCell>*/}
                            {/*    <Typography variant="body1">{'campaign.jobTitle'}</Typography>*/}
                            {/*    <Typography*/}
                            {/*        variant="body2"*/}
                            {/*        style={{*/}
                            {/*            color: 'campaign.approvalStatus' === "Đã duyệt" ? "green" : "orange",*/}
                            {/*            marginTop: "5px",*/}
                            {/*        }}*/}
                            {/*    >*/}
                            {/*        {'campaign.approvalStatus'}*/}
                            {/*    </Typography>*/}
                            {/*    <Button size="small">Chỉnh sửa</Button>*/}
                            {/*</TableCell>*/}
                            {/*<TableCell>*/}
                            {/*    <Typography variant="body2" color="textSecondary">*/}
                            {/*        {'campaign.scoutStatus'}*/}
                            {/*    </Typography>*/}
                            {/*    <Button size="small">Xem chi tiết</Button>*/}
                            {/*</TableCell>*/}
                            <TableCell>
                                <Button
                                    variant="contained"
                                    size="small"
                                    style={{backgroundColor: "#28a745", color: "#fff"}}
                                >
                                    Sửa
                                </Button>
                            </TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    size="small"
                                    style={{backgroundColor: "#28a745", color: "#fff"}}
                                >
                                    Xóa
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CompanyJob;
