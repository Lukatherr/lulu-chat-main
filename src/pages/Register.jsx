import "../styles/Register.scss"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore"; 
import { db } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const [err, setErr] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      setLoading(true);
      e.preventDefault();
      const displayName = e.target[0].value;
      const email = e.target[1].value;
      const password = e.target[2].value;
      const file = e.target[3].files[0];
  
      try {
        //Create user
        const res = await createUserWithEmailAndPassword(auth, email, password);
  
        //Create a unique image name
        const date = new Date().getTime();
        const storageRef = ref(storage, `${displayName + date}`);
  
        await uploadBytesResumable(storageRef, file).then(() => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            try {
              //Update profile
              await updateProfile(res.user, {
                displayName,
                photoURL: downloadURL,
              });
              //create user on firestore
              await setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
                displayName,
                email,
                photoURL: downloadURL,
              });
  
              //create empty user chats on firestore
              await setDoc(doc(db, "userChats", res.user.uid), {});
              navigate("/");
            } catch (err) {
              console.log(err);
              setErr(true);
            //   setLoading(false);
            }
          });
        });
      } catch (err) {
        setErr(true);
        console.log(err)
        // setLoading(false);
      }
    };
 return ( 
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">Lulu chat</span>
                <span className="title">Register</span>
                <form onSubmit={handleSubmit}>
                <input type="text" name="" placeholder="Display name"/>
                <input type="email" name="" placeholder="Email"/>
                <input type="password" placeholder="Password"/>
                <input style={{display: 'none'}} type="file" id="file" />
                <label htmlFor="file">
                    <img src="https://www.iconbolt.com/iconsets/iconsax-outline/gallery-add.svg" alt="" />
                   Add an avatar image
                </label>
                <button>Sign up</button>
                {err && <span>Something went wrong, please try again</span>}
                </form>
                <p>You already have an account? <Link to="/login">Login</Link></p>
            </div>
        </div>
     );
}
 
export default Register;