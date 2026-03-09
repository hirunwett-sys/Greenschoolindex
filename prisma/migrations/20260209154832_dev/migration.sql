-- CreateTable
CREATE TABLE "schools" (
    "id" TEXT NOT NULL,
    "school_name" TEXT NOT NULL,
    "coverage" TEXT,
    "area" TEXT NOT NULL,
    "staff" TEXT NOT NULL,
    "total_score" INTEGER NOT NULL,
    "submitted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "schools_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scores" (
    "id" TEXT NOT NULL,
    "school_id" TEXT NOT NULL,
    "sti1" INTEGER NOT NULL DEFAULT 0,
    "sti2" INTEGER NOT NULL DEFAULT 0,
    "sti3" INTEGER NOT NULL DEFAULT 0,
    "sti4" INTEGER NOT NULL DEFAULT 0,
    "wmr1" INTEGER NOT NULL DEFAULT 0,
    "wmr2" INTEGER NOT NULL DEFAULT 0,
    "wmr3" INTEGER NOT NULL DEFAULT 0,
    "wmr4" INTEGER NOT NULL DEFAULT 0,
    "wmr5" INTEGER NOT NULL DEFAULT 0,
    "ecc1" INTEGER NOT NULL DEFAULT 0,
    "ecc2" INTEGER NOT NULL DEFAULT 0,
    "ecc3" INTEGER NOT NULL DEFAULT 0,
    "ecc4" INTEGER NOT NULL DEFAULT 0,
    "ecc5" INTEGER NOT NULL DEFAULT 0,
    "hwq1" INTEGER NOT NULL DEFAULT 0,
    "hwq2" INTEGER NOT NULL DEFAULT 0,
    "hwq3" INTEGER NOT NULL DEFAULT 0,
    "gpm1" INTEGER NOT NULL DEFAULT 0,
    "gpm2" INTEGER NOT NULL DEFAULT 0,
    "gpm3" INTEGER NOT NULL DEFAULT 0,
    "ilp1" INTEGER NOT NULL DEFAULT 0,
    "ilp2" INTEGER NOT NULL DEFAULT 0,
    "ere1" INTEGER NOT NULL DEFAULT 0,
    "ere2" INTEGER NOT NULL DEFAULT 0,
    "ere3" INTEGER NOT NULL DEFAULT 0,
    "ere4" INTEGER NOT NULL DEFAULT 0,
    "ere5" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "scores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "evidences" (
    "id" TEXT NOT NULL,
    "school_id" TEXT NOT NULL,
    "file_name" TEXT NOT NULL,
    "file_data" TEXT NOT NULL,
    "file_size" INTEGER NOT NULL,
    "mime_type" TEXT NOT NULL DEFAULT 'application/pdf',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "evidences_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "scores_school_id_key" ON "scores"("school_id");

-- AddForeignKey
ALTER TABLE "scores" ADD CONSTRAINT "scores_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "schools"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evidences" ADD CONSTRAINT "evidences_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "schools"("id") ON DELETE CASCADE ON UPDATE CASCADE;
