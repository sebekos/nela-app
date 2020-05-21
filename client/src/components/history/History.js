import React from "react";
import styled from "styled-components";
import PoszukiwaniaImage from "../../img/history.jpeg";

const Container = styled.div`
    margin: auto;
    padding: 4rem 0 0;
    min-height: 100vh;
`;

const MainTitle = styled.div`
    font-size: 3rem;
    color: #3e4444;
    text-align: center;
    padding: 0rem 0 1rem;
    width: 100%;
    background-color: white;
    font-weight: bold;
`;

const TextContainer = styled.div`
    margin: auto;
    padding: 1rem;
    max-width: 1100px;
`;

const IntroContainer = styled.div`
    position: relative;
`;

const IntroText = styled.div`
    font-size: 2rem;
    font-weight: bold;
    white-space: nowrap;
`;

const Image1 = styled.img`
    height: 600px;
    width: 100%;
    object-fit: cover;
`;

const IntroTextContainer = styled.div`
    position: absolute;
    max-width: 1100px;
    color: white;
    top: 50%;
    right: 50%;
    transform: translate(50%, -50%);
`;

const Poszukiwania = () => {
    return (
        <IntroContainer>
            <IntroTextContainer>
                <IntroText>Poszukiwania &#8226; Dawne Dzieje &#8226; Miejscowości &#8226; Nazwisko</IntroText>
            </IntroTextContainer>
            <Image1 src={PoszukiwaniaImage} alt="image1" />
        </IntroContainer>
    );
};

const BoldText = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
    margin-left: 1rem;
`;

const BodyText = styled.div`
    font-size: 1rem;
    margin-bottom: 2rem;
`;

const Text = () => {
    return (
        <TextContainer>
            <BoldText>Poszukiwania</BoldText>
            <BodyText>
                Z przekazów rodzinnych wiemy o dziejach naszego Rodu niegdyś już spisanego przez naszych pra, pra ... Księga z zapisami
                narodzin, zgonów, nadaniami dóbr i ich konfiskatą za udział w powstaniach, oraz innymi dziejami Rodu była "wędrowna". Nie
                wszyscy w dawnych czasach umieli pisać więc wędrowała do tego który umiał pisać. Księga która przetrwała różne dziejowe
                zawieruchy spłonęła wraz z młynem w Lelowie dnia 03.09.1939 r., a wraz z nią archiwum rodzinne, książki - białe kruki,
                pergaminy. Mamy jednak naszych nestorów jeszcze z doskonałą pamięcią, którzy nam opowiadają jak to dawniej bywało. Godziny
                rozmów - wywiadów są nagrane na taśmach video. Jak się okazuje po wielu latach poszukiwań Pytlewskich w zasobach
                archiwalnych, parafiach, materiałach historycznych, w dokumentach prywatnych zbiorów zaprzyjaźnionych z nami rodzin,
                opowieści naszych "starszych" się potwierdzają. Efekty tych prac są zdumiewające. Według "Słownika nazwisk współcześnie w
                Polsce używanych" prof. Kazimierza Rymuta 525 osób nosiło to nazwisko w roku 1990. Największe skupisko Pytlewskich było w
                poznańskim 114 osób, kieleckim - 70 osób, radomskim 58 osób, a reszta rozproszona po Polsce. Prawdopodobnie osoby noszące
                nazwisko Pytlowski, Pytelski, Pytławski to też członkowie naszego Rodu, którym różni zaborcy poprzekręcali nazwisko. Tak
                więc jeśli nosicie nazwisko podobne bardzo do Pytlewskich to poszperajcie, czy aby nie jesteście z naszego Rodu.
            </BodyText>
            <BoldText>Dawne Dzieje</BoldText>
            <BodyText>
                Według dawnych przekazów oraz obecnie prowadzonych badań Pytlewscy zaznaczają swoją obecność w Polsce już w 1374 r. (w
                trakcie badań jest okres X-XI wieku). Pojawiają się najpierw jako rycerze biorący udział w różnych wyprawach wojennych. Z
                tych wypraw przywożą liczne łupy, a nawet żony (branki). Stać ich na zakup lub budowę nowych młynów. Młyny te są przez wiele
                pokoleń źródłem utrzymania rodziny. Jednak nie wszyscy mężczyźni w rodzinie zajmują się młynarstwem. Część pozostaje przy
                orężu i dlatego w każdym pokoleniu mamy jakiegoś "wojaka" Pytlewskiego. W dawnych. czasach to rzeki wyznaczały Pytlewskim
                drogę rozsiedlania się po Polsce.
            </BodyText>
            <BoldText>Miejscowości</BoldText>
            <BodyText>
                Z dotychczas przeprowadzonych badań mamy w wykazie 48 miejscowości gdzie byli Pytlewscy. Budowali młyny i domostwa - całe
                osady młyńskie. Mniej zamożni albo na tzw. dorobku brali młyny w dzierżawę. Jak wędrowne ptaki zakładali rodzinne gniazda,
                by potem z nich wyfrunąć dalej, tam gdzie lepsza woda. Prawdopodobnie pierwszym gniazdem było Gniezno, potem Poznań,
                Pytlewo, Pyzdry, Pękawiec, Działoszyn i inne jeszcze nie odkryte. Dorzeczem Warty docierają na kielecczyznę. Tu spotykamy
                już Pytlewskich skoligaconych z Konopackimi, którzy również między innymi zajmują się młynarstwem. Osiedlają się głównie nad
                Pilicą, Nidą i jej dopływami lub też obok: Koniecpol, Szczekociny, Lelów, Włoszczowa, Kielce, Małogoszcz, Busko. Docierają
                też na Ukrainę, Daleki Wschód, a później już są na pięciu kontynentach.
            </BodyText>
            <BoldText>Nazwisko</BoldText>
            <BodyText>
                Są dwie wersje powstania nazwiska Pytlewski. Przytoczę tą od najdawniejszych czasów powtarzaną w rodzinie. A może ktoś zna
                jeszcze inną wersję? Wtedy kiedy do określenia osób w Polsce używano przydomków - przezwisk my już mieliśmy "nazwisko".
                Nazwisko to nie pochodziło od miejscowości w których mieszkali nasi pra, pra ojcowie ani też od jakiejś rzeczy jak to było w
                wielu przypadkach przy tworzeniu nazwisk.. To od naszego nazwiska nazywano miejscowości np. Pytlewo k/Gniezna par. Strzyżewo
                Kościelne, rzeka Pytlecha, czy też worek muślinowy do przesiewu mąki - pytel (od jego twórcy). Według rodzinnego przekazu
                wraz z dworem Agnieszki- żony króla Władysława II przybył do Polski z Niemiec wraz ze swoimi braćmi rycerzami Johan Pytte.
                Johan Pytte przy boku króla Władysława II odbył wiele podróży m. innymi do Czech i Cesarstwa, gdzie król prosił o udzielenie
                pomocy do walki z jego młodszymi braćmi. Pomocy jednak nie otrzymał i wraz z całą rodziną zbiegł do Niemiec i osiadł w
                Saksonii. Johan Pytte wraz z rodziną tym razem pozostał w Polsce. Nazwisko ich zostało spolszczone na Pytjan. Od tego czasu
                już pojawia się to nazwisko chociaż różnie zapisywane i przeinaczane np.: Pytyl w 1374 r - w dokumentach historycznych.
                Potem Nicolai Pytel w "Codex diplomaticus Poloniae" w roku 1415. Następnie w aktach ekspedycji wojennej Pallatynatu
                Kalisko-Poznańskiego na Wołochów i Turków 1497 r. wymieniony jest Tworzyan Pythliński (to wyprawa mołdawska Jana Olbrachta).
                Z czasem rycerze stają się posiadaczami ziemskimi a w naszym przypadku również młynarzami. Młyny nasze są ciągle
                udoskonalane jak powiemy dzisiaj przez ówczesne nowinki techniczne. W porównaniu z prymitywnymi młynami jakie wtedy istniały
                w Polsce - młyny Pytlewskich to "smoki" o dużym przemiale. Pytlewscy produkowali wtedy najlepszą mąkę, gdyż zastosowano
                skuteczny przesiew jej przez worek muślinowy nazwany od nazwiska jego twórcy - pytel. Tak powstała doskonała mąka pytlowa, a
                z niej chleb pytlowy. To Pytlewscy byli stałymi dostawcami mąki na dwór królewski (patrz publikacje prasowe nawet w naszych
                obecnych czasach). Ponieważ wszystko zaczęło się w poznańskim, to i tradycja produkowania bardzo dobrej mąki tam pozostała.
                Należy dodać, że w pełni brzmiące nazwisko Pytlewski powstało w wyniku zasług i przyznanego szlachectwa o czym będzie w
                dalszych publikacjach.
            </BodyText>
        </TextContainer>
    );
};

const History = () => {
    return (
        <Container>
            <MainTitle>Historia</MainTitle>
            <Poszukiwania />
            <Text />
        </Container>
    );
};

export default History;
