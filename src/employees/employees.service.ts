import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EmployeesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createEmployeeDto: Prisma.EmployeeCreateInput) {
    try {
      return await this.prisma.employee.create({
        data: createEmployeeDto,
      });
    } catch (err) {
      if (err.code === 'P2002') {
        throw new BadRequestException('Email already exists');
      }
      throw err;
    }
  }

  async findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      return this.prisma.employee.findMany({
        where: { role },
      });
    }
    return this.prisma.employee.findMany();
  }

  async findOne(id: number) {
    const employee = await this.prisma.employee.findUnique({
      where: { id },
    });

    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }

    return employee;
  }

  async update(id: number, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    try {
      return await this.prisma.employee.update({
        where: { id },
        data: updateEmployeeDto,
      });
    } catch (err) {
      if (err.code === 'P2025') {
        throw new NotFoundException(`Employee with ID ${id} not found`);
      }
      throw err;
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.employee.delete({
        where: { id },
      });
    } catch (err) {
      if (err.code === 'P2025') {
        throw new NotFoundException(`Employee with ID ${id} not found`);
      }
      throw err;
    }
  }
}
