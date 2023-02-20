import { useState } from "react";
import { useDispatch } from "react-redux";
import { IconButton, Box, Typography, useTheme, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../theme";
import { addToCart } from "../state";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
 import "../App.css";
import Jklog from "../logo/jklogo.png";
const Item = ({ item}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);

  const [isHovered, setIsHovered] = useState(false);
  const {
    palette: { neutral },
  } = useTheme();

  const { tags, variants, title} = item;
  //   const {
  //     data: {
  //       attributes: {
  //         formats: {
  //           medium: { url },
  //         },
  //       },
  //     },
  //   } = image;

  return (
    <Box position="relative" className="container">

      <Box className="card"
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
        sx={{borderRadius:"20px",
        //clipPath: "circle(150px at 80% 20%)";
        // clipPath:"circle(150px at 80% 20%)",
       }}
      >
        <div  className="imgBx" > 
        <img
     
          alt={item.name}
          width="30px"
          height="50px"
          src={item.image?.src}
          onClick={() => navigate(`/item/${item.id}`)}
          style={{ cursor: "pointer" ,position: "relative",
          width:" 340px",
          height: "400px",
          background: "#232323",
         borderRadius:"20px",
         objectFit:"fill",

         boxShadow: "29px 13px 70px 13px rgb(0 36 0 / 52%)",
        //  -moz-box-shadow: "0px 14px 32px 0px rgba(0, 0, 0, 0.15)",
        //  box-shadow: "0px 14px 32px 0px rgba(0, 0, 0, 0.15)",
    
          // overflow: "",
}}
        />
         </div>
        <Box
          display={isHovered ? "block" : "none"}
          position="absolute"
          bottom="22%"
          left="0"
          width="100%"
          padding="0 100px"
        >
          <Box display="flex" justifyContent="space-between">
            <Box className="box1"
              display="flex"
              alignItems="center"
              backgroundColor="#ff6d31"
              borderRadius="3px"
          
            >
              <IconButton onClick={() => setCount(Math.max(count - 1, 1))} color={shades.primary[900]} >
                <RemoveIcon />
              </IconButton>
              <Typography color={shades.primary[900]} ><b> {count}</b></Typography>
              <IconButton onClick={() => setCount(count + 1)} color={shades.primary[900]}>
               <AddIcon />
              </IconButton>
            </Box>
            <Button
              onClick={() => {
                dispatch(addToCart({ item: { ...item, count } }));
              }}
              sx={{ backgroundColor: shades.primary[300], color: "white" }}
            >
              Add to Cart
            </Button>
          </Box>
        </Box>
      </Box>
   
      <Box mt="3px">
        <Typography variant="subtitle2" color={neutral.dark} fontSize="16px">
          {tags
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase())}
        </Typography>
        <Typography fontSize="16px"><b> {title}</b></Typography>
        <Typography fontWeight="bold" fontSize="16px">${variants[0].price}</Typography>
      </Box>
    </Box>
  );
};

export default Item;
