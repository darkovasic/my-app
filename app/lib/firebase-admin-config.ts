// import "server-only";

// import { initializeApp, getApps, cert } from "firebase-admin/app";
// import serviceAccount from "./firebase-admin-account.json";

// const firebaseAdminConfig = {
//   credential: cert({
//     privateKey: serviceAccount.private_key,
//     clientEmail: serviceAccount.client_email,
//     projectId: serviceAccount.project_id,
//   }),
//   databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
// };

// export function customInitApp() {
//   if (getApps().length <= 0) {
//     initializeApp(firebaseAdminConfig);
//   }
// }
