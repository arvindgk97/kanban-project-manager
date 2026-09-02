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
    const { deleteWorkspace } = await import("../src/lib/repositories/workspace.repository");

    console.log("🗑️ Testing delete workspace...");

    const workspace = await prisma.workspace.findFirst({
        where: {
            name: "Updated Test Workspace",
        },
    });

    if (!workspace) {
        console.log("❌ Updated Test Workspace not found.");
        return;
    }

    const deletedWorkspace = await deleteWorkspace(workspace.id);

    console.log("✅ Workspace deleted:\n");

    console.dir(deletedWorkspace, {
        depth: null,
    });

    const check = await prisma.workspace.findUnique({
        where: {
            id: workspace.id,
        },
    });

    console.log("\n🔎 Checking deleted workspace:");

    console.log(check);
}

main()
    .catch((error) => {
        console.error("❌ Delete workspace test failed:");
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        try {
            const { prisma } = await import("../src/lib/prisma");
            await prisma.$disconnect();
        } catch {}
    });
