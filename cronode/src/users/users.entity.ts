import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator'
import { CommonEntity } from '../common/entities/common.entity'
import { Column, Entity, Index } from 'typeorm'
import { Exclude } from 'class-transformer'

@Index('email', ['email'], { unique: true })
@Entity({
  name: 'USER',
}) // USER : 테이블 명
export class UserEntity extends CommonEntity {
  @IsEmail({}, { message: '올바른 이메일을 작성해주세요.' })
  @IsNotEmpty({ message: '이메일을 작성해주세요.' })
  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string

  @IsString()
  @IsNotEmpty({ message: '이름을 작성해주세요.' })
  @Column({ type: 'varchar', nullable: false })
  username: string

  //* main.ts에서 인터셉터 추가 (ClassSerializerInterceptor)
  //* DTO 생성시 제외하고 생성
  @Exclude()
  @Column({ type: 'varchar', nullable: false })
  password: string

  @IsBoolean()
  @Column({ type: 'boolean', default: false })
  isAdmin: boolean
}
