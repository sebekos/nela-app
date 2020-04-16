import React from "react";
import styled from "styled-components";
import Slide1 from "../../img/slide1.jpg";
import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";

const Container = styled.div`
    width: 100%;
    text-align: center;
    color: white;
    background-color: #3e4444;
    padding-bottom: 1rem;
`;

const CarouselContainer = styled.div`
    max-width: 1200px;
    margin: auto;
`;

const Img = styled.img`
    max-width: 300px;
    padding: 0.1rem;
`;

const TextDesc = styled.div`
    font-size: 1rem;
    max-width: 1200px;
    margin: auto;
    padding-bottom: 1rem;
`;

const TextTitle = styled.div`
    font-size: 2rem;
    padding: 0rem 0 1rem;
`;

const Gallery = () => {
    return (
        <Container>
            <TextTitle>Galeria</TextTitle>
            <TextDesc>
                Nastąpiła kosmetyczna zmiana wyglądu galerii. Wszystkie stare zdjęcia juz zostały dodane, a niedługo zaczniemy dodawać
                nowe:) Pewnie będzie ich dużo z V zjazdu. Pamiętajcie, że galeria powstaje także dzięki wam. Mamy nadzieję, że w przyszłości
                rozbudujemy ją o jeszcze kilka innych ciekawych kategorii... Dlatego stale zachęcamy WAS do przysyłania nowych zdjęć. Adresy
                e-mail można znaleźć w dziale kontakt:) Życzymy przyjemnego oglądania.
            </TextDesc>
            <CarouselContainer>
                <Carousel centered autoPlay={2000} animationSpeed={1000} infinite slidesPerPage={4}>
                    <Img src={Slide1} />
                    <Img src={Slide1} />
                    <Img src={Slide1} />
                    <Img src={Slide1} />
                    <Img src={Slide1} />
                    <Img src={Slide1} />
                </Carousel>
            </CarouselContainer>
        </Container>
    );
};

export default Gallery;
