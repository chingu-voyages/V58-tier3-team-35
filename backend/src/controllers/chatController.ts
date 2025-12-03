import { GoogleGenAI } from "@google/genai";
import { Request, Response } from "express";
import { PROJECT_FAQ_CONTEXT } from "@/utils/gemini";


export const createChatResponse = async(req: Request, res: Response): Promise<void> => {
    try {
        const {prompt} = req.body
        if (!prompt || typeof prompt !== "string") {
          res
            .status(400)
            .json({ error: "Prompt is required and must be a string" });
          return;
        }
        if (!process.env.GOOGLE_GEMINI_API_KEY) {
            res.status(500).json({"error happened": "API key not found"})
            return
        }
        
        const client = new GoogleGenAI({
            apiKey: process.env.GOOGLE_GEMINI_API_KEY as string
        })
        const response = await client.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `${PROJECT_FAQ_CONTEXT.concat(" ", prompt)}`,
        })
        //response
        console.log(response.candidates[0]?.content?.parts[0]?.text)
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: `Response not sent: ${error}`})
    }
}