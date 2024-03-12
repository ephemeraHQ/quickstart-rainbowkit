import React, { useState } from "react";
import { FloatingInbox } from "./FloatingInbox-hooks";
import { useAccount, useWalletClient } from "wagmi";
import { useDisconnect } from "wagmi";
import { disconnect } from "@wagmi/core";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Page = () => {
  const { disconnect } = useDisconnect();
  const { data: walletClient } = useWalletClient();
  const { address, isDisconnected } = useAccount();
  const [loggingOut, setLoggingOut] = useState(false); // Add this line

  const handleLogout = async () => {
    setLoggingOut(true);
    await disconnect();
    console.log("Logging out...");
    setLoggingOut(false);
  };

  const isPWA = true;
  const styles = {
    uContainer: {
      height: "100vh",
      backgroundColor: "#f9f9f9",
      borderRadius: isPWA == true ? "0px" : "10px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      zIndex: "1000",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
    },
    xmtpContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
    },
    btnXmtp: {
      backgroundColor: "#f0f0f0",
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      color: "#000",
      justifyContent: "center",
      border: "1px solid grey",
      padding: isPWA == true ? "20px" : "10px",
      borderRadius: "5px",
      fontSize: isPWA == true ? "20px" : "14px", // Increased font size
    },
  };

  return (
    <div style={styles.uContainer}>
      {isDisconnected && (
        <div style={styles.xmtpContainer}>
          <ConnectButton />
        </div>
      )}
      {!isDisconnected && walletClient && (
        <FloatingInbox
          isPWA={isPWA}
          wallet={walletClient}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
};

export default Page;
