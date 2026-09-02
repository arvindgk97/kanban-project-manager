import { prisma } from "@/lib/prisma";
import { NotFoundError } from "@/lib/errors";

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
    const workspace = await prisma.workspace.findUnique({
        where: {
            id: workspaceId,
        },
    });

    if (!workspace) {
        throw new NotFoundError("Workspace not found.");
    }

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
    const workspace = await prisma.workspace.findUnique({
        where: {
            id: workspaceId,
        },
    });

    if (!workspace) {
        throw new NotFoundError("Workspace not found.");
    }

    return prisma.workspace.delete({
        where: {
            id: workspaceId,
        },
    });
}
