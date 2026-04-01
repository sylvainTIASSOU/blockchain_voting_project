/**
 *  ce fichier va contenir les fonctions pour interagir avec le contrat intelligent VotingContract
 * 
 */
"use client";
import { useState, useEffect, createContext } from 'react'
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { votingAddress, votingContractABI } from "./constant";
import axios from "axios";
import { useRouter } from 'next/navigation';

const client = ipfsHttpClient({url: 'https://ipfs.infura.io:5001/api/v0'});
const fetchContract = (signerOrProvider: any) => new ethers.Contract(votingAddress, votingContractABI, signerOrProvider);
export const votingContext = createContext<any>('system');

export const VotingProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();
  const [currentAccount, setCurrentAccount] = useState('');
  const [candidateLength, setCandidateLength] = useState('');

  const pushCandidate: any = [];
  const candidateIndex: any = [];

  const [candidateArray, setCandidateArray] = useState(pushCandidate);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const higestVote = [];

  const pushVoter: any = [];
  const [voterArray, setVoterArray] = useState(pushVoter);
  const [voterLength, setVoterLength] = useState('');
  const [voterAddress, setVoterAddress] = useState([]);


  // ------------connecting wallet
  const checkIfWalletIsConnected = async () => {
    try {
      if (!window.ethereum) return setError("Please install MetaMask");
      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      if (accounts.length === 0) return setError("Please connect your wallet");
      setCurrentAccount(accounts[0]);
    } catch (error) {
      setError("Please connect your wallet");
    }
  }

  // function to connect wallet
  const connectWallet = async () => {
    try {
      if (!window.ethereum) return setError("Please install MetaMask");
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      if (accounts.length === 0) return setError("Please connect your wallet");
      setCurrentAccount(accounts[0]);
    } catch (error) {
      setError("Please connect your wallet");
    }
  }

  // ------- upload to ipfs voter image
  const uploadToIPFS = async (file: any) => {
    try {
      const added = await client.add(file);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      return url;
    } catch (error) {
      setError("Error uploading to IPFS");
    }
  }

    return (
      <votingContext.Provider  value={{title: "my first fuck Dapp of voting", checkIfWalletIsConnected, connectWallet, uploadToIPFS}}>
          {children}
      </votingContext.Provider>
    );
}
const Voter = () => {
  return (
    <div>Voter</div>
  )
}

export default Voter