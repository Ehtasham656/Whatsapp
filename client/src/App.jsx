import Messenger from "./Components/Messenger";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./App.css";
import AccountProvider from "./Context/AccountProvider";

function App() {
  const clientId =
    "815084954936-9r4ep75bo2b6bpr3hc9u89g4u9sesk6i.apps.googleusercontent.com";

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AccountProvider>
        <Messenger />
      </AccountProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
