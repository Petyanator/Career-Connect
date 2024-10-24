import { useState } from "react";
import SeekerApplied from "./SeekerApplied";
import JobSeekerNotification from "./JobSeekerNotification/JobSeekerNotification";
import SeekerPassed from "./SeekerPassed";
import "./SeekerConnections.scss";

function SeekerConnections() {
  const [activeTab, setActiveTab] = useState("applied");
  const [connectedCount, setConnectedCount] = useState(100); // Example: 5 employers have connected

  const renderContent = () => {
    switch (activeTab) {
      case "applied":
        return (
          <div>
            <h3>You have applied to these jobs. Waiting for response...</h3>
            <SeekerApplied />
          </div>
        );
      case "connected":
        return (
          <div>
            <h3>These employers have responded your applications.</h3>
            <JobSeekerNotification />
          </div>
        );
      case "passed":
        return (
          <div>
            <h3>You have passed on these job offers.</h3>
            <SeekerPassed />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="seeker-connections">
      <div className="tab-container">
        <button
          className={activeTab === "applied" ? "active" : ""}
          onClick={() => setActiveTab("applied")}
        >
          Applied
        </button>

        <button
          className={activeTab === "connected" ? "active" : ""}
          onClick={() => setActiveTab("connected")}
        >
          Connected
          {connectedCount > 0 && (
            <span className="counter">{connectedCount}</span>
          )}
        </button>

        <button
          className={activeTab === "passed" ? "active" : ""}
          onClick={() => setActiveTab("passed")}
        >
          Passed
        </button>
      </div>
      <div className="tab-content">{renderContent()}</div>
    </div>
  );
}

export default SeekerConnections;
