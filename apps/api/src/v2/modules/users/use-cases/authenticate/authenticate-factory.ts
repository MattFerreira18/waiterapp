import type {
  HttpRequest,
  HttpResponse,
} from "../../../../infra/http/interfaces";
import UsersRepository from "../../repositories/UsersRepository";
import AuthenticateController from "./authenticate-controller";
import AuthenticateUseCase from "./authenticate-use-case";

function authenticateFactory(req: HttpRequest, res: HttpResponse) {
  const usersRepository = new UsersRepository();

  const useCase = new AuthenticateUseCase(usersRepository);
  const controller = new AuthenticateController(useCase);

  return controller.handle(req, res);
}

export default authenticateFactory;