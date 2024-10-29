import { Controller, Get, Post, Body, Param, Delete, ValidationPipe, Put, ParseIntPipe } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('todo')
@ApiTags('Todo')

export class TodoController {
  constructor(private readonly todoService: TodoService) { }

  @Post(':userId')
  create(
    @Body(ValidationPipe) createTodoDto: CreateTodoDto,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.todoService.create(createTodoDto, Number(userId));
  }

  
  @Get('/findAll/:userId')
  findAllTodosByUserId(
    @Param('userId', ParseIntPipe) userId: number) {
    return this.todoService.findAllTodosByUserId(Number(userId));
  }

  @Get('/finonetodo/:id/:idtodo')
  findOne(
    @Param('id', ParseIntPipe) id: string, 
    @Param('idtodo') idtodo: string) {
    return this.todoService.findOnetodo(+id, +idtodo);
  }

  @Put(':userId/:todoId')
  update(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('todoId', ParseIntPipe) todoId: number,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    return this.todoService.update(userId, todoId, updateTodoDto);
  }

  @Delete(':userId/:todoId')
  remove(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('todoId', ParseIntPipe) todoId: number,
  ) {
    return this.todoService.remove(userId, todoId);
  }
}