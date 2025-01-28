// import { Box, Typography, styled } from "@mui/material";
// import { format } from "date-fns";
// import { useContext } from "react";
// import { AccountContext } from "../../../Context/AccountProvider";

// const Own = styled(Box)`
//   background: #dcf8c6;
//   max-width: 60%;
//   margin-left: auto;
//   padding: 5px;
//   width: fit-content;
//   display: flex;
//   border-radius: 10px;
//   word-break: break-word;
// `;

// const Wrapper = styled(Box)`
//   background: #ffffff;
//   max-width: 60%;
//   padding: 5px;
//   width: fit-content;
//   display: flex;
//   border-radius: 10px;
//   word-break: break-word;
// `;

// const Text = styled(Typography)`
//   font-size: 14px;
//   padding: 0 25px 0 5px;
// `;

// const Time = styled(Typography)`
//   font-size: 10px;
//   color: #919191;
//   margin-top: auto;
// `;

// const Message = ({ message }) => {
//   const { account } = useContext(AccountContext);

//   const formattedDate = message?.createdAt
//     ? format(new Date(message.createdAt), "dd MMM yyyy, HH:mm")
//     : "Unknown time";

//   return (
//     <>
//       {account.sub === message.senderId ? (
//         <Own sx={{ marginBottom: 2 }}>
//           {message.type === "file" ? (
//             <ImageMessage message={message} formattedDate={formattedDate} />
//           ) : (
//             <TextMessage message={message} formattedDate={formattedDate} />
//           )}
//         </Own>
//       ) : (
//         <Wrapper sx={{ marginBottom: 2 }}>
//           {message.type === "file" ? (
//             <ImageMessage message={message} formattedDate={formattedDate} />
//           ) : (
//             <TextMessage message={message} formattedDate={formattedDate} />
//           )}
//         </Wrapper>
//       )}
//     </>
//   );
// };

// const ImageMessage = ({ message, formattedDate }) => {
//   console.log("message", message);

//   return (
//     <Box>
//       {message.text?.includes(".pdf") ? (
//         <Box>PDF file attached</Box> // Fallback for PDFs
//       ) : (
//         <img
//           style={{
//             width: "100%",
//             maxWidth: 300,
//             height: "auto",
//             objectFit: "cover",
//             borderRadius: "8px",
//           }}
//           src={message.text}
//           alt={message.text || message.file}
//         />
//       )}
//       <Time>{formattedDate}</Time>
//     </Box>
//   );
// };

// const TextMessage = ({ message, formattedDate }) => {
//   return (
//     <>
//       <Text variant="body1" gutterBottom>
//         {message.text || "No message text available"}
//       </Text>
//       <Time>{formattedDate}</Time>
//     </>
//   );
// };

// export default Message;
import { Box, Typography, styled } from "@mui/material";
import { useContext } from "react";
import { AccountContext } from "../../../Context/AccountProvider";
import { getFormattedDate } from "../../../utils/common-utils";

const Own = styled(Box)`
  background: #dcf8c6;
  max-width: 60%;
  margin-left: auto;
  padding: 5px;
  width: fit-content;
  display: flex;
  border-radius: 10px;
  word-break: break-word;
`;

const Wrapper = styled(Box)`
  background: #ffffff;
  max-width: 60%;
  padding: 5px;
  width: fit-content;
  display: flex;
  border-radius: 10px;
  word-break: break-word;
`;

const Text = styled(Typography)`
  font-size: 14px;
  padding: 0 25px 0 5px;
`;

const Time = styled(Typography)`
  font-size: 10px;
  color: #919191;
  margin-top: auto;
`;

const Message = ({ message }) => {
  const { account } = useContext(AccountContext);

  const formattedDate = getFormattedDate(message?.createdAt);

  return (
    <>
      {account.sub === message.senderId ? (
        <Own sx={{ marginBottom: 2 }}>
          {message.type === "file" ? (
            <ImageMessage message={message} formattedDate={formattedDate} />
          ) : (
            <TextMessage message={message} formattedDate={formattedDate} />
          )}
        </Own>
      ) : (
        <Wrapper sx={{ marginBottom: 2 }}>
          {message.type === "file" ? (
            <ImageMessage message={message} formattedDate={formattedDate} />
          ) : (
            <TextMessage message={message} formattedDate={formattedDate} />
          )}
        </Wrapper>
      )}
    </>
  );
};

const ImageMessage = ({ message, formattedDate }) => {
  console.log("message", message);

  return (
    <Box>
      {message.text?.includes(".pdf") ? (
        <Box>PDF file attached</Box> // Fallback for PDFs
      ) : (
        <img
          style={{
            width: "100%",
            maxWidth: 300,
            height: "auto",
            objectFit: "cover",
            borderRadius: "8px",
          }}
          src={message.text}
          alt={message.text || message.file}
        />
      )}
      <Time>{formattedDate}</Time>
    </Box>
  );
};

const TextMessage = ({ message, formattedDate }) => {
  return (
    <>
      <Text variant="body1" gutterBottom>
        {message.text || "No message text available"}
      </Text>
      <Time>{formattedDate}</Time>
    </>
  );
};

export default Message;
