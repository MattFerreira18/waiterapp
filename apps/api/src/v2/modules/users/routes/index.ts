import type { Router } from "../../../infra/http/interfaces";
import createUser from "../use-cases/create-user";
import listUser from "../use-cases/list-user";
import listUsers from "../use-cases/list-users";

function routes(router: Router) {
  router.post("/users", createUser.factory);
  router.get("/users", listUsers.factory);
  router.get("/users/:id", listUser.factory);
  // router.put('/users/:id', () => {});
  // router.patch('/users/:id', () => {});
  // router.delete('/users/:id', () => {});

  // router.post('/auth', () => {});
  // router.post('/refresh', () => {});
  // router.post('/forgot-password', () => {});
  // router.post('/reset', () => {});
}

export default routes;
