import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import styles from "./login.module.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const submitHandler = (data) => {
    localStorage.setItem("email", data.email);
    // localStorage.setItem("password", user.password);
    console.log(data);
    reset();
    navigate("/team");
  };
  console.log(errors);

  useEffect(() => {
    const user = localStorage.getItem("email");

    if (user) return navigate("/team");
  }, [navigate]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.cover}>
          <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
            <h1>Login</h1>

            <div className={styles.control}>
              <label>Email</label>
              <input
                type="text"
                placeholder="Enter email"
                {...register("email", {
                  required: "Email is required!",
                  pattern: {
                    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                    message: "Enter a valid email!",
                  },
                })}
              />
            </div>
            <div className={styles.error}>
              {errors.email && <span>{errors.email.message}</span>}
            </div>
            <div className={styles.control}>
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter password"
                {...register("password", {
                  required: "Password is required!",
                  minLength: {
                    value: 4,
                    message: "Password must be between 4-16 characters!",
                  },
                  maxLength: {
                    value: 16,
                    message: "Password must be between 4-16 characters!",
                  },
                })}
              />
            </div>
            <div className={styles.error}>
              {errors.password && <span>{errors.password.message}</span>}
            </div>
            <button className={styles.btn} type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
