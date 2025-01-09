import Features from "./feater"
import Footer from "./footer"
import Header from "./header"
import Hero from "./hero"


function Dash() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  )
}

export default Dash