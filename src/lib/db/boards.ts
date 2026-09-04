import { prisma } from "@/lib/prisma";

export async function getBoardById(boardId: string) {
    return prisma.board.findUnique({
        where: {
            id: boardId,
        },
    });
}

export async function getBoardsByProject(projectId: string) {
    return prisma.board.findMany({
        where: {
            projectId,
        },
        orderBy: {
            createdAt: "asc",
        },
    });
}

export async function getBoardWithColumns(boardId: string) {
    return prisma.board.findUnique({
        where: {
            id: boardId,
        },
        include: {
            columns: {
                orderBy: {
                    position: "asc",
                },
            },
        },
    });
}

export async function getBoardWithColumnsAndTasks(boardId: string) {
    return prisma.board.findUnique({
        where: {
            id: boardId,
        },
        include: {
            columns: {
                orderBy: {
                    position: "asc",
                },
                include: {
                    tasks: {
                        orderBy: {
                            position: "asc",
                        },
                        include: {
                            assignee: true,
                        },
                    },
                },
            },
        },
    });
}
