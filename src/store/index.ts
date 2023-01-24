import { User } from '../types';

export const store = new Map();

const mockUser: User = {
    id: '1234',
    login: 'mockLogin',
    password: 'mockPassword1',
    isDeleted: false,
    age: 25
};

store.set('1234', mockUser);
