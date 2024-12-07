import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Button, Stack } from "@mui/material";
import workApi from "../../api/workApi";

const JobApply = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        workApi.candidateJobApply()
            .then(res => {
                setData(res.object);
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <Box
            sx={{
                padding: 3,
                fontFamily: "'Roboto', sans-serif",
                backgroundColor: "#f9f9f9",
                minHeight: "100vh",
            }}
        >
            <Typography
                variant="h5"
                fontWeight="bold"
                mb={3}
                sx={{ color: "#333" }}
            >
                Việc làm đã ứng tuyển
            </Typography>
            {data.map((job, index) => (
                <Paper
                    key={index}
                    elevation={3}
                    sx={{
                        padding: 2,
                        marginBottom: 2,
                        borderRadius: 2,
                        transition: "transform 0.2s, box-shadow 0.2s",
                        "&:hover": {
                            transform: "scale(1.02)",
                            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                        },
                    }}
                >
                    <Stack direction="row" spacing={2}>
                        {/* Logo công ty */}
                        <Box
                            sx={{
                                width: 70,
                                height: 70,
                                borderRadius: "50%",
                                overflow: "hidden",
                                backgroundColor: "#f0f0f0",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <img
                                src={job.urlAvatar || "https://via.placeholder.com/70"}
                                alt={`${job.nameCompany} logo`}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                            />
                        </Box>

                        <Box flex={1}>
                            <Typography
                                onClick={()=> window.open(`/job/${job.companyId}/${job.workId}`  , "_blank")}
                                variant="h6"
                                fontWeight="bold"
                                sx={{ color: "#1e88e5", "cursor": "pointer" }}
                            >
                                {job.nameWork}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ marginTop: "4px" }}
                            >
                                {job.nameCompany}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ marginTop: "8px", color: "#333" }}
                            >
                                Thời gian ứng tuyển: {job.dateCreatedApply}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color:
                                        job.status === 1 ? "#00b14f" :
                                            job.status === 2 ? "#6f7882" :
                                                job.status === 3 ? "#f70" : "#3b78dc",
                                    marginTop: "8px",
                                    fontWeight: "bold",
                                }}
                            >
                                {job.status === 1
                                    ? "Hồ sơ phù hợp"
                                    : job.status === 2
                                        ? "Hồ sơ không phù hợp"
                                        : job.status === 3
                                            ? "NTD đã xem hồ sơ"
                                            : "Đã ứng tuyển dụng"} ({job.dateUpdateApply})
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-end",
                                marginLeft: "auto",
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{ color: "green", fontWeight: "bold", marginBottom: "8px" }}
                            >
                                {job.convertSalary}
                            </Typography>
                            <Button
                                onClick={() => window.open(job.urlFile, "_blank")}
                                variant="contained"
                                size="small"
                                sx={{
                                    backgroundColor: "#1e88e5",
                                    "&:hover": { backgroundColor: "#1565c0" },
                                }}
                            >
                                Xem CV
                            </Button>
                        </Box>
                    </Stack>
                </Paper>
            ))}
        </Box>
    );
};

export default JobApply;
