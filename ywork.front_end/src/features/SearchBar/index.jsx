import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    InputBase,
    Typography,
    Popover,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MenuIcon from '@mui/icons-material/Menu';
import JobCatalog from './JobCatalog';
import LocationFilter from './LocationFilter';
import SidebarFilter from './SidebarFilter';
import workApi from "../../api/workApi";
import WorkItem from "../Work/WorkItem";

const SearchBar = () => {
    const [jobCatalogAnchorEl, setJobCatalogAnchorEl] = useState(null);
    const [locationFilterAnchorEl, setLocationFilterAnchorEl] = useState(null);
    const [selectedState, setSelectedState] = useState({});
    const [selectedLocations, setSelectedLocations] = useState({});
    const [filters, setFilters] = useState({
        experience: 'Tất cả',
        salary: { from: '', to: '' },
        level: 'Tất cả',
        workType: 'Tất cả',
    });
    const [locations, setLocations] = useState([]);
    const [listWork, setWorkList] = useState([]);
    useEffect(() => {
        // Fetch data from the API
        fetch('https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json')
            .then((response) => response.json())
            .then((data) => setLocations(data))
            .catch((error) => console.error('Error fetching location data:', error));
    }, []);



    const [searchKeyword, setSearchKeyword] = useState('');

    const handleOpenJobCatalog = (event) => {
        setJobCatalogAnchorEl(event.currentTarget);
    };

    const handleCloseJobCatalog = () => {
        setJobCatalogAnchorEl(null);
    };

    const handleOpenLocationFilter = (event) => {
        setLocationFilterAnchorEl(event.currentTarget);
    };

    const handleCloseLocationFilter = () => {
        setLocationFilterAnchorEl(null);
    };

    const isJobCatalogOpen = Boolean(jobCatalogAnchorEl);
    const isLocationFilterOpen = Boolean(locationFilterAnchorEl);

    const handleSearch = () => {
        const searchParams = {
            keyword: searchKeyword,
            jobCategory: selectedState.selectedGroup,
            job: selectedState.selectedJob,
            subJobs: selectedState.selectedSubJobsMap || {},
            locations: selectedLocations,
            filters: filters,
        };

        const callApi = async ()=>{
            const response = await workApi.searchWork(searchKeyword)
            const data = response.object
            setWorkList(data)
        }
        callApi()
        // Gửi `searchParams` qua API hoặc xử lý tại đây.
    };

    useEffect(() => {
        const callApi = async ()=>{
            const response = await workApi.searchWork(searchKeyword)
            const data = response.object
            setWorkList(data)
        }
        callApi()
    }, []);
    const [jobCategories, setJobCategories] = useState([]);
    useEffect(() => {
        const callApi = async ()=>{
            const response = await workApi.jobCategory()
            const data = response.object
            setJobCategories(data)
        }
        callApi()
    }, []);
    const valuesArray = Object.values(selectedLocations).flat(); // Flatten into a single array
    const valuesArrayJob = Object.values(selectedState?.selectedSubJobsMap || {}).flat(); // Flatten into a single array
    let currentList = [];
    if (valuesArray.length > 0) {
        // Step 2: Filter listWork based on matches with valuesArray
        currentList = listWork.filter((item) => {
                const matchesLocation = item.locationSearch.some((location) => valuesArray.includes(location));
                return matchesLocation
            }
        );
    }else{
        currentList = listWork
    }
    if (valuesArrayJob.length > 0) {
        // Step 2: Filter listWork based on matches with valuesArray
        currentList = currentList.filter(item => item.skills.some(skill => valuesArrayJob.includes(skill.skillName)));
    }

    currentList = currentList.filter((item) => {
        const matchesExperience = filters.experience === "Tất cả" || item.experience === filters.experience
        const matchesPosition = filters.level === "Tất cả" || item.position === filters.level;
        const matchesTypeWork = filters.workType === "Tất cả" || item.workType === filters.workType
        return matchesExperience && matchesPosition && matchesTypeWork
        }
    );
    currentList = currentList.filter((item) => (filters.salary.from === '' && filters.salary.to === '') ||
        (filters.salary.from === '' && item.salaryMax <= (filters.salary.to * 1000000)) ||
        (filters.salary.to === '' && item.salaryMin >= (filters.salary.from * 1000000)) ||
        (item.salaryMin >= ((filters.salary.from || 0) * 1000000) && item.salaryMax <= (filters.salary.to * 1000000)));
    return (
        <div>
            <Box
                display="flex"
                alignItems="center"
                borderRadius={2}
                boxShadow={1}
                p={1}
                sx={{backgroundColor: 'white'}}
            >
                {/* Danh mục Nghề */}
                <Box
                    display="flex"
                    alignItems="center"
                    borderRight={1}
                    borderColor="grey.300"
                    pr={2}
                    sx={{cursor: 'pointer'}}
                    onClick={handleOpenJobCatalog}
                >
                    <MenuIcon sx={{mr: 1}}/>
                    <Typography variant="body1">Danh mục Nghề</Typography>
                </Box>

                {/* Ô tìm kiếm */}
                <Box flex={1} px={2}>
                    <InputBase
                        placeholder="Vị trí tuyển dụng, tên công ty"
                        fullWidth
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        inputProps={{'aria-label': 'search job or company'}}
                    />
                </Box>

                {/* Địa điểm */}
                <Box
                    display="flex"
                    alignItems="center"
                    borderLeft={1}
                    borderRight={1}
                    borderColor="grey.300"
                    px={2}
                    sx={{cursor: 'pointer'}}
                    onClick={handleOpenLocationFilter}
                >
                    <LocationOnIcon sx={{mr: 1}}/>
                    <Typography variant="body1">Địa điểm</Typography>
                </Box>

                {/* Nút Tìm kiếm */}
                <Box pl={2}>
                    <Button
                        variant="contained"
                        color="success"
                        startIcon={<SearchIcon/>}
                        sx={{borderRadius: 50, textTransform: 'none', px: 3}}
                        onClick={handleSearch}
                    >
                        Tìm kiếm
                    </Button>
                </Box>

                {/* Popover for Job Catalog */}
                <Popover
                    open={isJobCatalogOpen}
                    anchorEl={jobCatalogAnchorEl}
                    onClose={handleCloseJobCatalog}
                    anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                    transformOrigin={{vertical: 'top', horizontal: 'left'}}
                >
                    <Box p={2} sx={{maxHeight: '400px', overflow: 'auto'}}>
                        <JobCatalog selectedState={selectedState} setSelectedState={setSelectedState} jobCategories={jobCategories}/>
                    </Box>
                </Popover>

                {/* Popover for Location Filter */}
                <Popover
                    open={isLocationFilterOpen}
                    anchorEl={locationFilterAnchorEl}
                    onClose={handleCloseLocationFilter}
                    anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                    transformOrigin={{vertical: 'top', horizontal: 'right'}}
                >
                    <Box p={2} sx={{maxHeight: '550px', overflow: 'auto'}}>
                        <LocationFilter
                            selectedLocations={selectedLocations}
                            setSelectedLocations={setSelectedLocations}
                            locations={locations}
                        />
                    </Box>
                </Popover>
            </Box>
            <div style={{display:"flex"}}>
                <SidebarFilter filters={filters} setFilters={setFilters}/>
                <div >
                    {currentList.map((job, index) => (
                        <WorkItem key={index} job={job}/>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default SearchBar;
