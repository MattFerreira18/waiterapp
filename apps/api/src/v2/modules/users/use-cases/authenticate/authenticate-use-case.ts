import AppError from "../../../../errors/AppError";
import Either, { Left, Right } from "../../../../errors/either";
import userPresentation, { IUserPresentation } from "../../presentations/user-presentation";
import { IUsersRepository } from "../../repositories/interfaces";
import crypto from "../../utils/crypto";
import validate from "../../utils/validate";

export interface AuthenticateUseCaseInput {
  email: string;
  password: string;
}

interface AuthenticateUserUseCaseOutput {
  user: IUserPresentation;
  token: string;
}

class AuthenticateUseCase {
  constructor(private readonly usersRepository: IUsersRepository) {}

  async execute(input: AuthenticateUseCaseInput): Promise<Either<AppError, AuthenticateUserUseCaseOutput>> {
    if (
      !validate.requiredFields<AuthenticateUseCaseInput>(
        ["email", "password"],
        input
      )
    ) {
      return Left.commit(
        new AppError("bad_request", "some required fields are missing")
      );
    }

    const { email, password } = input;

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      return Left.commit(new AppError('unauthorized', 'email or password incorrect'));
    }

    const isPasswordCorrect = crypto.verify(password, user.password);

    if (!isPasswordCorrect) {
      return Left.commit(new AppError('unauthorized', 'email or password incorrect'));
    }

    const newPasswordHash = await crypto.hash(password);

    user.password = password;
    user.passwordHashed = newPasswordHash;

    await this.usersRepository.update(user);

    const token = crypto.jwt.sign({ email: user.email, role: user.role });

    return Right.commit({ user: userPresentation(user), token })
   }
}

export default AuthenticateUseCase;