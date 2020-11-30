const Chip = ({ children, title }) => (
  <div title={title} className="rounded-full bg-gray-100 border border-gray-300  text-sm py-1 px-3 mr-1 mb-2 inline-flex align-middle items-center">
    {children}
  </div>
)

export default Chip;