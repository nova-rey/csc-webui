export default function ErrorList({ title, items }: { title: string; items: string[] }) {
  if (!items.length) return null;
  return (
    <div className="border border-red-200 bg-red-50 rounded p-2 text-sm">
      <div className="font-semibold text-red-700 mb-1">{title}</div>
      <ul className="list-disc list-inside text-red-700">
        {items.map((e, i) => (
          <li key={i}>{e}</li>
        ))}
      </ul>
    </div>
  );
}
