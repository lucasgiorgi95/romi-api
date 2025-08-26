import { Router } from 'express';
import { PacienteController } from '../controllers/paciente.controller';
import { validatePaciente } from '../middleware/validation.middleware';

const router = Router();

/**
 * @swagger
 * /api/pacientes:
 *   get:
 *     summary: Obtiene todos los pacientes
 *     responses:
 *       200:
 *         description: Lista de pacientes
 */
router.get('/pacientes', PacienteController.getAllPacientes);

/**
 * @swagger
 * /api/pacientes:
 *   post:
 *     summary: Crea un nuevo paciente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Paciente'
 *     responses:
 *       201:
 *         description: Paciente creado exitosamente
 */
router.post('/pacientes', validatePaciente, PacienteController.createPaciente);

/**
 * @swagger
 * /api/pacientes/{id}:
 *   get:
 *     summary: Obtiene un paciente por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Datos del paciente
 *       404:
 *         description: Paciente no encontrado
 */
router.get('/pacientes/:id', PacienteController.getPacienteById);

/**
 * @swagger
 * /api/pacientes/{id}:
 *   put:
 *     summary: Actualiza un paciente existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Paciente'
 *     responses:
 *       200:
 *         description: Paciente actualizado
 */
router.put('/pacientes/:id', validatePaciente, PacienteController.updatePaciente);

/**
 * @swagger
 * /api/pacientes/{id}:
 *   delete:
 *     summary: Elimina un paciente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Paciente eliminado
 *       404:
 *         description: Paciente no encontrado
 */
router.delete('/pacientes/:id', PacienteController.deletePaciente);

export default router;