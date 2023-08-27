import "../styles/Home.scss";
import Sidebar from "../Components/Sidebar";
import Chat from "../Components/Chat";
import { useState } from "react";
import Chats from "../Components/Chats";

const Home = () => {
  const [showComponent1, setShowComponent1] = useState(true);

  const toggleComponent = () => {
    setShowComponent1(!showComponent1);
  };

    
    return (
    <div className="home">
      <div className="container">
        {showComponent1 ? (
          <Sidebar toggleComponent={() => toggleComponent()} />
        ) : (
          <Chat toggleComponent={() => toggleComponent()} />
        )}
      </div>
    </div>
  );
};

export default Home;
