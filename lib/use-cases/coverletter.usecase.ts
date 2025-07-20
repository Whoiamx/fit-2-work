export const coverLetterGenerator = async (prompt: string) => {
  const response = await fetch("http://localhost:3009/gpt/cover-letter", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return await response.json();
};
