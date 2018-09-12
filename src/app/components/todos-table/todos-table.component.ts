import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { TodoService } from './../../shared/services/todo.service';
import { TodoInterface } from '../../shared/interfaces/todo-interface';

//Importation des classes nécessaires: les composants Material
import { MatTableDataSource, MatPaginator, MatSort, MatSelect, MatOption} from '@angular/material';
import { FormGroup, FormControl } from '../../../../node_modules/@angular/forms';

@Component({
  selector: 'todos-table',
  templateUrl: './todos-table.component.html',
  styleUrls: ['./todos-table.component.css']
})
export class TodosTableComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;

    /**
   * @var aTodo
   * Nouveau todo à ajouter à notre tableau
   */
  public aTodo: String;
  public checkedStatus: boolean=false;
  /**
   * abonnement à un todo qui vient de TodoService
   */
  private todoSubscription: Subscription;

  /**
   * Datasource: Source des données pour le tableau Material
   */
  public dataSource = new MatTableDataSource<TodoInterface>();
  

   /**
   * Colonnes utilisées dans mat-table
   */
  public columns = new FormControl();
  public displayedColumns: String[] = [
    'title',
    'begin',
    'end',
    'update',
    'delete'
  ];

  /**
   * Colonnes à afficher dans le mat-select
   */
  public availableColumns: String[] = [
    'begin',
    'end'
  ]

  /**
   * Colonnes sélectionnées par défaut pour que les boites soient cochées
   */
  public selectedValue: String[] = [
    'begin',
    'end'
  ]
  /**
   * Options réellement sélectionnées par l'utilisateur
   */
  public selectedOptions: any;
  
  /**
   * Détecte un changement de sélection de colonnes
   * @param event Evenement
   */
  public changeView(event:any): void{
    console.log(this.selectedOptions + ' de taille : '+ this.selectedOptions.length);

    const toShow: String[] = this.selectedOptions;

    /**
     * Definit le tableau final pour l'affichage des colonnes
     */
    const toDisplay: String[]= [];

    toDisplay.push('title'); //toujours affichée, donc...on le push

    if (toShow.indexOf('begin') !== -1){
      //begin est coché, on le push
      toDisplay.push('begin');
    }
    if (toShow.indexOf('end') !== -1){
      //end est coché, on le push
      toDisplay.push('end');
    }
    //On doit toujours avoir les boutons aussi
    toDisplay.push('update');
    toDisplay.push('delete');
    /**
     * On remplace le tableau des colonnes à afficher dans le tableau
     */
    this.displayedColumns =toDisplay;

  }
  
  

  /**
   * Tableau de todos à afficher
   * @var TodoInterface[]
   */
  public todos: TodoInterface[];

  constructor(private todoService: TodoService) { 
    this.todos=[]; //définit le tableau de todos à afficher

    this.todoSubscription = this.todoService.getTodo()
                                            .subscribe((todo) => {
                                              console.log('Observable todo: '+ JSON.stringify(todo));
                                              //AJoute le todo à la liste des todos
                                              //s'il n'existe pas deja
                                              //attention, s'il existe, je dois remplacer par les nouvelles valeurs
                                              const index= this.todos.findIndex((obj)=>obj.id ==todo.id);
                                              if (index === -1 && todo.hasOwnProperty('id')){
                                              //if (this.todos.indexOf(todo)=== -1){
                                                this.todos.push(todo);
                                              } else {
                                                this.todos[index]=todo;
                                              }
                                              this.dataSource.data = this.todos;
                                            });
  }
  /**
   * Transmets le todo à modifier au formulaire
   * @param todo: TodoInterface todo à modifier
   */
  public update(todo: TodoInterface): void{
    console.log("Modification du todo: "+ todo.id);
    this.todoService.sendTodo(todo);
  }



  /**
   * Après construction de l'objet, on charge la liste des todos existant dans la base
   */
  ngOnInit() {
    // Récupère les todos existants dans la base
    this.todoService.getTodos().subscribe((todos) =>{
      this.todos= todos;
      console.log('Il y a '+ this.todos.length + ' todos à afficher');

      //On définit à ce moment la source de données
      this.dataSource.data = this.todos;
      this.dataSource.sort = this.sort;

    });
  }

  /**
   * Supprime un todo de la liste
   */

   public delete(todo: TodoInterface): void {
    const index = this.todos.indexOf(todo);
    const _todo = this.todos[index];//Récupère le todo

    this.todos.splice(index,1);//Depile l'élément du tableau

    this.dataSource.data = this.todos;

    this.todoService.deleteTodo(_todo);//Appelle le service
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
       } else {
         this.todoService.deleteTodo(todo);
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
