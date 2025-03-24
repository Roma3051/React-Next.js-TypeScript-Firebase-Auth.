import { NextApiRequest, NextApiResponse } from "next";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase/firebase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password, action } = req.body;

    try {
      if (action === "login") {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        res.status(200).json({ user: userCredential.user });
      } else if (action === "register") {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        res.status(200).json({ user: userCredential.user });
      } else {
        res.status(400).json({ message: "Invalid action" });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        res
          .status(500)
          .json({ message: "Authentication failed", error: error.message });
      } else {
        res
          .status(500)
          .json({ message: "Authentication failed", error: "Unknown error" });
      }
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
