import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Container,
  Collapse,
  Card,
  CardContent,
  Chip,
  CardMedia,
  IconButton,
  
} from "@mui/material";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GridMoreVertIcon } from "@mui/x-data-grid";
// import soulcycle from "../assets/soulcycle.jpg"
// import threadmillImg from "../assets/threadmill.avif";



export default function EquipmentCorosuel({ header, table, filter }) {
  const [cardsData, setCardsData] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);



  useEffect(() => {
    axios.get("http://localhost:3000/cards")
      .then((res) => {
        setCardsData(res.data);
        setEquipment(res.data);
      })
      .catch((err) => console.error("Error fetching cards:", err));
  }, []);


  const handleMenuOpen = (event, card) => {
    setAnchorEl(event.currentTarget);
    setSelectedCard(card);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedCard(null);
  };


  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <>
    <Box>{header}</Box>
    <Box sx={{  minHeight: "100vh", flexWrap:"wrap", padding: 4 }}>
      {/* Carousel */}
      <Slider {...sliderSettings}>
        {cardsData.map((card) => (


          <Box key={card.id} sx={{ paddingRight: "25px" }} > 
          <Card
          key={card.id}
          sx={{
            borderRadius: "8px",
            position: "relative",
            bgcolor:"black",
            color:"white",
            // width: 320,   // 🔹 Increase card width
    height: 230,
         }}
        >

          <Box sx={{ p: 2 }}>
                          {/* Top Row (3 dots in top-right) */}



<Box display="flex" alignItems="flex-start" justifyContent="space-between">
  {/* LEFT SIDE - IMAGE */}
  <CardMedia
    component="img"
    image={card?.image }
    alt="image"
    style={{ width: "110px", height: "120px", objectFit: "contain" }}
  />

  {/* RIGHT SIDE - STATUS + TEXT */}
  <Box ml={3} mt={1} flex={1}>
  <Box display="flex" justifyContent="flex-end">
                <IconButton
                  // onClick={(e) => handleMenuOpen(e, card)}
                  sx={{ color: "white", p: 0 }}
                >
                  <GridMoreVertIcon />
                </IconButton>
              </Box>
    <Chip
      label={card.status}
      size="small"
      sx={{
        backgroundColor: "transparent",
        border: "1px solid red",
        color: "red",
        fontSize: "0.7rem",
        height: "20px",
        mb: 1,
      }}
    />
    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
      {card.title}
    </Typography>
    <Typography  sx={{fontWeight:"small", fontSize:"13px"}}>
      Device Quantity&nbsp;
      <span>{card.deviceQuantity}</span>
    </Typography>
    </Box>
    </Box>


            <Box sx={{ borderBottom: "1px solid grey", mb: 2, mt: 1 }} />

            <Typography variant="body2" >
              Reason&nbsp;
              <strong >{card.reason}</strong>
            </Typography>

            <Typography variant="body2" sx={{  mt: 0.5 }}>
              Maintenance Status&nbsp;
                  <Chip
                  label={card.maintenanceStatus}
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "transparent",
                    color: "#FFD700",
                  }}
                />
                      </Typography>
          </Box>
          </Card>
           </Box>

        ))}
      </Slider>

    <Box sx={{  mt: 2 }}>
      {filter}
    </Box>

    <Box>
        {table}
      </Box>
    </Box>

    </>
  );
}




            {/* <Box display="flex" justifyContent="space-between">
              <CardMedia 
              component="img"
              image={card?.image || threadmillImg }
              alt="image"
                style={{ width: "70px", height: "70px", objectFit: "contain" }}
                />
              <Chip
                label={card.status}
                size="small"
                sx={{
                  backgroundColor: "transparent",
                  border: "1px solid red",
                  color: "red",
                  fontSize: "0.7rem",
                  height: "20px",
                  mt: 1,
                }}
              />
              <GridMoreVertIcon sx={{  fontSize: "1.2rem" }} />
            </Box>

            <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: "bold" }}>
              {card.title}
            </Typography>
            <Typography variant="body2" >
              Device Quantity&nbsp;
              <span >{card.deviceQuantity}</span>
            </Typography> */}