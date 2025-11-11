import React, { useState } from "react";
import { Box, Typography, Checkbox, FormControlLabel } from "@mui/material";
import ChatInput from "../../components/ui/ChatInput/ChatInput";
import PipelineSelector from "../../components/ui/PipelineSelector/PipelineSelector";
import DocumentList from "../../components/ui/DocumentList/DocumentList";
import styles from "./TalkToDocument.module.scss";

const TalkToDocument: React.FC = () => {
  const [message, setMessage] = useState("");
  const [pipeline, setPipeline] = useState("");
  const documents = ["Document 1", "Document 2", "Document 3"];

  const handleSend = () => console.log("Message:", message);
  const handleCreatePipeline = () => console.log("Create pipeline clicked");
  const handleEditDoc = (doc: string) => console.log("Edit:", doc);
  const handleDeleteDoc = (doc: string) => console.log("Delete:", doc);

  return (
    <Box className={styles.container}>
      <Box className={styles.mainContent}>
        <Typography variant="h5" className={styles.title}>Talk to document</Typography>
        {/* <FormControlLabel control={<Checkbox />} label="Experimentation" /> */}

        <Box className={styles.botSection}>
          <img src="/assets/banking-bot.svg" alt="Banking bot" className={styles.botImage} />
          <Typography variant="h6" className={styles.botTitle}>Banking bot</Typography>
          <Typography className={styles.botSubtitle}>
            Experiment with your bot – Your smart banking assistant! Ask me anything.
          </Typography>
        </Box>

        <ChatInput value={message} onChange={setMessage} onSend={handleSend} />
      </Box>

      <Box className={styles.rightPanel}>
        <PipelineSelector
          options={["Pipeline 1", "Pipeline 2"]}
          selected={pipeline}
          onSelect={setPipeline}
          onCreate={handleCreatePipeline}
        />
        <DocumentList documents={documents} onEdit={handleEditDoc} onDelete={handleDeleteDoc} />
      </Box>
    </Box>
  );
};

export default TalkToDocument;