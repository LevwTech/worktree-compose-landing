const PORT_DATA = [
  { service: "postgres", main: 5434, wt1: 25435, wt2: 25436, wt3: 25437 },
  { service: "redis", main: 6380, wt1: 26381, wt2: 26382, wt3: 26383 },
  { service: "backend", main: 8000, wt1: 28001, wt2: 28002, wt3: 28003 },
  { service: "frontend", main: 5173, wt1: 25174, wt2: 25175, wt3: 25176 },
];

export function PortTable() {
  return (
    <div className="overflow-x-auto rounded-xl border border-gh-border">
      <table className="w-full text-sm font-mono">
        <thead>
          <tr className="bg-gh-card border-b-2 border-gh-border">
            <th className="px-6 py-4 text-left text-gh-muted font-semibold uppercase tracking-wider text-xs">
              Service
            </th>
            <th className="px-6 py-4 text-center text-gh-muted font-semibold uppercase tracking-wider text-xs">
              Main
            </th>
            <th className="px-6 py-4 text-center text-gh-blue font-semibold uppercase tracking-wider text-xs">
              Worktree 1
            </th>
            <th className="px-6 py-4 text-center text-gh-green font-semibold uppercase tracking-wider text-xs">
              Worktree 2
            </th>
            <th className="px-6 py-4 text-center text-gh-purple font-semibold uppercase tracking-wider text-xs">
              Worktree 3
            </th>
          </tr>
        </thead>
        <tbody>
          {PORT_DATA.map((row, i) => (
            <tr
              key={row.service}
              className={`border-b border-gh-border last:border-0 ${
                i % 2 === 0 ? "bg-gh-bg" : "bg-gh-card/50"
              }`}
            >
              <td className="px-6 py-3.5 font-semibold text-gh-text">
                {row.service}
              </td>
              <td className="px-6 py-3.5 text-center text-gh-muted">
                {row.main}
              </td>
              <td className="px-6 py-3.5 text-center text-gh-blue font-medium">
                {row.wt1}
              </td>
              <td className="px-6 py-3.5 text-center text-gh-green font-medium">
                {row.wt2}
              </td>
              <td className="px-6 py-3.5 text-center text-gh-purple font-medium">
                {row.wt3}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
