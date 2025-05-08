// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, User as FirebaseUser } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFSVL94k5zXkrAy5oQKbO7rT6W5fPAk4M",
  authDomain: "laptop-review-all.firebaseapp.com",
  projectId: "laptop-review-all",
  storageBucket: "laptop-review-all.firebasestorage.app",
  messagingSenderId: "1044782876129",
  appId: "1:1044782876129:web:6e0891bf2753c5a3f63ea0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider(); // Add Google Provider

// User class for OOP approach with TypeScript
export class User {
  uid: string;
  email: string;
  displayName: string;
  favoriteItems: string[];

  constructor(uid: string, email: string, displayName: string = '', favoriteItems: string[] = []) {
    this.uid = uid;
    this.email = email;
    this.displayName = displayName;
    this.favoriteItems = favoriteItems;
  }

  // Save user to Firestore
  async saveToFirestore(): Promise<boolean> {
    try {
      await setDoc(doc(db, "users", this.uid), {
        email: this.email,
        displayName: this.displayName,
        favoriteItems: this.favoriteItems,
        createdAt: new Date(),
      }, { merge: true });
      return true;
    } catch (error) {
      console.error("Error saving user to Firestore:", error);
      return false;
    }
  }

  // Get user data from Firestore
  static async getFromFirestore(uid: string): Promise<User | null> {
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        return new User(
          uid,
          data.email,
          data.displayName || '',
          data.favoriteItems || []
        );
      } else {
        console.log("No user document found!");
        return null;
      }
    } catch (error) {
      console.error("Error getting user from Firestore:", error);
      return null;
    }
  }

  // Add item to favorites
  async addFavoriteItem(itemId: string): Promise<boolean> {
    try {
      this.favoriteItems.push(itemId);
      await updateDoc(doc(db, "users", this.uid), {
        favoriteItems: arrayUnion(itemId)
      });
      return true;
    } catch (error) {
      console.error("Error adding favorite item:", error);
      return false;
    }
  }

  // Remove item from favorites
  async removeFavoriteItem(itemId: string): Promise<boolean> {
    try {
      this.favoriteItems = this.favoriteItems.filter(item => item !== itemId);
      await updateDoc(doc(db, "users", this.uid), {
        favoriteItems: arrayRemove(itemId)
      });
      return true;
    } catch (error) {
      console.error("Error removing favorite item:", error);
      return false;
    }
  }

  // Check if an item is in favorites
  isFavorite(itemId: string): boolean {
    return this.favoriteItems.includes(itemId);
  }
  
  // Get all favorite items
  getFavorites(): string[] {
    return this.favoriteItems;
  }
}

// Authentication helper functions
export const createUserAccount = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const newUser = new User(userCredential.user.uid, email);
    await newUser.saveToFirestore();
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const signInUser = async (email: string, password: string): Promise<User | null> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return await User.getFromFirestore(userCredential.user.uid);
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
};

export const signInWithGoogle = async (): Promise<User | null> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Check if user exists in Firestore
    let userObj = await User.getFromFirestore(user.uid);
    
    // If not, create a new user document
    if (!userObj) {
      userObj = new User(user.uid, user.email || '', user.displayName || '');
      await userObj.saveToFirestore();
    }
    
    return userObj;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};
