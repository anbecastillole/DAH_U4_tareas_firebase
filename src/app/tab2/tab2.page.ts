import { Component } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { Task } from '../models/task';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public tasksComplete: string[];
  public taskComplete: string;
  public tasks1: Task[];

  
  constructor(private taskService:TasksService) {
    this.taskService.getTasksComplete().subscribe(
      res => {
        this.tasks1 = res;
        console.log(this.tasks1);
      }
    )
    
  }
  public descompletaTarea(tarea:Task,id:string){
    tarea.complete=false;
    this.taskService.descompletaTarea(tarea,id);
    console.log(tarea);
  } 
/*   public removeCompletedTask(pos:number){
    //se agrega al otro
    
    this.taskComplete= this.tasksComplete[pos];

    this.taskService.addTask(this.taskComplete);
    console.log("se agrega:"+this.taskComplete);;
    //se elimina de este
    this.taskService.removeCompletedTask(pos);
    this.tasksComplete = this.taskService.getCompletedTasks();
  }
 */
}
