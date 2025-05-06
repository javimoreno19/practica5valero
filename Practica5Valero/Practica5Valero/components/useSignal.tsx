import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";

export default function Home({ data }: { data: { posts: Post[] } }) {
  const gridView = useSignal(false);

  return (
    <div>
      <button onClick={() => gridView.value = !gridView.value}>
        {gridView.value ? "Vista Lista" : "Vista Cuadrícula"}
      </button>

      <div class={gridView.value ? "grid grid-cols-2 gap-4" : "list"}>
        {data.posts.map((post) => (
          <div class="card">
            {gridView.value && <img src={post.cover} alt="cover" />}
            <h2>{post.title}</h2>
            <p>{post.author}</p>
            {!gridView.value && <p>{post.summary}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
