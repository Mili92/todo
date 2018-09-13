export interface MatColumns {
    /**
     * @var title String: Titre de la colonne dans le tableau
     */
    title: String;

    /**
     * @var always Boolean: Détermine si la colonne doit être toujours affichée
     */
    always: Boolean;
    
    /**
     * @var value String: valeur utilisée dans la liste des colonnes affichées
     */
    value: String;

    /**
     * @var isDisplayed Boolean: Vrai si la colonne est affichée
     */
    isDisplayed: Boolean;

}
