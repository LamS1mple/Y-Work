import React, { useState } from 'react';
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

        console.log('Search parameters:', searchParams);
        // Gửi `searchParams` qua API hoặc xử lý tại đây.
    };

    return (
        <div>
            <Box
                display="flex"
                alignItems="center"
                borderRadius={2}
                boxShadow={1}
                p={1}
                sx={{ backgroundColor: 'white' }}
            >
                {/* Danh mục Nghề */}
                <Box
                    display="flex"
                    alignItems="center"
                    borderRight={1}
                    borderColor="grey.300"
                    pr={2}
                    sx={{ cursor: 'pointer' }}
                    onClick={handleOpenJobCatalog}
                >
                    <MenuIcon sx={{ mr: 1 }} />
                    <Typography variant="body1">Danh mục Nghề</Typography>
                </Box>

                {/* Ô tìm kiếm */}
                <Box flex={1} px={2}>
                    <InputBase
                        placeholder="Vị trí tuyển dụng, tên công ty"
                        fullWidth
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        inputProps={{ 'aria-label': 'search job or company' }}
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
                    sx={{ cursor: 'pointer' }}
                    onClick={handleOpenLocationFilter}
                >
                    <LocationOnIcon sx={{ mr: 1 }} />
                    <Typography variant="body1">Địa điểm</Typography>
                </Box>

                {/* Nút Tìm kiếm */}
                <Box pl={2}>
                    <Button
                        variant="contained"
                        color="success"
                        startIcon={<SearchIcon />}
                        sx={{ borderRadius: 50, textTransform: 'none', px: 3 }}
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
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                >
                    <Box p={2} sx={{ maxHeight: '400px', overflow: 'auto' }}>
                        <JobCatalog selectedState={selectedState} setSelectedState={setSelectedState} />
                    </Box>
                </Popover>

                {/* Popover for Location Filter */}
                <Popover
                    open={isLocationFilterOpen}
                    anchorEl={locationFilterAnchorEl}
                    onClose={handleCloseLocationFilter}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <Box p={2} sx={{ maxHeight: '550px', overflow: 'auto' }}>
                        <LocationFilter
                            selectedLocations={selectedLocations}
                            setSelectedLocations={setSelectedLocations}
                        />
                    </Box>
                </Popover>
            </Box>
            <SidebarFilter filters={filters} setFilters={setFilters} />
        </div>
    );
};

export default SearchBar;
