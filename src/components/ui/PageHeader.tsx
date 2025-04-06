interface PageHeaderProps {
  title: string
  subtitle?: string
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="text-center my-8">
      <h1 className="text-3xl md:text-4xl font-bold text-white">{title}</h1>
      {subtitle && <p className="mt-2 text-gray-400">{subtitle}</p>}
    </div>
  )
}

