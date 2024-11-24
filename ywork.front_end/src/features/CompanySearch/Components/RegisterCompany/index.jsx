import React, {useState} from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    MenuItem, Typography,
} from '@mui/material';
import {useDropzone} from 'react-dropzone';
import companyApi from "../../../../api/companyApi";

const CityData = [
    {value: 'hcm', label: 'Hồ Chí Minh'},
    {value: 'hn', label: 'Hà Nội'},
    {value: 'dn', label: 'Đà Nẵng'},
];

const RegisterCompany = (props) => {
    const handleClose = props.handleClose
    const open = props.open;
    const [errors, setErrors] = useState({});
    const [uploadedFile, setUploadedFile] = useState(null); // Quản lý file
    const onDrop = (acceptedFiles) => {
        setUploadedFile(acceptedFiles[0]); // Lấy file đầu tiên
        setErrors({...errors, uploadedFile: ''});
    };

    const {getRootProps, getInputProps} = useDropzone({onDrop});
    const [formData, setFormData] = useState({
        companyName: '',
        quantityStaff: '',
        description: '',
        address: '',
        city: '',
        district: '',
        ward: '',
    });
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
        setErrors({...errors, [name]: ''}); // Xóa lỗi khi người dùng nhập
    };
    const handleSave = () => {
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors); // Hiển thị lỗi
        } else {
            console.log('Dữ liệu đã lưu:', formData);
            const data = new FormData();
            data.append("avatar", uploadedFile)
            Object.keys(formData).forEach((key) => data.append(key, formData[key]));
            companyApi.companyCreate(data)
                .then(res => {
                    setFormData({
                        companyName: '',
                        quantityStaff: '',
                        description: '',
                        address: '',
                        city: '',
                        district: '',
                        ward: '',
                    }); // Reset form
                    setErrors({}); // Xóa lỗi
                    handleClose(); // Đóng hộp thoại
                    setUploadedFile(null); // Reset file
                })
                .catch(err => {
                })

        }
    };
    const validateForm = () => {
        const newErrors = {};
        if (!formData.companyName.trim()) newErrors.companyName = 'Tên công ty là bắt buộc.';
        if (!formData.quantityStaff.trim()) newErrors.quantityStaff = 'Số lượng nhân viên là bắt buộc.';
        if (!formData.description.trim()) newErrors.description = 'Mô tả về công ty là bắt buộc.';
        if (!formData.address.trim()) newErrors.address = 'Địa điểm chi tiết là bắt buộc.';
        if (!formData.city) newErrors.city = 'Thành phố là bắt buộc.';
        if (!formData.district.trim()) newErrors.district = 'Huyện là bắt buộc.';
        if (!formData.ward.trim()) newErrors.ward = 'Xã là bắt buộc.';
        if (!uploadedFile) newErrors.uploadedFile = 'File upload là bắt buộc.';
        return newErrors;
    };
    return (
        <>
            <Dialog
                sx={{overflowY: "hidden"}}
                fullWidth maxWidth="sm"
                style={{overflowY: "hidden"}}
                scroll="paper"
                open={open}
                onClose={() => {
                    handleClose();
                    setErrors({})
                }}
            >
                <DialogTitle>Đăng Tin Công Ty</DialogTitle>
                <DialogContent>
                    <Box sx={{display: 'flex', flexDirection: 'column', gap: '16px', mt: 2}}>
                        <TextField
                            label="Tên công ty"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleChange}
                            error={!!errors.companyName}
                            helperText={errors.companyName}
                            fullWidth
                            variant="outlined"
                        />
                        <TextField
                            label="Số lượng nhân viên"
                            name="quantityStaff"
                            value={formData.quantityStaff}
                            onChange={handleChange}
                            error={!!errors.quantityStaff}
                            helperText={errors.quantityStaff}
                            fullWidth
                            variant="outlined"
                        />
                        <TextField
                            label="Mô tả về công ty"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            error={!!errors.description}
                            helperText={errors.description}
                            fullWidth
                            multiline
                            rows={4}
                            variant="outlined"
                        />
                        <TextField
                            label="Địa điểm chi tiết"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            error={!!errors.address}
                            helperText={errors.address}
                            fullWidth
                            variant="outlined"
                        />
                        <TextField
                            label="Chọn thành phố"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            error={!!errors.city}
                            helperText={errors.city}
                            select
                            fullWidth
                            variant="outlined"
                        >
                            {CityData.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            label="Huyện"
                            name="district"
                            value={formData.district}
                            onChange={handleChange}
                            error={!!errors.district}
                            helperText={errors.district}
                            fullWidth
                            variant="outlined"
                        />
                        <TextField
                            label="Xã"
                            name="ward"
                            value={formData.ward}
                            onChange={handleChange}
                            error={!!errors.ward}
                            helperText={errors.ward}
                            fullWidth
                            variant="outlined"
                        />

                        {/* Drag-and-Drop Area */}
                        <Box sx={{position: 'relative', marginBottom: '16px'}}>
                            {/* Label */}
                            <Typography
                                variant="subtitle2"
                                component="label"
                                sx={{
                                    position: 'absolute',
                                    top: '-10px',
                                    left: '16px',
                                    backgroundColor: '#f9f9f9',
                                    padding: '0 8px',
                                    fontSize: '14px',
                                    color: '#666',
                                }}
                            >
                                Tải logo công ty
                            </Typography>

                            {/* Drag-and-Drop Area */}
                            <Box
                                {...getRootProps()}
                                sx={{
                                    border: '2px dashed #ccc',
                                    borderRadius: '8px',
                                    padding: '16px',
                                    textAlign: 'center',
                                    backgroundColor: '#f9f9f9',
                                    cursor: 'pointer',
                                }}
                            >
                                <input {...getInputProps()} />
                                {uploadedFile ? (
                                    <Typography variant="body2">{uploadedFile.name}</Typography>
                                ) : (
                                    <Typography variant="body2" color={errors.uploadedFile ? 'error' : 'inherit'}>
                                        {errors.uploadedFile || 'Kéo file vào đây hoặc nhấn để chọn file'}
                                    </Typography>
                                )}
                            </Box>
                        </Box>
                        {/*<Box sx={{position: 'relative', marginBottom: '16px'}}>*/}
                        {/*    /!* Label *!/*/}
                        {/*    <Typography*/}
                        {/*        variant="subtitle2"*/}
                        {/*        component="label"*/}
                        {/*        sx={{*/}
                        {/*            position: 'absolute',*/}
                        {/*            top: '-10px',*/}
                        {/*            left: '16px',*/}
                        {/*            backgroundColor: '#f9f9f9',*/}
                        {/*            padding: '0 8px',*/}
                        {/*            fontSize: '14px',*/}
                        {/*            color: '#666',*/}
                        {/*        }}*/}
                        {/*    >*/}
                        {/*        Tải đăng ký minh chứng công ty*/}
                        {/*    </Typography>*/}

                        {/*    /!* Drag-and-Drop Area *!/*/}
                        {/*    <Box*/}
                        {/*        {...getRootProps()}*/}
                        {/*        sx={{*/}
                        {/*            border: '2px dashed #ccc',*/}
                        {/*            borderRadius: '8px',*/}
                        {/*            padding: '16px',*/}
                        {/*            textAlign: 'center',*/}
                        {/*            backgroundColor: '#f9f9f9',*/}
                        {/*            cursor: 'pointer',*/}
                        {/*        }}*/}
                        {/*    >*/}
                        {/*        <input {...getInputProps()} />*/}
                        {/*        {uploadedFile ? (*/}
                        {/*            <Typography variant="body2">{uploadedFile.name}</Typography>*/}
                        {/*        ) : (*/}
                        {/*            <Typography variant="body2" color={errors.uploadedFile ? 'error' : 'inherit'}>*/}
                        {/*                {errors.uploadedFile || 'Kéo file vào đây hoặc nhấn để chọn file'}*/}
                        {/*            </Typography>*/}
                        {/*        )}*/}
                        {/*    </Box>*/}
                        {/*</Box>*/}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        handleClose();
                        setErrors({})
                    }} color="secondary">
                        Hủy
                    </Button>
                    <Button onClick={handleSave} variant="contained" color="primary">
                        Đăng ký
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default RegisterCompany;