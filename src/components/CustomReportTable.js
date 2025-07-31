import "../styles/icons.css";
import "../pages/MonthlyReport/monthlyReport.css";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableCellHead,
  TableRowHead,
  TableRow,
  TableHead,
  Input,
} from "@dhis2/ui";

import { IconChevronDown24, IconChevronUp24 } from "@dhis2/ui-icons";

export const CustomReportTable = ({ data, columns, handleQuantityChange }) => {
  const [sortBy, setSortBy] = useState(columns[0].key);
  const [asc, setAsc] = useState(true);

  const handleSort = (e) => {
    let col = e.currentTarget.getAttribute("data-item");
    setAsc((currentAsc) => {
      if (col !== sortBy) {
        setSortBy(col);
        return true;
      }
      return !currentAsc;
    });
  };

  data = data.sort((a, b) => {
    let compareValue = 0;
    if (typeof a[sortBy] === "number") {
      compareValue = a[sortBy] - b[sortBy];
    } else if (typeof a[sortBy] === "string") {
      compareValue = a[sortBy].localeCompare(b[sortBy]);
    }

    return asc ? compareValue : -compareValue;
  });

  let sortIcon = (column) => (
    <div className="sort-icon">
      {sortBy === column.key ? (
        asc ? (
          <IconChevronDown24 />
        ) : (
          <IconChevronUp24 />
        )
      ) : (
        <IconChevronDown24 className="neutral-icon" />
      )}
    </div>
  );
  return (
    <Table className="report-table">
      <TableHead>
        <TableRowHead className="report-table-cell-head-title">
          {columns.map((column, index) => (
            <TableCellHead key={column.key + "_" + index}>
              <div
                data-item={column.key}
                onClick={(e) => {
                  handleSort(e);
                }}
              >
                {column.title}
                {sortIcon(column)}
              </div>
            </TableCellHead>
          ))}
        </TableRowHead>
      </TableHead>
      <TableBody>
        {data &&
          data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column) => {
                if (column.key === "quantityToBeOrdered") {
                  return (
                    <TableCell
                      key={`${rowIndex}_${column.key}`}
                      className="report-quantity-container"
                    >
                      <Input
                        value={row[column.key]?.toString() || ""}
                        type="number"
                        className="report-quantity"
                        onChange={(event) =>
                          handleQuantityChange(rowIndex, event.value)
                        }
                      />
                    </TableCell>
                  );
                }

                return (
                  <TableCell key={row.id + "_" + column.key}>
                    {row[column.key]}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}; // reusable table component. We can also add more props if we need to
