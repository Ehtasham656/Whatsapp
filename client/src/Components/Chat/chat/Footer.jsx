import { Box, InputBase, styled } from "@mui/material";
import { useEffect, useState } from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import { uploadFile } from "../../../Service/api";

const Container = styled(Box)`
  height: 55px;
  background: #ededed;
  display: flex;
  width: 100%;
  align-items: center;
  padding: 0 15px;
  & > * {
    margin: 5px;
    color: #919191;
  }
`;

const Search = styled(Box)`
  background-color: #ffffff;
  border-radius: 15px;
  width: calc(94% - 100px); /* Corrected spacing */
  display: flex;
  align-items: center;
  padding: 5px;
`;

const InputType = styled(InputBase)`
  width: 100%;
  padding-left: 20px;
`;

const ClipIcon = styled(AttachFileIcon)`
  transform: rotate(40deg);
`;

const Footer = ({ sendText, setValue, value, file, setFile, setImage }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        setLoading(true);
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        try {
          const response = await uploadFile(data);
          if (response.data) {
            console.log("File uploaded successfully:", response.data.imageUrl);
            const cleanImageUrl = response.data.imageUrl.replace(/\s+/g, "%20");
            console.log("clean url", cleanImageUrl);

            setImage(cleanImageUrl);
          } else {
            console.error("Unexpected response format:", response);
          }
        } catch (error) {
          console.error("Error uploading file:", error.message);
        } finally {
          setLoading(false);
        }
      }
    };
    getImage();
  }, [file]);

  const onFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      console.log("Selected file:", selectedFile);
      setFile(selectedFile);
      setValue(selectedFile.name);
    }
  };

  return (
    <Container>
      <InsertEmoticonIcon />
      <label htmlFor="fileInput" aria-label="Attach File">
        <ClipIcon />
      </label>
      <input
        id="fileInput"
        type="file"
        style={{ display: "none" }}
        onChange={onFileChange}
      />
      <Search>
        <InputType
          placeholder="Type a message"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={sendText}
        />
      </Search>
      {loading && <div>Uploading...</div>}
      <KeyboardVoiceIcon />
    </Container>
  );
};

export default Footer;
