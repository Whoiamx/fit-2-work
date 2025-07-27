export const analyzePdf = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("http://localhost:3009/upload-pdf/pdf", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Error al enviar el PDF");
  }

  const data = await response.json();
  return data;
};
