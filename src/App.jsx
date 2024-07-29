import accountsResponse from './data/accountsResponse'
import balanceResponse from './data/balanceResponse'
import transactionsResponse from './data/transactionsResponse'
import Overview from './components/Overview'
import Account from './components/Account'
import Typography from '@mui/material/Typography'
import './App.css'

function App() {
  return (
    <>
      <Typography
        variant="h4"
        gutterBottom
        component="div"
        align="center"
        color={'#002C5A;'}
      >
        Transparent account
      </Typography>

      <Account
        accountsResponse={accountsResponse}
        balanceResponse={balanceResponse}
      />
      <Overview transactionsResponse={transactionsResponse} />
    </>
  )
}

export default App
