import { useState } from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { Tooltip } from '@mui/material'
import TransactionDetails from './TransactionDetails'

function TransactionRow({ row }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <Tooltip
            title={
              open ? 'Close transaction details' : 'Open transaction details'
            }
            placement="top"
          >
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </Tooltip>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.postingDate}
        </TableCell>
        <TableCell
          align="right"
          style={{
            color: row.creditDebitIndicator === 'CRDT' ? 'red' : 'green',
          }}
        >
          {row.creditDebitIndicator === 'CRDT'
            ? `- ${row.amount} ${row.currency}`
            : `+ ${row.amount} ${row.currency}`}
        </TableCell>
        <TableCell align="right">
          {row.counterPartyAccountName}&nbsp;{row.counterPartyAccountNumber}
          &nbsp; / &nbsp;{row.counterPartyAccountBankCode}
        </TableCell>
        <TableCell align="right">{row.details}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Transaction details:
              </Typography>
              <TransactionDetails details={row.transactionDetails} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

TransactionRow.propTypes = {
  row: PropTypes.shape({
    postingDate: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    counterPartyAccountName: PropTypes.string.isRequired,
    counterPartyAccountNumber: PropTypes.string.isRequired,
    counterPartyAccountBankCode: PropTypes.string.isRequired,
    creditDebitIndicator: PropTypes.string.isRequired,
    details: PropTypes.string.isRequired,
    transactionDetails: PropTypes.shape({
      bookingDate: PropTypes.string.isRequired,
      ownAccountNumber: PropTypes.string.isRequired,
      variableSymbol: PropTypes.string.isRequired,
      specificSymbol: PropTypes.string.isRequired,
      bankref: PropTypes.string.isRequired,
      transactionType: PropTypes.string.isRequired,
      transactionTypeCode: PropTypes.number.isRequired,
      statementNumber: PropTypes.string.isRequired,
      statementPeriod: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

export default TransactionRow
