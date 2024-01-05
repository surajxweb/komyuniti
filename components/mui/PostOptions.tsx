"use client";

import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { purple, grey } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { SlOptions } from "react-icons/sl";
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal';
import styles from "./Mui.module.css";
import { deleteAPost } from "@/lib/actions/post.actions";
import { usePathname } from "next/navigation";

export default function ModifiedMenu({ postId }: { postId: string }) {
  const [open, setOpen] = React.useState(false);
  const [isloading, setIsLoading] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [anchorElement, setAnchorElement] = React.useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorElement);

  const path = usePathname();

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElement(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorElement(null);
  };

  const handleOpeningModel = () => {
    handleOpen(); // Call the common function
    handleCloseMenu(); // Call the common function
  };

  const  deleteKaro = async () => {
    setIsLoading(true);

    await deleteAPost({
      postId : postId,
      path: path,
    });

    



    setIsLoading(false);
    handleClose(); 
    handleCloseMenu();
    
  };

  const modifiedTheme = createTheme({
    typography: {
      fontFamily: ["inherit"].join(","),
    },
    palette: {
      primary: grey,
      secondary: purple,
    },
  });

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: 600,
    minWidth: 300,
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    p: 4,
  };

  

  return (
    <>
      <ThemeProvider theme={modifiedTheme}>
        <Button
          id="custom-button"
          aria-controls={isOpen ? "custom-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={isOpen ? "true" : undefined}
          onClick={handleButtonClick}
        >
          <SlOptions size="1.5em" />
        </Button>
        <Menu
          id="custom-menu"
          anchorEl={anchorElement}
          open={isOpen}
          onClose={handleCloseMenu}
          MenuListProps={{
            "aria-labelledby": "custom-button",
          }}
        >
          {/* <MenuItem onClick={handleCloseMenu}>Edit Post</MenuItem> */}
          <MenuItem onClick={handleOpeningModel}>Delete Post </MenuItem>
        </Menu>
        <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <h3 className={styles.modalTitle}  id="modal-modal-title">
                    Are you sure you want to delete the post?
                  </h3>
                  {/* <div className={styles.modalDes} id="modal-modal-description">
                    This cannot be undone.
                  </div> */}
                  <div className={styles.deleteButtons}>
                    <button onClick={deleteKaro} className={styles.yesButton}>
                      Yes
                    </button>
                    <button onClick={handleClose} className={styles.noButton}>
                      No
                    </button>
                  </div>
                </Box>
              </Modal>
      </ThemeProvider>
    </>
  );
}
