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
    const { updateWorkspace } = await import("@/lib/repositories/workspace.repository");

    console.log("✏️ Testing update workspace...");

    let workspace = await prisma.workspace.findFirst({
        where: {
            name: "Test Workspace",
        },
    });

    if (!workspace) {
        // Jika sebelumnya sudah pernah di-update, cari "Updated Test Workspace" atau siapkan data
        const updated = await prisma.workspace.findFirst({
            where: {
                name: "Updated Test Workspace",
            },
        });

        if (updated) {
            workspace = await prisma.workspace.update({
                where: { id: updated.id },
                data: { name: "Test Workspace" },
            });
        }
    }

    if (!workspace) {
        console.log("❌ Test Workspace not found.");
        return;
    }

    const updatedWorkspace = await updateWorkspace(
        workspace.id,
        "Updated Test Workspace",
    );

    console.log("✅ Workspace updated:\n");

    console.dir(updatedWorkspace, {
        depth: null,
    });
}

main()
    .catch((error) => {
        console.error("❌ Update workspace test failed:");
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        try {
            const { prisma } = await import("@/lib/prisma");
            await prisma.$disconnect();
        } catch {}
    });
