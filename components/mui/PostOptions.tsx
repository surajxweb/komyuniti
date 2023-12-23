"use client";

import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { lime, purple, grey } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AiFillEdit } from "react-icons/ai";
import { SlOptions } from "react-icons/sl";
import { MdDelete } from "react-icons/md";

export default function BasicMenu({ postId }: { postId: string }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const theme = createTheme({
    typography: {
      fontFamily: ["inherit"].join(","),
    },
    palette: {
      primary: grey,
      secondary: purple,
    },
  });

  // custom functions

  return (
    <>
      <ThemeProvider theme={theme}>
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <SlOptions size="1.5em" />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>Edit Post</MenuItem>
          <MenuItem onClick={handleClose}>Delete Post</MenuItem>
          {/* <MenuItem onClick={handleClose}>Logout</MenuItem> */}
        </Menu>
      </ThemeProvider>
    </>
  );
}
