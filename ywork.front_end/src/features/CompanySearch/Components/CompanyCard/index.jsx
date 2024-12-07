import React from 'react';
import PropTypes from 'prop-types';
import {Box, Button, Card, CardActions, CardContent, CardMedia, Stack, Typography} from "@mui/material";
import backgroundLogo from '../../../../background.png'
import {Link} from "react-router-dom";
import companyApi from "../../../../api/companyApi";

const CompanyCard = props => {
    const company = props.company
    const handleChangeStatus = props.handleChangeStatus
    const handleApplyCompany = (status, companyId)=>{
        switch (status) {
            case 1:
                return;
            case 2:
                return;
            case 3:
                companyApi.companyChangeStatusApply({companyId, status: 2})
                    .then(res => {
                        handleChangeStatus(companyId);
                    })
                    .catch(error =>console.log(error))
                return;
            default:
                companyApi.applyCompany({companyId})
                    .then(res => {
                        handleChangeStatus(companyId)
                    })
                    .catch(error =>console.log(error))

        }
    }
    return (
        <Card sx={{maxWidth: 400, boxShadow: 3, borderRadius: 2}}>
            {/* Banner Image */}
            <CardMedia
                component="img"
                alt="Yeah1 Network"
                height="140"
                image={company.urlCoverPhoto || backgroundLogo}
            />
            <CardContent>
                {/* Title */}
                <Box style={{display: 'flex', marginTop: "-10px"}}>
                    <CardMedia

                        component='img'
                        style={{
                            height: '61px',
                            width: '61px',
                            borderRadius: "10px",
                            position: "relative",
                            top: "-40px"
                        }}
                        image={company.urlAvatar}
                    />
                    <Typography variant="h5" component="div" fontWeight="bold" gutterBottom
                                style={{

                                    fontSize: "15px",
                                    fontWeight: "700",
                                    lineHeight: "20px",
                                    marginLeft: "12px",
                                    textTransform: "uppercase"
                                }}>
                        {company.nameCompany}
                    </Typography>
                </Box>


                {/* Subtitle */}
                <Typography variant="body2" color="text.secondary">
                    <b>Số lượng nhân viên:</b> {company.quantityStaff} nhân viên
                </Typography>

                {/* Address */}
                <Typography variant="body2" color="text.secondary" mt={1}>
                    <b>Trụ sở chính:</b> {company.locationDetailCompany} , Phường {company.nameWard},
                    Quận {company.nameDistrict}, TP {company.nameProvince}
                </Typography>

                {/* Description */}
                <Typography style={{
                    height: "100px",
                    whiteSpace: "pre-wrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                }} variant="body2" color="text.secondary" mt={1}>
                    {company.descriptionCompany}
                </Typography>

                {/* Action Buttons */}
                <Box mt={2}>
                    <Stack direction="row" spacing={2}>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={() => handleApplyCompany(company.status, company.idCompany)}
                            sx={{textTransform: 'none', fontWeight: 'bold'}}
                        >
                            {
                                (() => {
                                    switch (company.status) {
                                        case 1:
                                            return <Link to={`/company/manager/${company.idCompany}`}
                                                         style={{color: "white"}}>Vào ngay</Link>;
                                        case 2:
                                            return "Đang chờ duyệt"
                                        case 3:
                                            return "Xin lại"
                                        default:
                                            return "Xin vào"
                                    }
                                })()
                            }
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            fullWidth
                            sx={{textTransform: 'none', fontWeight: 'bold'}}
                        >
                            Tìm hiểu
                        </Button>
                    </Stack>
                </Box>
            </CardContent>
        </Card>
    );
};

CompanyCard.propTypes = {};

export default CompanyCard;