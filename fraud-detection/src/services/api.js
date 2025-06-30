const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

export async function uploadCSV(file) {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${BASE_URL}/api/upload`, {
        method: "POST",
        body: formData,
    });

    if (!res.ok) throw new Error("Upload failed");
    return await res.json();
}
