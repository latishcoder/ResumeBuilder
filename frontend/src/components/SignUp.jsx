import React, { useContext, useState } from 'react'
import { authStyles as styles } from '../assets/dummystyle'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { API_PATHS } from '../utils/apiPaths'
import  axiosInstance  from '../utils/axiosInstance'
import { validateEmail } from '../utils/helper'
import DashBoard from '../pages/DashBoard'
// import { Target } from 'lucide-react'
import Inputs from './Inputs'
const SignUp = ({ setCurrentPage}) => {


  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(null);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
      e.preventDefault();
      if(!fullName) {
        setError('Please enter your full name');
        return;
      }
      if(!validateEmail(email)){
        setError('Please enter a valid email');
        return;
      }
      if(!password){
        setError('Please enter a password');
        return;
      }
      setError('');

      try {
        const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
            name: fullName,
            email,
            password,
        });
        console.log("✅Signup success", response.data);
        
        const { token } = response.data;
        if(token){
            localStorage.setItem('token', token);
            updateUser(response.data);
            navigate('/dashboard');
        }
          } catch (error) {
            console.log("signup error", error);
         if (error.response?.data?.message) {
      setError(error.response.data.message);
    } else if (error.message) {
      setError(error.message);
    } else {
      setError("Something went wrong. Please try again.");
    }
  }
      }
  
  return (
    <div className={styles.signupContainer}>
        <div className={styles.headerWrapper}>
            <h3 className={styles.signupTitle}>Create Account</h3>
            <p className={styles.signupSubtitle}>Join thousands of profeesional today</p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSignup} className={styles.signupForm}>
            <Inputs value={fullName} onChange={({ target }) => setFullName(target.value)}
            label="Full Name"
            placeholder="John Doe"
            type="text"
            />

            <Inputs value={email} onChange={({ target }) => setEmail(target.value)}
            label="Email"
            placeholder="email@example.com"
            type="email"
            />

            <Inputs value={password} onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 characters"
            type="password"
            />

            {error && <div className={styles.errorMessage}>{error}</div>}
            <button type='submit' className={styles.signupSubmit}>
                Create Account
            </button>

            {/* Footer */}
            <p className={styles.switchText}>
                Already have an account?{' '}
                <button onClick={() => setCurrentPage("login")}
                    type='button' className={styles.signupSwitchButton}>
                        Sign In
                    </button>
            </p>
            </form>
    </div>
  )
}

export default SignUp