import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, BaseEntity } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

@Entity()
@ObjectType()
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: number;

    @CreateDateColumn()
    @Field(() => String)
    createdAt: Date;

    @UpdateDateColumn()
    @Field(() => String)
    updatedAt: Date;

    @DeleteDateColumn({ nullable: true })
    @Field(() => String, { nullable: true })
    deletedAt?: Date;

    @Column()
    @Field()
    title: string;

    @Column()
    @Field()
    description: string;

    @Column({ default: false })
    @Field()
    completed: boolean;
}
