import React from "react";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";
import Checkbox from '@material-ui/core/Checkbox';

const row = (
  x,
  i,
  header
) => {

  return (
    <TableRow key={`tr-${i}`} selectable={false}>
      {header.map((y, k) => (
        <TableRowColumn key={`trc-${k}`}
          style={{padding:'0px', textAlign:'center'}}
        >
        {
          y.prop !== 'food' && y.prop !== 'medicines' && y.prop !== 'isDone' ?
            x[y.prop]
          :
            <Checkbox
              disabled 
              checked={x[y.prop]}
            />
        }
        </TableRowColumn>
      ))}
    </TableRow>
  );
};

export default ({
  data,
  header
}) => (
  <Table>
    <TableHeader>
      <TableRow>
        {header.map((x, i) => (
          <TableHeaderColumn key={`thc-${i}`} style={{textAlignLast: 'center'}} >{x.name}</TableHeaderColumn>
        ))}
      </TableRow>
    </TableHeader>
    <TableBody>
      {data.map((x, i) =>
        row(
          x,
          i,
          header
        )
      )}
    </TableBody>
  </Table>
);