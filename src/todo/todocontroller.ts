import { Controller,
          Body,
          Get,
          Post,
          HttpException,
          Res,
          Patch,
          Delete,
          Headers,
          HttpStatus,
          HttpCode,
          Put
       } from '@nestjs/common';
import { Response } from 'express';
import { TodoService } from './todo.service';
import { Todo } from './todo.entity'
import { Timestamp } from 'typeorm';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  // 등록되어있는 유저의 TodoList를 확인한다.
  @Get()
  async userTodoList(){
    console.log("userTodo active");
    return this.todoService.postTodoList();
  }


  // Todo를 등록한다.
  @Post('signup')
  async userTodoListSignup(
    // Client의 Body에서 온 정보를 각각 변수로
    // 저장
    @Headers() headers,
    @Body() completeBody: {
      userId : number,
      startTime : string,
      toDoName : string,
      description : string,
      todoListId : number
    }

  ) {

        const userTodo = await this.todoService.insertTodo(
          headers,
          completeBody.userId,
          completeBody.todoListId,
          completeBody.startTime,
          completeBody.toDoName,
          completeBody.description,
          
        );

        

        return {
          "Todo" : userTodo
        }

  }

  // // Todo를 수정한다.
  // @Put()
  // async userTodoUpdate(
  //   // Client의 Body에서 온 정보를 각각 변수로
  //   // 저장
  //   @Headers() headers,
  //   @Body() completeBody: {
  //     userId : number,
  //     startTime : string,
  //     toDoName : string,
  //     description : string,
  //     todoId : number
  //   }

  // ) {
  //     console.log("startTime : ", completeBody.startTime)


  //     const userTodo = await this.todoService.updateTodo(
  //       headers,
  //       completeBody.userId,
  //       completeBody.todoId,
  //       completeBody.startTime,
  //       completeBody.toDoName,
  //       completeBody.description
  //     );


  //     return {
  //       Todo : userTodo
  //     }
  //     // return userData;

  // }

  // // TodoList를 삭제한다.
  // @Delete()
  // async userTodoListDelete(
  //   // Client의 Body에서 온 정보를 각각 변수로
  //   // 저장
  //   @Headers() headers,
  //   @Body() completeBody: {
  //     userId : number,
  //     toDoListId : number,
  //   },
  //   @Res() res : Response

  // ) {

  //     const userTodoList = await this.todolistService.deleteTodoList(
  //       headers,
  //       completeBody.userId,
  //       completeBody.toDoListId
  //     );

  //     if(userTodoList.error){
        
  //       res.status(userTodoList.error);
  //       res.send({
  //         "statusCode" : userTodoList.error,
  //         "message" : userTodoList.message
  //       })
        
  //     }

  //     else if(!userTodoList.error){

  //       res.status(userTodoList.status);
  //       res.send({
  //         "statusCode" : userTodoList.status,
  //         "message" : userTodoList.message
  //       })

  //     }


  // }
  
}
