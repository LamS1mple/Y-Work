import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    TextField,
    Typography
} from "@mui/material";

const SidebarFilter = ({ filters, setFilters }) => {
    const handleSalaryChange = (value) => {
        const newSalaryRange = { from: '', to: '' };
        switch (value) {
            case 'Dưới 10 triệu':
                newSalaryRange.to = '10';
                break;
            case '10 - 15 triệu':
                newSalaryRange.from = '10';
                newSalaryRange.to = '15';
                break;
            case '15 - 20 triệu':
                newSalaryRange.from = '15';
                newSalaryRange.to = '20';
                break;
            case '20 - 25 triệu':
                newSalaryRange.from = '20';
                newSalaryRange.to = '25';
                break;
            case '25 - 30 triệu':
                newSalaryRange.from = '25';
                newSalaryRange.to = '30';
                break;
            case '30 - 50 triệu':
                newSalaryRange.from = '30';
                newSalaryRange.to = '50';
                break;
            case 'Trên 50 triệu':
                newSalaryRange.from = '50';
                break;
        }
        setFilters((prev) => ({
            ...prev,
            salary: { ...newSalaryRange },
            selectedSalary: value,
        }));
    };

    const handleReset = () => {
        setFilters({
            experience: 'Tất cả',
            salary: { from: '', to: '' },
            level: 'Tất cả',
            workType: 'Tất cả',
        });
    };

    return (
        <Box
            width="300px"
            p={2}
            borderRight={1}
            borderColor="grey.300"
            sx={{
                backgroundColor: 'white',
                height: '100vh',
                overflowY: 'auto',
            }}
        >
            <Typography variant="h6" fontWeight="bold" mb={2}>
                Lọc nâng cao
            </Typography>

            {/* Kinh nghiệm */}
            <FormControl component="fieldset" margin="normal">
                <FormLabel component="legend">Kinh nghiệm</FormLabel>
                <RadioGroup
                    value={filters.experience}
                    onChange={(e) =>
                        setFilters((prev) => ({ ...prev, experience: e.target.value }))
                    }
                >
                    <FormControlLabel value="Tất cả" control={<Radio />} label="Tất cả" />
                    <FormControlLabel value="Không yêu cầu kinh nghiệm" control={<Radio />} label="Không yêu cầu kinh nghiệm" />
                    <FormControlLabel value="Dưới 1 năm" control={<Radio />} label="Dưới 1 năm" />
                    <FormControlLabel value="1-2 năm" control={<Radio />} label="1-2 năm" />
                    <FormControlLabel value="2 năm" control={<Radio />} label="2 năm" />
                    <FormControlLabel value="2-3 năm" control={<Radio />} label="2-3 năm" />
                    <FormControlLabel value="3 năm" control={<Radio />} label="3 năm" />
                    <FormControlLabel value="3-4 năm" control={<Radio />} label="3-4 năm" />
                    <FormControlLabel value="4 năm" control={<Radio />} label="4 năm" />
                    <FormControlLabel value="4-5 năm" control={<Radio />} label="4-5 năm" />
                    <FormControlLabel value="Trên 5 năm" control={<Radio />} label="Trên 5 năm" />
                </RadioGroup>
            </FormControl>

            {/* Mức lương */}
            <FormControl component="fieldset" margin="normal">
                <FormLabel component="legend">Mức lương</FormLabel>
                <RadioGroup
                    value={filters.selectedSalary}
                    onChange={(e) => handleSalaryChange(e.target.value)}
                >
                    <FormControlLabel value="Tất cả" control={<Radio />} label="Tất cả" />
                    <FormControlLabel value="Dưới 10 triệu" control={<Radio />} label="Dưới 10 triệu" />
                    <FormControlLabel value="10 - 15 triệu" control={<Radio />} label="10 - 15 triệu" />
                    <FormControlLabel value="15 - 20 triệu" control={<Radio />} label="15 - 20 triệu" />
                    <FormControlLabel value="20 - 25 triệu" control={<Radio />} label="20 - 25 triệu" />
                    <FormControlLabel value="25 - 30 triệu" control={<Radio />} label="25 - 30 triệu" />
                    <FormControlLabel value="30 - 50 triệu" control={<Radio />} label="30 - 50 triệu" />
                    <FormControlLabel value="Trên 50 triệu" control={<Radio />} label="Trên 50 triệu" />
                </RadioGroup>
                <Box display="flex" alignItems="center" mt={2} gap={1}>
                    <TextField
                        label="Từ"
                        size="small"
                        value={filters.salary.from}
                        onChange={(e) =>
                            setFilters((prev) => ({
                                ...prev,
                                salary: { ...prev.salary, from: e.target.value },
                            }))
                        }
                    />
                    <TextField
                        label="Đến"
                        size="small"
                        value={filters.salary.to}
                        onChange={(e) =>
                            setFilters((prev) => ({
                                ...prev,
                                salary: { ...prev.salary, to: e.target.value },
                            }))
                        }
                    />
                    <Typography variant="body2">triệu</Typography>
                </Box>
            </FormControl>

            {/* Cấp bậc */}
            <FormControl component="fieldset" margin="normal">
                <FormLabel component="legend">Cấp bậc</FormLabel>
                <RadioGroup
                    value={filters.level}
                    onChange={(e) =>
                        setFilters((prev) => ({ ...prev, level: e.target.value }))
                    }
                >
                    <FormControlLabel value="Tất cả" control={<Radio />} label="Tất cả" />
                    <FormControlLabel value="Nhân viên" control={<Radio />} label="Nhân viên" />
                    <FormControlLabel value="Trưởng nhóm" control={<Radio />} label="Trưởng nhóm" />
                    <FormControlLabel value="Trưởng phòng" control={<Radio />} label="Trưởng phòng" />
                    <FormControlLabel value="Phó phòng" control={<Radio />} label="Phó phòng" />
                    <FormControlLabel value="Quản lý" control={<Radio />} label="Quản lý" />
                    <FormControlLabel value="Giám sát" control={<Radio />} label="Giám sát" />
                    <FormControlLabel value="Trưởng chi nhánh" control={<Radio />} label="Trưởng chi nhánh" />
                    <FormControlLabel value="Phó giám đốc" control={<Radio />} label="Phó giám đốc" />
                    <FormControlLabel value="Giám đốc" control={<Radio />} label="Giám đốc" />
                    <FormControlLabel value="Thực tập sinh" control={<Radio />} label="Thực tập sinh" />
                </RadioGroup>
            </FormControl>

            {/* Hình thức làm việc */}
            <FormControl component="fieldset" margin="normal">
                <FormLabel component="legend">Hình thức làm việc</FormLabel>
                <RadioGroup
                    value={filters.workType}
                    onChange={(e) =>
                        setFilters((prev) => ({ ...prev, workType: e.target.value }))
                    }
                >
                    <FormControlLabel value="Tất cả" control={<Radio />} label="Tất cả" />
                    <FormControlLabel value="Full-time" control={<Radio />} label="Toàn thời gian" />
                    <FormControlLabel value="Part-time" control={<Radio />} label="Bán thời gian" />
                </RadioGroup>
            </FormControl>

            {/* Nút Xóa lọc */}
            <Button variant="outlined" color="error" fullWidth onClick={handleReset} sx={{ mt: 2 }}>
                Xóa lọc
            </Button>
        </Box>
    );
};

export default SidebarFilter;
