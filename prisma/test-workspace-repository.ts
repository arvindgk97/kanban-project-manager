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
    const { getWorkspaceById } = await import("../src/lib/repositories/workspace.repository");

    console.log("🔎 Testing workspace repository...");

    const workspace = await prisma.workspace.findFirst();

    if (!workspace) {
        console.log("❌ No workspace found.");
        return;
    }

    const result = await getWorkspaceById(workspace.id);

    console.dir(result, {
        depth: null,
    });
}

main()
    .catch((error) => {
        console.error("❌ Repository test failed:");
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        try {
            const { prisma } = await import("../src/lib/prisma");
            await prisma.$disconnect();
        } catch {}
    });
