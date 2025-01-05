import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    MenuItem,
    Typography,
} from '@mui/material';
import { useDropzone } from 'react-dropzone';
import companyApi from '../../../../api/companyApi';
import userApi from '../../../../api/userApi';

const RegisterCompany = (props) => {
    const { handleClose, open } = props;
    const [errors, setErrors] = useState({});
    const [uploadedFile, setUploadedFile] = useState(null);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [cityData, setCityData] = useState([]);

    const [formData, setFormData] = useState({
        companyName: '',
        quantityStaff: '',
        description: '',
        address: '',
        city: '',
        district: '',
        ward: '',
    });

    const onDrop = (acceptedFiles) => {
        setUploadedFile(acceptedFiles[0]);
        setErrors((prevErrors) => ({ ...prevErrors, uploadedFile: '' }));
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const response = await userApi.getProvince();
                setCityData(response.object || []);
            } catch (error) {
                console.error('Error fetching provinces:', error);
            }
        };
        fetchProvinces();
    }, []);

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
            ...(name === 'city' && { district: '', ward: '' }),
            ...(name === 'district' && { ward: '' }),
        }));

        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));

        if (name === 'city') {
            try {
                const response = await userApi.getDistrictsByCity(value);
                setDistricts(response.object || []);
                setWards([]);
            } catch (error) {
                console.error('Error fetching districts:', error);
            }
        } else if (name === 'district') {
            try {
                const response = await userApi.getWardsByDistrict(value);
                setWards(response.object || []);
            } catch (error) {
                console.error('Error fetching wards:', error);
            }
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

    const handleSave = async () => {
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            const data = new FormData();
            data.append('avatar', uploadedFile);
            Object.keys(formData).forEach((key) => data.append(key, formData[key]));

            try {
                await companyApi.companyCreate(data);
                setFormData({
                    companyName: '',
                    quantityStaff: '',
                    description: '',
                    address: '',
                    city: '',
                    district: '',
                    ward: '',
                });
                setErrors({});
                setUploadedFile(null);
                handleClose();
            } catch (error) {
                console.error('Error saving company:', error);
            }
        }
    };

    return (
        <Dialog
            fullWidth
            maxWidth="sm"
            open={open}
            onClose={() => {
                handleClose();
                setErrors({});
            }}
        >
            <DialogTitle>Đăng Tin Công Ty</DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
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
                        {cityData.map((option) => (
                            <MenuItem key={option.code} value={option.code}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        label="Chọn huyện"
                        name="district"
                        value={formData.district}
                        onChange={handleChange}
                        error={!!errors.district}
                        helperText={errors.district}
                        select
                        fullWidth
                        variant="outlined"
                        disabled={!districts.length}
                    >
                        {districts.map((option) => (
                            <MenuItem key={option.code} value={option.code}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        label="Chọn xã"
                        name="ward"
                        value={formData.ward}
                        onChange={handleChange}
                        error={!!errors.ward}
                        helperText={errors.ward}
                        select
                        fullWidth
                        variant="outlined"
                        disabled={!wards.length}
                    >
                        {wards.map((option) => (
                            <MenuItem key={option.code} value={option.code}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </TextField>

                    <Box sx={{ position: 'relative', mb: 2 }}>
                        <Typography
                            variant="subtitle2"
                            component="label"
                            sx={{
                                position: 'absolute',
                                top: '-10px',
                                left: 16,
                                backgroundColor: '#fff',
                                padding: '0 8px',
                                fontSize: 14,
                                color: '#666',
                            }}
                        >
                            Tải logo công ty
                        </Typography>
                        <Box
                            {...getRootProps()}
                            sx={{
                                border: '2px dashed #ccc',
                                borderRadius: 1,
                                padding: 2,
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
                </Box>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => {
                        handleClose();
                        setErrors({});
                    }}
                    color="secondary"
                >
                    Hủy
                </Button>
                <Button onClick={handleSave} variant="contained" color="primary">
                    Đăng ký
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default RegisterCompany;
