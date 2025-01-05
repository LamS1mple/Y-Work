import React, {useState, useCallback, useEffect} from "react";
import {
    Container,
    Box,
    TextField,
    Button,
    Typography,
    Avatar,
    Badge,
    Dialog,
    DialogActions,
    DialogContent,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";

import CameraAltIcon from "@mui/icons-material/CameraAlt";
import VerifiedIcon from "@mui/icons-material/Verified";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "../../utils/CropImage";
import userApi from "../../api/userApi"; // Hàm hỗ trợ cắt ảnh
const blobUrlToBlob = async (blobUrl) => {
    const response = await fetch(blobUrl); // Tải dữ liệu từ Blob URL
    const blob = await response.blob(); // Chuyển thành Blob
    return blob;
};

const UserProfile = () => {
    const [user, setUser] = useState({
        name: "Nguyễn Công Lâm",
        phone: "",
        email: "lamlinkhang2002@gmail.com",
        avatar: "",
    });

    useEffect(() => {
        const call = async ()=>{
            const response = await userApi.detailUser()
            const data = response.object
            console.log(data)
            setUser({
                name: data.nameAccount,
                phone: data.phoneNumber,
                email: data.email,
                avatar: data.urlAvatar,
            })
        }
        call()
    }, []);

    const [selectedImage, setSelectedImage] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [openCropDialog, setOpenCropDialog] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage(reader.result);
                setOpenCropDialog(true); // Mở popup cắt ảnh
            };
            reader.readAsDataURL(file);
        }
    };

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleCropSave = async () => {
        try {
            const croppedImage = await getCroppedImg(selectedImage, croppedAreaPixels);
            setUser((prevUser) => ({ ...prevUser, avatar: croppedImage }));
            setOpenCropDialog(false); // Đóng popup
        } catch (error) {
            console.error("Cắt ảnh thất bại:", error);
        }
    };

    const handleSave = async () => {
        try {
            const formData = new FormData();
            if (selectedImage) {
                const blob = await blobUrlToBlob(user.avatar); // Chuyển Blob URL thành Blob
                formData.append("file", blob, "avatar.jpg"); // Thêm ảnh vào formData
            }

            formData.append("phone", user.phone);
            formData.append("fullName", user.name)
            formData.append("email", user.email)
            await userApi.updateUser(formData)
            toast.success("Thông tin đã được lưu thành công!");
            setTimeout(() => {
                window.location.reload(); // Reload trang sau 1-2 giây
            }, 2000); // Đợi toast hiển thị trước khi reload

        } catch (error) {
            toast.error("Lưu thông tin thất bại!");
            console.error("Error uploading file:", error);
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
                            sx={{ width: 100, height: 100, mb: 1, borderRadius: "50%" }}
                        />
                    </Badge>
                    <Typography
                        variant="h6"
                        fontWeight="bold"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        {user.name}
                        <VerifiedIcon color="primary" sx={{ ml: 1 }} />
                    </Typography>
                    {/*<Typography variant="body2" color="text.secondary">*/}
                    {/*    Tài khoản đã xác thực*/}
                    {/*</Typography>*/}
                </Box>
            </Box>

            {/* Dialog cắt ảnh */}
            <Dialog open={openCropDialog} onClose={() => setOpenCropDialog(false)}>
                <DialogContent
                    sx={{
                        position: "relative",
                        height: 400,
                        width: 400,
                        borderRadius: "50%",
                        overflow: "hidden", // Chỉ hiển thị vùng bên trong hình tròn
                    }}
                >
                    <Cropper
                        image={selectedImage}
                        crop={crop}
                        zoom={zoom}
                        aspect={1} // Tỷ lệ 1:1
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={onCropComplete}
                        style={{
                            cropAreaStyle: {
                                borderRadius: "50%", // Đặt vùng cắt tròn
                            },
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenCropDialog(false)} color="error">
                        Hủy
                    </Button>
                    <Button onClick={handleCropSave} variant="contained" color="primary">
                        Lưu
                    </Button>
                </DialogActions>
            </Dialog>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </Container>
    );
};

export default UserProfile;
