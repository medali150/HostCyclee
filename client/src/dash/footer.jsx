function Footer() {
    return (
        <footer class="bg-gray-800 p-8 font-sans tracking-wide">
        <div class="max-w-screen-xl mx-auto">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div class="sm:col-span-2 max-w-sm">
              <h4 class="text-base font-semibold mb-6 text-white">À propos de nous</h4>
              <p class="text-gray-400 text-sm">HostCycle centralise les informations de vos clients et assure un suivi proactif des échéances d'hébergement pour une gestion sans souci.</p>
            </div>
  
            <div>
              <h4 class="text-base font-semibold mb-6 text-white">Services</h4>
              <ul class="space-y-3">
                <li><a href="javascript:void(0)" class="text-gray-400 hover:text-white text-sm">Fonctionnalités de collaboration et d'aperçu en temps réel</a></li>
                <li><a href="javascript:void(0)" class="text-gray-400 hover:text-white text-sm">Créez et déployez des projets Web en toute simplicité</a>
                </li>
                <li><a href="javascript:void(0)" class="text-gray-400 hover:text-white text-sm">Intégration facile avec votre backend</a></li>
              </ul>
            </div>
  
            <div class="space-y-3">
              <h4 class="text-base font-semibold mb-6 text-white">Contactez-nous</h4>
              <p class="text-gray-400 text-sm">123 Main Street</p>
              <p class="text-gray-400 text-sm">City, State, Country</p>
              <p class="text-gray-400 text-sm">ITQANLABS@GMAIL.COM</p>
              <p class="text-gray-400 text-sm">+216 94 178 516 </p>
            </div>
          </div>
  
          <div className="mt-8 border-t border-gray-700 pt-8 flex justify-between items-center">
            <p className="text-base text-gray-400 ">&copy; 2025 HostCycle, Inc. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    )
  }
  
  export default Footer
  
  