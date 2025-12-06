import 'reflect-metadata';
import 'express-async-errors';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { AppDataSource } from './database/data-source';
import { router } from './routes';
import { errorMiddleware } from './middleware/ErrorMiddleware';

// Carregar containers
import './containers';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use(router);

// Middleware de erro (deve ser o último)
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

// Inicializar banco de dados e servidor
AppDataSource.initialize()
  .then(() => {
    console.log('✅ Database connected');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📚 API Docs available at http://localhost:${PORT}/doc`);
    });
  })
  .catch((error) => {
    console.error('❌ Error connecting to database:', error);
    process.exit(1);
  });
