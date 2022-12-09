import { Task } from './../models/task';
import { Component } from '@angular/core';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public tasks1: Task[];
  public tasks: string[];
  public tarea:Task;
  public aux:string;
  public task: string;

  constructor(private taskService:TasksService) {
    //this.tasks= this.taskService.getTasks();
    this.taskService.getTasksNotComplete().subscribe(
      res => {
        this.tasks1 = res;
        console.log(this.tasks1);
      }
    )
  } 
 
  public nuevaTarea(insercion:string){
    let task:Task;
    task={
      task:insercion,
      complete:false
    }
    this.taskService.nuevaTarea(task);
    console.log("hola tarea "+ task);
    console.log(task)
    
  }
  public eliminarTarea(id:string){
    this.taskService.eliminaTarea(id);
    console.log(id);
    
  }

  public completaTarea(tarea:Task,id:string){
    tarea.complete=true;
    this.taskService.completaTarea(tarea,id);
    console.log(tarea);
  }
/*
  public addTask(){

    this.taskService.addTask(this.task);
    this.tasks=this.taskService.getTasks();
    console.log(this.tasks);
    this.task='';
 
  }

  public removeTask(pos:number){
    this.taskService.removeTask(pos);
    this.tasks = this.taskService.getTasks();
  }

  public completeTask(pos:number){
    //se agrega al otro
    this.taskService.addCompletedTask(pos);
    this.tasks = this.taskService.getTasks();
    //se elimina
    this.taskService.removeTask(pos);
    this.tasks = this.taskService.getTasks();

  }
*/

}
