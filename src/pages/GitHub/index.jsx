import { useState, useContext } from "react";
import { Box } from "@mui/material";
import axios from "axios";
import { UserContext } from "../../context/UserContext";

const GitHub = () => {
  const { saveUser } = useContext(UserContext);

  const [code, setCode] = useState(location.search.split("=")[1]);

  const getTokenGitHub = async () => {
    const response = await axios.post(
      "http://127.0.0.1:9000/user/callback?code=" + code
    );

    console.log(response.data);

    saveUser(response.data);
  };

  return (
    <Box>
      <h1>Code {code}</h1>
      <button onClick={getTokenGitHub}>Generate acces token</button>
    </Box>
  );
};

export default GitHub;
