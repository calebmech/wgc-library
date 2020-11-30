const Select = props => (
  <div className="flex w-full">
    <select {...props} className="text-md pr-10 py-1.5 pl-6 border rounded-lg appearance-none w-full bg-white">
      {props.children}
    </select>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentcolor" className="-ml-8 h-5 w-5 m-0 min-w-0 pointer-events-none self-center"><path d="M7 10l5 5 5-5z"></path></svg>
  </div>
)

export default Select;