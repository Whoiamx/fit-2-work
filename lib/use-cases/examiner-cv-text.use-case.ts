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

    const formatResponseToHTML = (input: string): string => {
      let formatted = input;

      formatted = formatted.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

      formatted = formatted.replace(
        /^(\d+)\.\s*(.+)$/gm,
        "<p><strong>$1.</strong> $2</p>"
      );

      const lines = formatted.split("\n");
      let inList = false;
      let resultLines: string[] = [];
      lines.forEach((line) => {
        if (/^\s*-\s+/.test(line)) {
          if (!inList) {
            inList = true;
            resultLines.push("<ul>");
          }
          const listItem = line.replace(/^\s*-\s+/, "");
          resultLines.push(`<li>${listItem}</li>`);
        } else {
          if (inList) {
            inList = false;
            resultLines.push("</ul>");
          }

          if (line.trim() === "") {
          } else {
            resultLines.push(`<p>${line.trim()}</p>`);
          }
        }
      });
      if (inList) {
        resultLines.push("</ul>");
      }
      formatted = resultLines.join("\n");

      return formatted;
    };

    const formattedText = formatResponseToHTML(data.devolutionAi.trim());

    return formattedText;
  } catch (error) {
    throw new Error(
      `Error en examinerCvUseCase: ${
        error instanceof Error ? error.message : "Error desconocido"
      }`
    );
  }
};
