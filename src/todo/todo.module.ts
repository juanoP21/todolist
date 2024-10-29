import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { Todo } from './entities/todo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';

@Module({ imports: [
  TypeOrmModule.forFeature([Todo]),
    UsersModule],
  controllers: [TodoController],
  providers: [TodoService,UsersService ],
})
export class TodoModule {}
