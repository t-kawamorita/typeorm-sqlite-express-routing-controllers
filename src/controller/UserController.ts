import {
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  JsonController,
  NotFoundError,
} from "routing-controllers";
import { User } from "../entity/User";
import { getRepository, Repository } from "typeorm";
import { EntityFromParam } from "typeorm-routing-controllers-extensions";

@JsonController()
export class UserController {
  userRepository: Repository<User> = getRepository(User);

  @Get("/users")
  getAll() {
    return this.userRepository.find();
  }

  @Get("/users/:id")
  async getOne(@EntityFromParam("id") user: User) {
    if (!user) {
      throw new NotFoundError("User was not found !");
    }
    return user;
  }

  @Post("/users")
  async post(@Body() user: any) {
    return await this.userRepository.save(user);
  }

  @Put("/users/:id")
  async put(@Param("id") id: number, @Body() user: any) {
    return await this.userRepository.update(id, user);
  }

  @Delete("/users/:id")
  async remove(@EntityFromParam("id") user: User) {
    if (!user) {
      throw new NotFoundError("User was not found !");
    }
    return await this.userRepository.remove(user);
  }
}
