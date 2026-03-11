-- AlterTable
ALTER TABLE "schools" ADD COLUMN     "admin_id" TEXT;

-- AddForeignKey
ALTER TABLE "schools" ADD CONSTRAINT "schools_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "admins"("id") ON DELETE SET NULL ON UPDATE CASCADE;
