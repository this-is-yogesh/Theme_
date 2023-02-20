import { useDispatch, useSelector } from "react-redux";
import Jklog from "../logo/jklogo.png";
import { Badge, Box, IconButton, Typography } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Item from "../components/Item";
import MainCarousel from "./MainCarousel";
//import { Image, Typography } from "@mui/material";
import {
  PersonOutline,
  ShoppingBagOutlined,
  MenuOutlined,
} from "@mui/icons-material";
//import { SearchOutlined,} from "@mui/icons-material";
//import { useNavigate } from "react-router-dom";
//import { shades } from "../theme";
import { setIsCartOpen } from "../state";
import { useNavigate } from "react-router-dom";
import { encode as btoa } from "base-64";
import { setItems } from "../state";
import React, { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const [item, setItem] = useState([]);
  const [value, setValue] = useState("All");
  const breakPoint = useMediaQuery("(min-width:600px)");

  async function getItems() {
    try {
      var headers = new Headers();
      headers.append(
        "Authorization",
        "Basic " + btoa("0606ded7fe76f5359b6c3aa895095394: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")
      );
      const result = await fetch("http://localhost:5000/products.json",{
       headers:headers
      })
      const resp = await result.json();
      console.log(resp,"response")
      setItem(resp.products);
      dispatch(setItems(resp.products));
      //setLoading(false);
    } catch (err) {
      console.log(err, "this is error");
      //setLoading(false);
    }
  }

  useEffect(() => {
    getItems();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const topRatedItems = item.filter((item) => item.tags === "English Books");
  const newArrivalsItems = item.filter((item) => item.tags === "POS");
  const bestSellersItems = item.filter((item) => item.tags === "");
  const swamijikirtans = item.filter((item) => item.tags === "Swamiji Kirtans");
  const BalMukundBooks = item.filter((item) => item.tags === "BalMukund Books");
  const EnglishLectures = item.filter(
    (item) => item.tags === "English Lectures-Swamiji (Audio)"
  );
  return (
    <Box width="100%" margin="2px auto"  >
      <Box
        display="flex"
        //alignItems="center"
        justifyContent="center"
        width="100%"
        height="80px"
        //backgroundColor="rgba(255, 255, 255, 0.95)"
        color="black"
        position="fixed"
        top="0"
        left="0"
        zIndex="1"
        //background="linear-gradient(180deg, rgba(247,240,222,1) 0%, rgba(246,235,225,1) 35%, rgba(255,255,255,1) 100%)"
        //  backgroundColor="rgb(255 209 80)"
        backgroundColor="rgb(255 246 222)"
        // webkit-backdrop-filter= "blur(8px)"
        // backdrop-filter= "blur(8px)"
      
      >
        <Box
          width="90%"
          margin="auto"
          height="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <img
            src={Jklog}
            alt="not found"
            style={{ width: "60px", height: "100%", cursor: "pointer" }}
            onClick={() => navigate(`/`)}
          />

          <Tabs
            textColor="red"
            indicatorColor="green"
            value={value}
            onChange={handleChange}
            centered
            TabIndicatorProps={{
              sx: { display: breakPoint ? "block" : "none" , background:"orange"}
            }}
            sx={{
              m: "25px",
             
              "& .MuiTabs-flexContainer": {
                flexWrap: "wrap",
                "& .MuiTab-root.Mui-selected": {
                  color: 'rgb(247 127 16)'
                }
              },
            }}
          >
            <Tab
              label="ALL"
              value="All"
              style={{
                fontSize: "large",
              }}
            />
            <Tab
              label="SWAMIJI KIRTANS"
              value="Swamiji Kirtans"
              style={{
                fontSize: "large",
              }}
            />
            <Tab
              label="ENGLISH BOOKS"
              value="English Books"
              style={{
                fontSize: "large",
              }}
            />
            <Tab
              label="BAL MUKUND BOOKS"
              value="Bal Mukund Books"
              style={{
                fontSize: "large",
              }}
            />
            <Tab
              label="ENGLISH LECTURES"
              value="English Lectures"
              style={{
                fontSize: "large",
              }}
            />
            <Tab
              label="NEW ARRIVALS"
              value="New Arrivals"
              style={{
                fontSize: "large",
              }}
            />
            <Tab
              label="BEST SELLERS"
              value="Best Sellers"
              style={{
                fontSize: "large",
              }}
            />
          </Tabs>
          <Box
            display="flex"
            justifyContent="space-between"
            columnGap="20px"
            zIndex="2"
          >
            {/* <IconButton sx={{ color: "black" }}>
            <ShoppingList name={"hello"}/>
            <SearchOutlined />
          </IconButton>  */}
            <IconButton sx={{ color: "black" }}>
              <PersonOutline />
            </IconButton>
            <Badge
              badgeContent={cart.length}
              color="secondary"
              invisible={cart.length === 0}
              sx={{
                "& .MuiBadge-badge": {
                  right: 5,
                  top: 5,
                  padding: "0 4px",
                  height: "14px",
                  minWidth: "13px",
                },
              }}
            >
              <IconButton
                onClick={() => dispatch(setIsCartOpen({}))}
                sx={{ color: "black" }}
              >
                <ShoppingBagOutlined />
              </IconButton>
            </Badge>
            <IconButton sx={{ color: "black" }}>
              <MenuOutlined />
            </IconButton>
          </Box>
        </Box>
      </Box>
      {value === "All" ? <MainCarousel /> : ""}
      <Typography
        variant="h1"
        textAlign="center"
        padding="50px "
        //color="#ff6d31"
      >
         {value ==="All" ? <b>All Products </b>:<b>{""}</b>}
      </Typography>
      <Box
        margin="20px auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 400px)"
        justifyContent="space-around"
        rowGap="80px"
        columnGap="3.33%"
      >
        {value === "All" &&
          item.map((item) => (
            <Item item={item} key={`${item.title}-${item.id}`} />
          ))}
        {value === "New Arrivals" &&
          newArrivalsItems.map((item) => (
            <Item item={item} key={`${item.title}-${item.id}`} />
          ))}
        {value === "Best Sellers" &&
          bestSellersItems.map((item) => (
            <Item item={item} key={`${item.title}-${item.id}`} />
          ))}
        {value === "English Books" &&
          topRatedItems.map((item) => (
            <Item item={item} key={`${item.title}-${item.id}`} />
          ))}
        {value === "Swamiji Kirtans" &&
          swamijikirtans.map((item) => (
            <Item item={item} key={`${item.title}-${item.id}`} />
          ))}
        {value === "Bal Mukund Books" &&
          BalMukundBooks.map((item) => (
            <Item item={item} key={`${item.title}-${item.id}`} />
          ))}
        {value === "English Lectures" &&
          EnglishLectures.map((item) => (
            <Item item={item} key={`${item.title}-${item.id}`} />
          ))}
      </Box>
    </Box>
  );
}

export default Navbar;
