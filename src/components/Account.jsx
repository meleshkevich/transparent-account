import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Container } from '@mui/material'
import Logo from '../assets/logo.svg'
import PropTypes from 'prop-types'

function Account({ accountsResponse, balanceResponse }) {
  const account = accountsResponse[0]

  return (
    <Container
      sx={{
        maxHeight: 600,
        maxWidth: 1200,
        margin: 'auto',
        mt: 4,
        alignItems: 'flex-start',
      }}
    >
      <Box component="section" sx={{ p: 2, border: '1px solid grey' }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <img src={Logo} alt="PPF Bank logo" />
        </Box>
        <Typography variant="h6" gutterBottom component="div">
          Account name: {account.name}
        </Typography>
        <Typography variant="h6" gutterBottom component="div">
          Account number: {account.identification.iban}
        </Typography>
        <Typography variant="h6" gutterBottom component="div">
          Total: {balanceResponse.amount.value}
          &nbsp;{balanceResponse.amount.currency}
        </Typography>
      </Box>
    </Container>
  )
}

Account.propTypes = {
  accountsResponse: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      identification: PropTypes.shape({
        iban: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  balanceResponse: PropTypes.shape({
    amount: PropTypes.shape({
      value: PropTypes.number.isRequired,
      currency: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

export default Account
