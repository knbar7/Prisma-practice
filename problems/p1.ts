import { prisma } from "./prisma";

export const getAllUsers = async () => {
  return await prisma.user
    .findMany({
      orderBy: {
        username: "asc",
      },
    })
    .catch(() => {
      throw new Error("Couldn't find user");
    });
};
