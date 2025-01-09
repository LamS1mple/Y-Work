import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    InputBase,
    Typography,
    Popover,
    Pagination,
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
        currentList = listWork.filter((item) => {
                const matchesLocation = item.locationSearch.some((location) => valuesArray.includes(location));
                return matchesLocation;
            }
        );
    } else {
        currentList = listWork;
    }
    if (valuesArrayJob.length > 0) {
        currentList = currentList.filter(item => item.skills.some(skill => valuesArrayJob.includes(skill.skillName)));
    }

    currentList = currentList.filter((item) => {
            const matchesExperience = filters.experience === "Tất cả" || item.experience === filters.experience;
            const matchesPosition = filters.level === "Tất cả" || item.position === filters.level;
            const matchesTypeWork = filters.workType === "Tất cả" || item.workType === filters.workType;
            return matchesExperience && matchesPosition && matchesTypeWork;
        }
    );
    currentList = currentList.filter((item) => (filters.salary.from === '' && filters.salary.to === '') ||
        (filters.salary.from === '' && item.salaryMax <= (filters.salary.to * 1000000)) ||
        (filters.salary.to === '' && item.salaryMin >= (filters.salary.from * 1000000)) ||
        (item.salaryMin >= ((filters.salary.from || 0) * 1000000) && item.salaryMax <= (filters.salary.to * 1000000)));

    // State for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Items per page

    // Calculate total pages and paginated list
    const totalPages = Math.ceil(currentList.length / itemsPerPage);
    const paginatedList = currentList.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

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

                <Box flex={1} px={2}>
                    <InputBase
                        placeholder="Vị trí tuyển dụng, tên công ty"
                        fullWidth
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        inputProps={{'aria-label': 'search job or company'}}
                    />
                </Box>

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
            <div style={{display: "flex"}}>
                <SidebarFilter filters={filters} setFilters={setFilters}/>
                <div style={{flex: "3"}}>
                    {paginatedList.map((job, index) => (
                        <WorkItem key={index} job={job}/>
                    ))}
                </div>

            </div>
            <Box display="flex" justifyContent="center" mt={2}>
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                    siblingCount={1}
                    boundaryCount={1}
                />
            </Box>
        </div>
    );
};

export default SearchBar;
