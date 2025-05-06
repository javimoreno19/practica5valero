import { Handlers, PageProps } from "$fresh/server.ts";
import LikeButton from "../../components/LikeButton.tsx";

type Comment = {
  id: string;
  content: string;
};

type Post = {
  id: string;
  title: string;
  content: string;
  author: string;
  likes: number;
  comments?: Comment[];
};

export const handler: Handlers = {
  async GET(_req, ctx) {
    const { id } = ctx.params;
    const res = await fetch(`https://back-p5-y0e1.onrender.com/api/post/${id}`);

    if (!res.ok) {
      return ctx.renderNotFound();
    }

    const post: Post = await res.json();
    return ctx.render({ post });
  },
};

export default function PostDetail({ data }: PageProps<{ post: Post }>) {
  const { post } = data;

  return (
    <div class="max-w-2xl mx-auto p-4 space-y-4">
      <h1 class="text-3xl font-bold">{post.title}</h1>
      <p class="text-gray-600">Autor: {post.author}</p>
      <div class="prose">{post.content}</div>

      <LikeButton postId={post.id} initialLikes={post.likes} />

      <section class="mt-6">
        <h2 class="text-xl font-semibold">Comentarios</h2>
        {post.comments && post.comments.length > 0 ? (
          <ul class="list-disc ml-5 space-y-2">
            {post.comments.map((c) => (
              <li key={c.id}>{c.content}</li>
            ))}
          </ul>
        ) : (
          <p>No hay comentarios aún.</p>
        )}
      </section>
    </div>
  );
}
