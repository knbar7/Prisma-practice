import { maxBy, minBy } from "remeda";
import { number } from "zod";
import { prisma } from "./prisma";

// Always tell truths, don't you ever lie, to solve this problem, just try a `groupBy`

// find the critic with the lowest average score
export const findTheGrumpiestCriticId = async () => {
    try{
        const criticAverage = await prisma.starRating.groupBy({
            by: ['userId'],
            _avg: {
                score: true
            }
        })
        
        const critic = criticAverage.reduce((acc, critic) => {
            if(critic._avg.score === null) {
                return acc;
            }
            if(acc._avg.score === null) {
                return acc = critic;
            }
            if(critic._avg.score < acc._avg.score) {
                return acc = critic;
            }
            return acc;
        })

        return critic.userId;

    }catch(error){
        throw new Error(`Error fetching average scores: ${error}`)
    }finally{
        await prisma.$disconnect();
    }
};

// find the critic with the highest average score
export const findTheNicestCriticId = async () => {
    try{
        const criticAverage = await prisma.starRating.groupBy({
            by: ['userId'],
            _avg: {
                score: true
            }
        })
        
        const critic = criticAverage.reduce((acc, critic) => {
            if(critic._avg.score === null) {
                return acc;
            }
            if(acc._avg.score === null) {
                return acc = critic;
            }
            if(critic._avg.score > acc._avg.score) {
                return acc = critic;
            }
            return acc;
        })

        return critic.userId;

    }catch(error){
        throw new Error(`Error fetching average scores: ${error}`)
    }finally{
        await prisma.$disconnect();
    }
};
