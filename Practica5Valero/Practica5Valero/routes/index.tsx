import { Handlers, PageProps } from "$fresh/server.ts";
import SearchAndViewPosts from "../islands/SearchAndViewPosts.tsx";


interface Post {   _id: string;
  title: string;
  content: string;
  author: string;
  cover?: {
    icon: string;
    text: string;
  };
  likes: number;
  comments: Array<{
    author: string;
    content: string;
    createdAt: string;
    _id: string;
  }>;
  createdAt: string;
  updatedAt: string;
 }

interface Practica5 {
  data: {
    posts: Post[];
    total: number;
  };
}

export const handler: Handlers<Practica5 | null> = {
  async GET(_, ctx) {
    const res = await fetch("https://back-p5-y0e1.onrender.com/api/posts/");
    if (!res.ok) return ctx.render(null);
    const data: Practica5 = await res.json();
    return ctx.render(data);
  },
};

export default function Home({ data }: PageProps<Practica5 | null>) {
  if (!data) {
    return (
      <div class="container mx-auto p-4">
        <h1 class="text-xl text-red-600">Error: no se pudo obtener los datos del backend.</h1>
      </div>
    );
  }

  return (
    <div class="container mx-auto p-4">
      <h1 class="text-3xl font-bold mb-4">Posts</h1>
      <SearchAndViewPosts posts={data.data.posts} />
    </div>
  );
}
