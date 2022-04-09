import React from 'react'
import remoteTeam from '../assets/svgs/remote_team.svg'

export default function About () {
    return (
        <div className='container center' style={{ marginTop: '100px' }}>
            <img src={remoteTeam} alt="about me page"/>
        </div>
    )
}
