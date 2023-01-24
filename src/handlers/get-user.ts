import { Request, Response } from 'express';
import { store } from '../store';

export const getUser = (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).send({ status: 400, error: 'No user id provided' });
        }

        console.log(`Getting user for id ${userId}`);
        const user = store.get(userId);

        if (!user) {
            return res.status(404).send({ status: 404, error: `No user found for id ${userId}` });
        }

        return res.status(200).send({ user });
    } catch (error: any) {
        console.log(error);
        return res.status(500).send({ status: 500, error: 'Something went wrong' });
    }
};
