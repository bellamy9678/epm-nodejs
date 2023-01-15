import { Request, Response } from 'express';
import { store } from '../store';
import { v4 as uuid } from 'uuid';
import { User } from '../types';

export const updateUser = (req: Request, res: Response) => {
    try {
        const user: User = req.body;
        const { id = uuid() } = user;

        console.log(`${store.has(id) ? 'Updating' : 'Generating'} user for id ${id}`);

        store.set(id, { ...user, id });

        const newUser = store.get(id);

        if (!newUser) {
            res.status(404).send({ status: 404, error: `No user found for id ${id}` });
        }

        res.status(200).send({ user: { ...newUser, id } });
    } catch (error: any) {
        console.log(error);
        res.status(500).send({ status: 500, error: 'Something went wrong' });
    }
};
