
import React, { useEffect, useRef } from "react";
import "./auth.css";

const Auth = () => {
  const inputRefs = useRef([]); // Reference for input elements

  useEffect(() => {
    // Add focus and blur event listeners to inputs
    const inputs = inputRefs.current;
    const addfocus = (event) => {
      let parent = event.target.parentNode.parentNode;
      parent.classList.add("focus");
    };

    const remfocus = (event) => {
      let parent = event.target.parentNode.parentNode;
      if (event.target.value === "") {
        parent.classList.remove("focus");
      }
    };

    inputs.forEach(input => {
      if (input) {
        input.addEventListener("focus", addfocus);
        input.addEventListener("blur", remfocus);
      }
    });

    // Cleanup event listeners on component unmount
    return () => {
      inputs.forEach(input => {
        if (input) {
          input.removeEventListener("focus", addfocus);
          input.removeEventListener("blur", remfocus);
        }
      });
    };
  }, []); // Empty dependency array to run once when component mounts

  return (
    <div className="l-form">
      <div className="shape1"></div>
      <div className="shape2"></div>

      <div className="form">
        <img src="assets/authentication.svg" alt="Authentication" className="form__img" />

        <form action="" className="form__content">
          <h1 className="form__title">Welcome</h1>

          <div className="form__div form__div-one">
            <div className="form__icon">
              <i className="bx bx-user-circle"></i>
            </div>

            <div className="form__div-input">
              <label htmlFor="username" className="form__label">Username</label>
              <input
                type="text"
                id="username"
                className="form__input"
                ref={(el) => (inputRefs.current[0] = el)}
              />
            </div>
          </div>

          <div className="form__div">
            <div className="form__icon">
              <i className="bx bx-lock"></i>
            </div>

            <div className="form__div-input">
              <label htmlFor="password" className="form__label">Password</label>
              <input
                type="password"
                id="password"
                className="form__input"
                ref={(el) => (inputRefs.current[1] = el)}
              />
            </div>
          </div>

          <button type="button" className="form__forgot">Forgot Password?</button>

          <input type="submit" className="form__button" value="Login" />

          <div className="form__social">
            <span className="form__social-text">Or login with</span>
            <button type="button" className="form__social-icon"><i className='bx bxl-facebook'></i></button>
            <button type="button" className="form__social-icon"><i className='bx bxl-google'></i></button>
            <button type="button" className="form__social-icon"><i className='bx bxl-instagram'></i></button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;

