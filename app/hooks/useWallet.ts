// useWallet.ts
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ethers, BrowserProvider } from "ethers";
import { RootState, AppDispatch } from "../../redux/store";
import {
  setAccount,
  setBalance,
  setProvider,
} from "@/redux/slices/walletSlice";

declare global {
  interface Window {
    ethereum?: any;
  }
}

const useWallet = () => {
  const dispatch: AppDispatch = useDispatch();
  const { account, balance, provider } = useSelector(
    (state: RootState) => state.wallet
  );
  useEffect(() => {
    const initWallet = async () => {
      if (!window.ethereum) return;

      const ethProvider = new BrowserProvider(window.ethereum);
      dispatch(setProvider(ethProvider));

      try {
        const accounts: string[] = await window.ethereum.request({
          method: "eth_accounts",
        });

        if (accounts.length > 0) {
          const acc = accounts[0];
          dispatch(setAccount(acc));

          const rawBalance = await ethProvider.getBalance(acc);
          dispatch(setBalance(ethers.formatEther(rawBalance)));
        }
      } catch (error) {
        console.error("Auto reconnect wallet error:", error);
      }
    };

    initWallet();
  }, [dispatch]);
  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Vui lòng cài MetaMask!");
      return;
    }

    try {
      const ethProvider = provider ?? new BrowserProvider(window.ethereum);
      if (!provider) dispatch(setProvider(ethProvider));

      const accounts: string[] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const acc = accounts[0];
      dispatch(setAccount(acc));

      const rawBalance = await ethProvider.getBalance(acc);
      dispatch(setBalance(ethers.formatEther(rawBalance)));
    } catch (error) {
      console.error("Connect wallet error:", error);
    }
  };

  return {
    account,
    balance,
    provider,
    connectWallet,
  };
};

export default useWallet;
