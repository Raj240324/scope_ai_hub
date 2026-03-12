export function getHeroMode() {
  if (typeof window === "undefined") return "desktop"; // SSR fallback

  const ua = navigator.userAgent.toLowerCase();
  
  const memory = navigator.deviceMemory || 8;
  const cores = navigator.hardwareConcurrency || 8;
  const isMobileWidth = window.innerWidth < 1024;
  
  // Mobile performance guard
  if (memory <= 2 || cores <= 4) {
    return "static";
  }
  
  const isAndroid = /android/i.test(ua);
  const isIOS = /iphone|ipad|ipod/i.test(ua);
  const isMobileDevice = isAndroid || isIOS || /mobile/i.test(ua);
  
  if (isAndroid) {
    return "static";
  }
  
  if (isIOS || (isMobileDevice && isMobileWidth)) {
    return "video";
  }
  
  return "desktop";
}
