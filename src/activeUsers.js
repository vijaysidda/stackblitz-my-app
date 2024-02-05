import React, { useState, useEffect, useMemo } from 'react';
import './activeUsers.css'
import axios from 'axios';
import { Tab, Tabs } from "@mui/material";
import jsonData from "./data.json";
export default function ActiveUsers(props) {
  const [userid, setUserId] = React.useState("");
  const [username, setUserName] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [ramModule, setRamModule] = React.useState([]);
  const [ramValue, setRamValue] = React.useState("");
  const [modifyEnable, setModifyEnable] = React.useState(false);
  // const [acceptedTerms, setAcceptedTerms] = React.useState(false);
  const [selectedramModule, setSelectedRamModule] = React.useState([]);
  const [selectedWriteRamModule, setselectedWriteRamModule] = React.useState([]);
  const [isUserExisted, setIsUserExisted] = React.useState(false);
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [enableOnIndex, setEnableOnIndex] = useState(false);
  const [isDeleteEnabled, setIsDeleteEnabled] = useState(false);
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);
  const [hertzuserid, setHertzUserid] = React.useState("");
  const [department, setDepartment] = React.useState("");
  const [access, SetAccess] = React.useState([]);
  const userItems = jsonData["items"];
  // Boolean 
  useEffect(() => {
    //Runs only on the first render
    // let URL = `https://jsonplaceholder.typicode.com/users`
    // axios({
    //   method: 'get',
    //   headers: { 'Content-Type': 'application/json' },
    //   url: URL,
    // }).then(function (response) {
    //   console.log('this is Response', response.data)
    //   setRamModule(response.data);
    // })
    //   .catch((e) => {
    //     console.log('ALDR error', e);
    //   });
    // setRamModule(response.data);
    // setRamModule(userItems)
    // console.log("Exucute useEffect1");
  }, []);
  
  useEffect(() => {
    if (ramValue != "" && access != '') {
      const index = selectedramModule.indexOf(ramValue);
      const writeIndex = selectedWriteRamModule.indexOf(ramValue)
      if (index < 0 ) {
        setSelectedRamModule(current => [...current, ramValue]);
      } else if(writeIndex<0) {
        setselectedWriteRamModule(current => [...current, ramValue])
      }
    }
  }, [ramValue, access]);
  useEffect(() => {
    if (currentTabIndex == 1 || currentTabIndex == 2) {
      setEnableOnIndex(true)
    }
    else {
      setEnableOnIndex(false)
    }
    setIsDeleteEnabled((currentTabIndex == 1 || currentTabIndex == 0) ? true : false)
    setIsSaveEnabled((currentTabIndex == 2) ? true : false)
    setUserId('')
    setUserName('')
    setLocation('')
    setRamValue('')
    setSelectedRamModule([])
    SetAccess([])
    setHertzUserid('')
    setDepartment('')
    setRamModule([])
    setselectedWriteRamModule([])
  }, [currentTabIndex])
  useEffect(() => {
    console.log("newitems before: " + selectedramModule);
    // newitems = selectedramModule;
  }, [selectedramModule]);
  const handleSubmit = (event) => {
    console.log(`
        UserID: ${userid}
        User Name: ${username}
        ramModule: ${ramValue}
        Location: ${location}
        hertzuserid:${hertzuserid}
    department:${department}
      `);
    const userData = {
      "UserID": userid,
      "User Name": username,
      "ramModule": ramValue,
      "Location": location,
      "hertzuserid": hertzuserid,
      "department": department
    }
    // const URL = `https://jsonplaceholder.typicode.com/users`;
    // const request = axios.post(URL, userData, {
    //   headers: { "Content-Type": "text/plain" }
    // })
    // request.then(response => {
    //   if (response.data.status !== 'Error') {
    //   } else {
    //   }
    // })
  }
  const handleRemove = (e) => {
    const index = selectedramModule.indexOf(e);
    if (index > -1) { // only splice array when item is found
      let itemArr = selectedramModule.filter(a => {
        if (a !== e) {
          return a
        }
      })
      console.log("item array", itemArr)
      let data1 = itemArr.filter(e => e)
      setSelectedRamModule(data1);
    }
  }
  const handleModifyValidation = (e) => {
    if (userid.length != 0 && username.length != 0 && hertzuserid.length != 0) {
      // const user1Found = userItems.find(user => ((user.ramuserid == userid) && (user.username == username) && (user.hertzuserid == hertzuserid)));
      const user1Found = userItems.find(user => ((user.username == username) && (user.hertzuserid == hertzuserid)));
      setRamModule(user1Found)
      setDepartment(user1Found.department)
      setLocation(user1Found.location)
      if (user1Found) {
        setEnableOnIndex(false)
        setIsUserExisted(true);
        setTimeout(
          () => setIsUserExisted(false),
          6000
        );
      }
    }
  }
  function App() {
    return (
      <React.Fragment>
        <Tabs value={currentTabIndex} onChange={handleTabChange}>
          <Tab label='Add' />
          <Tab label='Modify' />
          <Tab label='Delete' />
        </Tabs>
      </React.Fragment>
    );
  }
  const handleTabChange = (e, tabIndex) => {
    console.log(tabIndex);
    setCurrentTabIndex(tabIndex);
  };
  return (
    <>
      {/* <div>
    <App/>
    </div> */}
      {((currentTabIndex === 0) || (currentTabIndex === 1) || (currentTabIndex === 2)) && (
        <form onSubmit={handleSubmit}>
          <h1>RAM User Details</h1>
          <div class='tabstyle'>
            <App />
          </div>
         
          <label>
            Hertz Userid:
            <input
              name="hertzuserid"
              value={hertzuserid}
              onChange={e => setHertzUserid(e.target.value)}
              onBlur={handleModifyValidation} />
          </label>
          <label>
            UserName:
            <input
              name="username"
              value={username}
              onChange={e => setUserName(e.target.value)}
              onBlur={handleModifyValidation}
              required />
          </label>
          <label>
            Ram Userid:
            <input
              name="userid"
              value={userid}
              onChange={e => setUserId(e.target.value)}
              required
              onBlur={handleModifyValidation} />
            {isUserExisted && (<p>User existed</p>)}
          </label>
          <label>
            Department:
            <input
              name="department"
              value={department}
              onChange={e => setDepartment(e.target.value)}
              disabled={enableOnIndex} />
          </label>
          <label>
            Location:
            <input
              name="location"
              value={location}
              onChange={e => setLocation(e.target.value)}
              required
              disabled={enableOnIndex} />
          </label>
        
          <label>
            Select Ram Module:
            <select
              name="rammodule"
              value={ramValue}
              onChange={e => setRamValue(e.target.value)}
              required
              disabled={enableOnIndex}>
              <option key="">Select Module </option>
              {ramModule.length != 0 && (
                ramModule.rammodule.map((item, index) => (
                  <option key={index} >{item}</option>
                ))
              )}
            </select>
          </label>
          {(selectedramModule.length != 0 || selectedWriteRamModule.length != 0) && (
            <label class="clearfix">
              Selected Ram Module:
              <div class='scroll ramDiv' style={{ borderStyle: 'inset' }}>
                {selectedramModule.length != 0 &&(
                    <div>
                    {selectedramModule.map((item, index) => (
  
                      <div class="pane" key={index} >
                        {item}
                        <button class='buttonID' key={index} onClick={() => handleRemove(item)} type="button"> </button>
  
                      </div>
                    ))}
                  </div>
                )}
                
                {selectedWriteRamModule.length!=0 &&(
                   <div>
                   {selectedWriteRamModule.map((item, index) => (
 
                   <div class="pane" key={index} >
                     {item}
                     <button class='buttonID' key={index} onClick={() => handleRemove(item)} type="button"> </button>
 
                   </div>
                 ))}
                 </div>
                )}
               
              </div>
              {/* <textarea id="your_textarea"  name="selectedramModule"
                   value={selectedramModule}>
 
             </textarea> */}
            </label>
          )}
          {/* <label>
          <input
            name="acceptedTerms"
            type="checkbox"
            onChange={e => setAcceptedTerms(e.target.value)}
            required />
          I accept the terms of service        
        </label> */}
<label>
            Access Permission:
            <select
              name="access"
              value={access}
              onChange={e => SetAccess(e.target.value)}
              required
              disabled={enableOnIndex}>
              <option key="">Select Access Type</option>
              <option vale="read">Read</option>
              <option value="write">Write</option>
              {/* {ramModule.map(item => (
              <option key={item.address.city} >{item.address.city}</option>
            ))} */}
            </select>
          </label>
          <div class="flex-container">
            <button class="buttonBasic" disabled={currentTabIndex == 2 || (userid.length == 0 || username.length == 0 || location.length == 0 || ramValue.length == 0)} onClick={() => handleSubmit(Event)}>Save</button>
            {/* <button class="buttonBasic" disabled={!modifyEnable}>Modify</button> */}
            <button disabled={isDeleteEnabled} class="buttonBasic">Delete</button>
          </div>
        </form>
      )
      }
      {/* <table>
        <tr>
        <th>UserId</th>
        <th>UserName</th>
        <th>Location</th>
        <th>Selected Ram Module</th>
        <th></th>
        </tr>
        <tr>
        </tr>
       
      </table> */}
    </>
  );
}
