export const examinerCvUseCase = async (text: string): Promise<string> => {
  try {
    const response = await fetch(
      "https://backend-fit2work-9bf8a9655cfe.herokuapp.com/gpt/examiner-cv",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: text }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status} - ${errorText}`);
    }

    const data = (await response.json()) as { devolutionAi?: string };

    if (!data.devolutionAi) {
      throw new Error("La respuesta no contiene 'devolutionAi'");
    }

    // Función para mejorar el formato del texto recibido
    const fixTextFormatting = (input: string): string => {
      return input
        .replace(/###/g, "\n\n###")
        .replace(/(\d+)\.\s*/g, "\n$1. ")
        .replace(/\s{2,}/g, " ")
        .trim();
    };

    const formattedText = fixTextFormatting(data.devolutionAi);

    console.log(formattedText);
    return formattedText;
  } catch (error) {
    // Propaga el error para manejarlo en el frontend si es necesario
    throw new Error(
      `Error en examinerCvUseCase: ${
        error instanceof Error ? error.message : "Error desconocido"
      }`
    );
  }
};
