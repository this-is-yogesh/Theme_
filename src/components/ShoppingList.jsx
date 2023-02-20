import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Item from "../components/Item";
import { Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch } from "react-redux";
import { setItems } from "../state";
import { encode as btoa } from "base-64";
import CircularProgress from "@mui/material/CircularProgress";
//import { ContactPageSharp } from "@mui/icons-material";
//import { useSelector } from "react-redux";

const ShoppingList = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("all");
  //const items = useSelector((state) => state.cart.item);
  const breakPoint = useMediaQuery("(min-width:600px)");
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  async function getItems() {
    try {
      var headers = new Headers();
      headers.append(
        "Authorization",
        "Basic " +
          btoa(
            process.env.REACT_APP_API_KEY
          )
      );
      const result = await fetch("http://localhost:5000/products.json", {
        headers: headers,
      });
      const resp = await result.json();
      setItem(resp.products);
      dispatch(setItems(resp.products));
      setLoading(false);
    } catch (err) {
      console.log(err, "this is error");
      //setLoading(false);
    }
  }

  useEffect(() => {
    getItems();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // const topRatedItems = item.filter((item) => item.tags === "English Books");
  // const newArrivalsItems = item.filter((item) => item.tags === "POS");
  // const bestSellersItems = item.filter((item) => item.tags === "");
  // const swamijikirtans = item.filter((item) => item.tags === "Swamiji Kirtans");
  // const BalMukundBooks = item.filter((item) => item.tags === "BalMukund Books");
  // const EnglishLectures = item.filter(
  //   (item) => item.tags === "English Lectures-Swamiji (Audio)"
  // );

  return (

    <>
    </>
    // <Box width="80%" margin="80px auto" > 
    //   {loading ? (
    //     <CircularProgress color="primary" width="100vh" height="100vh" />
    //   ) : (
    //     <>
    //       <Typography variant="h1" textAlign="center" >
    //         Our Featured <b>Products</b>
    //       </Typography>

    //       {/* <Tabs
    //         textColor="primary"
    //         indicatorColor="primary"
    //         value={value}
    //         onChange={handleChange}
    //         centered
    //         TabIndicatorProps={{
    //           sx: { display: breakPoint ? "block" : "none" }
    //         }}
    //         sx={{
    //           m: "25px",
              
    //           "& .MuiTabs-flexContainer": {
    //             flexWrap: "wrap",
    //           },
    //         }}
    //       >
    //         <Tab label="ALL" value="all" style={{fontSize:"large"}}/>
    //         <Tab label="SWAMIJI KIRTANS" value="swamijikirtans" style={{fontSize:"large"}}/>
    //         <Tab label="ENGLISH BOOKS" value="topRated" style={{fontSize:"large"}}/>
    //         <Tab label="BAL MUKUND BOOKS" value="BalMukundBooks" style={{fontSize:"large"}}/>
    //         <Tab label="ENGLISH LECTURES" value="EnglishLectures" style={{fontSize:"large"}}/>
    //         <Tab label="NEW ARRIVALS" value="newArrivals" style={{fontSize:"large"}}/>
    //         <Tab label="BEST SELLERS" value="bestSellers" style={{fontSize:"large"}}/>
    //       </Tabs> */}

    //       <Box
    //         margin="0 auto"
    //         display="grid"
    //         gridTemplateColumns="repeat(auto-fill, 300px)"
    //         justifyContent="space-around"
    //         rowGap="20px"
    //         columnGap="1.33%"
    //       >
    //         {value === "all" &&
    //           item.map((item) => (
    //             <Item item={item} key={`${item.title}-${item.id}`} />
    //           ))}
    //         {value === "newArrivals" &&
    //           newArrivalsItems.map((item) => (
    //             <Item item={item} key={`${item.title}-${item.id}`} />
    //           ))}
    //         {value === "bestSellers" &&
    //           bestSellersItems.map((item) => (
    //             <Item item={item} key={`${item.title}-${item.id}`} />
    //           ))}
    //         {value === "topRated" &&
    //           topRatedItems.map((item) => (
    //             <Item item={item} key={`${item.title}-${item.id}`} />
    //           ))}
    //         {value === "swamijikirtans" &&
    //           swamijikirtans.map((item) => (
    //             <Item item={item} key={`${item.title}-${item.id}`} />
    //           ))}
    //         {value === "BalMukundBooks" &&
    //           BalMukundBooks.map((item) => (
    //             <Item item={item} key={`${item.title}-${item.id}`} />
    //           ))}
    //         {value === "EnglishLectures" &&
    //           EnglishLectures.map((item) => (
    //             <Item item={item} key={`${item.title}-${item.id}`} />
    //           ))}
    //       </Box>
    //     </>
    //   )}
    // </Box>
  );
};

export default ShoppingList;
