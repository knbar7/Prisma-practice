import { prisma } from "./prisma";

export const updateUsername = async (userId: number, newUsername: string) => {
  try {
    const update = prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        username: newUsername,
      },
    });
    return update;
  } catch (error) {
    throw new Error(`Error updating username: ${error}`);
  } finally {
    await prisma.$disconnect();
  }
};
