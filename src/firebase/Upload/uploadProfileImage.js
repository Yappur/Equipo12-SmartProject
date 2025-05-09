import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebaseConfig";
import { v4 as uuidv4 } from "uuid";

export const uploadProfileImage = async (file) => {
  const uniqueName = `${uuidv4()}_${file.name}`;
  const storageRef = ref(storage, `profiles/${uniqueName}`);
  const snapshot = await uploadBytes(storageRef, file);
  const url = await getDownloadURL(snapshot.ref);
  return url;
};

export default uploadProfileImage;
