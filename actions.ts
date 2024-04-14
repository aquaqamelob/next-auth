'use server'

import { auth } from "./auth";
import db from "@/lib/prisma"

export async function createRateLimit() {
    const session = await auth();

    if (!session?.user?.id) {
        return;
    }

    let rateLimit = await db.rateLimit.findUnique({
        where: { userId: session.user.id }
    });

    if (rateLimit) {
        return;
    }

    rateLimit = await db.rateLimit.create({
        data: {
            limit: 50,
            requests: 0,
            resetTime: new Date(2024, 20, 20),
            userId: session.user.id
        }
    })


    return rateLimit;
}

export async function getRateLimits() {
    const session = await auth();

    if (!session?.user?.id) {
        return;
    }

    const rateLimits = await db.rateLimit.findMany({ where: { userId: session.user.id } })


    return rateLimits;
}

export async function increaseRequests() {

    const session = await auth();

    if (!session?.user?.id) {
        return;
    }

    let rateLimit = await db.rateLimit.findUnique({
        where: { userId: session.user.id }
    });



    const updatedRateLimit = await db.rateLimit.update({
        where: { userId: session.user.id },
        data: { requests: rateLimit!.requests + 1 }
    });

    return updatedRateLimit;
    
}