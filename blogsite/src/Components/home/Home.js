import React from 'react'
import DraftTextEditor from '../draft/DraftTextEditor'

import './home.css'

function Home({setLoginUser}) {
  return (
    <div className='home'>
   <DraftTextEditor />
    <div className='button'onClick={()=>setLoginUser({})}>Logout</div>
    </div>
  )
}

export default Home