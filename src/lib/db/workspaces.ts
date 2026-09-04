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

export async function createWorkspace(
    name: string,
    ownerId: string,
) {
    return prisma.$transaction(async (tx) => {
        const workspace = await tx.workspace.create({
            data: {
                name,
                ownerId,
            },
        });

        await tx.workspaceMember.create({
            data: {
                workspaceId: workspace.id,
                userId: ownerId,
                role: "OWNER",
            },
        });

        return workspace;
    });
}
