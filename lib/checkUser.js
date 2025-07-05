import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { db } from "./prisma";

export const checkUser = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return null;
  }

  try {
    const loggedInUser = await db.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    if (loggedInUser) {
      return loggedInUser;
    }

    return null;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};
