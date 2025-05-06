interface Post {
    id: string;
    title: string;
    summary?: string;
    content: string;
    author: string;
    cover?: string;
  }
  
  interface Props {
    posts: Post[];
  }
  
  export default function PostList({ posts }: Props) {
    if (!Array.isArray(posts)) {
      console.error("Posts no es un array:", posts);
      return <p>Error: No hay posts válidos</p>;
    }
  
    return (
      <div>
        {posts.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.author}</p>
          </div>
        ))}
      </div>
    );
  }
  