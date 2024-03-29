import "server-only";

import {
  initializeApp,
  getApps,
  cert,
  ServiceAccount,
} from "firebase-admin/app";
import serviceAccount from "./firebase-admin-account.json";
import { Firestore, getFirestore } from "firebase-admin/firestore";
import { Auth, getAuth } from "firebase-admin/auth";

let firestore: Firestore | undefined = undefined;
let auth: Auth | undefined = undefined;

const currentApps = getApps();

if (currentApps.length <= 0) {
  if (process.env.NEXT_PUBLIC_APP_ENV === "emulator") {
    process.env["FIRESTORE_EMULATOR_HOST"] =
      process.env.NEXT_PUBLIC_EMULATOR_FIRESTORE_PATH;
    process.env["FIRESTORE_AUTH_EMULATOR_HOST"] =
      process.env.NEXT_PUBLIC_EMULATOR_AUTH_PATH;
  }
  const app = initializeApp({
    credential: cert(serviceAccount as ServiceAccount),
    //   databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
  });
  firestore = getFirestore(app);
  auth = getAuth(app);
} else {
  firestore = getFirestore(currentApps[0]);
  auth = getAuth(currentApps[0]);
}

export { firestore, auth };
