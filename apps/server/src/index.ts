import { Hono } from "hono";
import { getClient } from "./utils/client";
import { env } from "hono/adapter";
import { signup, login, verify } from "./utils/auth";
import { profile, getProfile } from "./utils/operations";

const app = new Hono();

app.get("/test", (c) => {
  return c.text("Server Up And Running");
});

app.post("/auth/login", async (c) => {
  const data: { username: string; password: string } = await c.req.parseBody();
  const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c);
  const res = await login(data, DATABASE_URL);
  console.log(c.json(res));
  return c.json(res);
});

app.post("/auth/signup", async (c) => {
  const data: {
    name: string;
    email: string;
    username: string;
    password: string;
  } = await c.req.parseBody();
  console.log(data);
  const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c);
  const res = await signup(data, DATABASE_URL);
  return c.json(res);
});

app.post("/auth/verify", async (c) => {
  const data: { username: string; email: string; name: string } =
    await c.req.parseBody();
  const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c);
  const res = await verify(data, DATABASE_URL);
  return c.json(res);
});

app.post("/profile", async (c) => {
  const authHeader = c.req.header("Authorization");

  if (!authHeader) {
    return c.json({ status: false, err: "Authorization header is missing" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return c.json({ status: false, err: "Token is missing" });
  }

  const data = await c.req.json();
  const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c);
  const res = await profile(data, DATABASE_URL);
  return c.json(res);
});

app.get("/profile/:username", async (c) => {
  const user = c.req.param("username");
  const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c);
  const res = await getProfile(user, DATABASE_URL);
  return c.json(res);
});

export default app;
