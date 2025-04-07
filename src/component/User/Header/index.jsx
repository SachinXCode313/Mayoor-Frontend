import React, { useEffect, useState } from 'react'
import Wrapper from './style'

const Header = () => {

    const [user, setUser] = useState(null)

    const login = () => {
        setUser({
            name : "Shubham Gupta",
            email : "shubham.codeup@gmail.com"
        })
    }

    useEffect(() => {
        alert('Mount')
        return () => {
            alert('UnMount')
        }
    }, [])

    useEffect(() => {
        if(user){
            alert(user.name)
        }
    }, [user])

  return (
    <Wrapper>
      <h1>MayoApp</h1>
      <nav>
        <ul>
            <li>
                {
                    user ? <h1>Shubham</h1> : <input type="button" value="Login" onClick={login} />
                }
            </li>
        </ul>
      </nav>
      </Wrapper>
  )
}

export default Header
