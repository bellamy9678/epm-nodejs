export type User = {
    id: string;
    login: string;
    password: string;
    isDeleted: boolean;
    age: number;
};

export type UserData = Omit<User, 'id'>
