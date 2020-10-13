import Web3 from 'web3';
import geyserAbi from '../Info/abi/geyser.json';
import erc20 from '../Info/abi/erc20.json';
import tokens from "../Info/token.json";
import BigNumber from 'bignumber.js'
import axios from 'axios';
import { ethers } from 'ethers'

const tokenInfo = tokens.mainnet;

class Geyser {
    web3 = null;
    geyserContract = null;
    lpContract = null;
    account = "";

    constructor(_account, _provider) {
        const provider = _provider;
        this.web3 = new Web3(provider);
        this.geyserContract = new this.web3.eth.Contract(geyserAbi, tokenInfo.geyser);
        this.geyserContract.setProvider(provider);
        this.lpContract = new this.web3.eth.Contract(erc20, tokenInfo.staking.contract);
        this.lpContract.setProvider(provider);
        this.account = _account;
    }

    async availableBalance() {
        const balance = await this.lpContract.methods.balanceOf(this.account).call();
        console.log(balance);
        return balance;
    }

    async availableHumanBalance() {
        const balance = await this.availableBalance();
        return this.toHuman(balance, this.lpDecimals);
    }

    toHuman(num, decimals) {
        const humanNum = new BigNumber(num).div(new BigNumber(10).pow(new BigNumber(decimals)));
        return humanNum.toNumber();
    }

    toBigNum(num, decimals) {
        console.log((new BigNumber(num).times(new BigNumber(10).pow(new BigNumber(decimals)))).toString());
        return new BigNumber(num).times(new BigNumber(10).pow(new BigNumber(decimals)));
    }

    async allownace() {
        const allowance = await this.lpContract.methods.allowance(this.account, tokenInfo.geyser).call();
        console.log(allowance.toString(0));
        return this.toHuman(allowance, this.lpDecimals);
    }

    async approve(amount) {
        try {
            const tx = await this.lpContract.methods.approve(tokenInfo.geyser, this.toBigNum(amount, this.lpDecimals)).send({
                from: this.account
            });
            console.log(tx);
            return {
                hash: tx.blockHash,
                status: tx.status,
            }
        } catch (err) {
            return {
                status: false
            }
        }
    }  

    async stake(amount) {
        try {
            const tx = await this.geyserContract.methods.stake(this.toBigNum(amount, this.lpDecimals), "0x0").send({
                from: this.account
            });
            console.log(tx);
            return {
                hash: tx.blockHash,
                status: tx.status,
            }
        } catch (err) {
            return {
                status: false
            }
        }
    }

    async depositedAmount() {
        const depositedAmount = await this.geyserContract.methods.totalStakedFor(this.account).call();
        return this.toHuman(depositedAmount, this.lpDecimals);
    }

    async unstake(amount) {
        try {
            const tx = await this.geyserContract.methods.unstake(this.toBigNum(amount, this.lpDecimals), "0x0").send({
                from: this.account
            });
            console.log(tx);
            return {
                hash: tx.blockHash,
                status: tx.status,
            }
        } catch (err) {
            return {
                status: false
            }
        }
    }

    async checkTxStatus(hash) {
        const receipt = await this.web3.eth.getTransactionReceipt(hash);
        console.log(receipt);
        return false;
    }

    addEventListener(event, handler) {
        this.geyserContract.events[event]({filter: {user: this.account}}, (error, result) => {
            if (result) {
                const amount = result.returnValues.amount;
                handler(error, this.toHuman(amount, tokenInfo.reward.decimals));
            };
        });
    }

    removeEventListenr(event) {
    }

    get lpDecimals() {
        return tokenInfo.staking.decimals;
    }
}

export const getTotalStats = async() => {
    const basicUrl = "https://data.xbtc.fi/geyser_stats/";
    const res = await axios.get(basicUrl + tokenInfo.geyser);
    return res.data;
}

export default Geyser;
