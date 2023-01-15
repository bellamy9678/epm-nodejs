import express from 'express';
import { getUser } from './handlers/get-user';
import { updateUser } from './handlers/update-user';
import { deleteUser } from './handlers/delete-user';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/user/:userId?', getUser);
app.put('/user', updateUser);
app.delete('/user', deleteUser);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
