import React from 'react';
// import { Button } from './Button'
import './Register.css';
import { Link } from 'react-router-dom';

export default function Login (){
    return (
        <section className='login-sec'>
        <div className='my-width'>
            <div className='register-header'>
            <h1>MASUK</h1>
            </div>
            <div className='register-box'>
                <form action='register' className='form-register'>
                    <div className='data-register'>
                        <label for="email">Username/Email</label>
                        <input type="text" name="email"></input>
                    </div>
                    <div className='data-register'>
                        <label for="password">Password</label>
                        <input type="text" name="password"></input>
                        <Link to='/' className='link-forgot'>Lupa Password?</Link>
                    </div>
                    <div className='container-bottom'>
                    <div className='data-register'>
                    <div className='button-register'>
                        <button className='button-regular' name="submit" id="submit">Masuk</button>
                        <h2>Atau</h2>
                        <button className='button-google' name="submit" id="submit"><i class="fab fa-google"></i> Masuk dengan Google</button>
                    </div>
                    </div>
                    </div>
                </form>
            </div>
        </div>
        </section>
      );
}

