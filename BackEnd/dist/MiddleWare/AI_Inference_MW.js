import { OpenAI } from "openai";
export async function queryHF() {
    const client = new OpenAI({
        baseURL: "https://router.huggingface.co/v1",
        apiKey: process.env.HF_TOKEN_ATS,
    });
    const chatCompletion = await client.chat.completions.create({
        model: "google/gemma-2-9b-it:featherless-ai",
        messages: [
            {
                role: "user",
                content: "What is the capital of Germany?",
            },
        ],
    });
    console.log(chatCompletion.choices);
}
