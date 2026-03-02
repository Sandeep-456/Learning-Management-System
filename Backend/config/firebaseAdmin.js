import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

// Check if the variable exists to prevent crashing with a vague error
if (!process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
  throw new Error("Missing FIREBASE_CREDENTIALS environment variable");
}

// Parse the JSON string from the .env file
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;
