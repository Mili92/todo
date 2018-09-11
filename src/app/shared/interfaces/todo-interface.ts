export interface TodoInterface {
    /**
     * @var (optional) id: number
     * Identifiant du todo
     */
    id?: number;
    /**
     * Title du Todo
     * @var String
     */
    title: String;

    /**
     * Date de debut
     * @var Date begin
     */
    begin: Date;

    /**
     * Date de fin
     * @var Date end
     */
    end: Date;

    /**
     * @var boolean
     * Vrai si le todo est coché
     */
    isChecked?: boolean;
}
