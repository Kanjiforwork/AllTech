// initFirestore.js
// You can run this script once to initialize your Firestore database with mock data
import { seedAllData } from './utils/seedData';

// This function initializes your Firestore database with mock data
async function initializeFirestore() {
  console.log('Starting to seed Firestore database with mock data...');
  
  try {
    const result = await seedAllData();
    
    if (result) {
      console.log('Successfully seeded Firestore database with mock data!');
    } else {
      console.error('Failed to seed Firestore database.');
    }
  } catch (error) {
    console.error('Error initializing Firestore:', error);
  }
}

// Run the initialization function
initializeFirestore();

/*
HOW TO USE THIS SCRIPT:

1. Make sure you have set up your Firebase project in the Firebase console
   and updated your firebase.js file with the correct configuration.

2. Run this script once to seed your Firestore database with mock data:
   $ node initFirestore.js
   
   Or alternatively, you can create a simple page component that runs this
   initialization logic when visited (e.g., a protected admin page):

   // pages/admin/init-db.js
   import { useEffect, useState } from 'react';
   import { seedAllData } from '../../utils/seedData';

   export default function InitDbPage() {
     const [status, setStatus] = useState('Starting initialization...');

     useEffect(() => {
       const init = async () => {
         try {
           setStatus('Seeding database...');
           const result = await seedAllData();
           setStatus(result ? 'Database seeded successfully!' : 'Failed to seed database.');
         } catch (error) {
           setStatus(`Error: ${error.message}`);
         }
       };

       init();
     }, []);

     return (
       <div className="p-8">
         <h1 className="text-2xl font-bold mb-4">Database Initialization</h1>
         <p className="text-lg">{status}</p>
       </div>
     );
   }
*/