import { prisma } from "./prisma";

// Get the average age of all users
// hint: the hot tub is hot, the water is great, to solve this problem you should "aggregate"
export const getAverageUserAge = async () => {
  try {
    const users = await prisma.user.aggregate({
      _avg: {
        age: true,
      },
    });
    return users._avg.age;
  } catch (error) {
    throw new Error(`Error getting average age: ${error}`);
  } finally {
    await prisma.$disconnect();
  }
};
