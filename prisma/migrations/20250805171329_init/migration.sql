-- CreateTable
CREATE TABLE "public"."casa" (
    "id" SERIAL NOT NULL,
    "descripcion" VARCHAR NOT NULL,
    "barrio" VARCHAR NOT NULL,
    "valor" VARCHAR NOT NULL,

    CONSTRAINT "casa_pkey" PRIMARY KEY ("id")
);
