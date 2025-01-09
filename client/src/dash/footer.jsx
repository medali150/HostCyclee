function Footer() {
    return (
        <footer class="bg-gray-800 p-8 font-sans tracking-wide">
        <div class="max-w-screen-xl mx-auto">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div class="sm:col-span-2 max-w-sm">
              <h4 class="text-base font-semibold mb-6 text-white">About Us</h4>
              <p class="text-gray-400 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean gravida, mi eu
                pulvinar cursus, sem elit interdum mauris.</p>
            </div>
  
            <div>
              <h4 class="text-base font-semibold mb-6 text-white">Services</h4>
              <ul class="space-y-3">
                <li><a href="javascript:void(0)" class="text-gray-400 hover:text-white text-sm">Web Development</a></li>
                <li><a href="javascript:void(0)" class="text-gray-400 hover:text-white text-sm">Mobile App Development</a>
                </li>
                <li><a href="javascript:void(0)" class="text-gray-400 hover:text-white text-sm">UI/UX Design</a></li>
                <li><a href="javascript:void(0)" class="text-gray-400 hover:text-white text-sm">Digital Marketing</a></li>
              </ul>
            </div>
  
            <div class="space-y-3">
              <h4 class="text-base font-semibold mb-6 text-white">Contact Us</h4>
              <p class="text-gray-400 text-sm">123 Main Street</p>
              <p class="text-gray-400 text-sm">City, State, Country</p>
              <p class="text-gray-400 text-sm">contact@example.com</p>
              <p class="text-gray-400 text-sm">+1 234 567 890</p>
            </div>
          </div>
  
          <div class="mt-12">
            <p class='text-gray-400 text-sm'>© ReadymadeUI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    )
  }
  
  export default Footer
  
  