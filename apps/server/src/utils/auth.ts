import { useRef } from "hono/jsx";
import { getClient } from "./client";
import { sign } from "hono/jwt";
import * as bcrypt from "bcryptjs";
import { encrypt, compare } from "./hashing";

export const signup = async (
  data: {
    name: string;
    email: string;
    username: string;
    password: string;
  },
  url: any,
) => {
  try {
    const client = getClient(url);
    const found = await client.users.findUnique({
      where: {
        username: data.username,
      },
    });

    if (found && found.username === data.username) {
      return { success: false, err: "User Already Exists" };
    }

    let pass = await encrypt(data.password);
    if (!pass) {
      return { success: false, err: "Password Encryption Failed" };
    }

    const res = await client.users.create({
      data: {
        name: data.name,
        email: data.email,
        username: data.username,
        password: pass,
      },
    });

    const payload = {
      id: res.id,
      name: res.name,
      email: res.email,
      username: res.username,
    };

    const token = await sign(payload, "dev", "HS256");

    return { success: true, token: token };
  } catch (e) {
    console.log(e);
    return { success: "false", err: "Error While Creating User" };
  }
};

export const login = async (
  data: { username: string; password: string },
  url: string,
) => {
  try {
    const client = getClient(url);

    const res = await client.users.findUnique({
      where: {
        username: data.username,
      },
    });
    if (res) {
      const comparision = await compare(data.password, res.password);

      if (!comparision) return { success: "false", err: "no records found" };

      if (res.username === data.username && comparision) {
        const payload = {
          id: res.id,
          name: res.name,
          email: res.email,
          username: res.username,
        };

        const token = await sign(payload, "dev", "HS256");

        return { success: true, token: token };
      }
    } else {
      return { success: "false", err: "No Records Found" };
    }
  } catch (e) {
    return { success: "false", err: "no records found" };
  }
};

export const verify = async (
  data: { name: string; email: string; username: string },
  url: string,
) => {
  try {
    const client = getClient(url);
    const res = await client.users.findUnique({
      where: {
        username: data.username,
        email: data.email,
        name: data.name,
      },
    });

    if (res) {
      return { success: true, password: res.password };
    } else {
      return { success: false, err: "No Records Found" };
    }
  } catch (e) {
    console.log(e);
    return { success: false, err: "No Records Found" };
  }
};
