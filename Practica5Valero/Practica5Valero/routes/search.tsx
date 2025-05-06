import { useSignal } from "@preact/signals";
import { useEffect, useState } from "preact/hooks";

export default function Search() {
  const searchTerm = useSignal("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (searchTerm.value.trim()) {
      fetch(`https://back-p5-y0e1.onrender.com/api/post?search=${searchTerm.value}`)
        .then((res) => res.json())
        .then(setResults);
    } else {
      setResults([]);
    }
  }, [searchTerm.value]);

  return (
    <div>
      <input
        value={searchTerm.value}
        onInput={(e) => searchTerm.value = e.currentTarget.value}
        placeholder="Buscar posts..."
      />
      <ul>
        {results.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.author}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
