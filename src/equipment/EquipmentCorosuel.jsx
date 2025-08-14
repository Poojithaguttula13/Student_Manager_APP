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
  
} from "@mui/material";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GridMoreVertIcon } from "@mui/x-data-grid";


export default function EquipmentCorosuel({ header, table, filter }) {
  const [cardsData, setCardsData] = useState([]);
  const [equipment, setEquipment] = useState([]);



  useEffect(() => {
    axios.get("http://localhost:3000/cards")
      .then((res) => {
        setCardsData(res.data);
        setEquipment(res.data);
      })
      .catch((err) => console.error("Error fetching cards:", err));
  }, []);



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
            color:"white"
         }}
        >

          <Box sx={{ p: 2 }}>
            <Box display="flex" justifyContent="space-between">
              <CardMedia 
              component="img"
              image={card?.image || "/src/assets/threadmill.avif"}
              alt="image"
                style={{ width: "70px", height: "70px", objectFit: "contain" }}/>
              
              {/* <img
                src="../assets/threadmill.jpg"
                
              /> */}
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
            </Typography>

            <Box sx={{  my: 1 }} />

            <Typography variant="body2" >
              Reason&nbsp;
              <strong >{card.reason}</strong>
            </Typography>

            <Typography variant="body2" sx={{  mt: 0.5 }}>
              Maintenance Status&nbsp;
                  <Chip
                  label={card.maintenanceStatus}
                  sx={{
                    // backgroundColor: "#FFD700",
                    color: "#FFD700",
                    mt: 1
                  }}
                />
                      </Typography>
          </Box>
          </Card>
           </Box>

        ))}
      </Slider>

    <Box>
      {filter}
    </Box>

    <Box>
        {table}
      </Box>
    </Box>

    </>
  );
}
