import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from "chart.js";
import workApi from "../../../../api/workApi";
import { useParams } from "react-router-dom";

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, ArcElement);

const ThongKe = () => {
    const { companyId } = useParams();
    const [barData, setBarData] = useState({ labels: [], datasets: [] });
    const [jobPieData, setJobPieData] = useState({});
    const [selectedJob, setSelectedJob] = useState(null);

    useEffect(() => {
        const callApi = async () => {
            try {
                const response = await workApi.statisticJob(companyId);
                const data = response.object;

                // Chuẩn bị dữ liệu cho Bar chart
                const labels = data.map((job) => job.nameWork);
                const totalData = data.map((job) => job.total);

                setBarData({
                    labels: labels,
                    datasets: [
                        {
                            label: "Số lượng ứng tuyển",
                            data: totalData,
                            backgroundColor: "rgba(75, 192, 192, 0.6)",
                            borderColor: "rgba(75, 192, 192, 1)",
                            borderWidth: 1,
                        },
                    ],
                });

                // Chuẩn bị dữ liệu cho Pie chart
                const pieData = {};
                data.forEach((job) => {
                    pieData[job.nameWork] = [job.accept, job.reject, job.nothing];
                });
                setJobPieData(pieData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        callApi();
    }, [companyId]);

    const barOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: "top",
            },
        },
        onClick: (evt, elements) => {
            if (elements.length > 0) {
                const index = elements[0].index;
                setSelectedJob(barData.labels[index]);
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: "Số lượng ứng tuyển",
                },
            },
            x: {
                title: {
                    display: true,
                    text: "Các vị trí công việc",
                },
            },
        },
    };

    return (
        <div style={{ width: "100%", height: "100vh", textAlign: "center" }}>
            <h1>Thống kê ứng tuyển công việc</h1>
            <p>Số liệu về các công việc có nhiều ứng tuyển nhất.</p>
            <Bar data={barData} options={barOptions} />
            {selectedJob && (
                <>
                    <div
                        style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            zIndex: 10,
                        }}
                        onClick={() => setSelectedJob(null)}
                    ></div>
                    <div
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            backgroundColor: "#fff",
                            padding: "20px",
                            borderRadius: "10px",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                            zIndex: 20,
                            width: "500px", 
                        }}
                    >
                        <button
                            style={{
                                position: "absolute",
                                top: "10px",
                                right: "10px",
                                background: "none",
                                border: "none",
                                fontSize: "16px",
                                cursor: "pointer",
                            }}
                            onClick={() => setSelectedJob(null)}
                        >
                            ✖
                        </button>
                        <h2 style={{fontSize: "18px"}}>Chi tiết: {selectedJob}</h2>
                        <Pie
                            data={{
                                labels: ["Đã duyệt", "Bị từ chối", "Chưa quyết định"],
                                datasets: [
                                    {
                                        data: jobPieData[selectedJob],
                                        backgroundColor: ["#4caf50", "#f44336", "#ff9800"],
                                        hoverBackgroundColor: ["#66bb6a", "#e57373", "#ffb74d"],
                                    },
                                ],
                            }}
                            options={{
                                plugins: {
                                    legend: {
                                        position: "bottom",
                                    },
                                },
                            }}
                            width={200}
                            height={200}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default ThongKe;
