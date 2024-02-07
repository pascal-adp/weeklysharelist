import { z } from "zod";
import {
    createTRPCRouter,
    protectedProcedure,
} from "~/server/api/trpc";
import { db } from "~/server/db";
import { getServerAuthSession } from "~/server/auth";

const getSession = async () => {
    const session = await getServerAuthSession();

    if (!session) {
        throw new Error("No session found");
    }
    else {
        return session;
    }
}

export const sharelistRouter = createTRPCRouter({
    create: protectedProcedure
        .mutation(async () => {
            //Check if user has sharelist
            const session = await getSession();
            const userId = session.user.id!;

            const sharelist = await db.sharelist.findFirst({
                where: {
                    ownedById: session?.user.id
                }
            })

            if (!sharelist) {
                await db.sharelist.create({
                    data: {
                        ownedById: userId
                    }
                })
            }
            else {
                throw new Error("User already has sharelist");
            }
        }),
    addSongToSharelist: protectedProcedure
        .input(z.object({}))
        .mutation(async () => {
            const session = await getSession();
            const userId = session.user.id;

            
        })
});