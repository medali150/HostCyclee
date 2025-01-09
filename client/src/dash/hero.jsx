

function Hero() {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-20">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Gérez vos hébergements en toute simplicité</h1>
          <p className="text-xl mb-6">HeberGest vous aide à suivre et gérer les cycles d'hébergement de vos clients en un clin d'œil.</p>
          <button className="px-6 py-3 bg-white text-blue-600 rounded hover:bg-blue-50 mr-4">
            Commencer gratuitement
          </button>
          <button className="px-6 py-3 border border-white text-white rounded hover:bg-blue-600">
            En savoir plus
          </button>
        </div>
        <div className="md:w-1/2">
          <img alt="HeberGest Dashboard" className="rounded-lg shadow-lg" />
        </div>
      </div>
    </div>
  )
}

export default Hero

