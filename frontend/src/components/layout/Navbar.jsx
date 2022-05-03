import {Link} from 'react-router-dom'

function Navbar() {
  return (
      <div className="main-nav">
    <h1>Memorize Animals</h1>
    <Link to='/memorize'><button>Memorize</button></Link>
    <Link to='/input'><button>Input</button></Link>
      </div>

  )
}
export default Navbar