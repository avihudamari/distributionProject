import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";
import EditIcon from "material-ui/svg-icons/image/edit";
import TrashIcon from "material-ui/svg-icons/action/delete";
import CheckIcon from "material-ui/svg-icons/navigation/check";
import TextField from "material-ui/TextField";
import Checkbox from '@material-ui/core/Checkbox';

const row = (
  x,
  i,
  header,
  handleRemove,
  startEditing,
  editIdx,
  handleChange,
  stopEditing
) => {

const currentlyEditing = editIdx === i;
  return (
    <TableRow key={`tr-${i}`} selectable={false}>
      {header.map((y, k) => (
        <TableRowColumn key={`trc-${k}`}
          style={{padding:'0px', textAlign:'center'}}
        >
          {currentlyEditing ? (
            y.prop !== 'food' && y.prop !== 'medicines' ?
              <TextField
                name={y.prop}
                onChange={e => handleChange(e, y.prop, i)}
                value={x[y.prop]}
                style={{ width:'100%'}}
                inputStyle={{ textAlign:'center' }}
              />
            :
            <Checkbox
              name={y.prop}
              onChange={e => handleChange(e, y.prop, i)}
              checked={x[y.prop]}
            />       
            ) : 
            (  
              y.prop !== 'food' && y.prop !== 'medicines' ?
                x[y.prop]
              :
                <Checkbox
                  disabled 
                  checked={x[y.prop]}
                />
            )
          }
        </TableRowColumn>
      ))}
      <TableRowColumn style={{padding:'0px', width:'25px'}} >
        {currentlyEditing ? (
          <CheckIcon onClick={() => stopEditing()} />
        ) : (
          <EditIcon onClick={() => startEditing(i)} />
        )}
      </TableRowColumn>
      <TableRowColumn style={{paddingRight: '25px', paddingLeft: '20px', width:'25px'}} >
        <TrashIcon onClick={() => handleRemove(i)} />
      </TableRowColumn>
    </TableRow>
  );
};

export default ({
  data,
  header,
  handleRemove,
  startEditing,
  editIdx,
  handleChange,
  stopEditing
}) => (
  <Table>
    <TableHeader>
      <TableRow>
        {header.map((x, i) => (
          <TableHeaderColumn key={`thc-${i}`} style={{textAlignLast: 'center'}} >{x.name}</TableHeaderColumn>
        ))}
        <TableHeaderColumn style={{padding:'0px', width:'25px'}} />
        <TableHeaderColumn style={{paddingRight: '25px', paddingLeft: '20px', width:'25px'}} />
      </TableRow>
    </TableHeader>
    <TableBody>
      {data.map((x, i) =>
        row(
          x,
          i,
          header,
          handleRemove,
          startEditing,
          editIdx,
          handleChange,
          stopEditing
        )
      )}
    </TableBody>
  </Table>
);


/*
const styles = {
  root: {
    background: "black"
  },
  input: {
    color: "white"
  }
};

function MyTable({
  props,
  data,
  header,
  handleRemove,
  startEditing,
  editIdx,
  handleChange,
  stopEditing
}) {
  const { classes } = props;

  return (
    <Table>
    <TableHeader>
      <TableRow>
        {header.map((x, i) => (
          <TableHeaderColumn key={`thc-${i}`}>{x.name}</TableHeaderColumn>
        ))}
        <TableHeaderColumn />
        <TableHeaderColumn />
      </TableRow>
    </TableHeader>
    <TableBody>
      {data.map((x, i) =>
        row(
          x,
          i,
          header,
          handleRemove,
          startEditing,
          editIdx,
          handleChange,
          stopEditing
        )
      )}
    </TableBody>
  </Table>
  );
}

Table.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(props)(MyTable);
*/