import { prisma } from "@/lib/prisma";

export async function getWorkspaceById(workspaceId: string) {
    return prisma.workspace.findUnique({
        where: {
            id: workspaceId,
        },
    });
}

export async function getWorkspacesByUser(userId: string) {
    return prisma.workspace.findMany({
        where: {
            members: {
                some: {
                    userId,
                },
            },
        },
        orderBy: {
            createdAt: "asc",
        },
    });
}

export async function getWorkspaceWithProjects(workspaceId: string) {
    return prisma.workspace.findUnique({
        where: {
            id: workspaceId,
        },
        include: {
            projects: {
                orderBy: {
                    createdAt: "asc",
                },
                include: {
                    boards: {
                        orderBy: {
                            createdAt: "asc",
                        },
                    },
                },
            },
        },
    });
}
