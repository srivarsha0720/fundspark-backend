import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import supabase from "../config/supabaseClient.js";

// ================= SIGNUP =================
export const signup = async (req, res) => {
  try {
    const {name, email, password } = req.body;

    // validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Missing fields" });
    }
    // check if user exists
    const { data: existing } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }
    // hash password
    const hashed = await bcrypt.hash(password, 10);
    // insert user
    const { data, error } = await supabase
      .from("users")
      .insert([{name, email, password: hashed }])
      .select()
      .single();

    if (error) throw error;

    // create jwt
    const token = jwt.sign(
      { id: data.id, email: data.email,name:data.name },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
const { password: _, ...safeUser } = data;

    res.json({
  message: "Signup successful",
  token,
  user: safeUser,
});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// LOGIN USER
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check user exists
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !user) {
      return res.status(400).json({ message: "User not found" });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // generate token
    const token = jwt.sign(
      { id: user.id,email:user.email,name:user.name },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
//remove password before sending 
    const { password: _, ...safeUser } = user;
//send response 
res.json({
  message: "Login successful",
  token,
  user: safeUser,
});
  

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

















