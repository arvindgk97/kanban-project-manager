import { prisma } from "@/lib/prisma";

export async function getWorkspaceById(workspaceId: string) {
    return prisma.workspace.findUnique({
        where: {
            id: workspaceId,
        },
        include: {
            owner: true,
            members: {
                include: {
                    user: true,
                },
            },
            projects: true,
        },
    });
}

export async function createWorkspace(
    name: string,
    ownerId: string,
) {
    return prisma.workspace.create({
        data: {
            name,
            ownerId,
        },
    });
}

export async function updateWorkspace(
    workspaceId: string,
    name: string,
) {
    return prisma.workspace.update({
        where: {
            id: workspaceId,
        },
        data: {
            name,
        },
    });
}

export async function deleteWorkspace(workspaceId: string) {
    return prisma.workspace.delete({
        where: {
            id: workspaceId,
        },
    });
}
