export const analizePdfUseCase = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const resp = await fetch("http://localhost:3009/upload-pdf/pdf", {
      method: "POST",
      body: formData,
    });

    if (!resp.ok) {
      throw new Error("Error en la respuesta del servidor");
    }

    const { id } = (await resp.json()) as { id: string };
    return id;
  } catch (error) {
    throw new Error(
      `Error enviando el PDF: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};
