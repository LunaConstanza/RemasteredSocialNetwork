import {
    auth,
    db,
    addDoc,
    collection,
    Timestamp,
    getDocs,
    getDoc,
    query,
    orderBy,
    doc,
    deleteDoc,
    updateDoc,
    arrayRemove,
    arrayUnion
} from "./index.js";
import { saveImg } from "./storage.js";


export const saveUser = async (userId, displayName, date) => {
    await addDoc(collection(db, "Users"), {
        uid: userId,
        displayName: displayName,
        birthday: date
    });
}

export const dataUser = async () => {
    const querySnapshot = await getDocs((collection(db, "Users")));
    const user = [];
    querySnapshot.forEach((doc) => {
        if (doc.data().uid === auth.currentUser.uid){
            user.push(doc.data().displayName);
        }
      });
      return user.join('');
}

export const savePost = async (description, img) => {
    saveImg(img)
    if (auth.currentUser.displayName == null) {
        dataUser().then(user => {
            addDoc(collection(db, "Posts"), {
                uid: auth.currentUser.uid,
                name: user,
                description: description,
                image: img,
                datepost: Timestamp.fromDate(new Date()),
                likes: [],
                likesCounter: 0,
            });
        })
    } else {
        await addDoc(collection(db, "Posts"), {
            uid: auth.currentUser.uid,
            name: auth.currentUser.displayName,
            description: description,
            image: img,
            datepost: Timestamp.fromDate(new Date()),
            likes: [],
            likesCounter: 0,
        });
    }
    
}

export const dataPost = async () => {
    const querySnapshot = await getDocs(query(collection(db, "Posts"), orderBy('datepost', 'desc')));
    return querySnapshot;
}

export const editPost = async (id, description) => {
    const posts = doc(db, "Posts", id);
    await updateDoc(posts, {
        "description": description,
    });
}

export const deletePost = async (id) => {
    await deleteDoc(doc(db, "Posts", id));
}

// ------------ LIKES & DISLIKE ----------------
export const updateLikes = async (id) => {
    const userIdentifier = auth.currentUser.uid;
    const postRef = doc(db, "Posts", id);
    const docSnap = await getDoc(postRef);
    const postData = docSnap.data();
    const likesCount = postData.likesCounter;
  
    if ((postData.likes).includes(userIdentifier)) {
      await updateDoc(postRef, {
        likes: arrayRemove(userIdentifier),
        likesCounter: likesCount - 1,
      });
    } else {
      await updateDoc(postRef, {
        likes: arrayUnion(userIdentifier),
        likesCounter: likesCount + 1,
      });
    }
  };