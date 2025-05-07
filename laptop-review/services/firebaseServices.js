
import { db } from '../firebase.js';
import { 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  addDoc, 
  query, 
  orderBy, 
  limit, 
  Timestamp 
} from 'firebase/firestore';

// News Services
export const newsService = {
  // Get all news items
  getAll: async () => {
    try {
      const newsCollectionRef = collection(db, "news");
      const q = query(newsCollectionRef, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error("Error getting news: ", error);
      throw error;
    }
  },
  
  // Get a specific news item by ID
  getById: async (id) => {
    try {
      const newsDocRef = doc(db, "news", id);
      const docSnapshot = await getDoc(newsDocRef);
      
      if (docSnapshot.exists()) {
        return {
          id: docSnapshot.id,
          ...docSnapshot.data()
        };
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error getting news item: ", error);
      throw error;
    }
  },
  
  // Get latest news items with a limit
  getLatest: async (itemCount = 3) => {
    try {
      const newsCollectionRef = collection(db, "news");
      const q = query(
        newsCollectionRef, 
        orderBy("createdAt", "desc"),
        limit(itemCount)
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error("Error getting latest news: ", error);
      throw error;
    }
  },
  
  // Add a new news item
  add: async (newsItem) => {
    try {
      const newsCollectionRef = collection(db, "news");
      const docRef = await addDoc(newsCollectionRef, {
        ...newsItem,
        createdAt: Timestamp.fromDate(new Date())
      });
      return docRef.id;
    } catch (error) {
      console.error("Error adding news item: ", error);
      throw error;
    }
  }
};

// Articles Services
export const articleService = {
  // Get all articles
  getAll: async () => {
    try {
      const articlesCollectionRef = collection(db, "articles");
      const q = query(articlesCollectionRef, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error("Error getting articles: ", error);
      throw error;
    }
  },
  
  // Get a specific article by ID
  getById: async (id) => {
    try {
      const articleDocRef = doc(db, "articles", id);
      const docSnapshot = await getDoc(articleDocRef);
      
      if (docSnapshot.exists()) {
        return {
          id: docSnapshot.id,
          ...docSnapshot.data()
        };
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error getting article: ", error);
      throw error;
    }
  },
  
  // Get latest articles with a limit
  getLatest: async (itemCount = 3) => {
    try {
      const articlesCollectionRef = collection(db, "articles");
      const q = query(
        articlesCollectionRef, 
        orderBy("createdAt", "desc"),
        limit(itemCount)
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error("Error getting latest articles: ", error);
      throw error;
    }
  },
  
  // Add a new article
  add: async (article) => {
    try {
      const articlesCollectionRef = collection(db, "articles");
      const docRef = await addDoc(articlesCollectionRef, {
        ...article,
        createdAt: Timestamp.fromDate(new Date())
      });
      return docRef.id;
    } catch (error) {
      console.error("Error adding article: ", error);
      throw error;
    }
  }
};