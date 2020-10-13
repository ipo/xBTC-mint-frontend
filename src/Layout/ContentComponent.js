import React, {useState, useEffect} from 'react';
import '../App.css'
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import {makeStyles, withStyles} from "@material-ui/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import CircularProgress from "@material-ui/core/CircularProgress";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import {fade, InputBase} from "@material-ui/core";
import { useWallet } from 'use-wallet'
import Stats from "../Statistics/Stats";
import tokens from "../Info/token.json"
import Geyser, {getTotalStats} from '../geyser';

const tokenInfo = tokens.mainnet;

const useStyles = makeStyles((theme) => ({
    box: {
        border: '1px solid #eee',
        borderRadius: '8px',
        width: 'auto',
        padding: '10px 15px',
        marginTop: '0px',
        background: '#f8f8f8',
        color: ' #000',
        boxSizing: 'border-box !important'
    },

    bodyText: {
        fontSize: '1rem',
        textAlign: 'left',
        fontWeight: '300',
        lineHeight: '25px'
    },
    price: {
        fontSize: '1rem',
        textAlign: 'left',
        fontWeight: '600',
        lineHeight: '25px',
        color: "#000"
    },
    helpIconGrid: {
        textAlign: "right"
    },
    helpIcon: {
        color: "#2c2c2c",
        fontSize: "1.25em"
    },
    card: {
        padding: '12px',
        marginTop: "50px",
        boxShadow: '0px -2px 25px -3px rgba(0, 0, 0, 0.1) !important'
    },


    tabs: {
        marginTop: "12px"
    },
    tabsStyle: {
        backgroundColor: "#000",
        color: '#777',
        borderRadius: "8px",
        '& .MuiTab-textColorPrimary': {
            color: '#777',
            fontWeight: "bold"
        },
        '& .MuiTab-textColorPrimary.Mui-selected': {
            color: '#000000',
            border: '1.5px solid #2c2c2c',
            background: '#fff',
            boxSizing: 'border-box',
            borderRadius: '10px',
            fontWeight: "bold"
        }
    },

    tabRoot: {
        width: "100%",
    },
    listItems: {},
    listPrimaryText: {
        fontFamily: 'IBM Plex Sans',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: '14px',
        lineHeight: '18px',
        color: '#33343D',
    },
    secondaryText: {
        fontFamily: 'IBM Plex Sans',
        fontStyle: 'normal',
        fontWeight: '300',
        fontSize: '14px',
        lineHeight: '18px',
        color: '#33343D',
    },
    listHead: {
        fontFamily: 'IBM Plex Sans',
        fontStyle: 'normal',
        fontWeight: '300',
        fontSize: '15px',
        lineHeight: '19px',
        color: '#25233A',
        opacity: '0.26'
    },
    header: {
        fontFamily: 'IBM Plex Sans',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: '14px',
        lineHeight: '18px',
        color: '#01058A'
    },
    cardHeaderRoot: {
        paddingTop: 4,
        paddingBottom: 4
    },
    walletBalanceCard: {
        background: '#08157E',
        borderRadius: '6px',
        marginTop: "50px",
        padding: "8px"
    },
    depositBalanceCard: {
        background: '#00AEEF',
        borderRadius: '6px',
        marginTop: "40px",
        padding: "8px"

    },
    walletHeader: {
        fontFamily: 'IBM Plex Sans',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: '24px',
        lineHeight: '114.95%',
        color: '#FFFFFF',
        [theme.breakpoints.down('md')]: {
            width: "100%",
        }
    },
    walletHeaderThin: {
        fontFamily: 'IBM Plex Sans',
        fontStyle: 'normal',
        fontWeight: '300',
        fontSize: '16px',
        lineHeight: '114.95%',
        color: '#FFFFFF',
        marginTop: "2px",
        [theme.breakpoints.down('md')]: {
            width: "100%",
        }
    },
    depositAmount: {
        backgroundColor: "#00AEEF",
        height: '130px',
        width: '130px',
        borderRadius: '100%',
        textAlign: "center",
        margin: 'auto'
    },

    gearbox: {
        fontFamily: 'IBM Plex Sans',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: '23px',
        textAlign: 'center',
        color: '#FFFFFF',
        lineHeight: '130px'
    },

    withdrawButton: {
        background: '#3bc0f3',
        mixBlendMode: 'normal',
        borderRadius: '4px',
        color: '#FFFFFF',
        boxShadow: "none",
        height: '40px',
        marginTop: '60px',
        marginBottom: '20px',
        [theme.breakpoints.down('md')]: {
            marginBottom: '30px',
            marginTop: '30px',
            width: "100%"
        },
        "&:hover": {
            background: '#3bc0f3',
            color: '#FFFFFF',
        }

    },
    withdrawButtonMax: {
        background: '#3bc0f3',
        mixBlendMode: 'normal',
        borderRadius: '4px',
        color: '#FFFFFF',
        boxShadow: "none",
        marginLeft: "8px",
        height: '40px',
        marginTop: '-5px',
        "&:hover": {
            background: '#3bc0f3',
            color: '#FFFFFF',
        }
    },
    depositButton: {
        background: '#3240a2',
        mixBlendMode: 'normal',
        borderRadius: '4px',
        color: '#FFFFFF',
        boxShadow: "none",
        marginLeft: "8px",
        height: '40px',
        marginTop: '-5px',
        "&:hover": {
            background: '#3240a2',
            color: '#FFFFFF',
        },
        [theme.breakpoints.down('md')]: {
            width: "100%"
        },
    },
    depositButtonMax: {
        background: '#3240a2',
        mixBlendMode: 'normal',
        borderRadius: '4px',
        color: '#FFFFFF',
        boxShadow: "none",
        marginLeft: "8px",
        height: '40px',
        marginTop: '-5px',
        "&:hover": {
            background: '#3bc0f3',
            color: '#FFFFFF',
        }
    },
    listItemRoot: {
        paddingTop: "16px",
        paddingBottom: "16px",
    },
    divider: {
        background: "#E7E8F2"
    },
    loading: {
        width: '40px',
        height: '40px',
        position: 'fixed',
        left: '50%',
        top: '50%',
    }
}));


const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
        marginTop: "20px",
        marginBottom: "20px",
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.common.white,
        border: '1px solid #ced4da',
        fontSize: 18,
        width: '100%',
        padding: '8px 8px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
            borderColor: theme.palette.primary.main,
        },
    },
}))(InputBase);

const statsLabels = [{
    id: "all_time_total_rewards_token",
    name: "Total Rewards",
    unit: "xBTC"
}, {
    id: "current_locked_rewards_token",
    name: "Locked Rewards",
    unit: "xBTC"
}, {
    id: "program_duration_days",
    name: "Maximum bonuse at",
    unit: "days"
}, {
    id: "current_total_staked",
    name: "Total Deposits",
    unit: "USD"
}, {
    id: "current_unlocked_rewards_token",
    name: "Unlocked Rewards",
    unit: "xBTC"
}, {
    id: "current_reward_rate_daily",
    name: "Reward unlock rate",
    unit: "xBTC / month"
}];

const TxType = {
    None: 0,
    Approve: 1, 
    Deposit: 2,
    Withdraw: 3,
}

function ContentComponent() {
    const classes = useStyles();
    const { account, ethereum, connect } = useWallet()

    const [availableBalance, setAvailableBalance] = useState(0);
    const [allowance, setAllownace] = useState(0);
    const [pending, setPending] = useState(false);
    const [pendingTxType, setPendingTxType] = useState(TxType.None);
    const [checkTxTimer, setCheckTxTimer] = useState(null);
    const [pendingTx, setPendingTx] = useState(null);

    const [claimedReward, setClaimedReward] = useState(null);

    const [depositedBalance, setDepositedBalance] = useState(0);
    const [geyser, setGeyser] = useState(null);

    const [apy, setAPY] = useState(0);
    const [estimateRewardRate, setEstimateRewardRate] = useState(0);

    const [deposit, setDeposit] = useState(null)
    const [withdraw, setWithdraw] = useState(null)

    const handleChangeDepositAmount = (event) => {
        const num = Number(event.target.value);
        if (num >= 0) {
            setDeposit(num);
        } else {
            setDeposit(-num);
        }
    }
    const handleChangeWithdrawAmount = (event) => {
        const num = Number(event.target.value);
        if (num >= 0) {
            setWithdraw(num);
        } else {
            setWithdraw(-num);
        }
    }

    const depositPercent = () => {
        if (deposit === null || availableBalance === 0) {
            return 0;
        }
        if (deposit > availableBalance) {
            return 100;
        }
        return deposit * 100 / availableBalance;
    }

    const estimateMonthlyReward = () => {
        if (deposit === null || deposit <= 0) {
            return 0;
        }
        return deposit * estimateRewardRate;
    }

    const requireApprove = () => {
        if (deposit === null || deposit === 0) {
            return false;
        }
        if (account) {
            return deposit > allowance;
        }
        return false;
    }

    const approveToken = () => {
        if (geyser && !pending) {
            setPending(true);
            geyser.approve(availableBalance).then(({hash, status}) => {
                setPending(false);
                updateInfo(geyser);
                // setPendingTx(hash);
                setPendingTxType(TxType.Approve);
            });
        }
    }

    const stake = () => {
        if (geyser && !pending) {
            if (deposit <= allowance) {
                setPending(true);
                geyser.stake(deposit).then(({hash, status}) => {
                    setPending(false);
                    updateInfo(geyser);
                    // setPendingTx(hash);
                    setPendingTxType(TxType.Deposit);
                });
            }
        }
    }

    const unstake = () => {
        if (geyser && !pending) {
            if (withdraw <= depositedBalance) {
                setPending(true);
                geyser.unstake(withdraw).then(({hash, status}) => {
                    setPending(false);
                    updateInfo(geyser);
                    // setPendingTx(hash);
                    setPendingTxType(TxType.Withdraw);
                });
            }
        }
    }
    
    const setMaxWithdraw = () => {
        setWithdraw(depositedBalance);
    }

    const setMaxDeposit = () => {
        setDeposit(availableBalance);
    }

    const checkTxStatus = async () => {
        if (pendingTx && geyser) {
            const confirmed = await geyser.checkTxStatus(pendingTx);
            if (confirmed) {
                setPendingTx(null);
                setPendingTxType(TxType.None);
                setPending(false);
                if (checkTxTimer) {
                    clearInterval(checkTxTimer);
                }
                setCheckTxTimer(null);
            }
        }
    }
    const [items, setItems] = React.useState([
        {
            name: "Total Rewards",
            value: "-- xBTC",
        }, {
            name: "Locked Rewards",
            value: "-- xBTC",
        }, {
            name: "Program duration",
            value: "-- days left",
        }, {
            name: "Total Deposits",
            value: "-- USD",
        }, {
            name: "Unlocked Rewards",
            value: "-- xBTC",
        }, {
            name: "Reward unlock rate",
            value: "-- xBTC / month",
        }
    ]);

    const updateTotalStats = async () => {
        const stats = await getTotalStats();
        const newItems = statsLabels.map(statsLabel => {
            return {
                name: statsLabel.name,
                value: stats[statsLabel.id].toFixed(2) + " " + statsLabel.unit
            }
        });
        setEstimateRewardRate(stats.current_reward_rate_daily * 30 / stats.all_time_total_rewards);
        setItems(newItems);
        setAPY(stats.apy_estimate);
    }

    const updateInfo = (_geyser) => {
        _geyser.availableHumanBalance().then(_balance => {
            setAvailableBalance(_balance);
        });
        _geyser.allownace().then(_allowance => {
            setAllownace(_allowance);
        });
        _geyser.depositedAmount().then(_depositedAmount => {
            setDepositedBalance(_depositedAmount);
        });

        updateTotalStats();
    }

    useEffect(() => {
        if (pendingTx !== null) {
            const interval = setInterval(() => {
                checkTxStatus();
            }, 5000);
            setCheckTxTimer(interval);
        }
    }, [pendingTx])

    useEffect(() => {
        if (account) {
            const geyser = new Geyser(account, ethereum);
            setGeyser(geyser);
            
            updateInfo(geyser);

            geyser.addEventListener("TokensClaimed", (error, result) => {
                if (error) {
                    return;
                }
                console.log("=====")
                console.log(result);
                setClaimedReward(result);
                // console.log(sender, reward);
            });
        } else {
            if (geyser) {
                geyser.removeEventListener("TokensClaimed");
            }
            setGeyser(null);
            setPending(false);
            setAllownace(0);
            setAvailableBalance(0);
            setDepositedBalance(0);
        }
    }, [account]);

    useEffect(() => {
        updateTotalStats();
    }, [])

    return (
        <Container maxWidth="lg" component="main">
            {pending && <CircularProgress className={classes.loading}/>}
            {!pending &&
            <Grid container spacing={5}>
                <Grid item md={8}>
                    <Card className={classes.walletBalanceCard}>
                        <CardContent>
                            <Grid container spacing={2} alignItems="center" justify={"center"}>
                                <Grid item md={6} sm={12} xs={12}>
                                    <Typography variant={"h5"} className={classes.walletHeader}>Wallet
                                        balance:</Typography>
                                    <Typography variant={"h6"} className={classes.walletHeaderThin}>{availableBalance}&nbsp;
                                        ({tokenInfo.staking.name})</Typography>
                                    <BootstrapInput type={"number"} id="bootstrap-input" placeholder={"Enter Amount"}
                                                    value={deposit ? deposit.toString() : null}
                                                    onChange={handleChangeDepositAmount}/>
                                    <Button
                                        variant={"contained"}
                                        className={classes.depositButtonMax}
                                        onClick={() => setMaxDeposit()}
                                    >
                                        Max
                                    </Button>
                                    <Typography variant={"h5"} className={classes.walletHeader}>Your Estimated
                                        Rewards:</Typography>
                                    <Typography variant={"h6"} className={classes.walletHeaderThin}>{estimateMonthlyReward().toFixed(2)} {tokenInfo.reward.name} /
                                        month</Typography>
                                </Grid>

                                <Grid item md={4} sm={12} xs={12}>
                                    <div className={classes.depositAmount}>
                                        <Typography variant={"h4"} className={classes.gearbox}>{depositPercent().toFixed(2)} %</Typography>
                                    </div>

                                </Grid>
                                <Grid item md={2} sm={12} xs={12}>
                                {
                                    !account && <Button
                                        variant={"contained"}
                                        className={classes.depositButton}
                                        onClick={() => connect('injected')}
                                    >Connect</Button>
                                }
                                {
                                    account && requireApprove() && <Button
                                        variant={"contained"}
                                        className={classes.depositButton}
                                        onClick={() => approveToken()}
                                    >Approve</Button>
                                }
                                {
                                    account && !requireApprove() && 
                                    <Button
                                        variant={"contained"} 
                                        className={classes.depositButton}
                                        onClick={() => stake()}
                                    >Deposit</Button>
                                }
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                    <Card className={classes.depositBalanceCard}>
                        <CardContent>
                            <Grid container spacing={2} alignItems="center" justify={"center"}>
                                <Grid item md={8} sm={12} xs={12}>
                                    <Typography variant={"h5"} className={classes.walletHeader}>Deposited
                                        balance:</Typography>
                                    <Typography variant={"h6"} className={classes.walletHeaderThin}>{depositedBalance}&nbsp;
                                        ({tokenInfo.staking.name})</Typography>
                                    <BootstrapInput type={"number"} id="bootstrap-input" placeholder={"Enter Amount"}
                                                    value={withdraw ? withdraw.toString() : ""}
                                                    onChange={handleChangeWithdrawAmount}/>
                                    <Button
                                        variant={"contained"}
                                        className={classes.withdrawButtonMax}
                                        onClick={() => setMaxWithdraw()}
                                    >
                                        Max
                                    </Button>

                                    {/* <Typography variant={"h5"} className={classes.walletHeader}>Amount to
                                        Withdraw</Typography>
                                    <Typography variant={"h6"} className={classes.walletHeaderThin}>222330.00 {tokenInfo.reward.name} /
                                        month</Typography> */}
                                </Grid>
                                <Grid container item md={4} sm={12} xs={12} justify="flex-end">
                                    {
                                        account && <Button
                                            variant={"contained"}
                                            className={classes.withdrawButton}
                                            onClick={() => unstake()}
                                        >Withdraw</Button>
                                    }
                                    {
                                        !account && <Button
                                            variant={"contained"}
                                            className={classes.withdrawButton}
                                            onClick={() => connect('injected')}
                                        >Connect</Button>
                                    }
                                    {
                                        account && claimedReward !== null && <>
                                        <br/>
                                            <Typography variant={"h5"} className={classes.walletHeader}>Rewards
                                                Claimed</Typography>
                                            <Typography variant={"h6"} className={classes.walletHeaderThin}>{claimedReward.toFixed(2)}&nbsp;
                                            {tokenInfo.reward.name}</Typography>
                                        </>
                                    }
                                </Grid>

                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item md={4} sm={12} xs={12}>
                    <Card className={classes.card}>
                        <CardHeader title={"Stats"} classes={{root: classes.cardHeaderRoot, title: classes.header}}>
                        </CardHeader>
                        <Divider classes={{root: classes.divider}}/>
                        <List className={classes.listItems}>
                            <ListItem classes={{root: classes.listItemRoot}}>
                                <ListItemText primary={"Type"} classes={{primary: classes.listHead}}/>
                                <ListItemSecondaryAction>
                                    <ListItemText primary={"Amount"} classes={{primary: classes.listHead}}/>
                                </ListItemSecondaryAction>
                            </ListItem>
                            {items.map((value, index) => {
                                return (<React.Fragment key={index}>
                                        <Divider classes={{root: classes.divider}}/>
                                        <ListItem key={value} classes={{root: classes.listItemRoot}}>
                                            <ListItemText primary={value.name}
                                                          classes={{primary: classes.listPrimaryText}}/>
                                            <ListItemSecondaryAction>
                                                <ListItemText primary={value.value}
                                                              classes={{primary: classes.secondaryText}}/>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    </React.Fragment>
                                );
                            })}
                        </List>
                    </Card>
                </Grid>
                <Grid item md={12}>
                    <Stats apy={apy.toFixed()}/>
                </Grid>
            </Grid>
            }
        </Container>

    );
}

export default ContentComponent;
