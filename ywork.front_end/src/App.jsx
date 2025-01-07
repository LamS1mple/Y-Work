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
import CompanyPostJob from "./features/CompanyInManager/Components/CompanyPostJob";
import CandidateCV from "./features/CompanyInManager/Components/CandidateCV";
import JobApply from "./features/JobApply";
import Cv1 from "./components/Resume/CV1/index";
import Resume from "./components/Resume";
import CVView from "./features/CVView";
import CVEdit from "./features/CVEdit";
import CompanyDetail from "./features/Company/CompanyDetail";
import JobCardCompany from "./features/Company/JobCardCompany";
import Test from "./test";
import CompanyListPublic from "./features/CompanyListPublic";
import Cv2 from "./components/Resume/CV2";
import Register from "./features/Register";
import UserProfile from "./features/UserProfile";
import ThongKe from "./features/CompanyInManager/Components/ThongKe";
import SearchBar from "./features/SearchBar";

// import { Switch } from '@mui/material';

function App() {


    return (
        <div>
            <Routes>
                <Route path={'/view-cv/:cvId'} element={<CVView />} />
                <Route path={'/edit-cv/:cvId'} element={<CVEdit />} />
                <Route path='/login' Component={LoginFeature}/>
                <Route path={"/register"} element={<Register />} />
                <Route path='/' element={<HomeUser/>}>
                    <Route path={'/'} element={<WorkList/>}/>
                    <Route path='/job/:companyId/:idJob' element={<JobDetail/>}/>
                    <Route path='/job/apply' element={<JobApply/>}/>
                    <Route path={"/cv"} element={<Resume />} />
                    <Route path={"/save-cv/:act/1"} element={<Cv1/>}/>
                    <Route path={"/save-cv/:act/2"} element={<Cv2/>}/>
                    <Route path={"/company/detail/:companyId"} element={<CompanyDetail/>}/>
                    <Route path={"/danh-sach-cong-ty"} element={<CompanyListPublic />} />
                    <Route path={"/profile-user"} element={<UserProfile />} />
                    <Route path={"/search-bar"} element={<SearchBar />}/>
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
                    <Route path={"thong-ke"} element={<ThongKe /> } />
                    <Route path={"cv/:workId"} element={<CandidateCV />} />
                </Route>
                <Route path={"/test"} element={<Test/>}/>
            </Routes>
            {/* < WorkList workList={workList}/> */}
        </div>

    );
}

export default App;