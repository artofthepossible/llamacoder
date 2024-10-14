<a href="https://www.llamacoder.io">
  <img alt="Llama Coder" src="./public/og-image.png">
  <h1 align="center">Llama Coder</h1>
</a>

<p align="center">
  An open source Claude Artifacts – generate small apps with one prompt. Powered by Llama 3 405B & Together.ai.
</p>

## Tech stack

- [Llama 3.1 405B](https://ai.meta.com/blog/meta-llama-3-1/) from Meta for the LLM
- [Together AI](https://dub.sh/together-ai/?utm_source=example-app&utm_medium=llamacoder&utm_campaign=llamacoder-app-signup) for LLM inference
- [Sandpack](https://sandpack.codesandbox.io/) for the code sandbox
- Next.js app router with Tailwind
- Helicone for observability
- Plausible for website analytics

## Cloning & running

1. Clone the repo: `git clone https://github.com/artifthepossible/llamacoder`
2. Create a `.env` file and add your [Together AI API key](https://dub.sh/together-ai/?utm_source=example-app&utm_medium=llamacoder&utm_campaign=llamacoder-app-signup): `TOGETHER_API_KEY=`

3a. Run `npm install` and `npm run dev` to install dependencies and run locally

Using Docker File
3b. docker build -t llamacoder-app:v1 .
3c.docker run -p 3000:3000 llamacoder-app:v1
Launch Application: http://localhost:3000

Using Docker Compose
3d. docker compose up --build
http://localhost:3000
Launch Application: http://localhost:3000




