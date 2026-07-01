import express from 'express';
import apiRoutes from './routes/api';
import { connectDatabase } from './database';

const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const codespaceUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());
app.use('/api', apiRoutes);

async function start() {
  await connectDatabase();
  app.listen(port, () => {
    console.log(`Backend listening on port ${port}`);
    console.log(`Codespace URL: ${codespaceUrl}`);
  });
}

start().catch((error) => {
  console.error('Failed to start backend:', error);
  process.exit(1);
});
