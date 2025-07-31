import {
  Table,
  TableBody,
  TableCell,
  TableCellHead,
  TableRowHead,
  TableRow,
  TableHead,
} from "@dhis2/ui";
import "../styles/customTable.css";
import { LowStockWarning } from "./LowStockWarning";

export const CustomTable = ({
  data,
  columns,
  onRowClick, // optional
  selectedCommodity, // optional
  disableCheckboxes, // optional
}) => {
  return (
    <Table className="custom-table">
      <TableHead>
        <TableRowHead className="table-cell-head-title">
          {onRowClick && <TableCellHead>Select</TableCellHead>}
          {columns.map((column) => (
            <TableCellHead key={column.key}>{column.title}</TableCellHead>
          ))}
        </TableRowHead>
      </TableHead>
      <TableBody>
        {data.map((row, rowIndex) => (
          <TableRow
            key={rowIndex}
            className={
              selectedCommodity?.dataElement !== row.dataElement &&
              selectedCommodity
                ? "greyed-out"
                : ""
            }
          >
            {onRowClick && (
              <TableCell className="checkbox-cell">
                <input
                  className="checkbox-table"
                  type="checkbox"
                  checked={selectedCommodity?.dataElement === row.dataElement}
                  onChange={() => onRowClick(row)}
                  disabled={
                    disableCheckboxes &&
                    selectedCommodity?.dataElement !== row.dataElement
                  }
                />
              </TableCell>
            )}
            {columns.map((column) => {
              const content = column.render
                ? column.render(row)
                : row[column.key];
              return (
                <TableCell
                  key={rowIndex + "_" + column.key}
                  className={column.className || ""}
                >
                  <div
                    className={
                      column.key === "value" || column.key === "consumption"
                        ? "stock-number"
                        : ""
                    }
                  >
                    {content}
                  </div>
                  {column.key === "low" && row["value"] <= 10 && (
                    <LowStockWarning />
                  )}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
