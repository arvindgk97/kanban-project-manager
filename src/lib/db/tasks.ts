import { prisma } from "@/lib/prisma";

export async function getTaskById(taskId: string) {
    return prisma.task.findUnique({
        where: {
            id: taskId,
        },
        include: {
            assignee: true,
            column: true,
        },
    });
}

export async function getTasksByColumn(columnId: string) {
    return prisma.task.findMany({
        where: {
            columnId,
        },
        orderBy: {
            position: "asc",
        },
        include: {
            assignee: true,
        },
    });
}

export async function getTasksByBoard(boardId: string) {
    return prisma.task.findMany({
        where: {
            column: {
                boardId,
            },
        },
        orderBy: [
            {
                column: {
                    position: "asc",
                },
            },
            {
                position: "asc",
            },
        ],
        include: {
            assignee: true,
            column: true,
        },
    });
}
