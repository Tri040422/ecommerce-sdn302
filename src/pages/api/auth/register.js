import User from "../../../models/User";
import connectDB from "../../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, password } = req.body;

    try {
      await connectDB();

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const newUser = new User({ name, email, password });
      await newUser.save();

      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ message: "Error registering user" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
