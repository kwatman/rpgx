import { Repository } from "typeorm";
import { User } from "../models/User";
import { CrudController } from "../types/controller/CrudController";
import { AppDataSource } from "../AppDataSource";

class UserController implements CrudController<User> {
  userRepository: Repository<User> = AppDataSource.getRepository(User);

  create(model: User): User {
    throw new Error("Method not implemented.");
  }

  get(): User[] {
    throw new Error("Method not implemented.");
  }

  getById(id: number): User {
    throw new Error("Method not implemented.");
  }

  async getByUsername(username: string): Promise<User | null> {
    let user = await this.userRepository.findOneBy({
      username: username,
    });
    return user;
  }

  update(id: number, model: User): User {
    throw new Error("Method not implemented.");
  }

  delete(id: number): User {
    throw new Error("Method not implemented.");
  }
}

export default new UserController();
