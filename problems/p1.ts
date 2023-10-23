import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllUsers = async () => {
  try {
    const allUsers = await prisma.user.findMany({
      orderBy: {
        username: "asc",
      },
    });

    return allUsers;
  } catch (error) {
    throw new Error(`Error fetching all users: ${error}`);
  } finally {
    await prisma.$disconnect();
  }
};
