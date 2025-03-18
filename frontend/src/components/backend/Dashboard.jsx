import React from "react";

const Dashboard = () => {
  return (
    <main className="">
      <div className="container my-5">
        <div className="row">
          <div className="col-md-3">
            {/* Side bar */}
            <div className="card shadow border-0">
              <div className="card-body">
                <h4>Sidebar</h4>
              </div>
            </div>
          </div>
          <div className="col-md-9 dashboard">
            {/* Dashboard */}
            <div className="card shadow border-0">
              <div className="card-body d-flex justify-content-center align-items-center">
                <h4>Welcome to Admin Console</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
