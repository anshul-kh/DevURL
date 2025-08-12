import { Hero, Sect_1, Dev, Footer } from "../components";
import DefaultLayout from "../layout/default";

const Home = () => {
  return (
    <DefaultLayout
      id="scroll-container"
      className=" w-full h-screen bg-flash_white overflow-x-hidden no-scrollbar"
    >
      <Hero />
      <Sect_1 />
      <Dev />
      <Footer />
    </DefaultLayout>
  );
};

export default Home;
