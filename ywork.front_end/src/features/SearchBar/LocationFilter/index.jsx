import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Popover,
    Checkbox,
    FormControlLabel,
    List,
    ListItem,
    Button
} from '@mui/material';

const LocationFilter = ({ selectedLocations, setSelectedLocations }) => {
    const [selectedCity, setSelectedCity] = useState(null);
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        // Fetch data from the API
        fetch('https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json')
            .then((response) => response.json())
            .then((data) => setLocations(data))
            .catch((error) => console.error('Error fetching location data:', error));
    }, []);

    const handleCitySelect = (cityId) => {
        setSelectedCity(cityId);
        if (!selectedLocations[cityId]) {
            setSelectedLocations((prev) => ({ ...prev, [cityId]: [] }));
        }
    };

    const handleDistrictToggle = (districtId) => {
        setSelectedLocations((prev) => {
            const currentDistricts = prev[selectedCity] || [];
            const updatedDistricts = currentDistricts.includes(districtId)
                ? currentDistricts.filter((d) => d !== districtId)
                : [...currentDistricts, districtId];
            return { ...prev, [selectedCity]: updatedDistricts };
        });
    };

    const handleSelectAllDistricts = () => {
        if (selectedCity) {
            const allDistrictIds = locations
                .find((location) => location.Id === selectedCity)?.Districts.map((district) => district.Id) || [];
            setSelectedLocations((prev) => ({ ...prev, [selectedCity]: allDistrictIds }));
        }
    };

    return (
        <Box>
            <Box display="flex" p={2} sx={{ maxHeight: '400px' }}>
                {/* Cities */}
                <Box  sx={{ overflow: 'auto'}} borderRight={1} borderColor="grey.300" pr={2}>
                    <List>
                        {locations.map((location) => (
                            <ListItem
                                key={location.Id}
                                sx={{ cursor: 'pointer' }}
                                onClick={() => handleCitySelect(location.Id)}
                            >
                                <Typography
                                    variant="body2"
                                    fontWeight={selectedCity === location.Id ? 'bold' : 'normal'}
                                >
                                    {location.Name}
                                </Typography>
                            </ListItem>
                        ))}
                    </List>
                </Box>

                {/* Districts */}
                <Box width="50%" pl={2} sx={{ overflow: 'auto'}} >
                    {selectedCity && (
                        <>
                            <Typography variant="body2" fontWeight="bold" mb={1}>
                                Quận/Huyện
                            </Typography>
                            <List>
                                {locations
                                    .find((location) => location.Id === selectedCity)?.Districts.map((district) => (
                                        <ListItem key={district.Id} disableGutters>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        size="small"
                                                        checked={
                                                            selectedLocations[selectedCity]?.includes(district.Id) || false
                                                        }
                                                        onChange={() => handleDistrictToggle(district.Id)}
                                                    />
                                                }
                                                label={
                                                    <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
                                                        {district.Name}
                                                    </Typography>
                                                }
                                            />
                                        </ListItem>
                                    ))}
                            </List>
                        </>
                    )}
                </Box>
            </Box>

            <Box display="flex" justifyContent="space-between" p={2}>
                <Button
                    size="small"
                    color="error"
                    onClick={() => setSelectedLocations({})}
                >
                    Bỏ chọn tất cả
                </Button>
                <Button
                    size="small"
                    color="primary"
                    onClick={handleSelectAllDistricts}
                    disabled={!selectedCity}
                >
                    Chọn tất cả
                </Button>
            </Box>
        </Box>
    );
};

export default LocationFilter;
