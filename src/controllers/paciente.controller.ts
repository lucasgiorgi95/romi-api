import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../db/data-source';
import { Paciente } from '../entities/Patient';
import { logger } from '../utils/logger';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

interface IPacienteRequest extends Request {
    body: {
        nombre: string;
        edad: number;
        sintomas: string[];
    };
}

export class PacienteController {
    /**
     * Obtiene todos los pacientes registrados
     */
    static async getAllPacientes(req: Request, res: Response, next: NextFunction) {
        try {
            const pacientes = await AppDataSource.manager.find(Paciente, {
                order: { fechaCreacion: 'DESC' }
            });
            return res.json(pacientes);
        } catch (error) {
            logger.error('Error al obtener pacientes:', error);
            return next({
                status: 500,
                message: 'Error interno del servidor al obtener pacientes',
                error
            });
        }
    }

    /**
     * Crea un nuevo paciente
     */
    static async createPaciente(req: IPacienteRequest, res: Response, next: NextFunction) {
        try {
            const paciente = plainToClass(Paciente, req.body);
            const errors = await validate(paciente);
            if (errors.length > 0) {
                return res.status(400).json({ message: 'Error de validación', errors });
            }
            const pacienteGuardado = await AppDataSource.manager.save(paciente);
            return res.status(201).json(pacienteGuardado);
        } catch (error) {
            logger.error('Error al crear paciente:', error);
            next(error);
        }
    }

    // Obtener un paciente por ID
    static async getPacienteById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            const paciente = await AppDataSource.manager.findOneBy(Paciente, { id });
            
            if (!paciente) {
                return res.status(404).json({ message: 'Paciente no encontrado' });
            }
            
            res.json(paciente);
        } catch (error) {
            logger.error('Error al obtener paciente:', error);
            next(error);
        }
    }

    // Actualizar un paciente
    static async updatePaciente(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            const paciente = await AppDataSource.manager.findOneBy(Paciente, { id });
            
            if (!paciente) {
                return res.status(404).json({ message: 'Paciente no encontrado' });
            }
            
            Object.assign(paciente, req.body);
            const pacienteActualizado = await AppDataSource.manager.save(paciente);
            
            res.json(pacienteActualizado);
        } catch (error) {
            logger.error('Error al actualizar paciente:', error);
            next(error);
        }
    }

    // Eliminar un paciente
    static async deletePaciente(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            const paciente = await AppDataSource.manager.findOneBy(Paciente, { id });
            
            if (!paciente) {
                return res.status(404).json({ message: 'Paciente no encontrado' });
            }
            
            await AppDataSource.manager.remove(paciente);
            res.status(204).send();
        } catch (error) {
            logger.error('Error al eliminar paciente:', error);
            next(error);
        }
    }
}