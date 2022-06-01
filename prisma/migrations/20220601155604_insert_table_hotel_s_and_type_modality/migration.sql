-- CreateTable
CREATE TABLE "type" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "hotel" BOOLEAN,

    CONSTRAINT "type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "enrolmentType" (
    "id" SERIAL NOT NULL,
    "enrollmentId" INTEGER NOT NULL,
    "typeId" INTEGER NOT NULL,

    CONSTRAINT "enrolmentType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hotels" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "hotels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rooms" (
    "id" SERIAL NOT NULL,
    "number" TEXT NOT NULL,
    "hotelId" INTEGER NOT NULL,
    "roomSizeId" INTEGER NOT NULL,
    "enrollmentId" INTEGER NOT NULL,

    CONSTRAINT "rooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roomSize" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "beds" INTEGER NOT NULL,

    CONSTRAINT "roomSize_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "enrolmentType_enrollmentId_key" ON "enrolmentType"("enrollmentId");

-- CreateIndex
CREATE UNIQUE INDEX "hotels_name_key" ON "hotels"("name");

-- CreateIndex
CREATE UNIQUE INDEX "rooms_enrollmentId_key" ON "rooms"("enrollmentId");

-- CreateIndex
CREATE UNIQUE INDEX "roomSize_name_key" ON "roomSize"("name");

-- AddForeignKey
ALTER TABLE "enrolmentType" ADD CONSTRAINT "enrolmentType_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "enrollments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enrolmentType" ADD CONSTRAINT "enrolmentType_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "enrollments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "hotels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_roomSizeId_fkey" FOREIGN KEY ("roomSizeId") REFERENCES "roomSize"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
