import { Arg, ID, Int, Mutation, Query, Resolver } from 'type-graphql';
import { Task } from '../models/Task';

@Resolver(Task)
export class TaskResolver {
    @Query(() => [Task])
    async tasks(
        @Arg('id', { nullable: true }) id: number,
        @Arg('limit', { nullable: true }) limit: number = 50
    ): Promise<Task[]> {
        const realLimit = Math.min(50, limit);
        const qb = Task.getRepository()
            .createQueryBuilder('t')
            .orderBy('"createdAt"', 'DESC')
            .take(realLimit);

        return qb.getMany();
    }

    @Mutation(() => Task)
    async createTask(
        @Arg('title', () => String) title: string,
        @Arg('description', () => String) description: string
    ): Promise<Task> {
        const task = Task.getRepository().save({
            title,
            description,
        });

        console.log(task);

        return task;
    }

    @Mutation(() => Task)
    async updateTask(
        @Arg('id', () => ID) id: number,
        @Arg('title', () => String, { nullable: true }) title?: string,
        @Arg('description', () => String, { nullable: true }) description?: string,
        @Arg('completed', () => Boolean, { nullable: true }) completed?: boolean
    ): Promise<Task | null> {
        const task = await Task.getRepository().findOneBy({ id });
        if (!task) return null;

        Task.update({ id }, { title, description, completed });
        return task;
    }

    @Mutation(() => Boolean)
    async deleteTask(@Arg('id', () => ID) id: number): Promise<boolean> {
        await Task.getRepository().delete({ id });
        return true;
    }

    @Query(() => Task, { nullable: true })
    async findTask(@Arg('id', () => Int) id: number): Promise<Task | null> {
        const task = await Task.getRepository().findOneBy({ id });
        if (!task) return null;

        return task;
    }
}
