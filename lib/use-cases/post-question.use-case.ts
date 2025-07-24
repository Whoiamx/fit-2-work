import { ResponseAssistance } from "@/app/interfaces/assistance.response";

export const postQuestionUseCase = async (
  threadId: string,
  question: string
) => {
  try {
    const resp = await fetch(
      "http://localhost:3009/fito-assistant/user-question",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ threadId, question }),
      }
    );

    if (!resp.ok) {
      throw new Error(`Error: ${resp.statusText}`);
    }

    const data = (await resp.json()) as ResponseAssistance[];
    return data;
  } catch (error) {
    console.log(error);
  }
};
