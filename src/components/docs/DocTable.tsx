interface DocTableProps {
  headers: string[];
  rows: string[][];
}

const DocTable = ({ headers, rows }: DocTableProps) => {
  return (
    <div className="my-4 overflow-x-auto rounded-lg border">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-secondary/50">
            {headers.map((h, i) => (
              <th key={i} className="px-4 py-3 text-left font-medium text-foreground whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t hover:bg-secondary/30 transition-colors">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-muted-foreground">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DocTable;
