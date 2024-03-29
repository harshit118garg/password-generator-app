import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { MdFileCopy } from "react-icons/md";
import {
  getPasswordObj,
  generatePasswordString,
  getPasswordStrength,
} from "../service/passwordManager";

const FormComp = () => {
  const [state, setState] = useState({
    generatedPassword: "",
    passwordLength: "8",
    Symbols: false,
    Numbers: false,
    LowerCase_Letters: false,
    UpperCase_Letters: false,
    passwordStrength: 5,
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

  function passStrength() {
    let strengthObj = {
      strength: "",
      color: "",
    };
    const { passwordStrength } = state;
    if (passwordStrength >= 20) {
      strengthObj.strength = "Strong";
      strengthObj.color = "bg-primary";
    } else if (passwordStrength === 15) {
      strengthObj.strength = "Medium";
      strengthObj.color = "bg-warning";
    } else {
      strengthObj.strength = "Weak";
      strengthObj.color = "bg-dark";
    }

    return strengthObj;
  }

  const submiHandler = (e) => {
    e.preventDefault();
    const passObj = getPasswordObj(state);
    const passwordString = generatePasswordString(
      passObj,
      state.passwordLength
    );
    const passStrength = getPasswordStrength(passwordString);
    setState({
      ...state,
      generatedPassword: passwordString,
      passwordStrength: passStrength,
    });
  };

  const radioFields = [
    "Symbols",
    "Numbers",
    "LowerCase_Letters",
    "UpperCase_Letters",
  ];

  const copyPassword = () => {
    if (state.generatedPassword === "") {
      toast.error("generate a new password first", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      navigator.clipboard.writeText(state.generatedPassword);
      toast.success("password copied", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
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
            <div className="card p-4">
              <div className="card-header shadow-lg bg-success bg-opacity-75">
                <h5 className="card-title text-center text-uppercase fw-bolder text-white">
                  PassWord Generator
                </h5>
              </div>
              <div className="card-body">
                <form onSubmit={submiHandler} autoComplete="off">
                  <div className="mb-2">
                    <div className="input-group pswd-Box">
                      <span className="input-group-text text-bg-primary">
                        Password
                      </span>
                      <input
                        disabled={true}
                        type={isRevealPwd ? "text" : "password"}
                        className="form-control form-control-sm text-center text-light bg-transparent"
                        placeholder="Generated Password"
                        value={state.generatedPassword}
                        name="generatedPassword"
                      />
                      <div
                        className="input-group-text text-bg-primary p-2 pointerClass"
                        onClick={() =>
                          setIsRevealPwd((prevState) => !prevState)
                        }
                      >
                        <span>
                          {isRevealPwd ? (
                            <AiOutlineEyeInvisible />
                          ) : (
                            <AiOutlineEye />
                          )}
                        </span>
                      </div>
                      <span
                        className="input-group-text text-bg-primary pointerClass"
                        onClick={copyPassword}
                      >
                        <MdFileCopy />
                      </span>
                      <ToastContainer />
                    </div>
                  </div>
                  <div className="mb-2">
                    <div className="d-flex justify-content-align-items-center input-box">
                      <span className="input-group-text text-bg-primary me-4">
                        Password Length
                      </span>
                      <input
                        type="range"
                        className="form-range me-4"
                        min={4}
                        max={20}
                        value={state.passwordLength}
                        name="passwordLength"
                        onChange={onChangeHandler}
                      />
                      <span className="input-group-text text-bg-primary">
                        {state.passwordLength}
                      </span>
                    </div>
                  </div>
                  <div className="mb-2">
                    <div
                      className={`strength p-4 d-flex justify-content-center align-items-center ${passStrength().color}`}
                    >
                      <span>{passStrength().strength}</span>
                    </div>
                  </div>
                  {radioFields.map((field, index) => (
                    <div className="mb-2" key={index}>
                      <div className="input-group">
                        <span className="input-group-text bg-primary">
                          <input
                            type="checkbox"
                            onChange={onCheckHandler}
                            name={field}
                            className="form-check-input pointerClass"
                          />
                        </span>
                        <span
                          type="text"
                          className="form-control text-center text-bg-success text-uppercase fw-bolder"
                        >
                          {field}
                        </span>
                      </div>
                    </div>
                  ))}
                  <button
                    disabled={!btnEnable && true}
                    type="submit"
                    className="btn btn-success bg-opacity-50 w-100 mt-3 text-uppercase fw-bolder"
                  >
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
