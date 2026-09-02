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

    console.log("🔌 Testing database connection...");

    const userCount = await prisma.user.count();

    console.log(`👤 Users in database: ${userCount}`);
}

main()
    .catch((error) => {
        console.error("❌ Database connection failed:");
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        try {
            const { prisma } = await import("../src/lib/prisma");
            await prisma.$disconnect();
        } catch {}
    });
