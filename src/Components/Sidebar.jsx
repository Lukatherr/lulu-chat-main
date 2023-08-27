import NavBar from "../Components/NavBar";
import Search from "../Components/Search";
import Chats from "../Components/Chats";

const Sidebar = ({ toggleComponent }) => {
  return (
    <div className="sidebar">
      <NavBar></NavBar>
      <Search></Search>
      <div onClick={() => toggleComponent()}>
        <Chats></Chats>
      </div>
    </div>
  );
};

export default Sidebar;
