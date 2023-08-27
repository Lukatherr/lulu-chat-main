import { useContext, useState } from "react";
import { ChatContext } from "../Context/ChatContext";
import { AuthContext } from "../Context/AuthContext";
import { Timestamp, arrayUnion, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import {v4 as uuid} from "uuid"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { doc, onSnapshot } from 'firebase/firestore';
import { db, storage } from "../firebase";


const Input = () => {

    const [text, setText] = useState("")
    const [img, setImg] = useState(null)

    const {currentUser} = useContext(AuthContext)
    const {data} = useContext(ChatContext)

    const handleSend = async () => {
        if (img) {
          const storageRef = ref(storage, uuid());
    
          const uploadTask = uploadBytesResumable(storageRef, img);
    
          uploadTask.on(
            (error) => {
              //TODO:Handle Error
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                await updateDoc(doc(db, "chats", data.chatId), {
                  messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                    img: downloadURL,
                  }),
                });
              });
            }
          );
        } else {
          await updateDoc(doc(db, "chats", data.chatId), {
            messages: arrayUnion({
              id: uuid(),
              text,
              senderId: currentUser.uid,
              date: Timestamp.now(),
            }),
          });
        }

        await updateDoc(doc(db,"userChats",currentUser.uid), {
        [data.chatId + ".lastMessage"]: {
            text,
        },
        [data.chatId +".date"]: serverTimestamp(),
        })
        setText("");
        setImg(null);
    }

    return ( 
    <div className="input">
        <input type="text" placeholder="Type something..." onChange={e=>setText(e.target.value)} value={text}/>
        <div className="send">
        <img src="https://www.iconbolt.com/iconsets/eva-outline/attach-2.svg" alt="" />
        <input type="file" style= {{display: "none"}} id="file" onChange={e=>setImg(e.target.files[0])} />
        <label htmlFor="file">
            <img src="https://www.iconbolt.com/iconsets/fluent-regular/image-add.svg" alt="" />
            </label>
         <button onClick={handleSend}>Send</button>
         </div>
    </div>
    
    );
}
 
export default Input;