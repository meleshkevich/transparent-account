import PropTypes from 'prop-types'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import TransactionRow from './TransactionRow'

function Overview({ transactionsResponse }) {
  const rows = transactionsResponse.map((transaction) => ({
    id: transaction.id,
    postingDate: transaction.postingDate,
    amount: transaction.amount.value,
    currency: transaction.amount.currency,
    counterPartyAccountName: transaction.counterPartyAccount.accountName,
    counterPartyAccountNumber: transaction.counterPartyAccount.accountNumber,
    counterPartyAccountBankCode: transaction.counterPartyAccount.bankCode,
    creditDebitIndicator: transaction.creditDebitIndicator,
    details: transaction.details.detail1,
    countryCode: transaction.countryCode,
    transactionDetails: {
      transactionId: transaction.transactionId,
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
  }))

  return (
    <TableContainer
      component={Paper}
      sx={{ maxHeight: 600, maxWidth: 1920, margin: 'auto', mt: 4 }}
    >
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell sx={{ fontWeight: 900 }}>Date</TableCell>
            <TableCell align="right" sx={{ fontWeight: 900 }}>
              Amount
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: 900 }}>
              Counterparty Account
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: 900 }}>
              Notes
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TransactionRow key={row.id} row={row} />
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
  ).isRequired,
}

export default Overview
