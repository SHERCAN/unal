/// <reference types="node" />
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const existingAdmin = await prisma.user.findFirst({
        where: { role: 'ADMIN' },
    });

    if (existingAdmin) {
        console.log('Admin user already exists:', existingAdmin.nickname);
        return;
    }

    const hashedPassword = await bcrypt.hash('Admin@123', 10);

    const admin = await prisma.user.create({
        data: {
            nickname: 'admin',
            password: hashedPassword,
            nombre: 'Administrador General',
            edad: 30,
            grado: 'Admin',
            role: 'ADMIN',
        },
    });

    console.log('Created admin user successfully:');
    console.log('Username: admin');
    console.log('Password: Admin@123');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
