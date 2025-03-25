import '../styles/Header.css'

const Header = () => {
  const username = "Selena"

  return(
    <div className='Header'>
      <div className='greet-user'>Hi, {username}</div>
    </div>
  )
}

export default Header;