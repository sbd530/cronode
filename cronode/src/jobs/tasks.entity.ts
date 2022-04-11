import { IsNotEmpty, IsString } from 'class-validator'
import { CommonEntity } from '../common/entities/common.entity'
import { Column, Entity, Index } from 'typeorm'
import { Command } from './vos/commands.vo'

@Entity({ name: 'TASK' })
export class TaskEntity extends CommonEntity {

    @IsString()
    @IsNotEmpty()
    @Column({ type: 'varchar', nullable: false })
    command: Command

    @IsString()
    argument: string
}
