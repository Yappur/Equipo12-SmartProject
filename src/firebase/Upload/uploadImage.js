import { getDownloadURL, ref, uploadBytes, listAll } from "firebase/storage";
import { storage } from "../firebaseConfig";
import { v4 as uuidv4 } from "uuid";

export const uploadImage = async (file) => {
  const uniqueName = `${uuidv4()}_${file.name}`;
  const storageRef = ref(storage, `vacancies/${uniqueName}`);
  const snapshot = await uploadBytes(storageRef, file);
  const url = await getDownloadURL(snapshot.ref);
  return url;
};

export const getAllImages = async () => {
  const listRef = ref(storage, "vacancies/");
  const result = await listAll(listRef);
  const urls = await Promise.all(
    result.items.map((item) => getDownloadURL(item))
  );
  return urls;
};

export default uploadImage;
