import React, {useState} from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    Radio,
    RadioGroup,
    FormControlLabel,
    Checkbox,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from "@mui/material";
import userApi from "../../api/userApi";
import {useNavigate} from "react-router-dom";

const RegistrationFormCompany = () => {

    const navigate = useNavigate()

    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        fullName: "",
        phone: "",
        username: "",
        // companyName: "",
        // location: "",
        // district: "",
        gender: "1",
        roleStatus: 2,
        agreed: false,
    });

    const [formErrors, setFormErrors] = useState({
        email: false,
        password: false,
        confirmPassword: false,
        fullName: false,
        phone: false,
        username: false,
        // companyName: false,
        agreed: false,
    });

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setFormValues((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = {
            email: !formValues.email,
            password: !formValues.password,
            confirmPassword: formValues.password !== formValues.confirmPassword,
            fullName: !formValues.fullName,
            phone: !formValues.phone,
            username: !formValues.username,
            // companyName: !formValues.companyName,
            agreed: !formValues.agreed,
        };

        setFormErrors(errors);

        // If no errors, submit the form (can integrate with API or backend here)
        const hasErrors = Object.values(errors).some((error) => error);
        if (!hasErrors) {
            userApi.createAccount(formValues)
                .then(response => {
                    const data = response.object
                    if (data.messages === 'ok') {
                        navigate("/login/company")
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        }
    };

    return (
        <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="flex-start"
            sx={{
                width: "100%",
                padding: "20px",
                backgroundColor: "#f5f5f5",
                minHeight: "100vh",
            }}
        >
            {/* Left Form Section */}
            <Box
                sx={{
                    backgroundColor: "#ffffff",
                    padding: "30px",
                    borderRadius: "8px",
                    width: "60%",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Đăng ký tài khoản Nhà tuyển dụng
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    Cùng tạo dựng lợi thế cho doanh nghiệp bằng trải nghiệm công nghệ
                    tuyển dụng ứng dụng sâu AI & Hiring Funnel.
                </Typography>

                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Tên đăng nhập *"
                        name="username"
                        type="text"
                        margin="normal"
                        value={formValues.username}
                        onChange={handleChange}
                        error={formErrors.username}
                        helperText={formErrors.username ? "Tên đăng nhập không được để trống" : ""}
                    />
                    <TextField
                        fullWidth
                        label="Mật khẩu (6 đến 25 ký tự) *"
                        name="password"
                        type="password"
                        margin="normal"
                        value={formValues.password}
                        onChange={handleChange}
                        error={formErrors.password}
                        helperText={formErrors.password ? "Mật khẩu không được để trống" : ""}
                    />
                    <TextField
                        fullWidth
                        label="Nhập lại mật khẩu *"
                        name="confirmPassword"
                        type="password"
                        margin="normal"
                        value={formValues.confirmPassword}
                        onChange={handleChange}
                        error={formErrors.confirmPassword}
                        helperText={
                            formErrors.confirmPassword ? "Mật khẩu không khớp" : ""
                        }
                    />
                    <Typography variant="h6" mt={2}>
                        Thông tin nhà tuyển dụng
                    </Typography>
                    <TextField
                        fullWidth
                        label="Họ và tên *"
                        name="fullName"
                        margin="normal"
                        value={formValues.fullName}
                        onChange={handleChange}
                        error={formErrors.fullName}
                        helperText={formErrors.fullName ? "Họ và tên không được để trống" : ""}
                    />
                    <TextField
                        fullWidth
                        label="Email đăng nhập *"
                        name="email"
                        type="email"
                        margin="normal"
                        value={formValues.email}
                        onChange={handleChange}
                        error={formErrors.email}
                        helperText={formErrors.email ? "Email không được để trống" : ""}
                    />
                    <TextField
                        fullWidth
                        label="Số điện thoại cá nhân *"
                        name="phone"
                        type="tel"
                        margin="normal"
                        value={formValues.phone}
                        onChange={handleChange}
                        error={formErrors.phone}
                        helperText={
                            formErrors.phone ? "Số điện thoại không được để trống" : ""
                        }
                    />
                    {/*<TextField*/}
                    {/*    fullWidth*/}
                    {/*    label="Tên công ty *"*/}
                    {/*    name="companyName"*/}
                    {/*    margin="normal"*/}
                    {/*    value={formValues.companyName}*/}
                    {/*    onChange={handleChange}*/}
                    {/*    error={formErrors.companyName}*/}
                    {/*    helperText={*/}
                    {/*        formErrors.companyName ? "Tên công ty không được để trống" : ""*/}
                    {/*    }*/}
                    {/*/>*/}
                    {/*<FormControl fullWidth margin="normal">*/}
                    {/*    <InputLabel>Địa điểm làm việc *</InputLabel>*/}
                    {/*    <Select*/}
                    {/*        name="location"*/}
                    {/*        value={formValues.location}*/}
                    {/*        onChange={handleChange}*/}
                    {/*    >*/}
                    {/*        <MenuItem value="Bến Tre">Bến Tre</MenuItem>*/}
                    {/*        <MenuItem value="Hà Nội">Hà Nội</MenuItem>*/}
                    {/*        <MenuItem value="Hồ Chí Minh">Hồ Chí Minh</MenuItem>*/}
                    {/*    </Select>*/}
                    {/*</FormControl>*/}
                    {/*<FormControl fullWidth margin="normal">*/}
                    {/*    <InputLabel>Quận/ Huyện</InputLabel>*/}
                    {/*    <Select*/}
                    {/*        name="district"*/}
                    {/*        value={formValues.district}*/}
                    {/*        onChange={handleChange}*/}
                    {/*    >*/}
                    {/*        <MenuItem value="Mỏ Cày Bắc">Mỏ Cày Bắc</MenuItem>*/}
                    {/*        <MenuItem value="Châu Thành">Châu Thành</MenuItem>*/}
                    {/*    </Select>*/}
                    {/*</FormControl>*/}
                    <Typography variant="h6" mt={2}>
                        Giới tính:
                    </Typography>
                    <RadioGroup
                        row
                        name="gender"
                        value={formValues.gender}
                        onChange={handleChange}
                    >
                        <FormControlLabel value="1" control={<Radio/>} label="Nam"/>
                        <FormControlLabel value="2" control={<Radio/>} label="Nữ"/>
                    </RadioGroup>
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="agreed"
                                checked={formValues.agreed}
                                onChange={handleChange}
                            />
                        }
                        label={
                            <Typography>
                                Tôi đã đọc và đồng ý với{" "}
                                <a href="/">Điều khoản dịch vụ</a> và{" "}
                                <a href="/">Chính sách bảo mật</a> của YWork.
                            </Typography>
                        }
                    />
                    {formErrors.agreed && (
                        <Typography color="error">Bạn cần đồng ý với điều khoản</Typography>
                    )}
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{mt: 3}}
                        color="primary"
                        type="submit"
                    >
                        Hoàn tất
                    </Button>
                    <Typography align="center" sx={{mt: 2}}>
                        Đã có tài khoản? <a href="/">Đăng nhập ngay</a>
                    </Typography>
                </form>
            </Box>

            {/* Right Image Section */}
            <Box
                sx={{
                    width: "35%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <img
                    src="https://via.placeholder.com/300"
                    alt="Track your funnel with Report"
                    style={{width: "100%", borderRadius: "8px"}}
                />
            </Box>
        </Box>
    );
};

export default RegistrationFormCompany;
