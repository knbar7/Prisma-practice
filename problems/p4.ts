import { prisma } from "./prisma";

// get All Pg-13 movies, ordered by release year descending
export const getAllPG13Movies = async () => {
    try{
        const pg13Movies = prisma.movie.findMany({
            where: {
                parentalRating: {
                    equals: "PG-13"
                }
            },
            orderBy: {
                releaseYear: "desc"
            },
            select: {
                releaseYear: true,
                parentalRating: true
            }
        })
        return pg13Movies;
    }catch(error){
        throw new Error(`Could not get movies: ${error}`)
    }finally{
        await prisma.$disconnect();
    }
};
