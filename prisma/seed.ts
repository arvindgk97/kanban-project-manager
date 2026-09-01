import "dotenv/config";

import { PrismaClient, TaskPriority } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
    adapter,
});

async function main() {
    console.log("🌱 Starting seed...");

    const user = await prisma.user.upsert({
        where: {
            email: "arvin@example.com",
        },
        update: {
            name: "Arvin",
        },
        create: {
            name: "Arvin",
            email: "arvin@example.com",
        },
    });

    console.log("Created user:", user.name);

    const workspace = await prisma.workspace.upsert({
        where: {
            ownerId_name: {
                ownerId: user.id,
                name: "Personal Workspace",
            },
        },
        update: {
            name: "Personal Workspace",
        },
        create: {
            name: "Personal Workspace",
            ownerId: user.id,
        },
    });

    console.log("Created workspace:", workspace.name);

    await prisma.workspaceMember.upsert({
        where: {
            workspaceId_userId: {
                workspaceId: workspace.id,
                userId: user.id,
            },
        },
        update: {
            role: "OWNER",
        },
        create: {
            workspaceId: workspace.id,
            userId: user.id,
            role: "OWNER",
        },
    });

    const project = await prisma.project.upsert({
        where: {
            workspaceId_name: {
                workspaceId: workspace.id,
                name: "Kanban Project Manager",
            },
        },
        update: {
            description: "A collaborative project management application",
        },
        create: {
            name: "Kanban Project Manager",
            description: "A collaborative project management application",
            workspaceId: workspace.id,
        },
    });

    console.log("Created project:", project.name);

    const board = await prisma.board.create({
        data: {
            name: "Main Board",
            projectId: project.id,
        },
    });

    console.log("Created board:", board.name);

    const todo = await prisma.column.upsert({
        where: {
            boardId_name: {
                boardId: board.id,
                name: "Todo",
            },
        },
        update: {
            position: 0,
        },
        create: {
            name: "Todo",
            position: 0,
            boardId: board.id,
        },
    });

    const inProgress = await prisma.column.upsert({
        where: {
            boardId_name: {
                boardId: board.id,
                name: "In Progress",
            },
        },
        update: {
            position: 1,
        },
        create: {
            name: "In Progress",
            position: 1,
            boardId: board.id,
        },
    });

    const done = await prisma.column.upsert({
        where: {
            boardId_name: {
                boardId: board.id,
                name: "Done",
            },
        },
        update: {
            position: 2,
        },
        create: {
            name: "Done",
            position: 2,
            boardId: board.id,
        },
    });

    console.log("Created columns");

    await prisma.task.create({
        data: {
            title: "Setup project",
            description: "Setup Next.js, Prisma, PostgreSQL and the project structure.",
            position: 0,
            priority: TaskPriority.HIGH,
            columnId: todo.id,
            assigneeId: user.id,
        },
    });

    await prisma.task.create({
        data: {
            title: "Create Kanban UI",
            description: "Build the initial Kanban board interface.",
            position: 0,
            priority: TaskPriority.MEDIUM,
            columnId: inProgress.id,
            assigneeId: user.id,
        },
    });

    await prisma.task.create({
        data: {
            title: "Initialize database",
            description: "Create PostgreSQL schema with Prisma.",
            position: 0,
            priority: TaskPriority.HIGH,
            columnId: done.id,
            assigneeId: user.id,
        },
    });

    console.log("Created tasks");

    console.log("🌱 Seed completed!");
}

main()
    .catch((error) => {
        console.error("❌ Seed failed:");
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });