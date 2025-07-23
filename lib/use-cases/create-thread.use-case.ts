export const createThreadUseCase = async () => {
  try {
    const resp = await fetch(
      "http://localhost:3009/fito-assistant/create-thread",
      {
        method: "POST",
      }
    );

    const { id } = (await resp.json()) as { id: string };
    console.log("Este es el id", id);
    return id;
  } catch (error) {
    throw new Error(
      `Error creating thread: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};
