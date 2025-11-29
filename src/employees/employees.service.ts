import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class EmployeesService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createEmployeeDto: Prisma.EmpoyeeCreateInput) {
    return this.databaseService.empoyee.create({
      data: createEmployeeDto,
    });
  }

  async findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role)
      return this.databaseService.empoyee.findMany({
        where: { role: role },
      });
    return this.databaseService.empoyee.findMany();
  }

  async findOne(id: number) {
    return this.databaseService.empoyee.findUnique({
      where: { id: id },
    });
  }

  async update(id: number, updateEmployeeDto: Prisma.EmpoyeeUpdateInput) {
    return this.databaseService.empoyee.update({
      where: { id: id },
      data: updateEmployeeDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.empoyee.delete({
      where: { id: id },
    });
  }
}
