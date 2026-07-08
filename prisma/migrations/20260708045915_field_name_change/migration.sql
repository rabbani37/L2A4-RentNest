/*
  Warnings:

  - You are about to drop the column `buthrooms` on the `properties` table. All the data in the column will be lost.
  - Added the required column `bathrooms` to the `properties` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "properties" DROP COLUMN "buthrooms",
ADD COLUMN     "bathrooms" INTEGER NOT NULL;
