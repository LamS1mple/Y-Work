import React from "react";
import { Box, Typography, Link, Grid, IconButton } from "@mui/material";
import AppleIcon from "@mui/icons-material/Apple";
import AndroidIcon from "@mui/icons-material/Android";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: "#1e293b", // Navy blue background
                color: "#e5e7eb", // Light gray text
                padding: "40px 20px",
                marginTop: "auto",
                borderTop: "1px solid #374151", // Border color
            }}
        >
            <Grid container spacing={4}>
                {/* Left Section */}
                <Grid item xs={12} md={3}>
                    <Box display="flex" flexDirection="column" alignItems="flex-start">
                        {/*<img*/}
                        {/*    src="https://topcv.vn/images/logo_topcv.png"*/}
                        {/*    alt="TopCV Logo"*/}
                        {/*    style={{ width: "120px", marginBottom: "16px" }}*/}
                        {/*/>*/}
                        <Typography variant="body1" gutterBottom>
                            Tiếp lợi thế - Nối thành công
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            Hotline:{" "}
                            <Link href="tel:02466805588" underline="hover" sx={{ color: "#38bdf8" }}>
                                (024) 6680 5588
                            </Link>
                        </Typography>
                        <Typography variant="body2">
                            Email:{" "}
                            <Link href="mailto:hotro@topcv.vn" underline="hover" sx={{ color: "#38bdf8" }}>
                                hotro@ywork.vn
                            </Link>
                        </Typography>
                        <Box display="flex" gap={1} mt={2}>
                            <IconButton href="https://apps.apple.com" target="_blank" sx={{ color: "#e5e7eb" }}>
                                <AppleIcon />
                            </IconButton>
                            <IconButton href="https://play.google.com" target="_blank" sx={{ color: "#e5e7eb" }}>
                                <AndroidIcon />
                            </IconButton>
                        </Box>
                        <Box mt={2}>
                            <Typography variant="body2">Cộng đồng YWork:</Typography>
                            <Box display="flex" gap={1}>
                                <IconButton href="https://facebook.com" target="_blank" sx={{ color: "#1877f2" }}>
                                    <FacebookIcon />
                                </IconButton>
                                <IconButton href="https://youtube.com" target="_blank" sx={{ color: "#ff0000" }}>
                                    <YouTubeIcon />
                                </IconButton>
                                <IconButton href="https://linkedin.com" target="_blank" sx={{ color: "#0077b5" }}>
                                    <LinkedInIcon />
                                </IconButton>
                            </Box>
                        </Box>
                    </Box>
                </Grid>

                {/* Center Sections */}
                <Grid item xs={12} md={3}>
                    <Typography variant="h6" gutterBottom sx={{ color: "#facc15" }}>
                        Về YWork
                    </Typography>
                    <Box component="ul" sx={{ listStyle: "none", padding: 0 }}>
                        {["Giới thiệu", "Góc báo chí", "Tuyển dụng", "Liên hệ", "Hỏi đáp", "Chính sách bảo mật"].map(
                            (item, index) => (
                                <li key={index}>
                                    <Link href="#" underline="hover" variant="body2" sx={{ color: "#38bdf8" }}>
                                        {item}
                                    </Link>
                                </li>
                            )
                        )}
                    </Box>
                </Grid>

                <Grid item xs={12} md={3}>
                    <Typography variant="h6" gutterBottom sx={{ color: "#facc15" }}>
                        Khám phá
                    </Typography>
                    <Box component="ul" sx={{ listStyle: "none", padding: 0 }}>
                        {[
                            "Ứng dụng di động YWork",
                            "Tính lương Gross - Net",
                            "Lập kế hoạch tiết kiệm",
                            "Trắc nghiệm MBTI",
                        ].map((item, index) => (
                            <li key={index}>
                                <Link href="#" underline="hover" variant="body2" sx={{ color: "#38bdf8" }}>
                                    {item}
                                </Link>
                            </li>
                        ))}
                    </Box>
                </Grid>

                {/* Right Section */}
                <Grid item xs={12} md={3}>
                    <Typography variant="h6" gutterBottom sx={{ color: "#facc15" }}>
                        Đối tác
                    </Typography>
                    <Box component="ul" sx={{ listStyle: "none", padding: 0 }}>
                        {["TestCenter", "TopHR", "ViecNgay", "Happy Time"].map((item, index) => (
                            <li key={index}>
                                <Link href="#" underline="hover" variant="body2" sx={{ color: "#38bdf8" }}>
                                    {item}
                                </Link>
                            </li>
                        ))}
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Footer;
