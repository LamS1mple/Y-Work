import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Box,
  Typography,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import userApi from '../../api/userApi';

function LoginFeature() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleEmail = (event) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    const user = {
      username: username,
      password: password,
    };

    try {
      const data = await userApi.login(user);
      if (data.messages === 'ok') {
        localStorage.setItem('access_token', data.object.token);
        navigate('/');
      } else {
        // Đặt thông báo lỗi khi đăng nhập không thành công
        setErrorMessage('Sai tên đăng nhập hoặc mật khẩu. Vui lòng thử lại.');
      }
    } catch (error) {
      console.error('Lỗi đăng nhập:', error);
      setErrorMessage('Có lỗi xảy ra. Vui lòng thử lại sau.');
    }
  };

  return (
      <div>
        <Grid container style={{ minHeight: '100vh' }}>
          <Grid item xs={12} md={6} style={{ padding: '2rem', background: '#fff' }}>
            <Box textAlign="center" mb={4}>
              <Typography variant="h5" color="green">
                Chào mừng bạn đã quay trở lại
              </Typography>
              <Typography variant="subtitle1">
                Cùng xây dựng một hồ sơ nổi bật và nhận được các cơ hội sự nghiệp lý tưởng
              </Typography>
            </Box>

            <Box mb={2}>
              <TextField
                  fullWidth
                  variant="outlined"
                  label="Email"
                  placeholder="Email"
                  onChange={handleEmail}
              />
            </Box>

            <Box mb={2}>
              <TextField
                  fullWidth
                  variant="outlined"
                  label="Mật khẩu"
                  type="password"
                  placeholder="Mật khẩu"
                  onChange={handlePassword}
              />
            </Box>

            <Box mb={2}>
              {errorMessage && (
                  <Typography color="error" align="center">
                    {errorMessage}
                  </Typography>
              )}
            </Box>

            <Button
                fullWidth
                variant="contained"
                color="success"
                style={{ marginBottom: '1rem' }}
                onClick={handleSubmitForm}
            >
              Đăng nhập
            </Button>

            <Typography variant="subtitle1" align="center" gutterBottom>
              Hoặc đăng nhập bằng
            </Typography>

            <Grid container spacing={1} justifyContent="center">
              <Grid item>
                <Button variant="outlined" startIcon={<GoogleIcon />} color="error">
                  Google
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" startIcon={<FacebookIcon />} style={{ color: '#3b5998' }}>
                  Facebook
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" startIcon={<LinkedInIcon />} style={{ color: '#0077b5' }}>
                  LinkedIn
                </Button>
              </Grid>
            </Grid>

            <FormControlLabel
                control={<Checkbox color="primary" />}
                label="Bằng việc đăng nhập bằng tài khoản mạng xã hội, tôi đã đọc và đồng ý với Điều khoản dịch vụ và Chính sách bảo mật của YWork"
            />

            <Typography variant="body2" align="center" style={{ marginTop: '1rem' }}>
              Bạn chưa có tài khoản? <Button color="primary">Đăng ký ngay</Button>
            </Typography>

            <Typography variant="body2" align="center" color="textSecondary" style={{ marginTop: '1rem' }}>
              Bạn gặp khó khăn khi tạo tài khoản? Vui lòng gọi tới số (024) 6680 5588 (giờ hành chính).
            </Typography>
          </Grid>

          <Grid
              item
              xs={12}
              md={6}
              style={{
                background: 'linear-gradient(to bottom, #003f5c, #2f4b7c)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
              }}
          >
            <Box textAlign="center">
              <Typography variant="h4">YWork</Typography>
              <Typography variant="h5" style={{ fontWeight: 'bold' }}>
                Tiếp lợi thế
              </Typography>
              <Typography variant="h5" style={{ fontWeight: 'bold' }}>
                Nối thành công
              </Typography>
              <Typography variant="subtitle1" style={{ marginTop: '1rem' }}>
                YWork - Hệ sinh thái nhân sự tiên phong ứng dụng công nghệ tại Việt Nam
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </div>
  );
}

export default LoginFeature;
