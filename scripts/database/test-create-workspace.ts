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
    const { prisma } = await import("@/lib/prisma");
    const { createWorkspace } = await import("@/lib/repositories/workspace.repository");

    console.log("🏗️ Testing create workspace...");

    const user = await prisma.user.findUnique({
        where: {
            email: "arvin@example.com",
        },
    });

    if (!user) {
        console.log("❌ User not found.");
        return;
    }

    // Bersihkan data test lama jika ada agar test idempotent terhadap unique constraint (ownerId, name)
    await prisma.workspace.deleteMany({
        where: {
            ownerId: user.id,
            name: "Test Workspace",
        },
    });

    const workspace = await createWorkspace(
        "Test Workspace",
        user.id,
    );

    console.log("✅ Workspace created:");
    console.dir(workspace, {
        depth: null,
    });
}

main()
    .catch((error) => {
        console.error("❌ Create workspace test failed:");
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        try {
            const { prisma } = await import("@/lib/prisma");
            await prisma.$disconnect();
        } catch {}
    });
