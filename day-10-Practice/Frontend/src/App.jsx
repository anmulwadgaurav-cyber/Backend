import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [profiles, setProfiles] = useState([]);
  const [updateDataApi, setUpdateDataApi] = useState({});
  const [nameValue, setNameValue] = useState("");
  const [ageValue, setAgeValue] = useState("");
  const [skillValue, setSkillValue] = useState("");

  async function render() {
    let res = await axios.get("https://backend-ldmo.onrender.com/api/profile");
    setProfiles(res.data.fetchedProfiles);
    console.log(res.data.fetchedProfiles);
  }

  async function deleteProfile(profileId) {
    let res = await axios.delete(
      "https://backend-ldmo.onrender.com/api/profile/" + profileId,
    );
    render();
  }

  useEffect(() => {
    render();
  }, []);

  async function submitHandler(e) {
    e.preventDefault();

    let action = e.nativeEvent.submitter.value; //ye batata hai ki form button ki current value kya hai

    if (action === "Create") {
      let res = await axios.post(
        "https://backend-ldmo.onrender.com/api/profile",
        {
          username: nameValue,
          age: Number(ageValue),
          skills: skillValue.toUpperCase(),
        },
      );
    } else if (action === "Edit") {
      if (nameValue === "" && ageValue === "" && skillvalue === "") return;
      updateProfileData();
      render();
    }
    render();
    setNameValue("");
    setAgeValue("");
    setSkillValue("");
  }

  //update profile data

  const updateProfileData = async () => {
    let res = await axios.patch(
      "https://backend-ldmo.onrender.com/api/profile/" + updateDataApi._id,
      {
        username: nameValue,
        age: Number(ageValue),
        skills: skillValue.toUpperCase(),
      },
    );
    console.log(res);

    let { age, skills, username } = res.data.updateDetails;
    setProfiles((prev) => {
      return prev.map((profile) => {
        return profile._id === updateDataApi._id
          ? { ...profile, age, skills, username }
          : profile;
      });
    });
    setUpdateDataApi({}); //kyonki button tabhi switch honge ja ye object empty hoga
  };

  const handleUpdateProfile = (profile) => setUpdateDataApi(profile);

  let isEmpty = Object.keys(updateDataApi).length === 0;

  useEffect(() => {
    updateDataApi &&
      (setNameValue(updateDataApi.username),
      setAgeValue(updateDataApi.age),
      setSkillValue(updateDataApi.skills));
  }, [updateDataApi]);

  return (
    <div className="bg-[#1e1e1e] h-screen w-screen font-[main]">
      <form
        className="h-20 w-full bg-[#2e2e2e] p-5 flex gap-2"
        onSubmit={submitHandler}
      >
        <input
          type="text"
          value={nameValue}
          onChange={(e) => {
            setNameValue(e.target.value);
          }}
          placeholder="Enter Name"
          className="border p-2 text-white rounded-md outline-none"
        />
        <input
          type="number"
          value={ageValue}
          onChange={(e) => {
            setAgeValue(e.target.value);
          }}
          placeholder="Enter Age"
          className="border p-2 text-white rounded-md outline-none"
        />
        <input
          type="text"
          value={skillValue}
          onChange={(e) => {
            setSkillValue(e.target.value);
          }}
          placeholder="Enter Skill"
          className="border p-2 text-white rounded-md outline-none"
        />
        <button
          type="submit"
          value={isEmpty ? "Create" : "Edit"}
          className="bg-blue-500 px-5 text-white font-medium rounded-md cursor-pointer"
        >
          {isEmpty ? "Create" : "Edit"}
        </button>
      </form>
      <div className="flex p-5 gap-4 flex-wrap justify-start">
        {profiles.map((profile) => {
          const { _id, username, age, skills } = profile;
          return (
            <div
              key={_id}
              className="bg-[#2e2e2e] flex flex-col gap-4 w-130 rounded-md p-5 justify-center"
            >
              <h1 className="text-white text-3xl">{username}</h1>
              <p className="text-white rounded-full bg-[#3e3e3e] py-2 px-5 w-fit flex justify-center items-center">
                {age}
              </p>
              <p className="text-blue-500 py-2 px-5 border w-fit flex justify-center items-center rounded-full">
                {skills}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => deleteProfile(profile._id)}
                  className="py-2 px-5 border text-red-500 border-red-500 w-fit rounded-full cursor-pointer"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleUpdateProfile(profile)}
                  className="py-2 px-5 border text-green-500 border-green-500 w-fit rounded-full cursor-pointer"
                >
                  Edit
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
