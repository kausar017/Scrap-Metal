import ArrowIcon from '../shared/ArrowIcon.jsx'

const materialImages = [
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=900&q=80',
]

const container =
  'mx-auto w-[calc(100%-48px)] max-w-[1200px] max-[760px]:w-[calc(100%-36px)] max-[760px]:max-w-[600px]'

const eyebrow =
  'mb-4 text-xs font-extrabold uppercase leading-relaxed tracking-[0.13em] text-[#a95f30] rtl:tracking-normal'

const heading =
  'm-0 max-w-[650px] text-[clamp(30px,3.5vw,42px)] font-bold leading-[1.17] tracking-[-0.035em] text-[#20262b] [text-wrap:balance] rtl:tracking-normal max-[760px]:text-[clamp(29px,7vw,38px)]'

const primaryButton =
  'btn btn-primary min-h-12 gap-3 rounded-md border-transparent px-5 text-sm font-bold leading-tight rtl:tracking-normal'

const heroButton =
  'btn min-h-12 gap-3 rounded-md border-white bg-white px-5 text-sm font-bold leading-tight text-[#073b27] hover:border-white/90 hover:bg-white/90 rtl:tracking-normal'

export default function Home({ text, isArabic }) {
  return (
    <>
      <section
        id="home"
        className="relative flex min-h-[610px] items-center overflow-hidden bg-[#20262b] text-white max-[760px]:min-h-[570px]"
      >
        <img
          className="absolute inset-0 h-full w-full object-cover object-[center_52%] max-[760px]:object-[58%_center]"
          src="https://images.unsplash.com/photo-1785900976828-9d67c8b24134?auto=format&fit=crop&w=2200&q=85"
          alt=""
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#141a1e]/90 via-[#141a1e]/75 to-[#141a1e]/35 max-[760px]:via-[#141a1e]/70 max-[760px]:to-[#141a1e]/55" />
        <div
          className={`${container} relative z-10 flex min-h-[610px] flex-col justify-center py-[88px] pb-[78px] max-[760px]:min-h-[570px] max-[760px]:py-[70px] max-[760px]:pb-[82px]`}
        >
          <div className="max-w-[700px]">
            <p className={`${eyebrow} text-[#e5a678]`}>{text.eyebrow}</p>
            <h1 className="m-0 max-w-[690px] text-[clamp(40px,5.2vw,66px)] font-extrabold leading-[1.08] tracking-[-0.045em] text-white [text-wrap:balance] rtl:tracking-normal">
              {text.headline}
            </h1>
            <p className="mt-6 max-w-[590px] text-[17px] leading-[1.75] text-white/85 max-[760px]:max-w-[520px] max-[760px]:text-base max-[760px]:leading-[1.7]">
              {text.intro}
            </p>
            <div className="mt-[30px] flex flex-wrap gap-3">
              <a className={heroButton} href="#contact">
                {text.quote}
                <ArrowIcon left={isArabic} />
              </a>
              <a
                className="btn btn-outline min-h-12 gap-3 border-white/55 bg-[#20262b]/20 px-5 text-sm font-bold leading-tight text-white hover:border-white hover:bg-white/10 rtl:tracking-normal"
                href="https://wa.me/966572033243"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  aria-hidden="true"
                  className="h-5 w-5 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.97L2 22l5.18-1.36A9.93 9.93 0 1 0 12.04 2Zm0 18.05a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.08.81.82-3-.2-.31a8.13 8.13 0 1 1 6.89 3.81Zm4.46-6.09c-.24-.12-1.43-.7-1.65-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.95-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.01-.37.1-.49.1-.1.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.46-.4-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.18 1.1.15 1.52.09.46-.07 1.43-.58 1.63-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
                </svg>
                {text.whatsapp}
              </a>
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-[30px] flex items-center gap-2.5 text-xs text-white/80 max-[760px]:bottom-6 max-[760px]:text-[11px]">
            <span className="h-px w-[26px] bg-[#073b27]" />
            <span>{text.heroNote}</span>
          </div>
        </div>
      </section>

      <section id="materials" className="bg-[#f7f5f1] py-[88px] max-[760px]:py-16">
        <div className={container}>
          <div className="mb-[34px] flex items-end justify-between gap-10 max-[760px]:mb-[26px] max-[760px]:flex-col max-[760px]:items-start max-[760px]:gap-3.5">
            <div>
              <p className={eyebrow}>{text.materialsEyebrow}</p>
              <h2 className={heading}>{text.materialsTitle}</h2>
            </div>
            <p className="mb-[3px] mt-0 max-w-[430px] text-[15px] leading-[1.75] text-[#667078] max-[760px]:mb-0 max-[760px]:max-w-[560px]">
              {text.materialsIntro}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-[22px] min-[761px]:grid-cols-2 min-[1024px]:grid-cols-3 max-[760px]:gap-4">
            {text.categories.map((category, index) => (
              <article
                className="card overflow-hidden rounded-[10px] border border-[#e7e3dd] bg-base-100"
                key={category.title}
              >
                <div className="relative min-h-[210px] overflow-hidden bg-[#d3d0c9] max-[760px]:min-h-[200px]">
                  <img
                    className="absolute inset-0 h-full w-full object-cover"
                    src={materialImages[index]}
                    alt=""
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#20262b]/30 to-transparent" />
                  <span className="absolute start-[18px] bottom-3.5 z-10 text-[13px] font-bold tracking-[0.08em] text-white rtl:tracking-normal">
                    {category.number}
                  </span>
                </div>
                <div className="p-[22px] max-[760px]:p-[19px]">
                  <h3 className="m-0 text-[21px] font-bold leading-[1.3] text-[#20262b]">
                    {category.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-[1.7] text-[#667078]">
                    {category.description}
                  </p>
                  <span className="mt-[18px] block border-t border-[#ece9e3] pt-3.5 text-xs font-semibold text-[#465158]">
                    {category.detail}
                  </span>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-4 text-xs leading-5 text-[#667078]">
            {text.materialsPhotoNote}
          </p>
        </div>
      </section>

      <section className="bg-white py-[88px] max-[760px]:py-16" id="why-us">
        <div className={container}>
          <div className="mb-[34px] max-w-[760px]">
            <p className={eyebrow}>{text.whyEyebrow}</p>
            <h2 className={heading}>{text.whyTitle}</h2>
            <p className="mt-4 text-[15px] leading-[1.75] text-[#667078]">
              {text.whyIntro}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 min-[761px]:grid-cols-3">
            {text.verifiedDetails.map((detail, index) => (
              <article
                className="rounded-[10px] border border-[#e7e3dd] bg-[#f7f5f1] p-6"
                key={detail.title}
              >
                <span className="mb-5 inline-block text-xs font-extrabold tracking-[0.12em] text-[#a95f30] rtl:tracking-normal">
                  0{index + 1}
                </span>
                <h3 className="m-0 text-[20px] font-bold leading-[1.3] text-[#20262b]">
                  {detail.title}
                </h3>
                <p className="mt-2.5 text-sm leading-[1.7] text-[#667078]">
                  {detail.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f7f5f1] py-[72px] max-[760px]:py-16" id="services">
        <div className={`${container} flex items-center justify-between gap-10 max-[760px]:flex-col max-[760px]:items-start`}>
          <div className="max-w-[760px]">
            <p className={eyebrow}>{text.servicesEyebrow}</p>
            <h2 className={heading}>{text.servicesTitle}</h2>
            <p className="mt-4 text-[15px] leading-[1.75] text-[#667078]">
              {text.servicesIntro}
            </p>
          </div>
          <span className="badge badge-outline border-[#c8753d] px-4 py-4 text-[#8d4b26]">
            {text.servicesNote}
          </span>
        </div>
      </section>

      <section className="bg-white py-[88px] max-[760px]:py-16" id="process">
        <div className={container}>
          <div className="mb-[38px]">
            <p className={eyebrow}>{text.processEyebrow}</p>
            <h2 className={heading}>{text.processTitle}</h2>
          </div>
          <div className="grid grid-cols-1 border-t border-[#dcd9d3] min-[761px]:grid-cols-2 min-[1024px]:grid-cols-4">
            {text.steps.map((step, index) => (
              <article
                className={`min-h-[190px] py-6 max-[760px]:min-h-0 max-[760px]:py-[22px] ${
                  index === 0
                    ? 'pe-7 ps-0'
                    : 'border-s border-[#e7e3dd] pe-0 ps-7 max-[760px]:border-s-0 max-[760px]:border-t max-[760px]:px-0'
                }`}
                key={step.number}
              >
                <span className="mb-5 inline-block text-xs font-extrabold tracking-[0.12em] text-[#a95f30] max-[760px]:mb-3 rtl:tracking-normal">
                  {step.number}
                </span>
                <h3 className="m-0 text-[21px] font-bold leading-[1.3] text-[#20262b]">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-sm leading-[1.7] text-[#667078]">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f7f5f1] py-[88px] max-[760px]:py-16" id="gallery">
        <div className={container}>
          <p className={eyebrow}>{text.galleryEyebrow}</p>
          <h2 className={heading}>{text.galleryTitle}</h2>
          <p className="mt-4 max-w-[700px] text-[15px] leading-[1.75] text-[#667078]">
            {text.galleryIntro}
          </p>
          <div className="mt-8 flex min-h-48 items-center justify-center rounded-[10px] border border-dashed border-[#c9c4bb] bg-white p-8 text-center">
            <p className="m-0 max-w-[520px] text-sm leading-[1.7] text-[#667078]">
              {text.galleryNote}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-[72px] max-[760px]:py-16" id="service-area">
        <div className={container}>
          <p className={eyebrow}>{text.areaEyebrow}</p>
          <h2 className={heading}>{text.areaTitle}</h2>
          <p className="mt-4 max-w-[700px] text-[15px] leading-[1.75] text-[#667078]">
            {text.areaIntro}
          </p>
        </div>
      </section>

      <section className="bg-[#f7f5f1] py-[88px] max-[760px]:py-16" id="faq">
        <div className={container}>
          <p className={eyebrow}>{text.faqEyebrow}</p>
          <h2 className={heading}>{text.faqTitle}</h2>
          <div className="mt-8 grid gap-3">
            {text.faqs.map((faq) => (
              <details
                className="collapse collapse-arrow rounded-lg border border-[#e7e3dd] bg-white"
                key={faq.question}
              >
                <summary className="collapse-title min-h-14 pe-12 text-base font-semibold text-[#20262b]">
                  {faq.question}
                </summary>
                <div className="collapse-content text-sm leading-[1.7] text-[#667078]">
                  <p>{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#ece9e2] py-[74px] max-[760px]:py-[60px]" id="contact">
        <div
          className={`${container} flex items-center justify-between gap-10 max-[760px]:flex-col max-[760px]:items-start max-[760px]:gap-6`}
        >
          <div>
            <p className={eyebrow}>{text.finalEyebrow}</p>
            <h2 className={heading}>{text.finalTitle}</h2>
            <p className="mt-3.5 max-w-[570px] text-[15px] leading-[1.7] text-[#535e65]">
              {text.finalText}
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <a className={primaryButton} href="https://wa.me/966572033243" target="_blank" rel="noopener noreferrer">
              {text.quoteRequest}
              <ArrowIcon left={isArabic} />
            </a>
            <a className="btn btn-outline border-[#20262b] text-[#20262b] hover:bg-[#20262b] hover:text-white" href="https://wa.me/966572033243" target="_blank" rel="noopener noreferrer">
              {text.whatsapp}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
