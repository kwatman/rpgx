import { Controller } from "./Controller";

export interface CrudController<Type> extends Controller {
  create(model: Type): Type;
  get(): Type[];
  getById(id: number): Type;
  update(id: number, model: Type): Type;
  delete(id: number): Type;
}
