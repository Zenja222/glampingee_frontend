import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

// Функция для получения роли пользователя по его uid
export async function getUserRole(uid) {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data().role;
    } else {
        console.log('No such document!');
        return null;
    }
}