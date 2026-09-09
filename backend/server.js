import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';

const app = express();
const port = Number(process.env.PORT || 3000);
const allowedOrigin = process.env.ALLOWED_ORIGIN || '*';
const model = process.env.OPENAI_MODEL || 'gpt-5.6-luna';

if (!process.env.OPENAI_API_KEY) {
  console.warn('WARNING: OPENAI_API_KEY is not set. The server will start, but AI requests will fail.');
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(cors({ origin: allowedOrigin === '*' ? true : allowedOrigin }));
app.use(express.json({ limit: '32kb' }));

function clean(value, max) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

async function generate(instructions, input) {
  const response = await openai.responses.create({
    model,
    instructions,
    input,
    max_output_tokens: 1200
  });
  return response.output_text || 'No answer was returned.';
}

app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'StudyMate AI backend', model });
});

app.post('/api/ask', async (req, res) => {
  const question = clean(req.body?.question, 4000);
  if (!question) return res.status(400).json({ error: 'Question is required.' });

  try {
    const answer = await generate(
      'You are StudyMate AI, a friendly educational tutor. Explain concepts clearly for a student. Use simple language, short sections, examples, and step-by-step reasoning when useful. Do not pretend to know current facts if uncertain. Never provide harmful instructions.',
      question
    );
    res.json({ answer });
  } catch (error) {
    console.error('ask error:', error?.message || error);
    res.status(500).json({ error: 'AI request failed.' });
  }
});

app.post('/api/notes', async (req, res) => {
  const topic = clean(req.body?.topic, 1000);
  if (!topic) return res.status(400).json({ error: 'Topic is required.' });

  try {
    const notes = await generate(
      'You are StudyMate AI Notes. Create concise, accurate revision notes for a student. Include: definition, key concepts, important facts/formulas if relevant, one simple example, and a quick revision checklist. Use plain text with readable headings and bullets. Do not use markdown tables.',
      `Create revision notes for this topic: ${topic}`
    );
    res.json({ notes });
  } catch (error) {
    console.error('notes error:', error?.message || error);
    res.status(500).json({ error: 'AI request failed.' });
  }
});

app.listen(port, () => {
  console.log(`StudyMate AI backend listening on port ${port}`);
});
