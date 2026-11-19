/**
 * Local development database.
 *
 * Runs a real PostgreSQL 17 server from the `embedded-postgres` package so
 * contributors don't need to install Postgres or Docker. Data lives in
 * ./.pgdata (git-ignored). Production should point DATABASE_URL at a managed
 * Postgres instance instead and never run this script.
 *
 *   npm run db:start   # keep this terminal open while developing
 */
import EmbeddedPostgres from "embedded-postgres";
import { existsSync } from "node:fs";
import path from "node:path";

const port = Number(process.env.DEV_DB_PORT ?? 5433);
const databaseDir = path.join(process.cwd(), ".pgdata");

async function main() {
  const pg = new EmbeddedPostgres({
    databaseDir,
    user: "mindsoft",
    password: "mindsoft",
    port,
    persistent: true,
    // UTF-8 regardless of the OS locale (Windows defaults to WIN1252).
    initdbFlags: ["--encoding=UTF8", "--locale=C"],
  });

  const firstRun = !existsSync(path.join(databaseDir, "PG_VERSION"));
  if (firstRun) {
    console.log("Initialising local Postgres cluster in .pgdata ...");
    await pg.initialise();
  }

  await pg.start();

  if (firstRun) {
    await pg.createDatabase("mindsoft");
  }

  console.log(`Postgres ready on postgresql://mindsoft:mindsoft@localhost:${port}/mindsoft`);
  console.log("Press Ctrl+C to stop.");

  const stop = async () => {
    await pg.stop();
    process.exit(0);
  };
  process.on("SIGINT", stop);
  process.on("SIGTERM", stop);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
