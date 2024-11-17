import React, {useEffect} from 'react';
import {Route, Routes, Switch} from 'react-router-dom';

import LoginFeature from './features/Login'
import workApi from './api/workApi';
import HomeUser from "./features/Home";
import WorkList from "./features/Work/WorkList";
import JobDetail from "./features/JobDetail";

// import { Switch } from '@mui/material';

function App() {


    return (
        <div>
            <Routes>
                <Route path='/login' Component={LoginFeature}/>
                <Route path='/' element={<HomeUser/>}/>
                <Route path='/job/:companyId/:idJob' element={<JobDetail/>}/>
            </Routes>
            {/* < WorkList workList={workList}/> */}
        </div>

    );
}

export default App;