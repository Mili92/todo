import { Component } from '@angular/core';
import {TodoInterface} from './shared/interfaces/todo-interface';
import { indexDebugNode } from '../../node_modules/@angular/core/src/debug/debug_node';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title: String = 'Angular Todo List';

  /**
   * @var todos: TodoInterface[]
   * Tableau des todos
   */
  public todos: TodoInterface[];

  /**
   * @var aTodo
   * Nouveau todo à ajouter à notre tableau
   */
  public aTodo: String;
  public checkedStatus: boolean=false;
  /**
   * Constructeur de la classe AddComponent
   * Invoqué dès la création d'un objet de type AddComponent
   */
  public constructor(){
    this.todos=[];
     // {title: 'Todo1'}//, isChecked: false},
    // {title: 'Todo2'}//, isChecked: false}
    //];
    this.aTodo='';
  }

  /**
   * Ajoute un todo au tableau des todos
   * @return void
   */
  public addTodo(): void {
   // this.todos.push({title: this.aTodo, isChecked:false});
    this.aTodo='';
  }

  public changeTitle(): void {
    this.title='Hola Angular';
  }

  /**
   * Supprime un todo
   * @param index: number Indice de l'élément à supprimer du tableau
   */
  public delete(index:number): void {
    console.log('Okay, je dois enlever l\'élément à l\'indice : '+ index);
    //On peut donc supprimer l'élément du tableau
    this.todos.splice(index,1);
  }

  /**
   * Bascule l'état de isChecked d'un todo
   * @param index Indice de l'élément dans le tableau
   */
  public toggle(index: number): void {
    this.todos[index].isChecked = !this.todos[index].isChecked;
  }

  /**
   * Supprimer les todos cochés
   */
   public deleteChecked2(){
     const _todos: TodoInterface[] = [];

     for (const todo of this.todos){
       if (!todo.isChecked){
         _todos.push(todo);
       }
     }
     this.todos=_todos;
   }

   /**
    * Détermine si oui ou non aucune boîte n'est cochée
    */
   public noneChecked(): boolean{
     let status: boolean = true;
     for (const todo of this.todos){
       if(todo.isChecked){
        status = false;
       }
     }
     return status;
   }

   /**
    * Détermine le nombre de caractères entrés est au minimum5
    */
   public validityCheck(): boolean {
      
      return this.aTodo.length >= 5 ? false : true;
   }


   
   public isChecked(todo: TodoInterface):boolean {
    return todo.isChecked;
  }

  /**
 * Change l'état de tous les todos
 */
private _check():void{
  for (let index=0;index<this.todos.length;index++){
    this.todos[index].isChecked = this.checkedStatus;
  }
}

public checkUncheckAll(){
  this.checkedStatus = !this.checkedStatus;
  this._check();
}

}

