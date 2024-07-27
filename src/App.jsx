import accountsResponse from './data/accountsResponse'
import balanceResponse from './data/balanceResponse'
import transactionsResponse from './data/transactionsResponse'
import './App.css'
import Overview from './components/Overview'
import Account from './components/Account'
import Typography from '@mui/material/Typography'

function App() {
  return (
    <>
      <Typography variant="h4" gutterBottom component="div" align="center">
        Transparent account
      </Typography>

      <Account
        accountsResponse={accountsResponse}
        balanceResponse={balanceResponse}
      />
      <Overview
        accountsResponse={accountsResponse}
        transactionsResponse={transactionsResponse}
      />
    </>
  )
}

export default App
