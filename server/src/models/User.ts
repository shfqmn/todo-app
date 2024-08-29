import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, Field, Int } from 'type-graphql';

@Entity()
@ObjectType()
export class User {
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;

    @Column()
    @Field(() => String)
    name: string;

    @Column()
    @Field(() => String)
    email: string;

    @Column()
    @Field(() => String)
    password: string;
}
