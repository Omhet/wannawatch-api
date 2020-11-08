import { Column, Entity, PrimaryColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Movie {
    @PrimaryColumn()
    id!: number;

    @Column()
    title!: string;

    @Column()
    poster!: string;

    @Column('decimal')
    rate!: number;

    users!: User[];
}
