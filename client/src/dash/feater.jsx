import { Users, Calendar, Bell, BarChart } from 'lucide-react'

function Features() {
  const features = [
    {
      icon: <Users className="w-12 h-12 text-blue-500" />,
      title: "Gestion des clients",
      description: "Enregistrez et gérez facilement les informations de vos clients et leurs sites hébergés."
    },
    {
      icon: <Calendar className="w-12 h-12 text-blue-500" />,
      title: "Cycles d'hébergement",
      description: "Définissez et suivez les cycles d'hébergement de 6 mois ou 1 an pour chaque client."
    },
    {
      icon: <Bell className="w-12 h-12 text-blue-500" />,
      title: "Rappels automatisés",
      description: "Recevez des notifications par e-mail avant l'expiration des hébergements de vos clients."
    },
    {
      icon: <BarChart className="w-12 h-12 text-blue-500" />,
      title: "Tableau de bord intuitif",
      description: "Visualisez rapidement la liste des clients, les cycles d'hébergement et les prochaines échéances."
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Fonctionnalités principales</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features