import { useState } from 'react';


const useIndexedDb = (dbName: string) => {
    const [db, setDb] = useState<IDBDatabase>();
    const request = indexedDB.open(dbName);

    request.onupgradeneeded = (event) => {
        console.log(event);
    }

    request.onsuccess = (event) => {
        setDb(request.result);
    }
    const get = (key: string) => {}

    const insert = (data: any) => {
        console.log(data)
    }

    const update = (key: string, value: any) => {}

    const remove = (key: string) => {}

    return {
        get,
        insert,
        update,
        remove,
        error: request.error
    }
}

export default useIndexedDb;
