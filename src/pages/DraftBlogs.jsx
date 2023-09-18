import React, { useEffect, useState } from "react";
import { Avatar, Box, Button, Grid, Paper, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import useDataCall from "../hooks/useDataCall";
import { useNavigate } from "react-router";
import DraftBlogModal from "../components/DraftBlogModal";
import { useSelector } from "react-redux";

const DraftBlogs = () => {
  const { getDrafts } = useDataCall();
  const [open, setOpen] = React.useState(false);
  const [info, setInfo] = useState({});
  const [newData, setNewData] = useState();
  const{userId}=useSelector((state)=>state.auth)
  const{draft}=useSelector((state)=>state.blogs)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  useEffect(() => {
    getDrafts(userId)
  }, []);

  const postDraft = (item, index) => {
    console.log(item);
    // postData("blogs", "", info);
    // getData("blogs");
  };

  return (
    <Box container height={"100vh"} sx={{pt:"5rem", backgroundColor:"rgb(247, 253, 255)"}}>
      {draft?.length < 1 ? (
        <>
          <Typography
            sx={{
              color: "#4682A9",
              fontSize: "30px",
              fontWeight: "600",
              textAlign: "center",
              mt: "1rem",
            }}
          >
            You have no draft.
          </Typography>{" "}
          <br />
          <Typography
            sx={{
              color: "#4682A9",
              fontSize: "30px",
              fontWeight: "600",
              textAlign: "center",
              mt: "1rem",
              cursor: "pointer",
              "&:hover": { color: "red" },
            }}
            onClick={() => navigate("/new-blog")}
          >
            Let's have one!
          </Typography>
        </>
      ) : (
        <Grid container>
          {draft?.map((item, index) => (
            <Grid
              item
              key={index}
              xs={12}
              sm={4}
              md={3}
              sx={{
                minWidth: "320px",
                height: "500px",
                padding: "1rem",
                m: "auto",
              }}
            >
              <Paper
                elevation={3}
                sx={{
                  color: "black",
                  "&:hover": { backgroundColor: "#eef8fa" },
                  transition: "0.3s",
                  backgroundColor: "white",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Box height={"200px"} padding={"0.5rem"} textAlign={"center"}>
                  <img
                    alt={item?.title}
                    src={item?.image}
                    height={"180px"}
                    style={{
                      borderRadius: "1rem",
                      aspectRatio: "4/3",
                      objectFit: "contain",
                    }}
                  />
                </Box>

                <Typography
                  component={"h4"}
                  variant="h5"
                  fontWeight={"600"}
                  sx={{ textAlign: "center" }}
                >
                  {item?.title}
                </Typography>

                {/* Content Text */}
                <Box padding={"0.5rem"}>
                  <Typography
                    height={"80px"}
                    textOverflow="ellipsis"
                    sx={{ overflow: "hidden", whiteSpace: "pre" }}
                  >
                    {item.content}
                  </Typography>
                </Box>
                {/* Content User Info */}
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  padding={"0.5rem"}
                  gap="10px"
                >
                  <Avatar>
                    <AccountCircleIcon />
                  </Avatar>
                  <Button onClick={() => postDraft(item, index)}>
                    Publish
                  </Button>
                  <Button onClick={handleOpen}>Edit</Button>

                  <DraftBlogModal
                    handleOpen={handleOpen}
                    handleClose={handleClose}
                    open={open}
                    newData={newData}
                    setNewData={setNewData}
                    index={index}
                    info={info}
                    setInfo={setInfo}
                  />
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default DraftBlogs;
