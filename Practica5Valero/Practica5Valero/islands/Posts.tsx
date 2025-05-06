
import { useSignal } from "@preact/signals";

interface Post {
  _id: string;
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

interface Props {
  posts: Post[];
}

export default function Posts({ posts }: Props) {
  const viewGrid = useSignal(true);

  return (
    <div>
      <div class="header">
        <h2 class="text-2xl font-semibold text-gray-800">Listado de posts</h2>
        <button class="toggle-button" onClick={() => (viewGrid.value = !viewGrid.value)}>
          Cambiar a vista {viewGrid.value ? "lista" : "cuadrícula"}
        </button>
      </div>

      <div class={viewGrid.value ? "posts-grid" : "posts-list"}>
        {Array.isArray(posts) && posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} class="post-card">
              {viewGrid.value && post.cover?.icon && (
                <img src={post.cover.icon} alt="Cover image" class="post-cover" />
              )}
              <div class="post-content">
                <h3 class="post-title">{post.title}</h3>
                <p class="post-author">Por {post.author}</p>
                {!viewGrid.value && (
                  <p class="post-snippet">
                    {post.content.slice(0, 100)}...
                  </p>
                )}
                
              </div>
            </div>
          ))
        ) : (
          <p>No hay posts disponibles.</p>
        )}
      </div>
    </div>
  );
}
