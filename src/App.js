import React from 'react';
import './App.css';
import Layout from "./Layout/Layout";
import CssBaseline from "@material-ui/core/CssBaseline";
import {ThemeProvider} from '@material-ui/styles';
import {createMuiTheme} from "@material-ui/core";
import {createStore} from "redux";
import {reducer} from "./redux";
import { UseWalletProvider } from 'use-wallet'
import {Provider} from "react-redux";
import rpcInfo from './Info/rpc.json';

const store = createStore(reducer);

function App() {

    function getThemeType() {
        return createMuiTheme({
            palette: {
                type: "light",
                background: {
                    default: '#ffffff',
                },
            },
        });
    }

    return (
        <Provider store={store} >
            <ThemeProvider theme={getThemeType()}>
                <UseWalletProvider
                    chainId={rpcInfo.testnet.chainId}
                    connectors={{
                      walletconnect: { rpcUrl: rpcInfo.testnet.rpc },
                    }}
                >
                    <CssBaseline/>
                    <Layout/>
                </UseWalletProvider>
            </ThemeProvider>
        </Provider>
    );
}

export default App;
