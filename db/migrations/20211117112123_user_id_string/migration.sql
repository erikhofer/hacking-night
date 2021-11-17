-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Session" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "expiresAt" DATETIME,
    "handle" TEXT NOT NULL,
    "hashedSessionToken" TEXT,
    "antiCSRFToken" TEXT,
    "publicData" TEXT,
    "privateData" TEXT,
    "userId" TEXT
);
INSERT INTO "new_Session" ("antiCSRFToken", "createdAt", "expiresAt", "handle", "hashedSessionToken", "id", "privateData", "publicData", "updatedAt", "userId") SELECT "antiCSRFToken", "createdAt", "expiresAt", "handle", "hashedSessionToken", "id", "privateData", "publicData", "updatedAt", "userId" FROM "Session";
DROP TABLE "Session";
ALTER TABLE "new_Session" RENAME TO "Session";
CREATE UNIQUE INDEX "Session_handle_key" ON "Session"("handle");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
