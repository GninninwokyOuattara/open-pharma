import * as SQLite from "expo-sqlite";
import { Pharmacy } from "../types/dataTypes";


const db = SQLite.openDatabase("pharmacies");

export const initDatabase = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS pharmacies (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, _name TEXT NOT NULL, _name_safe TEXT NOT NULL, flat_name TEXT NOT NULL, geographical_position TEXT, google_maps_position_link TEXT, open INTEGER NOT NULL, open_from TEXT NOT NULL, open_until TEXT NOT NULL, phone_numbers TEXT, lat REAL, lng REAL)",
                [],
                () => {
                    resolve("initialized");
                },
                (_, error): boolean => {
                    reject(error);
                    return false;
                }
            );
        });
    });

    return promise;
};


export const insertPharmacie = (pharmacy : Pharmacy)=> {
    const {name, _name, _name_safe, flat_name, geographical_position, google_maps_position_link, phone_numbers, supervisor, open, open_from,open_until, coordinates, phid} = pharmacy
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "INSERT INTO pharmacies (name, _name, _name_safe, flat_name, geographical_position, google_maps_position_link,phone_numbers, lat, lng, open, open_from, open_until) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                [name, _name, _name_safe, flat_name, geographical_position || "", google_maps_position_link || "",JSON.stringify(phone_numbers), coordinates.lat, coordinates.lng, open ? 1 : 0, open_from || "", open_until || ""],
                (_, res) => {
                    resolve(res);
                },
                (_, error) => {
                    reject(error);
                    return false;
                }
            );
        });
    })
    return promise;

}

// export const getPharmacies = () => {
//     const promise = new Promise<any>((resolve, reject) => {
//         db.transaction((tx) => {
//             tx.executeSql("SELECT * FROM pharmacies", [],(data) => {
//                 resolve(data)
//             }, (_, error) : any => {
//                 reject(error);
//             }
//             );
//         });
//     })
//     return promise;
// }


export const getPharmacies = () => {
    return new Promise((resolve: (value: any) => void, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "SELECT * FROM pharmacies",
                [],
                (_, res: any) => {
                    return resolve(res.rows._array);
                },
                (_, err) => {
                    reject(err);
                    return false;
                }
            );
        });
    });
};
