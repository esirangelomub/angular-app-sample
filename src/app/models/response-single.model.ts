export interface ResponseSingleModel<TModel> {
    success: boolean,
    message: string,
    data: TModel;
}
