import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { Paciente } from '../entities/Patient';
import { logger } from '../utils/logger';

export const validatePaciente = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const paciente = plainToInstance(Paciente, req.body);
        const errors = await validate(paciente, {
            skipMissingProperties: false,
            whitelist: true,
            forbidNonWhitelisted: true,
            validationError: { target: false, value: false }
        });

        if (errors.length > 0) {
            const errorMessages = errors.flatMap(error => 
                Object.values(error.constraints || {})
            );
            
            logger.warn('Error de validación:', { errors: errorMessages });
            return res.status(400).json({
                status: 'error',
                message: 'Error de validación',
                errors: errorMessages
            });
        }

        // Si pasa la validación, asignamos el objeto validado al request
        req.body = paciente;
        next();
    } catch (error) {
        logger.error('Error en el middleware de validación:', error);
        next({
            status: 500,
            message: 'Error interno del servidor al validar los datos',
            error
        });
    }
};

// Middleware para manejar errores globalmente
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || 500;
    const message = err.message || 'Error interno del servidor';
    
    logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);
    
    res.status(status).json({
        status: 'error',
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};

// Middleware para rutas no encontradas
export const notFoundHandler = (req: Request, res: Response) => {
    res.status(404).json({
        status: 'error',
        message: `Ruta no encontrada: ${req.originalUrl}`
    });
};
