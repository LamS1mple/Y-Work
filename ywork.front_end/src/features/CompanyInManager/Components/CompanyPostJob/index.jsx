import React, {useEffect, useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import Select from 'react-select';
import {TextField, Button, Box, Typography, Grid} from '@mui/material';
import workApi from "../../../../api/workApi";

const CompanyPostJob = () => {
    const {register, setValue, watch, handleSubmit, control} = useForm();
    const [showSalaryRange, setShowSalaryRange] = useState(false);

    const [formattedSalaryMin, setFormattedSalaryMin] = useState('');
    const [formattedSalaryMax, setFormattedSalaryMax] = useState('');

    const formatPrice = (value) => {
        const numericValue = value.replace(/[^0-9]/g, ''); // Loại bỏ ký tự không phải số
        return numericValue ? new Intl.NumberFormat().format(Number(numericValue)) : '';
    };

    const handleInputChange = (field, value, setFormatted) => {
        setFormatted(formatPrice(value)); // Cập nhật giá trị hiển thị
        setValue(field, value.replace(/[^0-9]/g, '')); // Lưu giá trị gốc vào react-hook-form
    };

    const {mainIndustry, setMainIndustry} = useState([]);
    useEffect(() => {
        workApi.careerList()
            .then(response => {
                const data = response.object.map(career => ({
                    value: career.careerId,
                    label: career.careerName
                }));
                setMainIndustry(data);
            })
            .catch(error => console.log(error));
    }, []);

    const jobTypes = [
        {value: 1, label: 'Full-time'},
        {value: 2, label: 'Part-time'},
        {value: 3, label: 'Remote'},
    ];

    const genders = [
        {value: 1, label: 'Nam'},
        {value: 2, label: 'Nữ'},
        {value: 3, label: 'Không yêu cầu'},
    ];

    const salaryTypes = [
        {value: 1, label: 'Thỏa thuận'},
        {value: 2, label: 'Trong khoảng'},
    ];

    const areas = [
        {value: 'hanoi', label: 'Hà Nội'},
        {value: 'hcm', label: 'TP. Hồ Chí Minh'},
        {value: 'danang', label: 'Đà Nẵng'},
    ];
    const {subIndustry, setSubIndustry} = useState([])
    const handleChangeMainIndustry = async (selectedOption) => {
        workApi.skillList(selectedOption.value)
            .then(res => {
                const data = res.object.map(skill => ({
                    value: skill.skillId,
                    label: skill.skillName
                }));
                setSubIndustry(data);
            })
        console.log('Selected option:', selectedOption);
    }
    const onSubmit = (data) => {
        if (data.salaryType.value === 1) {
            data = {
                ...data,
                salaryMax: '',
                salaryMin: ''
            }
        }
        data = {
            ...data,
            salaryMin: Number(data.salaryMin.replace(/[^0-9]/g, '')),
            salaryMax: Number(data.salaryMax.replace(/[^0-9]/g, ''))
        }

        console.log(data);
    };

    return (
        <Box sx={{padding: '20px', maxWidth: '800px', margin: '0 auto'}}>
            <Typography variant="h4" component="h1" gutterBottom>
                Form Tuyển Dụng
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    {/* Tiêu đề */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Tiêu đề tin tuyển dụng"
                            {...register('jobTitle')}
                            placeholder="Nhập tiêu đề"
                            variant="outlined"
                        />
                    </Grid>

                    {/* Ngành nghề chính */}
                    <Grid item xs={12} sm={6}>

                        <Controller
                            name="mainIndustry"
                            control={control}
                            render={({field}) => (
                                <Select

                                    options={mainIndustry}
                                    {...field}
                                    placeholder="Nghành nghề chính"
                                    styles={{
                                        control: (base) => ({
                                            ...base,
                                            minHeight: '56px',
                                            padding: '10px 14px',
                                            fontSize: '16px',
                                        }),
                                        option: (base) => ({
                                            ...base,
                                            fontSize: '16px',
                                            padding: '8px 14px',
                                        }),
                                        menu: (base) => ({
                                            ...base,
                                            zIndex: '100',
                                        }),
                                    }}
                                    onChange={(selectedOption) => {
                                        field.onChange(selectedOption); // Cập nhật giá trị cho react-hook-form
                                        handleChangeMainIndustry(selectedOption); // Gọi hàm xử lý custom
                                    }}
                                />
                            )}
                        />
                    </Grid>

                    {/* Ngành nghề phụ */}
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name="subIndustry"
                            control={control}
                            render={({field}) => (
                                <Select
                                    options={subIndustry}
                                    {...field}
                                    isMulti
                                    placeholder="Nghành nghề phụ"
                                    styles={{
                                        control: (base) => ({
                                            ...base,
                                            minHeight: '56px',
                                            padding: '10px 14px',
                                            fontSize: '16px',
                                        }),
                                        option: (base) => ({
                                            ...base,
                                            fontSize: '16px',
                                            padding: '8px 14px',
                                        }),
                                        menu: (base) => ({
                                            ...base,
                                            zIndex: '100',
                                        }),
                                    }}
                                />
                            )}
                        />
                    </Grid>

                    {/* Số lượng tuyển dụng */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            type="number"
                            label="Số lượng tuyển dụng"
                            {...register('recruitmentNumber')}
                            placeholder="Nhập số lượng"
                            variant="outlined"
                        />
                    </Grid>


                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            type="date"
                            label="Ngày hết hạn"
                            {...register('expirationDate')}
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    {/* Vị trí tuyển dụng */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Vị trí tuyển dụng"
                            {...register('jobPosition')}
                            placeholder="Nhập vị trí tuyển dụng"
                            variant="outlined"
                        />
                    </Grid>

                    {/* Loại công việc */}
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name="jobType"
                            control={control}
                            render={({field}) => (
                                <Select
                                    options={jobTypes}
                                    {...field}
                                    placeholder="Chọn loại công việc"
                                    styles={{
                                        control: (base) => ({
                                            ...base,
                                            minHeight: '56px',
                                            padding: '10px 14px',
                                            fontSize: '16px',
                                        }),
                                        option: (base) => ({
                                            ...base,
                                            fontSize: '16px',
                                            padding: '8px 14px',
                                        }),
                                        menu: (base) => ({
                                            ...base,
                                            zIndex: '100',
                                        }),
                                    }}
                                />
                            )}
                        />
                    </Grid>

                    {/* Giới tính */}
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name="gender"
                            control={control}
                            render={({field}) => (
                                <Select
                                    options={genders}
                                    {...field}
                                    placeholder="Chọn giới tính"
                                    styles={{
                                        control: (base) => ({
                                            ...base,
                                            minHeight: '56px',
                                            padding: '10px 14px',
                                            fontSize: '16px',
                                        }),
                                        option: (base) => ({
                                            ...base,
                                            fontSize: '16px',
                                            padding: '8px 14px',
                                        }),
                                        menu: (base) => ({
                                            ...base,
                                            zIndex: '100',
                                        }),
                                    }}
                                />
                            )}
                        />
                    </Grid>

                    {/* Kiểu lương */}
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name="salaryType"
                            control={control}
                            render={({field}) => (
                                <Select
                                    options={salaryTypes}
                                    {...field}
                                    placeholder="Chọn kiểu lương"
                                    styles={{
                                        control: (base) => ({
                                            ...base,
                                            minHeight: '56px',
                                            padding: '10px 14px',
                                            fontSize: '16px',
                                        }),
                                        option: (base) => ({
                                            ...base,
                                            fontSize: '16px',
                                            padding: '8px 14px',
                                        }),
                                        menu: (base) => ({
                                            ...base,
                                            zIndex: '100',
                                        }),
                                    }}
                                    onChange={(selected) => {
                                        field.onChange(selected);
                                        setShowSalaryRange(selected.value === 2);
                                    }}
                                />
                            )}
                        />
                    </Grid>

                    {/* Input khoảng lương */}
                    {showSalaryRange && (
                        <>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth

                                    type="text"
                                    label="Lương tối thiểu"
                                    {...register('salaryMin')}
                                    placeholder="Nhập lương tối thiểu"
                                    variant="outlined"
                                    value={formattedSalaryMin}
                                    onChange={(e) =>
                                        handleInputChange('salaryMin', e.target.value, setFormattedSalaryMin)
                                    }
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    type="text"
                                    label="Lương tối đa"
                                    {...register('salaryMax')}
                                    placeholder="Nhập lương tối đa"
                                    variant="outlined"
                                    value={formattedSalaryMax}
                                    onChange={(e) =>
                                        handleInputChange('salaryMax', e.target.value, setFormattedSalaryMax)
                                    }
                                />
                            </Grid>
                        </>
                    )}

                    {/* Khu vực */}
                    <Grid item xs={12}>
                        <Controller
                            name="areas"
                            control={control}
                            render={({field}) => (
                                <Select
                                    options={areas}
                                    {...field}
                                    isMulti
                                    placeholder="Chọn khu vực"
                                    styles={{
                                        control: (base) => ({
                                            ...base,
                                            minHeight: '56px',
                                            padding: '10px 14px',
                                            fontSize: '16px',
                                        }),
                                        option: (base) => ({
                                            ...base,
                                            fontSize: '16px',
                                            padding: '8px 14px',
                                        }),
                                        menu: (base) => ({
                                            ...base,
                                            zIndex: '100',
                                        }),
                                    }}
                                />
                            )}
                        />
                    </Grid>

                    {/* Mô tả công việc */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            label="Mô tả công việc"
                            {...register('jobDescription')}
                            placeholder="Nhập mô tả công việc"
                            variant="outlined"
                        />
                    </Grid>

                    {/* Yêu cầu ứng viên */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            label="Yêu cầu ứng viên"
                            {...register('candidateRequirements')}
                            placeholder="Nhập yêu cầu ứng viên"
                            variant="outlined"
                        />
                    </Grid>

                    {/* Quyền lợi của ứng viên */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            label="Quyền lợi của ứng viên"
                            {...register('candidateBenefits')}
                            placeholder="Nhập quyền lợi ứng viên"
                            variant="outlined"
                        />
                    </Grid>


                    {/* Địa điểm làm việc */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            rows={3}
                            label="Địa điểm làm việc"
                            {...register('workLocation')}
                            placeholder="Nhập địa điểm làm việc"
                            variant="outlined"
                        />
                    </Grid>
                    {/* Nút gửi */}
                    <Grid item xs={12}>
                        <Button fullWidth variant="contained" color="primary" type="submit">
                            Gửi
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default CompanyPostJob;
