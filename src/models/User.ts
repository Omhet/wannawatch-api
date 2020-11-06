import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Length } from 'class-validator';
import { Movie } from './Movie';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id!: number;

    @Column({ unique: true })
    @Length(3, 20)
    username!: string;

    @Column()
    password!: string;

    @ManyToMany(() => Movie)
    @JoinTable()
    movies!: Movie[];
}
