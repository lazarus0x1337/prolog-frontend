import NavBar from "./NavBar";
import Header from "./Header";
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
           {/*<Header/>*/}
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