import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const NavBar = () => {

    const {currentUser} = useContext(AuthContext)
    return (
        
        <div className="navbar">
            <span className="logo">Lulu Chat</span>
            <div className="user">
                <img src={currentUser.photoURL} alt="" />
                <span>{currentUser.displayName}</span>
                <button onClick={()=>signOut(auth)}>Logout</button>
            </div>
        </div>
         );
}
 
export default NavBar;