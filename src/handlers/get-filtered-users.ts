import { Request, Response } from 'express';
import { store } from '../store';

export const getFilteredUsers = (req: Request, res: Response) => {
    try {
        const { pattern = '', limit = '' } = req.query;

        if (isNaN(+limit) || +limit <= 0) {
            res.status(400).send({ status: 400, error: 'Limit should be an valid number' });
        }

        const users = [...store.values()]
            .filter(user => user.login.includes(pattern))
            .slice(0, +limit)
            .sort((user1, user2) => user1.login.localeCompare(user2.login));

        res.status(200).send({ users });
    } catch (error: any) {
        console.log(error);
        res.status(500).send({ status: 500, error: 'Something went wrong' });
    }
};
