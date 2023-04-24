import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTodoDto } from 'src/todo-module/DTO/create-todo';
import { Pagination } from 'src/todo-module/DTO/pagination';
import { SearchTodoDto } from 'src/todo-module/DTO/search-todo';
import { UpdateTodoTdo } from 'src/todo-module/DTO/update-todo';
import TodoEntity from 'src/todo-module/entities/TodoEntity';
import { IT } from 'src/injection-token';
import { Todo, TodoStatusEnum } from 'src/todo-module/todo/todo';
import { Repository, SelectQueryBuilder } from 'typeorm';

class APIfeatures {
    constructor(
        public query: SelectQueryBuilder<TodoEntity>, 
        private queryString: Pagination,
    ){}

    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit
        this.query = this.query.offset(skip).limit(limit)
        return this;
    }
}

@Injectable()
export class TodoModuleService {
    @Inject(IT.COMMON_MODULE) uuid;
    constructor(
        @InjectRepository(TodoEntity)
        private readonly todoRepository: Repository<TodoEntity>,
    ){}

    private todos: Array<Todo> = [];

    createTodo(data: CreateTodoDto): Todo{
        const todo: Todo = new Todo();
        
        todo.id = this.uuid();
        todo.name = data.name ?? "";
        todo.description = data.description ?? "";
        todo.createdAt = new Date();
        todo.status = TodoStatusEnum.waiting;
        this.todos.push(todo)
        return todo;
    }

    createTodoDb(data: CreateTodoDto){
        const todo = new TodoEntity();
        
        todo.name = data.name;
        todo.description = data.description;
        todo.status = TodoStatusEnum.waiting;

        return this.todoRepository.save(todo);
    }

    getAll(): Array<Todo> {
        return this.todos
    }

    getAllDb({status, data, ...pagination}: Omit<Pagination, keyof SearchTodoDto> & SearchTodoDto){
        const qb = this.todoRepository.createQueryBuilder("todo");
        if(data) 
            qb.where("todo.name Like :data", { data: '%' + data + '%' })
            .orWhere("todo.description Like :data", { data: '%' + data + '%' })
        if(status) qb.orWhere("todo.status= :statusParam", { statusParam: status });
        const feature = new APIfeatures(qb, pagination).paginating();
        return feature.query.getMany();
    }

    getById(id: string): Todo|undefined {
        return this.todos.find((e) => e.id == id);
    }

    async getByIdDb(id: string) {
        const todo = await this.todoRepository.findOne({ where: [{ id: id }] });
        if(!todo) throw new BadRequestException("ToDo Not Found");
        return todo
    }

    deleteById(id: string): Todo {
        const idx = this.todos.findIndex((e) => e.id == id);
        if(idx == -1) throw "Todo doesn't exist";

        return this.todos.splice(idx, 1)[0];
    }

    async deleteByIdDb(id: string){
        const todo = await this.todoRepository.findOneBy({id})
        console.log(id)
        if(!todo) throw new NotFoundException("Todo doesn't exist.")

        this.todoRepository.softDelete(id)
        return todo;
    }

    restoreById(id: string){
        return this.todoRepository.restore(id);
    }

    updateTodo(data: UpdateTodoTdo){
        const todo: Todo = new Todo();
        const idx = this.todos.findIndex((e) => e.id == data.id);

        todo.id = data.id;
        todo.name = data.name ?? this.todos[idx].name;
        todo.description = data.description ?? this.todos[idx].description;
        todo.status = data.status ?? this.todos[idx].status;

        this.todos.splice(idx, 1, todo);
        return todo;
    }

    async updateTodoDb(data: UpdateTodoTdo) {
        const elem = await this.todoRepository.findOneBy({id: data.id});
        if(!elem) throw new NotFoundException("Todo doesn't exist.")

        elem.description = data.description ?? elem.description;
        elem.name = data.name ?? elem.name;
        elem.status = data.status ?? elem.status;

        return this.todoRepository.save(elem);
    }

    async getStats(){
        return {
            actif: await this.todoRepository.countBy({status: TodoStatusEnum.actif}),
            done: await this.todoRepository.countBy({status: TodoStatusEnum.done}),
            waiting: await this.todoRepository.countBy({status: TodoStatusEnum.waiting}),
        }
    }
}
