import "./Dashboard.css";
import JobPosting from "../JobPosting/JobPosting";

function EmployerDashboard() {
  return (
    <>
      <div className="dashboard4">
        <h1>you are logged in as an employer</h1>
        <JobPosting></JobPosting>
      </div>
    </>
  );
}
export default EmployerDashboard;
