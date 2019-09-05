import express from 'express';
import path from 'path';

const app = express();
const PUBLIC_PATH = path.join(__dirname, '../dist');

app.use('/installer', express.static(PUBLIC_PATH));
export default app;
