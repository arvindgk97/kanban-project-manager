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

import { NotFoundError } from "@/lib/errors";

async function main() {
    const { updateWorkspace } = await import("@/lib/repositories/workspace.repository");

    console.log("🧪 Testing repository error handling...\n");

    const fakeWorkspaceId = "00000000-0000-0000-0000-000000000000";

    try {
        await updateWorkspace(
            fakeWorkspaceId,
            "This Should Fail",
        );
    } catch (error) {
        if (error instanceof NotFoundError) {
            console.log("✅ NotFoundError caught correctly.");
            console.log("Message:", error.message);
        } else {
            console.error("❌ Unexpected error:");
            console.error(error);
        }
    }
}

main()
    .catch((error) => {
        console.error("❌ Error handling test failed:");
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        try {
            const { prisma } = await import("@/lib/prisma");
            await prisma.$disconnect();
        } catch {}
    });
