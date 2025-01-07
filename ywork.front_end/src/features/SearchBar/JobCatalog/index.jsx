import React, { useState } from 'react';
import {
    Box,
    Checkbox,
    FormControlLabel,
    Typography,
    List,
    ListItem,
    ListItemText,
} from '@mui/material';

const JobCatalog = ({ selectedState, setSelectedState }) => {
    const [selectedGroup, setSelectedGroup] = useState(selectedState.selectedGroup || null);
    const [selectedJob, setSelectedJob] = useState(selectedState.selectedJob || null);
    const [selectedSubJobsMap, setSelectedSubJobsMap] = useState(selectedState.selectedSubJobsMap || {});

    const handleGroupSelection = (group) => {
        setSelectedGroup(group);
        setSelectedJob(null);
    };

    const handleJobSelection = (job) => {
        setSelectedJob(job);
        if (!selectedSubJobsMap[job]) {
            setSelectedSubJobsMap((prev) => ({ ...prev, [job]: [] }));
        }
    };

    const handleSubJobToggle = (subJob) => {
        setSelectedSubJobsMap((prev) => {
            const currentSubJobs = prev[selectedJob] || [];
            return {
                ...prev,
                [selectedJob]: currentSubJobs.includes(subJob)
                    ? currentSubJobs.filter((item) => item !== subJob)
                    : [...currentSubJobs, subJob],
            };
        });
    };

    React.useEffect(() => {
        setSelectedState({
            selectedGroup,
            selectedJob,
            selectedSubJobsMap,
        });
    }, [selectedGroup, selectedJob, selectedSubJobsMap]);

    const jobCategories = [
        {
            group: 'Kinh doanh/Bán hàng',
            jobs: [
                {
                    name: 'Sales Xuất nhập khẩu/Logistics',
                    subJobs: ['Sales Logistics', 'Sales Xuất nhập khẩu/Logistics khác'],
                },
                {
                    name: 'Sales Bất động sản/Xây dựng',
                    subJobs: [
                        'Sales bất động sản/Môi giới bất động sản',
                        'Kinh doanh thiết bị/vật liệu xây dựng',
                        'Kinh doanh nội thất',
                        'Sales Bất động sản/Xây dựng khác',
                    ],
                },
            ],
        },
        {
            group: 'Marketing/PR/Quảng cáo',
            jobs: [
                {
                    name: 'Digital Marketing',
                    subJobs: ['SEO Specialist', 'Content Marketing', 'Social Media Manager'],
                },
                {
                    name: 'Quảng cáo truyền thông',
                    subJobs: ['Media Buyer', 'Copywriter', 'Creative Director'],
                },
            ],
        },
    ];

    return (
        <Box
            p={1}
            display="flex"
            flexDirection="column"
            width="600px"
            height="400px"
            border={1}
            borderColor="grey.300"
            borderRadius={2}
            overflow="hidden"
            sx={{ backgroundColor: 'white', boxShadow: 2 }}
        >
            <Box display="flex" height="100%">
                <Box
                    width="25%"
                    overflow="auto"
                    borderRight={1}
                    borderColor="grey.300"
                    pr={1}
                    sx={{
                        backgroundColor: '#f9f9f9',
                    }}
                >
                    <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                        Nhóm nghề
                    </Typography>
                    {jobCategories.map((category, index) => (
                        <Box
                            key={index}
                            mb={1}
                            p={1}
                            border={1}
                            borderRadius={1}
                            borderColor={selectedGroup === category.group ? 'primary.main' : 'grey.300'}
                            onClick={() => handleGroupSelection(category.group)}
                            sx={{
                                cursor: 'pointer',
                                fontSize: '0.9rem',
                                backgroundColor: selectedGroup === category.group ? '#e3f2fd' : 'transparent',
                                '&:hover': {
                                    backgroundColor: '#e3f2fd',
                                },
                            }}
                        >
                            <Typography variant="body2" fontWeight="bold">
                                {category.group}
                            </Typography>
                        </Box>
                    ))}
                </Box>

                <Box
                    width="25%"
                    overflow="auto"
                    pl={1}
                    pr={1}
                    borderRight={1}
                    borderColor="grey.300"
                    sx={{ backgroundColor: '#f9f9f9' }}
                >
                    <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                        Nghề
                    </Typography>
                    {selectedGroup &&
                        jobCategories
                            .find((category) => category.group === selectedGroup)
                            .jobs.map((job, idx) => (
                            <Box
                                key={idx}
                                mb={1}
                                p={1}
                                border={1}
                                borderRadius={1}
                                borderColor={selectedJob === job.name ? 'primary.main' : 'grey.300'}
                                onClick={() => handleJobSelection(job.name)}
                                sx={{
                                    cursor: 'pointer',
                                    fontSize: '0.8rem',
                                    backgroundColor: selectedJob === job.name ? '#e3f2fd' : 'transparent',
                                    '&:hover': {
                                        backgroundColor: '#e3f2fd',
                                    },
                                }}
                            >
                                <Typography variant="body2">{job.name}</Typography>
                            </Box>
                        ))}
                </Box>

                <Box width="50%" overflow="auto" pl={1}>
                    <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                        Vị trí chuyên môn
                    </Typography>
                    {selectedJob && (
                        <List dense>
                            {jobCategories
                                .find((category) => category.group === selectedGroup)
                                .jobs.find((job) => job.name === selectedJob)
                                .subJobs.map((subJob, subIdx) => (
                                    <ListItem
                                        key={subIdx}
                                        disableGutters
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: '#f0f0f0',
                                            },
                                        }}
                                    >
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    size="small"
                                                    checked={
                                                        selectedSubJobsMap[selectedJob]?.includes(subJob) || false
                                                    }
                                                    onChange={() => handleSubJobToggle(subJob)}
                                                />
                                            }
                                            label={
                                                <ListItemText
                                                    primary={subJob}
                                                    primaryTypographyProps={{ fontSize: '0.8rem' }}
                                                />
                                            }
                                        />
                                    </ListItem>
                                ))}
                        </List>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default JobCatalog;
