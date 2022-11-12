export default function LogoSection() {
  return (
    <section className="flex items-start w-full px-4 mx-auto md:px-0 md:items-center md:w-1/3">
      <div className="flex flex-row items-center bg w-full max-w-sm py-4 mx-auto md:mx-0 my-auto min-w-min relative md:-left-2.5 pt-4 md:py-4 transform origin-left bg-primary text-primary">
        <div className="logo-animated flex items-center space-x-1">
          <img
            alt="Botway Logo"
            src="https://cdn-botway.up.railway.app/botway.svg"
            className="block logo-load w-56"
          />
        </div>
      </div>
    </section>
  );
}
