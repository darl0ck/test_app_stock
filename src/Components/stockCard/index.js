import React, { Component } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';

export default class StockCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  static getDerivedStateFromProps(nextProps) {
    return {
      data: nextProps.data,
      deleteContact: nextProps.deleteContact
    };
  }

  deleteContact = (e, index) => {
    e.preventDefault();
    this.state.deleteContact(index);
  }

  render () {
    console.info(this.props.data,'table');
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Company</TableCell>
            <TableCell>Value</TableCell>
            <TableCell>Curency</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.data.map((el, id) => (
            <TableRow key={id}>
              <TableCell component='th' scope='row'>
                {el.name}
              </TableCell>
              <TableCell>{el.price}</TableCell>
              <TableCell>{el.currency}</TableCell>
              <TableCell>
                <Fab size='small' aria-label='Delete' onClick={(e)=>{
                  this.deleteContact(e,id);
                }}>
                  <DeleteIcon />
                </Fab>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}
