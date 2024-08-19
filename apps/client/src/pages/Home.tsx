import { NavBar, Hero, Sect_1, Dev, Footer } from "../components";

const Home = () => {
  return (
    <div
      id="scroll-container"
      className=" w-full h-screen bg-flash_white overflow-x-hidden"
    >
      <NavBar />
      <Hero />
      <Sect_1 />
      <Dev />
      <Footer />
    </div>
  );
};

export default Home;
