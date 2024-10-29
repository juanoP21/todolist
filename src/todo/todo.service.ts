import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TodoService {

  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>, private userService: UsersService,

  ) { }

  async create(createTodoDto: CreateTodoDto, userId: number) {
    let todo: Todo = new Todo();
    todo.title = createTodoDto.title;
    todo.date = new Date().toLocaleString();
    todo.description = createTodoDto.description;
    todo.dateend = createTodoDto.dateend;
    todo.state = createTodoDto.state
    todo.completed = false;
    todo.user = await this.userService.findUserById(userId);
    this.todoRepository.save(todo); 
    return { message: 'todo created successfully' };

  }

  async findAllTodoByUserCompleted(userId: number) {

    return await this.todoRepository.find({
      relations: ['user'],
      where: { user: { id: userId }, completed: true },
    });
  }
  async findAllTodoByUserNotCompleted(userId: number) {

    return await this.todoRepository.find({
      relations: ['user'],
      where: { user: { id: userId }, completed: false },
    });
  }

  async findOnetodo(id: number, idtodo: number) {
    return await this.todoRepository.findOne({
      where: { id: idtodo, user: { id: id } },
    });
  }

  async findAllTodosByUserId(userId: number): Promise<Todo[]> {
    return this.todoRepository.find({
      where: { user: { id: userId } },
    });
  }
  async update(userId: number, todoId: number, updateTodoDto: UpdateTodoDto) {
    await this.todoRepository.update(todoId, updateTodoDto);
    return this.todoRepository.findOne({
      where: { id: todoId, user: { id: userId } },
    });
  }

  async remove(userId: number, todoId: number) {
    await this.todoRepository.delete(todoId);
    return { message: `Todo with ID ${todoId} deleted successfully` };
  }
}
