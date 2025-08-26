import 'reflect-metadata';
import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { createServer, Server } from 'http';
import config from './config';
import { AppDataSource } from './db/data-source';
import { errorHandler, notFoundHandler } from './middleware/validation.middleware';
import { logger } from './utils/logger';

class App {
    private app: Application;
    private server: Server;
    private port: number;

    constructor() {
        this.app = express();
        this.server = createServer(this.app);
        this.port = config.port;

        this.initializeMiddlewares();
        this.initializeDatabase();
        this.initializeRoutes();
        this.initializeErrorHandling();
    }

    private initializeMiddlewares(): void {
        // Seguridad básica
        this.app.use(helmet());
        
        // CORS
        this.app.use(cors({
            origin: config.allowedOrigins,
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            allowedHeaders: ['Content-Type', 'Authorization']
        }));

        // Logging
        if (process.env.NODE_ENV !== 'test') {
            this.app.use(morgan('dev'));
        }

        // Body parser
        this.app.use(express.json({ limit: '10kb' }));
        this.app.use(express.urlencoded({ extended: true, limit: '10kb' }));
    }

    private async initializeDatabase(): Promise<void> {
        try {
            await AppDataSource.initialize();
            logger.info('✅ Base de datos conectada');
            
            // Sincronizar modelos en desarrollo
            if (process.env.NODE_ENV === 'development') {
                await AppDataSource.synchronize();
                logger.info('🔄 Modelos sincronizados');
            }
        } catch (error) {
            logger.error('❌ Error al conectar con la base de datos:', error);
            process.exit(1);
        }
    }

    private initializeRoutes(): void {
        // Ruta de salud
        this.app.get('/health', (req: Request, res: Response) => {
            res.status(200).json({
                status: 'ok',
                timestamp: new Date().toISOString(),
                database: AppDataSource.isInitialized ? 'connected' : 'disconnected'
            });
        });

        // API routes
        const apiRouter = require('./routes').default;
        this.app.use('/api', apiRouter);

        // 404 handler
        this.app.use(notFoundHandler);
    }

    private initializeErrorHandling(): void {
        this.app.use(errorHandler);
    }

    public start(): void {
        this.server.listen(this.port, () => {
            logger.info(`🚀 Servidor corriendo en http://localhost:${this.port}`);
            logger.info(`📝 Entorno: ${process.env.NODE_ENV || 'development'}`);
            logger.info(`🛡️  Modo seguro: ${process.env.NODE_ENV === 'production' ? 'activado' : 'desactivado'}`);
        });

        // Manejadores de errores no capturados
        process.on('unhandledRejection', (reason: Error) => {
            logger.error('Unhandled Rejection at:', reason.stack || reason);
            this.server.close(() => process.exit(1));
        });

        process.on('uncaughtException', (error: Error) => {
            logger.error('Uncaught Exception:', error);
            process.exit(1);
        });
    }
}

// Solo iniciar la aplicación si no estamos en modo test
if (process.env.NODE_ENV !== 'test') {
    const app = new App();
    app.start();
}

export default App;