import React from "react";
import styled from "styled-components";
import Slide1 from "../../img/slide1.png";
import Slide2 from "../../img/slide2.png";
import Slide3 from "../../img/slide3.png";
import Slide4 from "../../img/slide4.png";
import Slide5 from "../../img/slide5.png";
import Slide6 from "../../img/slide6.png";
import Slide7 from "../../img/slide7.png";
import Slide8 from "../../img/slide8.png";
import Slide9 from "../../img/slide9.png";
import Slide10 from "../../img/slide10.png";
import Slide11 from "../../img/slide11.png";
import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import { Link } from "react-router-dom";

const Container = styled.div`
    width: 100%;
    text-align: center;
    color: white;
    background-color: #3e4444;
    padding-bottom: 1rem;
`;

const CarouselContainer = styled.div`
    max-width: 1200px;
    min-width: 1069px;
    margin: auto;
    @media (max-width: 768px) {
        min-width: auto;
    }
`;

const Img = styled.img`
    max-width: 250px;
    min-width: 200px;
    padding: 0.1rem;
    @media (max-width: 768px) {
        max-width: 150px;
        min-width: 100px;
    }
`;

const TextDesc = styled.div`
    font-size: 1rem;
    max-width: 1200px;
    margin: auto;
    padding-bottom: 1rem;
    color: white;
`;

const TextTitle = styled.div`
    font-size: 2rem;
    padding: 0rem 0 1rem;
    color: white;
`;

const Gallery = () => {
    return (
        <Container>
            <Link style={{ textDecoration: "none" }} to="/galeria">
                <TextTitle>Galeria</TextTitle>
            </Link>
            <TextDesc>
                Nastąpiła kosmetyczna zmiana wyglądu galerii. Wszystkie stare zdjęcia juz zostały dodane, a niedługo zaczniemy dodawać
                nowe:) Pewnie będzie ich dużo z V zjazdu. Pamiętajcie, że galeria powstaje także dzięki wam. Mamy nadzieję, że w przyszłości
                rozbudujemy ją o jeszcze kilka innych ciekawych kategorii... Dlatego stale zachęcamy WAS do przysyłania nowych zdjęć. Adresy
                e-mail można znaleźć w dziale kontakt:) Życzymy przyjemnego oglądania.
            </TextDesc>
            <CarouselContainer>
                <Carousel centered autoPlay={2000} animationSpeed={1000} infinite slidesPerPage={5}>
                    <Img src={Slide1} />
                    <Img src={Slide2} />
                    <Img src={Slide3} />
                    <Img src={Slide4} />
                    <Img src={Slide5} />
                    <Img src={Slide6} />
                    <Img src={Slide7} />
                    <Img src={Slide8} />
                    <Img src={Slide9} />
                    <Img src={Slide10} />
                    <Img src={Slide11} />
                </Carousel>
            </CarouselContainer>
        </Container>
    );
};

export default Gallery;
