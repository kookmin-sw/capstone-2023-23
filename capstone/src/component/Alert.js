import React from "react";
import { Stack, Box } from "@mui/material";
import styled from "styled-components";

const Alerts = styled.div`
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 1rem;
  line-height: 1.5;
  border: 1px solid lightgray;
  background-color: #fff;
  &:hover {
    background-color: lightgray;
    color: white;
  }
  display: flex;
`;

const PhotoSpace = styled.div`
  background-color: #006750;
  padding: 0.2rem;
  margin: 0.2rem;
`;

const ContentSpace = styled.div`
  background-color: #007860;
  padding: 0.2rem;
  margin: 0.2rem;
`;

export default function Alert() {
  return (
    <Box
      sx={{
        width: "300px",
        margin: "5rem",
        padding: "1rem",
        backgroundColor: "#cacaca",
        boxShadow: "10px 10px 15px 10px lightgray",
        borderRadius: "1rem",
        border: "1px solid lightgray",
      }}
    >
      <div>알림</div>
      <Stack spacing={2} overflow="hidden" height={"300px"}>
        <Alerts>
          <PhotoSpace>PHOTO</PhotoSpace>
          <ContentSpace>Where you write Event</ContentSpace>
        </Alerts>
        <Alerts>
          <PhotoSpace>PHOTO</PhotoSpace>
          <ContentSpace>Where you write Event</ContentSpace>
        </Alerts>
        <Alerts>
          <PhotoSpace>PHOTO</PhotoSpace>
          <ContentSpace>Where you write Event</ContentSpace>
        </Alerts>
        <Alerts>
          <PhotoSpace>PHOTO</PhotoSpace>
          <ContentSpace>Where you write Event</ContentSpace>
        </Alerts>
        <Alerts>
          <PhotoSpace>PHOTO</PhotoSpace>
          <ContentSpace>Where you write Event</ContentSpace>
        </Alerts>
      </Stack>
    </Box>
  );
}
