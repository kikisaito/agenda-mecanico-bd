import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import pg from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new pg.Pool({ 
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const servicios = [
    { nombre: 'Cambio de Aceite', duracion_min: 60, duracion_dias: 0, ocupa_cupo_dia: false },
    { nombre: 'Afinacion Mayor', duracion_min: 0, duracion_dias: 1, ocupa_cupo_dia: true },
    { nombre: 'Frenos (Pastillas y Discos)', duracion_min: 0, duracion_dias: 1, ocupa_cupo_dia: true },
    { nombre: 'Suspension', duracion_min: 0, duracion_dias: 2, ocupa_cupo_dia: true },
    { nombre: 'Diagnostico General', duracion_min: 45, duracion_dias: 0, ocupa_cupo_dia: false },
    { nombre: 'Transmision', duracion_min: 0, duracion_dias: 3, ocupa_cupo_dia: true },
    { nombre: 'Sistema Electrico', duracion_min: 0, duracion_dias: 1, ocupa_cupo_dia: true },
    { nombre: 'Hojalateria y Pintura', duracion_min: 0, duracion_dias: 5, ocupa_cupo_dia: true }
  ];

  for (const s of servicios) {
    await prisma.tipoServicio.upsert({
      where: { id: servicios.indexOf(s) + 1 },
      update: s,
      create: s
    });
  }

  await prisma.configuracionTaller.upsert({
    where: { id: 1 },
    update: {},
    create: {
      capacidad_diaria: 5,
      hora_apertura: '08:00',
      hora_cierre: '18:00'
    }
  });

  console.log('OK: Base poblada');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });