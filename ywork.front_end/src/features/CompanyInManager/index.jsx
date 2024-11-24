import React, {useState} from 'react';
import './index.css'
import {Outlet} from "react-router-dom";
import HeaderInCompany from "../../components/HeaderInCompany";

const CompanyInManager = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    console.log("123")
    return (
        <div className="app-container">
            <HeaderInCompany/>
            <main className="content" style={{marginLeft: "250px"}}>
                <Outlet/>
            </main>

        </div>
    );
}

export default CompanyInManager;
