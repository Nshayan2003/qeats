import React from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useState } from "react";

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "1000px",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const handleSearch = async () => {
    // navigate(`/search?query=${searchQuery}`);
    const response = await axios.get(
      `http://localhost:5000/api/recipes/search?query=${searchQuery}`
    );
  };

  const location = useLocation();

  return (
    <div
      style={{
        backgroundColor: "#008000",
        width: "100%",
        margin: "0",
        borderRadius: "5px",
      }}
    >
      <header className="p-5 flex justify-between">
        <MenuIcon
          style={{
            marginTop: "12px",
            marginLeft: "12px",
            width: "40px",
            height: "40px",
          }}
        />

        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Search>
        <IconButton onClick={handleSearch}>
          <SearchIcon />
        </IconButton>

        <IconButton
          size="large"
          edge="end"
          aria-label="account of the current user"
          aria-haspopup="true"
          color="inherit"
          style={{ display: "none" }}
        >
          <AccountCircle />
        </IconButton>
        <Stack spacing={2} direction="row">
          {location.pathname !== "/register" && (
            <Button
              variant="contained"
              style={{ backgroundColor: "#90EE90", color: "#000" }}
            >
              <Link to={"/register"}>Register now</Link>
            </Button>
          )}
          {location.pathname !== "/login" && (
            <Button
              variant="contained"
              style={{ backgroundColor: "#90EE90", color: "#000" }}
            >
              <Link to={"/login"}>Login</Link>
            </Button>
          )}
        </Stack>
      </header>
    </div>
  );
};

export default Header;
