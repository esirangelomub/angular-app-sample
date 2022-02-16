export interface ResponseCollectionModel<TModel> {
    success: boolean,
    message: string,
    data: TModel[];
}
