const DataTable = ({ columns, data, keyField = 'id', wrapperClassName = '', tableClassName = '' }) => (
  <div className={`table-wrapper ${wrapperClassName}`.trim()}>
    <table className={tableClassName}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key || col.accessor}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={columns.length}>No records found</td>
          </tr>
        ) : (
          data.map((row) => (
            <tr key={row[keyField] || row.id}>
              {columns.map((col) => (
                <td key={col.key || col.accessor}>
                  {col.render ? col.render(row) : row[col.accessor]}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);

export default DataTable;


