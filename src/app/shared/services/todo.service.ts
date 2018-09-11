import { Injectable } from '@angular/core';
import { observable } from '../../../../node_modules/rxjs';
import { HttpClient } from '@angular/common/http'; 

//Importer les modules d'observation
import {Observable,Subject} from 'rxjs';
import {TodoInterface} from './../interfaces/todo-interface';
import {Constants} from './../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  /**
   * Définit un Sujet observable de type TodoInterface
   */
  private todoSubject: Subject<TodoInterface> = new Subject<TodoInterface>();
  
  /**
   * Injection de la dépendence HttpClient
   * @param _api: HttpCLient Transport vers le backend
   */
  constructor(private _api: HttpClient) { }

  public getTodos(id: number = null): Observable<TodoInterface[]> {
    if (id !== null){
      return this._api.get<TodoInterface[]>(
        //parametres de la methode
        Constants._API_ROOT + '/' + id
      );
    } else {
      return this._api.get<TodoInterface[]>(
        Constants._API_ROOT
      );
    }
  }

  /**
   * Insère un todo dans la liste des todos
   * et diffuse le nouveau todo créé
   * @param todo 
   */
  public addTodo(todo: TodoInterface){
    this._api.post<TodoInterface[]>(
      Constants._API_ROOT,
      todo
    ).subscribe((addedTodo)=>{
      addedTodo[0].isChecked = false;
      this.sendTodo(addedTodo[0]);

      const _emptyTodo ={
        title:'',
        begin:new Date(),
        end: new Date()
      }
      this.sendTodo(_emptyTodo);
    });   
  }
  
  /**
   * Supprimer un todo dans la liste des todos
   */
  public deleteTodo(todo: TodoInterface): void {
    this._api.delete(
      Constants._API_ROOT +'/'+ todo.id
    )
    .subscribe((result)=>{
      //NOOP
    });
  }
 

  /**
   * Méthode permettant aux autres classes de souscrire (observer/s'abonner) le sujet
   */
  public getTodo(): Observable<TodoInterface>{
    return this.todoSubject.asObservable();
  }

  /**
   * Diffuse le sujet vers les abonnés
   * @param todo TodoInterface un todo qui passe par là
   */
  public sendTodo(todo: TodoInterface){
    this.todoSubject.next(todo);
  }

  /**
   * Mise à jour d'un todo existant
   * @param todo: ToDoInterface : todo à mettre à jour
   */
  public updateTodo(todo: TodoInterface): void{
    this._api.put<TodoInterface>(
      Constants._API_ROOT +'/'+ todo.id,
      todo
    ).subscribe((result)=>{
      //On n'oublie pas de transmettre le todo modifié
      const _emptyTodo ={
        title:'',
        begin:new Date(),
        end: new Date()
      }
      this.sendTodo(todo);
      this.sendTodo(_emptyTodo);
    });
  }
}
