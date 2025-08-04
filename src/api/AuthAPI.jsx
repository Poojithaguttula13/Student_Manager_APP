import db from "../data/db.json"
export const validateCredentials = (username, password) => {
 
    return username === db.credentials.username && password === db.credentials.password
      ? db.credentials.token
      : null;
  };