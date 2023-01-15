import { Request, Response } from 'express';
import { store } from '../store';

export const deleteUser = (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).send({ status: 400, error: 'No user id provided' });
        }

        console.log(`Marking user for id ${userId} as deleted`);
        const user = store.get(userId);
        if (!user) {
            return res.status(404).send({ status: 404, error: `No user found for id ${userId}` });
        }
        store.set(userId, { ...user, isDeleted: true });

        return res.status(200).send(`User with id ${userId} successfully marked as deleted`);
    } catch (error: any) {
        console.log(error);
        return res.status(500).send({ status: 500, error: 'Something went wrong' });
    }
};
