import express from 'express';
import mongoose from 'mongoose';
import apiRoutes from './routes/api';

const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());
app.use('/api', apiRoutes);

async function start() {
  await mongoose.connect('mongodb://127.0.0.1:27017/octofit_db');
  app.listen(port, () => {
    console.log(`Backend listening on port ${port}`);
    console.log(`API base URL: ${baseUrl}`);
  });
}

start().catch((error) => {
  console.error('Failed to start backend:', error);
  process.exit(1);
});
