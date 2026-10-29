import { Link } from 'react-router-dom'

export default function ComingSoonPage({ page, text }) {
  return (
    <section className="flex min-h-[65vh] items-center bg-[#f7f5f1] py-20">
      <div className="mx-auto w-[calc(100%-48px)] max-w-[1200px] max-[760px]:w-[calc(100%-36px)]">
        <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.13em] text-[#073b27] rtl:tracking-normal">
          {page.title}
        </p>
        <h1 className="m-0 max-w-[700px] text-[clamp(40px,5.2vw,66px)] font-extrabold leading-[1.08] tracking-[-0.045em] text-[#20262b] rtl:tracking-normal">
          {text.pages.comingSoon}
        </h1>
        <Link
          className="btn btn-primary mt-8"
          to="/"
        >
          {text.pages.backToHome}
        </Link>
      </div>
    </section>
  )
}
