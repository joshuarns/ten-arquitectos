export default function Footer() {
  return (
    <footer className="bg-background border-t border-outline-variant py-24 px-margin-mobile md:px-margin-desktop">
      <div className="max-w-max-width mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        <div>
          <h2 className="font-headline-md text-headline-md text-primary tracking-tight mb-8">TEN Arquitectos</h2>
          <div className="flex flex-col gap-4">
            <p className="font-body-md text-secondary">MEX — NY — MIA</p>
            <p className="font-body-md text-secondary">General Inquiries: info@ten-arquitectos.com</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-16">
          <div className="flex flex-col gap-4">
            <p className="font-label-sm text-label-sm text-primary font-bold uppercase tracking-widest">Follow</p>
            <a className="font-body-md text-secondary hover:text-primary transition-colors" href="#">Instagram</a>
            <a className="font-body-md text-secondary hover:text-primary transition-colors" href="#">LinkedIn</a>
            <a className="font-body-md text-secondary hover:text-primary transition-colors" href="#">Vimeo</a>
          </div>
          <div className="flex flex-col gap-4">
            <p className="font-label-sm text-label-sm text-primary font-bold uppercase tracking-widest">Legal</p>
            <a className="font-body-md text-secondary hover:text-primary transition-colors" href="#">Careers</a>
            <a className="font-body-md text-secondary hover:text-primary transition-colors" href="#">Privacy Policy</a>
            <a className="font-body-md text-secondary hover:text-primary transition-colors" href="#">Cookies</a>
          </div>
        </div>
      </div>
      <div className="max-w-max-width mx-auto mt-24 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-outline-variant/30 pt-8">
        <p className="font-label-sm text-label-sm text-muted-silver">© 2024 TEN Arquitectos. All rights reserved.</p>
        <div className="flex gap-8">
          <span className="font-label-sm text-label-sm text-muted-silver">SITE BY TEN DIGITAL</span>
        </div>
      </div>
    </footer>
  )
}
