import { prisma } from "./prisma";

export const createUserWithData = async ({
  username,
  age,
}: {
  username: string;
  age: number;
}) => {
  return prisma.user
    .create({
      data: {
        username: username,
        age: age,
      },
    })
    .catch((error) => {
      throw new Error(`Error creating user: ${error}`);
    });
};
