import { useEffect, useState } from "react";

export default function ManifestPreview({ url }: { url: string }) {
  const [text, setText] = useState<string>("(loading…)");

  useEffect(() => {
    let alive = true;
    setText("(loading…)");
    fetch(url)
      .then((response) => response.text())
      .then((payload) => {
        if (!alive) return;
        setText(payload);
      })
      .catch((error) => {
        if (!alive) return;
        const message = error instanceof Error ? error.message : String(error);
        setText(message);
      });
    return () => {
      alive = false;
    };
  }, [url]);

  return (
    <pre className="bg-gray-50 p-2 rounded overflow-auto max-h-64 text-xs whitespace-pre-wrap break-words">
      {text}
    </pre>
  );
}
