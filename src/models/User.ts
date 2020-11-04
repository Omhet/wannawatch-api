import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Length } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @Column({ unique: true })
  @Length(3, 20)
  username!: string;

  @Column()
  password!: string;
}
