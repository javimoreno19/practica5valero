import { useSignal } from "@preact/signals";

export default function CreatePost() {
  const title = useSignal("");
  const cover = useSignal("");
  const content = useSignal("");
  const author = useSignal("");
  const loading = useSignal(false);
  const message = useSignal("");

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    loading.value = true;
    const res = await fetch("https://back-p5-y0e1.onrender.com/api/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title.value,
        cover: cover.value,
        content: content.value,
        author: author.value,
      }),
    });

    if (res.ok) {
      const json = await res.json();
      message.value = `Creado con ID ${json.id}`;
    } else {
      message.value = "Error al crear el post";
    }
    loading.value = false;
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title.value} onInput={(e) => title.value = e.currentTarget.value} placeholder="Título" required />
      <input value={cover.value} onInput={(e) => cover.value = e.currentTarget.value} placeholder="Cover URL" required />
      <textarea value={content.value} onInput={(e) => content.value = e.currentTarget.value} required />
      <input value={author.value} onInput={(e) => author.value = e.currentTarget.value} placeholder="Autor" required />
      <button type="submit" disabled={loading.value}>Crear</button>
      <p>{message.value}</p>
    </form>
  );
}
