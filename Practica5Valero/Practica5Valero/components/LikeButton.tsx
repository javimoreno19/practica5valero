import { useSignal } from "@preact/signals";

export default function LikeButton({ postId, initialLikes }: { postId: string; initialLikes: number }) {
  const liked = useSignal(false);
  const likes = useSignal(initialLikes);

  const handleLike = async () => {
    const res = await fetch(`https://back-p5-y0e1.onrender.com/api/post/${postId}/like`, {
      method: "POST",
    });
    if (res.ok) {
      liked.value = true;
      likes.value += 1;
    }
  };

  return (
    <button onClick={handleLike} disabled={liked.value}>
      👍 Me gusta ({likes.value})
    </button>
  );
}
