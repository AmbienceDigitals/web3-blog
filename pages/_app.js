import { useState } from 'react';
import '../styles/globals.css';
import Link from 'next/link';
import {css} from '@emotion/css';
import {ethers} from 'ethers';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider'
import {AccountContext} from '../context';
import {ownerAddress} from '../hardhat/config';
import 'easymde/dist/easymde.min.css'
import style from '../styles/app.css'


function MyApp({ Component, pageProps }) {
  // create local state to save account information after sign in
  const [account, setAccount] = useState(null)

  // Web3modal configuration for enabling wallet access
  const getWeb3Modal = async () => {
    const web3Modal = new Web3Modal({
      network: 'mainnet',
      cacheProvider: false,
      providerOptions: {
        walletConnect: {
          package: WalletConnectProvider,
          options: {
            infuraId: process.env.NEXT_PUBLIC_INFURA_ID
          },
        },
      },
    })
    return web3Modal
  }

  // connecting to user's wallet using web3 modal
  const connect = async () => {
    try {
      const web3Modal = await getWeb3Modal()
      const connection = await web3Modal.connect()
      const provider = new ethers.providers.Web3Provider(connection)
      const accounts = await provider.listAccounts()
    } catch (err) {
      console.log('error:', err)
    }
  }
  return (
    <div>
      <nav className={style.nav}></nav>
    </div>
  )
}

export default MyApp
