import React from 'react';
 
const Register = () => {
    return (
       <section>
          <h1>Register</h1>
            <form>
                <label>email</label>
                <input type="text" placeholder="example@hotmail.com" />

                <label>password</label>
                <input type="password" placeholder="Enter Password" />

                <label>confirm password</label>
                <input type="password" placeholder="Enter Password" />

                <button type="submit">Register</button>

            </form>
       </section>
    );
}
 
export default Register;