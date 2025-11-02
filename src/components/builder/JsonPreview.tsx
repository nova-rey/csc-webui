export default function JsonPreview({ json }: { json: unknown }) {
  return (
    <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto max-h-[40vh]">
      {JSON.stringify(json, null, 2)}
    </pre>
  );
}
