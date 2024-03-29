import { initializeApp } from "firebase-admin/app";
import { auth, config } from "firebase-functions";
import { firestore } from "firebase-admin";
import { getAuth } from "firebase-admin/auth";

initializeApp(config().firebase);

debugger;

export const onUserCreate = auth.user().onCreate(async (user) => {
  console.log("onUserCreate: ", user);
  if (
    (user.email && user.email === "darko.vasic@gmail.com") ||
    (user.email && user.email === "admin@example.com")
  ) {
    await firestore().doc(`users/${user.uid}`).create({
      isPro: true,
    });

    const customClaims = {
      role: "admin",
    };

    try {
      await getAuth().setCustomUserClaims(user.uid, customClaims);
    } catch (error) {
      console.error("setCustomUserClaims error: ", error);
    }
  }
  if (
    (user.email && user.email === "vasicd80@gmail.com") ||
    (user.email && user.email === "pro@example.com")
  ) {
    await firestore().doc(`users/${user.uid}`).create({
      isPro: true,
    });
  }
  await firestore().doc(`users/${user.uid}`).create({
    isPro: false,
  });
});
