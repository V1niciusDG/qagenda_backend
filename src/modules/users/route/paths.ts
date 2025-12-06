import { Authenticated } from '@middleware/Authenticated';
import { NoAuthenticated } from '@middleware/NoAuthenticated';
import { CreateUserController } from '../useCases/createUser/CreateUserController';
import { UpdateUserController } from '../useCases/updateUser/UpdateUserController';
import { DeleteUserController } from '../useCases/deleteUser/DeleteUserController';
import { ListUsersController } from '../useCases/listUsers/ListUsersController';
import { GetUserByIdController } from '../useCases/getUserById/GetUserByIdController';

/**
 * @swagger
 * /user:
 *      post:
 *          summary: Cadastra um novo usuário
 *          tags:
 *              - Users
 *          description: Cria um novo usuário no sistema (rota pública)
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          required:
 *                              - name
 *                              - email
 *                              - password
 *                              - user_type
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: João Silva
 *                              email:
 *                                  type: string
 *                                  example: joao@example.com
 *                              password:
 *                                  type: string
 *                                  example: senha123
 *                              user_type:
 *                                  type: string
 *                                  enum: [client, company]
 *                                  example: client
 *                              phone:
 *                                  type: string
 *                                  example: "11999999999"
 *          responses:
 *              201:
 *                  description: Usuário criado com sucesso
 *              409:
 *                  description: Email já cadastrado para este tipo de usuário
 *              500:
 *                  description: Erro interno do servidor
 */
const createUserController = new CreateUserController();

/**
 * @swagger
 * /user:
 *      get:
 *          summary: Lista todos os usuários
 *          security:
 *              - bearerAuth: []
 *          tags:
 *              - Users
 *          description: Retorna lista de todos os usuários cadastrados
 *          responses:
 *              200:
 *                  description: Lista de usuários
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  type: object
 *                                  properties:
 *                                      id:
 *                                          type: number
 *                                      name:
 *                                          type: string
 *                                      email:
 *                                          type: string
 *                                      user_type:
 *                                          type: string
 *                                      phone:
 *                                          type: string
 *                                      avatar_url:
 *                                          type: string
 *                                      email_verified:
 *                                          type: boolean
 *                                      blocked:
 *                                          type: boolean
 *                                      created_at:
 *                                          type: string
 *                                      updated_at:
 *                                          type: string
 *              401:
 *                  description: Não autorizado
 *              500:
 *                  description: Erro interno do servidor
 */
const listUsersController = new ListUsersController();

/**
 * @swagger
 * /user/{id}:
 *      get:
 *          summary: Busca usuário por ID
 *          security:
 *              - bearerAuth: []
 *          tags:
 *              - Users
 *          description: Retorna dados de um usuário específico
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                description: ID do usuário
 *                schema:
 *                    type: integer
 *          responses:
 *              200:
 *                  description: Dados do usuário
 *              401:
 *                  description: Não autorizado
 *              404:
 *                  description: Usuário não encontrado
 *              500:
 *                  description: Erro interno do servidor
 */
const getUserByIdController = new GetUserByIdController();

/**
 * @swagger
 * /user/{id}:
 *      put:
 *          summary: Atualiza dados do usuário
 *          security:
 *              - bearerAuth: []
 *          tags:
 *              - Users
 *          description: Atualiza informações de um usuário específico
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                description: ID do usuário
 *                schema:
 *                    type: integer
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: João Silva Atualizado
 *                              email:
 *                                  type: string
 *                                  example: novoemail@example.com
 *                              phone:
 *                                  type: string
 *                                  example: "11988888888"
 *                              avatar_url:
 *                                  type: string
 *                                  example: https://example.com/avatar.jpg
 *                              user_type:
 *                                  type: string
 *                                  enum: [client, company]
 *          responses:
 *              200:
 *                  description: Usuário atualizado com sucesso
 *              401:
 *                  description: Não autorizado
 *              404:
 *                  description: Usuário não encontrado
 *              409:
 *                  description: Email já em uso
 *              500:
 *                  description: Erro interno do servidor
 */
const updateUserController = new UpdateUserController();

/**
 * @swagger
 * /user/{id}:
 *      delete:
 *          summary: Remove usuário do sistema
 *          security:
 *              - bearerAuth: []
 *          tags:
 *              - Users
 *          description: Deleta permanentemente um usuário (hard delete)
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                description: ID do usuário
 *                schema:
 *                    type: integer
 *          responses:
 *              204:
 *                  description: Usuário deletado com sucesso
 *              401:
 *                  description: Não autorizado
 *              404:
 *                  description: Usuário não encontrado
 *              500:
 *                  description: Erro interno do servidor
 */
const deleteUserController = new DeleteUserController();

const paths = [
  {
    method: 'POST' as const,
    moduleByName: 'User',
    url: '/',
    handlers: createUserController.handle,
    middlewares: [NoAuthenticated],
  },
  {
    method: 'GET' as const,
    moduleByName: 'User',
    url: '/',
    handlers: listUsersController.handle,
    middlewares: [Authenticated],
  },
  {
    method: 'GET' as const,
    moduleByName: 'User',
    url: '/:id',
    handlers: getUserByIdController.handle,
    middlewares: [Authenticated],
  },
  {
    method: 'PUT' as const,
    moduleByName: 'User',
    url: '/:id',
    handlers: updateUserController.handle,
    middlewares: [Authenticated],
  },
  {
    method: 'DELETE' as const,
    moduleByName: 'User',
    url: '/:id',
    handlers: deleteUserController.handle,
    middlewares: [Authenticated],
  },
];

export default paths;
