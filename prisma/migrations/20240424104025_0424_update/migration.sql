/*
  Warnings:

  - You are about to drop the column `slug` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `Snippet` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `Tag` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Blog_slug_key";

-- DropIndex
DROP INDEX "Snippet_slug_key";

-- DropIndex
DROP INDEX "Tag_slug_key";

-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "slug";

-- AlterTable
ALTER TABLE "Snippet" DROP COLUMN "slug";

-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "slug";
