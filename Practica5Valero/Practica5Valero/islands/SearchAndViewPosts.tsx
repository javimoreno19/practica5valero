import { useSignal } from "@preact/signals";
import { useState } from "preact/hooks";

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

export default function SearchAndViewPosts({ posts }: Props) {
  const query = useSignal("");
  const viewGrid = useSignal(true);
  const [results, setResults] = useState(posts);

  const handleSearch = () => {
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(query.value.toLowerCase()) ||
      post.author.toLowerCase().includes(query.value.toLowerCase()) ||
      post.content.toLowerCase().includes(query.value.toLowerCase())
    );
    setResults(filtered);
  };

  return (
    <div class="container">
      <div class="header" style="margin-bottom: 1rem;">
        <input
          type="text"
          class="input-field"
          placeholder="Buscar por título, autor o contenido"
          value={query.value}
          onInput={(e) => (query.value = (e.target as HTMLInputElement).value)}
        />
        <button onClick={handleSearch} class="search-button">Buscar</button>
        <button onClick={() => (viewGrid.value = !viewGrid.value)} class="toggle-button">
          {viewGrid.value ? "Vista lista" : "Vista cuadrícula"}
        </button>
      </div>

      {results.length === 0 ? (
        <p class="no-results">No se encontraron resultados.</p>
      ) : (
        <div class={viewGrid.value ? "posts-grid" : "posts-list"}>
          {results.map((post) => (
            <div key={post._id} class="post-card">
              {viewGrid.value && post.cover?.icon && (
                <img src={post.cover.icon} alt="cover" class="post-cover" />
              )}
              <div class="post-content">
                <h3 class="post-title">{post.title}</h3>
                <p class="post-author">Por {post.author}</p>
                {!viewGrid.value && (
                  <p class="post-snippet">{post.content.slice(0, 100)}...</p>
                )}
                <div class="post-meta">
                  <span>❤️ {post.likes} likes</span>
                  <span>💬 {post.comments.length} comentarios</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
