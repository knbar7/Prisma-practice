import { prisma } from "./prisma";

// Deleting a user and their associated star ratings if their age is below n
export const deleteAllUsersWithAgeUnderN = async (n: number) => {
  // Find users with age less than n
  const usersToDelete = await prisma.user.findMany({
    where: {
      age: {
        lt: n,
      },
    },
  });

  // Collect all user IDs to be deleted
  const userIdsToDelete = usersToDelete.map((user) => user.id);

  // Find and delete star ratings associated with the users to delete
  const deleteStarRatings = await prisma.starRating.deleteMany({
    where: {
      userId: {
        in: userIdsToDelete,
      },
    },
  });

  // Delete the users
  const deleteUsers = await prisma.user.deleteMany({
    where: {
      id: {
        in: userIdsToDelete,
      },
    },
  });

  return { deleteStarRatings, deleteUsers };
};
