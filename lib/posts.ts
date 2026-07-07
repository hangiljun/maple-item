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
import type { NewsPost, Review } from './types';

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

// Reviews CRUD
const REVIEWS_COLLECTION = 'reviews';

export async function createReview(review: Omit<Review, 'id'>): Promise<string> {
  const docRef = await addDoc(collection(db, REVIEWS_COLLECTION), {
    ...review,
    createdAt: serverTimestamp()
  });
  return docRef.id;
}

export async function deleteReview(id: string): Promise<void> {
  const docRef = doc(db, REVIEWS_COLLECTION, id);
  await deleteDoc(docRef);
}

export async function getReview(id: string): Promise<Review | null> {
  const docRef = doc(db, REVIEWS_COLLECTION, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return {
      id: docSnap.id,
      ...docSnap.data()
    } as Review;
  }

  return null;
}

export async function getAllReviews(): Promise<Review[]> {
  const q = query(collection(db, REVIEWS_COLLECTION), orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Review[];
}

export async function getLatestReviews(count: number = 3): Promise<Review[]> {
  const reviews = await getAllReviews();
  return reviews.slice(0, count);
}
