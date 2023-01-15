import { Request, Response } from 'express';
import { store } from '../store';
import { v4 as uuid } from 'uuid';
import { UserData } from '../types';

export const updateUser = (req: Request, res: Response) => {
    try {
        const { userId = uuid() } = req.params;
        const user: UserData = req.body;

        console.log(`${store.has(userId) ? 'Updating' : 'Generating'} user for id ${userId}`);
        
        store.set(userId, user);

        const newUser = store.get(userId);
        if (!newUser) {
            throw new Error(`Can not create/update user`)
        }

        res.status(200).send({ user: { ...newUser, id: userId } });
    } catch (error: any) {
        console.log(error);
        res.status(500).send({ status: 500, error: error?.message });
    }
}
