/**
 * @function isMobile
 * @description Checks if the device is mobile.
 */

const isMobile = () => {
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  if (mobileRegex.test(navigator.userAgent)) return true;
  if (/iPad|iPhone|iPod/.test(navigator.userAgent)) return true;
  return false;
};

export default isMobile;
