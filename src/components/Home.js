import React from "react";

import Notes from "./Notes";

const Home = (props) => {
  const {showAlert}=props;
  return (
    <div>
      {/* hmne app.js m container callsss use kri h iski wajah se ye cetre m aa gaaya */}

     
     <Notes showAlert={showAlert}/>
    </div>
  );
};
export default Home;
