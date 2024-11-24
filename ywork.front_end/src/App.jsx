import React, {useEffect} from 'react';
import {Route, Routes, Switch} from 'react-router-dom';

import LoginFeature from './features/Login'
import HomeUser from "./features/Home";
import JobDetail from "./features/JobDetail";
import RegistrationFormCompany from "./features/RegistrationFormCompany";
import LoginCompany from "./features/LoginCompany";
import CompanySearch from "./features/CompanySearch";
import WorkList from "./features/Work/WorkList";
import MyCompany from "./features/CompanySearch/Components/MyCompany";
import CompanyList from "./features/CompanySearch/Components/CompanyList";
import CompanyRequest from "./features/CompanySearch/Components/CompanyRequest";
import CompanyCard from "./features/CompanySearch/Components/CompanyCard";
import HeaderInCompany from "./components/HeaderInCompany";
import CompanyJob from "./features/CompanyInManager/Components/CompanyJob";
import CompanyStaff from "./features/CompanyInManager/Components/CompanyStaff";
import CompanyCandidate from "./features/CompanyInManager/Components/CompanyCandidate";
import CompanyInManager from "./features/CompanyInManager";
import Test from "./test";
import CompanyPostJob from "./features/CompanyInManager/Components/CompanyPostJob";

// import { Switch } from '@mui/material';

function App() {


    return (
        <div>
            <Routes>
                <Route path='/login' Component={LoginFeature}/>
                <Route path='/' element={<HomeUser/>}>
                    <Route path={'/'} element={<WorkList/>}/>
                    <Route path='/job/:companyId/:idJob' element={<JobDetail/>}/>
                </Route>


                <Route path='/register/company' element={<RegistrationFormCompany/>}/>

                <Route path='/login/company' element={<LoginCompany/>}/>
                <Route path={'/company/search'} element={<CompanySearch/>}>
                    <Route path={''} element={<MyCompany/>}/>
                    <Route path={'list-company'} element={<CompanyList/>}/>
                    <Route path={'request-company'} element={< CompanyRequest/>}/>
                </Route>
                <Route path={'/company/manager/:companyId'} element={< CompanyInManager/>}>
                    <Route path={""} element={<CompanyJob/>}/>
                    <Route path={"staff"} element={<CompanyStaff/>}/>
                    <Route path={"candidate"} element={<CompanyCandidate/>}/>
                    <Route path={"post"} element={<CompanyPostJob/>}/>
                </Route>
                <Route path={"/test"} Component={Test}/>
            </Routes>
            {/* < WorkList workList={workList}/> */}
        </div>

    );
}

export default App;