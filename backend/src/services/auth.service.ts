import prisma from "../lib/prisma";
import bcrypt from "bcrypt";
import { generteToken } from "../utils/jwt";
import { Role } from "@prisma/client";

//Register user
export const registerService = async (data: {
  name: string;
  email: string;
  password: string;
  role: Role;
}) => {
  const { name, email, password, role } = data;
  if (role !== Role.QA && role !== Role.DEVELOPER) {
    throw new Error("Invalid role selected");
  }

  if (!name || !email || !password) {
    throw new Error("All Fields are required");
  }

  const existingUSer = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (existingUSer) {
    throw new Error("User already Exists ");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
    },
  });
  const token = generteToken(user.id);

  return {
    success: true,
    message: "User register succesfully",
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

//Sign Up user
export const loginService = async (data: {
  email: string;
  password: string;
}) => {
  const { email, password } = data;

  if (!email || !password) {
    throw new Error("Email and password are required.");
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("Invalid email or password.");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid email or password.");
  }

  const token = generteToken(user.id);

  return {
    success: true,
    message: "Login successful",
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};
