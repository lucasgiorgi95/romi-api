import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { IsString, IsInt, IsArray, Min, Max, IsNotEmpty } from "class-validator";

/**
 * Entidad que representa a un Paciente en el sistema
 */
@Entity('pacientes')
export class Paciente {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    @IsString({ message: 'El nombre debe ser un texto' })
    @IsNotEmpty({ message: 'El nombre es requerido' })
    nombre: string;

    @Column("int")
    @IsInt({ message: 'La edad debe ser un número entero' })
    @Min(0, { message: 'La edad no puede ser negativa' })
    @Max(120, { message: 'La edad no puede ser mayor a 120' })
    edad: number;

    @Column("simple-array")
    @IsArray({ message: 'Los síntomas deben ser un arreglo' })
    @IsString({ each: true, message: 'Cada síntoma debe ser un texto' })
    @IsNotEmpty({ each: true, message: 'Los síntomas no pueden estar vacíos' })
    sintomas: string[];

    @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    fechaCreacion: Date;

    @UpdateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    fechaActualizacion: Date;

    /**
     * Crea una instancia de Paciente con los datos proporcionados
     * @param data Datos del paciente (opcional)
     */
    constructor(data?: Partial<Paciente>) {
        if (data) {
            Object.assign(this, data);
        }
    }
}