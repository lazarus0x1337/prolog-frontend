import NavBar from "./NavBar";
import AboutUs from "./AboutUs";
import Services from "./Services";
import Testimonials from "./Testimonials";
import Contacts from "./Contacts";
import Footer from "./Footer";
import Cards from "./Cards";

function Home(){
    return(
     <>
           <NavBar/>
           <Cards/>
           <Services/>
           <AboutUs/>
           <Testimonials/>
           <Contacts/>
           <Footer/>
     </>
    );
}
export default Home;