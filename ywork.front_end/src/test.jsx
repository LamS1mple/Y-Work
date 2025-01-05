import React, { useState } from "react";
import {
    Container,
    Box,
    TextField,
    Button,
    Typography,
    Avatar,
    Badge,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import VerifiedIcon from "@mui/icons-material/Verified";

const Test = () => {
    const [user, setUser] = useState({
        name: "Nguyễn Công Lâm",
        phone: "",
        email: "lamlinkhang2002@gmail.com",
        avatar: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSave = () => {
        // Lưu thông tin người dùng (có thể gọi API tại đây)
        console.log("User data saved:", user);
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setUser((prevUser) => ({ ...prevUser, avatar: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    alignItems: "center",
                    justifyContent: "space-between",
                    bgcolor: "#f9f9f9",
                    p: 4,
                    borderRadius: 2,
                    boxShadow: 2,
                }}
            >
                {/* Thông tin người dùng */}
                <Box sx={{ flex: 1 }}>
                    <Typography variant="h5" fontWeight="bold" mb={2}>
                        Cài đặt thông tin cá nhân
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={3}>
                        (*) Các thông tin bắt buộc
                    </Typography>
                    <TextField
                        label="Họ và tên *"
                        variant="outlined"
                        fullWidth
                        name="name"
                        value={user.name}
                        onChange={handleInputChange}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Số điện thoại"
                        variant="outlined"
                        fullWidth
                        name="phone"
                        value={user.phone}
                        onChange={handleInputChange}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        name="email"
                        value={user.email}
                        disabled
                        sx={{ mb: 3 }}
                    />
                    <Button
                        variant="contained"
                        color="success"
                        size="large"
                        onClick={handleSave}
                    >
                        Lưu
                    </Button>
                </Box>

                {/* Avatar */}
                <Box sx={{ ml: { xs: 0, md: 4 }, textAlign: "center" }}>
                    <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                        badgeContent={
                            <label htmlFor="avatar-upload">
                                <CameraAltIcon
                                    color="primary"
                                    sx={{
                                        cursor: "pointer",
                                        bgcolor: "white",
                                        borderRadius: "50%",
                                        p: 0.5,
                                    }}
                                />
                                <input
                                    type="file"
                                    id="avatar-upload"
                                    accept="image/*"
                                    style={{ display: "none" }}
                                    onChange={handleAvatarChange}
                                />
                            </label>
                        }
                    >
                        <Avatar
                            src={user.avatar || "https://via.placeholder.com/150"}
                            alt="Avatar"
                            sx={{ width: 100, height: 100, mb: 1 }}
                        />
                    </Badge>
                    <Typography
                        variant="h6"
                        fontWeight="bold"
                        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                    >
                        {user.name}
                        <VerifiedIcon color="primary" sx={{ ml: 1 }} />
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Tài khoản đã xác thực
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default Test;
