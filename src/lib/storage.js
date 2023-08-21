import { storage, ref, uploadBytesResumable } from "./index.js";


// 'file' comes from the Blob or File API
export const saveImg = (file) => {
    console.log(file.name);
    const img = file.name
    const storageRef = ref(storage, img);
    // const imagesRef = ref(storageRef, img)

    const metadata = {
        contentType: file.type,
    };
    
    const uploadTask = uploadBytesResumable(storageRef, img);
    uploadTask.on("state_changed", snapshot => {
        console.log('ya se cargoooo', snapshot);
    })
}