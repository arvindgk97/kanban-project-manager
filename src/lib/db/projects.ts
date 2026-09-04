import { prisma } from "@/lib/prisma";

export async function getProjectById(projectId: string) {
    return prisma.project.findUnique({
        where: {
            id: projectId,
        },
    });
}

export async function getProjectsByWorkspace(workspaceId: string) {
    return prisma.project.findMany({
        where: {
            workspaceId,
        },
        orderBy: {
            createdAt: "asc",
        },
    });
}

export async function getProjectWithBoards(projectId: string) {
    return prisma.project.findUnique({
        where: {
            id: projectId,
        },
        include: {
            boards: {
                orderBy: {
                    createdAt: "asc",
                },
            },
        },
    });
}
