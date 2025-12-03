import { formatAED } from './FormatAED';

export const handleWhatsApp = (project: any,
  agent: any,
  t: any,
  i18n: any
) => {
    const localizedAgentName =
      agent.name?.[i18n.language] || agent.name?.en || t("agent.name");
    // console.log("proj: ", project.title?.[i18n.language], localizedAgentName);
    const translations = {
      en: `Hi ${localizedAgentName}! I'm interested in ${project.title?.[i18n.language] || project.title.en} in ${project.city?.name?.[i18n.language]}. Starting from AED ${formatAED(project.low_price)}. Can you share more details?

Property Link: https://offplan.market/${agent.username}/property-details/?id=${project.id}`,

      ar: `مرحبًا ${localizedAgentName}، أنا مهتم بـ ${project.title?.[i18n.language]} في ${project.city?.name?.[i18n.language]}. تبدأ الأسعار من AED ${formatAED(project.low_price)}. هل يمكنك مشاركة المزيد من التفاصيل؟

رابط العقار: https://offplan.market/${agent.username}/property-details/?id=${project.id}`,
      fa: `${localizedAgentName} عزیز، من به ${project.title?.fa} در ${project.city?.name?.[i18n.language]} علاقه‌مندم. قیمت‌ها از AED ${formatAED(project.low_price)} شروع می‌شود. می‌تونی اطلاعات بیشتری ارسال کنی؟

لینک ملک: https://offplan.market/${agent.username}/property-details/?id=${project.id}`
    };

    const message = translations[i18n.language] || translations.en;
    const whatsappUrl = `https://wa.me/${agent.whatsapp_number.replace(/\s+/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };