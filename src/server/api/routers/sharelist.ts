import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "~/server/api/trpc";
import { db } from "~/server/db";
import { getServerAuthSession } from "~/server/auth";

export const sharelistRouter = createTRPCRouter({
    create: protectedProcedure
        .mutation(async () => {
            //Check if user has sharelist
            const session = await getServerAuthSession();
            if(!session) {
                throw new Error("No session found");
            }

            const userId = session.user.id!;
            console.log(session)

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
        })
});