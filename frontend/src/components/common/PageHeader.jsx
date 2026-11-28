function PageHeader({ title, subtitle, action }) {
  return (
    <header className="flex items-center justify-between
      gap-4 mb-6 bg-primary rounded-2xl px-5 py-5">

      <div>
        <h1 className="text-2xl sm:text-3xl
          font-heading font-extrabold text-background">
          {title}
        </h1>

        {subtitle && (
          <p className="text-sm text-background/80 mt-1">
            {subtitle}
          </p>
        )}
      </div>

      {action}
    </header>
  );
}

export default PageHeader;