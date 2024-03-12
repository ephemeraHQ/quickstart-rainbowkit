import Home from "./Home";
import { XMTPProvider } from "@xmtp/react-sdk";

export function FloatingInbox({ isPWA = false, wallet, onLogout }) {
  return (
    <XMTPProvider>
      <Home isPWA={isPWA} wallet={wallet} onLogout={onLogout} />
    </XMTPProvider>
  );
}
