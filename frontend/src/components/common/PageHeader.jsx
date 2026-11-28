function PageHeader({ title, subtitle, action }) {
  return (
    <header
      className="
        flex items-center justify-between
        gap-4 mb-6
        bg-card border border-border
        rounded-2xl px-5 py-5
      "
    >
      <div>
        <h1
          className="
            text-2xl sm:text-3xl
            font-heading font-extrabold
            text-foreground
          "
        >
          {title}
        </h1>

        {subtitle && (
          <p className="text-sm text-muted mt-1">
            {subtitle}
          </p>
        )}
      </div>

      {action && (
        <div className="shrink-0">
          {action}
        </div>
      )}
    </header>
  );
}

export default PageHeader;