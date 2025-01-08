import React, { useState } from 'react';
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

const LocationFilter = ({ selectedLocations, setSelectedLocations, locations }) => {
    const [selectedCity, setSelectedCity] = useState(null);

    const handleCitySelect = (cityName) => {
        setSelectedCity(cityName);
        if (!selectedLocations[cityName]) {
            setSelectedLocations((prev) => ({ ...prev, [cityName]: [] }));
        }
    };

    const handleDistrictToggle = (districtName) => {
        setSelectedLocations((prev) => {
            const currentDistricts = prev[selectedCity] || [];
            const updatedDistricts = currentDistricts.includes(districtName)
                ? currentDistricts.filter((d) => d !== districtName)
                : [...currentDistricts, districtName];
            return { ...prev, [selectedCity]: updatedDistricts };
        });
    };

    const handleSelectAllDistricts = () => {
        if (selectedCity) {
            const allDistrictNames = locations
                .find((location) => location.Name === selectedCity)?.Districts.map((district) => district.Name) || [];
            setSelectedLocations((prev) => ({ ...prev, [selectedCity]: allDistrictNames }));
        }
    };

    return (
        <Box>
            <Box display="flex" p={2} sx={{ maxHeight: '400px' }}>
                {/* Cities */}
                <Box sx={{ overflow: 'auto' }} borderRight={1} borderColor="grey.300" pr={2}>
                    <List>
                        {locations.map((location) => (
                            <ListItem
                                key={location.Name}
                                sx={{ cursor: 'pointer' }}
                                onClick={() => handleCitySelect(location.Name)}
                            >
                                <Typography
                                    variant="body2"
                                    fontWeight={selectedCity === location.Name ? 'bold' : 'normal'}
                                >
                                    {location.Name}
                                </Typography>
                            </ListItem>
                        ))}
                    </List>
                </Box>

                {/* Districts */}
                <Box width="50%" pl={2} sx={{ overflow: 'auto' }}>
                    {selectedCity && (
                        <>
                            <Typography variant="body2" fontWeight="bold" mb={1}>
                                Quận/Huyện
                            </Typography>
                            <List>
                                {locations
                                    .find((location) => location.Name === selectedCity)?.Districts.map((district) => (
                                        <ListItem key={district.Name} disableGutters>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        size="small"
                                                        checked={
                                                            selectedLocations[selectedCity]?.includes(district.Name) || false
                                                        }
                                                        onChange={() => handleDistrictToggle(district.Name)}
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
