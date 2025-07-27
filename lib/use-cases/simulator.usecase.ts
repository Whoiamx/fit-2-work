export const simulatorInterviewUseCase = async (prompt: string) => {
  try {
    const response = await fetch(
      `https://backend-fit2work-9bf8a9655cfe.herokuapp.com/gpt/simulator-interview`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in simulatorInterviewUseCase:", error);
    throw error;
  }
};
