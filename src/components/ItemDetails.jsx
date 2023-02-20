import { Box, Button, IconButton, Typography, Badge } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../theme";
import { addToCart } from "../state";
import { useDispatch } from "react-redux";
import { encode as btoa } from "base-64";
import Item from "./Item";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import { setIsCartOpen } from "../state";
// import { Link } from "react-router-dom";
import Jklog from "../logo/jklogo.png";
import { useSelector } from "react-redux";
import {
  PersonOutline,
  ShoppingBagOutlined,
  MenuOutlined,
} from "@mui/icons-material";
import { useTheme } from "@emotion/react";
//import axios from "axios";

const ItemDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cart);
  //const { itemId } = useParams();
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const [value, setValue] = useState("description");
  const [count, setCount] = useState(1);
  const [item, setItem] = useState([]);

  //   const [items, setItems] = useState([]);
  const [i, setId] = useState();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const {
    palette: { neutral },
  } = useTheme();
  const getData = async () => {
    try {
      await fetch(`http://localhost:3000/item/${params.itemId}`);
      setId(params.itemId);
    } catch (err) {
      console.log(err, "this is error");
    }
  };

  const updateditem = item.filter((d) => {
    // eslint-disable-next-line
    return d.id == i;
  });

  useEffect(() => {
    async function getItems() {
      try {
        var headers = new Headers();
        headers.append(
          "Authorization",
          "Basic " + btoa(process.env.REACT_APP_API_KEY)
        );
        const result = await fetch("http://localhost:5000/products.json", {
          headers: headers,
        });
        const itemJson = await result.json();
        console.log(itemJson);
        setItem(itemJson.products);
        setLoading(false);
      } catch (err) {
        console.log(err, "this is error");
      }
    }
    getData();
    getItems();
    // eslint-disable-next-line
  }, [params.itemId]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {updateditem.map((updateditem, index) => (
            <Box width="80%" m="80px auto" key={updateditem.id}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                //flexWrap="wrap"
                width="100%"
                height="80px"
                // backgroundColor="rgba(255, 255, 255, 0.95)"
                backgroundColor="rgb(255 246 222)"
                color="black"
                position="fixed"
                top="0"
                left="0"
                zIndex="1"
              >
                <Box
                  width="80%"
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

                  <Box
                    display="flex"
                    justifyContent="space-between"
                    columnGap="20px"
                    //flexWrap="wrap"
                    zIndex="2"
                  >
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

              <Box display="flex" flexWrap="wrap" columnGap="40px">
                {/* IMAGES */}

                <Box flex="1 1 40%" mb="40px">
                  <img
                    alt={updateditem?.title}
                    width="100%"
                    height="50%"
                    src={updateditem.image?.src}
                    style={{ objectFit: "contain" }}
                  />
                </Box>

                {/* ACTIONS */}
                <Box flex="1 1 50%" mb="40px">
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    fontSize="16px"
                  >
                    <Box>Home/Item</Box>
                    <Box>Prev Next</Box>
                  </Box>

                  <Box m="65px 0 25px 0">
                    <Typography variant="h2">{updateditem?.title}</Typography>

                    <Typography
                      sx={{ mt: "20px" }}
                      fontSize="16px"
                      dangerouslySetInnerHTML={{
                        __html: updateditem.body_html,
                      }}
                    >
                      {/* {item?.attributes?.longDescription} */}
                    </Typography>
                  </Box>

                  <Box display="flex" alignItems="center" minHeight="50px">
                    <Box
                      display="flex"
                      alignItems="center"
                      border={`1.5px solid ${shades.neutral[300]}`}
                      mr="20px"
                      p="2px 5px"
                    >
                      <IconButton
                        onClick={() => setCount(Math.max(count - 1, 0))}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography sx={{ p: "0 5px" }}>{count}</Typography>
                      <IconButton onClick={() => setCount(count + 1)}>
                        <AddIcon />
                      </IconButton>
                    </Box>
                    <Button
                      sx={{
                        backgroundColor: "#222222",
                        color: "white",
                        borderRadius: 0,
                        minWidth: "150px",
                        padding: "10px 40px",
                      }}
                      onClick={() =>
                        dispatch(addToCart({ item: { ...updateditem, count } }))
                      }
                    >
                      ADD TO CART
                    </Button>
                  </Box>
                  <Box>
                    <Box m="20px 0 5px 0" display="flex">
                      <FavoriteBorderOutlinedIcon />
                      <Typography sx={{ ml: "5px" }} fontSize="11px">
                        ADD TO WISHLIST
                      </Typography>
                    </Box>
                    <Typography fontSize="16px">
                      CATEGORIES: {updateditem.tags}
                    </Typography>
                    <Typography alignItems="flex-end" fontSize="16px">
                      PRICE - ${updateditem?.variants[0].price}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* INFORMATION */}
              <Box m="20px 0">
                <Tabs value={value} onChange={handleChange}>
                  <Tab label="DESCRIPTION" value="description" />
                  <Tab label="REVIEWS" value="reviews" />
                </Tabs>
              </Box>
              
              <Box display="flex" flexWrap="wrap" gap="15px">


                {/* {value === "description" && (
                  //   <div>{item?.attributes?.longDescription}</div>
                  )} */}


                {value === "reviews" && <div>reviews</div>}
              </Box>

              {/* RELATED ITEMS */}

              {/*    display="grid"
        gridTemplateColumns="repeat(auto-fill, 300px)"
        justifyContent="space-around"
        rowGap="20px"
        columnGap="1.33%" */}
              <Box mt="50px" width="100%">
                <Typography variant="h2" fontWeight="bold">
                  Related Products
                </Typography>
                <Box
                  mt="5px"
                  display="flex"
                  flexWrap="wrap"
                  columnGap="1.33%"
                  justifyContent="space-between"
                >
                  {item.slice(31, 35).map((item, i) => (
                    <Item item={item} key={`${item.title}-${item.id}`} />
                  ))}
                </Box>
              </Box>
            </Box>
          ))}
        </>
      )}
    </>
  );
};

export default ItemDetails;


//git config --global user.name "yogesh_jaiinfoway"
//git config --global user.email "yogesh@jaiinfoway.com"
