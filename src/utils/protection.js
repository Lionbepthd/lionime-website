// Protection utilities for the app
export const addWatermark = () => {
  if (typeof window !== 'undefined') {
    // Console watermark
    console.log('%c🦁 Lionime Anime Website', 
      'color: #f59e0b; font-size: 16px; font-weight: bold; padding: 10px;');
    console.log('%c© 2024 Lionime. All Rights Reserved.', 
      'color: #6b7280; font-size: 12px;');
    console.log('%c⚠️ Unauthorized modification prohibited.', 
      'color: #dc2626; font-size: 10px; font-weight: bold;');
    
    // Page watermark (hidden but in DOM)
    const watermark = document.createElement('div')
    watermark.innerHTML = `
      <div style="
        position: fixed;
        bottom: 10px;
        right: 10px;
        background: rgba(0,0,0,0.8);
        color: white;
        padding: 5px 10px;
        border-radius: 4px;
        font-size: 10px;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s;
      " 
      onmouseover="this.style.opacity='1'"
      onmouseout="this.style.opacity='0'">
        © 2024 Lionime
      </div>
    `
    document.body.appendChild(watermark)
  }
}

export const validateLicense = () => {
  // Basic license validation
  const currentDomain = window.location.hostname
  const allowedDomains = ['lionime.vercel.app', 'localhost']
  
  if (!allowedDomains.includes(currentDomain)) {
    console.warn('Domain tidak diizinkan:', currentDomain)
    return false
  }
  
  return true
}
