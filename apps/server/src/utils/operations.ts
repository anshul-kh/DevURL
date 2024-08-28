import { getClient } from "./client";
import { sign } from "hono/jwt";

export const profile = async (
  data: { userId: number; metadata: any; stats: any; links: any },
  url: string,
) => {
  try {
    const client = getClient(url);
    const res = await client.users.findUnique({
      where: {
        id: data.userId,
      },
    });

    if (!res || res.id !== data.userId) {
      return { success: "false", err: "User does not exist" };
    }

    const profile = await client.profile.upsert({
      where: {
        id: data.userId,
      },
      update: {
        links: data.links,
        stats: data.stats,
        metadata: data.metadata,
      },
      create: {
        links: data.links,
        stats: data.stats,
        metadata: data.metadata,
        user_id: data.userId,
      },
    });

    return { success: "true", msg: "Profile Updated Successfully" };
  } catch (e) {
    return { success: "false", err: "Error While Updating Profile" };
  }
};

export const getProfile = async (user: string, url: string) => {
  try {
    const client = getClient(url);
    const res = await client.users.findUnique({
      where: {
        username: user,
      },
      include: {
        profile: true,
      },
    });

    if (!res) {
      return { success: "false", err: "User does not exist" };
    } else {
      return { success: "true", data: res };
    }
  } catch (e) {
    return { success: "false", err: "Error While Fetching Profile" };
  }
};
