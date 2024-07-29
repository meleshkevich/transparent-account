import PropTypes from 'prop-types'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

function TransactionDetails({ details }) {
  function capitalizeWords(str) {
    return str.replace(
      /([a-z])([a-z]*)/gi,
      (_, initial, rest) => initial.toUpperCase() + rest
    )
  }
  return (
    <Table size="small" aria-label="transaction details">
      <TableHead>
        <TableRow>
          {Object.keys(details).map((key) => (
            <TableCell key={key} align="right" sx={{ fontWeight: 700 }}>
              {capitalizeWords(key.split(/(?=[A-Z])/).join(' '))}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          {Object.values(details).map((value, index) => (
            <TableCell key={index} align="right">
              {value}
            </TableCell>
          ))}
        </TableRow>
      </TableBody>
    </Table>
  )
}

TransactionDetails.propTypes = {
  details: PropTypes.shape({
    transactionId: PropTypes.string.isRequired,
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
}

export default TransactionDetails
