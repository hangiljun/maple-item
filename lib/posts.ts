import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  query,
  orderBy,
  Timestamp,
  serverTimestamp
} from 'firebase/firestore';
import { db } from './firebase';
import type { NewsPost } from './types';

const POSTS_COLLECTION = 'posts';

export async function createPost(post: Omit<NewsPost, 'id'>): Promise<string> {
  const docRef = await addDoc(collection(db, POSTS_COLLECTION), {
    ...post,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
  return docRef.id;
}

export async function updatePost(id: string, post: Partial<NewsPost>): Promise<void> {
  const docRef = doc(db, POSTS_COLLECTION, id);
  await updateDoc(docRef, {
    ...post,
    updatedAt: serverTimestamp()
  });
}

export async function deletePost(id: string): Promise<void> {
  const docRef = doc(db, POSTS_COLLECTION, id);
  await deleteDoc(docRef);
}

export async function getPost(id: string): Promise<NewsPost | null> {
  const docRef = doc(db, POSTS_COLLECTION, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return {
      id: docSnap.id,
      ...docSnap.data()
    } as NewsPost;
  }

  return null;
}

export async function getAllPosts(): Promise<NewsPost[]> {
  const q = query(collection(db, POSTS_COLLECTION), orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as NewsPost[];
}

export async function togglePinPost(id: string, currentPinned: boolean): Promise<void> {
  const docRef = doc(db, POSTS_COLLECTION, id);
  await updateDoc(docRef, {
    pinned: !currentPinned,
    updatedAt: serverTimestamp()
  });
}
