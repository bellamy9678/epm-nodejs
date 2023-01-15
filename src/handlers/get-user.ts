import { Request, Response } from 'express';
import { store } from '../store';

export const getUser = (req: Request, res: Response) => {    
    try {
        const { userId } = req.params;
        const user = store.get(userId);

        if (!user) {
            throw new Error(`No user found for id ${userId}`)
        }

        res.status(200).send({ user });
      } catch (error: any) {
        console.log(error);
        res.status(500).send({ status: 500, error: error?.message });
      }
}
