import { prisma } from "./prisma";

export const updateUsername = async (userId: number, newUsername: string) => {
  return prisma.user
    .update({
      where: {
        id: userId,
      },
      data: {
        username: newUsername,
      },
    })
    .catch((error) => {
      throw new Error(`Error updating username: ${error}`);
    });
};
