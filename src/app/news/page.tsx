"use client";
import React, { useState, useEffect } from 'react';
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { Navbar } from '../components/Navbar';

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";

export default function News() {
  const [prompt, setPrompt] = useState<string>(
    "generate 1 latest trending agriculture sector news of india.......it should contain a heading which will give the gist of news .....along with that there should be a discription of 5 to 6 lines about the news .....aso there should be source mentioned along with the link attached to it .....Add one line spacing between the heading and descripion of news and also in the source and description."
  );
  const [xyz, setXyz] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [heading, setHeading] = useState("");

  async function runChat(prompt: string) {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
      temperature: 0.9,
      topK: 0,
      topP: 1,
      maxOutputTokens: 2048,
    };

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];

    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [],
    });

    const result = await chat.sendMessage(prompt);
    const response = result.response;
    const text = await response.text();
    setXyz(text);
    console.log(text);
  }

  useEffect(() => {
    if (xyz) {
      fetchTransactions();
    }
  }, [xyz]);

  function fetchTransactions() {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const urlMatch = xyz.match(urlRegex);
    if (urlMatch) {
      setUrl(urlMatch[0]);
      setDescription(xyz.replace(urlRegex, ''));
      
      // Extract heading
      const [headingText, ...remainingText] = xyz.split('\n'); // Assuming heading ends with a newline character
      setHeading(headingText);
    }
  }

  return (
    <div>
      <Navbar/>
      <button onClick={() => runChat(prompt)}>Generate News</button>
      {description && (
        <div>
          <h1>{heading}</h1>
          <p>{description}</p>
          <a href={url}>Read more</a>
        </div>
      )}
    </div>
  );
}
