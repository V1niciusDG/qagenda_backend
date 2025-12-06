import { Authenticated } from '@middleware/Authenticated';
import { NoAuthenticated } from '@middleware/NoAuthenticated';
import { AuthTokenController } from '../useCases/authToken/AuthTokenController';
import { ForgotPasswordController } from '../useCases/forgotPassword/ForgotPasswordController';
import { ResetPasswordController } from '../useCases/resetPassword/ResetPasswordController';

/**
 * @swagger
 * /auth/login:
 *      post:
 *          summary: Realiza login no sistema
 *          tags:
 *              - Auth
 *          description: Autentica usuário com email, senha e tipo de usuário
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          required:
 *                              - email
 *                              - password
 *                              - user_type
 *                          properties:
 *                              email:
 *                                  type: string
 *                                  example: user@example.com
 *                              password:
 *                                  type: string
 *                                  example: senha123
 *                              user_type:
 *                                  type: string
 *                                  enum: [client, company]
 *                                  example: client
 *          responses:
 *              200:
 *                  description: Login realizado com sucesso
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  token:
 *                                      type: string
 *                                  refresh_token:
 *                                      type: string
 *                                  user:
 *                                      type: object
 *                                      properties:
 *                                          id:
 *                                              type: number
 *                                          name:
 *                                              type: string
 *                                          email:
 *                                              type: string
 *              401:
 *                  description: Credenciais inválidas
 *              500:
 *                  description: Erro interno do servidor
 */
const authTokenController = new AuthTokenController();

/**
 * @swagger
 * /auth/forgot-password:
 *      post:
 *          summary: Solicita reset de senha
 *          tags:
 *              - Auth
 *          description: Gera token de 6 dígitos para reset de senha
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          required:
 *                              - email
 *                              - user_type
 *                          properties:
 *                              email:
 *                                  type: string
 *                                  example: user@example.com
 *                              user_type:
 *                                  type: string
 *                                  enum: [client, company]
 *                                  example: client
 *          responses:
 *              200:
 *                  description: Token gerado com sucesso
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  token:
 *                                      type: string
 *                                      example: "123456"
 *                                  message:
 *                                      type: string
 *              404:
 *                  description: Usuário não encontrado
 *              500:
 *                  description: Erro interno do servidor
 */
const forgotPasswordController = new ForgotPasswordController();

/**
 * @swagger
 * /auth/reset-password:
 *      post:
 *          summary: Reseta a senha do usuário
 *          tags:
 *              - Auth
 *          description: Valida o token e atualiza a senha do usuário
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          required:
 *                              - token
 *                              - new_password
 *                          properties:
 *                              token:
 *                                  type: string
 *                                  example: "123456"
 *                              new_password:
 *                                  type: string
 *                                  example: novaSenha123
 *          responses:
 *              200:
 *                  description: Senha alterada com sucesso
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: Password reset successfully
 *              400:
 *                  description: Token inválido ou expirado
 *              404:
 *                  description: Usuário não encontrado
 *              500:
 *                  description: Erro interno do servidor
 */
const resetPasswordController = new ResetPasswordController();

const paths = [
  {
    method: 'POST' as const,
    moduleByName: 'Auth',
    url: '/login',
    handlers: authTokenController.handle,
    middlewares: [NoAuthenticated],
  },
  {
    method: 'POST' as const,
    moduleByName: 'Auth',
    url: '/forgot-password',
    handlers: forgotPasswordController.handle,
    middlewares: [NoAuthenticated],
  },
  {
    method: 'POST' as const,
    moduleByName: 'Auth',
    url: '/reset-password',
    handlers: resetPasswordController.handle,
    middlewares: [NoAuthenticated],
  },
];

export default paths;
