import { MatTableHelper } from './mat-table-helper';
/**
 * Va permettre de récupérer toutes les colonnes affichées
 * De récupérer toutes les colonnes filtrées
 * Tous nos objets seront rangés dans un objet de type map qui est un tableau associatif:
 * on range les infos avec une etiquette et à cette etiquette on y associe qqch(on parle de clé)
 */

export class TodoHelper extends MatTableHelper {
    public constructor(){
        super();//quand on extend une autre classe
        
        //definition de notre mapping: on definit tout ce qui la constitue
        //5 clés et 5 valeurs associées
        this.todoTableMap.set(
            'title', //la clé
            {title: 'To do', always: true, value:'title',isDisplayed: true}
        );
        this.todoTableMap.set(
            'begin', //la clé
            {title: 'From...', always: false, value:'begin',isDisplayed: true}
        );
        this.todoTableMap.set(
            'end', //la clé
            {title: 'To...', always: false, value:'end',isDisplayed: true}
        );
        this.todoTableMap.set(
            'update', //la clé
            {title: 'Update', always: true, value:'update',isDisplayed: true}
        );
        this.todoTableMap.set(
            'delete', //la clé
            {title: 'Delete', always: true, value:'delete',isDisplayed: true}
        );

    }

    

}
