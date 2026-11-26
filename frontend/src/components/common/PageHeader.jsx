function PageHeader({ title, subtitle, action }) {
  return (
    <header className="flex items-center justify-between
      gap-4 mb-6">

      <div>
        <h1 className="text-2xl sm:text-3xl
          font-heading font-extrabold text-primary">
          {title}
        </h1>

        {subtitle && (
          <p className="text-sm text-muted mt-1">
            {subtitle}
          </p>
        )}
      </div>

      {action}
    </header>
  );
}

export default PageHeader;
