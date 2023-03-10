import AppError from "@/errors/app-error";
import Either, { Left, Right } from "@/errors/either";
import type { HttpBodyResponse } from "@/infra/http/interfaces";
import validate from "@/utils/validate";

import { IUsersRepository } from "../../infra/repositories/interfaces";
import userPresentation, {
  IUserPresentation,
} from "../../presentations/user-presentation";

interface ListUserUseCaseInput {
  id: string;
}

type ListUserUseCaseOutput = HttpBodyResponse<{
  user: IUserPresentation;
}>;

class ListUserUseCase {
  constructor(private readonly usersRepository: IUsersRepository) {}

  async execute({
    id,
  }: ListUserUseCaseInput): Promise<Either<AppError, ListUserUseCaseOutput>> {
    if (!validate.uuidV4(id)) {
      return Left.commit(new AppError("bad_request", "invalid [id] param"));
    }

    const user = await this.usersRepository.findById(id);

    if (!user) {
      return Left.commit(new AppError("not_found", "user not found"));
    }

    return Right.commit({
      _self: null,
      data: { user: userPresentation(user) },
    });
  }
}

export default ListUserUseCase;
