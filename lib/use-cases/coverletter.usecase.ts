export const coverLetterGenerator = async (prompt: string) => {
  const response = await fetch(
    "https://backend-fit2work-9bf8a9655cfe.herokuapp.com/gpt/cover-letter",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    }
  );

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return await response.json();
};
