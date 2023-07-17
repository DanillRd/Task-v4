// Название базы данных и хранилища
const dbName = 'myDatabase';
const dbVersion = 1;
const usersStoreName = 'users';
const dataStoreName = 'data';

export function saveDataToIndexedDB(data) {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, dbVersion);

        request.onerror = (event) => {
            console.error('Error opening IndexedDB:', event.target.error);
            reject(event.target.error);
        };

        request.onupgradeneeded = (event) => {
            const db = event.target.result;

            // Create or update object stores if needed
            if (!db.objectStoreNames.contains(usersStoreName)) {
                db.createObjectStore(usersStoreName, { keyPath: 'id', autoIncrement: true });
            }

            if (!db.objectStoreNames.contains(dataStoreName)) {
                db.createObjectStore(dataStoreName, { keyPath: 'id', autoIncrement: true });
            }
        };

        request.onsuccess = (event) => {
            const db = event.target.result;
            const transaction = db.transaction(dataStoreName, 'readwrite');
            const store = transaction.objectStore(dataStoreName);

            transaction.onerror = (event) => {
                console.error('Error saving data to IndexedDB:', event.target.error);
                reject(event.target.error);
            };

            transaction.oncomplete = () => {
                db.close();
                resolve();
            };

            // Create a deep copy of the data without unclonable fields
            const dataToSave = JSON.parse(JSON.stringify(data));

            store.add(dataToSave);
        };
    });
}





