import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";

const register = () => {
  const [name, setName] = useState("bisry");
  const [email, setEmail] = useState("bisry@gmail.com");
  const [password, setPassword] = useState("bisryyyy");
  const [loading, setLoading] = useState(false);

  console.log("process.env.NEXT_PUBLIC_API", process.env.NEXT_PUBLIC_API);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      console.table({ name, email, password });
      const { data } = await axios.post(
        `/api/register`,
        {
          name,
          email,
          password,
        }
      );
      // console.log("REGISTER RESPONSE", data);
      toast.success("Registration success. Please login.");
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data);
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="jumbotron text-center bg-primary square">Registration</h1>
      <div className="container col-md-4 offset-md-4 p-5">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control mb-4 p-4"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            className="form-control mb-4 p-4"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            className="form-control mb-4 p-4"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <button
            type="submit"
            className="btn btn-primary col-md-12 p-2 "
            disabled={!name || !email || !password || loading}
          >
            {loading ? <SyncOutlined spin /> : "Submit"}
          </button>
        </form>
        <p className="text-center p-3">
          Already registered?{" "}
          <Link href="/login">
            Login
          </Link>
        </p>

      </div>
    </>
  );
};

export default register;
