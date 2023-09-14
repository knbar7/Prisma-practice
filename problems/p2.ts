import { PrismaClient } from "@prisma/client";

// We want to grab the first N youngest users
// hint: The garden has leaves, I think you should rake, to give me an answer, first you should "take"

const prisma = new PrismaClient();

export const getNYoungestUsers = async (howManyUsersToGrab: number) => {
    try {
        const users = await prisma.user.findMany({
            orderBy:{
                age: 'asc',
            },
            take: howManyUsersToGrab,
            
        });
    
        return users;
      } catch (error) {
        throw new Error(`Error fetching users: ${error}`);
      } finally {
        await prisma.$disconnect();
      }
};