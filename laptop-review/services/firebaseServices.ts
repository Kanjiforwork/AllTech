
import { db } from '../firebase';
import { 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  addDoc, 
  query, 
  orderBy, 
  limit, 
  Timestamp,
  DocumentData,
  QueryDocumentSnapshot
} from 'firebase/firestore';

// Define interfaces for our data models
interface NewsItem {
  id?: string;
  title: string;
  image: string;
  excerpt: string;
  content?: string;
  author: string;
  date: string;
  readTime: string;
  createdAt?: any; // Firestore timestamp
}

interface Article {
  id?: string;
  title: string;
  excerpt: string;
  content?: string;
  image: string;
  category: string;
  date: string;
  createdAt?: any; // Firestore timestamp
}

// Helper function to convert Firestore document to typed object
const convertNewsDoc = (doc: QueryDocumentSnapshot<DocumentData>): NewsItem => {
  const data = doc.data();
  return {
    id: doc.id,
    title: data.title || '',
    image: data.image || '',
    excerpt: data.excerpt || '',
    content: data.content || '',
    author: data.author || '',
    date: data.date || '',
    readTime: data.readTime || '',
    createdAt: data.createdAt
  };
};

const convertArticleDoc = (doc: QueryDocumentSnapshot<DocumentData>): Article => {
  const data = doc.data();
  return {
    id: doc.id,
    title: data.title || '',
    excerpt: data.excerpt || '',
    content: data.content || '',
    image: data.image || '',
    category: data.category || '',
    date: data.date || '',
    createdAt: data.createdAt
  };
};

// News Services
export const newsService = {
  // Get all news items
  getAll: async (): Promise<NewsItem[]> => {
    try {
      const newsCollectionRef = collection(db, "news");
      const q = query(newsCollectionRef, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(convertNewsDoc);
    } catch (error) {
      console.error("Error getting news: ", error);
      throw error;
    }
  },
  
  // Get a specific news item by ID
  getById: async (id: string): Promise<NewsItem | null> => {
    try {
      const newsDocRef = doc(db, "news", id);
      const docSnapshot = await getDoc(newsDocRef);
      
      if (docSnapshot.exists()) {
        return {
          id: docSnapshot.id,
          ...docSnapshot.data() as Omit<NewsItem, 'id'>
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
  getLatest: async (itemCount: number = 3): Promise<NewsItem[]> => {
    try {
      const newsCollectionRef = collection(db, "news");
      const q = query(
        newsCollectionRef, 
        orderBy("createdAt", "desc"),
        limit(itemCount)
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(convertNewsDoc);
    } catch (error) {
      console.error("Error getting latest news: ", error);
      throw error;
    }
  },
  
  // Add a new news item
  add: async (newsItem: Omit<NewsItem, 'id'>): Promise<string> => {
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
  getAll: async (): Promise<Article[]> => {
    try {
      const articlesCollectionRef = collection(db, "articles");
      const q = query(articlesCollectionRef, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(convertArticleDoc);
    } catch (error) {
      console.error("Error getting articles: ", error);
      throw error;
    }
  },
  
  // Get a specific article by ID
  getById: async (id: string): Promise<Article | null> => {
    try {
      const articleDocRef = doc(db, "articles", id);
      const docSnapshot = await getDoc(articleDocRef);
      
      if (docSnapshot.exists()) {
        return {
          id: docSnapshot.id,
          ...docSnapshot.data() as Omit<Article, 'id'>
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
  getLatest: async (itemCount: number = 3): Promise<Article[]> => {
    try {
      const articlesCollectionRef = collection(db, "articles");
      const q = query(
        articlesCollectionRef, 
        orderBy("createdAt", "desc"),
        limit(itemCount)
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(convertArticleDoc);
    } catch (error) {
      console.error("Error getting latest articles: ", error);
      throw error;
    }
  },
  
  // Add a new article
  add: async (article: Omit<Article, 'id'>): Promise<string> => {
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