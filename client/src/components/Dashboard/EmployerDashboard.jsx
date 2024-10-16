import "./Dashboard.css";
import JobPosting from "../JobPosting/JobPosting";
import { Link } from "react-router-dom";

function EmployerDashboard() {
  return (
    <>
      <div className="dashboard4">
        <h1>you are logged in as an employer</h1>
        <JobPosting></JobPosting>
        <Link className="navbar-link" to="/">
          Home
        </Link>
      </div>
    </>
  );
}
export default EmployerDashboard;
