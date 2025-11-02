interface Props {
  status: string;
}

export default function RunStatusBadge({ status }: Props) {
  const color =
    status === "complete"
      ? "bg-green-200 text-green-800"
      : status === "running"
      ? "bg-blue-200 text-blue-800"
      : status === "pending"
      ? "bg-yellow-200 text-yellow-800"
      : "bg-gray-200 text-gray-800";

  return <span className={`px-2 py-1 rounded text-xs font-medium ${color}`}>{status}</span>;
}
