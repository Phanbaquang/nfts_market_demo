import React, { useState } from "react";
import { ethers } from "ethers";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface BuyNftButtonProps {
  price: number;
}

const BuyNftButton: React.FC<BuyNftButtonProps> = ({ price }) => {
  const [loading, setLoading] = useState(false);
  const { account } = useSelector((state: RootState) => state.wallet);

  const handleBuy = async () => {
    if (!window.ethereum) {
      toast.error("MetaMask chưa được cài!");
      return;
    }

    try {
      setLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const network = await provider.getNetwork();
      if (network.chainId !== 11155111n) {
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0xAA36A7" }],
          });
        } catch (switchError) {
          toast.error("Không thể chuyển sang Sepolia testnet");
          setLoading(false);
          return;
        }
      }
      const tx = await signer.sendTransaction({
        to: account,
        value: ethers.parseEther(price.toString()),
      });
      toast("Đang gửi giao dịch...", { icon: "⏳" });
      await tx.wait();
      toast.success("Giao dịch thành công!");
    } catch (err) {
      console.error(err);
      toast.error("Giao dịch thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleBuy}
      disabled={loading}
      style={{
        padding: "10px 20px",
        backgroundColor: "#4f46e5",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        opacity: loading ? 0.6 : 1,
      }}
    >
      {loading ? "Đang xử lý..." : `Mua NFT với ${price} ETH`}
    </button>
  );
};

export default BuyNftButton;
