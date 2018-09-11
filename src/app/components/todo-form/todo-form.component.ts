import { Component, OnInit } from '@angular/core';
import { 
        FormGroup, 
        FormBuilder, 
        FormControl, 
        Validators
        } from '@angular/forms';
import {Subscription} from 'rxjs';
import {DateValidators} from './../../shared/validators/date-validators'
/**
 * Importation de la librairie tierce "moment.js"
 */
import * as moment from 'moment';
import { TodoService } from './../../shared/services/todo.service';
import { TodoInterface } from '../../shared/interfaces/todo-interface';
@Component({
  selector: 'todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {
  
  /**
   * @var todoForm: FormGroup Prise en charge du formulaire
   *  par ReactiveForms
   */
  public todoForm: FormGroup;

  /**
   * abonnement à un todo qui vient de TodoService
   * et qui passe par l'intermédiaire du service
   */
  private todoSubscription: Subscription;

  /**
   * Definit un objet todo à mettre à jour
   * @var todoToUpdate: TodoInterface todo qui vient du tableau
   */
  private todoToUpdate: TodoInterface;

  constructor(private formBuilder: FormBuilder,
              private todoService: TodoService) { 
                //objet vide
                this.todoToUpdate={
                  title:'',
                  begin: new Date(),
                  end: new Date()
                };
                //Abonnement à un todo
                this.todoSubscription = this.todoService
                                            .getTodo()
                                            .subscribe((unTodo) => {
              console.log('Je viens de recevoir un todo: '+JSON.stringify(unTodo));
              this.todoToUpdate = unTodo;
              this._loadForm();
              });
            }

  /**
   * @return FormControl Contrôle title du formulaire
   */
  public get title() {
    return this.todoForm.controls.title;
  }

  /**
   * Méthode définie dans l'interface OnInit
   * Est appelée immédiatement après le constructeur
   * de la classe courante.
   * Construction du formulaire todoform
   */
  ngOnInit() {
    //Définit le formulaire, ce qu'il contient
    //et les règles de validation du formulaire
   
      this.todoForm = this.formBuilder.group(
        //un tableau des objets qui constituent le formulaire: un formulaire vide n'est pas accepté
        {
          title: [//rajout des règles de validation dans les crochets
            this.todoToUpdate.title, //valeur par défaut pour le controle title
            [Validators.required, Validators.minLength(5)]
          ], 
          begin: [
            moment(this.todoToUpdate.begin).format('YYYY-MM-DD'),
            [Validators.required]
          ],
          end: [
            moment(this.todoToUpdate.end).format('YYYY-MM-DD'),
            [Validators.required]
          ]
        },
        {
          validator: Validators.compose([
            DateValidators.dateLessThan('begin','end',{'begin':true})
          ])
        }
        );
      } 
    
    /**
    * Methode _loadForm
    * Recharge le formulaire
    */
   public _loadForm(): void{
    this.ngOnInit();
   }

    /**
     * Emet le nouveau todo
     */
    public saveTodo(): void{
      const _todo: TodoInterface =this.todoForm.value;
      _todo.isChecked=false;
      //On doit tenir compte d'un todoToUpdate complet
      console.log('todoToUpdate : '+ JSON.stringify(this.todoToUpdate));
      if (this.todoToUpdate.hasOwnProperty('id')){
        _todo.id=this.todoToUpdate.id;
        this.todoService.updateTodo(_todo);
      } else {
        this.todoService.addTodo(
       _todo
      );
      }
    }

}
