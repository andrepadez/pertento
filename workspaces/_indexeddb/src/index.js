import Dexie from 'dexie';
export * from 'dexie-react-hooks';

export const db = new Dexie('pertento');

// db.delete()
//   .then(() => {
//     console.log('Database successfully deleted');
//   })
//   .catch((err) => {
//     console.error('Could not delete database', err);
//   });

db.version(1).stores({
  auth: 'id, token', // Primary key and indexed props
});
