export const fileUpload = async (file) => {
  if (!file) throw new Error("Archivos no encontrados");
  const cloudUrl = "https://api.cloudinary.com/v1_1/carlosdaniel/upload";

  const formData = new FormData();
  formData.append("upload_preset", "react-journal");
  formData.append("file", file);

  try {
    const res = await fetch(cloudUrl, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("No se pudo subir la imagen");
    const cloudRes = await res.json();

    return cloudRes.secure_url;
  } catch (e) {
    console.log(e);
    throw new Error("Otro nuevo error", e.message);
  }
};
