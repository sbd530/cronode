import { IsBoolean, IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator'
import { CommonEntity } from '../common/entities/common.entity'
import { Column, Entity, Index } from 'typeorm'
import { Exclude } from 'class-transformer'

type JobType = 'repeat' | 'time'

@Index('email', ['email'], { unique: true })
@Entity({
    name: 'JOB',
}) // USER : 테이블 명
export class JobEntity extends CommonEntity {

    @IsString()
    @IsNotEmpty({ message: 'Job Name can not be null.' })
    @Column({ type: 'varchar', nullable: false })
    name: string

    type: JobType

    @IsBoolean()
    @Column({ type: 'boolean', default: false })
    isAdmin: boolean
}
