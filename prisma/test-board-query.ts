import "dotenv/config";

// Polyfill server-only agar script standalone CLI Node/tsx bisa jalan tanpa bundler RSC Next.js
try {
    const serverOnlyPath = require.resolve("server-only");
    require.cache[serverOnlyPath] = {
        id: serverOnlyPath,
        filename: serverOnlyPath,
        loaded: true,
        exports: {},
    } as any;
} catch {}

async function main() {
    const { prisma } = await import("../src/lib/prisma");

    console.log("🔎 Testing board query...");

    const board = await prisma.board.findFirst({
        include: {
            project: true,
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

    if (!board) {
        console.log("❌ No board found.");
        return;
    }

    console.log(`📋 Board: ${board.name}`);
    console.log(`📁 Project: ${board.project.name}`);
    console.log(`📊 Columns: ${board.columns.length}`);

    for (const column of board.columns) {
        console.log(`\n  ${column.position}. ${column.name}`);
        console.log(`     Tasks: ${column.tasks.length}`);

        for (const task of column.tasks) {
            console.log(
                `     - ${task.title} [${task.priority}] → ${task.assignee?.name ?? "Unassigned"}`
            );
        }
    }
}

main()
    .catch((error) => {
        console.error("❌ Board query failed:");
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        try {
            const { prisma } = await import("../src/lib/prisma");
            await prisma.$disconnect();
        } catch {}
    });
