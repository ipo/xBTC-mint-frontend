import React from 'react';
import '../App.css'
import {makeStyles} from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { useIntl } from 'react-intl';

const useStyles = makeStyles((theme) => ({
    statisticsCard: {
        padding: '12px',
        background: '#FFFFFF',
        minHeight: "250px",
        boxShadow: '0px -2px 25px -3px rgba(0, 0, 0, 0.1)',
        "&:hover": {
            border: '1px solid #E7E8F2',
            boxSizing: 'border-box',
            boxShadow: '0px 4px 21px rgba(0, 0, 0, 0.25)',
            borderRadius: '6px'
        },
        [theme.breakpoints.down('md')]:{
            marginTop: "0px",
        },
        [theme.breakpoints.up('lg')]:{
            marginTop: "30px",
        },

    },
    cardHeaderRoot: {
        paddingTop: 4,
        paddingBottom: 4
    },
    header: {
        fontFamily: 'IBM Plex Sans',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: '14px',
        lineHeight: '18px',
        color: '#01058A'
    },
    divider: {
        background: "#E7E8F2"
    },
    depositAmount: {
        backgroundColor: "#00AEEF",
        height: '200px',
        width: '200px',
        borderRadius: '100%',
        textAlign: "center",
        margin: 'auto',
        position: 'relative'
    },
    gearbox: {
        fontFamily: 'IBM Plex Sans',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: '23px',
        textAlign: 'center',
        color: '#FFFFFF',
        top: '50%',
        position: 'relative',
        transform: 'translate(-0%,-50%)'
    },
    lowerInfo: {
        display: "flex",
        marginTop: "20px !important",
        margin: "0 auto"
    },
    info: {
        fontFamily: 'HelveticaNeue',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: '13px',
        lineHeight: '14px',
        color: '#25233A',
        mixBlendMode: 'normal',
        margin: "0 auto",
        display: "flex"
    },
    infoConfident: {
        fontFamily: 'IBM Plex Sans',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: '18px',
        lineHeight: '23px',
        textAlign: 'center',
        color: '#08157E',
        margin: "0 auto"
    },
    indicator: {
        backgroundColor: "#00AEEF",
        height: '10px',
        width: '10px',
        borderRadius: '100%'
    },
    rewardIndicator: {
        backgroundColor: "#FFC123",
        height: '10px',
        width: '10px',
        borderRadius: '100%',
    },
    rewardIButtonStyle: {
        backgroundColor: "#FFC123",
        height: '70px',
        width: '80%',
        borderRadius: '100px',
        margin: "0 auto"
    },

    rewardMultiplier: {
        backgroundColor: "#08157E",
        height: '130px',
        width: '130px',
        borderRadius: '100%',
        textAlign: "center",
        margin: 'auto'
    },
    rewardCardContent: {
        marginTop: "70px"
    },
    rewardButtonText: {
        fontFamily: 'IBM Plex Sans',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: '23px',
        textAlign: 'center',
        color: '#FFFFFF',
        lineHeight: '70px'
    },
}));


function Stats({apy}) {
    const classes = useStyles();
    const intl = useIntl();
    const apyString = intl.formatMessage({id: 'content.apy', defaultMessage: "APY"});

    return (

        <Grid container spacing={5} direction={"row"} justify={"center"}>
            <Grid item md={4} sm={12} xs={12}>
                <Card className={classes.statisticsCard}>
                    <CardHeader title={apyString}
                                classes={{root: classes.cardHeaderRoot, title: classes.header}}>
                    </CardHeader>
                    <Divider classes={{root: classes.divider}}/>
                    <CardContent>
                        <div className={classes.depositAmount}>
                            <Typography variant={"h4"} className={classes.gearbox}>{apy}%</Typography>
                        </div>
                        {/* <div className={classes.lowerInfo}>

                            <div className={classes.info}>
                                <div className={classes.indicator}/>
                                &nbsp;Extra
                                info
                            </div>
                        </div> */}
                    </CardContent>
                </Card>
            </Grid>

            {/* <Grid item md={4} sm={12} xs={12}>
                <Card className={classes.statisticsCard}>
                    <CardHeader title={"Reward Multiplier"}
                                classes={{root: classes.cardHeaderRoot, title: classes.header}}>
                    </CardHeader>
                    <Divider classes={{root: classes.divider}}/>
                    <CardContent>
                        <div className={classes.rewardMultiplier}>
                            <Typography variant={"h4"} className={classes.gearbox}>2.3X</Typography>
                        </div>
                        <div className={classes.lowerInfo}>
                            <div className={classes.infoConfident}>
                                Confident
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item md={4} sm={12} xs={12}>
                <Card className={classes.statisticsCard}>
                    <CardHeader title={"Rewards"}
                                classes={{root: classes.cardHeaderRoot, title: classes.header}}>
                    </CardHeader>
                    <Divider classes={{root: classes.divider}}/>
                    <CardContent classes={{root: classes.rewardCardContent}}>
                        <div className={classes.rewardIButtonStyle}>
                            <Typography variant={"h4"} className={classes.rewardButtonText}>132733.224
                                xBTC</Typography>
                        </div>
                        <div className={classes.lowerInfo}>
                            <div className={classes.info}>
                                <div className={classes.rewardIndicator}/>
                                &nbsp;Extra info
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </Grid> */}
        </Grid>
    );
}

export default Stats;
