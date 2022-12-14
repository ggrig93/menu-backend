import { v4 as uuid } from 'uuid';

export const users = [
    {
        id: uuid(),
        email: 'admin@gmail.com',
        name: 'Admin',
        password: 'admin'
    }
]