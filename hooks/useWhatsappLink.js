import encodeurl from 'encodeurl';

export function useWhatsappLink(whatsappNumber, messageString) {
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeurl(
    messageString
  )}`;
  return { whatsappLink: whatsappUrl };
}
