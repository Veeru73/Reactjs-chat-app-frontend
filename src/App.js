import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import { ChatState } from "./context/ChatProvider";

function App() {
  const { user } = ChatState();
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chatpage" element={user ? <ChatPage /> : <HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
