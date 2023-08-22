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
    arrayUnion,
    storage,
    ref,
    uploadBytes,
    getDownloadURL
} from "./index.js";

const savePhoto = async (file) => {
    const storageRef = ref(storage, `imagesUsers/${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
}

export const saveUser = async (userId, displayName, image) => {
    if(typeof(image) === 'object'){
        image = await savePhoto(image)
    }
    await addDoc(collection(db, "Users"), {
        uid: userId,
        displayName: displayName,
        photo: image,
    });
}

export const dataUser = async () => {
    const querySnapshot = await getDocs((collection(db, "Users")));
    const data = [];
    querySnapshot.forEach((doc) => {
        if (doc.data().uid === auth.currentUser.uid) {
            const user = doc.data().displayName;
            data.push(user, doc.data().photo);
        }
    });
    console.log(data);
    return {
        user: data[0],
        img: data[1],
    }
}

const saveImg = async (file) => {
    const storageRef = ref(storage, `imagesDashboard/${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
}

export const savePost = async (description, img) => {
    if (img != '') {
        img = await saveImg(img)
    }
    if (auth.currentUser.displayName == null) {
        dataUser().then(data => {
            addDoc(collection(db, "Posts"), {
                uid: auth.currentUser.uid,
                name: data.user,
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