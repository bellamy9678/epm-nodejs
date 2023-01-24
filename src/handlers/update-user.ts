import { Request, Response } from 'express';
import { store } from '../store';
import { v4 as uuid } from 'uuid';
import { User } from '../types';
import { updateUserSchema } from './validation/schema';

export const updateUser = (req: Request, res: Response) => {
    try {
        const user: User = req.body;

        const { error } = updateUserSchema.validate(user);
        const { id = uuid() } = user;

        if (error?.details[0].message) {
            return res.status(400).send({ status: 400, error: error?.details[0].message });
        }

        console.log(`${store.has(id) ? 'Updating' : 'Generating'} user for id ${id}`);

        store.set(id, { ...user, id });

        const newUser = store.get(id);

        if (!newUser) {
            return res.status(404).send({ status: 404, error: `No user found for id ${id}` });
        }

        return  res.status(200).send({ user: { ...newUser, id } });
    } catch (error: any) {
        console.log(error);
        return res.status(500).send({ status: 500, error: 'Something went wrong' });
    }
};
