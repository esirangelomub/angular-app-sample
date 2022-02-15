export interface ResponseModel<TModel> {
    success: boolean,
    message: string,
    data: TModel[];
}
