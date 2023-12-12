import getPublications from "@/app/actions/getPublications";
import ContentMap from "./ContentMap";
import { EmblaOptionsType } from "embla-carousel-react";
import Proposals from "./Proposals";

const OPTIONS: EmblaOptionsType = {}
const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

const ExploreContent = async () => {
    const publications = await getPublications();
    return ( 
        <>
            <Proposals/>
            <ContentMap publications={publications}/>
        </>
    );
}
 
export default ExploreContent;