import { prisma } from "./prisma";

export const createUserWithData = async ({
  username,
  age,
}: {
  username: string;
  age: number;
}) => {
  try {
    const createUser = prisma.user.create({
      data: {
        username: username,
        age: age,
      },
    });
    return createUser;
  } catch (error) {
    throw new Error(`Error creating user: ${error}`);
  } finally {
    await prisma.$disconnect();
  }
};
