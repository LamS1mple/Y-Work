import React, {useState} from 'react';
import './index.css'
import HeaderCompanySearch from "../../components/HeaderCompanySearch";
import {Outlet} from "react-router-dom";
import {Box, Button, TextField} from "@mui/material";
import RegisterCompany from "./Components/RegisterCompany";

const CompanySearch = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className="app-container">
            <HeaderCompanySearch/>
            <main className="content" style={{marginLeft: "250px"}}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px', // Khoảng cách giữa các phần tử
                        marginBottom: '16px',
                    }}
                >
                    {/* Thanh Tìm Kiếm */}
                    <TextField
                        variant="outlined"
                        placeholder="Search..."
                        fullWidth
                        sx={{flex: 1}} // Thanh tìm kiếm sẽ chiếm khoảng trống còn lại
                    />

                    {/* Nút Đăng Tin */}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleOpen}
                        sx={{whiteSpace: 'nowrap', textTransform: 'none', height: "56px"}}
                    >
                        Đăng Ký Công Ty
                    </Button>
                </Box>
                <Outlet/>
            </main>
            <RegisterCompany handleClose={handleClose} open={open}/>
        </div>
    );
}

export default CompanySearch;
