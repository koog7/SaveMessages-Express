import express from 'express';
import messageRouter from "./routers/message";

const app = express();
const port = 8000;

app.use(express.json())
app.use('/messages', messageRouter)
app.listen(port, () => {
    console.log('Server starter : http://127.0.0.1:' + port);
});

