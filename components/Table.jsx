import React from 'react';
import { useTable } from 'react-table';
import googleBooks from '../public/google-books';
import Image from 'next/image';

const ImageCellRenderer = props => {
  const src = props.column.accessor(props.row.original)

  if (!src) {
    return null;
  }
  return (
    <div style={{height: 80, position: 'relative'}}>
      <Image src={src} layout="fill" objectFit="contain" />
    </div>
  )
}

const TitleCellRenderer = props => {
  const { title, subtitle, description } = props.row.original

  return (
    <div style={{maxWidth: 500}}>
      <p style={{marginBottom: 0}}>
        {title}
        {subtitle && (
          <>
            : <span className="text-muted">{subtitle}</span>
          </>
        )}
      </p>
      <p style={{
            lineHeight: 1.2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: 'box',
            lineClamp: 3,
            WebKitBoxO: 'vertical',
      }}>
        <small className="text-muted">{description}</small>
      </p>
    </div>
  )
}

export default function Table() {
  const data = React.useMemo(
    () => Object.values(googleBooks).map((book) => book.volumeInfo),
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: 'Cover',
        accessor: 'imageLinks.thumbnail',
        Cell: ImageCellRenderer,
      },
      {
        Header: 'Title',
        Cell: TitleCellRenderer,
      },
      {
        Header: 'Authors',
        accessor: (row) => row.authors?.join(', '),
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    // apply the table props
    <table {...getTableProps()}>
      <thead>
        {
          // Loop over the header rows
          headerGroups.map((headerGroup) => (
            // Apply the header row props
            <tr {...headerGroup.getHeaderGroupProps()}>
              {
                // Loop over the headers in each row
                headerGroup.headers.map((column) => (
                  // Apply the header cell props
                  <th {...column.getHeaderProps()}>
                    {
                      // Render the header
                      column.render('Header')
                    }
                  </th>
                ))
              }
            </tr>
          ))
        }
      </thead>
      {/* Apply the table body props */}
      <tbody {...getTableBodyProps()}>
        {
          // Loop over the table rows
          rows.map((row) => {
            // Prepare the row for display
            prepareRow(row);
            return (
              // Apply the row props
              <tr {...row.getRowProps()}>
                {
                  // Loop over the rows cells
                  row.cells.map((cell) => {
                    // Apply the cell props
                    return (
                      <td {...cell.getCellProps()}>
                        {
                          // Render the cell contents
                          cell.render('Cell')
                        }
                      </td>
                    );
                  })
                }
              </tr>
            );
          })
        }
      </tbody>
    </table>
  );
}
