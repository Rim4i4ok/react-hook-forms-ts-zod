import React, { useState } from "react";

const FormWithourReactHookform = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIssubmitting] = useState<boolean>(false);
  const [errors, setErrros] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIssubmitting(true);

    if (password !== confirmPassword) {
      setErrros(["Password and confirm  must match"]);
      setIssubmitting(false);
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 3000));

    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setErrros([]);

    setIssubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      {errors.length > 0 && (
        <ul>
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      <input
        type="email"
        placeholder="Email"
        required
        maxLength={50}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        required
        minLength={6}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Confirm password"
        required
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <br />
      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
    </form>
  );
};

export default FormWithourReactHookform;
