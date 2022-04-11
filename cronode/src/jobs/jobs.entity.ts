import { IsNotEmpty, IsString } from 'class-validator'
import { CommonEntity } from '../common/entities/common.entity'
import { Column, Entity, Index } from 'typeorm'
import { TaskEntity } from './tasks.entity'

type JobType = 'repeat' | 'time'

@Index('email', ['email'], { unique: true })
@Entity({ name: 'JOB' })
export class JobEntity extends CommonEntity {

    @IsString()
    @IsNotEmpty({ message: 'Job Name can not be null.' })
    @Column({ type: 'varchar', nullable: false })
    name: string

    @IsString()
    @IsNotEmpty()
    type: JobType

    tasks: Array<TaskEntity>
}
