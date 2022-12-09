import { Injectable } from '@angular/core';
import { Task } from "../models/task";
import { map } from 'rxjs/operators'
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private tasks: string[] = [];
  private tasksComplete: string[] = []; 
  constructor(private firestore:AngularFirestore) {
  
   }

//public getTasks(): string[] { //metodos con minuscula al inicio y lo demás mayuscula
   // return this.tasks;
  //}
  public getTasksComplete(): Observable<Task[]> {
    return this.firestore.collection('tareas').snapshotChanges().pipe(
      map(actions=> {
        return actions.map(a=>{
          console.log(a);
          const data = a.payload.doc.data() as Task;
          console.log(data);
          const id = a.payload.doc.id;
          return { id,...data};
        }).filter(task=>task.complete == true)
      })
    )
  }  public getTasksNotComplete(): Observable<Task[]> {
    return this.firestore.collection('tareas').snapshotChanges().pipe(
      map(actions=> {
        return actions.map(a=>{
          console.log(a);
          const data = a.payload.doc.data() as Task;
          console.log(data);
          const id = a.payload.doc.id;
          return { id,...data};
        }).filter(task=>task.complete == false)
      })
    )
  }
  public addTask(task:string){
    console.log("se recibe el:"+task);
    this.tasks.push(task);
    console.log(this.tasks);
   
  }

  public eliminaTarea(id: string){
    this.firestore.collection("tareas").doc(id).delete();
  }
  public nuevaTarea(task: Task) {
    this.firestore.collection('tareas').add(task);
  }
  public completaTarea(task: Task,id:string) {
    this.firestore.collection('tareas').doc(id).update(task)
   }
   public descompletaTarea(task: Task,id:string) {
    this.firestore.collection('tareas').doc(id).update(task)
   }

  /* public removeTask(pos:number){
    this.tasks.splice(pos,1);
  }

  public getCompletedTasks(): string[] {
    return this.tasksComplete;
  }

  public addCompletedTask(pos: number){
    this.tasksComplete.push(this.tasks[pos]);
    console.log(this.tasksComplete);
  }

  public removeCompletedTask(pos: number){
    this.tasksComplete.splice(pos,1);
  } */
}
