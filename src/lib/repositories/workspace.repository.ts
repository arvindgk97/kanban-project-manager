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
