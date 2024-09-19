import Hero from './sections/Hero.jsx';
import About from './sections/About.jsx';
import Footer from './sections/Footer.jsx';
import Navbar from './sections/Navbar.jsx';
import Contact from './sections/Contact.jsx';
import Clients from './sections/Clients.jsx';
import Projects from './sections/Projects.jsx';
import WorkExperience from './sections/Experience.jsx';
import Divider from './components/Divider.jsx';
import Wrapper from './components/Wrapper.jsx';

const App = () => {
  return (
    <main className="max-w-7xl mx-auto relative">
      <Wrapper>
        <Hero />
        <About />
        <Divider />
        <Projects />
        <Divider />
        <Clients />
        <Divider />
        <WorkExperience />
        <Divider />
        <Contact />
        <Footer />
      </Wrapper>
    </main>
  );
};

export default App;
