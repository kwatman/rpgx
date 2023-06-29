import { Controller } from "../types/controller/Controller";
import { User } from "../models/User";
import { AppDataSource } from "../AppDataSource";
import bcrypt from "bcrypt";
import { Repository } from "typeorm";

class AuthController implements Controller {
  userRepository: Repository<User> = AppDataSource.getRepository(User);

  register(user: User) {
    bcrypt.hash(user.password, 10, (err: any, hash: string) => {
      user.password = hash;
      this.userRepository.save(user);
    });
  }

  async login(user: User, password: string) {
    if (await bcrypt.compare(password, user.password)) return true;
    else return false;
  }
}

export default new AuthController();
