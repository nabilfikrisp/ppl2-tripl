import React from 'react';
// import { Button } from './Button'
import './Register.css';

export default function Register (){
    return (
        <section className='register-sec'>
        <div className='my-width'>
            <div className='register-header'>
            <h1>DAFTAR</h1>
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
                    </div>
                    <div className='data-register'>
                        <label for="password">Konfirmasi Password</label>
                        <input type="text" name="password"></input>
                    </div>
                    <div className='container-bottom'>
                    <div className='data-register'>
                    <div className='button-register'>
                        <button className='button-regular' name="submit" id="submit">Daftar</button>
                        <h2>Atau</h2>
                        <button className='button-google' name="submit" id="submit"><i class="fab fa-google"></i> Daftar dengan Google</button>
                    </div>
                    </div>
                    </div>
                </form>
            </div>
        </div>
        </section>
      );
}

