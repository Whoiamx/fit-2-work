export const examinerCvUseCase = async (text: string) => {
  try {
    const resp = await fetch(
      "https://backend-fit2work-9bf8a9655cfe.herokuapp.com/gpt/examiner-cv",

      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ prompt: text }),
      }
    );

    const { devolutionAi } = (await resp.json()) as { devolutionAi: string };
    console.log(resp);

    return devolutionAi;
  } catch (error) {
    throw new Error(
      `Error creating thread: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};
