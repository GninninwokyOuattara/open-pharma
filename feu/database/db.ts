import * as SQLite from "expo-sqlite";
import { DBPharmacy, Pharmacy } from "../types/dataTypes";

const db = SQLite.openDatabase("pharmacies");

// DATABSE INITIALIZATION

export const initDatabase = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS pharmacies " +
          "(id INTEGER PRIMARY KEY NOT NULL, " +
          "name TEXT NOT NULL, " +
          "_name TEXT NOT NULL, " +
          "_name_safe TEXT NOT NULL, " +
          "flat_name TEXT NOT NULL, " +
          "coordinates TEXT, " +
          "geographical_position TEXT, " +
          "google_maps_position_link TEXT, " +
          "phone_numbers TEXT, " +
          "open INTEGER NOT NULL, " +
          "open_from TEXT NOT NULL, " +
          "open_until TEXT NOT NULL, " +
          "supervisor TEXT)",
        [],
        () => {
          resolve("Pharmacies table initialized");
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

export const initUpdateTable = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS update_version
          (id INTEGER PRIMARY KEY NOT NULL,
          version TEXT NOT NULL)`,
        [],
        () => {
          resolve("Update_version table initialized");
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

// DROP DATABASE

export const dropPharmaciesTable = () => {
  return new Promise((resolve: (value: any) => void, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DROP TABLE IF EXISTS pharmacies`,
        [],
        (_, res: any) => {
          resolve("Pharmacies table dropped");
        },
        (_, err) => {
          reject(err);
          return false;
        }
      );
    });
  });
};

// DATABASE METHODS

export const getUpdateVersion = () => {
  return new Promise((resolve: (value: any) => void, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT version FROM update_version LIMIT 1",
        [],
        (_, res: any) => {
          return resolve(res.rows._array[0]);
        },
        (_, err) => {
          reject(err);
          return false;
        }
      );
    });
  });
};

export const changeUpdateVersion = (newVersion: string) => {
  return new Promise((resolve: (value: any) => void, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE update_version 
                SET version = ? 
                WHERE id = ?`,
        [newVersion, 1],
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

export const insertPharmacie = (pharmacy: Pharmacy) => {
  const {
    name,
    _name,
    _name_safe,
    flat_name,
    supervisor,
    coordinates,
    geographical_position,
    google_maps_position_link,
    phone_numbers,
    open,
    open_from,
    open_until,
  } = pharmacy;
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO pharmacies (name, _name, _name_safe, flat_name, supervisor, coordinates,geographical_position, google_maps_position_link, phone_numbers, open, open_from,open_until)" +
          "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          name,
          _name,
          _name_safe,
          flat_name,
          supervisor || "",
          JSON.stringify(coordinates),
          geographical_position || "",
          google_maps_position_link || "",
          JSON.stringify(phone_numbers),
          open ? 1 : 0,
          open_from || "",
          open_until || "",
        ],
        (_, res) => {
          resolve(res);
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
  return promise;
};

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

export const getAllPharmacies = () => {
  return new Promise((resolve: (value: any) => void, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM pharmacies
                WHERE coordinates IS NOT NULL
                ORDER BY name ASC`,
        [],
        (_, res: any) => {
          return resolve(res.rows._array as DBPharmacy);
        },
        (_, err) => {
          reject(err);
          return false;
        }
      );
    });
  });
};

export const getOpenPharmacies = () => {
  return new Promise((resolve: (value: any) => void, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM pharmacies " + "WHERE open = 1",
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

export const deleteAllPharmacies = () => {
  return new Promise((resolve: (value: string) => void, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM pharmacies ",
        [],
        (_, res: any) => {
          return resolve("All pharmacies has been deleted Successfully.");
        },
        (_, err) => {
          reject(err);
          return false;
        }
      );
    });
  });
};
