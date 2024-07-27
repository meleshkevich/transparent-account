import * as React from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { Tooltip } from '@mui/material'

function Overview({ transactionsResponse }) {
  function Row(props) {
    const { row } = props
    const [open, setOpen] = React.useState(false)

    return (
      <>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <Tooltip
              title={
                open ? 'Close transaction details' : 'Close transaction details'
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
            style={
              row.creditDebitIndicator === 'CRDT'
                ? { color: 'red' }
                : { color: 'green' }
            }
          >
            {row.creditDebitIndicator === 'CRDT'
              ? `- ${row.amount} ${row.currency}`
              : `+ ${row.amount} ${row.currency}`}
          </TableCell>
          <TableCell align="right">
            {row.counterPartyAccountName}&nbsp;{row.counterPartyAccountNumber}
            &nbsp; / &nbsp;
            {row.counterPartyAccountBankCode}
          </TableCell>
          <TableCell align="right">{row.details}</TableCell>
          <TableCell align="right">{row.countryCode}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Transaction details:
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Booking Date</TableCell>
                      <TableCell>ownAccountNumber</TableCell>
                      <TableCell align="right">variableSymbol</TableCell>
                      <TableCell align="right">specificSymbol</TableCell>
                      <TableCell align="right">bankref</TableCell>
                      <TableCell align="right">transactionType</TableCell>
                      <TableCell align="right">transactionTypeCode</TableCell>
                      <TableCell align="right">statementNumber</TableCell>
                      <TableCell align="right">statementPeriod</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        {row.transactionDetails.bookingDate}
                      </TableCell>
                      <TableCell align="right">
                        {row.transactionDetails.ownAccountNumber}
                      </TableCell>
                      <TableCell align="right">
                        {row.transactionDetails.variableSymbol}
                      </TableCell>
                      <TableCell align="right">
                        {row.transactionDetails.specificSymbol}
                      </TableCell>
                      <TableCell align="right">
                        {row.transactionDetails.bankref}
                      </TableCell>
                      <TableCell align="right">
                        {row.transactionDetails.transactionType}
                      </TableCell>
                      <TableCell align="right">
                        {row.transactionDetails.transactionTypeCode}
                      </TableCell>
                      <TableCell align="right">
                        {row.transactionDetails.statementNumber}
                      </TableCell>
                      <TableCell align="right">
                        {row.transactionDetails.statementPeriod}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    )
  }

  const rows = []

  transactionsResponse.forEach((transaction) => {
    rows.push({
      id: transaction.id,
      postingDate: transaction.postingDate,
      amount: transaction.amount.value,
      currency: transaction.amount.currency,
      counterPartyAccountName: transaction.counterPartyAccount.accountName,
      counterPartyAccountNumber: transaction.counterPartyAccount.accountNumber,
      counterPartyAccountBankCode: transaction.counterPartyAccount.bankCode,
      creditDebitIndicator: transaction.creditDebitIndicator,
      details: transaction.details.detail1,
      transactionDetails: {
        bookingDate: transaction.bookingDate,
        ownAccountNumber: transaction.ownAccountNumber,
        variableSymbol: transaction.variableSymbol,
        specificSymbol: transaction.specificSymbol,
        bankref: transaction.bankref,
        transactionType: transaction.transactionType,
        transactionTypeCode: transaction.transactionTypeCode,
        statementNumber: transaction.statementNumber,
        statementPeriod: transaction.statementPeriod,
      },
    })
  })

  return (
    <TableContainer
      component={Paper}
      sx={{ maxHeight: 600, maxWidth: 1920, margin: 'auto', mt: 4 }}
    >
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Date</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">counterPartyAccount</TableCell>
            <TableCell align="right">details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

Overview.propTypes = {
  transactionsResponse: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      postingDate: PropTypes.string.isRequired,
      amount: PropTypes.shape({
        value: PropTypes.number.isRequired,
        currency: PropTypes.string.isRequired,
      }).isRequired,
      counterPartyAccount: PropTypes.shape({
        accountName: PropTypes.string.isRequired,
        accountNumber: PropTypes.string.isRequired,
        bankCode: PropTypes.string.isRequired,
      }).isRequired,
      creditDebitIndicator: PropTypes.string.isRequired,
      details: PropTypes.shape({
        detail1: PropTypes.string.isRequired,
      }).isRequired,
      bookingDate: PropTypes.string.isRequired,
      ownAccountNumber: PropTypes.string.isRequired,
      variableSymbol: PropTypes.string.isRequired,
      specificSymbol: PropTypes.string.isRequired,
      bankref: PropTypes.string.isRequired,
      transactionType: PropTypes.string.isRequired,
      transactionTypeCode: PropTypes.number.isRequired,
      statementNumber: PropTypes.string.isRequired,
      statementPeriod: PropTypes.string.isRequired,
    }).isRequired
  ),
  row: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      postingDate: PropTypes.string.isRequired,
      amount: PropTypes.shape({
        value: PropTypes.number.isRequired,
        currency: PropTypes.string.isRequired,
      }).isRequired,
      counterPartyAccount: PropTypes.shape({
        accountName: PropTypes.string.isRequired,
        accountNumber: PropTypes.string.isRequired,
        bankCode: PropTypes.string.isRequired,
      }).isRequired,
      creditDebitIndicator: PropTypes.string.isRequired,
      details: PropTypes.shape({
        detail1: PropTypes.string.isRequired,
      }).isRequired,
      bookingDate: PropTypes.string.isRequired,
      ownAccountNumber: PropTypes.string.isRequired,
      variableSymbol: PropTypes.string.isRequired,
      specificSymbol: PropTypes.string.isRequired,
      bankref: PropTypes.string.isRequired,
      transactionType: PropTypes.string.isRequired,
      transactionTypeCode: PropTypes.number.isRequired,
      statementNumber: PropTypes.string.isRequired,
      statementPeriod: PropTypes.string.isRequired,
    }).isRequired
  ),
}

export default Overview
