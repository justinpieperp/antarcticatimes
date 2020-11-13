import React from 'react'
import { BasicHeader, BasicFooter } from '../../layouts'
import LoginForm from './login-form'

const Login = () => {
  return (
        <div>
            <BasicHeader />
            <LoginForm />
            <BasicFooter />
        </div>
  )
}
export default Login
