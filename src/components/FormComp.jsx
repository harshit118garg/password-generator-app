import React, { useState, useEffect } from "react";
import showPwdImg from "../assets/show-password.svg";
import hidePwdImg from "../assets/hide-password.svg";
import {
  getPasswordObj,
  generatePasswordString,
} from "../service/passwordManager";

const FormComp = () => {
  const [state, setState] = useState({
    generatedPassword: "",
    passwordLength: "8",
    Symbols: false,
    Numbers: false,
    LowerCase_Letters: false,
    UpperCase_Letters: false,
  });

  const [btnEnable, setBtnEnable] = useState(false);
  const [isRevealPwd, setIsRevealPwd] = useState(false);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const onCheckHandler = (e) => {
    const { name, checked } = e.target;
    setState({ ...state, [name]: checked });
  };

  const submiHandler = (e) => {
    e.preventDefault();
    const passObj = getPasswordObj(state);
    const passwordString = generatePasswordString(
      passObj,
      state.passwordLength
    );
    setState({ ...state, generatedPassword: passwordString });
  };

  const radioFields = [
    "Symbols",
    "Numbers",
    "LowerCase_Letters",
    "UpperCase_Letters",
  ];

  const copyPassword = () => {
    navigator.clipboard.writeText(state.generatedPassword);
    alert("password copied");
  };

  useEffect(() => {
    if (
      state.passwordLength !== "" &&
      (state.Numbers ||
        state.Symbols ||
        state.LowerCase_Letters ||
        state.UpperCase_Letters)
    ) {
      setBtnEnable(true);
    }
  }, [state]);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card shadow bg-primary bg-opacity-25 p-4">
              <div className="card-header shadow-lg bg-success bg-opacity-75">
                <h5 className="card-title text-center text-uppercase fw-bolder text-white">
                  PassWord Generator
                </h5>
              </div>
              <div className="card-body">
                <form onSubmit={submiHandler} autoComplete="off">
                  <div className="mb-2">
                    <div className="input-group pswd-Box">
                      <span className="input-group-text bg-warning bg-opacity-75">
                        Password
                      </span>
                      <input
                        disabled={true}
                        type={isRevealPwd ? "text" : "password"}
                        className="form-control form-control-sm bg-black bg-opacity-50 text-center text-light"
                        placeholder="Generated Password"
                        value={state.generatedPassword}
                        name="generatedPassword"
                      />
                      <div className="bg-warning p-2 bg-opacity-75">
                        <img
                          title={
                            isRevealPwd ? "Hide password" : "Show password"
                          }
                          src={isRevealPwd ? hidePwdImg : showPwdImg}
                          onClick={() =>
                            setIsRevealPwd((prevState) => !prevState)
                          }
                        />
                      </div>
                      <span
                        className="input-group-text bg-warning bg-opacity-75"
                        onClick={copyPassword}
                      >
                        <i className="fa-solid fa-clipboard"></i>
                      </span>
                    </div>
                  </div>
                  <div className="mb-2">
                    <div className="input-group">
                      <input
                        required={true}
                        type="number"
                        className="form-control"
                        placeholder="Password Length"
                        value={state.passwordLength}
                        onChange={onChangeHandler}
                        name="passwordLength"
                      />
                      <span className="input-group-text bg-warning bg-opacity-75">
                        Password Length
                      </span>
                    </div>
                  </div>
                  {radioFields.map((field, index) => (
                    <div className="mb-2" key={index}>
                      <div className="input-group">
                        <span className="input-group-text bg-white">
                          <input
                            type="checkbox"
                            onChange={onCheckHandler}
                            name={field}
                            className="form-check-input"
                          />
                        </span>
                        <span
                          type="text"
                          className="form-control bg-warning bg-opacity-75 text-center text-dark"
                        >
                          {field}
                        </span>
                      </div>
                    </div>
                  ))}
                  <button disabled={!btnEnable && true} type="submit" className="btn btn-success bg-opacity-50 w-100 mt-3 text-uppercase fw-bolder">
                    Generate Password
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormComp;
