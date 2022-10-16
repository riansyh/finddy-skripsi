import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { db } from "../app/firebase";

export const sendMessage = async (message, chatId, authUser, userId) => {
    await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
            id: uuid(),
            text: message,
            senderId: authUser.uid,
            date: Timestamp.now(),
        }),
    });

    await updateDoc(doc(db, "userChats", authUser.uid), {
        [chatId + ".lastMessage"]: {
            text: message,
        },
        [chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", userId), {
        [chatId + ".lastMessage"]: {
            text: message,
        },
        [chatId + ".date"]: serverTimestamp(),
    });
};
